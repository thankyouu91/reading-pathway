const express = require('express');
const router = express.Router();
const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Content cache (1 minute TTL)
const contentCache = new Map();
const CACHE_TTL = 60 * 1000;

function getContent(lang) {
  const cached = contentCache.get(lang);
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.data;

  const rows = db.prepare('SELECT section, content_key, content_value, content_type FROM content WHERE lang = ?').all(lang);
  const c = {};
  for (const row of rows) {
    if (!c[row.section]) c[row.section] = {};
    c[row.section][row.content_key] = row.content_type === 'image'
      ? row.content_value
      : DOMPurify.sanitize(row.content_value, { ALLOWED_TAGS: [] });
  }

  contentCache.set(lang, { data: c, time: Date.now() });
  return c;
}

// Invalidate cache (called after admin updates)
function invalidateCache() { contentCache.clear(); }

// Landing page
router.get('/', (req, res) => {
  const c = getContent('vi');
  res.render('landing', { c, lang: 'vi', languages: db.LANGUAGES, siteUrl: SITE_URL });
});

// Google Search Console verification
router.get('/google28ee83266684b88b.html', (req, res) => {
  res.send('google-site-verification: google28ee83266684b88b.html');
});

// Sitemap
router.get('/sitemap.xml', (req, res) => {
  const posts = db.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1').all();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  posts.forEach(p => {
    const lastmod = p.updated_at ? p.updated_at.split(' ')[0] : new Date().toISOString().split('T')[0];
    xml += `\n  <url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`;
  });
  xml += '\n</urlset>';
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt
router.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: ${SITE_URL}/sitemap.xml`);
});

module.exports = router;
module.exports.invalidateCache = invalidateCache;
