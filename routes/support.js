const express = require('express');
const router = express.Router();

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

router.get('/faq', (req, res) => {
  res.render('support/faq-page', {
    page: 'faq',
    pageTitle: 'Câu Hỏi Thường Gặp (FAQ)',
    pageDesc: 'Giải đáp các thắc mắc phổ biến về Reading Pathway, Trophy9, Achieve3000 và chỉ số Lexile.',
    siteUrl: SITE_URL,
  });
});

router.get('/huong-dan', (req, res) => {
  res.render('support/guide-page', {
    page: 'guide',
    pageTitle: 'Hướng Dẫn Sử Dụng',
    pageDesc: 'Hướng dẫn từng bước sử dụng nền tảng Trophy9 và Achieve3000 hiệu quả nhất.',
    siteUrl: SITE_URL,
  });
});

router.get('/chinh-sach-bao-mat', (req, res) => {
  res.render('support/privacy-page', {
    page: 'privacy',
    pageTitle: 'Chính Sách Bảo Mật',
    pageDesc: 'Chính sách bảo mật và quyền riêng tư của Reading Pathway – Cdimex Education.',
    siteUrl: SITE_URL,
  });
});

router.get('/dieu-khoan', (req, res) => {
  res.render('support/terms-page', {
    page: 'terms',
    pageTitle: 'Điều Khoản Sử Dụng',
    pageDesc: 'Điều khoản và điều kiện sử dụng dịch vụ Reading Pathway.',
    siteUrl: SITE_URL,
  });
});

module.exports = router;
