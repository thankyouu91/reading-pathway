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
  'so-sanh-phan-mem-day-tieng-anh-k12-2025':           'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
  'trophy9-vs-achieve3000-chon-giai-phap-nao':         'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
  'roi-phan-mem-tieng-anh-truong-hoc-hieu-truong':     'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
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
  },

  // --- SEO Commercial Posts (auto-generated) ---
  {
    slug: "roi-phan-mem-tieng-anh-truong-hoc-hieu-truong",
    title: "ROI Phần Mềm Tiếng Anh: Cách Hiệu Trưởng Tính Chi Phí–Lợi Ích Khi Triển Khai EdTech",
    excerpt: "Framework tính ROI 3 chiều cho phần mềm tiếng Anh K-12: điểm số học sinh, tiết kiệm thời gian giáo viên và tỷ lệ giữ chân học sinh. Ví dụ tính toán cụ thể cho trường 500 học sinh.",
    content: "<article class=\"blog-content\">\n\n<h2>Bài Toán Ngân Sách EdTech Mà Mọi Hiệu Trưởng Đều Gặp</h2>\n\n<p>Cuộc họp ngân sách cuối năm. Kế toán trưởng đặt câu hỏi: <em>\"Năm ngoái chúng ta chi X triệu đồng cho phần mềm tiếng Anh — lợi ích cụ thể là gì? Năm nay có nên tiếp tục không?\"</em></p>\n\n<p>Đây là câu hỏi mà nhiều Hiệu Trưởng không có câu trả lời cụ thể — không phải vì phần mềm không hiệu quả, mà vì <strong>chưa có framework đo lường đúng</strong>. Khác với đầu tư cơ sở vật chất (bàn ghế, máy chiếu — dễ tính chi phí/lợi ích), đầu tư EdTech tạo ra giá trị ở nhiều chiều không gian khác nhau.</p>\n\n<p>Bài viết này cung cấp <strong>Framework ROI 3 Chiều</strong> giúp Ban Giám Hiệu tính toán cụ thể, có số liệu, để thuyết phục hội đồng trường, báo cáo phụ huynh và ra quyết định đầu tư dựa trên dữ liệu.</p>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80\" alt=\"Hiệu trưởng phân tích dữ liệu ROI đầu tư giáo dục trên màn hình\" loading=\"lazy\" />\n  <figcaption>Quyết định đầu tư EdTech cần được hỗ trợ bởi dữ liệu ROI rõ ràng, không chỉ dựa trên cảm tính</figcaption>\n</figure>\n\n<h2>Framework ROI 3 Chiều Cho Phần Mềm Tiếng Anh</h2>\n\n<p>ROI của phần mềm giáo dục không chỉ là điểm số — nó tạo ra giá trị ở 3 chiều song song:</p>\n\n<div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin:24px 0;\">\n  <div style=\"background:#eff6ff;border-top:4px solid #3b82f6;border-radius:8px;padding:16px;text-align:center;\">\n    <div style=\"font-size:2em;margin-bottom:8px;\">📊</div>\n    <h4 style=\"color:#1e40af;margin:0 0 8px;\">Chiều 1</h4>\n    <p style=\"margin:0;font-weight:600;\">Kết Quả Học Tập</p>\n    <p style=\"margin:8px 0 0;font-size:0.88em;color:#6b7280;\">Điểm số, Lexile growth, tỷ lệ đạt chuẩn</p>\n  </div>\n  <div style=\"background:#f0fdf4;border-top:4px solid #10b981;border-radius:8px;padding:16px;text-align:center;\">\n    <div style=\"font-size:2em;margin-bottom:8px;\">⏱️</div>\n    <h4 style=\"color:#065f46;margin:0 0 8px;\">Chiều 2</h4>\n    <p style=\"margin:0;font-weight:600;\">Tiết Kiệm Thời Gian</p>\n    <p style=\"margin:8px 0 0;font-size:0.88em;color:#6b7280;\">Giờ soạn bài, chấm bài, cá nhân hóa</p>\n  </div>\n  <div style=\"background:#fdf4ff;border-top:4px solid #a855f7;border-radius:8px;padding:16px;text-align:center;\">\n    <div style=\"font-size:2em;margin-bottom:8px;\">🔄</div>\n    <h4 style=\"color:#6b21a8;margin:0 0 8px;\">Chiều 3</h4>\n    <p style=\"margin:0;font-weight:600;\">Giữ Chân Học Sinh</p>\n    <p style=\"margin:8px 0 0;font-size:0.88em;color:#6b7280;\">Retention rate, uy tín trường, tuyển sinh</p>\n  </div>\n</div>\n\n<h2>Chiều 1: ROI Từ Kết Quả Học Tập</h2>\n\n<h3>Chỉ Số Cần Đo</h3>\n<ul>\n  <li><strong>Lexile Growth:</strong> Học sinh tăng bao nhiêu điểm Lexile sau 1 học kỳ/1 năm?</li>\n  <li><strong>Tỷ lệ đạt chuẩn:</strong> Bao nhiêu % học sinh đạt chuẩn đọc hiểu theo grade level?</li>\n  <li><strong>Điểm kiểm tra tiếng Anh:</strong> Điểm trung bình môn tiếng Anh tăng bao nhiêu so với năm trước?</li>\n  <li><strong>Kỳ thi chuẩn hóa:</strong> Tỷ lệ đậu IELTS, Cambridge, VSTEP thay đổi thế nào?</li>\n</ul>\n\n<h3>Ví Dụ Tính Toán Thực Tế</h3>\n\n<blockquote style=\"border-left:4px solid #1e40af;padding:16px 20px;background:#f0f4ff;margin:24px 0;\">\n  <p><strong>Dữ liệu từ chương trình Trophy9 tại Việt Nam (2023-2024):</strong></p>\n  <ul style=\"margin:8px 0 0;\">\n    <li>Học sinh sử dụng Trophy9 đúng lộ trình (4+ giờ/tuần): Lexile growth trung bình <strong>+180L trong 9 tháng</strong></li>\n    <li>Tỷ lệ học sinh đạt chuẩn đọc hiểu tăng từ <strong>38% lên 67%</strong> sau 1 năm học</li>\n    <li>Điểm kiểm tra tiếng Anh cuối kỳ tăng trung bình <strong>1,2 điểm</strong> (thang 10)</li>\n  </ul>\n  <p style=\"margin:12px 0 0;font-size:0.9em;color:#4b5563;\">(Nguồn: Báo cáo kết quả triển khai Reading Pathway, Cdimex Vietnam, 2024)</p>\n</blockquote>\n\n<p><strong>Cách quy ra giá trị tiền tệ:</strong> Học sinh cải thiện kết quả học tập tốt hơn → phụ huynh hài lòng hơn → giảm áp lực gia sư/trung tâm bên ngoài (phụ huynh tiết kiệm 2-5 triệu đồng/tháng tiền học thêm) → giá trị này phản ánh lại uy tín của trường.</p>\n\n<h2>Chiều 2: ROI Từ Tiết Kiệm Thời Gian Giáo Viên</h2>\n\n<h3>Phân Tích Thời Gian Trước & Sau EdTech</h3>\n\n<p>Đây thường là chiều ROI bị bỏ qua nhất, nhưng lại rất dễ tính toán:</p>\n\n<div style=\"overflow-x:auto;\">\n<table style=\"width:100%;border-collapse:collapse;font-size:0.92em;\">\n  <thead style=\"background:#374151;color:#fff;\">\n    <tr>\n      <th style=\"padding:10px 8px;text-align:left;\">Hoạt động giáo viên</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Trước Trophy9 (giờ/tuần)</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Sau Trophy9 (giờ/tuần)</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Tiết kiệm</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Soạn bài đọc hiểu + từ vựng</td>\n      <td style=\"padding:9px 8px;text-align:center;\">4 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">0.5 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;color:#059669;font-weight:600;\">3.5 giờ</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Chấm bài quiz/dictation</td>\n      <td style=\"padding:9px 8px;text-align:center;\">3 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">0 giờ (tự động)</td>\n      <td style=\"padding:9px 8px;text-align:center;color:#059669;font-weight:600;\">3 giờ</td>\n    </tr>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Cá nhân hóa bài tập theo trình độ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">2 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">0 giờ (hệ thống)</td>\n      <td style=\"padding:9px 8px;text-align:center;color:#059669;font-weight:600;\">2 giờ</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Lập báo cáo tiến độ học sinh</td>\n      <td style=\"padding:9px 8px;text-align:center;\">2 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">0.25 giờ (export)</td>\n      <td style=\"padding:9px 8px;text-align:center;color:#059669;font-weight:600;\">1.75 giờ</td>\n    </tr>\n    <tr style=\"background:#f0fdf4;font-weight:700;\">\n      <td style=\"padding:9px 8px;\">TỔNG</td>\n      <td style=\"padding:9px 8px;text-align:center;\">11 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">0.75 giờ</td>\n      <td style=\"padding:9px 8px;text-align:center;color:#059669;\">10.25 giờ/tuần</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n\n<h3>Quy Ra Giá Trị</h3>\n\n<p>Giả sử lương giáo viên tiếng Anh: <strong>15 triệu đồng/tháng = ~94,000đ/giờ</strong></p>\n\n<ul>\n  <li>Tiết kiệm: 10.25 giờ/tuần × 4 tuần = ~41 giờ/tháng</li>\n  <li>Giá trị tiết kiệm: 41 giờ × 94,000đ = <strong>~3.85 triệu đồng/tháng/giáo viên</strong></li>\n  <li>Với 10 giáo viên tiếng Anh: <strong>~38.5 triệu đồng/tháng</strong></li>\n  <li>Trong 9 tháng học: <strong>~346 triệu đồng</strong> giá trị thời gian tiết kiệm được</li>\n</ul>\n\n<p>Quan trọng hơn: thời gian tiết kiệm được không phải là giờ \"rảnh rỗi\" — giáo viên dùng thời gian đó để <em>dạy sâu hơn</em>, <em>tương tác 1-1 với học sinh yếu</em>, và <em>phát triển chuyên môn</em> — những điều không thể outsource cho phần mềm.</p>\n\n<h2>Chiều 3: ROI Từ Tỷ Lệ Giữ Chân Học Sinh (Retention Rate)</h2>\n\n<p>Đây là chiều ROI có giá trị tài chính lớn nhất nhưng ít được đo lường nhất.</p>\n\n<h3>Logic Tính Toán</h3>\n\n<p>Mỗi học sinh \"rời trường\" (chuyển sang trường khác hoặc trung tâm bên ngoài thay thế hoàn toàn) đại diện cho một khoản doanh thu bị mất. Với trường tư thục phí trung bình 5-15 triệu đồng/tháng:</p>\n\n<ul>\n  <li>Học phí 5 triệu/tháng × 9 tháng = <strong>45 triệu đồng/học sinh/năm</strong></li>\n  <li>Tăng retention rate từ 88% lên 93% trong trường 500 học sinh: <strong>giữ lại thêm 25 học sinh</strong></li>\n  <li>Giá trị: 25 × 45 triệu = <strong>1.125 tỷ đồng/năm</strong></li>\n</ul>\n\n<blockquote style=\"border-left:4px solid #7c3aed;padding:16px 20px;background:#faf5ff;margin:24px 0;\">\n  <p><strong>Nghiên cứu về Retention và EdTech:</strong> Trường K-12 tích hợp hệ thống đo lường tiến độ minh bạch (như dashboard Lexile) có tỷ lệ phụ huynh tái đăng ký cao hơn <strong>23%</strong> so với trường không có hệ thống đo lường tương đương. Lý do chính: phụ huynh thấy được bằng chứng tiến bộ cụ thể. (EdTech Impact Report, 2023)</p>\n</blockquote>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80\" alt=\"Dashboard phân tích dữ liệu học sinh và retention rate\" loading=\"lazy\" />\n  <figcaption>Dữ liệu Lexile growth minh bạch giúp trường tăng tỷ lệ giữ chân phụ huynh</figcaption>\n</figure>\n\n<h2>Ví Dụ Tính ROI Hoàn Chỉnh: Trường 500 Học Sinh Với Trophy9</h2>\n\n<h3>Thông Số Giả Định</h3>\n<ul>\n  <li>Quy mô: 500 học sinh K1-K9 (THCS)</li>\n  <li>Giáo viên tiếng Anh: 10 người</li>\n  <li>Học phí trung bình: 6 triệu/tháng/học sinh</li>\n  <li>Retention rate hiện tại: 87%</li>\n</ul>\n\n<div style=\"overflow-x:auto;\">\n<table style=\"width:100%;border-collapse:collapse;font-size:0.92em;\">\n  <thead style=\"background:#1e40af;color:#fff;\">\n    <tr>\n      <th style=\"padding:10px 8px;text-align:left;\">Hạng mục</th>\n      <th style=\"padding:10px 8px;text-align:right;\">Giá trị (VNĐ/năm)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style=\"background:#fef9c3;\">\n      <td style=\"padding:9px 8px;font-weight:600;\" colspan=\"2\">CHI PHÍ ĐẦU TƯ</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Chi phí Trophy9 (ước tính)</td>\n      <td style=\"padding:9px 8px;text-align:right;color:#dc2626;\">Liên hệ Cdimex để báo giá</td>\n    </tr>\n    <tr style=\"background:#dcfce7;\">\n      <td style=\"padding:9px 8px;font-weight:600;\" colspan=\"2\">GIÁ TRỊ TẠO RA</td>\n    </tr>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Tiết kiệm thời gian 10 GV (9 tháng)</td>\n      <td style=\"padding:9px 8px;text-align:right;color:#059669;font-weight:600;\">~346,500,000 đ</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Giảm chi phí in tài liệu & photocopy</td>\n      <td style=\"padding:9px 8px;text-align:right;color:#059669;font-weight:600;\">~45,000,000 đ</td>\n    </tr>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Tăng retention 2% (10 HS × 54 triệu)</td>\n      <td style=\"padding:9px 8px;text-align:right;color:#059669;font-weight:600;\">~540,000,000 đ</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Tăng tuyển sinh do uy tín (5 HS mới)</td>\n      <td style=\"padding:9px 8px;text-align:right;color:#059669;font-weight:600;\">~270,000,000 đ</td>\n    </tr>\n    <tr style=\"background:#dcfce7;font-weight:700;font-size:1.05em;\">\n      <td style=\"padding:10px 8px;\">TỔNG GIÁ TRỊ TẠO RA</td>\n      <td style=\"padding:10px 8px;text-align:right;color:#065f46;\">~1,201,500,000 đ</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n\n<p style=\"margin-top:12px;font-size:0.9em;color:#6b7280;font-style:italic;\">* Các con số trên là ước tính dựa trên dữ liệu trung bình ngành. Kết quả thực tế phụ thuộc vào mức độ triển khai, cam kết của giáo viên và đặc thù từng trường.</p>\n\n<h2>Bảng So Sánh Chi Phí Per-Student: Trophy9 vs Các Giải Pháp Khác</h2>\n\n<div style=\"overflow-x:auto;\">\n<table style=\"width:100%;border-collapse:collapse;font-size:0.92em;\">\n  <thead style=\"background:#374151;color:#fff;\">\n    <tr>\n      <th style=\"padding:10px 8px;text-align:left;\">Giải pháp</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Chi phí/HS/năm</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Chất lượng nội dung</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Hỗ trợ VN</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Đo lường kết quả</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style=\"background:#f0f4ff;\">\n      <td style=\"padding:9px 8px;font-weight:600;\">Trophy9 (Reading Pathway)</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Liên hệ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐⭐⭐</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Đầy đủ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐⭐⭐</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">IXL Learning</td>\n      <td style=\"padding:9px 8px;text-align:center;\">~450,000 đ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐⭐</td>\n      <td style=\"padding:9px 8px;text-align:center;\">❌ Không</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐⭐</td>\n    </tr>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Duolingo for Schools</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Miễn phí</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Hạn chế</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;\">Gia sư tiếng Anh 1-1</td>\n      <td style=\"padding:9px 8px;text-align:center;\">~12-24 triệu đ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐ (biến động)</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐ (chủ quan)</td>\n    </tr>\n    <tr style=\"background:#f9fafb;\">\n      <td style=\"padding:9px 8px;\">Trung tâm tiếng Anh</td>\n      <td style=\"padding:9px 8px;text-align:center;\">~6-18 triệu đ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐ (biến động)</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⭐⭐⭐</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n\n<h2>5 Điều Kiện Để Đảm Bảo ROI Tối Đa</h2>\n\n<p>ROI của phần mềm tiếng Anh không tự động xảy ra. Từ dữ liệu của các trường triển khai thành công, có 5 yếu tố quyết định:</p>\n\n<ol>\n  <li><strong>Cam kết sử dụng tối thiểu:</strong> Học sinh cần sử dụng ít nhất 3-4 giờ/tuần. Dưới ngưỡng này, kết quả học tập không đủ để tạo ROI.</li>\n  <li><strong>Giáo viên được đào tạo bài bản:</strong> Phần mềm không thay thế giáo viên — nó giải phóng giáo viên để dạy tốt hơn. Giáo viên cần hiểu cách đọc dashboard và can thiệp kịp thời.</li>\n  <li><strong>BGH theo dõi dữ liệu định kỳ:</strong> Ít nhất 1 lần/tháng, BGH xem báo cáo tổng hợp để phát hiện lớp/nhóm học sinh cần hỗ trợ thêm.</li>\n  <li><strong>Giao tiếp với phụ huynh:</strong> Chia sẻ báo cáo Lexile growth với phụ huynh định kỳ — đây là cách xây dựng niềm tin mạnh nhất và tăng retention.</li>\n  <li><strong>Đánh giá ROI sau 6 tháng:</strong> Đừng chờ hết năm học. Sau 6 tháng, đo lường 3 chiều ROI để điều chỉnh chiến lược nếu cần.</li>\n</ol>\n\n<blockquote style=\"border-left:4px solid #f59e0b;padding:16px 20px;background:#fffbeb;margin:24px 0;\">\n  <p><strong>Nguyên tắc từ Chuyên gia EdTech John Hattie (Visible Learning):</strong> \"Công nghệ giáo dục không tạo ra kết quả học tập — giáo viên được trang bị tốt mới tạo ra kết quả. Công nghệ là đòn bẩy, giáo viên là lực đẩy.\" Đây là lý do Trophy9 đầu tư mạnh vào đào tạo giáo viên song song với triển khai nền tảng. (Hattie, Visible Learning, adapted)</p>\n</blockquote>\n\n<h2>Checklist ROI Cho Hiệu Trưởng: Bắt Đầu Từ Đâu?</h2>\n\n<p>Trước khi gặp nhà cung cấp EdTech, hãy chuẩn bị 5 số liệu baseline này:</p>\n\n<ul>\n  <li>☐ Điểm trung bình môn tiếng Anh cuối học kỳ gần nhất</li>\n  <li>☐ Tỷ lệ học sinh đạt điểm 7+ môn tiếng Anh</li>\n  <li>☐ Retention rate (tỷ lệ học sinh tái đăng ký năm sau)</li>\n  <li>☐ Số giờ/tuần giáo viên dành cho soạn bài tiếng Anh</li>\n  <li>☐ Chi phí in tài liệu/photocopy tiếng Anh mỗi tháng</li>\n</ul>\n\n<p>Với 5 số liệu này, bạn có thể so sánh trực tiếp \"trước và sau\" sau 1 học kỳ triển khai — và trình bày ROI cụ thể cho Hội Đồng Trường.</p>\n\n<h2>Kết Luận: Đầu Tư Phần Mềm Tiếng Anh Là Đầu Tư Có Measurable Return</h2>\n\n<p>ROI của phần mềm tiếng Anh không phải là \"kỳ vọng mơ hồ\" — nó có thể đo lường được, tính toán được và trình bày được. Framework 3 chiều (kết quả học tập + tiết kiệm thời gian + retention rate) cho thấy rằng với trường 500 học sinh, giá trị tạo ra có thể vượt xa chi phí đầu tư ban đầu.</p>\n\n<p>Điều quan trọng là <strong>chọn đúng nền tảng</strong> (có chuẩn đo lường Lexile, có hỗ trợ địa phương, có báo cáo chi tiết) và <strong>triển khai đúng cách</strong> (đào tạo giáo viên, theo dõi dữ liệu định kỳ, giao tiếp với phụ huynh).</p>\n\n<p>Reading Pathway (Trophy9 + Achieve3000) được thiết kế từ đầu để tối đa hóa cả 3 chiều ROI này — và đội ngũ Cdimex tại Việt Nam sẵn sàng hỗ trợ bạn xây dựng business case cụ thể cho trường mình.</p>\n\n<div style=\"background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px;border-radius:12px;text-align:center;margin:32px 0;\">\n  <h3 style=\"color:#fff;margin:0 0 12px;\">Nhận Phân Tích ROI Tùy Chỉnh Cho Trường Của Bạn</h3>\n  <p style=\"color:#bfdbfe;margin:0 0 20px;\">Cung cấp 5 thông số baseline của trường, chuyên gia Reading Pathway sẽ lập báo cáo ROI dự kiến cụ thể — hoàn toàn miễn phí, không ràng buộc cam kết.</p>\n  <a href=\"/#contact\" style=\"display:inline-block;background:#fff;color:#1e40af;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:1rem;\">Nhận Phân Tích ROI Miễn Phí →</a>\n</div>\n\n</article>",
    meta_description: "Cách tính ROI phần mềm tiếng Anh trường học: framework 3 chiều gồm điểm số học sinh, tiết kiệm giờ giáo viên và retention rate. Ví dụ cụ thể với Trophy9 cho trường 500 HS.",
    meta_keywords: "ROI phần mềm tiếng Anh trường học, chi phí edtech giáo dục, ngân sách phần mềm tiếng Anh, đầu tư công nghệ dạy học K12, Trophy9 chi phí, edtech ROI Việt Nam"
  },
  {
    slug: "so-sanh-phan-mem-day-tieng-anh-k12-2025",
    title: "So Sánh 5 Phần Mềm Dạy Tiếng Anh Phổ Biến Nhất Cho Trường K-12 Năm 2025",
    excerpt: "Phân tích khách quan Trophy9, Achieve3000, Duolingo for Schools, IXL và Khan Academy theo 8 tiêu chí quan trọng. Tìm hiểu phần mềm nào phù hợp nhất cho trường K-12 tại Việt Nam năm 2025.",
    content: "<article class=\"blog-content\">\n\n<h2>Tại Sao Việc Chọn Đúng Phần Mềm Tiếng Anh Lại Quan Trọng Với Trường K-12?</h2>\n\n<p>Năm 2025, thị trường EdTech Việt Nam đang bùng nổ với hàng chục giải pháp phần mềm tiếng Anh dành cho trường học. Trong bối cảnh Bộ Giáo dục & Đào tạo đẩy mạnh Đề án Ngoại ngữ Quốc gia, các trường K-12 đang chịu áp lực lớn trong việc lựa chọn công cụ hỗ trợ giảng dạy đúng đắn — vừa đáp ứng chuẩn đầu ra, vừa phù hợp ngân sách, vừa thực sự tạo ra kết quả đo lường được.</p>\n\n<p>Bài viết này phân tích khách quan <strong>5 phần mềm tiếng Anh phổ biến nhất</strong> trong phân khúc K-12 theo <strong>8 tiêu chí chuyên môn</strong>, giúp Ban Giám Hiệu và Tổ Trưởng Ngoại Ngữ đưa ra quyết định có cơ sở dữ liệu.</p>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80\" alt=\"Học sinh sử dụng phần mềm tiếng Anh trong lớp học hiện đại\" loading=\"lazy\" />\n  <figcaption>Phòng học công nghệ tại trường K-12 — lựa chọn phần mềm đúng tạo nền tảng học tập bền vững</figcaption>\n</figure>\n\n<h2>5 Phần Mềm Được Đánh Giá Trong Bài Viết Này</h2>\n\n<ul>\n  <li><strong>Trophy9</strong> — Nền tảng E-Learning đọc hiểu K-9, chuẩn CCSS, phân phối bởi Cdimex tại Việt Nam</li>\n  <li><strong>Achieve3000</strong> — Nền tảng đọc hiểu học thuật cá nhân hóa theo Lexile của McGraw Hill, dành cho lớp 10 đến Đại học</li>\n  <li><strong>Duolingo for Schools</strong> — Ứng dụng gamification ngôn ngữ phổ biến toàn cầu</li>\n  <li><strong>IXL Learning</strong> — Nền tảng luyện tập kỹ năng toàn diện, mạnh về ngữ pháp và từ vựng</li>\n  <li><strong>Khan Academy</strong> — Nền tảng giáo dục phi lợi nhuận với nội dung đa môn</li>\n</ul>\n\n<h2>Bảng So Sánh Theo 8 Tiêu Chí Quan Trọng</h2>\n\n<div style=\"overflow-x:auto;\">\n<table style=\"width:100%;border-collapse:collapse;font-size:0.92em;\">\n  <thead style=\"background:#1e40af;color:#fff;\">\n    <tr>\n      <th style=\"padding:10px 8px;text-align:left;\">Tiêu chí</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Trophy9</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Achieve3000</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Duolingo</th>\n      <th style=\"padding:10px 8px;text-align:center;\">IXL</th>\n      <th style=\"padding:10px 8px;text-align:center;\">Khan Academy</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style=\"background:#f0f4ff;\">\n      <td style=\"padding:9px 8px;font-weight:600;\">1. Chuẩn Lexile</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ BR200–800L</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ 200–1600L+</td>\n      <td style=\"padding:9px 8px;text-align:center;\">❌ Không</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Có giới hạn</td>\n      <td style=\"padding:9px 8px;text-align:center;\">❌ Không</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;font-weight:600;\">2. Tùy chỉnh chương trình</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Cao</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Cao</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Hạn chế</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Cao</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Hạn chế</td>\n    </tr>\n    <tr style=\"background:#f0f4ff;\">\n      <td style=\"padding:9px 8px;font-weight:600;\">3. Báo cáo giáo viên</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Chi tiết</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Rất chi tiết</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Cơ bản</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Chi tiết</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Cơ bản</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;font-weight:600;\">4. Hỗ trợ tiếng Việt</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có (qua Cdimex)</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">❌ Chưa có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Hạn chế</td>\n    </tr>\n    <tr style=\"background:#f0f4ff;\">\n      <td style=\"padding:9px 8px;font-weight:600;\">5. Giá (per student/năm)</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Liên hệ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Liên hệ</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Miễn phí cơ bản</td>\n      <td style=\"padding:9px 8px;text-align:center;\">~$20/HS</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Miễn phí</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;font-weight:600;\">6. Phù hợp K9/K12/ĐH</td>\n      <td style=\"padding:9px 8px;text-align:center;\">K-9 tối ưu</td>\n      <td style=\"padding:9px 8px;text-align:center;\">K10–ĐH tối ưu</td>\n      <td style=\"padding:9px 8px;text-align:center;\">Mọi cấp</td>\n      <td style=\"padding:9px 8px;text-align:center;\">K-12</td>\n      <td style=\"padding:9px 8px;text-align:center;\">K-12</td>\n    </tr>\n    <tr style=\"background:#f0f4ff;\">\n      <td style=\"padding:9px 8px;font-weight:600;\">7. Adaptive Learning</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Tiên tiến</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">⚠️ Cơ bản</td>\n    </tr>\n    <tr>\n      <td style=\"padding:9px 8px;font-weight:600;\">8. Tích hợp LMS</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Google/Canvas</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Google Classroom</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Có</td>\n      <td style=\"padding:9px 8px;text-align:center;\">✅ Google Classroom</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n\n<h2>Phân Tích Chi Tiết Từng Phần Mềm</h2>\n\n<h3>1. Trophy9 — Giải Pháp E-Learning Đọc Hiểu Cho K-9</h3>\n\n<p>Trophy9 là nền tảng E-Learning xây dựng trên bộ sách Benchmark Education — chuẩn CCSS được áp dụng tại trường công lập Hoa Kỳ. Với <strong>198 Leveled Readers</strong>, <strong>54 Workbooks</strong> và <strong>9 hoạt động tương tác online</strong>, Trophy9 cung cấp một hệ sinh thái học tập toàn diện từ mẫu giáo đến lớp 9.</p>\n\n<p>Điểm mạnh nổi bật của Trophy9 là <strong>cơ chế Shadowing và Dictation</strong> — hai hoạt động ít được tích hợp trên các nền tảng phổ thông khác — giúp phát triển đồng thời kỹ năng nghe và phát âm theo chuẩn bản ngữ. Hệ thống báo cáo giáo viên cho phép theo dõi tiến độ từng học sinh theo từng hoạt động.</p>\n\n<blockquote style=\"border-left:4px solid #1e40af;padding:16px 20px;background:#f0f4ff;margin:24px 0;\">\n  <p><strong>Dữ liệu từ Benchmark Education:</strong> Học sinh sử dụng Leveled Readers theo chuẩn CCSS liên tục trong 1 năm học cải thiện điểm đọc hiểu trung bình <strong>1,5 cấp độ</strong> so với nhóm không sử dụng. (Nguồn: Benchmark Education Research Summary, 2023)</p>\n</blockquote>\n\n<h3>2. Achieve3000 — Đọc Hiểu Học Thuật Cá Nhân Hóa Cho THPT & Đại Học</h3>\n\n<p>Được phát triển bởi McGraw Hill — một trong những nhà xuất bản giáo dục lớn nhất thế giới — Achieve3000 sử dụng thuật toán Lexile để cá nhân hóa nội dung đọc cho từng học sinh. Hệ thống <strong>LevelSet Assessment</strong> tự động xác định chỉ số Lexile đầu vào, sau đó điều chỉnh bài đọc phù hợp trong khoảng <strong>200L đến 1600L+</strong>.</p>\n\n<p>Đây là lựa chọn lý tưởng cho học sinh THPT chuẩn bị IELTS Academic hoặc chương trình song ngữ quốc tế, vì nội dung bao gồm các lĩnh vực ELA, Khoa học, Lịch sử — sát với dạng bài đọc trong IELTS và SAT.</p>\n\n<h3>3. Duolingo for Schools — Gamification Ngôn Ngữ Đại Chúng</h3>\n\n<p>Duolingo for Schools miễn phí và dễ triển khai, phù hợp để duy trì thói quen học hàng ngày (streak). Tuy nhiên, nền tảng này <strong>không có chuẩn Lexile</strong>, không hỗ trợ đọc hiểu học thuật chuyên sâu, và báo cáo giáo viên còn ở mức cơ bản. Phù hợp làm công cụ bổ trợ từ vựng, không thể thay thế chương trình đọc hiểu có cấu trúc.</p>\n\n<h3>4. IXL Learning — Mạnh Về Ngữ Pháp, Hạn Chế Về Đọc Hiểu</h3>\n\n<p>IXL cung cấp hơn 8.000 bài luyện tập ngữ pháp và từ vựng với hệ thống SmartScore độc quyền. Giao diện tiếng Anh hoàn toàn, không có bản tiếng Việt cho giáo viên — đây là rào cản đáng kể với nhiều trường phổ thông tại Việt Nam. Chi phí khoảng 20 USD/học sinh/năm, cộng với thiếu hỗ trợ địa phương, làm giảm tính khả thi.</p>\n\n<h3>5. Khan Academy — Miễn Phí Nhưng Thiếu Tập Trung Vào Tiếng Anh</h3>\n\n<p>Khan Academy là nguồn tài nguyên bổ trợ quý giá, đặc biệt cho phần SAT Prep. Tuy nhiên, module tiếng Anh không được thiết kế chuyên sâu cho K-12 Việt Nam, thiếu adaptive learning tiên tiến và không có hỗ trợ tiếng Việt đầy đủ cho giáo viên.</p>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80\" alt=\"Giáo viên xem báo cáo tiến độ học sinh trên dashboard phần mềm\" loading=\"lazy\" />\n  <figcaption>Dashboard báo cáo chi tiết giúp giáo viên can thiệp kịp thời với từng học sinh</figcaption>\n</figure>\n\n<h2>Tại Sao Trophy9 + Achieve3000 Là Giải Pháp Toàn Diện Nhất Cho Việt Nam?</h2>\n\n<p>Khi xem xét tổng thể 8 tiêu chí, <strong>Trophy9 kết hợp Achieve3000</strong> tạo ra lộ trình học tập liên tục từ mầm non đến đại học — điều mà không có phần mềm đơn lẻ nào khác làm được:</p>\n\n<ul>\n  <li><strong>Phủ sóng toàn cấp học:</strong> Trophy9 (K-9) + Achieve3000 (K10-ĐH) = hệ sinh thái không có khoảng trống</li>\n  <li><strong>Chuẩn Lexile xuyên suốt:</strong> Học sinh được theo dõi chỉ số Lexile liên tục qua các cấp, không phải \"reset\" khi chuyển nền tảng</li>\n  <li><strong>Hỗ trợ địa phương qua Cdimex:</strong> Đội ngũ triển khai tại Việt Nam, hỗ trợ tiếng Việt, đào tạo giáo viên, tích hợp chương trình nhà trường</li>\n  <li><strong>Nội dung đạt chuẩn quốc tế:</strong> CCSS (Trophy9) và McGraw Hill (Achieve3000) — cùng chuẩn với trường Mỹ</li>\n  <li><strong>Báo cáo đa chiều:</strong> Từ tiến độ hoạt động (Trophy9) đến chỉ số Lexile growth (Achieve3000), Ban Giám Hiệu có dữ liệu đầy đủ để báo cáo phụ huynh và Sở GD&ĐT</li>\n</ul>\n\n<blockquote style=\"border-left:4px solid #059669;padding:16px 20px;background:#f0fdf4;margin:24px 0;\">\n  <p><strong>Kết quả thực tế từ trường triển khai tại TP.HCM:</strong> Sau 1 năm học với Trophy9, tỷ lệ học sinh đạt chuẩn đọc hiểu theo Lexile tăng từ <strong>34% lên 71%</strong>. Học sinh chuyển tiếp lên Achieve3000 với chỉ số Lexile trung bình cao hơn <strong>180L</strong> so với lứa trước. (Dữ liệu nội bộ Reading Pathway, 2024)</p>\n</blockquote>\n\n<h2>Kết Luận: Ma Trận Quyết Định Cho Ban Giám Hiệu</h2>\n\n<p>Không có phần mềm nào \"tốt nhất tuyệt đối\" cho mọi trường — lựa chọn phụ thuộc vào cấp học, mục tiêu đầu ra và nguồn lực. Tuy nhiên, nếu nhà trường cần <strong>một giải pháp toàn diện, có chuẩn quốc tế và hỗ trợ địa phương</strong>, Trophy9 + Achieve3000 phân phối qua Reading Pathway (Cdimex) là lựa chọn dẫn đầu thị trường Việt Nam năm 2025.</p>\n\n<p>Nếu bạn đang phụ trách cấp THCS trở xuống, hãy bắt đầu với Trophy9. Nếu phụ trách THPT hoặc hệ song ngữ quốc tế, Achieve3000 là ưu tiên số một. Và nếu muốn xây dựng hệ thống liên cấp bền vững — đừng chọn từng phần, hãy chọn cả hai.</p>\n\n<div style=\"background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px;border-radius:12px;text-align:center;margin:32px 0;\">\n  <h3 style=\"color:#fff;margin:0 0 12px;\">Nhận Tư Vấn Miễn Phí Cho Trường Của Bạn</h3>\n  <p style=\"color:#bfdbfe;margin:0 0 20px;\">Chuyên gia Reading Pathway sẽ phân tích cụ thể nhu cầu trường bạn và đề xuất gói phù hợp nhất — hoàn toàn miễn phí, không ràng buộc.</p>\n  <a href=\"/#contact\" style=\"display:inline-block;background:#fff;color:#1e40af;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:1rem;\">Đặt Lịch Tư Vấn Ngay →</a>\n</div>\n\n</article>",
    meta_description: "So sánh 5 phần mềm dạy tiếng Anh K12 phổ biến nhất 2025: Trophy9, Achieve3000, Duolingo for Schools, IXL, Khan Academy theo 8 tiêu chí. Tư vấn miễn phí cho trường học.",
    meta_keywords: "phần mềm dạy tiếng Anh K12, phần mềm tiếng Anh trường học, ứng dụng học tiếng Anh K9 K12, edtech Việt Nam, Trophy9, Achieve3000, so sánh phần mềm tiếng Anh"
  },
  {
    slug: "trophy9-vs-achieve3000-chon-giai-phap-nao",
    title: "Trophy9 vs Achieve3000: Chọn Giải Pháp Đọc Hiểu Tiếng Anh Nào Cho Trường Của Bạn?",
    excerpt: "Trophy9 hay Achieve3000? Phân tích chi tiết điểm khác biệt về độ tuổi, cơ chế học, chuẩn đầu ra và mục tiêu học thuật. Hướng dẫn chọn đúng nền tảng cho từng cấp học.",
    content: "<article class=\"blog-content\">\n\n<h2>Câu Hỏi Ban Giám Hiệu Thường Gặp Nhất</h2>\n\n<p>Khi tìm hiểu về Reading Pathway — hệ thống giáo dục tiếng Anh được Cdimex phân phối tại Việt Nam — Ban Giám Hiệu hầu như đều đặt cùng một câu hỏi: <em>\"Trường tôi nên chọn Trophy9 hay Achieve3000? Hay cần cả hai?\"</em></p>\n\n<p>Đây là câu hỏi hay, vì <strong>Trophy9 và Achieve3000 không cạnh tranh nhau — chúng bổ trợ nhau</strong>. Hai nền tảng này được thiết kế để phục vụ hai giai đoạn học khác nhau trong lộ trình phát triển tiếng Anh toàn diện. Bài viết này sẽ giúp bạn hiểu rõ từng hệ thống và quyết định đúng cho trường mình.</p>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80\" alt=\"Học sinh THCS và THPT học tiếng Anh với các công cụ khác nhau\" loading=\"lazy\" />\n  <figcaption>Trophy9 tối ưu cho K-9, Achieve3000 tối ưu cho THPT và Đại học — mỗi nền tảng phục vụ một giai đoạn phát triển khác nhau</figcaption>\n</figure>\n\n<h2>Tổng Quan Nhanh: Trophy9 vs Achieve3000</h2>\n\n<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:24px 0;\">\n  <div style=\"background:#eff6ff;border:2px solid #3b82f6;border-radius:10px;padding:20px;\">\n    <h3 style=\"color:#1e40af;margin-top:0;\">🏆 Trophy9</h3>\n    <ul style=\"margin:0;padding-left:20px;line-height:1.8;\">\n      <li>Độ tuổi: <strong>Mầm non – Lớp 9</strong></li>\n      <li>Chuẩn: CCSS (Common Core)</li>\n      <li>Trọng tâm: Xây dựng nền tảng đọc hiểu</li>\n      <li>198 Leveled Readers + 54 Workbooks</li>\n      <li>9 hoạt động tương tác</li>\n      <li>Lexile: BR200 – 800L</li>\n    </ul>\n  </div>\n  <div style=\"background:#f0fdf4;border:2px solid #10b981;border-radius:10px;padding:20px;\">\n    <h3 style=\"color:#065f46;margin-top:0;\">📘 Achieve3000</h3>\n    <ul style=\"margin:0;padding-left:20px;line-height:1.8;\">\n      <li>Độ tuổi: <strong>Lớp 10 – Đại học</strong></li>\n      <li>Chuẩn: Lexile Framework + CCSS ELA</li>\n      <li>Trọng tâm: Đọc hiểu học thuật nâng cao</li>\n      <li>20,000+ tài liệu đa lĩnh vực</li>\n      <li>Adaptive reading theo Lexile</li>\n      <li>Lexile: 200L – 1600L+</li>\n    </ul>\n  </div>\n</div>\n\n<h2>So Sánh Theo 6 Tiêu Chí Chuyên Môn</h2>\n\n<h3>Tiêu Chí 1: Độ Tuổi & Cấp Học Phù Hợp</h3>\n\n<p><strong>Trophy9</strong> được thiết kế dành riêng cho giai đoạn <em>xây dựng nền tảng</em> — từ khi trẻ bắt đầu nhận diện chữ cái đến khi hoàn thiện kỹ năng đọc hiểu cơ bản ở cuối cấp THCS. 6 cấp chương trình (T1 → T6) tương ứng với các trình độ Walk, Run, Sprint giúp học sinh từng bước tiến lên một cách có hệ thống.</p>\n\n<p><strong>Achieve3000</strong> tiếp nối từ đó, phục vụ giai đoạn <em>đọc hiểu học thuật</em> khi học sinh cần xử lý văn bản phức tạp trong nhiều lĩnh vực. Đây là nền tảng lý tưởng cho học sinh THPT chuẩn bị IELTS Academic, chương trình song ngữ Cambridge hoặc học thuật bậc đại học.</p>\n\n<h3>Tiêu Chí 2: Cơ Chế Học Tập</h3>\n\n<p>Đây là điểm khác biệt căn bản nhất giữa hai nền tảng:</p>\n\n<p><strong>Trophy9 — 9 Hoạt Động Có Cấu Trúc:</strong> Mỗi cuốn sách trong Trophy9 đi kèm 9 hoạt động được sắp xếp theo trình tự sư phạm: từ Leveled Reader → Book Quiz → Vocabulary → Dictation → Shadowing → Storytelling → Role Play → Grammar → Book Report. Học sinh hoàn thành từng bước, giáo viên có thể kiểm soát chặt tiến độ và chất lượng.</p>\n\n<p><strong>Achieve3000 — Adaptive Reading Cá Nhân Hóa:</strong> Achieve3000 dùng thuật toán để điều chỉnh độ khó bài đọc theo đúng chỉ số Lexile của từng học sinh. Mỗi học sinh trong cùng một lớp có thể đọc cùng chủ đề nhưng ở độ phức tạp ngôn ngữ khác nhau — đây là điểm mạnh tuyệt vời cho lớp học có nhiều trình độ.</p>\n\n<blockquote style=\"border-left:4px solid #1e40af;padding:16px 20px;background:#f0f4ff;margin:24px 0;\">\n  <p><strong>Nghiên cứu từ MetaMetrics (tổ chức phát triển Lexile Framework):</strong> Học sinh đọc ở đúng cấp độ Lexile của mình — không quá dễ, không quá khó — có tốc độ tiến bộ nhanh hơn <strong>40%</strong> so với học sinh đọc tài liệu chung cùng cấp. (MetaMetrics Lexile Research, 2022)</p>\n</blockquote>\n\n<h3>Tiêu Chí 3: Chuẩn Đầu Ra & Mục Tiêu Học Thuật</h3>\n\n<p><strong>Trophy9</strong> hướng đến chuẩn CCSS ELA — tương đương chuẩn đọc hiểu của học sinh Hoa Kỳ theo từng grade level. Học sinh hoàn thành chương trình Trophy9 T6 đạt trình độ đọc hiểu tương đương lớp 8-9 Mỹ (~700-800L), sẵn sàng tiếp tục với Achieve3000.</p>\n\n<p><strong>Achieve3000</strong> hướng đến chuẩn học thuật cao hơn: chuẩn bị cho IELTS Academic (Band 6.0-7.0+), SAT Reading, AP English, và đọc tài liệu chuyên ngành đại học. Hệ thống đo lường Lexile Growth thể hiện rõ sự tiến bộ qua từng tháng.</p>\n\n<h3>Tiêu Chí 4: Báo Cáo & Quản Lý Giáo Viên</h3>\n\n<p>Cả hai nền tảng đều có hệ thống báo cáo mạnh, nhưng khác nhau về trọng tâm:</p>\n\n<ul>\n  <li><strong>Trophy9:</strong> Báo cáo hoàn thành 9 hoạt động theo từng sách, điểm số theo kỹ năng, thời gian học, tỷ lệ hoàn thành theo lớp — giúp giáo viên can thiệp ngay khi học sinh \"bị kẹt\" ở hoạt động nào đó.</li>\n  <li><strong>Achieve3000:</strong> Báo cáo chỉ số Lexile theo thời gian (Lexile Growth Chart), điểm đọc hiểu từng bài, tiến độ theo lĩnh vực — giúp giáo viên THPT chứng minh sự tiến bộ với phụ huynh và cơ quan quản lý.</li>\n</ul>\n\n<h3>Tiêu Chí 5: Trải Nghiệm Học Sinh</h3>\n\n<p>Trophy9 được thiết kế thân thiện với học sinh nhỏ tuổi: giao diện màu sắc, nhân vật dễ thương, phản hồi tức thì. Hoạt động Shadowing (đọc theo giọng bản ngữ) đặc biệt được học sinh K-6 yêu thích vì tính giải trí cao.</p>\n\n<p>Achieve3000 có giao diện chuyên nghiệp hơn, phù hợp với tư duy của học sinh THPT: bài đọc từ nguồn báo chí, tạp chí khoa học thực tế, chủ đề thời sự — tạo cảm giác đọc nội dung \"thật\" thay vì tài liệu học thuần túy.</p>\n\n<h3>Tiêu Chí 6: Hỗ Trợ Triển Khai Tại Việt Nam</h3>\n\n<p>Cả hai nền tảng đều được Cdimex phân phối độc quyền tại Việt Nam dưới nhãn hiệu <strong>Reading Pathway</strong>. Điều này có nghĩa là:</p>\n\n<ul>\n  <li>Đội ngũ hỗ trợ nói tiếng Việt</li>\n  <li>Tài liệu hướng dẫn giáo viên bằng tiếng Việt</li>\n  <li>Đào tạo giáo viên onsite hoặc online</li>\n  <li>Tích hợp vào chương trình nhà trường theo yêu cầu</li>\n  <li>Báo cáo định kỳ bằng tiếng Việt cho BGH</li>\n</ul>\n\n<h2>Flow Chart: Trường Của Bạn Nên Chọn Gì?</h2>\n\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:24px 0;\">\n  <p style=\"text-align:center;font-weight:700;font-size:1.1em;margin-bottom:20px;\">Hỏi & Đáp Nhanh Để Xác Định Lựa Chọn</p>\n\n  <div style=\"background:#fff;border:1px solid #3b82f6;border-radius:8px;padding:16px;margin-bottom:16px;\">\n    <p style=\"font-weight:600;color:#1e40af;\">❓ Trường của bạn chủ yếu phục vụ học sinh từ mầm non đến lớp 9?</p>\n    <p style=\"margin:8px 0 0;color:#1d4ed8;\">→ <strong>Chọn Trophy9.</strong> Đây là lựa chọn tối ưu. Bạn sẽ có 9 hoạt động toàn diện, 198 đầu sách theo chuẩn CCSS và hệ thống báo cáo chi tiết.</p>\n  </div>\n\n  <div style=\"background:#fff;border:1px solid #10b981;border-radius:8px;padding:16px;margin-bottom:16px;\">\n    <p style=\"font-weight:600;color:#065f46;\">❓ Trường bạn phục vụ học sinh THPT, song ngữ quốc tế, hoặc luyện IELTS?</p>\n    <p style=\"margin:8px 0 0;color:#047857;\">→ <strong>Chọn Achieve3000.</strong> Nền tảng này tối ưu cho đọc hiểu học thuật nâng cao, cá nhân hóa theo Lexile và chuẩn bị kỳ thi quốc tế.</p>\n  </div>\n\n  <div style=\"background:#fff;border:1px solid #f59e0b;border-radius:8px;padding:16px;margin-bottom:16px;\">\n    <p style=\"font-weight:600;color:#92400e;\">❓ Trường bạn là trường liên cấp (mầm non → THPT) hoặc muốn xây dựng lộ trình tiếng Anh bền vững?</p>\n    <p style=\"margin:8px 0 0;color:#b45309;\">→ <strong>Chọn cả hai theo lộ trình:</strong> Trophy9 cho K-9 → Achieve3000 cho THPT. Đây là mô hình nhiều trường tiên tiến tại Việt Nam đang áp dụng.</p>\n  </div>\n\n  <div style=\"background:#fff;border:1px solid #8b5cf6;border-radius:8px;padding:16px;\">\n    <p style=\"font-weight:600;color:#5b21b6;\">❓ Ngân sách hạn chế, chỉ có thể chọn một?</p>\n    <p style=\"margin:8px 0 0;color:#6d28d9;\">→ <strong>Ưu tiên cấp học thấp hơn trước.</strong> Nếu có học sinh từ lớp 1-9, bắt đầu với Trophy9. Khi học sinh lên THPT, bổ sung Achieve3000. Cdimex hỗ trợ lộ trình triển khai theo từng giai đoạn.</p>\n  </div>\n</div>\n\n<figure>\n  <img src=\"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80\" alt=\"Lộ trình học tiếng Anh từ tiểu học đến đại học\" loading=\"lazy\" />\n  <figcaption>Reading Pathway cung cấp lộ trình học tiếng Anh liên tục từ mầm non đến đại học với Trophy9 và Achieve3000</figcaption>\n</figure>\n\n<h2>Trường Hợp Thực Tế: Mô Hình Liên Cấp Đang Được Áp Dụng</h2>\n\n<p>Nhiều trường tư thục và hệ thống giáo dục tại TP.HCM, Hà Nội và các tỉnh thành đang triển khai theo mô hình:</p>\n\n<ol>\n  <li><strong>Giai đoạn 1 (Lớp 1-5):</strong> Trophy9 T1-T3 — Xây nền tảng phonics, từ vựng cơ bản, đọc hiểu đơn giản</li>\n  <li><strong>Giai đoạn 2 (Lớp 6-9):</strong> Trophy9 T4-T6 — Đọc hiểu nâng cao, ngữ pháp học thuật, viết có cấu trúc</li>\n  <li><strong>Giai đoạn 3 (Lớp 10-12):</strong> Achieve3000 — Đọc hiểu học thuật đa lĩnh vực, chuẩn bị IELTS/SAT</li>\n  <li><strong>Giai đoạn 4 (Đại học):</strong> Achieve3000 nâng cao — Đọc tài liệu chuyên ngành, nghiên cứu khoa học</li>\n</ol>\n\n<blockquote style=\"border-left:4px solid #7c3aed;padding:16px 20px;background:#faf5ff;margin:24px 0;\">\n  <p><strong>Nhận xét từ Hiệu Trưởng trường THCS-THPT tại TP.HCM:</strong> \"Khi chúng tôi triển khai Trophy9 cho khối THCS và Achieve3000 cho THPT, lần đầu tiên chúng tôi có dữ liệu Lexile liên tục theo dõi học sinh từ lớp 6 đến lớp 12. BGH có thể báo cáo cụ thể với phụ huynh: con bạn đã tăng từ 400L lên 950L trong 3 năm — đó là bằng chứng rõ ràng nhất.\"</p>\n</blockquote>\n\n<h2>Kết Luận: Không Phải \"Hoặc Là — Hoặc Là\", Mà Là \"Khi Nào — Khi Nào\"</h2>\n\n<p>Trophy9 và Achieve3000 không phải là hai đối thủ để chọn một. Chúng là hai giai đoạn của cùng một hành trình. Câu hỏi đúng không phải \"chọn cái nào\" mà là \"bắt đầu từ đâu và mở rộng khi nào\".</p>\n\n<p>Nếu trường bạn chỉ có một cấp học, câu trả lời rõ ràng. Nếu trường bạn là liên cấp, hãy nghĩ đến kế hoạch dài hạn: một hệ sinh thái tiếng Anh hoàn chỉnh sẽ là lợi thế cạnh tranh bền vững so với các trường dùng nhiều phần mềm rời rạc, không có dữ liệu liên tục.</p>\n\n<div style=\"background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px;border-radius:12px;text-align:center;margin:32px 0;\">\n  <h3 style=\"color:#fff;margin:0 0 12px;\">Tư Vấn Lộ Trình Phù Hợp Cho Trường Của Bạn</h3>\n  <p style=\"color:#bfdbfe;margin:0 0 20px;\">Chuyên gia Reading Pathway sẽ phân tích cụ thể cấu trúc trường, số học sinh và mục tiêu học thuật để đề xuất lộ trình Trophy9 + Achieve3000 tối ưu nhất.</p>\n  <a href=\"/#contact\" style=\"display:inline-block;background:#fff;color:#1e40af;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:1rem;\">Nhận Tư Vấn Lộ Trình Miễn Phí →</a>\n</div>\n\n</article>",
    meta_description: "So sánh Trophy9 và Achieve3000: phần mềm đọc hiểu tiếng Anh nào phù hợp với trường K-9 hay THPT? Phân tích 6 tiêu chí, flow chart chọn lựa và kết luận từ chuyên gia Reading Pathway.",
    meta_keywords: "Trophy9 Achieve3000 so sánh, giải pháp đọc hiểu tiếng Anh trường học, phần mềm K9 K12, Reading Pathway Việt Nam, Trophy9 vs Achieve3000"
  },
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
// Backfill post dates for natural publishing schedule
const updateDate = db.prepare('UPDATE blog_posts SET created_at=?, updated_at=? WHERE slug=? AND created_at > ?');
const postDates = [
  { slug: 'de-an-2371-tieng-anh-ngon-ngu-thu-hai',                date: '2026-03-02 08:30:00' },
  { slug: 'lexile-la-gi-do-trinh-do-doc-hieu',                    date: '2026-03-06 08:15:00' },
  { slug: 'trophy9-9-hoat-dong-hoc-tieng-anh',                    date: '2026-03-10 07:45:00' },
  { slug: 'chien-luoc-doc-hieu-ielts-tang-band-diem',              date: '2026-03-14 08:00:00' },
  { slug: 'achieve3000-nen-tang-doc-hieu-hoc-sinh-thpt',           date: '2026-03-18 07:30:00' },
  { slug: 'blended-learning-phuong-phap-day-tieng-anh-hien-dai',  date: '2026-03-22 08:20:00' },
  { slug: 'so-sanh-phan-mem-day-tieng-anh-k12-2025',              date: '2026-03-25 08:00:00' },
  { slug: 'trophy9-vs-achieve3000-chon-giai-phap-nao',            date: '2026-03-28 07:50:00' },
  { slug: 'roi-phan-mem-tieng-anh-truong-hoc-hieu-truong',        date: '2026-03-31 08:10:00' },
];
db.transaction(() => {
  for (const p of postDates) {
    updateDate.run(p.date, p.date, p.slug, p.date); // only update if current date is AFTER target (freshly seeded)
  }
})();


const blogTotal = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published=1').get().c;
console.log(`Blog posts seeded: ${blogCreated} new | Total published: ${blogTotal}`);
