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
      contact_company: 'CÔNG TY CỔ PHẦN XUẤT NHẬP KHẨU VÀ PHÁT TRIỂN VĂN HÓA',
      contact_address_hcm: '99A Nguyễn Văn Trỗi, Phường Phú Nhuận, TP. Hồ Chí Minh',
      contact_address_hn: '94 Nguyễn Hy Quang, Phường Đống Đa, Hà Nội',
      contact_phone: '(+84 28) 399 70 829',
      contact_email: 'info@cdimex.com.vn',
      contact_website: 'www.bookmedi.vn',
      contact_hours: 'Thứ 2 - Thứ 6: 8:00 - 17:30',
      copyright: '2026 Reading Pathway. Powered By Cdimex Education Solutions'
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
      contact_company: 'IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY',
      contact_address_hcm: '99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City',
      contact_address_hn: '94 Nguyen Hy Quang, Dong Da Ward, Hanoi',
      contact_phone: '(+84 28) 399 70 829',
      contact_email: 'info@cdimex.com.vn',
      contact_website: 'www.bookmedi.vn',
      contact_hours: 'Mon - Fri: 8:00 - 17:30',
      copyright: '2026 Reading Pathway. Powered By Cdimex Education Solutions'
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
      contact_company: 'IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY',
      contact_address_hcm: '99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City',
      contact_address_hn: '94 Nguyen Hy Quang, Dong Da Ward, Hanoi',
      contact_phone: '(+84 28) 399 70 829',
      contact_email: 'info@cdimex.com.vn',
      contact_website: 'www.bookmedi.vn',
      contact_hours: 'Mon - Fri: 8:00 - 17:30',
      copyright: '2026 Reading Pathway. Powered By Cdimex Education Solutions'
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
      contact_company: 'IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY',
      contact_address_hcm: '99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City',
      contact_address_hn: '94 Nguyen Hy Quang, Dong Da Ward, Hanoi',
      contact_phone: '(+84 28) 399 70 829',
      contact_email: 'info@cdimex.com.vn',
      contact_website: 'www.bookmedi.vn',
      contact_hours: 'Mon - Fri: 8:00 - 17:30',
      copyright: '2026 Reading Pathway. Powered By Cdimex Education Solutions'
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

// ===== BLOG POSTS =====
const insertPost = db.prepare('INSERT OR IGNORE INTO blog_posts (slug, title, excerpt, content, cover_image, meta_description, meta_keywords, is_published) VALUES (?,?,?,?,?,?,?,1)');
const updateCover = db.prepare("UPDATE blog_posts SET cover_image=? WHERE slug=?");

const postCovers = {
  'de-an-2371-tieng-anh-ngon-ngu-thu-hai':                 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
  'lexile-la-gi-do-trinh-do-doc-hieu':                     'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  'trophy9-9-hoat-dong-hoc-tieng-anh':                     'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'chien-luoc-doc-hieu-ielts-tang-band-diem':              'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  'achieve3000-nen-tang-doc-hieu-hoc-sinh-thpt':           'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
  'blended-learning-phuong-phap-day-tieng-anh-hien-dai':  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
};

