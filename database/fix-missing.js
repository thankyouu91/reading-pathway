const db = require('./db');
const insert = db.prepare('INSERT OR IGNORE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES (?, ?, ?, ?, ?, ?)');

let o = 500;
const tx = db.transaction(() => {
  // LEVELS
  const lv = [
    ['tag','Giáo Trình Trophy9'],['heading','Chinh Phục 54 Bước Với 6 Cấp Độ'],
    ['description','198 Readers + 54 Workbooks | Sách Benchmark Education được giáo dục công lập Hoa Kỳ tin chọn'],
    ['group_1_label','LEVEL KHỞI ĐỘNG'],['group_1_name','TROPHY9 WALK'],
    ['t1_title','Walk - Cơ Bản'],['t1_desc','Ôn lại từ vựng và quy tắc phát âm cơ bản, hiểu nội dung câu chuyện đơn giản. Làm quen mẫu câu lặp đi lặp lại, xây dựng nền tảng vững chắc.'],
    ['t2_title','Walk - Phát Triển'],['t2_desc','Trẻ bắt đầu hứng thú với việc đọc, tự đọc từ và câu lặp đi lặp lại. Thực hành Speaking và Writing sơ cấp, Retelling và Think Aloud.'],
    ['group_2_label','LEVEL VƯỢT ẢI'],['group_2_name','TROPHY9 RUN'],
    ['t3_title','Run - Đọc Hiểu'],['t3_desc','Câu hỏi Close Reading giúp trẻ hiểu sâu nội dung. Phát triển khả năng diễn đạt và tóm tắt bằng văn bản. Luyện Collaborative Conversation.'],
    ['t4_title','Run - Giao Tiếp'],['t4_desc','Nâng cao hiểu biết thông qua bài đọc đa dạng chủ đề. Presentation dựa trên nội dung, vận dụng Graphic Organizer để tóm tắt điểm chính.'],
    ['group_3_label','LEVEL TĂNG TỐC'],['group_3_name','TROPHY9 SPRINT'],
    ['t5_title','Sprint - Phản Biện'],['t5_desc','Luyện hiểu văn bản dài phức tạp. Thực hành Speaking và Writing chuyên sâu chuẩn bị cho kỳ thi chứng chỉ. Nói tự nhiên dựa trên đọc hiểu.'],
    ['t6_title','Sprint - Nâng Cao'],['t6_desc','Hiểu sâu các chủ đề phi hư cấu, bày tỏ ý kiến. Phát triển tư duy logic, nói trôi chảy. Ngữ pháp nâng cao, Speaking và Writing trình độ cao.']
  ];
  lv.forEach(([k,v]) => insert.run('vi','levels',k,v,'text',o++));

  // PATHWAY
  const pw = [
    ['tag','Lộ Trình Học'],['heading','Khung Chương Trình Từ Mầm Non Đến Đại Học'],
    ['description','Lộ trình học tập liên tục, không gián đoạn - mỗi giai đoạn là nền tảng cho giai đoạn tiếp theo'],
    ['stage_1_title','Mầm Non (3-6 tuổi)'],['stage_1_platform','Trophy9 WALK - T1 (Giai đoạn 1-9)'],
    ['stage_1_lexile','BR (Beginning Reader)'],['stage_1_cefr','Pre-A1'],['stage_1_skills','Phonics, Listening'],
    ['stage_2_title','Tiểu Học (6-11 tuổi)'],['stage_2_platform','Trophy9 WALK-RUN - T2, T3 (Giai đoạn 10-27)'],
    ['stage_2_lexile','200L - 700L'],['stage_2_cefr','A1 - A2'],['stage_2_skills','Reading, Writing, Grammar'],
    ['stage_3_title','Trung Học Cơ Sở (11-15 tuổi)'],['stage_3_platform','Trophy9 RUN-SPRINT - T4, T5, T6 (Giai đoạn 28-54)'],
    ['stage_3_lexile','700L - 1000L'],['stage_3_cefr','A2 - B1'],['stage_3_ielts','Pre-IELTS (3.0-4.5)'],
    ['bridge_title','Chuyển Tiếp Nền Tảng'],['bridge_desc','Từ Trophy9 sang Achieve3000 - Đánh giá LevelSet để xác định Lexile chính xác'],
    ['stage_4_title','Trung Học Phổ Thông (15-18 tuổi)'],['stage_4_platform','Achieve3000 - Empower3000'],
    ['stage_4_lexile','1000L - 1300L'],['stage_4_cefr','B1 - B2'],['stage_4_ielts','5.0 - 6.5'],
    ['stage_5_title','Đại Học (18+ tuổi)'],['stage_5_platform','Achieve3000 - Spark3000'],
    ['stage_5_lexile','1300L+'],['stage_5_cefr','B2 - C1'],['stage_5_ielts','6.5 - 8.0+']
  ];
  pw.forEach(([k,v]) => insert.run('vi','pathway',k,v,'text',o++));

  // Pathway goals (list type)
  const goals = [
    ['stage_1_goals', JSON.stringify(['Làm quen âm thanh tiếng Anh (Phonics Awareness)','Nhận biết chữ cái, âm ghép cơ bản','Từ vựng cơ bản qua hình ảnh & bài hát','Nghe hiểu câu đơn giản, mẫu câu lặp lại'])],
    ['stage_2_goals', JSON.stringify(['Đọc hiểu đoạn văn ngắn (Fiction & Non-fiction)','Xây dựng từ vựng 1,000-2,500 từ','Ngữ pháp cơ bản: thì, cấu trúc câu','Close Reading, Retelling, Think Aloud','Viết câu và đoạn văn đơn giản'])],
    ['stage_3_goals', JSON.stringify(['Đọc hiểu bài báo, truyện ngắn, văn bản khoa học','Phân tích ý chính, tư duy phản biện','Presentation, Graphic Organizer','Speaking & Writing chuyên sâu','Bắt đầu rèn kỹ năng Pre-IELTS'])],
    ['stage_4_goals', JSON.stringify(['Đọc hiểu văn bản học thuật đa lĩnh vực','Phân tích, đánh giá, so sánh văn bản','Từ vựng học thuật 5,000-8,000 từ','Viết bài luận phân tích & nghị luận','Luyện IELTS Reading & Writing (5.0-6.5)'])],
    ['stage_5_goals', JSON.stringify(['Đọc hiểu tài liệu nghiên cứu, báo khoa học','Tư duy phản biện và đọc hiểu chiều sâu','Từ vựng chuyên ngành 8,000+ từ','Viết bài nghiên cứu học thuật','IELTS Academic 6.5 - 8.0+'])]
  ];
  goals.forEach(([k,v]) => insert.run('vi','pathway',k,v,'list',o++));

  // ACHIEVE3000
  const ac = [
    ['heading','Đọc Hiểu Học Thuật & IELTS'],
    ['description','Nền tảng đọc hiểu cá nhân hóa hàng đầu thế giới, sử dụng chỉ số Lexile để đo lường và nâng cao trình độ'],
    ['lexile_heading','Cá Nhân Hóa 12 Cấp Độ'],
    ['lexile_description','Mỗi học sinh nhận nội dung điều chỉnh theo đúng trình độ Lexile của mình. Bài đọc tự động thích ứng, giúp học sinh luôn được thách thức vừa đủ để phát triển.'],
    ['feature_1_title','Nội Dung Đa Lĩnh Vực'],['feature_1_desc','ELA, Khoa Học, Xã Hội Học - xây dựng kiến thức nền rộng'],
    ['feature_2_title','Theo Dõi Tiến Bộ'],['feature_2_desc','Dashboard trực quan cho giáo viên và phụ huynh theo dõi sự tiến bộ'],
    ['feature_3_title','LevelSet Assessment'],['feature_3_desc','Đánh giá đầu vào và liên tục để đo lường trình độ đọc hiểu chính xác'],
    ['feature_4_title','Career Center'],['feature_4_desc','Khám phá sở thích, mục tiêu nghề nghiệp qua nội dung đọc hiểu']
  ];
  ac.forEach(([k,v]) => insert.run('vi','achieve3000',k,v,'text',o++));

  // IELTS
  const ie = [
    ['tag','Pre-IELTS & IELTS'],['heading','Lộ Trình Luyện IELTS Qua Đọc Hiểu'],
    ['description','Xây dựng nền tảng đọc hiểu vững chắc - con đường tự nhiên đến điểm IELTS cao'],
    ['stage_1_score','3.0-4.0'],['stage_1_name','Pre-IELTS Foundation'],
    ['stage_1_desc','Trophy9 T4-T5 (RUN): Đọc hiểu câu hỏi cơ bản, làm quen dạng bài IELTS Reading đơn giản. Từ vựng 2,000-3,000 từ.'],
    ['stage_2_score','4.5-5.5'],['stage_2_name','Pre-IELTS Intermediate'],
    ['stage_2_desc','Trophy9 T5-T6 (SPRINT) & Achieve3000: Luyện dạng bài True/False/Not Given, Matching, Short Answer. Đọc hiểu văn bản dài hơn.'],
    ['stage_3_score','5.5-6.5'],['stage_3_name','IELTS Standard'],
    ['stage_3_desc','Achieve3000 Empower3000: Đọc hiểu văn bản học thuật phức tạp. Phân tích cấu trúc, lập luận. Từ vựng học thuật 5,000-7,000 từ.'],
    ['stage_4_score','6.5-8.0+'],['stage_4_name','IELTS Advanced'],
    ['stage_4_desc','Achieve3000 Spark3000: Đọc hiểu nghiên cứu học thuật, phản biện thông tin. Sẵn sàng cho IELTS Academic và học Đại Học quốc tế.']
  ];
  ie.forEach(([k,v]) => insert.run('vi','ielts',k,v,'text',o++));

  // IELTS skills (list)
  const isk = [
    ['stage_1_skills', JSON.stringify(['Skimming','Scanning','Từ Vựng Cơ Bản'])],
    ['stage_2_skills', JSON.stringify(['T/F/NG','Matching','Paraphrasing'])],
    ['stage_3_skills', JSON.stringify(['Academic Reading','Summary','Critical Analysis'])],
    ['stage_4_skills', JSON.stringify(['Research Reading','Critical Thinking','Academic Writing'])]
  ];
  isk.forEach(([k,v]) => insert.run('vi','ielts',k,v,'list',o++));

  // COMPARISON
  const cp = [
    ['tag','So Sánh'],['heading','Trophy9 vs Achieve3000'],
    ['description','Hai nền tảng bổ sung cho nhau, tạo lộ trình học tập liên tục'],
    ['row_1_label','Đối Tượng'],['row_1_trophy','Mẫu Giáo - THCS (3-15 tuổi)'],['row_1_achieve','THPT - Đại Học (15+ tuổi)'],
    ['row_2_label','Phương Pháp'],['row_2_trophy','Phonics + Đọc Hiểu + 9 Hoạt Động'],['row_2_achieve','Đọc Hiểu Cá Nhân Hóa (Lexile)'],
    ['row_3_label','Nội Dung'],['row_3_trophy','198 Readers + 54 Workbooks, 6 cấp'],['row_3_achieve','Bài đọc đa lĩnh vực, 12 cấp độ'],
    ['row_4_label','Chuẩn'],['row_4_trophy','US Common Core (CCSS)'],['row_4_achieve','Lexile Framework'],
    ['row_5_label','IELTS'],['row_5_trophy','Pre-IELTS (3.0-4.5)'],['row_5_achieve','IELTS 5.0-8.0+'],
    ['row_6_label','Điểm Mạnh'],['row_6_trophy','Nền tảng ngôn ngữ vững chắc'],['row_6_achieve','Đọc hiểu học thuật chiều sâu']
  ];
  cp.forEach(([k,v]) => insert.run('vi','comparison',k,v,'text',o++));

  // NAV - add proper menu labels
  insert.run('vi','nav','menu_program','Chương Trình','text',o++);
  insert.run('vi','nav','menu_pathway','Lộ Trình','text',o++);
  insert.run('vi','nav','menu_schools','Trường Học','text',o++);
});

tx();
const cnt = db.prepare('SELECT COUNT(*) as c FROM content WHERE lang=?').get('vi').c;
const secs = db.prepare('SELECT DISTINCT section FROM content WHERE lang=?').all('vi').map(r=>r.section);
console.log('Total VI rows:', cnt);
console.log('Sections:', secs.join(', '));
