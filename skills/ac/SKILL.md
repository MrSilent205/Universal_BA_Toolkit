---
name: ac
description: "Soạn thảo Tiêu chí Chấp nhận (Acceptance Criteria - AC) chuẩn Gherkin BDD: kịch bản Given / When / Then, Scenario Outline với Examples table, bao phủ Happy Path, Negative Path và Edge Cases"
metadata:
  phase: 04-usecase-story
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /ac — Tiêu chí Nghiệm thu Chuẩn Gherkin BDD 🌟 [CORE WORKFLOW]

Xây dựng bộ tiêu chí chấp nhận (Acceptance Criteria) chuẩn hóa dưới dạng kịch bản hành vi BDD (Behavior-Driven Development) cú pháp Gherkin, tạo thành cây cầu kết nối hoàn hảo giữa yêu cầu nghiệp vụ của BA, mã nguồn của Dev và kịch bản tự động hóa của QA.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện cho từng User Story trước khi đưa vào Sprint Backlog để chuẩn bị cho buổi Sprint Planning và làm cơ sở kiểm thử tự động.
- **Đối tượng thụ hưởng**: QA Automation Engineers, Manual Testers, Developers, Product Owner.
- **Giá trị cốt lõi**: Chấm dứt tranh cãi "tính năng này chạy thế này có đúng không" vào cuối sprint; định nghĩa rõ ràng điều kiện ĐẠT (Pass) / KHÔNG ĐẠT (Fail) có thể chạy kiểm thử tự động được (Cucumber, Playwright, SpecFlow).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/ac [mã_user_story] [tên_tính_năng]`
- **Dữ liệu đầu vào cần có**:
  - Mã User Story (`US-xxx`) từ backlog (`docs/{feature}/userstories/backlog.md`).
  - Quy tắc nghiệp vụ (`BR-xxx`) và mã lỗi (`ERR-xxx`) liên quan.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Mã lỗi phản hồi trong bước Then khi xảy ra lỗi.
- `rules/08-gherkin-acceptance-criteria.md` — Tiêu chuẩn cú pháp Gherkin BDD (tối thiểu 3 kịch bản bắt buộc).
- `rules/16-ambiguity-detection-rules.md` — Loại bỏ từ ngữ mơ hồ trong kết quả mong đợi.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/28-acceptance-criteria.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/userstories/acceptance-criteria.md` (hoặc `docs/{feature}/userstories/{story_id}-ac.md`)

## Quy trình thực thi chi tiết
1. **Phân tích Trạng thái Ban đầu & Kỳ vọng Nghiệp vụ**:
   - Đọc kỹ User Story mục tiêu và các Business Rules `BR-xxx` chi phối.
2. **Bắt buộc Soạn thảo Tối thiểu 03 Kịch bản BDD theo Rule 08**:
   - **Kịch bản 1: Thành công (Happy Path)**:
     - Luồng người dùng nhập liệu đúng, hệ thống xử lý hoàn tất và trả về kết quả mỹ mãn.
   - **Kịch bản 2: Lỗi Nghiệp vụ / Thất bại có Kiểm soát (Negative Path)**:
     - Luồng vi phạm ràng buộc dữ liệu hoặc lỗi phân quyền, hệ thống chặn lại và trả về mã lỗi `ERR-xxx` rõ ràng.
   - **Kịch bản 3: Điều kiện Biên & Bảo mật (Boundary & Edge Case)**:
     - Luồng nhập dữ liệu chạm giới hạn (min/max), ký tự đặc biệt, XSS/SQLi payload, hoặc hành vi bấm nút liên tục (Double-click/Race condition).
3. **Áp dụng Kỹ thuật Viết Gherkin Chuẩn (Given - When - Then)**:
   - `Given`: Thiết lập tiền đề trạng thái hệ thống và dữ liệu nền của người dùng (không viết thao tác UI).
   - `When`: Hành động cụ thể do người dùng kích hoạt (bấm xác nhận, submit form).
   - `Then`: Kết quả quan sát được của hệ thống (dữ liệu thay đổi, màn hình hiển thị, email gửi đi).
   - *Quy tắc chống phản mẫu (Anti-pattern)*: Tránh lạm dụng chi tiết UI cụ thể như "Given người dùng click vào thẻ div có id #submit-btn", thay bằng "When người dùng bấm Xác nhận thanh toán".
4. **Sử dụng Scenario Outline cho Dữ liệu Kiểm thử Nhiều dòng (Data-Driven Testing)**:
   - Khi cần test nhiều trường hợp validation (email sai, mật khẩu ngắn, mật khẩu thiếu số), sử dụng `Scenario Outline` kèm bảng `Examples`:
     ```gherkin
     Scenario Outline: Kiểm tra validation trường email đăng ký
       Given người dùng đang ở màn hình Đăng ký
       When người dùng nhập email "<email_input>"
       Then hệ thống hiển thị thông báo lỗi "<error_message>" và mã lỗi "<error_code>"

       Examples:
         | email_input       | error_message               | error_code       |
         | test              | Email không đúng định dạng  | ERR-VAL-422-01   |
         | @domain.com       | Email không đúng định dạng  | ERR-VAL-422-01   |
         | existed@domain.vn | Email này đã được đăng ký   | ERR-AUTH-409-01  |
     ```
5. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/28-acceptance-criteria.md` và lưu vào `docs/{feature}/userstories/acceptance-criteria.md`.
   - Đề xuất lệnh tiếp theo: `/test-cases` để sinh bộ test cases chi tiết hoặc `/playwright-gen` để sinh mã auto-test.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Mỗi User Story có tối thiểu 3 kịch bản: Happy Path, Negative Path và Edge Case.
- [ ] Cú pháp Gherkin BDD chuẩn mực (Given, When, Then, And), không trộn lẫn chi tiết mã HTML/CSS.
- [ ] Toàn bộ các nhánh thất bại đều ghi rõ mã lỗi `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` tương ứng.
- [ ] Sử dụng Scenario Outline kèm bảng Examples cho các trường hợp kiểm thử dữ liệu nhiều giá trị.
- [ ] Tiêu chí kết quả trong mệnh đề Then rõ ràng, kiểm chứng được tự động bằng code.
