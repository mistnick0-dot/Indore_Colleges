import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer as createNetServer} from 'node:net';
import {readFile, access} from 'node:fs/promises';
import {after, before, test} from 'node:test';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import {INDORE_INSTITUTES, INDORE_LOCALITY_GROUPS} from '../frontend/src/data/indoreData.ts';
import {
  getStaticCollegeRoutes,
  getStaticEditorialRoutes,
  getStaticLocalityRoutes,
  renderPage,
} from '../frontend/src/entry-server.tsx';
import partnerHandler from '../frontend/api/college/[id].ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverEntry = path.join(root, 'backend', 'server.ts');
const builtInColleges = INDORE_INSTITUTES.filter(institute => institute.type === 'college');
const categorySlugs = ['engineering', 'bba', 'bca', 'mba', 'law', 'medical', 'design'];
const baseRoutes = [
  '/',
  '/explore',
  ...categorySlugs.map(slug => `/explore/${slug}`),
  '/register',
  '/dashboard',
  '/reviews',
  '/blogs',
  '/about',
  '/careers',
  '/contact',
  '/college-portal',
  '/admin-panel',
];
let child;
let baseUrl;

async function findAvailablePort() {
  const server = createNetServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const {port} = server.address();
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  return port;
}

async function startBackend() {
  const port = await findAvailablePort();
  const env = {...process.env, PORT: String(port), NODE_ENV: 'production', MONGODB_URI: ''};
  const processChild = spawn(process.execPath, ['--import=tsx', serverEntry], {
    cwd: root,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  processChild.stdout.on('data', chunk => { output += chunk.toString(); });
  processChild.stderr.on('data', chunk => { output += chunk.toString(); });

  const url = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (processChild.exitCode !== null) {
      throw new Error(`Backend exited during test startup: ${output}`);
    }
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return {child: processChild, url};
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  processChild.kill();
  throw new Error(`Backend did not start in time: ${output}`);
}

async function stopBackend(processChild) {
  if (!processChild || processChild.exitCode !== null) return;
  processChild.kill();
  await new Promise(resolve => processChild.once('exit', resolve));
}

function createVercelResponse() {
  return {
    code: 200,
    headers: {},
    body: '',
    status(code) {
      this.code = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

const partnerFixture = id => ({
  id,
  name: 'Routing Test Partner College',
  type: 'college',
  category: 'Engineering',
  boardOrAffiliation: 'UGC',
  location: 'Indore',
  feePerAnnum: 100000,
  rating: 5,
  totalReviews: 0,
  image: '/logo.svg',
  description: 'Controlled fixture for routing tests.',
  facilities: [],
  establishedYear: 2024,
  coordinates: {lat: 22.7196, lng: 75.8577},
  coursesList: [],
  isPartnerRegistered: true,
});

before(async () => {
  const running = await startBackend();
  child = running.child;
  baseUrl = running.url;
});

after(async () => {
  await stopBackend(child);
});

test('all built-in, base, and recognized locality routes are generated and render valid SEO', () => {
  const collegeRoutes = getStaticCollegeRoutes();
  const localityRoutes = getStaticLocalityRoutes();
  const editorialRoutes = getStaticEditorialRoutes();

  assert.equal(collegeRoutes.length, 62);
  assert.deepEqual(new Set(collegeRoutes), new Set(builtInColleges.map(institute => `/college/${institute.id}`)));
  assert.equal(localityRoutes.length, INDORE_LOCALITY_GROUPS.length);
  assert.equal(editorialRoutes.length, 48);
  assert.equal(baseRoutes.length, 18);

  for (const route of [...baseRoutes, ...collegeRoutes, ...localityRoutes, ...editorialRoutes]) {
    assert.ok(renderPage(route).seo, `Expected SEO for ${route}`);
  }
});

test('invalid college, category, locality, and unknown routes have no SEO metadata', () => {
  for (const route of [
    '/college/invalid-id',
    '/explore/unknown-category',
    '/locality/invalid-locality',
    '/this-page-does-not-exist',
    '/blogs/unknown-category',
    '/reviews/technical-college/unknown-perspective',
  ]) {
    assert.equal(renderPage(route).seo, null, route);
  }
});

test('Vercel config provides 308 normalization and no homepage fallback rewrite', async () => {
  const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  const redirects = new Map(config.redirects.map(rule => [rule.source, rule]));
  const expectedRedirects = [
    ['/EXPLORE', '/explore'],
    ['/EXPLORE/ENGINEERING', '/explore/engineering'],
    ['/EXPLORE/BBA', '/explore/bba'],
    ['/EXPLORE/BCA', '/explore/bca'],
    ['/EXPLORE/MBA', '/explore/mba'],
    ['/EXPLORE/LAW', '/explore/law'],
    ['/EXPLORE/MEDICAL', '/explore/medical'],
    ['/EXPLORE/DESIGN', '/explore/design'],
    ['/COLLEGE/IIT-INDORE', '/college/iit-indore'],
  ];

  assert.equal(config.trailingSlash, false);
  for (const [source, destination] of expectedRedirects) {
    assert.deepEqual(redirects.get(source), {source, destination, permanent: true});
  }
  assert.equal(config.rewrites.some(rule => rule.source === '/(.*)'), false);
  assert.ok(config.rewrites.some(rule => rule.source === '/college/:id' && rule.destination === '/api/college/:id'));
  assert.equal(
    config.functions['api/college/**/*.ts'].includeFiles,
    'dist/{index.html,404.html,college/**/index.html}',
  );
  await access(path.join(root, 'api', 'college', '[id].ts'));
});

test('production HTTP server serves all generated routes and returns genuine 404s', async () => {
  const collegeRoutes = getStaticCollegeRoutes();
  const localityRoutes = getStaticLocalityRoutes();
  const editorialRoutes = getStaticEditorialRoutes();

  for (const route of [...baseRoutes, ...collegeRoutes, ...localityRoutes, ...editorialRoutes]) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type') || '', /text\/html/i, route);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/i, route);
    assert.match(html, /<link rel="canonical" href="[^"]+"/i, route);
  }

  for (const route of [
    '/college/invalid-id',
    '/explore/unknown-category',
    '/locality/invalid-locality',
    '/this-page-does-not-exist',
    '/blogs/unknown-category',
    '/reviews/technical-college/unknown-perspective',
  ]) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 404, route);
    const html = await response.text();
    assert.match(html, /Page not found|Not Found/i, route);
    assert.doesNotMatch(html, /rel="canonical"/i, route);
  }

  const sitemapXml = await readFile(path.join(root, 'dist', 'sitemap.xml'), 'utf8');
  const sitemapPaths = [...sitemapXml.matchAll(/<loc>https?:\/\/indorecolleges\.in([^<]*)<\/loc>/g)]
    .map(match => match[1]);
  assert.equal(sitemapPaths.length, 75);
  for (const route of sitemapPaths) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `Sitemap route ${route}`);
  }
});

