---
name: userstory
description: "Bóc tách và soạn thảo danh mục User Story chuẩn INVEST: định dạng Connextra, phân tách story nhỏ vừa vặn sprint, gán Story Points, định nghĩa Definition of Done và độ ưu tiên P0/P1/P2"
metadata:
  phase: 04-usecase-story
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /userstory — Bóc tách Backlog User Story Chuẩn INVEST 🌟 [CORE WORKFLOW]

Chuyển hóa các yêu cầu kỹ thuật và ca sử dụng phức tạp thành danh mục User Story hướng giá trị người dùng theo đúng nguyên tắc INVEST của Agile Scrum, sẵn sàng đưa vào Sprint Planning và quản lý trên Jira.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thực thi sau khi đã có SRS hoặc Use Case, cần chuẩn bị backlog cho các Sprint phát triển phần mềm Agile.
- **Đối tượng thụ hưởng**: Scrum Master, Developers, QA Engineers, Product Owner.
- **Giá trị cốt lõi**: Tránh tạo ra các câu story kỹ thuật vô nghĩa ("Làm API X", "Tạo bảng DB Y"), đảm bảo mỗi Story mang lại một mẩu giá trị kiểm thử độc lập được cho người dùng cuối và đội ngũ dev có thể hoàn thành trong 1 sprint.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/userstory [tên_tính_năng_hoặc_use_case] [đường_dẫn_file_srs]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu SRS (`docs/{feature}/srs/spec.md`) hoặc Use Case tương ứng.
  - Phân loại Actor từ Rule 17.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ User Story với mã yêu cầu chức năng FR.
- `rules/07-invest-user-story.md` — 6 tiêu chí kiểm định INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable).
- `rules/16-ambiguity-detection-rules.md` — Loại bỏ từ ngữ mơ hồ trong phần giá trị.
- `rules/17-actor-role-definition.md` — Tên Persona chính xác trong câu story.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/27-userstory.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/userstories/backlog.md`

## Quy trình thực thi chi tiết
1. **Phân rã Tính năng thành Story Độc lập (Story Splitting Techniques)**:
   - Áp dụng các kỹ thuật chẻ nhỏ story chuyên nghiệp:
     - *Chẻ theo luồng công việc (Workflow Steps)*: Tách Đăng ký bằng Email riêng, Google SSO riêng.
     - *Chẻ theo quy tắc nghiệp vụ (Business Rule Variations)*: Tách Thanh toán chuẩn riêng, Thanh toán có mã giảm giá riêng.
     - *Chẻ theo ranh giới dữ liệu (Data Boundaries)*: Tách Xem danh sách cơ bản riêng, Bộ lọc nâng cao riêng.
     - *Chẻ theo Happy Path vs Exception*: Luồng thành công làm trước, luồng xử lý lỗi phức tạp làm sau.
2. **Soạn thảo Cấu trúc Câu Chuẩn Connextra**:
   - `Là một [Actor / Persona cụ thể theo Rule 17]`
   - `Tôi muốn [Thực hiện hành động hoặc trải nghiệm tính năng gì]`
   - `Để [Nhận được giá trị kinh doanh hoặc giải quyết nỗi đau gì]`.
3. **Gán Mã Định danh & Độ ưu tiên**:
   - Gán mã: `US-[MODULE]-[SEQ]` (ví dụ: `US-PAY-001`).
   - Phân loại ưu tiên: P0 (Must Have), P1 (Should Have), P2 (Nice to Have).
4. **Kiểm định Chặt chẽ 6 Tiêu chí INVEST (Rule 07)**:
   - **I - Independent**: Story có thể deploy độc lập được không?
   - **N - Negotiable**: Đã chừa không gian để Dev thảo luận giải pháp chưa?
   - **V - Valuable**: Có mang lại giá trị cho người dùng không?
   - **E - Estimable**: Đội kỹ thuật có đủ thông tin để ước lượng không?
   - **S - Small**: Có đủ nhỏ để xong trong 1 sprint (1-5 Story Points) không?
   - **T - Testable**: Có tiêu chí nghiệm thu rõ ràng để QA test không?
5. **Ước tính Story Points & Định nghĩa Definition of Done (DoD)**:
   - Ước tính Fibonacci (1, 2, 3, 5, 8). Nếu quá 8 điểm $ightarrow$ Bắt buộc phải chẻ nhỏ tiếp.
   - Thiết lập DoD: Code review approved, Unit test >= 80%, Pass AC kịch bản.
6. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/27-userstory.md` và lưu vào `docs/{feature}/userstories/backlog.md`.
   - Gợi ý người dùng chạy tiếp `/ac` để viết kịch bản Acceptance Criteria.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] 100% User Stories tuân thủ đúng cú pháp Connextra: Là một... Tôi muốn... Để...
- [ ] Actor trong story là vai trò cụ thể, không dùng từ chung chung "người dùng".
- [ ] Phần "Để..." thể hiện rõ giá trị kinh doanh thực tế, không lặp lại phần "Tôi muốn".
- [ ] Đạt toàn bộ 6 tiêu chí INVEST theo Rule 07, không có Story quá 8 điểm.
- [ ] Ánh xạ trực tiếp với mã `FR-` tương ứng để phục vụ ma trận truy vết RTM.
