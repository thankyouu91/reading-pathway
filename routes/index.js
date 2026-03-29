const express = require('express');
const router = express.Router();
const db = require('../database/db');

const SITE_URL = process.env.SITE_URL || 'https://readingpathway.up.railway.app';

// Landing page
router.get('/', (req, res) => {
  const lang = 'vi';
  const rows = db.prepare('SELECT section, content_key, content_value, content_type FROM content WHERE lang = ?').all(lang);

  const c = {};
  for (const row of rows) {
    if (!c[row.section]) c[row.section] = {};
    c[row.section][row.content_key] = row.content_value;
  }

  res.render('landing', { c, lang, languages: db.LANGUAGES, siteUrl: SITE_URL });
});

// Sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  res.set('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${SITE_URL}/sitemap.xml`;
  res.set('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;
