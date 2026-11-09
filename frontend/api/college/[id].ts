import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {INDORE_INSTITUTES} from '../../src/data/indoreData';
import {renderPage} from '../../src/entry-server';
import {Institute} from '../../src/types';

interface VercelRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  url?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  send(body: string): VercelResponse;
  json(body: unknown): VercelResponse;
}

type CachedPartner = {
  institute: Institute;
  expiresAt: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const partnerCache = new Map<string, CachedPartner>();
const staticCollegeIds = new Set(
  INDORE_INSTITUTES
    .filter(institute => institute.type === 'college')
    .map(institute => institute.id),
);

function getQueryId(request: VercelRequest) {
  const value = request.query.id;
  return Array.isArray(value) ? value[0] : value;
}

function getApiBaseUrl() {
  return (process.env.API_URL || process.env.PARTNER_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://indore-colleges-i560.onrender.com').replace(/\/$/, '');
}

function isRecord(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function toPublicInstitute(value: unknown): Institute | null {
  if (!isRecord(value) || value.type !== 'college' || typeof value.id !== 'string' || typeof value.name !== 'string') {
    return null;
  }

  const requiredFields = [
    'category',
    'boardOrAffiliation',
    'location',
    'feePerAnnum',
    'rating',
    'totalReviews',
    'image',
    'description',
    'facilities',
    'establishedYear',
    'coordinates',
  ];
  if (requiredFields.some(field => value[field] === undefined || value[field] === null)) return null;

  return {
    id: value.id,
    name: value.name,
    type: 'college',
    category: value.category,
    boardOrAffiliation: value.boardOrAffiliation,
    location: value.location,
    feePerAnnum: Number(value.feePerAnnum),
    rating: Number(value.rating),
    ...(value.googleRating !== undefined ? {googleRating: Number(value.googleRating)} : {}),
    ...(value.indoreRating !== undefined ? {indoreRating: Number(value.indoreRating)} : {}),
    totalReviews: Number(value.totalReviews),
    image: value.image,
    description: value.description,
    facilities: Array.isArray(value.facilities) ? value.facilities : [],
    establishedYear: Number(value.establishedYear),
    coordinates: value.coordinates,
    ...(value.contactEmail ? {contactEmail: value.contactEmail} : {}),
    ...(value.contactPhone ? {contactPhone: value.contactPhone} : {}),
    ...(value.website ? {website: value.website} : {}),
    ...(value.address ? {address: value.address} : {}),
    ...(value.nearestAirport ? {nearestAirport: value.nearestAirport} : {}),
    ...(value.approval ? {approval: value.approval} : {}),
    ...(value.selectionCriteria ? {selectionCriteria: value.selectionCriteria} : {}),
    ...(Array.isArray(value.updates) ? {updates: value.updates} : {}),
    ...(Array.isArray(value.coursesList) ? {coursesList: value.coursesList} : {}),
    ...(value.placements ? {placements: value.placements} : {}),
    ...(Array.isArray(value.facultyList) ? {facultyList: value.facultyList} : {}),
    ...(Array.isArray(value.scholarships) ? {scholarships: value.scholarships} : {}),
    ...(Array.isArray(value.cutoffs) ? {cutoffs: value.cutoffs} : {}),
  };
}

async function getPartnerInstitute(id: string): Promise<Institute | null> {
  const cached = partnerCache.get(id);
  if (cached && cached.expiresAt > Date.now()) return cached.institute;
  if (cached) partnerCache.delete(id);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/institutes`, {signal: controller.signal});
    if (!response.ok) {
      throw new Error(`Partner API returned ${response.status}`);
    }
    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error('Partner API returned malformed data');

    const record = payload.find(value => isRecord(value) && value.id === id && value.isPartnerRegistered === true);
    const institute = toPublicInstitute(record);
    if (!institute) return null;

    partnerCache.set(id, {institute, expiresAt: Date.now() + CACHE_TTL_MS});
    return institute;
  } finally {
    clearTimeout(timeout);
  }
}

function escapeAttribute(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function applySeo(template: string, seo: NonNullable<ReturnType<typeof renderPage>['seo']>) {
  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);
  const canonical = escapeAttribute(seo.canonical);
  const socialUrl = escapeAttribute(seo.socialUrl);
  const ogDescription = escapeAttribute(seo.ogDescription);
  const image = escapeAttribute(seo.image);

  return template
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${socialUrl}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${ogDescription}" />`)
    .replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:url"[^>]*>/i, `<meta name="twitter:url" content="${socialUrl}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${ogDescription}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${image}" />`);
}

function serializeInitialData(institute: Institute) {
  return JSON.stringify([institute])
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

async function readTemplate() {
  const candidates = [
    path.join(process.cwd(), 'dist', 'index.html'),
    path.join(process.cwd(), 'frontend', 'dist', 'index.html'),
  ];
  for (const candidate of candidates) {
    try {
      return await readFile(candidate, 'utf8');
    } catch {
      // Try the next deployment layout.
    }
  }
  throw new Error('Frontend template was not found');
}

async function sendNotFound(response: VercelResponse) {
  let body: string;
  try {
    body = await readFile(path.join(process.cwd(), 'dist', '404.html'), 'utf8');
  } catch (error) {
    if (typeof error !== 'object' || error === null || !('code' in error) || error.code !== 'ENOENT') {
      throw error;
    }
    body = 'Not Found';
  }

  return response
    .status(404)
    .setHeader('Content-Type', body === 'Not Found' ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8')
    .send(body);
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method && request.method !== 'GET') {
    return response.status(405).setHeader('Allow', 'GET').send('Method Not Allowed');
  }

  const id = getQueryId(request);
  if (!id) return sendNotFound(response);
  if (staticCollegeIds.has(id)) {
    const profilePath = path.join(process.cwd(), 'dist', 'college', id, 'index.html');
    try {
      const html = await readFile(profilePath, 'utf8');
      return response
        .status(200)
        .setHeader('Content-Type', 'text/html; charset=utf-8')
        .setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
        .send(html);
    } catch (error) {
      if (typeof error !== 'object' || error === null || !('code' in error) || error.code !== 'ENOENT') {
        throw error;
      }
      return sendNotFound(response);
    }
  }

  let institute: Institute | null;
  try {
    institute = await getPartnerInstitute(id);
  } catch (error) {
    console.error('Partner SSR API error:', error);
    return response.status(503).send('Partner college service temporarily unavailable');
  }

  if (!institute) return sendNotFound(response);

  try {
    const route = `/college/${encodeURIComponent(institute.id)}`;
    const {appHtml, seo, jsonLd} = renderPage(route, [...INDORE_INSTITUTES, institute]);
    if (!seo || !jsonLd) return sendNotFound(response);

    const template = await readTemplate();
    const initialDataScript = `<script>window.__INITIAL_INSTITUTES__=${serializeInitialData(institute)};</script>`;
    const rootStart = template.indexOf('<div id="root">');
    const bodyEnd = template.lastIndexOf('</body>');
    if (rootStart < 0 || bodyEnd < rootStart) {
      return response.status(500).send('Frontend template root was not found');
    }
    let html = `${template.slice(0, rootStart)}<div id="root">${appHtml}</div>${template.slice(bodyEnd)}`;
    html = applySeo(html, seo);
    html = html.replace('</head>', `${initialDataScript}<script id="college-profile-seo-jsonld" type="application/ld+json">${jsonLd}</script></head>`);

    return response
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
      .send(html);
  } catch (error) {
    console.error('Partner SSR render error:', error);
    return response.status(500).send('Unable to render partner college page');
  }
}
