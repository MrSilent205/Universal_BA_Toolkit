# Quy Chuẩn Thiết Kế Wireframe & Prototype Bằng HTML/CSS (Grayscale Wireframes)

> **Mã quy tắc:** `RULE-13`  
> **Áp dụng cho:** Tất cả các file Wireframe và Interactive Prototype (`31-wireframe-html.html`, `32-prototype-html.html`).

---

## 1. Nguyên Tắc Cốt Lõi: Đơn Sắc (Strict Grayscale)
Mục tiêu của Wireframe do BA xây dựng là **thẩm định cấu trúc thông tin, luồng nghiệp vụ và bố cục chức năng**, không thay thế thiết kế UI/Brand của UI Designer. Do đó:
- **Tuyệt đối không sử dụng bảng màu thương hiệu sặc sỡ:** Chỉ sử dụng dải màu Grayscale chuẩn: Trắng (`#ffffff`), Đen (`#111827`), và các sắc độ Xám (`#f3f4f6`, `#e5e7eb`, `#9ca3af`, `#4b5563`).
- **Ngoại lệ duy nhất (Accent Highlights):** Chỉ được phép dùng 2 màu trạng thái tối giản khi thật sự cần thiết:
  - Màu Đỏ nhạt (`#fee2e2`, text `#991b1b`): Báo lỗi, xóa dữ liệu, cảnh báo nghiêm trọng.
  - Màu Xanh dương nhạt (`#eff6ff`, text `#1e40af`): Điểm nhấn thao tác chính (Primary Action) hoặc trạng thái Active.

---

## 2. Nguyên Tắc Zero-CDN & Độc Lập Môi Trường (Zero-CDN Rule)
- Toàn bộ file Wireframe HTML **bắt buộc phải là file đơn lẻ (Single-file HTML)**.
- **Nghiêm cấm nhúng CDN bên ngoài:** Không dùng Tailwind CDN, Bootstrap CDN, FontAwesome CDN, Google Fonts online... vì sẽ bị chặn khi khách hàng mở file trong mạng nội bộ (On-premise / Corporate Intranet có firewall).
- Toàn bộ CSS, SVG icons và JavaScript xử lý tương tác phải được viết nội tuyến (inline `<style>` và `<script>`) ngay trong file HTML.
- Sử dụng System Font Stacks: `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;`.

---

## 3. Thể Hiện Đầy Đủ 4 Trạng Thái Màn Hình (4 UI States)
Một mẫu Wireframe chuẩn BA phải cho phép người xem kiểm tra 4 trạng thái của giao diện:
1. **Empty State:** Màn hình khi chưa có dữ liệu (Hiển thị hình minh họa trống, thông điệp hướng dẫn bấm tạo mới).
2. **Loading State:** Giao diện khi đang tải dữ liệu (Skeleton loaders, spinner đơn sắc).
3. **Error State:** Giao diện khi xảy ra lỗi kết nối hoặc validation thất bại (Thông báo inline viền đỏ).
4. **Data-Filled State:** Giao diện hoàn chỉnh với dữ liệu giả lập thực tế (Realistic dummy data).
