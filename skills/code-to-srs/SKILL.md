---
name: code-to-srs
description: "Dịch ngược mã nguồn hệ thống cũ (Reverse Engineering Source Code) thành tài liệu đặc tả SRS chuẩn mực: trích xuất luồng nghiệp vụ, API endpoints, schema cơ sở dữ liệu và mã lỗi từ mã nguồn"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /code-to-srs — Dịch ngược Mã nguồn thành Đặc tả SRS [STANDARD WORKFLOW]

Đọc và phân tích trực tiếp mã nguồn ứng dụng (Controllers, Services, Models, Migrations, Route handlers), tự động phục hồi lại tài liệu đặc tả kỹ thuật IEEE 830 với độ chính xác 100% theo hành vi thực thi của code.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Dự án kế thừa (Legacy System) hoàn toàn không có tài liệu đặc tả hoặc tài liệu đã lỗi thời trầm trọng so với code thực tế; dự án cần đập đi viết lại (Refactor / Rewrite) sang công nghệ mới.
- **Đối tượng thụ hưởng**: Business Analyst, Solution Architect, Backend Developer, QA Lead.
- **Giá trị cốt lõi**: Khám phá chính xác hành vi thực tế của hệ thống mà không cần ngồi hỏi han phỏng đoán, nắm bắt toàn bộ các validation ẩn, mã lỗi ngầm và các trường dữ liệu thực tế đang vận hành.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/code-to-srs [đường_dẫn_thư_mục_code_hoặc_file] [tên_phân_hệ]`
- **Dữ liệu đầu vào cần có**:
  - Đường dẫn đến file mã nguồn backend: Controllers, Services, Routers, Database Models / Schemas.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Mã hóa logic code thành các FR chuẩn.
- `rules/02-br-naming-convention.md` — Trích xuất các điều kiện if/else, switch/case thành Business Rules.
- `rules/03-err-naming-convention.md` — Trích xuất các exception/error code thành chuẩn ERR.
- `rules/05-srs-ieee-830.md` — Khung tài liệu đặc tả chuẩn IEEE 830.
- `rules/10-api-contract-standards.md` — Chuẩn hóa hợp đồng API trích xuất từ routes.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/14-code-to-srs.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/spec-from-code.md` (hoặc `docs/{feature}/14-code-to-srs.md`)

## Quy trình thực thi chi tiết
1. **Phân tích Cấu trúc & Điểm vào (Entry Points & Route Mapping)**:
   - Quét các file routes/controllers để lập bảng danh mục API endpoints: HTTP Method, URL Path, Middleware xác thực, Controller Action tương ứng.
2. **Trích xuất Mô hình Dữ liệu (Schema & Entity Extraction)**:
   - Quét các file Models / ORM entities / Database Migrations để bóc tách: Tên bảng, danh sách trường, kiểu dữ liệu, khóa chính (PK), khóa ngoại (FK), ràng buộc Unique, Nullable.
3. **Phân tích Logic Nghiệp vụ trong Service Layer (Business Logic Extraction)**:
   - Đọc các hàm xử lý trong Services:
     - Trích xuất các điều kiện validate nhập liệu thành logic Input Validation.
     - Trích xuất các cấu trúc rẽ nhánh `if / else`, `guard clauses`, tính toán chiết khấu, trừ kho thành các Business Rules `BR-[DOMAIN]-[SEQ]`.
4. **Lập Danh mục Mã Lỗi Thực tế (Exception & Error Cataloging)**:
   - Tìm kiếm toàn bộ các đoạn `throw new Exception()`, `return res.status(4xx).json(...)` để xây dựng Ma trận Lỗi với mã `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]`.
5. **Tổng hợp thành Tài liệu SRS IEEE 830 Hoàn chỉnh**:
   - Chuyển ngữ toàn bộ logic kỹ thuật thành văn phong đặc tả nghiệp vụ dễ hiểu cho cả BA và lập trình viên.
   - Sử dụng template `_templates/14-code-to-srs.md` và lưu vào `docs/{feature}/srs/spec-from-code.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Liệt kê đầy đủ 100% các API endpoints được định nghĩa trong mã nguồn quét được.
- [ ] Trích xuất chuẩn xác các điều kiện kiểm tra (validation rules) thành các Functional Requirements.
- [ ] Chuyển hóa toàn bộ các khối lệnh rẽ nhánh if/else phức tạp thành các Business Rules chuẩn `BR-`.
- [ ] Lập bảng mã lỗi thực tế mapping với mã HTTP status code tương ứng trong code.
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) ghi nhận phiên bản commit hoặc đường dẫn mã nguồn gốc.
