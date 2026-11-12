import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer as createNetServer} from 'node:net';
import {readFile, access} from 'node:fs/promises';
import {after, before, test} from 'node:test';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import {getPageSeo, updateRobotsMeta} from '../frontend/src/App.tsx';
import {INDORE_INSTITUTES, INDORE_LOCALITY_GROUPS} from '../frontend/src/data/indoreData.ts';
import {
  getStaticCollegeRoutes,
  getStaticEditorialRoutes,
  getStaticLocalityRoutes,
  renderPage,
} from '../frontend/src/entry-server.tsx';
import partnerHandler from '../frontend/api/college/[id].ts';
import {createSitemapXml, getSitemapPaths} from '../shared/sitemap.js';

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

function getSingleMatch(html, pattern, label, route) {
  const matches = [...html.matchAll(pattern)];
  assert.equal(matches.length, 1, `${label} tag count for ${route}`);
  return matches[0][1]
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function getHtmlSeo(html, route) {
  return {
    title: getSingleMatch(html, /<title>([^<]*)<\/title>/gi, 'title', route),
    description: getSingleMatch(html, /<meta name="description" content="([^"]*)"[^>]*\/>/gi, 'description', route),
    canonical: getSingleMatch(html, /<link rel="canonical" href="([^"]*)"[^>]*\/>/gi, 'canonical', route),
    ogUrl: getSingleMatch(html, /<meta property="og:url" content="([^"]*)"[^>]*\/>/gi, 'Open Graph URL', route),
    ogTitle: getSingleMatch(html, /<meta property="og:title" content="([^"]*)"[^>]*\/>/gi, 'Open Graph title', route),
    ogDescription: getSingleMatch(html, /<meta property="og:description" content="([^"]*)"[^>]*\/>/gi, 'Open Graph description', route),
    twitterUrl: getSingleMatch(html, /<meta name="twitter:url" content="([^"]*)"[^>]*\/>/gi, 'Twitter URL', route),
    twitterTitle: getSingleMatch(html, /<meta name="twitter:title" content="([^"]*)"[^>]*\/>/gi, 'Twitter title', route),
    twitterDescription: getSingleMatch(html, /<meta name="twitter:description" content="([^"]*)"[^>]*\/>/gi, 'Twitter description', route),
    robots: getSingleMatch(html, /<meta name="robots" content="([^"]*)"[^>]*\/>/gi, 'robots', route),
  };
}

async function readPrerenderedHtml(route) {
  const filePath = route === '/'
    ? path.join(root, 'dist', 'index.html')
    : path.join(root, 'dist', route.slice(1), 'index.html');
  return readFile(filePath, 'utf8');
}

function getInternalAnchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1[^>]*>/gi)]
    .map(match => match[2].replaceAll('&amp;', '&'))
    .filter(href => href.startsWith('/'));
}

