---
name: figma
description: "Soạn thảo Đặc tả Bàn giao Thiết kế Figma (Figma Handoff Spec): quy chuẩn Design Tokens (Colors, Typography, Spacing), Auto-Layout, phân cấp Component Variants và các trạng thái Default/Hover/Active/Disabled"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /figma — Đặc tả Bàn giao Thiết kế Figma (Figma Handoff Spec) [STANDARD WORKFLOW]

Xây dựng tài liệu đặc tả bàn giao kỹ thuật cho bản vẽ Figma (Design Handoff Specification), chuẩn hóa hệ thống Design Tokens, quy định cấu trúc Auto-Layout, danh mục Component Variants và các ràng buộc tương tác cho UI/UX Designer và Frontend Developer.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi chuyển giao giữa giai đoạn phân tích nghiệp vụ của BA sang giai đoạn thiết kế UI/UX trên Figma, hoặc từ Figma sang cho lập trình viên cắt giao diện HTML/CSS.
- **Đối tượng thụ hưởng**: UI/UX Designer, Frontend Developer, Design System Lead.
- **Giá trị cốt lõi**: Xóa bỏ hoàn toàn khoảng cách hiểu nhầm giữa bản vẽ Figma và code thực tế; đảm bảo bản vẽ có đầy đủ Design Tokens, tuân thủ lưới 4px/8px và không bị thiếu các trạng thái tương tác ngầm (Hover, Active, Error, Disabled).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/figma [tên_màn_hình_hoặc_component] [đường_dẫn_hoặc_mô_tả]`
- **Dữ liệu đầu vào cần có**:
  - Wireframe hoặc User Flow của tính năng.
  - Hướng dẫn nhận diện thương hiệu hoặc Design System của doanh nghiệp.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/04-nfr-standards.md` — Chuẩn tiếp cận WCAG 2.1 AA (Tỷ lệ tương phản màu >= 4.5:1).
- `rules/13-wireframe-html-guidelines.md` — Tính nhất quán bố cục giao diện.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/34-figma-spec.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/ui/figma-spec.md`

## Quy trình thực thi chi tiết
1. **Đặc tả Hệ thống Design Tokens**:
   - **Bảng màu (Color Palette & Roles)**:
     - Primary Brand Color: `#2563EB` (Blue 600).
     - Surface / Background: `#FFFFFF` (Surface 0), `#F8FAFC` (Surface 1).
     - Text Neutral: `#0F172A` (Primary Text), `#64748B` (Secondary Muted).
     - Semantic Status: `#16A34A` (Success), `#DC2626` (Error), `#EAB308` (Warning).
     - *Kiểm tra Tương phản*: Bắt buộc tỷ lệ tương phản Text/Background đạt tối thiểu 4.5:1 (WCAG AA).
   - **Kiểu chữ (Typography Scale)**:
     - Font Family: Inter / Roboto / Be Vietnam Pro.
     - Scale: H1 (32px/40px bold), H2 (24px/32px semibold), Body (14px/20px regular), Caption (12px/16px regular).
   - **Khoảng cách & Lưới (Spacing & Layout Grid)**:
     - Hệ thống bội số 4px/8px: `space-1` (4px), `space-2` (8px), `space-4` (16px), `space-6` (24px), `space-8` (32px).
2. **Quy chuẩn Auto-Layout & Khả năng Co giãn (Responsive Behaviors)**:
   - Mọi frame trên Figma bắt buộc sử dụng Auto-Layout (`Shift + A`).
   - Khai báo rõ ràng chế độ co giãn: `Fill container` (cho ô nhập và nội dung), `Hug contents` (cho nút bấm và tag nhãn), `Fixed width` (cho avatar và cột số thứ tự).
3. **Danh mục Component Variants & 6 Trạng thái Bắt buộc**:
   - Mọi nút bấm, input field hoặc card đều phải có đầy đủ 6 biến thể trạng thái trong Component Set:
     - `Default`: Trạng thái ban đầu chờ người dùng.
     - `Hover`: Con trỏ chuột rê vào (đổi màu nền nhẹ +10%).
     - `Focused`: Con trỏ đang nằm trong ô input (viền outline 2px có màu accent).
     - `Active / Pressed`: Người dùng đang nhấn giữ chuột.
     - `Disabled`: Nút bị vô hiệu hóa (nền xám nhạt, độ mờ opacity 50%, cấm click).
     - `Error`: Trạng thái lỗi (viền đỏ, có icon cảnh báo và text helper màu đỏ).
4. **Ghi tệp**:
   - Sử dụng template `_templates/34-figma-spec.md` và lưu vào `docs/{feature}/ui/figma-spec.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bảng mã màu có đầy đủ giá trị HEX và tên token ngữ nghĩa (Semantic Tokens).
- [ ] Toàn bộ các màu chữ đều thỏa mãn chuẩn tương phản WCAG 2.1 AA (>= 4.5:1).
- [ ] Thang đo Typography và Spacing tuân thủ nghiêm ngặt hệ thống bội số 4px/8px.
- [ ] Yêu cầu 100% components có đầy đủ các biến thể trạng thái (Default, Hover, Focus, Active, Disabled, Error).
- [ ] Cung cấp hướng dẫn Auto-Layout cụ thể cho Designer thao tác trên Figma.
