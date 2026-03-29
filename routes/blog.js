const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Blog listing
router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const { rows: posts, totalPages } = BlogPost.findPublished({ page });
  res.render('blog/index', { posts, page, totalPages, siteUrl: SITE_URL });
});

// Blog sitemap - BEFORE /:slug
router.get('/sitemap-blog.xml', (req, res) => {
  const posts = BlogPost.getSlugsForSitemap();
  let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  posts.forEach(p => {
    const lastmod = p.updated_at ? p.updated_at.split(' ')[0] : new Date().toISOString().split('T')[0];
    xml += `<url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
  });
  xml += '</urlset>';
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// Single post - AFTER sitemap
router.get('/:slug', (req, res) => {
  const post = BlogPost.findBySlug(req.params.slug);
  if (!post) return res.status(404).render('blog/404');

  BlogPost.incrementViews(post.id);
  const related = BlogPost.findRelated(post.id);
  res.render('blog/post', { post, related, siteUrl: SITE_URL });
});

module.exports = router;
