const db = require('./db');
const update = db.prepare('UPDATE blog_posts SET title=?, excerpt=?, content=?, meta_description=?, meta_keywords=? WHERE slug=?');

// Post 1
update.run(
  'Đề Án 2371/QĐ-TTg: Cơ Hội Và Thách Thức Khi Đưa Tiếng Anh Thành Ngôn Ngữ Thứ Hai',
  'Phân tích Quyết định 2371/QĐ-TTg của Thủ tướng Chính phủ về đưa tiếng Anh thành ngôn ngữ thứ hai trong trường học giai đoạn 2025-2035 và giải pháp triển khai hiệu quả.',
  `<img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="Học sinh trong lớp học tiếng Anh" style="width:100%;border-radius:12px;margin-bottom:24px">

<h2>Bối Cảnh Đề Án 2371/QĐ-TTg</h2>
<p>Ngày 30/12/2024, Thủ tướng Chính phủ ban hành Quyết định 2371/QĐ-TTg phê duyệt Đề án <strong>"Đưa tiếng Anh thành ngôn ngữ thứ hai trong trường học giai đoạn 2025-2035"</strong>. Đây là bước ngoặt quan trọng trong chiến lược phát triển giáo dục Việt Nam, đặt ra yêu cầu cấp bách cho các trường học trên cả nước.</p>

<img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80" alt="Giáo dục tiếng Anh" style="width:100%;border-radius:12px;margin:20px 0">

<h2>Mục Tiêu Chính Của Đề Án</h2>
<ul>
<li><strong>Giai đoạn 2025-2030:</strong> Xây dựng nền tảng, đào tạo giáo viên, thí điểm tại các thành phố lớn. Đảm bảo 100% học sinh được tiếp cận tiếng Anh từ lớp 1.</li>
<li><strong>Giai đoạn 2030-2035:</strong> Mở rộng toàn quốc, tiếng Anh trở thành ngôn ngữ thứ hai chính thức trong hệ thống giáo dục.</li>
</ul>

<h2>Thách Thức Của Trường Học Hiện Nay</h2>
<p>Để đáp ứng Đề án, các trường học và trung tâm ngoại ngữ phải đối mặt với nhiều thách thức lớn:</p>
<ul>
<li>📉 Thiếu giáo trình chuẩn quốc tế phù hợp từ mầm non đến THPT</li>
<li>📊 Không có thang đo trình độ đọc hiểu chuẩn quốc tế (như Lexile)</li>
<li>🔄 Chương trình rời rạc, không liên cấp - học sinh phải thay đổi nền tảng giữa chừng</li>
<li>👩‍🏫 Giáo viên chưa được đào tạo phương pháp giảng dạy đọc hiểu theo chuẩn CCSS</li>
</ul>

<img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80" alt="Sách giáo dục và đọc hiểu" style="width:100%;border-radius:12px;margin:20px 0">

<h2>Giải Pháp: Reading Pathway - Lộ Trình Đọc Hiểu Liên Cấp</h2>
<p>Reading Pathway kết hợp <strong>Trophy9</strong> (Mầm Non - THCS) và <strong>Achieve3000</strong> (THPT - Đại Học) tạo ra lộ trình đọc hiểu liên cấp duy nhất đáp ứng Đề án 2371:</p>
<ul>
<li><strong>Trophy9:</strong> 54 cấp độ, 198 Leveled Readers theo chuẩn CCSS Mỹ, 9 hoạt động tương tác phát triển 4 kỹ năng</li>
<li><strong>Achieve3000:</strong> Cá nhân hóa theo chỉ số Lexile, 12 cấp độ, AI thích ứng theo trình độ từng học sinh</li>
<li><strong>Lesson Plan sẵn sàng:</strong> Giáo án 36 tuần/năm, training giáo viên chỉ 1 ngày là triển khai được</li>
<li><strong>Đo lường được:</strong> Dashboard Lexile Growth Report cho ban giám hiệu và phụ huynh theo dõi realtime</li>
</ul>

<blockquote>Với Reading Pathway, trường học có thể triển khai ngay giải pháp đọc hiểu chuẩn quốc tế, đo lường hiệu quả bằng chỉ số Lexile, và hoàn toàn đáp ứng yêu cầu của Đề án 2371/QĐ-TTg.</blockquote>

<h2>Kết Quả Được Chứng Minh</h2>
<p>Nghiên cứu từ Achieve3000 (McGraw Hill) với hơn 40 năm kinh nghiệm cho thấy:</p>
<ul>
<li>Học sinh sử dụng đúng cách tăng trưởng Lexile <strong>gấp 2.1 - 4.2 lần</strong> so với kỳ vọng</li>
<li>Trường triển khai Trophy9 + Achieve3000 có lộ trình liên cấp <strong>từ 3 tuổi đến Đại Học</strong></li>
</ul>

<h2>Liên Hệ Tư Vấn Miễn Phí</h2>
<p>Cdimex Education Solutions hỗ trợ trường học và trung tâm ngoại ngữ triển khai Reading Pathway với <strong>demo miễn phí</strong> và bảng giá phù hợp quy mô. Liên hệ ngay qua Zalo/Whatsapp: <strong>+84 93 736 03391</strong></p>`,
  'Phân tích Đề án 2371/QĐ-TTg đưa tiếng Anh thành ngôn ngữ thứ hai trong trường học 2025-2035. Giải pháp Reading Pathway với Trophy9 và Achieve3000 cho trường học Việt Nam.',
  'đề án 2371, tiếng anh ngôn ngữ thứ hai, trường học, reading pathway, trophy9, achieve3000, giáo dục tiếng anh',
  'de-an-2371-tieng-anh-ngon-ngu-thu-hai'
);

