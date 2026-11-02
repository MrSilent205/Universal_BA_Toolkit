# Quy Chuẩn Định Danh Mã Lỗi Hệ Thống & Phản Hồi (Error Codes - ERR)

> **Mã quy tắc:** `RULE-03`  
> **Áp dụng cho:** Tất cả các tài liệu SRS, API Contract, Error Matrix, UI Wireframe và Log hệ thống.

---

## 1. Cấu Trúc Mã Lỗi Chuẩn (Syntax Format)
Mọi mã lỗi trong hệ thống phải tuân thủ nghiêm ngặt cú pháp 4 thành phần sau:

$$\text{ERR}-[\text{MODULE}]-[\text{HTTP\_STATUS}]-[\text{SEQ}]$$

Ví dụ: `ERR-AUTH-401-01`, `ERR-ORD-409-02`, `ERR-VAL-422-03`, `ERR-PAY-502-01`.

### 1.1 Phân tích các thành phần
1. **Tiền tố cố định:** `ERR` (viết hoa).
2. **`[MODULE]`**: Mã viết tắt từ 3–5 ký tự in hoa đại diện cho phân hệ nghiệp vụ:
   - `AUTH`: Xác thực, phân quyền, phiên làm việc (Authentication & Authorization).
   - `ORD`: Quản lý đơn hàng và giỏ hàng (Orders & Cart).
   - `PAY`: Cổng thanh toán, giao dịch ngân hàng, ví điện tử (Payment & Settlement).
   - `INV`: Tồn kho, kiểm kê, nhập xuất kho (Inventory & Warehouse).
   - `CUST`: Quản lý khách hàng, hồ sơ cá nhân (Customer & CRM).
   - `VAL`: Kiểm tra định dạng dữ liệu đầu vào (Input Data Validation).
   - `SYS`: Hạ tầng hệ thống, kết nối cơ sở dữ liệu, mạng nội bộ (System Infrastructure).
   - `SHIP`: Đơn vị vận chuyển, logistics, địa chỉ giao hàng (Shipping & Delivery).
3. **`[HTTP_STATUS]`**: Mã phản hồi HTTP gồm 3 chữ số theo chuẩn RFC 7231 / RFC 9110:
   - `400`: Bad Request (Cú pháp JSON lỗi, thiếu header bắt buộc).
   - `401`: Unauthorized (Chưa xác thực, token thiếu, token hết hạn, sai chữ ký).
   - `403`: Forbidden (Đã xác thực nhưng tài khoản không có quyền trên tài nguyên).
   - `404`: Not Found (Không tìm thấy ID thực thể yêu cầu).
   - `409`: Conflict (Xung đột trạng thái: trùng email, trùng MST, tồn kho không đủ).
   - `422`: Unprocessable Entity (Vi phạm quy tắc nghiệp vụ hoặc ràng buộc miền giá trị).
   - `429`: Too Many Requests (Vượt ngưỡng Rate Limit cho phép).
   - `500`: Internal Server Error (Lỗi logic chưa bắt được hoặc crash tiến trình).
   - `502` / `503` / `504`: Bad Gateway / Service Unavailable / Gateway Timeout (Lỗi từ dịch vụ bên thứ 3).
4. **`[SEQ]`**: Số thứ tự gồm 2 chữ số (`01`, `02`, `03`... đến `99`) trong cùng nhóm Module và HTTP Code.

---

## 2. Cấu Trúc Payload Phản Hồi Chuẩn (RFC 7807 Problem Details Envelope)
Khi có lỗi phát sinh, API bắt buộc trả về HTTP Status tương ứng kèm body JSON có định dạng chuẩn:

```json
{
  "error": {
    "code": "ERR-ORD-409-01",
    "message": "Sản phẩm 'Áo thun Polo' không đủ số lượng tồn kho khả dụng để đặt hàng.",
    "technical_details": "Inventory check failed for sku_id=SKU-999. Requested: 5, Available: 2.",
    "field_violations": [
      {
        "field": "items[0].quantity",
        "rejected_value": 5,
        "constraint": "max_available_stock",
        "message": "Số lượng yêu cầu vượt quá tồn kho khả dụng (2)."
      }
    ],
    "help_url": "https://docs.example.com/errors/ERR-ORD-409-01",
    "correlation_id": "c7a8b9f0-4e3a-4e4b-8d1e-9d2e3f4a5b6c",
    "timestamp": "2026-11-02T10:00:00Z"
  }
}
```

