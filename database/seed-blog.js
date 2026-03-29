const db = require('./db');
const insert = db.prepare('INSERT OR IGNORE INTO blog_posts (slug, title, excerpt, content, meta_description, meta_keywords, is_published) VALUES (?,?,?,?,?,?,1)');

// Post 1: De an 2371
insert.run(
  'de-an-2371-tieng-anh-ngon-ngu-thu-hai',
  'De An 2371/QD-TTg: Co Hoi Va Thach Thuc Khi Dua Tieng Anh Thanh Ngon Ngu Thu Hai',
  'Phan tich Quyet dinh 2371/QD-TTg cua Thu tuong Chinh phu ve dua tieng Anh thanh ngon ngu thu hai trong truong hoc giai doan 2025-2035.',
  `<h2>Boi Canh De An 2371/QD-TTg</h2>
<p>Ngay 30/12/2024, Thu tuong Chinh phu ban hanh Quyet dinh 2371/QD-TTg phe duyet De an <strong>"Dua tieng Anh thanh ngon ngu thu hai trong truong hoc giai doan 2025-2035"</strong>. Day la buoc ngoat quan trong trong chien luoc phat trien giao duc Viet Nam.</p>

<h2>Muc Tieu Chinh</h2>
<ul>
<li><strong>Giai doan 2025-2030:</strong> Xay dung nen tang, dao tao giao vien, thi diem tai cac thanh pho lon</li>
<li><strong>Giai doan 2030-2035:</strong> Mo rong toan quoc, tieng Anh tro thanh ngon ngu thu hai chinh thuc</li>
</ul>

<h2>Thach Thuc Cua Truong Hoc</h2>
<ul>
<li>Thieu giao trinh chuan quoc te phu hop tu mam non den THPT</li>
<li>Khong co thang do trinh do doc hieu chuan quoc te (nhu Lexile)</li>
<li>Chuong trinh roi rac, khong lien cap</li>
<li>Giao vien chua duoc dao tao phuong phap giang day doc hieu theo chuan CCSS</li>
</ul>

<h2>Giai Phap: Reading Pathway</h2>
<p>Reading Pathway ket hop <strong>Trophy9</strong> (Mam Non - THCS) va <strong>Achieve3000</strong> (THPT - Dai Hoc) tao ra lo trinh doc hieu lien cap duy nhat dap ung De an 2371:</p>
<ul>
<li><strong>Trophy9:</strong> 54 cap do, 198 Readers theo chuan CCSS My, 9 hoat dong tuong tac</li>
<li><strong>Achieve3000:</strong> Ca nhan hoa theo chi so Lexile, 12 cap do, AI thich ung</li>
<li><strong>Lesson Plan san sang:</strong> 36 tuan/nam, training giao vien 1 ngay</li>
<li><strong>Do luong duoc:</strong> Dashboard Lexile Growth Report cho ban giam hieu</li>
</ul>

<blockquote>Voi Reading Pathway, truong hoc co the trien khai ngay giai phap doc hieu chuan quoc te, do luong hieu qua bang chi so Lexile.</blockquote>`,
  'Phan tich De an 2371/QD-TTg dua tieng Anh thanh ngon ngu thu hai trong truong hoc 2025-2035 va giai phap Reading Pathway.',
  'de an 2371, tieng anh ngon ngu thu hai, truong hoc, reading pathway, trophy9, achieve3000'
);

