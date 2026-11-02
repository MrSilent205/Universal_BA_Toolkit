---
name: preview
description: "Khởi tạo Cổng Duyệt Hồ sơ Tài liệu Tương tác Một Trang (Interactive Single-Page Documentation Portal preview.html): tích hợp thanh điều hướng sidebar, live rendered diagrams và responsive reading pane"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /preview — Cổng Duyệt Hồ sơ Tài liệu Tương tác Một Chạm (preview.html) [CORE WORKFLOW]

Đóng gói và biên dịch toàn bộ kho tài liệu Markdown của một tính năng thành một trang web duy nhất (`preview.html`) với giao diện cổng thông tin (Documentation Portal) hiện đại, tích hợp thanh điều hướng bên trái, hỗ trợ tìm kiếm nhanh, hiển thị trực quan các sơ đồ đồ họa và mở được ngay trên trình duyệt mà không cần cài server.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi muốn gửi hồ sơ tính năng cho Khách hàng, Stakeholders hoặc Đội ngũ Lãnh đạo thẩm định và ký duyệt; thay thế hoàn toàn việc gửi hàng chục file markdown rời rạc.
- **Đối tượng thụ hưởng**: Khách hàng, C-Level, Solution Architect, Toàn bộ đội dự án.
- **Giá trị cốt lõi**: Trải nghiệm duyệt tài liệu đỉnh cao như đọc GitBook / Stripe Docs; khách hàng chỉ cần click vào 1 file duy nhất là có thể xem trọn vẹn từ PRD, SRS, Sơ đồ tuần tự, ERD cho đến Wireframe và Test Cases.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/preview [tên_tính_năng_hoặc_thư_mục]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ các tệp `.md` trong thư mục `docs/{feature}/`.
  - Các sơ đồ HTML/SVG đã xuất bản từ `/render-diagrams`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/13-wireframe-html-guidelines.md` — Tính tự chứa nguyên khối, zero external CDN.
- `rules/18-knowledge-graph-metadata.md` — Metadata tạo cây điều hướng sidebar.
- `rules/19-document-versioning-rules.md` — Đóng dấu phiên bản hồ sơ.

## Biểu mẫu tham chiếu (Template)
- Áp dụng bộ khung Portal UI tự chứa từ `_templates/31-wireframe-html.html`.

## Vị trí lưu tệp mặc định
- `docs/{feature}/preview.html`

## Quy trình thực thi chi tiết
1. **Quét & Tổ chức Cấu trúc Cây Thư mục (Document Tree Scanning)**:
   - Quét toàn bộ các tệp tài liệu trong `docs/{feature}/`, nhóm thành các mục điều hướng logic:
     - *Tổng quan*: PRD, Roadmap, Discovery.
     - *Đặc tả*: SRS Master, Business Rules, Error Matrix.
     - *Sơ đồ*: Sequence, Activity, State, ERD.
     - *Giao diện*: Wireframes, User Flow, Prototypes.
     - *Kiểm thử*: Acceptance Criteria, Test Cases, RTM.
2. **Dựng Khung Giao diện Cổng Thông tin (Portal Layout Architecture)**:
   - **Thanh bên trái (Sidebar Navigation)**: Logo dự án, phiên bản, ô tìm kiếm nhanh và danh mục cây trang có highlight trang đang đọc.
   - **Khu vực trung tâm (Main Content Pane)**: Hiển thị nội dung tài liệu Markdown đã được biên dịch sang HTML chuẩn, typography sắc nét, bảng biểu có đường kẻ rõ ràng, code block có highlight cú pháp.
   - **Thanh bên phải (On This Page TOC)**: Tự động trích xuất các thẻ `h2`, `h3` của bài viết hiện tại để nhảy nhanh đến từng mục.
3. **Nhúng Sơ đồ Đồ họa Trực tiếp (Live Diagram Embedding)**:
   - Tự động nhúng mã vector SVG của các sơ đồ Sequence, ERD, State Diagram vào bài viết để người dùng xem trực quan ngay lập tức mà không cần bấm link ngoài.
4. **Cài đặt Tương tác Client Bằng Vanilla JS (Zero External Dependencies)**:
   - Tìm kiếm nhanh (Instant Filter) các đề mục ngay trên thanh sidebar.
   - Cơ chế chuyển tab nội dung mượt mà, không bị load lại trang.
   - Nút "In / Xuất PDF" tích hợp sẵn CSS Print tối ưu.
5. **Ghi tệp & Kiểm tra**:
   - Lưu file vào `docs/{feature}/preview.html`.
   - Thông báo đường dẫn tệp để người dùng có thể double-click mở xem ngay trên trình duyệt.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Tệp `preview.html` tự chứa 100% CSS và JS, mở trực tiếp bằng trình duyệt không phụ thuộc internet.
- [ ] Thanh điều hướng Sidebar liệt kê đầy đủ và mạch lạc toàn bộ các tài liệu của tính năng.
- [ ] Bảng biểu, mã nguồn và sơ đồ vector SVG hiển thị sắc nét, không bị tràn màn hình (overflow).
- [ ] Tính năng tìm kiếm nhanh trên sidebar hoạt động mượt mà.
- [ ] Bố cục đáp ứng Responsive hoàn hảo trên cả máy tính và máy tính bảng.
