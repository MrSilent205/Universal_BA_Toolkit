# Quy Chuẩn Nhận Diện & Loại Bỏ Sự Mơ Hồ Trong Đặc Tả (Ambiguity Detection)

> **Mã quy tắc:** `RULE-16`  
> **Áp dụng cho:** Tất cả các tài liệu đặc tả yêu cầu (BRD, URD, SRS, User Story, Acceptance Criteria).

---

## 1. Nguyên Tắc Lọc Mơ Hồ (The Deterministic Specification Rule)
Một câu đặc tả yêu cầu nghiệp vụ đạt chuẩn **phải cho ra cùng một kết quả thực thi duy nhất đối với bất kỳ lập trình viên hay kiểm thử viên nào đọc nó**. Nếu 2 người đọc cùng một câu mà diễn giải ra 2 cách kiểm thử khác nhau, câu đó vi phạm quy chuẩn mơ hồ.

---

## 2. Danh Mục Từ Ngữ Bị Cấm (Blacklist) & Cách Chuyển Hóa Cụ Thể

| Từ Ngữ Mơ Hồ Bị Cấm | Bản Chất Khiếm Khuyết | Cách Viết Lại Cụ Thể, Đo Lường Được (Deterministic Example) |
| :--- | :--- | :--- |
| *"Nhanh chóng", "Ngay lập tức"* | Không có mốc thời gian định lượng | *"Hệ thống phải phản hồi kết quả tìm kiếm trong vòng tối đa $\le 500\text{ ms}$ ở mức tải 100 CCU."* |
| *"Giao diện thân thiện, dễ dùng"* | Cảm tính, không kiểm thử được | *"Người dùng mới hoàn thành tác vụ đặt hàng trong vòng $\le 3\text{ phút}$ mà không cần đọc tài liệu hướng dẫn."* |
| *"Vân vân", "v.v.", "và các trường khác"* | Bỏ lửng danh sách, gây sót trường | Liệt kê đầy đủ 100% danh sách thuộc tính trong ngoặc đơn hoặc dẫn chiếu bảng Từ điển dữ liệu (`RULE-09`). |
| *"Nếu cần thiết", "tùy chọn"* | Thiếu điều kiện rẽ nhánh | Ghi rõ điều kiện kích hoạt: *"Nếu giá trị đơn hàng $\ge 1.000.000\text{ VNĐ}$ thì bắt buộc nhập mã xác nhận OTP SMS."* |
| *"Bảo mật tối đa, an toàn tuyệt đối"* | Khẩu hiệu, không có giải pháp kỹ thuật | *"Mật khẩu phải được băm bằng thuật toán Argon2id; đường truyền bắt buộc sử dụng giao thức TLS 1.3."* |
| *"Hệ thống tự động xử lý"* | Thiếu cơ chế kích hoạt (Trigger/Actor) | *"Hệ thống kích hoạt Cronjob chạy vào lúc 02:00 sáng hàng ngày để quét và chuyển trạng thái các đơn hàng quá hạn 24h."* |
| *"Dung lượng file hợp lý"* | Không có ngưỡng chặn byte | *"Cho phép tải lên file định dạng PDF/PNG có dung lượng tối đa $\le 5.0\text{ MB}$."* |
| *"Hỗ trợ các trình duyệt phổ biến"* | Không xác định danh sách và phiên bản | *"Hỗ trợ Google Chrome, Safari, Microsoft Edge trên 2 phiên bản phát hành gần nhất."* |

---

## 3. Checklist Tự Rà Soát Dành Cho BA (Self-Review Ambiguity Gate)
Trước khi bàn giao tài liệu SRS cho đội Dev/QA, BA phải tự trả lời 3 câu hỏi:
1. *QA có thể viết kịch bản Pass/Fail dứt khoát cho câu này mà không cần hỏi lại tôi không?*
2. *Nếu một lập trình viên mới vào dự án đọc câu này, họ có biết phải query trường nào trong DB không?*
3. *Có bất kỳ từ nào thuộc danh sách Blacklist ở bảng trên còn sót lại trong tài liệu không?*