// Post 2: Lexile
insert.run(
  'lexile-la-gi-do-trinh-do-doc-hieu',
  'Chi So Lexile La Gi? Cach Do Trinh Do Doc Hieu Tieng Anh Chinh Xac',
  'Tim hieu chi so Lexile - thang do trinh do doc hieu quoc te duoc su dung tai hon 180 quoc gia. Tai sao truong hoc Viet Nam can ap dung?',
  `<h2>Lexile La Gi?</h2>
<p><strong>Lexile</strong> la thang do trinh do doc hieu do MetaMetrics (My) phat trien, duoc su dung tai hon 180 quoc gia. Lexile do chinh xac kha nang doc cua moi nguoi bang mot con so, vi du: 800L.</p>

<h2>Cach Thang Do Lexile Hoat Dong</h2>
<ul>
<li><strong>Lexile Reader Measure:</strong> Trinh do doc cua hoc sinh (VD: hoc sinh co Lexile 750L)</li>
<li><strong>Lexile Text Measure:</strong> Do kho cua van ban (VD: sach co Lexile 800L)</li>
</ul>
<p>Khi ghep dung trinh do nguoi doc voi do kho van ban, hoc sinh hieu duoc <strong>75% noi dung</strong> - vua du thach thuc de phat trien.</p>

<h2>Bang Lexile Theo Cap Hoc</h2>
<ul>
<li><strong>Mam Non - Lop 1:</strong> BR (Beginning Reader) den 200L</li>
<li><strong>Lop 2-3:</strong> 200L - 500L</li>
<li><strong>Lop 4-5:</strong> 500L - 800L</li>
<li><strong>Lop 6-8 (THCS):</strong> 800L - 1050L</li>
<li><strong>Lop 9-12 (THPT):</strong> 1050L - 1350L</li>
<li><strong>Dai Hoc:</strong> 1300L+</li>
</ul>

<h2>Tai Sao Truong Hoc Viet Nam Can Lexile?</h2>
<ul>
<li><strong>Do luong khach quan:</strong> Khong dua vao cam tinh, co con so cu the</li>
<li><strong>Ca nhan hoa:</strong> Moi hoc sinh nhan bai doc phu hop trinh do</li>
<li><strong>Theo doi tien bo:</strong> So sanh Lexile dau nam vs cuoi nam</li>
<li><strong>Chuan quoc te:</strong> So sanh duoc voi hoc sinh cac nuoc</li>
</ul>

<blockquote>Lexile khong chi la con so - do la chia khoa de mo canh cua doc hieu cho moi hoc sinh, tai dung trinh do cua ho.</blockquote>`,
  'Chi so Lexile la gi? Thang do trinh do doc hieu quoc te, cach hoat dong, bang Lexile theo cap hoc.',
  'lexile, chi so lexile, do trinh do doc hieu, achieve3000, reading comprehension'
);

// Post 3: Trophy9 activities
insert.run(
  'trophy9-9-hoat-dong-hoc-tieng-anh',
  '9 Hoat Dong Hoc Tieng Anh Trong Trophy9: Tu Phonics Den Tu Duy Phan Bien',
  'Kham pha 9 hoat dong tuong tac trong Trophy9 giup tre phat trien toan dien 4 ky nang Nghe-Noi-Doc-Viet theo chuan CCSS My.',
  `<h2>Trophy9 La Gi?</h2>
<p><strong>Trophy9</strong> la chuong trinh E-Learning tieng Anh toan dien danh cho tre tu Mam Non den Lop 9, su dung sach giao khoa <strong>Benchmark Education</strong> theo chuan CCSS My.</p>

<h2>9 Hoat Dong Tuong Tac</h2>

<h3>1. Leveled Readers</h3>
<p>198 cuon sach duoc tuyen chon tu Benchmark Education, chia theo 54 cap do theo chuan CCSS.</p>

<h3>2. Book Quiz</h3>
<p>Kiem tra muc do hieu noi dung va nam bat y chinh sau moi bai doc.</p>

<h3>3. Vocabulary</h3>
<p>On lai va ghi nho tu moi xuat hien trong bai doc, mo rong von tu vung tu nhien.</p>

<h3>4. Dictation</h3>
<p>Tang kha nang tap trung va cai thien ky nang nghe thong qua bai tap nghe viet lai cau.</p>

<h3>5. Shadowing</h3>
<p>Cai thien phat am bang cach doc theo giong nguoi ban xu. Xay dung fluency hieu qua.</p>

<h3>6. Storytelling</h3>
<p>Phat trien ky nang noi tu tin, troi chay thong qua bai tap ke lai cau chuyen.</p>

<h3>7. Role Play</h3>
<p>Ap dung cac bieu hien ngon ngu vao tinh huong thuc te, luyen tap cach noi tu nhien.</p>

<h3>8. Grammar</h3>
<p>Nam vung quy tac ngu phap tieng Anh mot cach co he thong tu co ban den nang cao.</p>

<h3>9. Book Report</h3>
<p>Cai thien ky nang viet voi cac hoat dong tong hop sau khi doc, ren tu duy phan tich.</p>

<h2>Mo Hinh Walk - Run - Sprint</h2>
<ul>
<li><strong>T1-T2 (Walk):</strong> Phonics, tu vung co ban, cau don gian</li>
<li><strong>T3-T4 (Run):</strong> Doc hieu, Close Reading, Presentation</li>
<li><strong>T5-T6 (Sprint):</strong> Van ban phuc tap, tu duy phan bien, chuan bi chung chi</li>
</ul>

<blockquote>9 hoat dong cua Trophy9 bao phu day du Bloom's Taxonomy - tu Nho, Hieu, Ap dung den Phan tich va Tong hop.</blockquote>`,
  'Trophy9 9 hoat dong hoc tieng Anh: Leveled Readers, Book Quiz, Vocabulary, Dictation, Shadowing, Storytelling, Role Play, Grammar, Book Report.',
  'trophy9, 9 hoat dong, phonics, doc hieu, CCSS, benchmark education, hoc tieng anh tre em'
);

const count = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published=1').get().c;
console.log('Blog posts created:', count);
