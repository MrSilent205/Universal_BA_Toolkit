# Tài liệu Kỹ thuật RESTful API (API Documentation)

---
id: DOC-APID-[MODULE]-001
title: API Specification - [Tên Endpoint]
version: 1.0.0
phase: 06-api-integration
domain: [API]
tags: [api-doc, restful, openapi, endpoints, curl]
author: [Tên Tác Giả / Senior IT BA]
last_updated: [YYYY-MM-DD]
---

## Endpoint: Khởi tạo Giao dịch Đặt hàng & Thanh toán
- **URL Path**: `/api/v1/orders/checkout`
- **HTTP Method**: `POST`
- **Yêu cầu Xác thực**: Bearer JWT Token (`Authorization: Bearer <token>`)
- **Tác nhân**: Khách hàng đã đăng nhập (`Registered User`)

---

## 1. Request Headers
| Header | Kiểu | Bắt buộc | Giá trị mẫu | Mô tả |
| :--- | :---: | :---: | :--- | :--- |
| `Authorization` | String | Có | `Bearer eyJhbGciOi...` | JWT Access Token người dùng |
| `Content-Type` | String | Có | `application/json` | Định dạng dữ liệu gửi lên |
| `X-Idempotency-Key`| UUID | Có | `9b1deb4d-3b7d-4bad...` | Khóa chống trừ tiền trùng lặp |

## 2. Request Body Payload
```json
{
  "shipping_address_id": "addr_847291a2-3b4c-4d5e-6f7a",
  "payment_method": "VNPAY",
  "voucher_code": "VNPAY50K",
  "note": "Giao giờ hành chính"
}
```

## 3. Response Schema

### A. Phản hồi Thành công (201 Created)
```json
{
  "success": true,
  "data": {
    "order_id": "ord_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "order_number": "ORD-20261102-001",
    "status": "PENDING_PAYMENT",
    "total_amount": 700000,
    "discount_amount": 50000,
    "final_amount": 650000,
    "payment_url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=65000000...",
    "expires_at": "2026-11-02T10:15:00Z"
  },
  "error": null,
  "meta": {
    "timestamp": "2026-11-02T10:00:00Z"
  }
}
```

### B. Phản hồi Thất bại (409 Conflict - Hết Hàng)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERR-ORD-409-01",
    "message": "Sản phẩm trong giỏ hàng đã hết tồn kho.",
    "details": [
      { "product_id": "prod_123", "available_stock": 0, "requested": 1 }
    ]
  },
  "meta": {
    "timestamp": "2026-11-02T10:00:00Z"
  }
}
```

## 4. Lệnh cURL Kiểm tra Mẫu
```bash
curl -X POST https://api.domain.com/v1/orders/checkout   -H "Authorization: Bearer YOUR_ACCESS_TOKEN"   -H "Content-Type: application/json"   -H "X-Idempotency-Key: c9b2f6b8-472e-4b71-9f9b-6f81a7b8e1a2"   -d '{
    "shipping_address_id": "addr_847291a2-3b4c-4d5e-6f7a",
    "payment_method": "VNPAY",
    "voucher_code": "VNPAY50K"
  }'
```
