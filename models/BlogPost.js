const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

const SAFE_HTML_TAGS = ['p','br','h1','h2','h3','h4','h5','h6','ul','ol','li','a','strong','em','img','blockquote','pre','code','table','tr','td','th','thead','tbody','span'];
const SAFE_ATTRS = ['href','src','alt','class','target','style','width','height'];

module.exports = {
  findPublished({ page = 1, limit = 9 } = {}) {
    const offset = (page - 1) * limit;
    const total = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published = 1').get().c;
    const rows = db.prepare('SELECT id, slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
    return { rows, total, page, totalPages: Math.ceil(total / limit) };
  },

  findBySlug(slug) {
    return db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(slug);
  },

  findAll() {
    return db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);
  },

  findRelated(excludeId, limit = 3) {
    return db.prepare('SELECT slug, title, excerpt, cover_image FROM blog_posts WHERE is_published = 1 AND id != ? ORDER BY created_at DESC LIMIT ?').all(excludeId, limit);
  },

  incrementViews(id) {
    db.prepare('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?').run(id);
  },

  save({ id, title, slug, excerpt, content, cover_image, meta_description, meta_keywords, is_published }) {
    const cleanSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cleanTitle = DOMPurify.sanitize(title, { ALLOWED_TAGS: [] });
    const cleanExcerpt = DOMPurify.sanitize(excerpt, { ALLOWED_TAGS: [] });
    const cleanContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: SAFE_HTML_TAGS, ALLOWED_ATTR: SAFE_ATTRS });
    const cleanMeta = DOMPurify.sanitize(meta_description || '', { ALLOWED_TAGS: [] });
    const cleanKeywords = DOMPurify.sanitize(meta_keywords || '', { ALLOWED_TAGS: [] });
    const pub = is_published ? 1 : 0;

    if (id) {
      db.prepare('UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover_image=?, meta_description=?, meta_keywords=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?')
        .run(cleanTitle, cleanSlug, cleanExcerpt, cleanContent, cover_image || '', cleanMeta, cleanKeywords, pub, id);
    } else {
      db.prepare('INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, meta_description, meta_keywords, is_published) VALUES (?,?,?,?,?,?,?,?)')
        .run(cleanTitle, cleanSlug, cleanExcerpt, cleanContent, cover_image || '', cleanMeta, cleanKeywords, pub);
    }
  },

  delete(id) {
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);
  },

  getSlugsForSitemap() {
    return db.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1').all();
  }
};
