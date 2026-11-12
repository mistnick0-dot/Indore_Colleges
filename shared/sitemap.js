const SEO_ORIGIN = 'https://indorecolleges.in';

const PUBLIC_PAGE_PATHS = [
  '/',
  '/explore',
  '/explore/engineering',
  '/explore/bba',
  '/explore/bca',
  '/explore/mba',
  '/explore/law',
  '/explore/medical',
  '/explore/design',
  '/reviews',
  '/blogs',
  '/about',
  '/careers',
  '/contact',
];

const COLLEGE_PATH_PATTERN = /^\/college\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LOCALITY_PATH_PATTERN = /^\/locality\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EDITORIAL_PATH_PATTERN = /^\/(?:reviews|blogs)\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
const PARTNER_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_PAGE_PATH_SET = new Set(PUBLIC_PAGE_PATHS);

function isPublicSitemapPath(path) {
  return PUBLIC_PAGE_PATH_SET.has(path)
    || COLLEGE_PATH_PATTERN.test(path)
    || LOCALITY_PATH_PATTERN.test(path)
    || EDITORIAL_PATH_PATTERN.test(path);
}

export function getSitemapPaths(collegePaths = [], partnerIds = [], localityPaths = [], editorialPaths = []) {
  const paths = new Set(PUBLIC_PAGE_PATHS);

  collegePaths
    .filter(path => COLLEGE_PATH_PATTERN.test(path))
    .forEach(path => paths.add(path));
  localityPaths
    .filter(path => LOCALITY_PATH_PATTERN.test(path))
    .forEach(path => paths.add(path));
  editorialPaths
    .filter(path => EDITORIAL_PATH_PATTERN.test(path))
    .forEach(path => paths.add(path));
  partnerIds
    .filter(id => PARTNER_ID_PATTERN.test(id))
    .forEach(id => paths.add(`/college/${id}`));

  return [...paths];
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function createSitemapXml(paths) {
  const urls = [...new Set(paths.filter(isPublicSitemapPath))]
    .map(path => `${SEO_ORIGIN}${path}`)
    .map(url => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}
