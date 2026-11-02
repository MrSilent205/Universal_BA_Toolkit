# Tiêu chuẩn Thiết kế Hợp đồng API (API Contract Specification)

## 1. Nguyên tắc thiết kế RESTful
- **Resource Naming**: Sử dụng danh từ số nhiều cho URL: `/api/v1/orders`, `/api/v1/users/{user_id}/profiles`.
- **HTTP Verbs**:
  - `GET`: Truy vấn dữ liệu (Idempotent, Safe, không làm thay đổi trạng thái hệ thống).
  - `POST`: Tạo mới tài nguyên.
  - `PUT`: Cập nhật toàn bộ tài nguyên (Idempotent).
  - `PATCH`: Cập nhật một phần thuộc tính tài nguyên.
  - `DELETE`: Xóa tài nguyên (Idempotent).

## 2. Tiêu chuẩn Envelope Response JSON
Toàn bộ API trong hệ thống bắt buộc phải trả về theo cấu trúc phong bì (Envelope) 4 trường thống nhất:

```json
{
  "success": true,
  "data": {
    "id": "ord_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "order_number": "ORD-20261102-001",
    "status": "PENDING_PAYMENT",
    "final_amount": 250000
  },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "timestamp": "2026-11-02T09:30:00Z"
  }
}
```

Khi xảy ra lỗi (HTTP 4xx / 5xx):
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERR-ORD-422-01",
    "message": "Số lượng sản phẩm trong kho không đủ để đặt hàng.",
    "details": [
      {
        "field": "items[0].quantity",
        "issue": "Yêu cầu 5 nhưng tồn kho chỉ còn 2"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-11-02T09:30:00Z"
  }
}
```
