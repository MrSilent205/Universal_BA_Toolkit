---
name: wireframe-html
description: "Dựng Wireframe HTML đơn sắc nguyên khối (Single-file Grayscale Wireframe): mở trực tiếp trên trình duyệt, không phụ thuộc thư viện CDN, mô phỏng đầy đủ trạng thái tương tác và thông báo lỗi"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /wireframe-html — Wireframe HTML Đơn sắc Tương tác Nguyên khối [CORE WORKFLOW]

Tạo tệp giao diện HTML nguyên khối (Single-file HTML) chuẩn Grayscale, tự chứa toàn bộ CSS và JavaScript nội tuyến, có thể double-click mở xem trực tiếp trên mọi trình duyệt mà hoàn toàn không cần internet, server hay tiện ích mở rộng.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi muốn bàn giao bản demo giao diện bấm được (Clickable Wireframe) cho Khách hàng, Stakeholders hoặc Đội ngũ Lập trình frontend kiểm tra bố cục và luồng tương tác mà không bị xao nhãng bởi màu sắc hay thẩm mỹ đồ họa.
- **Đối tượng thụ hưởng**: Khách hàng, Product Owner, Frontend Developers, QA Testers.
- **Giá trị cốt lõi**: Cực kỳ tiện lợi — gửi qua email/zalo/slack mở được ngay trên cả máy tính lẫn điện thoại; kiểm chứng được form validation và luồng pop-up trực quan 100% trước khi viết code thật.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/wireframe-html [tên_màn_hình_hoặc_mã_SCR] [mô_tả_các_trường_thông_tin]`
- **Dữ liệu đầu vào cần có**:
  - Danh mục màn hình từ `/user-flow` hoặc danh sách trường dữ liệu từ SRS.
  - Bảng mã lỗi (`ERR-xxx`) để mô phỏng trạng thái validate.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Mã lỗi hiển thị khi validate form thất bại.
- `rules/11-error-matrix-convention.md` — Thông báo lỗi thân thiện chuẩn UI.
- `rules/13-wireframe-html-guidelines.md` — Bộ quy tắc Wireframe HTML (Single-file, Grayscale, Zero External CDN, Semantic HTML5).
- `rules/16-ambiguity-detection-rules.md` — Không dùng dữ liệu giả vô nghĩa (dùng data thực tế thay vì lorem ipsum).

## Biểu mẫu tham chiếu (Template)
- `_templates/31-wireframe-html.html`

## Vị trí lưu tệp mặc định
- `docs/{feature}/html-wireframe/{screen_name}.html` (ví dụ: `docs/checkout/html-wireframe/checkout-form.html`)

## Quy trình thực thi chi tiết
1. **Thiết lập Khung Tệp Độc lập (Zero External Dependencies)**:
   - Sử dụng chuẩn `<!DOCTYPE html><html lang="vi">`.
   - Toàn bộ CSS nằm trọn trong thẻ `<style>`, toàn bộ JS nằm trong thẻ `<script>`.
   - Tuyệt đối không import thư viện ngoài qua CDN (Tailwind CDN, Bootstrap CDN, Google Fonts) để đảm bảo mở được 100% khi offline.
2. **Áp dụng Bảng Màu Đơn sắc Chuẩn theo Rule 13 (Grayscale & High Contrast)**:
   - Màu nền trang: `#F8F9FA` (Xám nhạt).
   - Màu nền thẻ/card: `#FFFFFF` (Trắng thuần).
   - Đường viền/Border: `#E5E7EB` hoặc `#D1D5DB`.
   - Màu chữ: Đen đậm `#111827` cho tiêu đề, xám đậm `#4B5563` cho nội dung, xám nhạt `#9CA3AF` cho placeholder.
   - Điểm nhấn trạng thái (Accent): Đen/Xanh trung tính `#1E293B` cho nút CTA chính.
   - Báo lỗi (Error): `#DC2626` cho viền input và text thông báo lỗi.
3. **Cấu trúc Giao diện Bằng Semantic HTML5 & Responsive Grid**:
   - Sử dụng các thẻ chuẩn: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
   - Xây dựng form chuẩn: `<form>`, `<label>`, `<input>`, `<select>`, `<textarea>`, `<button type="submit">`.
   - Áp dụng CSS Flexbox / CSS Grid chuẩn responsive (tương thích cả Mobile 375px và Desktop 1280px).
4. **Cài đặt Tương tác Giả lập (Interactive Mock Behaviors)**:
   - Viết Vanilla JavaScript nội tuyến mô phỏng các hành vi thực tế:
     - *Validation Form*: Khi bấm Submit để trống $
ightarrow$ viền đỏ các ô lỗi, hiển thị inline message kèm mã lỗi `ERR-xxx`.
     - *Thành công*: Khi điền đúng $
ightarrow$ ẩn form, hiển thị thông báo thành công xanh lá hoặc modal xác nhận.
     - *Toggle Modal*: Bấm nút "Xem điều khoản" $
ightarrow$ mở modal popup, bấm "Đóng" hoặc click ngoài overlay $
ightarrow$ tắt modal.
     - *Tabs / Accordion*: Chuyển đổi qua lại giữa các phương thức thanh toán mượt mà.
5. **Ghi tệp & Kiểm định**:
   - Lưu file vào `docs/{feature}/html-wireframe/{screen_name}.html`.
   - Kiểm tra mở trực tiếp trên trình duyệt mặc định.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] File HTML duy nhất, tự chứa 100% CSS và JS, không có bất kỳ đường link CDN bên ngoài nào.
- [ ] Tuân thủ bảng màu đơn sắc Grayscale chuẩn theo Rule 13, độ tương phản cao, typography rõ ràng.
- [ ] Responsive hoàn hảo, co giãn tốt từ màn hình di động 360px đến màn hình máy tính 1920px.
- [ ] Có tương tác JavaScript thực tế: bấm nút submit có kiểm tra validation và hiển thị mã lỗi `ERR-`.
- [ ] Dữ liệu hiển thị mang tính thực tế nghiệp vụ, không dùng chuỗi vô nghĩa "lorem ipsum".
