import assert from 'node:assert/strict';
import React from 'react';
import {test} from 'node:test';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Home from '../frontend/src/components/Home.tsx';

const noop = () => {};

function renderHome() {
  return renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      null,
      React.createElement(Home, {
        setActiveTab: noop,
        setInstituteTypeFilter: noop,
        setSelectedCategory: noop,
        setSelectedBoard: noop,
        setSelectedLocation: noop,
        setSearchQuery: noop,
        onOpenCounseling: noop,
      }),
    ),
  );
}

test('homepage renders all FAQ questions and answers in the initial HTML', () => {
  const html = renderHome();
  const faqs = [
    [
      'How can I find the best colleges in Indore?',
      'You can explore colleges on IndoreColleges.in by course, review available college profiles and compare information such as courses, fees, eligibility and placements.',
    ],
    [
      'Which are the best engineering colleges in Indore?',
      'Explore the engineering colleges listed on IndoreColleges.in and compare their courses, admission requirements, facilities and available placement information.',
    ],
    [
      'How can I compare MBA colleges in Indore?',
      'Compare MBA colleges based on specializations, fees, eligibility, admission requirements and available placement records.',
    ],
    [
      'Are there government and private colleges in Indore?',
      'Indore has both government and private higher education institutions. Check individual college profiles for verified ownership and admission information.',
    ],
    [
      'How can I find BBA and BCA colleges in Indore?',
      'Use the course discovery options on IndoreColleges.in to explore BBA and BCA colleges and review their available course and admission information.',
    ],
    [
      'What should I check before selecting a college?',
      'Review accreditation, course recognition, fees, eligibility, infrastructure, faculty information, location and verified placement records before making a decision.',
    ],
  ];

  assert.match(html, /Frequently Asked Questions About Colleges in Indore/);
  assert.equal((html.match(/aria-controls="homepage-faq-answer-/g) || []).length, faqs.length);
  for (const [question, answer] of faqs) {
    assert.ok(html.includes(question), `Missing FAQ question: ${question}`);
    assert.ok(html.includes(answer), `Missing FAQ answer: ${answer}`);
  }
  assert.equal((html.match(/aria-expanded="false"/g) || []).length, faqs.length);
});

test('homepage directory and course navigation expose real route hrefs', () => {
  const html = renderHome();
  const routes = ['engineering', 'bba', 'mba', 'bca', 'mca', 'paramedical', 'pharmacy', 'bcom', 'bsc', 'design', 'law'];

  assert.match(html, /href="\/explore"/);
  for (const route of routes) {
    assert.ok(html.includes(`href="/explore/${route}"`), `Missing crawlable course route: ${route}`);
  }
  assert.match(html, /href="\/explore\/engineering"/);
  assert.doesNotMatch(html, /href="#"|href=""/);
  assert.doesNotMatch(html, /College category pages/);
});
