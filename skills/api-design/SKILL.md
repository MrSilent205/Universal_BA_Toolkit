---
name: api-design
description: "Thiết kế Kiến trúc Tích hợp Hệ thống qua API (API Architecture & Integration Design): quy chuẩn chữ ký bảo mật HMAC, cơ chế chống trùng lặp Idempotency Key, thiết kế Webhook callback và chiến lược thử lại Exponential Backoff"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /api-design — Thiết kế Kiến trúc Tích hợp Hệ thống qua API 🌟 [CORE WORKFLOW]

Thiết kế bản vẽ kiến trúc kết nối và giao tiếp dữ liệu giữa các phân hệ hoặc hệ thống đối tác bên ngoài, chuẩn hóa các giao thức bảo mật cao cấp (HMAC Signature, Idempotency), quy chuẩn Webhook callback và cơ chế chống nghẽn mạng.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi thiết kế cổng thanh toán, cổng tích hợp đối tác B2B, hệ thống Open Banking hoặc kiến trúc microservices giao tiếp qua lại.
- **Đối tượng thụ hưởng**: Solution Architect, Backend Lead, Security Engineer, Integration Partners.
- **Giá trị cốt lõi**: Khóa chặt các rủi ro gian lận dữ liệu (Man-in-the-middle, Replay Attacks), ngăn chặn lỗi thanh toán trùng lặp (Double-charging) và bảo đảm tính nhất quán dữ liệu phân tán (Eventual Consistency).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-design [tên_dịch_vụ_tích_hợp] [yêu_cầu_bảo_mật_và_luồng]`
- **Dữ liệu đầu vào cần có**:
  - Luồng tương tác từ `/sequence`.
  - Quy tắc nghiệp vụ (`BR-xxx`) và các ràng buộc bảo mật.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Mã lỗi hệ thống liên quan đến bảo mật và tích hợp.
- `rules/10-api-contract-standards.md` — Chuẩn hợp đồng RESTful API.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/37-api-design.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/integration-design.md`

## Quy trình thực thi chi tiết
1. **Thiết kế Cơ chế Xác thực & Toàn vẹn Dữ liệu (Authentication & Integrity)**:
   - Cơ chế tạo và kiểm tra chữ ký số: `Signature = HMAC-SHA256(SecretKey, HTTP_Method + URI + Timestamp + BodyPayload)`.
   - Header bắt buộc: `X-Signature`, `X-Timestamp`, `X-Nonce`.
   - Ngăn chặn Replay Attack: Từ chối các request có `abs(now() - Timestamp) > 300` giây hoặc Nonce đã tồn tại trong Redis.
2. **Cơ chế Chống Trùng lặp Giao dịch (Idempotency Key Pattern)**:
   - Client bắt buộc gửi header `X-Idempotency-Key: <UUID_v4>` cho mọi thao tác ghi/thanh toán.
   - Server lưu key vào Redis với TTL = 24 giờ. Nếu nhận cùng key trong khi đang xử lý $ightarrow$ trả về HTTP 409 Conflict; nếu đã xử lý xong $ightarrow$ trả về kết quả đã cache mà không thực hiện lại logic.
3. **Quy chuẩn Thiết kế Webhook / IPN (Instant Payment Notification)**:
   - Server gọi ngược (Callback) về URL đối tác khi có sự kiện: `POST https://partner.com/webhook/orders`.
   - Body chứa event type: `order.paid`, `order.cancelled`, `refund.completed`.
   - Đối tác bắt buộc trả về `{"received": true}` với HTTP 200 trong vòng 3.000ms.
4. **Chiến lược Thử lại Bất đối xứng (Exponential Backoff & Dead Letter Queue)**:
   - Nếu Webhook không nhận được 200 OK, hệ thống tự động retry theo 5 đợt:
     - Lần 1: Sau 1 phút
     - Lần 2: Sau 5 phút
     - Lần 3: Sau 30 phút
     - Lần 4: Sau 2 giờ
     - Lần 5: Sau 24 giờ
   - Sau 5 lần thất bại $ightarrow$ Đẩy vào Dead Letter Queue (DLQ) và gửi cảnh báo CSKH xử lý thủ công.
5. **Ghi tệp**:
   - Sử dụng template `_templates/37-api-design.md` và lưu vào `docs/{feature}/api/integration-design.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Công thức tính chữ ký bảo mật HMAC rõ ràng, chi tiết từng tham số ghép chuỗi.
- [ ] Có giải pháp chống tấn công Replay Attack bằng Timestamp và Nonce.
- [ ] Quy định chặt chẽ cơ chế Idempotency Key bảo vệ các tác vụ trừ tiền/thay đổi trạng thái.
- [ ] Thiết kế Webhook đầy đủ payload mẫu, cơ chế verify chữ ký và timeout.
- [ ] Có kịch bản Exponential Backoff Retry và chuyển hàng đợi Dead Letter Queue (DLQ).