// Post 2
update.run(
  'Chỉ Số Lexile Là Gì? Cách Đo Trình Độ Đọc Hiểu Tiếng Anh Chính Xác',
  'Tìm hiểu chỉ số Lexile - thang đo trình độ đọc hiểu quốc tế được sử dụng tại hơn 180 quốc gia. Tại sao trường học Việt Nam cần áp dụng?',
  `<img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80" alt="Đọc sách và học tập" style="width:100%;border-radius:12px;margin-bottom:24px">

<h2>Lexile Là Gì?</h2>
<p><strong>Lexile</strong> là thang đo trình độ đọc hiểu do MetaMetrics (Mỹ) phát triển, được sử dụng tại <strong>hơn 180 quốc gia</strong> trên thế giới. Lexile đo chính xác khả năng đọc của mỗi người bằng một con số cụ thể, ví dụ: 800L.</p>
<p>Khác với các bài kiểm tra truyền thống chỉ cho điểm A/B/C, Lexile cho phép ghép nối chính xác giữa trình độ người đọc và độ khó của văn bản.</p>

<img src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&q=80" alt="Trẻ em đọc sách" style="width:100%;border-radius:12px;margin:20px 0">

<h2>Cách Thang Đo Lexile Hoạt Động</h2>
<p>Lexile có hai chiều đo lường:</p>
<ul>
<li><strong>Lexile Reader Measure:</strong> Trình độ đọc của học sinh (VD: học sinh có Lexile 750L)</li>
<li><strong>Lexile Text Measure:</strong> Độ khó của văn bản (VD: sách có Lexile 800L)</li>
</ul>
<p>Khi ghép đúng trình độ người đọc với độ khó văn bản, học sinh hiểu được <strong>75% nội dung</strong> - vừa đủ thách thức để phát triển mà không quá khó gây nản chí.</p>

<h2>Bảng Lexile Theo Cấp Học</h2>
<table style="width:100%;border-collapse:collapse;margin:20px 0">
<tr style="background:#F1F5F9"><th style="padding:12px;text-align:left;border:1px solid #E2E8F0">Cấp Học</th><th style="padding:12px;text-align:left;border:1px solid #E2E8F0">Lexile Range</th></tr>
<tr><td style="padding:10px;border:1px solid #E2E8F0">Mầm Non - Lớp 1</td><td style="padding:10px;border:1px solid #E2E8F0">BR (Beginning Reader) đến 200L</td></tr>
<tr style="background:#FAFAFA"><td style="padding:10px;border:1px solid #E2E8F0">Lớp 2-3</td><td style="padding:10px;border:1px solid #E2E8F0">200L - 500L</td></tr>
<tr><td style="padding:10px;border:1px solid #E2E8F0">Lớp 4-5</td><td style="padding:10px;border:1px solid #E2E8F0">500L - 800L</td></tr>
<tr style="background:#FAFAFA"><td style="padding:10px;border:1px solid #E2E8F0">Lớp 6-8 (THCS)</td><td style="padding:10px;border:1px solid #E2E8F0">800L - 1050L</td></tr>
<tr><td style="padding:10px;border:1px solid #E2E8F0">Lớp 9-12 (THPT)</td><td style="padding:10px;border:1px solid #E2E8F0">1050L - 1350L</td></tr>
<tr style="background:#FAFAFA"><td style="padding:10px;border:1px solid #E2E8F0">Đại Học</td><td style="padding:10px;border:1px solid #E2E8F0">1300L+</td></tr>
</table>

<h2>Tại Sao Trường Học Việt Nam Cần Lexile?</h2>
<ul>
<li>📐 <strong>Đo lường khách quan:</strong> Không dựa vào cảm tính, có con số cụ thể để báo cáo</li>
<li>🎯 <strong>Cá nhân hóa:</strong> Mỗi học sinh nhận bài đọc phù hợp chính xác trình độ của mình</li>
<li>📈 <strong>Theo dõi tiến bộ:</strong> So sánh Lexile đầu năm vs cuối năm = chứng minh hiệu quả giảng dạy</li>
<li>🌍 <strong>Chuẩn quốc tế:</strong> So sánh được trình độ đọc với học sinh các nước trên thế giới</li>
</ul>

<img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" alt="Học sinh đang học" style="width:100%;border-radius:12px;margin:20px 0">

<h2>Achieve3000 - Nền Tảng Đọc Hiểu Sử Dụng Lexile</h2>
<p><strong>Achieve3000</strong> (McGraw Hill) là nền tảng đọc hiểu hàng đầu thế giới sử dụng chỉ số Lexile để cá nhân hóa nội dung cho từng học sinh. Với hơn 40 năm nghiên cứu, Achieve3000 đã chứng minh:</p>
<ul>
<li>Học sinh sử dụng đúng cách tăng trưởng Lexile <strong>gấp 2 - 4 lần</strong> so với bình thường</li>
<li>12 cấp độ tự động thích ứng - không học sinh nào bị bỏ lại phía sau</li>
</ul>

<blockquote>Lexile không chỉ là con số - đó là chìa khóa để mở cánh cửa đọc hiểu cho mỗi học sinh, tại đúng trình độ của họ. Và Achieve3000 là công cụ tốt nhất để đo và phát triển chỉ số này.</blockquote>`,
  'Chỉ số Lexile là gì? Thang đo trình độ đọc hiểu quốc tế MetaMetrics, bảng Lexile theo cấp học, tại sao trường học Việt Nam cần Lexile. Achieve3000 sử dụng Lexile.',
  'lexile, chỉ số lexile, đo trình độ đọc hiểu, achieve3000, reading comprehension, metametrics',
  'lexile-la-gi-do-trinh-do-doc-hieu'
);

