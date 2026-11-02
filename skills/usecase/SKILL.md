---
name: usecase
description: "Đặc tả Ca sử dụng chi tiết theo chuẩn Alistair Cockburn: xác định Actor, Scope, Trigger, Pre/Post-conditions, Main Success Scenario, các nhánh rẽ ngoại lệ Extensions và mã lỗi ERR"
metadata:
  phase: 04-usecase-story
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /usecase — Đặc tả Use Case Chi tiết Chuẩn Alistair Cockburn 🌟 [CORE WORKFLOW]

Đặc tả các ca sử dụng ở mức độ chi tiết cao (Fully Dressed Use Case) tuân thủ cấu trúc của Alistair Cockburn, làm rõ từng tương tác giữa Actor và Hệ thống, phủ kín mọi luồng rẽ nhánh và các tình huống ngoại lệ.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi phân tích các chức năng nghiệp vụ trọng yếu trong hệ thống, đặc biệt là các luồng có nhiều bước rẽ nhánh, có nhiều bên tham gia hoặc có nguy cơ phát sinh lỗi cao.
- **Đối tượng thụ hưởng**: Full-stack Developers, QA/QC Engineers, Solution Architect, Product Owner.
- **Giá trị cốt lõi**: Khắc phục nhược điểm của User Story (vốn ngắn gọn và thường bỏ sót kịch bản lỗi), cung cấp tài liệu chi tiết giúp lập trình viên viết code vững chắc và tester viết test case không bị sót nhánh.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/usecase [mã_hoặc_tên_tính_năng] [tên_ca_sử_dụng]`
- **Dữ liệu đầu vào cần có**:
  - Yêu cầu chức năng (`FR-xxx`) mục tiêu trong SRS.
  - Danh sách Actor tham gia theo Rule 17.
  - Quy tắc nghiệp vụ (`BR-xxx`) và mã lỗi (`ERR-xxx`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ Use Case với mã yêu cầu chức năng.
- `rules/02-br-naming-convention.md` — Trích dẫn các quy tắc nghiệp vụ BR liên quan.
- `rules/03-err-naming-convention.md` — Gắn mã lỗi ERR tại các bước rẽ nhánh ngoại lệ.
- `rules/06-cockburn-use-case.md` — Quy chuẩn 11 thành phần Use Case của Alistair Cockburn.
- `rules/17-actor-role-definition.md` — Định danh chính xác Primary và Secondary Actors.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/26-usecase-cockburn.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/usecases/{usecase_id}.md` (ví dụ: `docs/checkout/usecases/UC-ORD-001.md`)

## Quy trình thực thi chi tiết
1. **Thiết lập Nhận diện & Mức độ Mục tiêu (Header & Goal Level)**:
   - Gán mã định danh duy nhất: `UC-[MODULE]-[SEQ]` theo Rule 06.
   - Tên Use Case: Dạng [Động từ] + [Tân ngữ] (ví dụ: `UC-PAY-001: Thanh toán Đơn hàng qua Cổng VNPay`).
   - Mức độ mục tiêu (Goal Level):
     - *Sea level (Mục tiêu người dùng)*: Tác vụ mang lại giá trị hoàn chỉnh trong 1 phiên làm việc.
     - *Fish level (Sub-function)*: Hàm con kỹ thuật (ví dụ: Xác thực OTP, Upload file).
     - *Kite level (Business Process)*: Quy trình doanh nghiệp dài ngày.
2. **Xác định Ranh giới & Điều kiện Tiên quyết (Context & Conditions)**:
   - *Primary Actor*: Người khởi tạo hành động (ví dụ: Khách hàng vãng lai).
   - *Stakeholders & Interests*: Quyền lợi của các bên bị ảnh hưởng (ví dụ: Kế toán muốn số tiền khớp 100%).
   - *Pre-conditions (Tiền đề)*: Trạng thái bắt buộc của hệ thống trước khi bắt đầu (ví dụ: Đơn hàng ở trạng thái `DRAFT` và giỏ hàng có >= 1 sản phẩm).
   - *Post-conditions / Guarantees*:
     - *Minimal Guarantees (Đảm bảo tối thiểu khi lỗi)*: Hệ thống rollback giao dịch, không trừ tiền oan.
     - *Success Guarantees (Đảm bảo khi thành công)*: Đơn hàng chuyển sang `PAID`, trừ tồn kho, gửi email hóa đơn.
3. **Soạn thảo Luồng Sự kiện Chính (Main Success Scenario / Happy Path)**:
   - Viết các bước tương tác tuần tự giữa Actor và System (1, 2, 3, 4, 5...).
   - Mỗi bước chỉ mô tả 1 hành động rõ ràng: "Actor làm X", sau đó "Hệ thống phản hồi Y".
4. **Phủ Kín Toàn bộ Nhánh rẽ & Ngoại lệ (Extensions / Alternative Flows)**:
   - Đánh số phân cấp dựa trên bước của luồng chính:
     - `3a. Số dư tài khoản không đủ`: Hệ thống hiển thị thông báo `ERR-PAY-402-01`, cho phép chọn phương thức khác.
     - `3b. Cổng thanh toán timeout quá 30 giây`: Hệ thống ghi log, chuyển trạng thái `PENDING_RETRY`, hướng dẫn người dùng không bấm lại.
5. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/26-usecase-cockburn.md` và lưu vào `docs/{feature}/usecases/{usecase_id}.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Định danh đúng mã `UC-[MODULE]-[SEQ]` và tên dạng Động từ + Tân ngữ.
- [ ] Xác định rõ Goal Level (Sea level / Fish level / Kite level).
- [ ] Có đầy đủ cả Pre-conditions, Minimal Guarantees (khi lỗi) và Success Guarantees.
- [ ] Luồng chính (Happy Path) rõ ràng, phân định mạch lạc giữa hành vi Actor và System.
- [ ] Mọi nhánh rẽ Extensions đều có mã bước đối ứng (ví dụ `2a`, `3a`) và gắn mã lỗi `ERR-`.
- [ ] Trích dẫn các quy tắc nghiệp vụ `BR-` chi phối ca sử dụng.