test('unknown APIs return JSON 404 and counseling remains authorization-protected', async () => {
  const unknown = await fetch(`${baseUrl}/api/does-not-exist`);
  assert.equal(unknown.status, 404);
  assert.match(unknown.headers.get('content-type') || '', /application\/json/i);
  assert.deepEqual(await unknown.json(), {error: 'API endpoint not found.'});

  const counseling = await fetch(`${baseUrl}/api/counseling`);
  assert.equal(counseling.status, 401);
  assert.deepEqual(await counseling.json(), {error: 'A valid admin session is required.'});

  const institutes = await fetch(`${baseUrl}/api/institutes`);
  assert.match(institutes.headers.get('content-type') || '', /application\/json/i);
  if (institutes.ok) assert.equal(Array.isArray(await institutes.json()), true);
});

test('partner handler serves static profiles and distinguishes partner outcomes', async () => {
  const originalFetch = globalThis.fetch;
  try {
    const builtInResponse = createVercelResponse();
    await partnerHandler({method: 'GET', query: {id: 'iit-indore'}}, builtInResponse);
    assert.equal(builtInResponse.code, 200);
    assert.match(builtInResponse.body, /Indian Institute of Technology/);

    const approvedId = 'routing-approved-fixture';
    globalThis.fetch = async () => new Response(JSON.stringify([partnerFixture(approvedId)]), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
    const approvedResponse = createVercelResponse();
    await partnerHandler({method: 'GET', query: {id: approvedId}}, approvedResponse);
    assert.equal(approvedResponse.code, 200);
    assert.match(approvedResponse.body, /Routing Test Partner College/);

    const unapprovedId = 'routing-unapproved-fixture';
    globalThis.fetch = async () => new Response(JSON.stringify([
      {...partnerFixture(unapprovedId), isPartnerRegistered: false},
    ]), {status: 200, headers: {'Content-Type': 'application/json'}});
    const unapprovedResponse = createVercelResponse();
    await partnerHandler({method: 'GET', query: {id: unapprovedId}}, unapprovedResponse);
    assert.equal(unapprovedResponse.code, 404);

    const missingResponse = createVercelResponse();
    await partnerHandler({method: 'GET', query: {id: 'routing-missing-fixture'}}, missingResponse);
    assert.equal(missingResponse.code, 404);

    globalThis.fetch = async () => {
      throw new Error('Controlled backend outage fixture');
    };
    const unavailableResponse = createVercelResponse();
    await partnerHandler({method: 'GET', query: {id: 'routing-outage-fixture'}}, unavailableResponse);
    assert.equal(unavailableResponse.code, 503);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