---

## 3. Danh Mục Mã Lỗi Nghiệp Vụ Tiêu Biểu

| Mã ERR | HTTP Code | Điều Kiện Kích Hoạt | Thông Báo Hiển Thị Người Dùng (End-User) | Thông Báo Kỹ Thuật (Dev/Log) | Hành Động Phía Client |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `ERR-AUTH-401-01` | 401 | JWT Token hết hạn hoặc không hợp lệ | Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại. | JWT expired signature or invalid claims | Clear local storage, redirect `/login` |
| `ERR-AUTH-403-02` | 403 | Tài khoản không có vai trò phù hợp | Bạn không có quyền thực hiện thao tác duyệt phiếu này. | User lacking required permission `STOCK_APPROVE` | Hiển thị thông báo Toast cảnh báo |
| `ERR-AUTH-403-03` | 403 | Đăng nhập sai quá 5 lần liên tiếp | Tài khoản bị tạm khóa 15 phút vì lý do bảo mật. | Account brute-force lockout triggered (`BR-SEC-02`) | Khóa form đăng nhập, hiển thị bộ đếm lùi |
| `ERR-VAL-422-01` | 422 | Email không đúng định dạng RFC 5322 | Địa chỉ email không hợp lệ (Ví dụ: ten@domain.com). | Regex validation failed for field: `email` | Highlight viền đỏ ô input, focus con trỏ |
| `ERR-VAL-422-02` | 422 | Bỏ trống các trường dữ liệu bắt buộc | Vui lòng điền đầy đủ các thông tin bắt buộc (*). | Mandatory fields null: `[fullname, phone]` | Hiển thị lỗi inline bên dưới từng ô nhập |
| `ERR-ORD-409-01` | 409 | Sản phẩm hết hàng hoặc tồn không đủ | Sản phẩm đã hết hàng hoặc không đủ số lượng đặt mua. | Stock insufficient during checkout lock | Cập nhật lại giỏ hàng, thông báo người dùng |
| `ERR-ORD-409-02` | 409 | Đơn hàng đã ở trạng thái không thể hủy | Đơn hàng đã được bàn giao vận chuyển, không thể hủy. | Invalid state transition from `SHIPPED` to `CANCELLED` | Vô hiệu hóa nút 'Hủy đơn' trên UI |
| `ERR-PAY-502-01` | 502 | Cổng thanh toán timeout hoặc lỗi mạng | Cổng thanh toán đang gián đoạn. Giao dịch chưa bị trừ tiền. | Third-party payment gateway timeout > 30s | Giữ đơn ở `PENDING`, hiển thị nút 'Thử lại' |
| `ERR-PAY-400-02` | 400 | Sai chữ ký bảo mật Checksum thanh toán | Giao dịch không hợp lệ do sai lệch chữ ký xác thực. | IPN signature verification failed | Từ chối giao dịch, ghi log bảo mật khẩn cấp |
| `ERR-SYS-429-01` | 429 | Gọi API vượt quá Rate Limit 100 req/min | Bạn đang thao tác quá nhanh. Vui lòng thử lại sau giây lát. | Rate limit exceeded for IP / API key | Hiển thị header `Retry-After: 60` |

---

## 4. Nguyên Tắc Đặt Mã Lỗi Nghiệp Vụ (Do's and Don'ts)
- **DO**: Luôn phân tách thông báo hiển thị người dùng (thân thiện, bảo mật, không lộ tên bảng hay câu lệnh SQL) và thông báo kỹ thuật dành cho lập trình viên.
- **DO**: Luôn gắn kèm mã `correlation_id` để tiện tra cứu log phân tán (Distributed Tracing).
- **DON'T**: Không dùng chung một mã `ERR-SYS-500-01` cho tất cả các lỗi nghiệp vụ.
- **DON'T**: Không trả về stack trace nguyên bản của framework/database ra ngoài client trên môi trường Production.