const blogPosts = [
  {
    slug: 'de-an-2371-tieng-anh-ngon-ngu-thu-hai',
    title: 'Đề Án 2371/QĐ-TTg: Cơ Hội Và Thách Thức Khi Đưa Tiếng Anh Thành Ngôn Ngữ Thứ Hai',
    excerpt: 'Đề án 2371/QĐ-TTg đặt mục tiêu đưa tiếng Anh trở thành ngôn ngữ thứ hai trong trường học Việt Nam. Cơ hội và thách thức nào đang chờ đón hệ thống giáo dục?',
    content: `<h2>Đề Án 2371/QĐ-TTg Là Gì?</h2><p>Ngày 30/12/2021, Thủ tướng Chính phủ đã ký ban hành <strong>Đề án 2371/QĐ-TTg</strong> về việc dạy và học ngoại ngữ trong hệ thống giáo dục quốc dân giai đoạn 2021–2030. Đây là bước tiến quan trọng trong lộ trình đưa <strong>tiếng Anh trở thành ngôn ngữ thứ hai</strong> tại Việt Nam, với mục tiêu đến năm 2030, học sinh tốt nghiệp THPT đạt chuẩn năng lực ngoại ngữ bậc 3/6 theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam (tương đương B1 theo CEFR).</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80" alt="Học sinh Việt Nam học tiếng Anh" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Đề án 2371 hướng tới việc nâng cao toàn diện năng lực tiếng Anh cho học sinh Việt Nam</figcaption></figure><h2>Mục Tiêu Cụ Thể Của Đề Án</h2><ul><li><strong>2025</strong>: 60% trường THPT dạy các môn học bằng tiếng Anh; 50% giáo viên đạt chuẩn năng lực ngoại ngữ</li><li><strong>2030</strong>: 100% trường THPT có chương trình tăng cường tiếng Anh; học sinh tốt nghiệp đạt B1 CEFR</li><li>Tăng tỷ lệ trường đại học giảng dạy bằng tiếng Anh lên 30%</li></ul><h2>Cơ Hội Cho Hệ Thống Giáo Dục</h2><p>Đề án tạo ra làn sóng đầu tư mạnh mẽ vào giáo dục tiếng Anh, mở ra cơ hội lớn cho các nền tảng học tiếng Anh hiện đại như <strong>Trophy9</strong> (K-9) và <strong>Achieve3000</strong> (THPT-ĐH) thuộc hệ sinh thái Reading Pathway.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" alt="Lớp học tiếng Anh hiện đại" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Các trường học đang chuyển mình để đáp ứng yêu cầu của Đề án 2371</figcaption></figure><h2>Thách Thức Cần Vượt Qua</h2><ul><li><strong>Thiếu giáo viên chất lượng cao</strong>: Chỉ 30% giáo viên tiếng Anh hiện đạt chuẩn B2 trở lên</li><li><strong>Khoảng cách thành thị – nông thôn</strong>: Học sinh vùng sâu, vùng xa thiếu tiếp cận tài nguyên học tập</li><li><strong>Phương pháp dạy học lạc hậu</strong>: Nhiều trường vẫn dạy tiếng Anh theo lối ngữ pháp–dịch thuật</li></ul><h2>Giải Pháp Từ Reading Pathway</h2><p>Reading Pathway cung cấp giải pháp toàn diện phù hợp với mục tiêu của Đề án 2371, với nền tảng Trophy9 cho học sinh K-9 và Achieve3000 cho THPT-Đại học, tất cả theo chuẩn CCSS và chỉ số Lexile được công nhận quốc tế.</p><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Đồng Hành Cùng Đề Án 2371</h3><p>Reading Pathway hỗ trợ trường học triển khai chương trình tiếng Anh đạt chuẩn quốc tế, phù hợp với lộ trình của Đề án 2371/QĐ-TTg.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Liên Hệ Tư Vấn Ngay</a></div>`,
    meta_description: 'Đề án 2371/QĐ-TTg đưa tiếng Anh thành ngôn ngữ thứ hai. Giải pháp đọc hiểu Trophy9 & Achieve3000 của Reading Pathway đáp ứng chuẩn cho trường học K9, K12, đại học Việt Nam.',
    meta_keywords: 'đề án 2371 tiếng Anh ngôn ngữ thứ hai, giải pháp đọc hiểu trường học, phần mềm tiếng Anh K9 K12 đại học, trung tâm tiếng Anh Việt Nam, Trophy9, Achieve3000, Reading Pathway, chuẩn CCSS Lexile'
  },
  {
    slug: 'lexile-la-gi-do-trinh-do-doc-hieu',
    title: 'Chỉ Số Lexile Là Gì? Cách Đo Trình Độ Đọc Hiểu Tiếng Anh Chính Xác',
    excerpt: 'Chỉ số Lexile là thước đo trình độ đọc hiểu tiếng Anh được sử dụng tại hơn 100 quốc gia. Tìm hiểu cách hoạt động và tại sao đây là chỉ số quan trọng nhất cho học sinh.',
    content: `<h2>Chỉ Số Lexile Là Gì?</h2><p><strong>Chỉ số Lexile</strong> (Lexile Framework for Reading) là hệ thống đo lường trình độ đọc hiểu được phát triển bởi MetaMetrics Inc. từ năm 1989. Hiện nay, đây là thước đo đọc hiểu được sử dụng phổ biến nhất thế giới, với hơn 40 triệu học sinh được đánh giá mỗi năm tại hơn 100 quốc gia.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Đo lường trình độ đọc hiểu" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Chỉ số Lexile giúp ghép đôi học sinh với sách và nội dung đọc phù hợp nhất</figcaption></figure><h2>Thang Đo Lexile Hoạt Động Như Thế Nào?</h2><p>Chỉ số Lexile được đo bằng đơn vị "L" (Lexile), với thang đo từ dưới 0L đến trên 2000L:</p><ul><li><strong>Mầm non – Lớp 1</strong>: BR (Below Reader) đến 300L</li><li><strong>Lớp 2–3</strong>: 300L – 600L</li><li><strong>Lớp 4–5</strong>: 600L – 900L</li><li><strong>Lớp 6–8</strong>: 900L – 1100L</li><li><strong>Lớp 9–12</strong>: 1100L – 1300L</li><li><strong>Đại học và chuyên nghiệp</strong>: 1300L+</li></ul><blockquote style="border-left:4px solid #2563eb;padding:1rem 1.5rem;margin:2rem 0;background:#eff6ff;border-radius:0 8px 8px 0;"><p><strong>Nguyên tắc vàng: Học sinh nên đọc sách có chỉ số Lexile trong khoảng ±100L so với chỉ số của mình để đạt hiệu quả học tập tối ưu.</strong></p></blockquote><h2>Lexile Trong Nền Tảng Reading Pathway</h2><p>Cả hai nền tảng của Reading Pathway đều tích hợp hệ thống Lexile:</p><ul><li><strong>Trophy9</strong>: 198 Leveled Readers được phân cấp theo Lexile từ thấp đến cao, phù hợp cho học sinh K-9</li><li><strong>Achieve3000</strong>: Tự động điều chỉnh độ khó bài đọc theo chỉ số Lexile của từng học sinh THPT và đại học</li></ul><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" alt="Sách đọc theo cấp độ Lexile" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Trophy9 cung cấp 198 Leveled Readers được phân cấp theo chỉ số Lexile</figcaption></figure><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Đo Chỉ Số Lexile Cho Con Bạn</h3><p>Reading Pathway cung cấp bài đánh giá Lexile miễn phí để xác định trình độ đọc hiểu chính xác và lên lộ trình học phù hợp.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Đăng Ký Đánh Giá Miễn Phí</a></div>`,
    meta_description: 'Chỉ số Lexile là thước đo đọc hiểu tiếng Anh chuẩn quốc tế. Tìm hiểu cách Trophy9 và Achieve3000 dùng Lexile để cá nhân hóa lộ trình học cho học sinh K9, K12 và đại học tại trung tâm tiếng Anh, trường học Việt Nam.',
    meta_keywords: 'chỉ số Lexile là gì, đo trình độ đọc hiểu tiếng Anh, Lexile Framework trường học, giải pháp đọc hiểu K9 K12, phần mềm tiếng Anh trung tâm tiếng Anh, Trophy9 Lexile, Achieve3000 adaptive learning, Reading Pathway'
  },
  {
    slug: 'trophy9-9-hoat-dong-hoc-tieng-anh',
    title: '9 Hoạt Động Học Tiếng Anh Trong Trophy9: Từ Phonics Đến Tư Duy Phản Biện',
    excerpt: 'Trophy9 tích hợp 9 hoạt động học tiếng Anh toàn diện giúp học sinh K-9 phát triển từ phonics cơ bản đến kỹ năng tư duy phản biện. Khám phá từng hoạt động và lợi ích của chúng.',
    content: `<h2>Tại Sao Trophy9 Khác Biệt?</h2><p><strong>Trophy9</strong> không chỉ là một ứng dụng học tiếng Anh – đây là một hệ sinh thái học tập toàn diện được xây dựng trên nền tảng sách giáo khoa <strong>Benchmark Education</strong> theo chuẩn CCSS (Common Core State Standards) của Hoa Kỳ. Với 9 hoạt động học tập tích hợp, Trophy9 đảm bảo học sinh phát triển đồng đều tất cả các kỹ năng ngôn ngữ – từ phonics và từ vựng đến đọc hiểu nâng cao và tư duy phản biện.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="Học sinh học tiếng Anh với Trophy9" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Trophy9 mang đến trải nghiệm học tiếng Anh đa dạng và toàn diện cho học sinh K-9</figcaption></figure><h2>9 Hoạt Động Cốt Lõi Của Trophy9</h2><h3>1. Leveled Readers – Đọc Theo Cấp Độ</h3><p>198 cuốn sách đọc được phân cấp theo chỉ số Lexile, bao phủ đa dạng thể loại: phi hư cấu, văn học, khoa học, lịch sử. Mỗi Leveled Reader đi kèm câu hỏi hiểu bài và hoạt động mở rộng.</p><h3>2. Vocabulary – Từ Vựng Trong Ngữ Cảnh</h3><p>Học từ vựng không phải qua danh sách mà qua <strong>ngữ cảnh thực tế</strong>. Mỗi tuần, học sinh học 10–15 từ vựng mục tiêu được giới thiệu qua bài đọc và củng cố qua bài tập đa dạng.</p><h3>3. Phonics – Nền Tảng Phát Âm</h3><p>Chương trình phonics có hệ thống giúp học sinh mầm non và tiểu học giải mã âm thanh – chữ viết, xây dựng nền tảng đọc vững chắc. Đặc biệt hiệu quả cho học sinh mới bắt đầu học tiếng Anh.</p><h3>4. Dictation – Nghe Chép Chính Tả</h3><p>Kết hợp kỹ năng nghe và viết, giúp học sinh cải thiện chính tả, nhận biết âm vị và tăng cường trí nhớ ngôn ngữ.</p><h3>5. Shadowing – Luyện Phát Âm Theo Bản Ngữ</h3><p>Học sinh nghe và lặp lại ngay lập tức theo giọng đọc của người bản ngữ, cải thiện phát âm, ngữ điệu và tốc độ nói một cách tự nhiên.</p><h3>6. Reading Comprehension – Đọc Hiểu Chuyên Sâu</h3><p>Các câu hỏi đọc hiểu theo thang Bloom's Taxonomy, từ nhớ lại thông tin cơ bản đến phân tích, đánh giá và sáng tạo.</p><h3>7. Grammar – Ngữ Pháp Thực Hành</h3><p>Ngữ pháp được dạy trong ngữ cảnh, không phải lý thuyết khô khan. Học sinh học cách sử dụng cấu trúc ngữ pháp qua đọc và viết.</p><h3>8. Writing – Kỹ Năng Viết</h3><p>Từ viết câu đơn giản đến đoạn văn và bài luận ngắn, Trophy9 phát triển kỹ năng viết tiếng Anh có cấu trúc theo từng cấp độ.</p><h3>9. Critical Thinking – Tư Duy Phản Biện</h3><p>Hoạt động cao cấp nhất của Trophy9 – học sinh học cách phân tích, đặt câu hỏi, so sánh quan điểm và hình thành ý kiến riêng bằng tiếng Anh.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80" alt="Học sinh tư duy phản biện" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Tư duy phản biện – kỹ năng thế kỷ 21 được tích hợp vào chương trình Trophy9</figcaption></figure><h2>Lộ Trình 6 Cấp Độ Của Trophy9</h2><p>Trophy9 chia chương trình thành 6 cấp (T1–T6) theo 3 giai đoạn:</p><ul><li><strong>Walk (T1–T2)</strong>: Nền tảng – Phonics, từ vựng cơ bản, câu đơn giản</li><li><strong>Run (T3–T4)</strong>: Phát triển – Đọc hiểu nâng cao, ngữ pháp, viết đoạn văn</li><li><strong>Sprint (T5–T6)</strong>: Thành thạo – Tư duy phản biện, viết luận, chuẩn bị IELTS</li></ul><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Bắt Đầu Hành Trình Trophy9</h3><p>Học sinh K-9 sẽ được đánh giá và xếp vào cấp độ phù hợp, sau đó trải nghiệm 9 hoạt động học tập theo lộ trình cá nhân hóa.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Đăng Ký Học Thử Miễn Phí</a></div>`,
    meta_description: 'Trophy9 – giải pháp đọc hiểu tiếng Anh K9 toàn diện với 9 hoạt động (phonics, vocabulary, shadowing, critical thinking) theo chuẩn CCSS. Phù hợp cho trường học và trung tâm tiếng Anh.',
    meta_keywords: 'Trophy9 giải pháp đọc hiểu K9, phần mềm tiếng Anh trường tiểu học THCS, phonics tiếng Anh trung tâm, CCSS Leveled Readers, shadowing tư duy phản biện, giải pháp tiếng Anh K9 K12, Reading Pathway Cdimex'
  },
  {
    slug: 'chien-luoc-doc-hieu-ielts-tang-band-diem',
    title: 'Chiến Lược Đọc Hiểu IELTS: Bí Quyết Tăng Band Điểm Hiệu Quả',
    excerpt: 'Khám phá các chiến lược đọc hiểu IELTS được kiểm chứng giúp tăng band điểm nhanh chóng, từ skimming, scanning đến quản lý thời gian hiệu quả trong phòng thi.',
    content: `<h2>Tại Sao Đọc Hiểu Là Kỹ Năng Quyết Định Trong IELTS?</h2><p>Phần <strong>Reading trong IELTS</strong> là một trong bốn kỹ năng được đánh giá, nhưng lại có tác động lớn nhất đến band điểm tổng thể của thí sinh. Với 40 câu hỏi trong vỏn vẹn 60 phút, nhiều học sinh Việt Nam gặp khó khăn không phải vì thiếu từ vựng mà vì thiếu <em>chiến lược đọc</em> bài bản. Bài viết này sẽ chia sẻ những phương pháp đọc hiểu IELTS được chứng minh hiệu quả, giúp bạn tự tin bước vào phòng thi và đạt mục tiêu band 7.0 trở lên.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80" alt="Sinh viên ôn luyện IELTS Reading" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Chiến lược đọc đúng đắn giúp tiết kiệm thời gian và tăng độ chính xác trong bài thi IELTS</figcaption></figure><h2>3 Chiến Lược Đọc Hiểu Cốt Lõi Trong IELTS</h2><h3>1. Skimming – Đọc Lướt Để Nắm Ý Chính</h3><p><strong>Skimming</strong> là kỹ thuật đọc nhanh toàn bài trong 2–3 phút để nắm bức tranh tổng thể. Bạn không cần đọc từng từ, mà chỉ cần chú ý đến tiêu đề, câu đầu và câu cuối mỗi đoạn văn.</p><h3>2. Scanning – Quét Thông Tin Có Chủ Đích</h3><p><strong>Scanning</strong> là kỹ thuật tìm kiếm thông tin cụ thể trong văn bản. Đọc câu hỏi trước, xác định từ khóa, sau đó di chuyển mắt nhanh qua từng đoạn để tìm từ khóa hoặc từ đồng nghĩa.</p><h3>3. Intensive Reading – Đọc Chuyên Sâu Khi Cần Thiết</h3><p>Chỉ áp dụng <strong>intensive reading</strong> cho những đoạn văn có câu hỏi phức tạp như Summary Completion hay Multiple Choice.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" alt="Quản lý thời gian trong IELTS" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Phân chia thời gian hợp lý là chìa khóa để hoàn thành 40 câu hỏi trong 60 phút</figcaption></figure><blockquote style="border-left:4px solid #2563eb;padding:1rem 1.5rem;margin:2rem 0;background:#eff6ff;border-radius:0 8px 8px 0;"><p><strong>"Học sinh đạt band 7.0+ không nhất thiết có vốn từ vựng phong phú hơn, mà họ biết cách đọc có chiến lược – đọc đúng chỗ, đúng lúc, đúng mục đích."</strong></p></blockquote><h2>Quản Lý Thời Gian: Yếu Tố Sống Còn Trong Phòng Thi</h2><p>Với <strong>60 phút cho 3 passages và 40 câu hỏi</strong>, phân bổ: Passage 1 (15–17 phút), Passage 2 (18–20 phút), Passage 3 (20–22 phút), còn lại kiểm tra lại.</p><h2>Xây Dựng Nền Tảng Đọc Hiểu Từ Sớm Với Achieve3000</h2><p>Nền tảng <strong>Achieve3000</strong> thuộc Reading Pathway sử dụng công nghệ thích ứng để cá nhân hóa nội dung đọc theo chỉ số Lexile, giúp nâng cao năng lực đọc hiểu một cách có hệ thống – nền tảng vững chắc cho hành trình chinh phục IELTS.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80" alt="Ghi chú từ vựng IELTS" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Ghi chép từ vựng theo ngữ cảnh giúp ghi nhớ lâu hơn và dùng đúng hơn</figcaption></figure><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Bắt Đầu Hành Trình Chinh Phục IELTS Cùng Reading Pathway</h3><p>Achieve3000 giúp học sinh THPT xây dựng nền tảng đọc hiểu vững chắc với nội dung cá nhân hóa theo chỉ số Lexile.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Đăng Ký Tư Vấn Miễn Phí</a></div>`,
    meta_description: 'Chiến lược đọc hiểu IELTS hiệu quả: skimming, scanning, quản lý thời gian. Achieve3000 – nền tảng luyện thi IELTS Reading cho học sinh THPT và trung tâm tiếng Anh Việt Nam.',
    meta_keywords: 'chiến lược IELTS reading band 7, đọc hiểu IELTS trung tâm tiếng Anh, luyện thi IELTS K12 đại học, skimming scanning tiếng Anh, Achieve3000 IELTS SAT, giải pháp đọc hiểu THPT, Reading Pathway'
  },
  {
    slug: 'achieve3000-nen-tang-doc-hieu-hoc-sinh-thpt',
    title: 'Achieve3000: Nền Tảng Đọc Hiểu Thích Ứng Cho Học Sinh THPT Và Đại Học',
    excerpt: 'Achieve3000 sử dụng công nghệ thích ứng và chỉ số Lexile để cá nhân hóa nội dung đọc, giúp học sinh THPT và sinh viên đại học cải thiện kỹ năng đọc hiểu tiếng Anh toàn diện.',
    content: `<h2>Thách Thức Đọc Hiểu Tiếng Anh Ở Bậc THPT Và Đại Học</h2><p>Khi học sinh bước vào bậc <strong>THPT và đại học</strong>, yêu cầu về năng lực đọc hiểu tiếng Anh tăng đột biến. <strong>Achieve3000</strong> – cấu phần dành cho học sinh lớp 10 đến đại học trong hệ sinh thái Reading Pathway – là công cụ không thể thiếu trong hành trình học tiếng Anh hiện đại.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" alt="Học sinh THPT học tiếng Anh với công nghệ" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Achieve3000 mang trải nghiệm học tập cá nhân hóa đến từng học sinh THPT và sinh viên</figcaption></figure><h2>Achieve3000 Là Gì?</h2><p><strong>Achieve3000</strong> là nền tảng học đọc hiểu tiếng Anh trực tuyến được thiết kế cho học sinh từ lớp 10 đến đại học. Điểm khác biệt cốt lõi nằm ở <em>công nghệ học tập thích ứng</em> (adaptive learning): hệ thống tự động đo lường trình độ của từng học sinh qua chỉ số Lexile và điều chỉnh độ khó nội dung phù hợp.</p><ul><li><strong>Cơ sở dữ liệu</strong> hơn 15.000 bài đọc từ các nguồn tin tức và học thuật uy tín</li><li><strong>Công nghệ Lexile</strong> đảm bảo mỗi học sinh luôn đọc ở "vùng phát triển tối ưu"</li><li><strong>Báo cáo chi tiết</strong> cho giáo viên và phụ huynh theo dõi tiến độ</li></ul><blockquote style="border-left:4px solid #2563eb;padding:1rem 1.5rem;margin:2rem 0;background:#eff6ff;border-radius:0 8px 8px 0;"><p><strong>"Học sinh sử dụng Achieve3000 đúng cách trong 1 năm học có thể tăng chỉ số Lexile trung bình từ 150–250L, tương đương 1–2 năm học tiếng Anh thông thường."</strong></p><footer>— Dữ liệu nghiên cứu từ Achieve3000 Inc.</footer></blockquote><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80" alt="Chỉ số Lexile và sách đọc" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Chỉ số Lexile giúp ghép đôi học sinh với nội dung đọc phù hợp chính xác nhất</figcaption></figure><h2>5 Tính Năng Nổi Bật Của Achieve3000</h2><h3>1. Bài Đọc Song Song (Differentiated Instruction)</h3><p>Công nghệ độc quyền của Achieve3000 cho phép tạo ra <strong>2–3 phiên bản cùng một bài đọc</strong> ở các mức Lexile khác nhau – toàn lớp thảo luận cùng chủ đề, mỗi em đọc phù hợp năng lực.</p><h3>2. Từ Vựng Trong Ngữ Cảnh</h3><p>Mỗi bài đọc có 5–8 từ vựng mục tiêu được giải thích ngay trong bài, kèm theo các bài tập củng cố.</p><h3>3. Viết Phân Tích</h3><p>Sau mỗi bài đọc, học sinh thực hiện một bài <strong>viết phân tích ngắn</strong> để phát triển tư duy phê phán – kỹ năng quan trọng cho IELTS Writing.</p><h3>4. Lộ Trình Học Tập Cá Nhân Hóa</h3><p>Hệ thống AI liên tục phân tích kết quả và <strong>tự động tăng độ khó</strong> khi học sinh đạt ngưỡng thành thạo.</p><h3>5. Kết Nối Với Chuẩn Thi Quốc Tế</h3><p>Nội dung tương thích với <strong>IELTS, SAT, ACT</strong> – vừa cải thiện năng lực đọc hiểu, vừa sẵn sàng cho các kỳ thi quan trọng.</p><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Trải Nghiệm Achieve3000 Ngay Hôm Nay</h3><p>Reading Pathway mang Achieve3000 đến Việt Nam với giao diện tiếng Việt và đội ngũ hỗ trợ tận tâm.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Đăng Ký Dùng Thử Miễn Phí</a></div>`,
    meta_description: 'Achieve3000 – nền tảng đọc hiểu thích ứng cho học sinh K12, THPT và đại học. Sử dụng Lexile để cá nhân hóa lộ trình đọc, chuẩn bị IELTS/SAT. Giải pháp cho trung tâm tiếng Anh và trường học.',
    meta_keywords: 'Achieve3000 giải pháp K12 đại học, nền tảng đọc hiểu tiếng Anh THPT, adaptive learning Lexile, luyện thi IELTS SAT tiếng Anh, phần mềm đọc hiểu trung tâm tiếng Anh, giải pháp trường học đại học, Reading Pathway Cdimex'
  },
  {
    slug: 'blended-learning-phuong-phap-day-tieng-anh-hien-dai',
    title: 'Blended Learning: Phương Pháp Dạy Tiếng Anh Hiện Đại Cho Trường Học Việt Nam',
    excerpt: 'Blended learning kết hợp lớp học truyền thống và công nghệ số, giúp tối ưu hóa việc dạy và học tiếng Anh. Tìm hiểu cách triển khai hiệu quả tại trường học Việt Nam.',
    content: `<h2>Blended Learning Là Gì Và Tại Sao Nó Quan Trọng?</h2><p>Trong bối cảnh giáo dục Việt Nam đang chuyển mình mạnh mẽ, <strong>blended learning</strong> (học tập kết hợp) nổi lên như một trong những phương pháp giảng dạy hiệu quả nhất thế kỷ 21. Không phải là thay thế giáo viên bằng máy tính, blended learning là sự <em>kết hợp hài hòa</em> giữa giảng dạy trực tiếp và học tập trực tuyến có hỗ trợ công nghệ.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80" alt="Lớp học blended learning hiện đại" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Blended learning kết hợp sức mạnh của giáo viên và công nghệ để tạo ra môi trường học tập tối ưu</figcaption></figure><blockquote style="border-left:4px solid #2563eb;padding:1rem 1.5rem;margin:2rem 0;background:#eff6ff;border-radius:0 8px 8px 0;"><p><strong>"Nghiên cứu của Bộ Giáo Dục Hoa Kỳ cho thấy học sinh theo học blended learning đạt kết quả tốt hơn 25% so với học thuần trực tuyến hoặc thuần truyền thống."</strong></p></blockquote><h2>3 Mô Hình Blended Learning Phổ Biến</h2><h3>1. Station Rotation (Luân Phiên Trạm)</h3><p>Học sinh <strong>luân phiên</strong> giữa học nhóm với giáo viên, tự học trực tuyến, và hoạt động nhóm độc lập. Phù hợp nhất cho bối cảnh trường học Việt Nam.</p><h3>2. Flipped Classroom (Lớp Học Đảo Ngược)</h3><p>Học sinh xem video bài giảng ở nhà, đến lớp thực hành và thảo luận cùng giáo viên. Tối ưu hóa thời gian tương tác với giáo viên.</p><h3>3. Flex Model</h3><p>Nội dung học chủ yếu qua <strong>nền tảng trực tuyến</strong>, giáo viên hỗ trợ linh hoạt. Phù hợp cho học sinh có năng lực tự học tốt.</p><figure style="text-align:center;margin:2rem 0;"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="Học sinh học tiếng Anh với công nghệ" style="max-width:100%;border-radius:8px;" /><figcaption style="color:#666;font-size:0.9rem;margin-top:0.5rem;">Công nghệ giúp học sinh luyện tập tiếng Anh mọi lúc, mọi nơi</figcaption></figure><h2>Reading Pathway: Giải Pháp Blended Learning Toàn Diện</h2><p>Reading Pathway cung cấp giải pháp blended learning hoàn chỉnh:</p><ul><li><strong>Trophy9</strong>: Dành cho học sinh K–9, tích hợp 9 hoạt động đọc hiểu từ phonics đến tư duy phản biện</li><li><strong>Achieve3000</strong>: Dành cho học sinh THPT và đại học, chuẩn bị cho IELTS và các kỳ thi quốc tế</li></ul><p>Cả hai nền tảng đều được thiết kế để hoạt động hoàn hảo trong mô hình blended learning, với <strong>báo cáo chi tiết</strong> giúp giáo viên theo dõi và hỗ trợ từng học sinh hiệu quả.</p><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:2rem;margin-top:2.5rem;text-align:center;"><h3 style="color:#1d4ed8;margin-top:0;">Xây Dựng Chương Trình Blended Learning Cho Trường Của Bạn</h3><p>Reading Pathway hỗ trợ trường học thiết kế và triển khai mô hình blended learning tiếng Anh phù hợp với điều kiện thực tế.</p><a href="/#contact" style="display:inline-block;background:#2563eb;color:white;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;margin-top:0.5rem;">Liên Hệ Tư Vấn Miễn Phí</a></div>`,
    meta_description: 'Blended learning tiếng Anh: kết hợp lớp học và công nghệ số với Trophy9 & Achieve3000. Giải pháp tối ưu cho trường học K9, K12, đại học và trung tâm tiếng Anh Việt Nam.',
    meta_keywords: 'blended learning tiếng Anh trường học, phương pháp dạy K9 K12 hiệu quả, Trophy9 Achieve3000 blended learning, giải pháp dạy tiếng Anh trung tâm, flipped classroom station rotation Việt Nam, Reading Pathway giải pháp tổng thể'
  }
];

const seedBlogPosts = db.transaction(() => {
  let created = 0;
  for (const post of blogPosts) {
    const cover = postCovers[post.slug] || '';
    const result = insertPost.run(post.slug, post.title, post.excerpt, post.content, cover, post.meta_description, post.meta_keywords);
    if (result.changes > 0) created++;
    else updateCover.run(cover, post.slug); // backfill cover for existing rows
  }
  return created;
});

const blogCreated = seedBlogPosts();
const blogTotal = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published=1').get().c;
console.log(`Blog posts seeded: ${blogCreated} new | Total published: ${blogTotal}`);
