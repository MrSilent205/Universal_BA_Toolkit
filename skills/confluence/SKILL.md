---
name: confluence
description: "Chuyển đổi và xuất bản Hồ sơ Đặc tả sang Confluence (Confluence Wiki-Ready Format): tối ưu hóa cấu trúc cây trang (Page Tree), định dạng macro (Info, Warning, Code), bảng biểu và sơ đồ tương thích Confluence Cloud"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /confluence — Xuất bản Hồ sơ Đặc tả sang Confluence Wiki [STANDARD WORKFLOW]

Chuyển đổi toàn bộ hồ sơ tài liệu đặc tả Markdown trong dự án sang định dạng tối ưu cho Confluence Cloud / Confluence Data Center, tổ chức cấu trúc cây trang (Page Tree) phân cấp và áp dụng hệ thống Confluence Macros chuyên nghiệp.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi doanh nghiệp lưu trữ tài liệu tập trung trên Atlassian Confluence, cần xuất bản bộ tài liệu SRS, Kiến trúc và Quy trình lên không gian làm việc (Confluence Space) của dự án.
- **Đối tượng thụ hưởng**: Toàn bộ các bên liên quan trong công ty, Stakeholders, Ban Lãnh đạo, Đội ngũ Phát triển.
- **Giá trị cốt lõi**: Giữ nguyên tính chuyên nghiệp của tài liệu khi đưa lên Confluence; tự động chuyển đổi các khối cảnh báo thành Confluence Info/Warning Panels; tạo mục lục tự động (Table of Contents macro) và nhúng sơ đồ hiển thị mượt mà.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/confluence [tên_tính_năng_hoặc_thư_mục] [không_gian_confluence_space]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả SRS (`docs/{feature}/srs/spec.md`).
  - Toàn bộ sơ đồ luồng liên quan trong `docs/{feature}/`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/05-srs-ieee-830.md` — Cấu trúc mục lục phân cấp chuẩn SRS.
- `rules/18-knowledge-graph-metadata.md` — Ánh xạ metadata sang Confluence Page Properties.
- `rules/19-document-versioning-rules.md` — Lịch sử cập nhật phiên bản tài liệu.

## Biểu mẫu tham chiếu (Template)
- `_templates/08-srs.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/confluence/{page_name}.confluence.md` (hoặc `docs/confluence-export/`)

## Quy trình thực thi chi tiết
1. **Thiết lập Cấu trúc Cây Trang Phân cấp (Confluence Page Tree)**:
   - Trang Cha (Parent Page): `[Dự án] Hồ sơ Đặc tả Tính năng`
     - Trang Con 1: `1. Tổng quan & Phạm vi Nghiệp vụ (PRD / Discovery)`
     - Trang Con 2: `2. Đặc tả Kỹ thuật Hệ thống (SRS IEEE 830)`
     - Trang Con 3: `3. Sơ đồ Tương tác & Kiến trúc Dữ liệu (Diagrams)`
     - Trang Con 4: `4. Backlog User Stories & Acceptance Criteria`
     - Trang Con 5: `5. Hồ sơ Kiểm thử QA & Ma trận Lỗi`
2. **Chuyển đổi Khối Cảnh báo sang Định dạng Confluence Callouts**:
   - `> [!NOTE]` $
ightarrow$ Macro `{info:title=Ghi chú Nghiệp vụ}`.
   - `> [!WARNING]` $
ightarrow$ Macro `{warning:title=Cảnh báo Quan trọng}`.
   - `> [!IMPORTANT]` $
ightarrow$ Macro `{panel:title=Ràng buộc Bắt buộc}`.
3. **Bổ sung Confluence Macros Tự động**:
   - Đầu mỗi trang: Bổ sung Macro `{toc:maxLevel=3}` (Table of Contents).
   - Phần đầu trang: Bổ sung Macro `{status:colour=Green|title=APPROVED}` hoặc `{status:colour=Yellow|title=IN REVIEW}`.
   - Bảng thuộc tính trang: Bổ sung Macro `Page Properties` lưu giữ Metadata (ID, Domain, Version, Author, Last Updated).
4. **Nhúng Sơ đồ Tương thích**:
   - Xuất các sơ đồ Mermaid sang hình ảnh SVG/PNG hoặc giữ nguyên khối `{mermaid}` nếu Confluence có cài addon Mermaid Viewer.
5. **Ghi tệp**:
   - Lưu vào `docs/{feature}/confluence/{page_name}.confluence.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phân bổ cấu trúc cây trang hợp lý, dễ điều hướng trên thanh sidebar của Confluence.
- [ ] Toàn bộ các bảng biểu Markdown hiển thị chuẩn xác, không bị vỡ cột khi paste vào Confluence Editor.
- [ ] Sử dụng đúng cú pháp các macro phổ biến (TOC, Info panel, Warning panel, Status badges).
- [ ] Có bảng Page Properties lưu giữ metadata phục vụ việc báo cáo tổng hợp bằng Page Properties Report.
