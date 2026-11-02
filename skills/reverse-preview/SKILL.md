---
name: reverse-preview
description: "Kiểm tra và Đồng bộ Ngược từ Cổng Duyệt Preview về Tài liệu Gốc (Reverse Preview Synchronization): quét các ghi chú duyệt, chỉnh sửa của stakeholder trong preview.html để đồng bộ ngược vào Markdown"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /reverse-preview — Đồng bộ Ngược từ Preview về Tài liệu Gốc [STANDARD WORKFLOW]

Quét và phân tích các phản hồi, ghi chú đánh giá (Comments / Review Annotations) hoặc những sửa đổi trực tiếp mà Stakeholder/Khách hàng đã thực hiện trên tệp `preview.html`, tự động đồng bộ ngược lại vào các tệp Markdown nguồn tương ứng.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sau khi gửi tệp `preview.html` cho khách hàng duyệt, khách hàng đã thêm ghi chú phản biện hoặc chỉnh sửa một số câu chữ trực tiếp trên giao diện; BA cần cập nhật lại kho tài liệu gốc mà không phải đối chiếu thủ công từng dòng.
- **Đối tượng thụ hưởng**: Business Analyst, Lead Tech, Product Owner.
- **Giá trị cốt lõi**: Đảm bảo kho tài liệu mã nguồn (Markdown Source Files) luôn luôn đồng bộ tuyệt đối với những gì khách hàng đã xem và phê duyệt trên bản preview.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/reverse-preview [đường_dẫn_file_preview_html]`
- **Dữ liệu đầu vào cần có**:
  - Tệp `docs/{feature}/preview.html` đã có ghi chú/sửa đổi.
  - Thư mục tài liệu gốc `docs/{feature}/`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/18-knowledge-graph-metadata.md` — Ánh xạ ID tài liệu nguồn.
- `rules/19-document-versioning-rules.md` — Tự động tăng số hiệu PATCH và ghi log lịch sử sửa đổi.

## Biểu mẫu tham chiếu (Template)
- Cập nhật trực tiếp vào các file tương ứng trong `docs/{feature}/`.

## Vị trí lưu tệp mặc định
- Cập nhật đè lên các tệp `.md` nguồn trong `docs/{feature}/`.

## Quy trình thực thi chi tiết
1. **Phân tích Cú pháp Tệp Preview HTML**:
   - Đọc cấu trúc DOM của `preview.html`, tìm kiếm các thẻ ghi chú phản hồi: `<div class="review-comment">` hoặc các đoạn text bị thay đổi so với bản gốc.
2. **Ánh xạ Thay đổi Về Tệp Nguồn Tương ứng**:
   - Dựa trên thuộc tính `data-source-file` và ID mục con:
     - Nhận diện sửa đổi thuộc về SRS, PRD hay User Story nào.
3. **Thực hiện Cập nhật Ngược (Reverse Patching)**:
   - Áp dụng các thay đổi vào file Markdown gốc:
     - Sửa đổi nội dung quy tắc hoặc tiêu chí nghiệm thu.
     - Nếu phát sinh yêu cầu thay đổi lớn (Scope change) $
ightarrow$ Tự động chuyển tiếp thông báo kích hoạt lệnh `/cr`.
4. **Tăng Phiên bản & Ghi Lịch sử Sửa đổi**:
   - Tự động nâng phiên bản PATCH (`v1.0.0` $
ightarrow$ `v1.0.1`) theo Rule 19.
   - Thêm một dòng vào bảng Revision History: "Đồng bộ phản hồi phê duyệt của khách hàng từ preview.html".
5. **Thông báo Báo cáo Tổng kết**:
   - Hiển thị bảng tóm tắt danh sách các file đã được đồng bộ thành công.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Nhận diện chính xác 100% các điểm ghi chú hoặc sửa đổi từ phía khách hàng trên preview.
- [ ] Cập nhật đúng file Markdown nguồn, không làm hỏng cấu trúc định dạng ban đầu.
- [ ] Ghi lại lịch sử sửa đổi chi tiết trong bảng Revision History theo Rule 19.
- [ ] Báo cáo rõ ràng danh mục các tệp đã được cập nhật thành công.
