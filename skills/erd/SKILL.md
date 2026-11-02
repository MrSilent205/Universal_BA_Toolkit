---
name: erd
description: "Mô hình hóa quan hệ thực thể cơ sở dữ liệu (ERD bằng Mermaid): đặc tả các thực thể, danh sách thuộc tính, kiểu dữ liệu, ràng buộc khóa chính PK, khóa ngoại FK và lực lượng quan hệ (Cardinality)"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /erd — Sơ đồ Quan hệ Thực thể Dữ liệu (Mermaid ERD) [CORE WORKFLOW]

Mô hình hóa cấu trúc dữ liệu quan hệ ở mức logic và vật lý bằng cú pháp Mermaid `erDiagram`, định nghĩa rõ các thuộc tính, kiểu dữ liệu chuẩn, ràng buộc khóa chính/khóa ngoại và bản số quan hệ (Cardinality) giữa các thực thể trong hệ thống.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thực thi khi thiết kế kiến trúc lưu trữ dữ liệu cho tính năng mới, làm cơ sở để lập trình viên tạo bảng database migrations và thiết lập ORM models.
- **Đối tượng thụ hưởng**: Database Administrator (DBA), Backend Developers, Solution Architect, Business Analyst.
- **Giá trị cốt lõi**: Đảm bảo tính toàn vẹn dữ liệu (Data Integrity), chuẩn hóa cơ sở dữ liệu (tối thiểu 3NF), ngăn chặn dư thừa dữ liệu và loại bỏ các lỗi thiết kế quan hệ sai lầm (1-1, 1-n, n-n không qua bảng trung gian).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/erd [tên_phân_hệ] [danh_sách_thực_thể_chính]`
- **Dữ liệu đầu vào cần có**:
  - Danh sách thực thể và thuộc tính nghiệp vụ trích xuất từ PRD/SRS.
  - Từ điển dữ liệu (`rules/09-data-dictionary-standard.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/09-data-dictionary-standard.md` — Quy chuẩn đặt tên bảng, tên cột và kiểu dữ liệu.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/20-erd-mermaid.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/erd.md` (hoặc `docs/{feature}/diagrams/erd.md`)

## Quy trình thực thi chi tiết
1. **Xác định Thực thể & Danh mục Thuộc tính (Entity & Attribute Cataloging)**:
   - Tên thực thể viết hoa số ít hoặc số nhiều nhất quán (ví dụ: `USERS`, `ORDERS`, `ORDER_ITEMS`).
   - Khai báo danh sách thuộc tính kèm kiểu dữ liệu chuẩn: `string`, `int`, `bigint`, `decimal`, `boolean`, `timestamp`, `jsonb`.
   - Gắn nhãn khóa: `PK` cho Khóa chính, `FK` cho Khóa ngoại, `UK` cho Unique Key.
2. **Xác định Lực lượng Quan hệ Chuẩn xác (Cardinality Notation)**:
   - Áp dụng ký hiệu Mermaid Crow's Foot chính xác:
     - `||--||`: Đúng một đến đúng một (One and only one).
     - `||--o{`: Một đến không hoặc nhiều (One to zero-or-more).
     - `||--|{`: Một đến một hoặc nhiều (One to one-or-more).
     - `o|--o{`: Không hoặc một đến không hoặc nhiều (Zero-or-one to zero-or-more).
3. **Xử lý Triệt để Quan hệ Nhiều - Nhiều (Many-to-Many Resolution)**:
   - Tuyệt đối không để quan hệ n-n trực tiếp; bắt buộc tạo bảng liên kết trung gian (Junction Table) chứa 2 FK tham chiếu về 2 bảng gốc kèm các thuộc tính phụ trợ (ví dụ: `ORDER_ITEMS` nối giữa `ORDERS` và `PRODUCTS`, chứa thêm `quantity`, `unit_price`).
4. **Bổ sung Từ điển Dữ liệu Chi tiết (Data Dictionary Table)**:
   - Dưới sơ đồ Mermaid, lập bảng mô tả chi tiết từng cột: Tên trường (Snake_case), Kiểu dữ liệu, Bắt buộc (Nullable: Yes/No), Giá trị mặc định (Default), Ý nghĩa nghiệp vụ.
5. **Ghi tệp & Đề xuất xuất bản đồ họa**:
   - Lưu vào `docs/{feature}/srs/erd.md`.
   - Gợi ý người dùng chạy `/render-diagrams` để xuất bản sơ đồ ERD thành bản vẽ HTML/SVG tuyệt đẹp.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cú pháp Mermaid `erDiagram` hoàn toàn hợp lệ, không lỗi render.
- [ ] Toàn bộ các bảng đều có Khóa chính (`PK`) rõ ràng (ví dụ: `id UUID PK`).
- [ ] Ràng buộc khóa ngoại (`FK`) chỉ rõ bảng tham chiếu đến.
- [ ] 100% quan hệ nhiều - nhiều đã được phân rã qua bảng trung gian (Junction Table).
- [ ] Kèm theo bảng Từ điển dữ liệu (Data Dictionary) chi tiết theo Rule 09.