// Post 3
update.run(
  '9 Hoạt Động Học Tiếng Anh Trong Trophy9: Từ Phonics Đến Tư Duy Phản Biện',
  'Khám phá 9 hoạt động tương tác trong Trophy9 giúp trẻ phát triển toàn diện 4 kỹ năng Nghe-Nói-Đọc-Viết theo chuẩn CCSS Mỹ.',
  `<img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="Trẻ em học tiếng Anh vui vẻ" style="width:100%;border-radius:12px;margin-bottom:24px">

<h2>Trophy9 Là Gì?</h2>
<p><strong>Trophy9</strong> là chương trình E-Learning tiếng Anh toàn diện dành cho trẻ từ Mầm Non đến Lớp 9, sử dụng sách giáo khoa <strong>Benchmark Education</strong> theo chuẩn CCSS (Common Core State Standards) của giáo dục công lập Hoa Kỳ.</p>
<p>Với <strong>198 Leveled Readers + 54 Workbooks</strong>, Trophy9 cung cấp nội dung phong phú được chia thành 54 cấp độ, đảm bảo mỗi trẻ học đúng trình độ.</p>

<h2>9 Hoạt Động Tương Tác</h2>

<img src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=600&q=80" alt="Trẻ em đọc sách" style="width:100%;border-radius:12px;margin:20px 0">

<h3>📖 1. Leveled Readers - Sách Đọc Theo Cấp Độ</h3>
<p>198 cuốn sách được tuyển chọn từ Benchmark Education, chia theo 54 cấp độ. Mỗi cuốn được xây dựng nội dung theo đúng chuẩn CCSS, tương đương chương trình mà học sinh bản ngữ Mỹ đang sử dụng.</p>

<h3>❓ 2. Book Quiz - Kiểm Tra Đọc Hiểu</h3>
<p>Sau mỗi bài đọc, học sinh trả lời câu hỏi để kiểm tra mức độ hiểu nội dung và khả năng nắm bắt ý chính. Đây là bước đánh giá quan trọng trong chu trình học.</p>

<h3>📝 3. Vocabulary - Từ Vựng</h3>
<p>Ôn lại và ghi nhớ từ mới xuất hiện trong bài đọc, mở rộng vốn từ vựng một cách tự nhiên trong ngữ cảnh thực tế - không phải học thuộc từ rời rạc.</p>

<h3>🎧 4. Dictation - Nghe Viết</h3>
<p>Tăng khả năng tập trung và cải thiện kỹ năng nghe thông qua bài tập nghe và viết lại câu. Hoạt động này kết nối tai nghe với tay viết một cách hiệu quả.</p>

<h3>🗣️ 5. Shadowing - Đọc Theo</h3>
<p>Cải thiện phát âm bằng cách đọc theo giọng người bản xứ. Phương pháp Shadowing được các chuyên gia ngôn ngữ học chứng minh hiệu quả trong việc xây dựng fluency (sự trôi chảy).</p>

<img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80" alt="Học sinh thuyết trình" style="width:100%;border-radius:12px;margin:20px 0">

<h3>📚 6. Storytelling - Kể Chuyện</h3>
<p>Phát triển kỹ năng nói tự tin, trôi chảy thông qua bài tập kể lại câu chuyện bằng lời của mình. Trẻ không chỉ đọc mà còn sáng tạo lại nội dung.</p>

<h3>🎭 7. Role Play - Đóng Vai</h3>
<p>Áp dụng các biểu hiện ngôn ngữ đã học vào tình huống thực tế, luyện tập cách nói tự nhiên như người bản ngữ trong các ngữ cảnh đời thường.</p>

<h3>📐 8. Grammar - Ngữ Pháp</h3>
<p>Hiểu và nắm vững các quy tắc ngữ pháp tiếng Anh một cách có hệ thống, từ cơ bản đến nâng cao. Ngữ pháp được dạy trong ngữ cảnh, không phải lý thuyết khô khan.</p>

<h3>✍️ 9. Book Report - Báo Cáo Sách</h3>
<p>Cải thiện kỹ năng viết với các hoạt động tổng hợp sau khi đọc, rèn tư duy phân tích và khả năng diễn đạt ý tưởng bằng văn bản.</p>

<h2>Mô Hình Walk → Run → Sprint</h2>
<img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80" alt="Sự tiến bộ trong học tập" style="width:100%;border-radius:12px;margin:20px 0">
<ul>
<li><strong>T1-T2 (Walk - Bước Đi):</strong> Phonics, từ vựng cơ bản, câu đơn giản, làm quen mẫu câu lặp lại</li>
<li><strong>T3-T4 (Run - Chạy):</strong> Đọc hiểu sâu, Close Reading, Collaborative Conversation, Presentation</li>
<li><strong>T5-T6 (Sprint - Tăng Tốc):</strong> Văn bản phức tạp, tư duy phản biện, Speaking & Writing chuyên sâu, chuẩn bị chứng chỉ</li>
</ul>

<blockquote>9 hoạt động của Trophy9 bao phủ đầy đủ Bloom's Taxonomy - từ Nhớ (Vocabulary), Hiểu (Book Quiz), Áp dụng (Role Play) đến Phân tích (Grammar) và Tổng hợp (Book Report) - đảm bảo phát triển tư duy toàn diện cho trẻ.</blockquote>

<h2>Bắt Đầu Với Trophy9</h2>
<p>Trường học và trung tâm ngoại ngữ có thể triển khai Trophy9 với Lesson Plan sẵn sàng, training giáo viên 1 ngày. Liên hệ <strong>Cdimex Education Solutions</strong> để nhận demo miễn phí.</p>`,
  'Trophy9 là gì? 9 hoạt động học tiếng Anh tương tác: Leveled Readers, Book Quiz, Vocabulary, Dictation, Shadowing, Storytelling, Role Play, Grammar, Book Report theo chuẩn CCSS Mỹ.',
  'trophy9, 9 hoạt động, phonics, đọc hiểu, CCSS, benchmark education, học tiếng anh trẻ em, nghe nói đọc viết',
  'trophy9-9-hoat-dong-hoc-tieng-anh'
);

console.log('Updated 3 blog posts with Vietnamese diacritics + images');
