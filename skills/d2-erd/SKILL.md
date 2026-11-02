---
name: d2-erd
description: "Mô hình hóa quan hệ cơ sở dữ liệu chất lượng cao bằng ngôn ngữ D2 (Declarative Diagramming): hỗ trợ cấu trúc bảng nested container, kết nối quan hệ rõ nét và giao diện hiện đại"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /d2-erd — Sơ đồ Dữ liệu D2 Hiện đại (High-Precision D2 ERD) [STANDARD WORKFLOW]

Mô hình hóa cấu trúc dữ liệu quan hệ bằng ngôn ngữ khai báo D2 (D2lang), tận dụng khả năng đóng gói bảng (Container nesting), layout tự động mạnh mẽ (Tala / Dagre engine) và hiển thị trực quan các ràng buộc kiểu dữ liệu cho tài liệu kỹ thuật cao cấp.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi cần xuất bản tài liệu kiến trúc dữ liệu cho khách hàng quốc tế hoặc slide báo cáo cao cấp yêu cầu đồ họa đẹp, sắc nét, không bị chồng chéo nhãn như một số thư viện khác.
- **Đối tượng thụ hưởng**: Solution Architect, Lead Developer, Technical Stakeholder.
- **Giá trị cốt lõi**: Đem lại sơ đồ dữ liệu có tính thẩm mỹ và độ chính xác cao nhất, dễ dàng quản lý dạng code (Diagram-as-Code) trong git repository.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/d2-erd [tên_phân_hệ] [danh_sách_bảng_dữ_liệu]`
- **Dữ liệu đầu vào cần có**:
  - Danh sách thực thể, thuộc tính và khóa từ Rule 09 hoặc SRS.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/09-data-dictionary-standard.md` — Chuẩn hóa kiểu dữ liệu và thuộc tính bảng.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/21-erd-d2.d2`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/erd.d2`

## Quy trình thực thi chi tiết
1. **Khai báo Khung Thiết kế & Theme D2**:
   - Cấu hình layout engine và chủ đề màu sắc hiện đại (ví dụ: `direction: right`, `vars.theme: neutral-light`).
2. **Khai báo Bảng bằng Cú pháp Đối tượng D2 (SQL Table Syntax)**:
   - Sử dụng thẻ `shape: sql_table` để hiển thị cấu trúc bảng chuyên nghiệp:
     ```d2
     users: {
       shape: sql_table
       id: uuid {constraint: primary_key}
       email: varchar(255) {constraint: unique}
       password_hash: varchar(255)
       status: varchar(50)
       created_at: timestamptz
     }
     ```
3. **Thiết lập Kết nối Quan hệ & Lực lượng (Relationships & Labels)**:
   - Khai báo đường liên kết với nhãn bản số rõ ràng:
     ```d2
     orders.user_id -> users.id: "1 to N"
     order_items.order_id -> orders.id: "1 to N"
     order_items.product_id -> products.id: "1 to N"
     ```
4. **Nhóm Bảng theo Phân hệ Nghiệp vụ (Logical Packaging)**:
   - Tận dụng tính năng container của D2 để gom nhóm các bảng liên quan: `auth_module: { ... }`, `order_module: { ... }`.
5. **Ghi tệp**:
   - Sử dụng template `_templates/21-erd-d2.d2` và lưu vào `docs/{feature}/srs/erd.d2`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cú pháp D2 hợp lệ, sẵn sàng biên dịch bằng CLI `d2` thành SVG/PNG/PDF.
- [ ] Sử dụng đúng `shape: sql_table` với các ràng buộc `primary_key`, `unique`, `foreign_key`.
- [ ] Thể hiện rõ ràng các liên kết quan hệ giữa các bảng.
- [ ] Bố cục sơ đồ cân đối, có phân cụm container theo phân hệ chức năng.
