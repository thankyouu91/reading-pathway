const express = require('express');
const router = express.Router();
const db = require('../database/db');
const Content = require('../models/Content');
const BlogPost = require('../models/BlogPost');

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Landing page (cached via Content model)
router.get('/', (req, res) => {
  const c = Content.getAll('vi');
  res.render('landing', { c, lang: 'vi', languages: db.LANGUAGES, siteUrl: SITE_URL });
});

// Google Search Console
router.get('/google28ee83266684b88b.html', (req, res) => {
  res.send('google-site-verification: google28ee83266684b88b.html');
});

// Sitemap (includes blog)
router.get('/sitemap.xml', (req, res) => {
  const posts = BlogPost.getSlugsForSitemap();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  posts.forEach(p => {
    const lastmod = p.updated_at ? p.updated_at.split(' ')[0] : new Date().toISOString().split('T')[0];
    xml += `\n  <url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><priority>0.6</priority></url>`;
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
