---
name: prd-epic
description: "Bóc tách 1 tính năng hoặc phân hệ lớn thành Epic: phân rã danh mục Capabilities, đánh trọng số ưu tiên P0/P1/P2, thiết lập ma trận phụ thuộc và định hình ranh giới MVP"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /prd-epic — Đặc tả Phân rã Epic Tính năng [STANDARD WORKFLOW]

Chuyển hóa một đề mục tính năng cấp cao từ PRD thành một Epic hoàn chỉnh với cấu trúc phân rã các năng lực cốt lõi (Capabilities), xác định điều kiện hoàn thành (DoD) và chuẩn bị đầu vào sẵn sàng cho việc phân rã User Story.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi một tính năng trong PRD có độ phức tạp lớn (ví dụ: "Module Thanh toán Đa kênh", "Hệ thống Quản lý Tồn kho Tự động", "Module Khuyến mãi Đa tầng") cần được phân nhỏ thành các phần việc có thể lên kế hoạch sprint.
- **Đối tượng thụ hưởng**: Product Owner, Tech Lead, Business Analyst, Scrum Master.
- **Giá trị cốt lõi**: Ngăn ngừa việc tạo ra các User Story quá to (Epic disguised as Story), đảm bảo đội kỹ thuật nhìn rõ các năng lực thành phần cần xây dựng mà không bị quá tải.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/prd-epic [tên_phân_hệ_epic] [mô_tả_năng_lực_yêu_cầu]`
- **Dữ liệu đầu vào cần có**:
  - Mã phân hệ và mục tiêu tính năng từ tài liệu PRD (`docs/{product_name}/01-prd.md`).
  - Danh sách các bên liên quan và phân quyền người dùng tương ứng.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Mã hóa danh mục FR thành phần của Epic.
- `rules/07-invest-user-story.md` — Chuẩn bị cấu trúc phân rã sẵn sàng cho INVEST.
- `rules/16-ambiguity-detection-rules.md` — Chặn từ ngữ mơ hồ định tính trong tiêu chuẩn Epic.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/07-prd-epic.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/07-epic-breakdown.md`

## Quy trình thực thi chi tiết
1. **Định danh Epic & Tuyên bố Mục tiêu (Epic Statement)**:
   - Gán mã định danh `EPIC-[MODULE]-[SEQ]` (ví dụ: `EPIC-PAY-001`: Thanh toán Đa kênh Trực tuyến).
   - Tuyên ngôn giá trị Epic: "Epic này nhằm cung cấp năng lực [Hành động] cho [Đối tượng], giúp giải quyết [Vấn đề]".
2. **Phân rã Danh mục Năng lực (Capability Decomposition)**:
   - Bóc tách Epic thành 3-6 nhóm năng lực con (Sub-capabilities).
   - Ví dụ với Epic Thanh toán:
     - Capability 1: Tích hợp Cổng VNPay / MoMo qua SDK / Webhook.
     - Capability 2: Lưu trữ và mã hóa thẻ Tokenization theo PCI-DSS.
     - Capability 3: Tự động đối soát giao dịch và hoàn tiền (Reconciliation & Refund).
3. **Phân bổ Trọng số Ưu tiên (MoSCoW / P0-P1-P2)**:
   - Gán mức độ ưu tiên theo Rule 01 cho từng Capability: Must Have (MVP), Should Have (Phase 2), Could Have (Phase 3).
4. **Xác lập Ranh giới Kỹ thuật & Tích hợp (Architectural Boundaries)**:
   - Xác định rõ các dịch vụ backend, microservices hoặc cơ sở dữ liệu sẽ bị tác động.
   - Liệt kê các bên thứ ba (Third-party vendors) cần ký hợp đồng API hoặc tích hợp SDK.
5. **Định nghĩa Tiêu chuẩn Nghiệm thu Toàn diện của Epic (Epic Acceptance Criteria)**:
   - Các chỉ số hiệu năng và nghiệp vụ để đóng Epic (ví dụ: 100% giao dịch thanh toán thành công trả về kết quả trong < 2 giây, tỷ lệ đối soát tự động đạt 99.5%).
6. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/07-prd-epic.md` và lưu vào `docs/{feature}/07-epic-breakdown.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Epic có mã định danh `EPIC-[MODULE]-[SEQ]` và tuyên ngôn mục tiêu rõ ràng.
- [ ] Phân rã thành các Capabilities độc lập, không bị chồng chéo phạm vi.
- [ ] Đánh trọng số ưu tiên rõ ràng (P0/P1/P2) cho từng Capability thành phần.
- [ ] Liệt kê đầy đủ các ranh giới kiến trúc và dịch vụ bên thứ ba bị tác động.
- [ ] Thiết lập Epic Acceptance Criteria đo lường được trước khi chuyển sang lệnh `/userstory`.
