const express = require('express');
const router = express.Router();
const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

router.get('/', (req, res) => {
  const lang = 'vi';
  const rows = db.prepare('SELECT section, content_key, content_value, content_type FROM content WHERE lang = ?').all(lang);

  const c = {};
  for (const row of rows) {
    if (!c[row.section]) c[row.section] = {};
    // Sanitize text content, allow images through
    if (row.content_type === 'image') {
      c[row.section][row.content_key] = row.content_value;
    } else {
      c[row.section][row.content_key] = DOMPurify.sanitize(row.content_value, { ALLOWED_TAGS: [] });
    }
  }

  res.render('landing', { c, lang, languages: db.LANGUAGES, siteUrl: SITE_URL });
});

// Google Search Console verification
router.get('/google28ee83266684b88b.html', (req, res) => {
  res.send('google-site-verification: google28ee83266684b88b.html');
});

// Sitemap
router.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>`);
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: ${SITE_URL}/sitemap.xml`);
});

module.exports = router;
