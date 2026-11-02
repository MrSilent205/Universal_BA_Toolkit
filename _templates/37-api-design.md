# Bản Thiết kế Kiến trúc Tích hợp API (Integration & Security Design)

---
id: DOC-APID-[INTEG]-001
title: API Integration Architecture - [Tên Dịch Vụ]
version: 1.0.0
phase: 06-api-integration
domain: [Kiến Trúc Tích Hợp]
tags: [api-design, hmac, idempotency, webhook, security]
author: [Tên Tác Giả / Lead Architect]
last_updated: [YYYY-MM-DD]
---

## 1. Cơ chế Tạo & Xác thực Chữ ký Bảo mật (HMAC-SHA256)
- **Công thức ký**:
  ```
  DataToSign = HTTP_METHOD + "|" + URI_PATH + "|" + TIMESTAMP + "|" + BODY_HASH
  Signature  = Hex(HMAC-SHA256(SecretKey, DataToSign))
  ```
- **Bảo vệ chống Replay Attack**:
  - Request bắt buộc gửi header `X-Timestamp` (chuẩn Unix Epoch millisecond).
  - Server từ chối xử lý nếu `abs(current_time - timestamp) > 300.000ms` (5 phút).

## 2. Chuẩn Xử lý Bất biến (Idempotency Key Pattern)
- Header bắt buộc: `X-Idempotency-Key: <UUID_v4>`.
- **Cơ chế lưu trữ Redis**:
  - Key: `idempotency:orders:{key}` | TTL = 86.400s (24 giờ).
  - Trạng thái 1: `IN_PROGRESS` $ightarrow$ Trả về `409 Conflict` nếu có request thứ 2 gửi đến đồng thời.
  - Trạng thái 2: `COMPLETED` $ightarrow$ Trả về đúng kết quả cũ từ cache mà không gọi lại DB hay cổng thanh toán.

## 3. Đặc tả Webhook IPN & Chiến lược Thử lại (Retry Policy)
- **Callback URL**: `POST https://api.domain.com/v1/webhooks/vnpay`
- **Yêu cầu phản hồi từ Server**: Phải trả về `{"RspCode": "00"}` trong vòng < 3.000ms.
- **Kịch bản Exponential Backoff khi Đối tác Thất bại**:
  - Lần 1: Sau 1 phút.
  - Lần 2: Sau 5 phút.
  - Lần 3: Sau 30 phút.
  - Lần 4: Sau 2 giờ.
  - Lần 5: Sau 24 giờ $ightarrow$ Chuyển sang Dead Letter Queue (DLQ).
