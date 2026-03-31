require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const db = require('./db');
const bcrypt = require('bcrypt');

// ===== ADMIN USER =====
const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'admin123';
const hash = bcrypt.hashSync(password, 12);
db.prepare('INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)').run(username, hash);
console.log(`Admin: ${username} / ${password}`);

// ===== CONTENT PER LANGUAGE =====
const insert = db.prepare(`INSERT OR IGNORE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES (?, ?, ?, ?, ?, ?)`);

const allContent = {
  // ==================== VIETNAMESE ====================
  vi: {
    hero: {
      badge: 'Từ Mầm Non Đến Đại Học',
      heading: 'Con Đường', heading_highlight: 'Đọc Hiểu', heading_suffix: 'Toàn Diện',
      subtitle: 'Chương trình rèn luyện Đọc Hiểu & Pre-IELTS từ Mầm Non đến Đại Học với nền tảng Trophy9 và Achieve3000 theo chuẩn Mỹ (CCSS & Lexile).',
      stat_1_number: '54', stat_1_label: 'Cấp Độ',
      stat_2_number: '198', stat_2_label: 'Readers',
      stat_3_number: '9', stat_3_label: 'Hoạt Động',
      stat_4_number: '12', stat_4_label: 'Trình Độ',
      stat_5_number: '20K+', stat_5_label: 'Tài Liệu Chuyên Ngành',
      cta_primary: 'Bắt Đầu Hành Trình', cta_secondary: 'Xem Lộ Trình',
      card_1_label: 'Mầm Non', card_1_sub: 'Phonics & Cơ Bản',
      card_2_label: 'Tiểu Học', card_2_sub: 'Đọc Hiểu Nền Tảng',
      card_3_label: 'THCS', card_3_sub: 'Đọc Hiểu Nâng Cao',
      card_4_label: 'THPT - ĐH', card_4_sub: 'IELTS & Học Thuật',
      logo_trophy9: { v: 'images/logo-trophy9.svg', t: 'image' },
      logo_achieve3000: { v: 'images/logo-achieve3000.svg', t: 'image' }
    },
    program: {
      tag: 'Tổng Quan', heading: 'Chương Trình Học Toàn Diện',
      description: 'Kết hợp 2 nền tảng giáo dục hàng đầu để xây dựng năng lực đọc hiểu từ cơ bản đến nâng cao',
      trophy_age: 'Mẫu Giáo - Lớp 9', trophy_heading: 'Nền Tảng Đọc Hiểu E-Learning',
      trophy_description: 'Chương trình E-Learning cung cấp môi trường học tập tiếng Anh toàn diện với 9 hoạt động online, sách giáo khoa Benchmark Education theo chuẩn CCSS',
      trophy_features: { v: JSON.stringify(['6 cấp chương trình: T1 - T6 (Walk → Run → Sprint)','198 Leveled Readers + 54 Workbooks','9 hoạt động: Vocabulary, Dictation, Shadowing...','eBook + e-Learning kết hợp sách giấy','Chuẩn CCSS - Giáo dục công lập Hoa Kỳ']), t: 'list' },
      trophy_button: 'Tìm Hiểu Trophy9', trophy_url: 'https://www.trophy9.com/',
      achieve_age: 'Lớp 10 - Đại Học', achieve_heading: 'Đọc Hiểu Học Thuật & IELTS',
      achieve_description: 'Nền tảng đọc hiểu cá nhân hóa theo chỉ số Lexile, được McGraw Hill phát triển. Nội dung tự động thích ứng theo trình độ từng học sinh.',
      achieve_features: { v: JSON.stringify(['12 cấp độ tiếng Anh cá nhân hóa theo Lexile','Nội dung đa lĩnh vực: ELA, Khoa Học, Xã Hội','Đánh giá liên tục bằng LevelSet Assessment','Dashboard theo dõi chỉ số Lexile & tiến bộ','Chuẩn bị IELTS Academic & nghiên cứu học thuật']), t: 'list' },
      achieve_button: 'Tìm Hiểu Achieve3000', achieve_url: 'https://www.mheducation.com/prek-12/program/microsites/achieve-3000-literacy.html'
    },
    activities: {
      heading: '9 Hoạt Động Học Tập Online',
      description: 'Cùng Trophy9 trải nghiệm nền tảng học tiếng Anh toàn diện với 9 hoạt động tương tác',
      activity_1_title: 'Leveled Readers', activity_1_desc: 'Sách đọc theo cấp độ xây dựng nội dung theo tiêu chuẩn CCSS, áp dụng tại trường công lập Hoa Kỳ',
      activity_2_title: 'Book Quiz', activity_2_desc: 'Hiểu nội dung và nắm được ý chính của bài đọc qua các câu hỏi kiểm tra',
      activity_3_title: 'Vocabulary', activity_3_desc: 'Ôn lại và ghi nhớ từ mới xuất hiện trong bài đọc, mở rộng vốn từ vựng',
      activity_4_title: 'Dictation', activity_4_desc: 'Tăng khả năng tập trung và cải thiện kỹ năng nghe với bài tập nghe viết lại câu',
      activity_5_title: 'Shadowing', activity_5_desc: 'Cải thiện kỹ năng nghe và phát âm bằng cách đọc theo giọng của người bản xứ',
      activity_6_title: 'Storytelling', activity_6_desc: 'Phát triển kỹ năng nói tự tin trôi chảy thông qua bài tập kể chuyện',
      activity_7_title: 'Role Play', activity_7_desc: 'Áp dụng các biểu hiện đã học vào tình huống thực tế để luyện tập cách nói tự nhiên',
      activity_8_title: 'Grammar', activity_8_desc: 'Hiểu và nắm vững các quy tắc ngữ pháp tiếng Anh một cách có hệ thống',
      activity_9_title: 'Book Report', activity_9_desc: 'Cải thiện kỹ năng đọc viết với các hoạt động sau khi đọc, tổng hợp kiến thức'
    },
    contact: {
      heading: 'Sẵn Sàng Bắt Đầu Hành Trình Đọc Hiểu?',
      description: 'Đăng ký tư vấn miễn phí để nhận lộ trình học tập cá nhân hóa cho con bạn',
      benefit_1: 'Đánh giá trình độ miễn phí', benefit_2: 'Lộ trình cá nhân hóa',
      benefit_3: 'Học thử 1 tuần miễn phí', benefit_4: 'Tư vấn 1-1 với chuyên gia',
      form_button: 'Đăng Ký Tư Vấn Miễn Phí',
      label_name: 'Họ Tên Phụ Huynh', label_phone: 'Số Điện Thoại', label_email: 'Email',
      label_age: 'Độ Tuổi Học Sinh', label_goal: 'Mục Tiêu',
      placeholder_name: 'Nhập họ tên', placeholder_phone: '0xxx xxx xxx',
      age_option_1: '3-6 tuổi (Mầm Non)', age_option_2: '6-11 tuổi (Tiểu Học)',
      age_option_3: '11-15 tuổi (THCS)', age_option_4: '15-18 tuổi (THPT)', age_option_5: '18+ (Đại Học)',
      goal_option_1: 'Rèn Đọc Hiểu', goal_option_2: 'Pre-IELTS', goal_option_3: 'IELTS',
      goal_option_4: 'Học Thuật', goal_option_5: 'Tất Cả'
    },
    footer: {
      description: 'Nền tảng tăng cường đọc hiểu và luyện kèm 4 kỹ năng, giải pháp giáo dục theo Đề án Quyết định 2371/QĐ-TTg "Đưa tiếng Anh thành ngôn ngữ thứ hai trong trường học 2025 - 2035".',
      col2_title: 'Chương Trình', col3_title: 'Hỗ Trợ', col4_title: 'Liên Hệ',
      contact_zalo: '+84 93 736 03391', contact_email: 'Tranlong@cdimex.com.vn',
      contact_website: 'www.Cdimex.com.vn', contact_address: 'TP. Hồ Chí Minh, Việt Nam',
      copyright: '2026 Reading Pathway. Powered By Cdimex Edu Solutions'
    },
    nav: { cta_button: 'Đăng Ký Ngay' },
    b2b: {
      tag: 'Dành Cho Trường Học & Trung Tâm', heading: 'Giải Pháp Đọc Hiểu Toàn Diện',
      description: 'Dễ triển khai - Lesson Plan sẵn sàng - Kiểm tra theo module - Tracking chỉ số realtime',
      cta_text: 'Liên hệ để nhận bảng giá & demo miễn phí cho trường học / trung tâm ngoại ngữ',
      cta_button: 'Yêu Cầu Demo Miễn Phí'
    }
  },

  // ==================== ENGLISH ====================
  en: {
    hero: {
      badge: 'From Kindergarten to University',
      heading: 'The Complete', heading_highlight: 'Reading', heading_suffix: 'Pathway',
      subtitle: 'A comprehensive Reading Comprehension & Pre-IELTS program from Kindergarten to University with Trophy9 and Achieve3000 platforms based on US standards (CCSS & Lexile).',
      stat_1_number: '54', stat_1_label: 'Levels',
      stat_2_number: '198', stat_2_label: 'Readers',
      stat_3_number: '9', stat_3_label: 'Activities',
      stat_4_number: '12', stat_4_label: 'Proficiencies',
      stat_5_number: '20K+', stat_5_label: 'Specialized Materials',
      cta_primary: 'Start Your Journey', cta_secondary: 'View Pathway',
      card_1_label: 'Kindergarten', card_1_sub: 'Phonics & Basics',
      card_2_label: 'Elementary', card_2_sub: 'Foundation Reading',
      card_3_label: 'Middle School', card_3_sub: 'Advanced Reading',
      card_4_label: 'High School+', card_4_sub: 'IELTS & Academic',
      logo_trophy9: { v: 'images/logo-trophy9.svg', t: 'image' },
      logo_achieve3000: { v: 'images/logo-achieve3000.svg', t: 'image' }
    },
    program: {
      tag: 'Overview', heading: 'Comprehensive Learning Program',
      description: 'Combining 2 leading educational platforms to build reading comprehension skills from basic to advanced',
      trophy_age: 'K - Grade 9', trophy_heading: 'E-Learning Reading Foundation',
      trophy_description: 'E-Learning program providing a comprehensive English learning environment with 9 online activities, Benchmark Education textbooks following CCSS standards',
      trophy_features: { v: JSON.stringify(['6 program levels: T1 - T6 (Walk → Run → Sprint)','198 Leveled Readers + 54 Workbooks','9 activities: Vocabulary, Dictation, Shadowing...','eBook + e-Learning combined with textbooks','CCSS Standard - US Public Education']), t: 'list' },
      trophy_button: 'Learn About Trophy9', trophy_url: 'https://www.trophy9.com/',
      achieve_age: 'Grade 10 - University', achieve_heading: 'Academic Reading & IELTS',
      achieve_description: 'Personalized reading comprehension platform powered by Lexile metrics, developed by McGraw Hill. Content automatically adapts to each student\'s level.',
      achieve_features: { v: JSON.stringify(['12 personalized English levels by Lexile','Multi-disciplinary content: ELA, Science, Social Studies','Continuous assessment with LevelSet','Dashboard tracking Lexile scores & progress','IELTS Academic & research preparation']), t: 'list' },
      achieve_button: 'Learn About Achieve3000', achieve_url: 'https://www.mheducation.com/prek-12/program/microsites/achieve-3000-literacy.html'
    },
    activities: {
      heading: '9 Online Learning Activities',
      description: 'Experience a comprehensive English learning platform with 9 interactive activities',
      activity_1_title: 'Leveled Readers', activity_1_desc: 'Graded reading books built on CCSS standards, used in US public schools',
      activity_2_title: 'Book Quiz', activity_2_desc: 'Understand content and grasp the main ideas through comprehension questions',
      activity_3_title: 'Vocabulary', activity_3_desc: 'Review and memorize new words from reading passages, expand vocabulary',
      activity_4_title: 'Dictation', activity_4_desc: 'Improve focus and listening skills with sentence dictation exercises',
      activity_5_title: 'Shadowing', activity_5_desc: 'Improve listening and pronunciation by reading along with native speakers',
      activity_6_title: 'Storytelling', activity_6_desc: 'Develop confident and fluent speaking through storytelling exercises',
      activity_7_title: 'Role Play', activity_7_desc: 'Apply learned expressions in real situations for natural speaking practice',
      activity_8_title: 'Grammar', activity_8_desc: 'Understand and master English grammar rules systematically',
      activity_9_title: 'Book Report', activity_9_desc: 'Improve reading and writing skills with post-reading activities'
    },
    contact: {
      heading: 'Ready to Start Your Reading Journey?',
      description: 'Register for a free consultation to receive a personalized learning pathway for your child',
      benefit_1: 'Free level assessment', benefit_2: 'Personalized pathway',
      benefit_3: 'Free 1-week trial', benefit_4: '1-on-1 expert consultation',
      form_button: 'Register for Free Consultation',
      label_name: 'Parent Name', label_phone: 'Phone Number', label_email: 'Email',
      label_age: 'Student Age', label_goal: 'Goal',
      placeholder_name: 'Enter full name', placeholder_phone: '+1 xxx xxx xxxx',
      age_option_1: '3-6 years (Kindergarten)', age_option_2: '6-11 years (Elementary)',
      age_option_3: '11-15 years (Middle School)', age_option_4: '15-18 years (High School)', age_option_5: '18+ (University)',
      goal_option_1: 'Reading Skills', goal_option_2: 'Pre-IELTS', goal_option_3: 'IELTS',
      goal_option_4: 'Academic', goal_option_5: 'All'
    },
    footer: {
      description: 'A comprehensive reading pathway from Kindergarten to University. Building a strong language foundation for the future.',
      col2_title: 'Programs', col3_title: 'Support', col4_title: 'Contact',
      contact_zalo: '+84 93 736 03391', contact_email: 'Tranlong@cdimex.com.vn',
      contact_website: 'www.Cdimex.com.vn', contact_address: 'Ho Chi Minh City, Vietnam',
      copyright: '2026 Reading Pathway. Powered By Cdimex Edu Solutions'
    },
    nav: { cta_button: 'Register Now' },
    b2b: {
      tag: 'For Schools & Language Centers', heading: 'Complete Reading Solution',
      description: 'Easy to deploy - Lesson Plans ready - Module testing - Real-time tracking',
      cta_text: 'Contact us for pricing & free demo for your school or language center',
      cta_button: 'Request Free Demo'
    }
  },

  // ==================== LAO ====================
  lo: {
    hero: {
      badge: 'ຈາກອະນຸບານຫາມະຫາວິທະຍາໄລ',
      heading: 'ເສັ້ນທາງ', heading_highlight: 'ການອ່ານ', heading_suffix: 'ຄົບຖ້ວນ',
      subtitle: 'ໂປຣແກຣມຝຶກທັກສະການອ່ານ & Pre-IELTS ຈາກອະນຸບານຫາມະຫາວິທະຍາໄລ ກັບ Trophy9 ແລະ Achieve3000 ຕາມມາດຕະຖານອາເມຣິກາ (CCSS & Lexile).',
      stat_1_number: '54', stat_1_label: 'ລະດັບ',
      stat_2_number: '198', stat_2_label: 'Readers',
      stat_3_number: '9', stat_3_label: 'ກິດຈະກຳ',
      stat_4_number: '12', stat_4_label: 'ຂັ້ນ',
      stat_5_number: '20K+', stat_5_label: 'ເອກະສານ',
      cta_primary: 'ເລີ່ມຕົ້ນການເດີນທາງ', cta_secondary: 'ເບິ່ງເສັ້ນທາງ',
      card_1_label: 'ອະນຸບານ', card_1_sub: 'Phonics & ພື້ນຖານ',
      card_2_label: 'ປະຖົມ', card_2_sub: 'ການອ່ານພື້ນຖານ',
      card_3_label: 'ມັດທະຍົມຕົ້ນ', card_3_sub: 'ການອ່ານຂັ້ນສູງ',
      card_4_label: 'ມັດທະຍົມປາຍ+', card_4_sub: 'IELTS & ວິຊາການ',
      logo_trophy9: { v: 'images/logo-trophy9.svg', t: 'image' },
      logo_achieve3000: { v: 'images/logo-achieve3000.svg', t: 'image' }
    },
    program: {
      tag: 'ພາບລວມ', heading: 'ໂປຣແກຣມການຮຽນຄົບຖ້ວນ',
      description: 'ລວມ 2 ແພລດຟອມການສຶກສາຊັ້ນນຳ ເພື່ອສ້າງທັກສະການອ່ານຈາກພື້ນຖານຫາຂັ້ນສູງ',
      trophy_age: 'ອະນຸບານ - ຂັ້ນ 9', trophy_heading: 'ພື້ນຖານການອ່ານ E-Learning',
      trophy_description: 'ໂປຣແກຣມ E-Learning ສະໜອງສະພາບແວດລ້ອມການຮຽນພາສາອັງກິດຄົບຖ້ວນ ກັບ 9 ກິດຈະກຳອອນໄລ',
      trophy_features: { v: JSON.stringify(['6 ລະດັບ: T1 - T6 (Walk → Run → Sprint)','198 Leveled Readers + 54 Workbooks','9 ກິດຈະກຳ: Vocabulary, Dictation, Shadowing...','eBook + e-Learning ລວມກັບປຶ້ມ','ມາດຕະຖານ CCSS - ການສຶກສາອາເມຣິກາ']), t: 'list' },
      trophy_button: 'ສຶກສາ Trophy9', trophy_url: 'https://www.trophy9.com/',
      achieve_age: 'ຂັ້ນ 10 - ມະຫາວິທະຍາໄລ', achieve_heading: 'ການອ່ານວິຊາການ & IELTS',
      achieve_description: 'ແພລດຟອມການອ່ານສ່ວນບຸກຄົນຕາມ Lexile ພັດທະນາໂດຍ McGraw Hill',
      achieve_features: { v: JSON.stringify(['12 ລະດັບພາສາອັງກິດສ່ວນບຸກຄົນ','ເນື້ອຫາ ELA, ວິທະຍາສາດ, ສັງຄົມ','ການປະເມີນຕໍ່ເນື່ອງດ້ວຍ LevelSet','Dashboard ຕິດຕາມ Lexile & ຄວາມກ້າວໜ້າ','ກຽມ IELTS Academic & ວິຊາການ']), t: 'list' },
      achieve_button: 'ສຶກສາ Achieve3000', achieve_url: 'https://www.mheducation.com/prek-12/program/microsites/achieve-3000-literacy.html'
    },
    activities: {
      heading: '9 ກິດຈະກຳການຮຽນອອນໄລ',
      description: 'ສຳຜັດແພລດຟອມການຮຽນພາສາອັງກິດຄົບຖ້ວນ ກັບ 9 ກິດຈະກຳ',
      activity_1_title: 'Leveled Readers', activity_1_desc: 'ປຶ້ມອ່ານຕາມລະດັບ ສ້າງຕາມມາດຕະຖານ CCSS',
      activity_2_title: 'Book Quiz', activity_2_desc: 'ເຂົ້າໃຈເນື້ອຫາ ແລະ ຈັບໃຈຄວາມຫຼັກ',
      activity_3_title: 'Vocabulary', activity_3_desc: 'ທົບທວນ ແລະ ຈົດຈຳຄຳສັບໃໝ່',
      activity_4_title: 'Dictation', activity_4_desc: 'ເພີ່ມການສຸມໃສ່ ແລະ ທັກສະການຟັງ',
      activity_5_title: 'Shadowing', activity_5_desc: 'ປັບປຸງການຟັງ ແລະ ການອອກສຽງ',
      activity_6_title: 'Storytelling', activity_6_desc: 'ພັດທະນາທັກສະການເວົ້າ',
      activity_7_title: 'Role Play', activity_7_desc: 'ນຳໃຊ້ສິ່ງທີ່ຮຽນເຂົ້າສະຖານະການຈິງ',
      activity_8_title: 'Grammar', activity_8_desc: 'ເຂົ້າໃຈກົດໄວຍາກອນພາສາອັງກິດ',
      activity_9_title: 'Book Report', activity_9_desc: 'ປັບປຸງທັກສະການອ່ານ-ຂຽນ'
    },
    contact: {
      heading: 'ພ້ອມເລີ່ມຕົ້ນການເດີນທາງການອ່ານ?',
      description: 'ລົງທະບຽນປຶກສາຟຣີ ເພື່ອຮັບເສັ້ນທາງການຮຽນສ່ວນບຸກຄົນ',
      benefit_1: 'ປະເມີນລະດັບຟຣີ', benefit_2: 'ເສັ້ນທາງສ່ວນບຸກຄົນ',
      benefit_3: 'ທົດລອງຮຽນ 1 ອາທິດຟຣີ', benefit_4: 'ປຶກສາ 1-1 ກັບຜູ້ຊ່ຽວຊານ',
      form_button: 'ລົງທະບຽນປຶກສາຟຣີ',
      label_name: 'ຊື່ຜູ້ປົກຄອງ', label_phone: 'ເບີໂທລະສັບ', label_email: 'Email',
      label_age: 'ອາຍຸນັກຮຽນ', label_goal: 'ເປົ້າໝາຍ',
      placeholder_name: 'ປ້ອນຊື່', placeholder_phone: '020 xxxx xxxx',
      age_option_1: '3-6 ປີ (ອະນຸບານ)', age_option_2: '6-11 ປີ (ປະຖົມ)',
      age_option_3: '11-15 ປີ (ມັດທະຍົມຕົ້ນ)', age_option_4: '15-18 ປີ (ມັດທະຍົມປາຍ)', age_option_5: '18+ (ມະຫາວິທະຍາໄລ)',
      goal_option_1: 'ທັກສະການອ່ານ', goal_option_2: 'Pre-IELTS', goal_option_3: 'IELTS',
      goal_option_4: 'ວິຊາການ', goal_option_5: 'ທັງໝົດ'
    },
    footer: {
      description: 'ເສັ້ນທາງການອ່ານຄົບຖ້ວນ ຈາກອະນຸບານຫາມະຫາວິທະຍາໄລ.',
      col2_title: 'ໂປຣແກຣມ', col3_title: 'ຊ່ວຍເຫຼືອ', col4_title: 'ຕິດຕໍ່',
      contact_zalo: '+84 93 736 03391', contact_email: 'Tranlong@cdimex.com.vn',
      contact_website: 'www.Cdimex.com.vn', contact_address: 'ນະຄອນໂຮ່ຈີມິນ, ຫວຽດນາມ',
      copyright: '2026 Reading Pathway. Powered By Cdimex Edu Solutions'
    },
    nav: { cta_button: 'ລົງທະບຽນ' },
    b2b: {
      tag: 'ສຳລັບໂຮງຮຽນ & ສູນພາສາ', heading: 'ການແກ້ໄຂການອ່ານຄົບຖ້ວນ',
      description: 'ງ່າຍໃນການນຳໃຊ້ - Lesson Plan ພ້ອມ - ທົດສອບຕາມ module - ຕິດຕາມ realtime',
      cta_text: 'ຕິດຕໍ່ເພື່ອຮັບລາຄາ & demo ຟຣີ',
      cta_button: 'ຂໍ Demo ຟຣີ'
    }
  },

  // ==================== KHMER ====================
  km: {
    hero: {
      badge: 'ពីមត្តេយ្យដល់មហាវិទ្យាល័យ',
      heading: 'ផ្លូវ', heading_highlight: 'អានយល់', heading_suffix: 'ពេញលេញ',
      subtitle: 'កម្មវិធីហ្វឹកហាត់ការអានយល់ & Pre-IELTS ពីមត្តេយ្យដល់មហាវិទ្យាល័យ ជាមួយ Trophy9 និង Achieve3000 តាមស្ដង់ដារអាមេរិក (CCSS & Lexile)។',
      stat_1_number: '54', stat_1_label: 'កម្រិត',
      stat_2_number: '198', stat_2_label: 'Readers',
      stat_3_number: '9', stat_3_label: 'សកម្មភាព',
      stat_4_number: '12', stat_4_label: 'ជំនាញ',
      stat_5_number: '20K+', stat_5_label: 'ឯកសារ',
      cta_primary: 'ចាប់ផ្ដើមដំណើរ', cta_secondary: 'មើលផ្លូវ',
      card_1_label: 'មត្តេយ្យ', card_1_sub: 'Phonics & មូលដ្ឋាន',
      card_2_label: 'បឋមសិក្សា', card_2_sub: 'អានយល់មូលដ្ឋាន',
      card_3_label: 'មធ្យមសិក្សា', card_3_sub: 'អានយល់កម្រិតខ្ពស់',
      card_4_label: 'វិទ្យាល័យ+', card_4_sub: 'IELTS & បណ្ឌិត',
      logo_trophy9: { v: 'images/logo-trophy9.svg', t: 'image' },
      logo_achieve3000: { v: 'images/logo-achieve3000.svg', t: 'image' }
    },
    program: {
      tag: 'ទិដ្ឋភាពទូទៅ', heading: 'កម្មវិធីសិក្សាពេញលេញ',
      description: 'រួមបញ្ចូល 2 វេទិកាអប់រំឈានមុខ ដើម្បីពង្រឹងសមត្ថភាពអានយល់ពីមូលដ្ឋានដល់កម្រិតខ្ពស់',
      trophy_age: 'មត្តេយ្យ - ថ្នាក់ 9', trophy_heading: 'ការអានមូលដ្ឋាន E-Learning',
      trophy_description: 'កម្មវិធី E-Learning ផ្ដល់បរិយាកាសការរៀនភាសាអង់គ្លេសពេញលេញ ជាមួយ 9 សកម្មភាពអនឡាញ',
      trophy_features: { v: JSON.stringify(['6 កម្រិត: T1 - T6 (Walk → Run → Sprint)','198 Leveled Readers + 54 Workbooks','9 សកម្មភាព: Vocabulary, Dictation, Shadowing...','eBook + e-Learning រួមជាមួយសៀវភៅ','ស្ដង់ដារ CCSS - អប់រំអាមេរិក']), t: 'list' },
      trophy_button: 'ស្វែងយល់ Trophy9', trophy_url: 'https://www.trophy9.com/',
      achieve_age: 'ថ្នាក់ 10 - មហាវិទ្យាល័យ', achieve_heading: 'អានវិជ្ជាការ & IELTS',
      achieve_description: 'វេទិកាអានយល់ផ្ទាល់ខ្លួន តាម Lexile អភិវឌ្ឍដោយ McGraw Hill',
      achieve_features: { v: JSON.stringify(['12 កម្រិតភាសាអង់គ្លេសផ្ទាល់ខ្លួន','មាតិកា ELA, វិទ្យាសាស្ត្រ, សង្គម','ការវាយតម្លៃបន្តដោយ LevelSet','Dashboard តាមដាន Lexile & វឌ្ឍនភាព','រៀបចំ IELTS Academic & វិជ្ជាការ']), t: 'list' },
      achieve_button: 'ស្វែងយល់ Achieve3000', achieve_url: 'https://www.mheducation.com/prek-12/program/microsites/achieve-3000-literacy.html'
    },
    activities: {
      heading: '9 សកម្មភាពរៀនអនឡាញ',
      description: 'បទពិសោធន៍វេទិកាភាសាអង់គ្លេសពេញលេញ ជាមួយ 9 សកម្មភាព',
      activity_1_title: 'Leveled Readers', activity_1_desc: 'សៀវភៅអានតាមកម្រិត បង្កើតតាមស្ដង់ដារ CCSS',
      activity_2_title: 'Book Quiz', activity_2_desc: 'យល់មាតិកា និង ចាប់ចំណុចសំខាន់',
      activity_3_title: 'Vocabulary', activity_3_desc: 'ពិនិត្យ និង ចងចាំពាក្យថ្មី',
      activity_4_title: 'Dictation', activity_4_desc: 'បង្កើនការផ្ចង់ចិត្ត និង ជំនាញស្ដាប់',
      activity_5_title: 'Shadowing', activity_5_desc: 'កែលម្អការស្ដាប់ និង ការបញ្ចេញសំឡេង',
      activity_6_title: 'Storytelling', activity_6_desc: 'អភិវឌ្ឍជំនាញនិយាយដោយទំនុកចិត្ត',
      activity_7_title: 'Role Play', activity_7_desc: 'អនុវត្តអ្វីដែលបានរៀនក្នុងស្ថានភាពពិត',
      activity_8_title: 'Grammar', activity_8_desc: 'យល់វេយ្យាករណ៍ភាសាអង់គ្លេស',
      activity_9_title: 'Book Report', activity_9_desc: 'កែលម្អជំនាញអាន-សរសេរ'
    },
    contact: {
      heading: 'រួចរាល់ចាប់ផ្ដើមដំណើរការអាន?',
      description: 'ចុះឈ្មោះពិគ្រោះឥតគិតថ្លៃ ដើម្បីទទួលផែនការរៀនផ្ទាល់ខ្លួន',
      benefit_1: 'វាយតម្លៃកម្រិតឥតគិតថ្លៃ', benefit_2: 'ផែនការផ្ទាល់ខ្លួន',
      benefit_3: 'សាកល្បងរៀន 1 សប្ដាហ៍ឥតគិតថ្លៃ', benefit_4: 'ពិគ្រោះ 1-1 ជាមួយអ្នកជំនាញ',
      form_button: 'ចុះឈ្មោះពិគ្រោះឥតគិតថ្លៃ',
      label_name: 'ឈ្មោះឪពុកម្ដាយ', label_phone: 'លេខទូរស័ព្ទ', label_email: 'Email',
      label_age: 'អាយុសិស្ស', label_goal: 'គោលដៅ',
      placeholder_name: 'បញ្ចូលឈ្មោះ', placeholder_phone: '0xx xxx xxxx',
      age_option_1: '3-6 ឆ្នាំ (មត្តេយ្យ)', age_option_2: '6-11 ឆ្នាំ (បឋមសិក្សា)',
      age_option_3: '11-15 ឆ្នាំ (មធ្យមសិក្សា)', age_option_4: '15-18 ឆ្នាំ (វិទ្យាល័យ)', age_option_5: '18+ (មហាវិទ្យាល័យ)',
      goal_option_1: 'ជំនាញអាន', goal_option_2: 'Pre-IELTS', goal_option_3: 'IELTS',
      goal_option_4: 'បណ្ឌិត', goal_option_5: 'ទាំងអស់'
    },
    footer: {
      description: 'ផ្លូវអានយល់ពេញលេញ ពីមត្តេយ្យដល់មហាវិទ្យាល័យ។',
      col2_title: 'កម្មវិធី', col3_title: 'ជំនួយ', col4_title: 'ទំនាក់ទំនង',
      contact_zalo: '+84 93 736 03391', contact_email: 'Tranlong@cdimex.com.vn',
      contact_website: 'www.Cdimex.com.vn', contact_address: 'ទីក្រុងហូជីមិញ, វៀតណាម',
      copyright: '2026 Reading Pathway. Powered By Cdimex Edu Solutions'
    },
    nav: { cta_button: 'ចុះឈ្មោះ' },
    b2b: {
      tag: 'សម្រាប់សាលា & មណ្ឌលភាសា', heading: 'ដំណោះស្រាយអានពេញលេញ',
      description: 'ងាយស្រួលអនុវត្ត - Lesson Plan រួចរាល់ - ធ្វើតេស្តតាម module - តាមដាន realtime',
      cta_text: 'ទំនាក់ទំនងដើម្បីទទួលតម្លៃ & demo ឥតគិតថ្លៃ',
      cta_button: 'ស្នើ Demo ឥតគិតថ្លៃ'
    }
  }
};

// ===== INSERT ALL =====
const seedAll = db.transaction(() => {
  let order = 0;
  for (const [lang, sections] of Object.entries(allContent)) {
    for (const [section, keys] of Object.entries(sections)) {
      for (const [key, val] of Object.entries(keys)) {
        const isObj = typeof val === 'object' && val !== null && val.v !== undefined;
        const value = isObj ? val.v : val;
        const type = isObj ? val.t : 'text';
        insert.run(lang, section, key, value, type, order++);
      }
    }
  }
});

seedAll();
const count = db.prepare('SELECT COUNT(*) as c FROM content').get().c;
const langs = db.prepare('SELECT DISTINCT lang FROM content').all().map(r => r.lang);
console.log(`Seed done! ${count} rows | Languages: ${langs.join(', ')}`);
