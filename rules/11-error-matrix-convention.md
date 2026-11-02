# Quy Chuẩn Xây Dựng Ma Trận Ngoại Lệ & Lỗi Nghiệp Vụ (Error Matrix)

> **Mã quy tắc:** `RULE-11`  
> **Áp dụng cho:** Tất cả các tài liệu SRS (`12-error-matrix.md`), kịch bản kiểm thử ngoại lệ và thiết kế API/Frontend.

---

## 1. Cấu Trúc Bảng Ma Trận Lỗi 7 Cột Tiêu Chuẩn (7-Column Error Matrix)
Mọi màn hình hoặc tính năng nghiệp vụ phải có bảng Ma trận lỗi liệt kê toàn bộ các kịch bản bất thường có thể xảy ra:

| Mã Ngoại Lệ (Err ID) | Tình Huống Kích Hoạt (Trigger Condition) | Mã Phản Hồi HTTP & Err Code | Hành Vi Hệ Thống (Backend Behavior) | Phản Hồi Giao Diện Người Dùng (UI/UX Response) | Hành Động Phục Hồi Khuyến Nghị (Recovery Action) | Mức Độ Nghiêm Trọng (Severity) |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `ERR-LOG-001` | Người dùng nhập sai mật khẩu lần thứ 1 đến 4 | `401 Unauthorized`<br>`ERR-AUTH-401-02` | Tăng bộ đếm `failed_attempts` thêm 1. Ghi audit log. | Hiển thị thông báo đỏ: 'Sai tài khoản hoặc mật khẩu. Bạn còn X lần thử'. Xóa ô mật khẩu. | Nhập lại mật khẩu đúng hoặc bấm 'Quên mật khẩu'. | Medium |
| `ERR-LOG-002` | Người dùng nhập sai mật khẩu lần thứ 5 liên tiếp | `403 Forbidden`<br>`ERR-AUTH-403-03` | Cập nhật `locked_until = now() + 15m`. Reset bộ đếm lần thử. Gửi cảnh báo bảo mật qua email. | Khóa toàn bộ form đăng nhập. Hiển thị đồng hồ đếm ngược 15:00. | Chờ hết 15 phút hoặc thực hiện quy trình khôi phục mật khẩu. | **High** |
| `ERR-ORD-003` | Khách hàng đặt mua sản phẩm nhưng tồn kho vừa bị người khác mua hết | `409 Conflict`<br>`ERR-ORD-409-01` | Rollback giao dịch đặt hàng, không tạo bản ghi mới trong bảng `orders`. | Hiển thị Dialog cảnh báo: 'Rất tiếc, sản phẩm vừa hết hàng'. Đề xuất sản phẩm tương tự. | Quay lại giỏ hàng để cập nhật hoặc chọn món khác. | **Critical** |
| `ERR-PAY-004` | Cổng thanh toán bên thứ ba phản hồi quá 30 giây hoặc mất kết nối | `504 Gateway Timeout`<br>`ERR-PAY-504-01` | Đưa đơn hàng vào hàng đợi chờ xác minh đối soát (Webhook/Polling Job). Không trừ lại kho. | Hiển thị màn hình chờ: 'Giao dịch đang được xử lý bởi ngân hàng. Vui lòng không thanh toán lại'. | Kiểm tra biến động số dư ngân hàng và tải lại trang sau 2 phút. | **High** |
| `ERR-FILE-005`| Người dùng tải lên file đính kèm vượt quá 10MB hoặc sai định dạng `.exe` | `415 Unsupported Media`<br>`ERR-VAL-415-01` | Chặn ngay tại Gateway/BFF, không cho phép truyền tải lên storage Cloud S3. | Viền đỏ ô upload file, hiển thị lỗi: 'Chỉ chấp nhận file PDF, JPG, PNG dung lượng dưới 10MB'. | Chọn lại file có dung lượng và định dạng hợp lệ. | Low |

---

## 2. Kiến Trúc Xử Lý Lỗi 4 Lớp (4-Layer Error Handling Flow)
Để đảm bảo trải nghiệm người dùng liền mạch và an toàn hệ thống, lỗi được xử lý qua 4 lớp:

```
+--------------------------------------------------------------------------+
| 1. Lớp Trình Duyệt / App (Client UX): Bắt lỗi validation tức thì (Regex) |
|    └─> Chặn request sai định dạng trước khi gửi qua mạng                 |
+--------------------------------------------------------------------------+
| 2. Lớp API Gateway / BFF: Kiểm tra JWT, Rate Limit, Whitelist IP         |
|    └─> Trả về HTTP 401, 403, 429 kèm Envelope lỗi chuẩn                  |
+--------------------------------------------------------------------------+
| 3. Lớp Dịch Vụ Nghiệp Vụ (Domain Service): Kiểm tra Business Rules       |
|    └─> Trả về HTTP 409, 422 kèm mã lỗi ERR-[MOD]-[STATUS]-[SEQ]          |
+--------------------------------------------------------------------------+
| 4. Lớp Tích Hợp & DB (Integration/DB): Circuit Breaker & Retry Queue     |
|    └─> Tự động cô lập service lỗi, ghi log Distributed Tracing           |
+--------------------------------------------------------------------------+
```

---

## 3. Phân Định 4 Mức Độ Nghiêm Trọng Của Lỗi (Severity Levels)
1. **Critical (Khẩn cấp):** Ảnh hưởng trực tiếp đến dòng tiền, dữ liệu cốt lõi hoặc khiến toàn bộ quy trình thanh toán/đơn hàng bị tắc nghẽn.
2. **High (Cao):** Tính năng nghiệp vụ chính bị gián đoạn, không có cách làm việc thay thế (No Workaround).
3. **Medium (Trung bình):** Phát sinh lỗi ở nhánh ngoại lệ nhưng người dùng vẫn có thể khắc phục hoặc có giải pháp thay thế tạm thời.
4. **Low (Thấp):** Lỗi thẩm mỹ, câu chữ thông báo chưa tối ưu hoặc sai sót định dạng không cản trở luồng nghiệp vụ.