function parseSitemapXml(xml) {
  const tokens = xml.match(/<\?xml[^?]*\?>|<\/?[^>]+>|[^<]+/g) || [];
  assert.equal(tokens.join(''), xml, 'Sitemap must contain only well-formed XML tokens and text');
  assert.match(tokens[0] || '', /^<\?xml version="1\.0" encoding="UTF-8"\?>$/);

  const stack = [];
  const urls = [];
  let currentUrl = '';
  let sawRoot = false;

  for (const token of tokens.slice(1)) {
    if (token.startsWith('</')) {
      const name = token.slice(2, -1);
      assert.equal(stack.pop(), name, `Unexpected closing XML tag ${token}`);
      if (name === 'url') {
        urls.push(currentUrl);
        currentUrl = '';
      }
      continue;
    }

    if (token.startsWith('<')) {
      if (token.startsWith('<urlset ')) {
        assert.equal(token, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        assert.equal(sawRoot, false, 'Sitemap must have exactly one root element');
        assert.equal(stack.length, 0);
        sawRoot = true;
        stack.push('urlset');
      } else if (token === '<url>') {
        assert.equal(stack.at(-1), 'urlset');
        stack.push('url');
      } else if (token === '<loc>') {
        assert.equal(stack.at(-1), 'url');
        stack.push('loc');
      } else {
        assert.fail(`Unexpected XML element ${token}`);
      }
      continue;
    }

    if (stack.at(-1) === 'loc') {
      assert.doesNotMatch(token, /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i);
      currentUrl += token
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&apos;', "'");
    } else {
      assert.match(token, /^\s*$/, 'Sitemap may only contain whitespace outside loc elements');
    }
  }

  assert.equal(sawRoot, true, 'Sitemap must have a urlset root element');
  assert.deepEqual(stack, [], 'All XML elements must be closed');
  return urls;
}

async function assertGeneratedSeo(route) {
  const filePath = path.join(root, 'dist', route.slice(1), 'index.html');
  const html = await readFile(filePath, 'utf8');
  const actual = getHtmlSeo(html, route);
  const expected = getPageSeo(route, INDORE_INSTITUTES);
  assert.ok(expected, `Expected SEO for ${route}`);
  assert.deepEqual(actual, {
    title: expected.title,
    description: expected.description,
    canonical: expected.canonical,
    ogUrl: expected.socialUrl,
    ogTitle: expected.title,
    ogDescription: expected.ogDescription,
    twitterUrl: expected.socialUrl,
    twitterTitle: expected.title,
    twitterDescription: expected.ogDescription,
    robots: expected.robots,
  }, `Generated metadata for ${route}`);
  return actual;
}

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

test('prerendered locality and editorial pages have unique route-specific SEO metadata', async () => {
  const localityRoutes = getStaticLocalityRoutes();
  const editorialRoutes = getStaticEditorialRoutes();
  assert.equal(localityRoutes.length, 4);
  assert.equal(editorialRoutes.length, 48);

  const routeSpecificMetadata = [];
  for (const route of [...localityRoutes, ...editorialRoutes]) {
    const metadata = await assertGeneratedSeo(route);
    assert.notEqual(metadata.title, 'Indore Colleges | Compare Courses, Fees & Admission', route);
    assert.notEqual(metadata.description, getPageSeo('/', INDORE_INSTITUTES).description, route);
    assert.equal(metadata.canonical, `https://indorecolleges.in${route}`, route);
    assert.equal(metadata.ogUrl, metadata.canonical, route);
    assert.equal(metadata.twitterUrl, metadata.canonical, route);
    routeSpecificMetadata.push(metadata);
  }

  assert.equal(new Set(routeSpecificMetadata.map(metadata => metadata.title)).size, 52);
  assert.equal(new Set(routeSpecificMetadata.map(metadata => metadata.description)).size, 52);
});

test('all generated college and category pages retain their route-specific SEO metadata', async () => {
  const collegeRoutes = getStaticCollegeRoutes();
  const categoryRoutes = categorySlugs.map(slug => `/explore/${slug}`);
  assert.equal(collegeRoutes.length, 62);
  assert.equal(categoryRoutes.length, 7);

  for (const route of [...collegeRoutes, ...categoryRoutes]) {
    const metadata = await assertGeneratedSeo(route);
    assert.equal(metadata.canonical, `https://indorecolleges.in${route}`, route);
    assert.equal(metadata.ogUrl, metadata.canonical, route);
    assert.equal(metadata.twitterUrl, metadata.canonical, route);
  }
});

test('utility routes are noindex and public SEO routes remain indexable in prerendered HTML', async () => {
  const utilityRoutes = ['/register', '/college-portal', '/dashboard', '/admin-panel'];
  for (const route of utilityRoutes) {
    const metadata = await assertGeneratedSeo(route);
    assert.equal(metadata.robots, 'noindex, follow', route);
    const html = await readPrerenderedHtml(route);
    const head = html.slice(0, html.indexOf('</head>'));
    assert.equal([...head.matchAll(/<meta name="robots"/gi)].length, 1, `${route} robots tag count`);
  }

  const publicRoutes = [
    '/',
    '/reviews',
    '/blogs',
    '/explore',
    '/about',
    '/careers',
    '/contact',
    '/explore/engineering',
    '/college/iit-indore',
    getStaticLocalityRoutes()[0],
    getStaticEditorialRoutes()[0],
  ];
  for (const route of publicRoutes) {
    const metadata = await assertGeneratedSeo(route);
    assert.equal(metadata.robots, 'index, follow', route);
  }

  const robotsTxt = await readFile(path.join(root, 'frontend', 'public', 'robots.txt'), 'utf8');
  assert.match(robotsTxt, /Sitemap:\s*https:\/\/indorecolleges\.in\/sitemap\.xml/);
  for (const route of utilityRoutes) {
    assert.doesNotMatch(robotsTxt, new RegExp(`^Disallow:\\s*${route.replaceAll('/', '\\/')}`, 'm'));
  }
});

test('client-side navigation resets robots metadata when SEO configuration is absent', () => {
  const originalDocument = globalThis.document;
  const metaTags = [];
  const createMetaTag = () => {
    const attributes = new Map([['name', 'robots']]);
    return {
      setAttribute(name, value) {
        attributes.set(name, value);
      },
      getAttribute(name) {
        return attributes.get(name) ?? null;
      },
      remove() {
        const index = metaTags.indexOf(this);
        if (index !== -1) metaTags.splice(index, 1);
      },
    };
  };
  const head = {
    querySelectorAll(selector) {
      const match = selector.match(/^meta\[name="([^"]+)"\]$/);
      return match ? metaTags.filter(tag => tag.getAttribute('name') === match[1]) : [];
    },
    appendChild(tag) {
      metaTags.push(tag);
      return tag;
    },
  };
  globalThis.document = {
    head,
    createElement(tagName) {
      assert.equal(tagName, 'meta');
      return createMetaTag();
    },
  };

  const assertRobots = expected => {
    assert.equal(metaTags.length, 1, 'There must be exactly one robots meta tag');
    assert.equal(metaTags[0].getAttribute('content'), expected);
  };

  try {
    metaTags.push(createMetaTag(), createMetaTag());
    updateRobotsMeta(getPageSeo('/dashboard', INDORE_INSTITUTES));
    assertRobots('noindex, follow');
    updateRobotsMeta(null);
    assertRobots('noindex, follow');

    updateRobotsMeta(getPageSeo('/', INDORE_INSTITUTES));
    assertRobots('index, follow');
    updateRobotsMeta(null);
    assertRobots('noindex, follow');

    updateRobotsMeta(null);
    assertRobots('noindex, follow');
    updateRobotsMeta(getPageSeo('/reviews', INDORE_INSTITUTES));
    assertRobots('index, follow');

    updateRobotsMeta(null);
    assertRobots('noindex, follow');
    updateRobotsMeta(getPageSeo('/register', INDORE_INSTITUTES));
    assertRobots('noindex, follow');
  } finally {
    if (originalDocument === undefined) {
      delete globalThis.document;
    } else {
      globalThis.document = originalDocument;
    }
  }
});

test('reviews and informational pages have unique, route-appropriate metadata', async () => {
  const routes = ['/reviews', '/blogs', '/explore', '/about', '/careers', '/contact'];
  const metadata = [];
  for (const route of routes) {
    metadata.push(await assertGeneratedSeo(route));
  }

  const reviews = metadata[0];
  assert.notEqual(reviews.title, getPageSeo('/', INDORE_INSTITUTES).title);
  assert.notEqual(reviews.description, getPageSeo('/', INDORE_INSTITUTES).description);
  assert.equal(reviews.canonical, 'https://indorecolleges.in/reviews');
  assert.equal(reviews.ogUrl, reviews.canonical);
  assert.equal(reviews.twitterUrl, reviews.canonical);
  assert.equal(reviews.ogTitle, reviews.title);
  assert.equal(reviews.ogDescription, reviews.description);
  assert.equal(reviews.twitterTitle, reviews.title);
  assert.equal(reviews.twitterDescription, reviews.description);

  const informational = metadata.slice(1);
  assert.equal(new Set(informational.map(page => page.description)).size, informational.length);
  assert.equal(new Set(informational.map(page => page.description)).size, routes.length - 1);
  for (const [page, topic] of informational.map((page, index) => [
    page,
    [/reviews|guides/i, /browse|colleges|course/i, /learn|mission|institutions/i, /careers|team/i, /contact|fees|counselling/i][index],
  ])) {
    assert.match(page.description, topic);
  }
  for (const page of informational) {
    assert.notEqual(page.description, getPageSeo('/', INDORE_INSTITUTES).description);
    assert.equal(page.ogUrl, page.canonical);
    assert.equal(page.twitterUrl, page.canonical);
  }
});

test('homepage H1 is visible before hydration and JSON-LD entity references are consistent', async () => {
  const html = await readPrerenderedHtml('/');
  const heading = html.match(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/i);
  assert.ok(heading, 'Homepage H1 must be present in generated HTML');
  assert.match(heading[2], /Find the best colleges in Indore/);
  assert.doesNotMatch(heading[1], /opacity\s*:\s*0(?:[;\s]|$)/i);

  const schemaScripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  assert.equal(schemaScripts.length, 1, 'Homepage must have one JSON-LD block');
  const schema = JSON.parse(schemaScripts[0][1]);
  const entities = schema['@graph'];
  const websites = entities.filter(entity => entity['@type'] === 'WebSite');
  const organizations = entities.filter(entity => entity['@type'] === 'EducationalOrganization');
  assert.equal(websites.length, 1);
  assert.equal(organizations.length, 1);
  assert.equal(websites[0]['@id'], 'https://indorecolleges.in/#website');
  assert.equal(websites[0].publisher['@id'], organizations[0]['@id']);
  assert.equal(organizations[0]['@id'], 'https://indorecolleges.in/#organization');
  assert.ok(
    (organizations[0].sameAs || []).every(url => !/^https:\/\/(www\.)?(facebook|twitter|instagram)\.com\/?$/i.test(url)),
    'sameAs must not contain generic social-network homepages',
  );
});

test('footer policy labels are not placeholder links', async () => {
  const footer = await readFile(path.join(root, 'frontend', 'src', 'components', 'Footer.tsx'), 'utf8');
  for (const label of ['Terms &amp; Conditions', 'Privacy Policy', 'Refund Policy']) {
    assert.doesNotMatch(footer, new RegExp(`<a\\s+href="#"[^>]*>${label}</a>`, 'i'));
  }
  const html = await readPrerenderedHtml('/');
  assert.doesNotMatch(html, /<a\b[^>]*href="#"[^>]*>(?:Terms &amp; Conditions|Privacy Policy|Refund Policy)<\/a>/i);
});

test('image hints use known logo dimensions and lazy-load only below-fold media', async () => {
  const homepage = await readPrerenderedHtml('/');
  assert.match(homepage, /<img\b[^>]*src="\/logo\.svg"[^>]*width="1123"[^>]*height="928"/i);
  assert.doesNotMatch(homepage, /<img\b[^>]*src="\/bg2\.jpeg"[^>]*loading="lazy"/i);

  const reviews = await readFile(path.join(root, 'frontend', 'src', 'components', 'ReviewsHierarchyTable.tsx'), 'utf8');
  assert.match(reviews, /src=\{video\.thumbnail\}[\s\S]{0,100}loading="lazy"/);
  const collegeDetail = await readFile(path.join(root, 'frontend', 'src', 'components', 'CollegeDetailPage.tsx'), 'utf8');
  assert.match(collegeDetail, /src=\{institute\.image\}[\s\S]{0,100}loading="lazy"/);
});

test('prerendered locality and editorial navigation uses valid crawlable links', async () => {
  const localityRoutes = getStaticLocalityRoutes();
  const editorialRoutes = getStaticEditorialRoutes();
  const editorialRouteSet = new Set(editorialRoutes);
  const homepageHtml = await readPrerenderedHtml('/');
  const localityLinks = getInternalAnchorHrefs(homepageHtml)
    .filter(href => localityRoutes.includes(href));

  assert.equal(localityRoutes.length, 4);
  assert.deepEqual([...localityLinks].sort(), [...localityRoutes].sort());
  assert.equal(localityLinks.length, new Set(localityLinks).size, 'Each locality card must have one unique href');

  const editorialNavigationLinks = [];
  for (const basePath of ['/reviews', '/blogs']) {
    const landingHtml = await readPrerenderedHtml(basePath);
    const categoryRoutes = editorialRoutes.filter(route =>
      route.startsWith(`${basePath}/`) && route.slice(basePath.length + 1).indexOf('/') === -1
    );
    const categoryLinks = getInternalAnchorHrefs(landingHtml)
      .filter(href => editorialRouteSet.has(href));

    assert.deepEqual([...categoryLinks].sort(), [...categoryRoutes].sort(), `${basePath} category links`);
    assert.equal(categoryLinks.length, new Set(categoryLinks).size, `${basePath} category links must be unique`);
    editorialNavigationLinks.push(...categoryLinks);

    for (const categoryRoute of categoryRoutes) {
      const categoryHtml = await readPrerenderedHtml(categoryRoute);
      const perspectiveRoutes = editorialRoutes.filter(route => route.startsWith(`${categoryRoute}/`));
      const perspectiveLinks = getInternalAnchorHrefs(categoryHtml)
        .filter(href => editorialRouteSet.has(href));

      assert.deepEqual(
        [...perspectiveLinks].sort(),
        [...perspectiveRoutes].sort(),
        `${categoryRoute} perspective links`,
      );
      assert.equal(
        perspectiveLinks.length,
        new Set(perspectiveLinks).size,
        `${categoryRoute} perspective links must be unique`,
      );
      editorialNavigationLinks.push(...perspectiveLinks);

      for (const perspectiveRoute of perspectiveRoutes) {
        const perspectiveHtml = await readPrerenderedHtml(perspectiveRoute);
        const breadcrumbLinks = getInternalAnchorHrefs(perspectiveHtml);
        assert.ok(breadcrumbLinks.includes(basePath), `${perspectiveRoute} must link to ${basePath}`);
        assert.ok(
          breadcrumbLinks.includes(categoryRoute),
          `${perspectiveRoute} must link to parent category ${categoryRoute}`,
        );
      }
    }
  }

  assert.equal(editorialRoutes.length, 48);
  assert.deepEqual([...new Set(editorialNavigationLinks)].sort(), [...editorialRoutes].sort());
  assert.equal(editorialNavigationLinks.length, 48, 'Editorial routes must be reached through unique anchors');
  for (const href of [...localityLinks, ...editorialNavigationLinks]) {
    assert.ok(
      localityRoutes.includes(href) || editorialRouteSet.has(href),
      `Unexpected internal navigation target ${href}`,
    );
    const response = await fetch(`${baseUrl}${href}`);
    assert.equal(response.status, 200, `Crawlable internal link ${href}`);
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
  const sitemapUrls = parseSitemapXml(sitemapXml);
  const sitemapPaths = sitemapUrls.map(url => {
    const parsedUrl = new URL(url);
    assert.equal(parsedUrl.origin, 'https://indorecolleges.in');
    assert.equal(parsedUrl.pathname + parsedUrl.search + parsedUrl.hash, parsedUrl.pathname);
    return parsedUrl.pathname;
  });
  assert.equal(sitemapPaths.length, 128);
  assert.equal(sitemapPaths.filter(route => route === '/').length, 1);
  assert.equal(sitemapPaths.filter(route => /^\/explore\/[^/]+$/.test(route)).length, 7);
  assert.equal(sitemapPaths.filter(route => route.startsWith('/college/')).length, 62);
  assert.equal(sitemapPaths.filter(route => route.startsWith('/locality/')).length, 4);
  assert.equal(sitemapPaths.filter(route => /^\/(reviews|blogs)\//.test(route)).length, 48);
  assert.equal(sitemapPaths.filter(route => route === '/reviews').length, 1);
  assert.equal(sitemapPaths.filter(route => ['/explore', '/blogs', '/about', '/careers', '/contact'].includes(route)).length, 5);
  const expectedSitemapPaths = getSitemapPaths(
    collegeRoutes,
    [],
    localityRoutes,
    editorialRoutes,
  );
  assert.deepEqual(new Set(sitemapPaths), new Set(expectedSitemapPaths));
  assert.equal(sitemapPaths.length, new Set(sitemapPaths).size, 'Sitemap URLs must be unique');

  const categoryRoutes = categorySlugs.map(slug => `/explore/${slug}`);
  for (const route of [
    ...collegeRoutes,
    ...categoryRoutes,
    ...localityRoutes,
    ...editorialRoutes,
    '/',
    '/reviews',
    '/explore',
    '/blogs',
    '/about',
    '/careers',
    '/contact',
  ]) {
    assert.ok(sitemapPaths.includes(route), `Expected sitemap route ${route}`);
  }

  for (const route of [
    '/register',
    '/dashboard',
    '/college-portal',
    '/admin-panel',
  ]) {
    assert.ok(!sitemapPaths.includes(route), `Private utility route must not be in sitemap: ${route}`);
  }

  const vercelConfig = JSON.parse(await readFile(path.join(root, 'frontend', 'vercel.json'), 'utf8'));
  assert.deepEqual(vercelConfig.routes[0], {handle: 'filesystem'});
  assert.deepEqual(vercelConfig.routes[1], {src: '/sitemap.xml', dest: '/api/sitemap'});

  for (const route of sitemapPaths) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `Sitemap route ${route}`);
  }
});

test('sitemap generator includes only canonical public route shapes and deduplicates URLs', () => {
  const routes = getSitemapPaths(
    ['/college/iit-indore', '/college/iit-indore', '/college/invalid id'],
    [],
    ['/locality/indore-city', '/locality/not a locality'],
    ['/reviews/technical-college', '/blogs/technical-college/review-by-actual-students', '/blogs/unknown/path/extra'],
  );
  const xml = createSitemapXml([...routes, ...routes, '/admin-panel', '/dashboard']);
  const urls = parseSitemapXml(xml);

  assert.equal(urls.length, new Set(urls).size);
  assert.ok(urls.includes('https://indorecolleges.in/reviews'));
  assert.ok(urls.includes('https://indorecolleges.in/college/iit-indore'));
  assert.ok(urls.includes('https://indorecolleges.in/locality/indore-city'));
  assert.ok(urls.includes('https://indorecolleges.in/reviews/technical-college'));
  assert.ok(urls.includes('https://indorecolleges.in/blogs/technical-college/review-by-actual-students'));
  assert.ok(!urls.some(url => /admin-panel|dashboard|invalid|extra/.test(url)));
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
