import {createRequire} from 'node:module';
import {readFile, rm, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createSitemapXml, getSitemapPaths} from '../shared/sitemap.js';

const workingDirectory = process.cwd();
const frontendDirectory = path.basename(workingDirectory) === 'frontend'
  ? workingDirectory
  : path.join(workingDirectory, 'frontend');
const {build} = createRequire(path.join(frontendDirectory, 'package.json'))('esbuild');
const outputDirectory = path.join(workingDirectory, 'dist');
const serverBundleDirectory = path.join(outputDirectory, '.prerender');
const serverBundlePath = path.join(serverBundleDirectory, 'entry-server.mjs');
const templatePath = path.join(outputDirectory, 'index.html');

const baseRoutes = [
  '/',
  '/explore',
  '/explore/engineering',
  '/explore/bba',
  '/explore/bca',
  '/explore/mba',
  '/explore/law',
  '/explore/medical',
  '/explore/design',
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

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function applySeo(template, seo) {
  if (!seo) return template;

  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);
  const canonical = escapeAttribute(seo.canonical);
  const socialUrl = escapeAttribute(seo.socialUrl);
  const ogDescription = escapeAttribute(seo.ogDescription);
  const image = escapeAttribute(seo.image);
  const robots = escapeAttribute(seo.robots);

  let html = replaceTag(template, /<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
  html = replaceTag(html, /<meta name="robots"[^>]*>/i, `<meta name="robots" content="${robots}" />`);
  html = replaceTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceTag(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${socialUrl}" />`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${ogDescription}" />`);
  html = replaceTag(html, /<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${image}" />`);
  html = replaceTag(html, /<meta name="twitter:url"[^>]*>/i, `<meta name="twitter:url" content="${socialUrl}" />`);
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${ogDescription}" />`);
  html = replaceTag(html, /<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${image}" />`);
  return html;
}

function applyJsonLd(template, jsonLd) {
  if (!jsonLd) return template;

  const script = `<script id="college-profile-seo-jsonld" type="application/ld+json">${jsonLd}</script>`;
  return template.replace('</head>', `${script}</head>`);
}

function routeOutputPath(route) {
  return route === '/' ? path.join(outputDirectory, 'index.html') : path.join(outputDirectory, route.slice(1), 'index.html');
}

await mkdir(serverBundleDirectory, {recursive: true});
await build({
  entryPoints: [path.join(frontendDirectory, 'src', 'entry-server.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: serverBundlePath,
  packages: 'external',
});

const template = await readFile(templatePath, 'utf8');
const renderer = await import(`${pathToFileURL(serverBundlePath).href}?build=${Date.now()}`);
const collegeRoutes = renderer.getStaticCollegeRoutes();
const localityRoutes = renderer.getStaticLocalityRoutes();
const editorialRoutes = renderer.getStaticEditorialRoutes();
const routes = [...baseRoutes, ...collegeRoutes, ...localityRoutes, ...editorialRoutes];

for (const route of routes) {
  const {appHtml, seo, jsonLd} = renderer.renderPage(route);
  const hydrationHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/gi, '');
  const htmlWithApp = template.replace('<div id="root"></div>', `<div id="root">${hydrationHtml}</div>`);
  const html = applyJsonLd(applySeo(htmlWithApp, seo), jsonLd);
  const outputPath = routeOutputPath(route);
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, html, 'utf8');
}

const sitemapPaths = getSitemapPaths(collegeRoutes, [], localityRoutes, editorialRoutes);
await writeFile(path.join(outputDirectory, 'sitemap.xml'), createSitemapXml(sitemapPaths), 'utf8');

await rm(serverBundleDirectory, {recursive: true, force: true});
console.log(`Prerendered ${routes.length} routes (${collegeRoutes.length} colleges, ${localityRoutes.length} localities, ${editorialRoutes.length} editorial routes) to ${outputDirectory}`);
