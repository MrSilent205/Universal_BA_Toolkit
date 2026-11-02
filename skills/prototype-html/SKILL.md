---
name: prototype-html
description: "Dựng Prototype HTML tương tác cao (High-Fidelity HTML Prototype): giao diện hoàn chỉnh, quản lý trạng thái client bằng LocalStorage, toast notifications, điều hướng giữa nhiều màn hình"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /prototype-html — Bản Mẫu HTML Tương tác Cao (High-Fi Prototype) [STANDARD WORKFLOW]

Xây dựng bản mẫu tương tác sống động (Interactive Prototype) hoàn chỉnh về giao diện, mô phỏng như một ứng dụng thực tế với khả năng lưu trữ trạng thái qua `localStorage`, hiển thị thông báo toast, điều hướng nhiều màn hình và mô phỏng luồng nghiệp vụ phức tạp.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi chuẩn bị thuyết trình demo sản phẩm trước Hội đồng Quản trị, Khách hàng VIP hoặc thực hiện bài kiểm tra trải nghiệm người dùng (Usability Testing) trước khi đội ngũ lập trình bắt đầu sprint.
- **Đối tượng thụ hưởng**: Khách hàng, C-Level, UX Researcher, Frontend Team.
- **Giá trị cốt lõi**: Mang lại cảm giác chân thực 100% như ứng dụng thật đã lập trình xong; giúp thu thập phản hồi của người dùng cuối về mặt trải nghiệm với chi phí chỉ bằng 1/10 so với việc code full-stack.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/prototype-html [tên_tính_năng] [luồng_mô_phỏng]`
- **Dữ liệu đầu vào cần có**:
  - Luồng di chuyển màn hình từ `/user-flow`.
  - Đặc tả trường dữ liệu và danh mục hành động người dùng.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/11-error-matrix-convention.md` — Mô phỏng thông báo lỗi chuẩn UI.
- `rules/13-wireframe-html-guidelines.md` — Cấu trúc semantic HTML5 và tính tự chứa.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/32-prototype-html.html`

## Vị trí lưu tệp mặc định
- `docs/{feature}/prototype/{screen_or_flow_name}.html`

## Quy trình thực thi chi tiết
1. **Thiết kế Hệ thống Giao diện Sống động (Design System Styling)**:
   - Áp dụng bảng màu thương hiệu hoặc bảng màu hiện đại (Modern Clean: Indigo/Slate/Emerald).
   - Thiết lập font chữ hệ thống mượt mà (`system-ui, -apple-system, sans-serif`), đổ bóng nhẹ (soft shadows), bo góc tinh tế (rounded-lg).
2. **Cài đặt Quản lý Trạng thái Phía Trình duyệt (Client-side State via LocalStorage)**:
   - Viết module Vanilla JS nhỏ gọn quản lý giỏ hàng, thông tin đăng nhập hoặc danh sách đơn hàng mẫu:
     ```javascript
     const AppState = {
       getCart: () => JSON.parse(localStorage.getItem('app_cart') || '[]'),
       addToCart: (item) => { ... },
       clear: () => localStorage.removeItem('app_cart')
     };
     ```
3. **Mô phỏng Điều hướng Nhiều Màn hình (Single Page App - SPA Navigation)**:
   - Sử dụng cơ chế ẩn/hiện các `<section class="screen">` hoặc hash-based routing (`#step-1`, `#step-2`) để người dùng có thể bấm "Tiếp tục" qua các bước mà không cần server backend.
4. **Cài đặt Hiệu ứng Phản hồi Người dùng (Micro-interactions & Toasts)**:
   - Hiệu ứng Loading spinner khi bấm nút (giả lập delay mạng 600ms).
   - Thông báo Toast góc trên màn hình khi thực hiện thành công ("Đã thêm vào giỏ hàng!", "Đã sao chép mã đơn!").
   - Xác thực biểu mẫu và hiển thị badge trạng thái động (Pending, Paid, Failed).
5. **Ghi tệp**:
   - Sử dụng template `_templates/32-prototype-html.html` và lưu vào `docs/{feature}/prototype/{screen_or_flow_name}.html`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Giao diện có tính thẩm mỹ cao, màu sắc và typography trau chuốt như ứng dụng production.
- [ ] Bấm được toàn bộ các nút điều hướng chính qua lại giữa các bước trong luồng.
- [ ] Dữ liệu người dùng nhập vào được lưu tạm qua `localStorage` và phản ánh ngay lên màn hình tóm tắt.
- [ ] Có hiệu ứng Loading giả lập và thông báo Toast thông tin mượt mà.
- [ ] Hoàn toàn chạy được trên trình duyệt local mà không cần dựng backend web server.
