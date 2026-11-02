---
name: prd
description: "Soạn thảo tài liệu Product Requirements Document (PRD) toàn diện: tầm nhìn sản phẩm, personas, mục tiêu kinh doanh KPIs, bóc tách danh mục tính năng MVP và In/Out-of-Scope"
metadata:
  phase: 01-planning
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /prd — Đặc tả Yêu cầu Sản phẩm (Product Requirements Document) 🌟 [CORE WORKFLOW]

Khởi tạo tài liệu PRD định hình tầm nhìn sản phẩm, phân tích chân dung người dùng, xác định mục tiêu kinh doanh đo lường được và phân rã danh mục tính năng chiến lược trước khi bước vào chi tiết kỹ thuật.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi khởi động một sản phẩm/phân hệ mới hoặc tái cấu trúc quy mô lớn từ ý tưởng sơ khởi của Founder/CPO/Stakeholders.
- **Đối tượng thụ hưởng**: Product Manager, Technical Lead, Solution Architect, Business Stakeholders và Development Team.
- **Giá trị cốt lõi**: Đảm bảo toàn bộ đội ngũ hiểu chung một tầm nhìn sản phẩm, ngăn ngừa tình trạng trượt phạm vi (Scope Creep) và lãng phí nguồn lực kỹ thuật vào các tính năng không mang lại giá trị kinh doanh.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/prd [tên_sản_phẩm] [mô_tả_ý_tưởng_hoặc_file_nguồn]`
- **Dữ liệu đầu vào cần có**:
  - Tên sản phẩm / phân hệ nghiệp vụ mục tiêu.
  - Vấn đề cốt lõi của người dùng hoặc bài toán thị trường cần giải quyết.
  - Các mục tiêu kinh doanh (KPIs/OKRs) mong đợi từ phía lãnh đạo.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Quy ước đặt mã và mô tả Functional Requirements.
- `rules/16-ambiguity-detection-rules.md` — Bộ lọc từ ngữ mơ hồ định tính trong mục tiêu và tính năng.
- `rules/17-actor-role-definition.md` — Định nghĩa Personas và phân loại Actor chính / phụ.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.
- `rules/19-document-versioning-rules.md` — Quản lý phiên bản SemVer và Revision History.

## Biểu mẫu tham chiếu (Template)
- `_templates/01-prd.md`

## Vị trí lưu tệp mặc định
- `docs/{product_name}/01-prd.md`

## Quy trình thực thi chi tiết
1. **Thu thập bối cảnh & Khung mục tiêu kinh doanh**:
   - Xác định rõ tầm nhìn (Vision Statement) và định vị sản phẩm (Value Proposition).
   - Thiết lập các chỉ số thành công (Success Metrics) định lượng: ví dụ tăng tỷ lệ chuyển đổi +15%, giảm thời gian xử lý đơn từ 20 phút xuống 3 phút.
2. **Xác định chân dung người dùng (User Personas)**:
   - Áp dụng Rule 17 phân tách Primary Personas (người dùng trực tiếp mang lại doanh thu) và Secondary Personas (Admin, CSKH, Kế toán).
   - Mô tả Pain Points, Goals, Context và Tech-savviness cho từng đối tượng.
3. **Phân rã danh mục tính năng & Xác định Scope**:
   - Liệt kê bảng danh mục tính năng theo phân hệ nghiệp vụ, gán mã định danh phân cấp `FR-[MODULE]-[FEATURE]-[SEQ]` theo Rule 01.
   - Phân cấp ưu tiên chặt chẽ: P0 (Must Have - Điều kiện tiên quyết MVP), P1 (Should Have - Quan trọng), P2 (Nice to Have - Đợt sau).
   - Thiết lập ranh giới rõ ràng: In-Scope (Làm trong giai đoạn này) vs Out-of-Scope (Tuyệt đối không làm trong giai đoạn này).
4. **Kiểm tra và thanh lọc độ mơ hồ (Ambiguity Filtering)**:
   - Rà soát toàn bộ văn bản theo Rule 16, loại bỏ các từ cảm tính (*"hệ thống nhanh chóng"*, *"giao diện thân thiện"*, *"bảo mật tối đa"*), thay bằng SLA kỹ thuật cụ thể.
5. **Ghi tệp & Cập nhật Metadata**:
   - Thêm YAML frontmatter theo Rule 18, bổ sung bảng Revision History theo Rule 19 và lưu vào `docs/{product_name}/01-prd.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Tuyên ngôn tầm nhìn sản phẩm và Value Proposition rõ ràng, phân biệt được với đối thủ cạnh tranh.
- [ ] Chỉ số thành công (Success Metrics/KPIs) đo lường được bằng số liệu cụ thể, không dùng từ định tính.
- [ ] Phân loại rõ ràng In-Scope và Out-of-Scope để bảo vệ phạm vi sprint/release.
- [ ] Toàn bộ tính năng cốt lõi được gắn mã định danh `FR-` và đánh trọng số ưu tiên P0/P1/P2.
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) và bảng Revision History (Rule 19) ở đầu tài liệu.
