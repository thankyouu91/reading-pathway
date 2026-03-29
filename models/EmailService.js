const { Resend } = require('resend');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'votranlong91@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Reading Pathway <onboarding@resend.dev>';

let resend = null;
if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
  console.log('Email service: enabled');
} else {
  console.log('Email service: disabled (no RESEND_API_KEY)');
}

module.exports = {
  // Notify admin when new submission arrives
  async notifyNewSubmission({ parentName, phone, email, childAge, goal }) {
    if (!resend) return;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `[Reading Pathway] Đăng ký mới: ${parentName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
            <div style="background:#0056A6;color:white;padding:20px;border-radius:12px 12px 0 0;text-align:center">
              <h2 style="margin:0">📖 Reading Pathway</h2>
              <p style="margin:8px 0 0;opacity:0.8">Đăng Ký Tư Vấn Mới</p>
            </div>
            <div style="background:#fff;border:1px solid #E2E8F0;padding:24px;border-radius:0 0 12px 12px">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:10px 0;color:#64748B;width:140px">Tên Trường/TT:</td><td style="padding:10px 0;font-weight:600">${parentName}</td></tr>
                <tr style="background:#F8FAFC"><td style="padding:10px;color:#64748B">Số Điện Thoại:</td><td style="padding:10px;font-weight:600"><a href="tel:${phone}" style="color:#0056A6">${phone}</a></td></tr>
                <tr><td style="padding:10px 0;color:#64748B">Email:</td><td style="padding:10px 0;font-weight:600"><a href="mailto:${email}" style="color:#0056A6">${email}</a></td></tr>
                <tr style="background:#F8FAFC"><td style="padding:10px;color:#64748B">Cấp:</td><td style="padding:10px;font-weight:600">${childAge || 'Chưa chọn'}</td></tr>
                <tr><td style="padding:10px 0;color:#64748B">Mục Tiêu:</td><td style="padding:10px 0;font-weight:600">${goal || 'Chưa chọn'}</td></tr>
              </table>
              <div style="margin-top:20px;text-align:center">
                <a href="https://reading-pathway-production.up.railway.app/admin/submissions" style="display:inline-block;background:#C8372D;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600">Xem Trong Admin</a>
              </div>
            </div>
            <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:16px">Cdimex Education Solutions | Reading Pathway</p>
          </div>
        `
      });
      console.log(`[Email] Notification sent to ${ADMIN_EMAIL}`);
    } catch (err) {
      console.error(`[Email] Failed:`, err.message);
    }
  },

  // Send confirmation to the person who submitted
  async sendConfirmation({ parentName, email }) {
    if (!resend) return;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Reading Pathway - Cảm ơn bạn đã đăng ký!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
            <div style="background:linear-gradient(135deg,#0056A6,#C8372D);color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center">
              <h2 style="margin:0">📖 Reading Pathway</h2>
              <p style="margin:8px 0 0;opacity:0.9">Trophy9 & Achieve3000</p>
            </div>
            <div style="background:#fff;border:1px solid #E2E8F0;padding:24px;border-radius:0 0 12px 12px">
              <p>Xin chào <strong>${parentName}</strong>,</p>
              <p>Cảm ơn bạn đã quan tâm đến giải pháp đọc hiểu Reading Pathway!</p>
              <p>Đội ngũ Cdimex Education Solutions sẽ liên hệ với bạn trong vòng <strong>24 giờ</strong> để tư vấn và sắp xếp demo miễn phí.</p>
              <div style="background:#F0F7FF;border-left:4px solid #0056A6;padding:16px;margin:20px 0;border-radius:0 8px 8px 0">
                <p style="margin:0;font-weight:600">Trong khi chờ đợi, bạn có thể:</p>
                <ul style="margin:8px 0 0;padding-left:20px;color:#475569">
                  <li>Xem chi tiết lộ trình tại <a href="https://reading-pathway-production.up.railway.app/#pathway" style="color:#0056A6">website của chúng tôi</a></li>
                  <li>Đọc blog kiến thức về <a href="https://reading-pathway-production.up.railway.app/blog" style="color:#0056A6">đọc hiểu & IELTS</a></li>
                </ul>
              </div>
              <p>Trân trọng,<br><strong>Cdimex Education Solutions</strong></p>
              <p style="font-size:13px;color:#64748B">Zalo/Whatsapp: +84 93 736 03391<br>Email: tranlong@cdimex.com.vn<br>Web: www.Cdimex.com.vn</p>
            </div>
          </div>
        `
      });
      console.log(`[Email] Confirmation sent to ${email}`);
    } catch (err) {
      console.error(`[Email] Confirmation failed:`, err.message);
    }
  }
};
