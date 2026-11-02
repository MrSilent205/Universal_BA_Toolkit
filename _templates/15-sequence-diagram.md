# Sơ đồ Tuần tự Tương tác Hệ thống (Sequence Diagram)

---
id: DIAG-SEQ-[FEATURE]-001
title: Sequence Diagram - [Tên Luồng Tương Tác]
version: 1.0.0
phase: 03-diagrams
domain: [Phân Hệ]
tags: [sequence, mermaid, interaction, api-flow]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Mô tả Bối cảnh Luồng (Scenario Context)
- **Tên luồng**: [vd: Quy trình Đặt hàng và Thanh toán qua Cổng VNPay]
- **Yêu cầu FR liên quan**: `FR-ORD-CHKT-001`, `FR-PAY-GATE-001`
- **Các bên tham gia (Participants)**:
  - `User`: Khách hàng sử dụng trình duyệt web hoặc mobile app.
  - `ClientApp`: Giao diện Web Frontend (Next.js) / Mobile App.
  - `APIGateway`: Cổng định tuyến API và kiểm tra JWT Token.
  - `OrderService`: Dịch vụ xử lý đơn hàng và tính toán giá trị.
  - `PaymentService`: Dịch vụ điều phối thanh toán và sinh chữ ký HMAC.
  - `VNPayGateway`: Cổng thanh toán đối tác bên ngoài.
  - `Database`: Cơ sở dữ liệu chính (PostgreSQL).

## 2. Sơ đồ Tuần tự Mermaid (Mermaid Sequence Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách hàng
    participant Client as Frontend App
    participant GW as API Gateway
    participant OrderSvc as Order Service
    participant PaySvc as Payment Service
    participant DB as PostgreSQL
    participant VNPay as Cổng VNPay

    User->>Client: Bấm "Xác nhận Thanh toán"
    activate Client
    Client->>GW: POST /api/v1/checkout (payload + X-Idempotency-Key)
    activate GW
    GW->>GW: Kiểm tra JWT Token & Rate Limit
    GW->>OrderSvc: Chuyển tiếp request tạo đơn
    activate OrderSvc

    OrderSvc->>DB: Kiểm tra tồn kho sản phẩm (SELECT FOR UPDATE)
    activate DB
    DB-->>OrderSvc: Tồn kho hợp lệ
    deactivate DB

    alt Tồn kho không đủ
        OrderSvc-->>Client: 409 Conflict (ERR-ORD-409-01: Hết hàng)
        Client-->>User: Hiển thị thông báo hết hàng, cập nhật giỏ
    else Tồn kho đủ
        OrderSvc->>DB: Tạo đơn hàng trạng thái PENDING_PAYMENT
        OrderSvc->>PaySvc: Khởi tạo giao dịch thanh toán
        activate PaySvc
        PaySvc->>PaySvc: Sinh chữ ký bảo mật HMAC-SHA256
        PaySvc->>VNPay: Gọi API tạo URL thanh toán
        activate VNPay
        VNPay-->>PaySvc: Trả về Payment URL (vnp_Url)
        deactivate VNPay
        PaySvc-->>OrderSvc: Trả về Payment URL
        deactivate PaySvc
        OrderSvc-->>GW: Trả về 201 Created kèm Payment URL
        deactivate OrderSvc
        GW-->>Client: 201 Created
        deactivate GW
        Client-->>User: Chuyển hướng sang trang VNPay để thanh toán
    end
    deactivate Client

    Note over User,VNPay: Khách hàng quét mã QR trên trang VNPay

    VNPay->>PaySvc: Webhook IPN (kết quả thanh toán + chữ ký)
    activate PaySvc
    PaySvc->>PaySvc: Xác thực chữ ký HMAC-SHA256
    alt Chữ ký không hợp lệ
        PaySvc-->>VNPay: HTTP 400 (ERR-PAY-400-03: Invalid Signature)
    else Chữ ký hợp lệ
        PaySvc->>OrderSvc: Cập nhật đơn hàng PAID
        activate OrderSvc
        OrderSvc->>DB: UPDATE orders SET status = 'PAID'
        OrderSvc-->>PaySvc: Đã cập nhật
        deactivate OrderSvc
        PaySvc-->>VNPay: HTTP 200 {"RspCode": "00", "Message": "Confirm Success"}
    end
    deactivate PaySvc
```

## 3. Bảng Giải thích Chi tiết Từng Bước Tương tác
| Bước | Bên gửi | Bên nhận | Phương thức / Hành động | Ý nghĩa nghiệp vụ |
| :---: | :--- | :--- | :--- | :--- |
| 1 | Khách hàng | Frontend App | Bấm Xác nhận | Bắt đầu quy trình checkout |
| 2 | Frontend | API Gateway | `POST /api/v1/checkout` | Gửi payload kèm Idempotency Key chống trùng |
| 5 | Order Service | Database | `SELECT FOR UPDATE` | Khóa dòng sản phẩm để tránh Race Condition |
| 10 | Order Service | Payment Service| Init Payment | Yêu cầu sinh link thanh toán |
| 17 | VNPay Gateway | Payment Service| Webhook IPN | Nhận kết quả thanh toán bất đồng bộ |
