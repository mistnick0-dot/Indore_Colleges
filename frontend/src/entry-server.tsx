import React, {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App, {getCollegeJsonLd, getPageSeo, PageSeo} from './App';
import {INDORE_INSTITUTES, INDORE_LOCALITY_GROUPS} from './data/indoreData';
import {CATEGORIES_LIST, REVIEW_PERSPECTIVES} from './components/ReviewsHierarchyTable';
import {Institute} from './types';

export function getStaticCollegeRoutes(): string[] {
  return INDORE_INSTITUTES
    .filter(institute => institute.type === 'college')
    .map(institute => `/college/${institute.id}`);
}

export function getStaticLocalityRoutes(): string[] {
  return INDORE_LOCALITY_GROUPS.map(group => {
    const slug = group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `/locality/${slug}`;
  });
}

export function getStaticEditorialRoutes(): string[] {
  const slugs = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const routes: string[] = [];

  for (const basePath of ['/reviews', '/blogs']) {
    for (const category of CATEGORIES_LIST) {
      const categoryPath = `${basePath}/${slugs(category.id)}`;
      routes.push(categoryPath);
      for (const perspective of REVIEW_PERSPECTIVES) {
        routes.push(`${categoryPath}/${slugs(perspective.type)}`);
      }
    }
  }

  return routes;
}

export function renderPage(url: string, institutes: Institute[] = INDORE_INSTITUTES): {appHtml: string; seo: PageSeo | null; jsonLd: string | null} {
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialInstitutes={institutes} />
      </StaticRouter>
    </StrictMode>,
  );
  const seo = getPageSeo(url, institutes);
  const collegeId = url.startsWith('/college/') ? url.slice('/college/'.length) : '';
  const college = collegeId ? institutes.find(institute => institute.id === collegeId) : undefined;

  return {
    appHtml,
    seo,
    jsonLd: college && seo
      ? JSON.stringify(getCollegeJsonLd(college, seo.canonical, seo.description, seo.image))
      : null,
  };
}
