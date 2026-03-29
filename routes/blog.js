const express = require('express');
const router = express.Router();
const db = require('../database/db');

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Blog listing
router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = 9;
  const offset = (page - 1) * limit;
  const total = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published = 1').get().c;
  const posts = db.prepare('SELECT id, slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);

  res.render('blog/index', { posts, page, totalPages: Math.ceil(total / limit), siteUrl: SITE_URL });
});

// Blog sitemap - MUST be before /:slug
router.get('/sitemap-blog.xml', (req, res) => {
  const posts = db.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1').all();
  let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  posts.forEach(p => {
    const lastmod = p.updated_at ? p.updated_at.split(' ')[0] : new Date().toISOString().split('T')[0];
    xml += `<url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq></url>`;
  });
  xml += '</urlset>';
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// Single blog post - AFTER sitemap
router.get('/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(req.params.slug);
  if (!post) return res.status(404).render('blog/404');

  // Increment views
  db.prepare('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?').run(post.id);

  const related = db.prepare('SELECT slug, title, excerpt, cover_image FROM blog_posts WHERE is_published = 1 AND id != ? ORDER BY created_at DESC LIMIT 3').all(post.id);
  res.render('blog/post', { post, related, siteUrl: SITE_URL });
});

module.exports = router;
