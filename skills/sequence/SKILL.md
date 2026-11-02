---
name: sequence
description: "Mô hình hóa luồng tương tác tuần tự giữa các hệ thống (Sequence Diagram): chi tiết hóa thứ tự thông điệp, lời gọi API, cơ chế bất đồng bộ, rẽ nhánh alt/else và xử lý lỗi ERR"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /sequence — Sơ đồ Tuần tự Tương tác Hệ thống [CORE WORKFLOW]

Mô hình hóa chuỗi trao đổi thông điệp tuần tự theo thời gian giữa các tác nhân (Actors) và các thành phần kỹ thuật (Frontend, API Gateway, Microservices, Database, Third-party APIs), làm rõ cách thức phối hợp để hoàn thành một ca sử dụng hoặc luồng nghiệp vụ.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thực thi ngay sau khi đã xác định các yêu cầu chức năng (FR) trong SRS, cần làm rõ cơ chế tương tác kỹ thuật, các bước gọi API và cách thức xử lý ngoại lệ giữa client và server.
- **Đối tượng thụ hưởng**: Backend Developers, Frontend Developers, Solution Architect, QA/QC Engineers.
- **Giá trị cốt lõi**: Tránh hiểu nhầm về giao thức giao tiếp, thứ tự gọi hàm và cơ chế đồng bộ/bất đồng bộ, giúp lập trình viên hiện thực hóa mã nguồn chuẩn xác ngay từ lần đầu.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/sequence [tên_tính_năng] [mã_yêu_cầu_hoặc_use_case]`
- **Dữ liệu đầu vào cần có**:
  - Mã yêu cầu chức năng (`FR-xxx`) hoặc Use Case (`UC-xxx`) mục tiêu.
  - Danh sách các bên tham gia (Actors & Participants) và dịch vụ bên thứ ba.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ sơ đồ vào mã yêu cầu chức năng FR.
- `rules/03-err-naming-convention.md` — Gắn mã lỗi ERR chuẩn tại các điểm rẽ nhánh thất bại.
- `rules/10-api-contract-standards.md` — Tên endpoint, HTTP methods và response payload.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/15-sequence-diagram.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/flows.md` (hoặc `docs/{feature}/diagrams/sequence-{feature_name}.md`)

## Quy trình thực thi chi tiết
1. **Xác định Thứ tự Các bên tham gia (Participant Ordering)**:
   - Sắp xếp logic từ trái sang phải: Actor (Người dùng) $
ightarrow$ Client (Web/Mobile App) $
ightarrow$ API Gateway / Backend Service $
ightarrow$ Database $
ightarrow$ Dịch vụ thứ ba (Payment Gateway, SMS, Email).
   - Đặt tên alias ngắn gọn, dễ đọc (ví dụ: `actor U as User`, `participant FE as Web App`, `participant BE as Core API`).
2. **Khai báo cú pháp Mermaid chuẩn mực**:
   - Luôn bật `autonumber` ở đầu block để đánh số thứ tự từng bước tương tác.
   - Sử dụng `activate` / `deactivate` hoặc dấu `+` / `-` để biểu thị thời gian xử lý (Activation Box) của service.
   - Phân biệt rõ thông điệp đồng bộ (nét liền `->>`) và phản hồi kết quả (nét đứt `-->>`).
3. **Phủ đầy đủ các Nhánh Rẽ (Fragments alt / else / opt / loop)**:
   - Khối `alt Thành công`: Mô phỏng luồng chính (Happy Path), trả về dữ liệu 200 OK.
   - Khối `else Lỗi dữ liệu / Thất bại`: Mô tả cụ thể lỗi validation (422), lỗi xác thực (401), hoặc lỗi xung đột (409) kèm mã lỗi chuẩn `ERR-xxx` theo Rule 03.
   - Khối `opt`: Các thao tác tùy chọn (ví dụ: gửi email thông báo, ghi log kiểm toán).
   - Khối `par`: Các tác vụ xử lý song song hoặc bất đồng bộ (ví dụ: bắn sự kiện qua Kafka/RabbitMQ).
4. **Ghi chú Kỹ thuật (Notes & Payload Highlights)**:
   - Sử dụng `Note over` hoặc `Note right of` để làm rõ các thuật toán nhạy cảm (mã hóa HMAC-SHA256, kiểm tra chữ ký Webhook, sinh idempotency key).
5. **Ghi tệp & Đề xuất xuất bản đồ họa**:
   - Lưu vào `docs/{feature}/srs/flows.md`.
   - Gợi ý người dùng chạy lệnh `/render-diagrams` để biên dịch sơ đồ sang file HTML và vector SVG trực quan chuẩn Editorial.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bật `autonumber` đánh số thứ tự toàn bộ các bước trao đổi thông điệp.
- [ ] Sắp xếp thứ tự participants từ trái sang phải chuẩn luồng kiến trúc.
- [ ] Phủ kín cả nhánh thành công (Happy Path) và các nhánh lỗi ngoại lệ (Negative Path) trong khối `alt / else`.
- [ ] Mọi thông điệp báo lỗi trong nhánh `else` đều được gắn mã `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]`.
- [ ] Các thông điệp phản hồi được vẽ bằng nét đứt (`-->>`) và thể hiện rõ trạng thái response.
