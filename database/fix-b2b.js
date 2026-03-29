const db = require('./db');
const insert = db.prepare('INSERT OR IGNORE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES (?, ?, ?, ?, ?, ?)');

let o = 700;
const tx = db.transaction(() => {
  // B2B Cards
  insert.run('vi','b2b','card_1_title','Lesson Plan Ready','text',o++);
  insert.run('vi','b2b','card_1_desc','Giáo án chi tiết cho từng bài học, từng tuần, từng tháng. Giáo viên chỉ cần follow theo hệ thống - tiết kiệm 70% thời gian soạn bài.','text',o++);
  insert.run('vi','b2b','card_1_features',JSON.stringify(['Giáo án 36 tuần/năm học','Hướng dẫn giảng dạy từng tiết','Tài liệu bổ trợ sẵn có']),'list',o++);

  insert.run('vi','b2b','card_2_title','Kiểm Tra Theo Module','text',o++);
  insert.run('vi','b2b','card_2_desc','Hệ thống đánh giá đa tầng: kiểm tra đầu vào, theo module, giữa kỳ, cuối kỳ. Tự động chấm điểm và phân loại trình độ.','text',o++);
  insert.run('vi','b2b','card_2_features',JSON.stringify(['Placement Test tự động','Quiz sau mỗi module','Thi giữa kỳ & cuối kỳ']),'list',o++);

  insert.run('vi','b2b','card_3_title','Tracking Chỉ Số Realtime','text',o++);
  insert.run('vi','b2b','card_3_desc','Dashboard theo dõi tiến bộ từng học sinh, từng lớp, từng cấp. Báo cáo Lexile growth, completion rate, điểm trung bình theo thời gian.','text',o++);
  insert.run('vi','b2b','card_3_features',JSON.stringify(['Dashboard giáo viên & quản lý','Lexile Growth Report','Báo cáo cho phụ huynh']),'list',o++);

  insert.run('vi','b2b','card_4_title','Dễ Triển Khai','text',o++);
  insert.run('vi','b2b','card_4_desc','Đào tạo giáo viên nhanh, tích hợp vào chương trình hiện tại. Hỗ trợ kỹ thuật và đào tạo liên tục từ đội ngũ Trophy Learning.','text',o++);
  insert.run('vi','b2b','card_4_features',JSON.stringify(['Training giáo viên 1 ngày','Tích hợp thời khóa biểu','Hỗ trợ kỹ thuật 24/7']),'list',o++);

  // Testing framework
  insert.run('vi','b2b','testing_heading','Khung Đánh Giá & Kiểm Tra','text',o++);
  insert.run('vi','b2b','test_1_title','Placement Test','text',o++);
  insert.run('vi','b2b','test_1_time','Đầu năm / Đầu khóa','text',o++);
  insert.run('vi','b2b','test_1_desc','Xếp lớp chính xác theo trình độ Lexile','text',o++);
  insert.run('vi','b2b','test_2_title','Module Test','text',o++);
  insert.run('vi','b2b','test_2_time','Sau mỗi 4-6 tuần','text',o++);
  insert.run('vi','b2b','test_2_desc','Đánh giá tiến bộ theo từng giai đoạn','text',o++);
  insert.run('vi','b2b','test_3_title','Giữa Kỳ','text',o++);
  insert.run('vi','b2b','test_3_time','Tuần 18','text',o++);
  insert.run('vi','b2b','test_3_desc','Tổng hợp đánh giá nửa học kỳ','text',o++);
  insert.run('vi','b2b','test_4_title','Cuối Kỳ','text',o++);
  insert.run('vi','b2b','test_4_time','Tuần 36','text',o++);
  insert.run('vi','b2b','test_4_desc','Đánh giá toàn diện & báo cáo Lexile growth','text',o++);
});
tx();

const cnt = db.prepare("SELECT COUNT(*) as c FROM content WHERE lang='vi' AND section='b2b'").get().c;
console.log('B2B rows:', cnt);
