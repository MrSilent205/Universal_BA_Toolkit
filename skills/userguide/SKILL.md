---
name: userguide
description: "Soạn thảo Cẩm nang Vận hành Chuẩn cho Quản trị viên & CSKH (SOP & Operation Manual): hướng dẫn thao tác từng bước, bảng quy trình xử lý sự cố Troubleshooting mapping theo bảng mã lỗi ERR"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /userguide — Cẩm nang Vận hành & Hướng dẫn Sử dụng Chuẩn (SOP) [STANDARD WORKFLOW]

Soạn thảo cẩm nang vận hành hệ thống chi tiết (Standard Operating Procedure - SOP) dành cho Người dùng cuối, Quản trị viên hệ thống (Admin) và Đội ngũ Chăm sóc Khách hàng (CSKH), bao gồm quy trình thao tác từng bước và bảng tra cứu sự cố (Troubleshooting Guide) chuẩn hóa.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trước khi Go-Live hệ thống; dùng để đào tạo người dùng mới, bàn giao cho bộ phận vận hành và cung cấp tài liệu tra cứu trực tiếp cho nhân viên trực tổng đài CSKH.
- **Đối tượng thụ hưởng**: Quản trị viên (Admin), Nhân viên CSKH/Support, Người dùng cuối, Vận hành viên.
- **Giá trị cốt lõi**: Giảm 80% số lượng ticket hỗ trợ kỹ thuật phải chuyển lên cho đội Dev; giúp nhân viên CSKH tra cứu ngay lập tức nguyên nhân khi khách hàng đọc mã lỗi `ERR-xxx` trên màn hình.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/userguide [tên_tính_năng] [đối_tượng: admin | end-user | cskh]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả SRS (`docs/{feature}/srs/spec.md`).
  - Ma trận Lỗi tổng hợp (`rules/11-error-matrix-convention.md`).
  - Wireframe hoặc Prototype giao diện.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Ánh xạ mã lỗi trong mục xử lý sự cố.
- `rules/11-error-matrix-convention.md` — Ma trận lỗi và hướng xử lý tiếp theo.
- `rules/17-actor-role-definition.md` — Phân định rõ vai trò và quyền hạn thao tác.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- Cấu trúc Hướng dẫn Vận hành & Xử lý sự cố: mapping theo `rules/11-error-matrix-convention.md`
- Định dạng xuất bản: Cẩm nang Vận hành & Hướng dẫn Sử dụng Chi tiết (Operation & Troubleshooting Manual)

## Vị trí lưu tệp mặc định
- `docs/{feature}/user-guide.md` (hoặc `docs/sop/{feature}-admin-guide.md`)

## Quy trình thực thi chi tiết
1. **Thiết lập Tổng quan Chức năng & Phân quyền**:
   - Giới thiệu ngắn gọn mục đích tính năng và các vai trò có quyền thao tác theo Rule 17.
2. **Hướng dẫn Thao tác Nghiệp vụ Từng bước (Step-by-Step SOP)**:
   - Mô tả trình tự thao tác rõ ràng theo định dạng:
     - **Bước 1**: Đăng nhập vào hệ thống và điều hướng đến menu...
     - **Bước 2**: Nhập các trường thông tin bắt buộc (kèm giải thích ý nghĩa từng trường).
     - **Bước 3**: Kiểm tra lại thông tin trên màn hình xác nhận và bấm nút...
     - **Bước 4**: Nhận thông báo thành công và kiểm tra dữ liệu trên danh sách...
   - Kèm theo các mẹo xử lý nhanh (Pro Tips) và lưu ý quan trọng (Important Notes).
3. **Bảng Tra cứu & Xử lý Sự cố Nhanh (Troubleshooting & Incident Guide)**:
   - Xây dựng bảng tra cứu sự cố chuẩn 5 cột dựa trên Ma trận Lỗi (Rule 11):
     1. `Mã Lỗi Hệ thống`: Mã `ERR-xxx`.
     2. `Thông báo Hiển thị trên Màn hình`: Nội dung text người dùng nhìn thấy.
     3. `Nguyên nhân Thường gặp`: Giải thích nguyên nhân gốc rễ.
     4. `Hướng dẫn Xử lý Nhanh cho CSKH`: Cách hướng dẫn khách hàng tự khắc phục.
     5. `Khi nào Cần Escalate lên Kỹ thuật`: Tiêu chuẩn để chuyển ticket cho Dev.
4. **Câu hỏi Thường gặp (Frequently Asked Questions - FAQ)**:
   - Tổng hợp 5-7 câu hỏi thực tế người dùng thường thắc mắc trong quá trình sử dụng.
5. **Ghi tệp**:
   - Lưu vào `docs/{feature}/user-guide.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Ngôn ngữ diễn đạt thân thiện, dễ hiểu, tránh lạm dụng thuật ngữ kỹ thuật phức tạp khó hiểu.
- [ ] Quy trình thao tác được đánh số thứ tự từng bước rõ ràng, kèm lưu ý rủi ro.
- [ ] Bảng tra cứu sự cố phủ kín các mã lỗi `ERR-` trọng yếu của tính năng.
- [ ] Có mục phân định rõ ràng khi nào CSKH tự xử lý được và khi nào phải chuyển lên Dev.
- [ ] Có mục FAQ giải đáp các thắc mắc thường gặp.
