---
name: state
description: "Mô hình hóa vòng đời đối tượng bằng Máy trạng thái Hữu hạn (Finite State Machine - FSM): vẽ sơ đồ Mermaid stateDiagram-v2, lập ma trận chuyển dịch trạng thái, xác định Guard Conditions và chặn luồng bất hợp lệ"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /state — Sơ đồ & Ma trận Trạng thái Thực thể (FSM) [CORE WORKFLOW]

Mô hình hóa toàn diện vòng đời (Lifecycle) của các thực thể nghiệp vụ trọng yếu (Đơn hàng, Giao dịch thanh toán, Hợp đồng, Vé hỗ trợ, Tài khoản người dùng) bằng máy trạng thái hữu hạn FSM, ngăn chặn triệt để lỗi chuyển dịch trạng thái sai quy tắc.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi thiết kế các thực thể có vòng đời phức tạp nhiều bước, có nhiều tác nhân cùng tác động hoặc liên quan trực tiếp đến tiền bạc và kho vận.
- **Đối tượng thụ hưởng**: Backend Developers, Database Architect, QA Engineers, Business Analyst.
- **Giá trị cốt lõi**: Khóa chặt các lỗ hổng bảo mật logic (ví dụ: đơn hàng đã `CANCELLED` mà hệ thống vẫn cho phép bấm `REFUND` lần hai), giúp lập trình viên cài đặt State Pattern hoặc workflow engine hoàn toàn chính xác.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/state [tên_thực_thể] [danh_sách_trạng_thái_kỳ_vọng]`
- **Dữ liệu đầu vào cần có**:
  - Tên thực thể nghiệp vụ mục tiêu (ví dụ: `Order`, `PaymentTransaction`, `LoanApplication`).
  - Danh sách các sự kiện kích hoạt (Events) và quyền hạn thực hiện của từng vai trò.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Ánh xạ điều kiện bảo vệ (Guard) thành Business Rules.
- `rules/03-err-naming-convention.md` — Gán mã lỗi khi người dùng vi phạm quy tắc chuyển trạng thái.
- `rules/12-state-transition-rules.md` — Quy tắc máy trạng thái FSM (Initial, Terminal, Guard, Transition Matrix).
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/19-state-diagram.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/state-machine.md`

## Quy trình thực thi chi tiết
1. **Xác lập Danh mục Trạng thái (State Taxonomy)**:
   - Trạng thái khởi tạo (Initial State): `[*] --> INITIAL_STATE` (ví dụ: `DRAFT`, `PENDING_REVIEW`).
   - Các trạng thái trung gian (Intermediate States): `PROCESSING`, `PAYMENT_PENDING`, `SHIPPING`.
   - Các trạng thái kết thúc (Terminal States): `COMPLETED`, `CANCELLED`, `EXPIRED`, `REFUNDED` `--> [*]`.
   - *Quy tắc bất biến*: Tuyệt đối không cho phép chuyển dịch ra khỏi trạng thái Terminal.
2. **Vẽ Sơ đồ Cú pháp Mermaid State Diagram (`stateDiagram-v2`)**:
   - Thể hiện rõ tên sự kiện trên từng đường chuyển trạng thái: `STATE_A --> STATE_B: Event [Guard condition]`.
   - Gom nhóm các trạng thái con thành Composite States nếu có (ví dụ: trong trạng thái `IN_DELIVERY` có `PICKED_UP`, `ON_ROAD`, `NEAR_DESTINATION`).
3. **Lập Bảng Ma trận Chuyển dịch Trạng thái Toàn diện (State Transition Matrix)**:
   - Xây dựng bảng 6 cột chuẩn theo Rule 12:
     - Trạng thái hiện tại (Current State)
     - Sự kiện kích hoạt (Trigger Event)
     - Điều kiện kiểm tra bảo vệ (Guard Condition)
     - Trạng thái tiếp theo (Target State)
     - Tác nhân thực hiện (Actor / Automated System)
     - Mã lỗi phát sinh nếu vi phạm (Error Code)
4. **Kiểm tra Lỗ hổng Trạng thái Bị kẹt (Deadlock & Orphan State Inspection)**:
   - Đảm bảo mọi trạng thái không phải Terminal đều có ít nhất 1 đường dẫn hợp lệ đi tới một trạng thái kết thúc.
   - Xử lý kịch bản quá hạn: luôn có sự kiện Timeout tự động chuyển sang trạng thái hủy/đóng.
5. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/19-state-diagram.md` và lưu vào `docs/{feature}/srs/state-machine.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Sơ đồ Mermaid `stateDiagram-v2` cú pháp hợp lệ, phân biệt rõ Initial và Terminal states.
- [ ] Tuyệt đối không có đường chuyển trạng thái đi ra khỏi Terminal States.
- [ ] Bảng Ma trận Chuyển dịch Trạng thái phủ kín 100% các cặp trạng thái và điều kiện Guard.
- [ ] Mọi hành vi cố tình chuyển trạng thái bất hợp lệ đều có mã lỗi `ERR-` ngăn chặn.
- [ ] Có cơ chế timeout cho các trạng thái chờ để tránh việc bản ghi bị treo vĩnh viễn.
