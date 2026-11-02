---
name: export
description: "Đóng gói và xuất bản Hồ sơ Tài liệu Đa định dạng (Multi-format Deliverable Packager): gộp toàn bộ SRS, Diagrams, Wireframes thành một gói bàn giao hoàn chỉnh (Single PDF, Unified Markdown, HTML Archive)"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /export — Đóng gói Hồ sơ Bàn giao Dự án (Deliverable Packager) [STANDARD WORKFLOW]

Thu thập, sắp xếp thứ tự và đóng gói toàn bộ các tài liệu phân tán của một tính năng (PRD, SRS, Sơ đồ, Wireframe, User Stories, Test Cases) thành một bộ hồ sơ bàn giao duy nhất, sẵn sàng gửi cho Khách hàng ký nghiệm thu hoặc lưu trữ trong kho lưu trữ phát hành.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện ở giai đoạn kết thúc một mốc dự án (Milestone Sign-off), bàn giao nghiệm thu tính năng hoặc khi đóng gói tài liệu để gửi cho đối tác kiểm toán bảo mật.
- **Đối tượng thụ hưởng**: Khách hàng, Ban Giám đốc, Lead BA, Project Manager, Audit Team.
- **Giá trị cốt lõi**: Chấm dứt tình trạng gửi cho khách hàng một đống link rời rạc gây khó khăn khi duyệt; gom toàn bộ nội dung thành một tài liệu mạch lạc có bìa, mục lục, đánh số trang và đầy đủ các sơ đồ hình ảnh.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/export [tên_tính_năng_hoặc_toàn_dự_án] [định_dạng: single-doc | html-bundle | zip-archive]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ thư mục `docs/{feature}/`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/05-srs-ieee-830.md` — Thứ tự trình bày chuẩn tài liệu kỹ thuật.
- `rules/19-document-versioning-rules.md` — Đóng dấu phiên bản tài liệu phát hành chính thức.

## Biểu mẫu tham chiếu (Template)
- Tổng hợp toàn bộ hồ sơ từ `_templates/08-srs.md` và các phụ lục liên quan.

## Vị trí lưu tệp mặc định
- `docs/releases/{feature}-v{version}-deliverable.md` (hoặc `dist/`)

## Quy trình thực thi chi tiết
1. **Quét & Sắp xếp Thứ tự Trình bày Logic**:
   - Thiết lập cấu trúc bộ hồ sơ hoàn chỉnh theo thứ tự nghiệp vụ:
     1. Trang bìa (Cover Page): Tên dự án, Tên tính năng, Phiên bản, Tác giả, Ngày phát hành.
     2. Lịch sử sửa đổi (Revision History theo Rule 19).
     3. Bảng mục lục tổng hợp (Executive Table of Contents).
     4. Phần 1: Tuyên ngôn Tầm nhìn & Phạm vi (PRD / Scope Summary).
     5. Phần 2: Đặc tả Kỹ thuật Hệ thống Chi tiết (SRS IEEE 830: FR, BR, ERR, NFR).
     6. Phần 3: Sơ đồ Kiến trúc & Luồng Tương tác (Sequence, Activity, State, ERD).
     7. Phần 4: Thiết kế Giao diện & Wireframes (Screenshots / HTML links).
     8. Phần 5: Backlog User Stories & Acceptance Criteria.
     9. Phần 6: Báo cáo Đảm bảo Chất lượng (Test Cases & Ma trận Truy vết RTM).
2. **Nhúng Hình ảnh & Đường dẫn Tương đối Nội bộ (Asset Resolution)**:
   - Đảm bảo toàn bộ các liên kết hình ảnh sơ đồ (`.svg`, `.png`) được trỏ đúng đường dẫn tương đối, không bị lỗi gãy ảnh khi copy thư mục sang máy khác.
3. **Gộp Nội dung Thành Một File Duy nhất (Single Unified Deliverable)**:
   - Hợp nhất toàn bộ nội dung thành file `docs/releases/{feature}-v{version}-deliverable.md`.
4. **Cung cấp Lệnh Biên dịch sang PDF / Docx**:
   - Hướng dẫn lệnh chạy với Pandoc hoặc công cụ chuyển đổi:
     ```bash
     # Xuất sang file PDF chuyên nghiệp có mục lục và số trang:
     pandoc docs/releases/{feature}-deliverable.md -o docs/releases/{feature}-spec.pdf --toc
     ```
5. **Ghi tệp**:
   - Lưu vào `docs/releases/{feature}-v{version}-deliverable.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bộ tài liệu gộp đầy đủ các thành phần từ PRD $
ightarrow$ SRS $
ightarrow$ Diagrams $
ightarrow$ Stories $
ightarrow$ Test Cases.
- [ ] Có trang bìa chuyên nghiệp, bảng Revision History và Mục lục tổng hợp.
- [ ] Toàn bộ các đường link hình ảnh và sơ đồ hoạt động hoàn hảo, không bị đứt gãy.
- [ ] Văn phong nhất quán xuyên suốt tài liệu từ đầu đến cuối.
