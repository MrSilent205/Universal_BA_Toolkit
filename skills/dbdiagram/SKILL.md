---
name: dbdiagram
description: "Mô hình hóa cơ sở dữ liệu bằng cú pháp DBML (Database Markup Language): tương thích trực tiếp với dbdiagram.io, hỗ trợ bảng, enums, khóa ngoại refs và index"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /dbdiagram — Thiết kế Cơ sở Dữ liệu Chuẩn DBML (dbdiagram.io) [STANDARD WORKFLOW]

Khởi tạo cấu trúc schema cơ sở dữ liệu bằng ngôn ngữ chuẩn DBML (Database Markup Language), hỗ trợ chia sẻ trực quan, import vào dbdiagram.io, tự động tạo tài liệu dbdocs và xuất ngược ra file SQL DDL (PostgreSQL, MySQL, SQL Server).

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thường dùng trong giai đoạn thiết kế kỹ thuật dữ liệu, giúp BA và Dev có thể nhanh chóng paste vào trang `dbdiagram.io` để cùng thảo luận trực quan với team.
- **Đối tượng thụ hưởng**: Backend Developers, DBA, Data Engineers, Technical BA.
- **Giá trị cốt lõi**: Cú pháp ngắn gọn, trực quan, hỗ trợ quản trị schema dạng code và dễ dàng xuất ra các câu lệnh tạo bảng SQL tự động.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/dbdiagram [tên_phân_hệ] [danh_sách_thực_thể]`
- **Dữ liệu đầu vào cần có**:
  - Danh mục trường, kiểu dữ liệu và mối quan hệ bảng từ Rule 09.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/09-data-dictionary-standard.md` — Chuẩn đặt tên bảng, cột và định dạng kiểu dữ liệu.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/24-dbdiagram.dbml`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/schema.dbml`

## Quy trình thực thi chi tiết
1. **Định nghĩa Các Kiểu Dữ liệu Liệt kê (Enum Definitions)**:
   - Khai báo các enum chuẩn:
     ```dbml
     Enum order_status {
       draft
       pending_payment
       paid
       shipping
       completed
       cancelled
     }
     ```
2. **Khai báo Các Bảng Dữ liệu (Table Specifications)**:
   - Định nghĩa bảng với các ràng buộc:
     ```dbml
     Table users {
       id uuid [pk, default: `gen_random_uuid()`]
       email varchar(255) [unique, not null]
       password_hash varchar(255) [not null]
       created_at timestamptz [default: `now()`]
       note: 'Bảng lưu trữ tài khoản người dùng'
     }
     ```
3. **Khai báo Khóa Ngoại & Quan hệ (References)**:
   - Sử dụng cú pháp Ref chuẩn xác:
     ```dbml
     Ref: orders.user_id > users.id // Many-to-one
     Ref: order_items.order_id > orders.id
     Ref: order_items.product_id > products.id
     ```
4. **Tạo Bảng Nhóm Logic (TableGroup)**:
   - Gom các bảng theo phân hệ: `TableGroup authentication { users, sessions, roles, user_roles }`.
5. **Ghi tệp**:
   - Sử dụng template `_templates/24-dbdiagram.dbml` và lưu vào `docs/{feature}/srs/schema.dbml`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cú pháp DBML chuẩn xác, không có lỗi cú pháp khi paste vào dbdiagram.io.
- [ ] Khai báo đầy đủ các trường khóa chính (`pk`), `not null`, `unique`.
- [ ] Toàn bộ các liên kết khóa ngoại (`Ref`) chỉ đúng bảng và cột đích.
- [ ] Gom nhóm các bảng liên quan bằng `TableGroup`.
