const express = require('express');
const router = express.Router();
const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Blog listing
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;
  const total = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published = 1').get().c;
  const posts = db.prepare('SELECT id, slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);

  res.render('blog/index', {
    posts, page, totalPages: Math.ceil(total / limit), siteUrl: SITE_URL
  });
});

// Single blog post
router.get('/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(req.params.slug);
  if (!post) return res.status(404).render('blog/404');

  // Get related posts
  const related = db.prepare('SELECT slug, title, excerpt, cover_image FROM blog_posts WHERE is_published = 1 AND id != ? ORDER BY created_at DESC LIMIT 3').all(post.id);

  res.render('blog/post', { post, related, siteUrl: SITE_URL });
});

// Blog sitemap
router.get('/sitemap-blog.xml', (req, res) => {
  const posts = db.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1').all();
  let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  posts.forEach(p => {
    xml += `<url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${p.updated_at.split(' ')[0]}</lastmod><changefreq>monthly</changefreq></url>`;
  });
  xml += '</urlset>';
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
