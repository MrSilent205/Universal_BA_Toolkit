---
name: wireframe-ascii
description: "Phác thảo bố cục giao diện nhanh bằng ký tự ASCII (ASCII Wireframe): hiển thị trực tiếp trong terminal hoặc chat markdown, làm rõ phân bổ layout, trường nhập liệu, nút bấm và thứ tự ưu tiên thị giác"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /wireframe-ascii — Phác thảo Giao diện Nhanh Bằng Ký tự ASCII [STANDARD WORKFLOW]

Phác họa cấu trúc bố cục màn hình (Layout Wireframe) bằng các khối ký tự hộp ASCII (`+---+`, `| |`, `[Button]`, `( ) Radio`, `[x] Checkbox`, `[...] Input`) ngay trong môi trường Markdown/Terminal, cho phép các bên liên quan duyệt nhanh bố cục mà không cần đợi thiết kế đồ họa.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Dùng trong quá trình brainstorm nhanh, thảo luận tức thì với Stakeholder hoặc khi cần phản hồi tức thì trong cửa sổ chat về vị trí đặt các nút bấm và form nhập liệu.
- **Đối tượng thụ hưởng**: Business Analyst, Product Owner, Frontend Developer.
- **Giá trị cốt lõi**: Tốc độ phản hồi cực nhanh (dưới 1 phút), chi phí chỉnh sửa bằng 0, giúp thống nhất về thứ tự thông tin (Information Hierarchy) trước khi đầu tư thời gian vào code HTML hay vẽ Figma.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/wireframe-ascii [tên_màn_hình_hoặc_mã_SCR] [loại_thiết_bị: mobile | desktop]`
- **Dữ liệu đầu vào cần có**:
  - Danh sách các trường thông tin cần hiển thị từ Data Dictionary hoặc User Story.
  - Loại thiết bị mục tiêu (Mobile portrait 40 cột hoặc Desktop landscape 80-100 cột).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/13-wireframe-html-guidelines.md` — Phân bổ cấu trúc khối ngữ nghĩa (Header, Body, Footer).
- `rules/17-actor-role-definition.md` — Bố cục menu theo phân quyền người dùng.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/30-wireframe-ascii.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/ui/wireframes-ascii.md`

## Quy trình thực thi chi tiết
1. **Xác lập Kích thước Khung Nhìn (Viewport Framing)**:
   - Mobile: Độ rộng tiêu chuẩn 36-40 ký tự.
   - Desktop: Độ rộng tiêu chuẩn 70-80 ký tự.
2. **Sử dụng Bảng Ký hiệu Giao diện Chuẩn (ASCII UI Notation)**:
   - Khung viền ngoài: `+----------------------------------+`
   - Tiêu đề & Header: `| [<-]  XÁC NHẬN THANH TOÁN   [x]  |`
   - Ô nhập văn bản (Input): `| Họ và tên: [ Nguyen Van A      ] |`
   - Ô chọn một (Radio): `| (o) Thẻ ATM nội địa              |`
   - Ô chọn nhiều (Checkbox): `| [x] Đồng ý với điều khoản sử dụng|`
   - Nút bấm chính (Primary CTA): `| [====== TIẾP TỤC THANH TOÁN =====] |`
   - Nút bấm phụ (Secondary): `| [ Hủy bỏ ]                       |`
   - Bảng dữ liệu / Danh sách: `| | Tên SP | SL | Đơn giá |       |`
3. **Mô phỏng Luồng Dữ liệu & Chú thích Bên dưới (Footnotes)**:
   - Dưới mỗi khung ASCII, đánh số chú thích `[1]`, `[2]`, `[3]` giải thích hành vi động:
     - `[1] Input Email`: Validate regex RFC 5322 khi blur.
     - `[2] Nút Tiếp tục`: Disabled khi chưa tick vào ô Đồng ý điều khoản.
4. **Mô phỏng Trạng thái Báo lỗi (Error State ASCII)**:
   - Vẽ thêm biến thể màn hình khi người dùng nhập sai, có viền `! Lỗi !` hoặc inline error message đỏ.
5. **Ghi tệp**:
   - Sử dụng template `_templates/30-wireframe-ascii.md` và lưu vào `docs/{feature}/ui/wireframes-ascii.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bố cục khung ASCII vuông vắn, không bị lệch thụt dòng khi hiển thị trên font monospace.
- [ ] Sử dụng đúng quy ước ký tự chuẩn cho input `[...]`, button `[===]`, radio `(o)`, checkbox `[x]`.
- [ ] Thể hiện rõ thứ tự phân cấp thông tin từ trên xuống dưới (Header $
ightarrow$ Content $
ightarrow$ Action CTA).
- [ ] Kèm theo bảng chú thích hành vi (Footnotes) cho các tương tác người dùng.
