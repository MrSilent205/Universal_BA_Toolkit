# Quy ước mã hoá Yêu cầu Chức năng (Functional Requirements - FR)

## 1. Định dạng chuẩn
Mã FR phải tuân theo cấu trúc phân cấp chặt chẽ:
`FR-[MODULE]-[FEATURE]-[SEQ]`

- **MODULE**: Viết hoa 2-4 ký tự viết tắt của phân hệ chính (vd: `AUTH` - Xác thực, `ORD` - Đơn hàng, `PAY` - Thanh toán, `PROD` - Sản phẩm, `USER` - Người dùng, `RPT` - Báo cáo, `INV` - Kho hàng).
- **FEATURE**: Viết hoa 2-4 ký tự đại diện cho tính năng con (vd: `LGN` - Đăng nhập, `REG` - Đăng ký, `CHKT` - Thanh toán/Checkout, `SRCH` - Tìm kiếm, `RFND` - Hoàn tiền).
- **SEQ**: Số thứ tự 3 chữ số bắt đầu từ `001` đến `999`.

*Ví dụ:*
- `FR-AUTH-LGN-001`: Đăng nhập bằng Email và Mật khẩu.
- `FR-AUTH-LGN-002`: Đăng nhập thông qua Google SSO (OAuth2).
- `FR-ORD-CHKT-001`: Áp dụng mã giảm giá khi thanh toán.
- `FR-PAY-GATE-001`: Xử lý thanh toán qua cổng VNPay/MoMo.

## 2. Bảng thuộc tính bắt buộc cho mỗi FR
Mỗi Functional Requirement trong tài liệu đặc tả bắt buộc phải chứa đầy đủ 8 trường thông tin sau:

| Thuộc tính | Kiểu dữ liệu | Quy chuẩn mô tả |
| :--- | :--- | :--- |
| **Mã FR** | String | Duy nhất trong toàn bộ hệ thống, tuân thủ `FR-[MODULE]-[FEATURE]-[SEQ]` |
| **Tên yêu cầu** | String | Ngắn gọn, cấu trúc chuẩn: **[Động từ] + [Tân ngữ]** (vd: *Tạo đơn hàng mới*) |
| **Độ ưu tiên** | Enum | **P0** (Must Have - MVP), **P1** (Should Have - Quan trọng), **P2** (Nice to Have - Đợt sau) |
| **Tác nhân kích hoạt** | Reference | Actor khởi tạo hành động (theo `rules/17-actor-role-definition.md`) |
| **Dữ liệu đầu vào (Input)** | List/Table | Tên trường, kiểu dữ liệu, bắt buộc hay tùy chọn, độ dài tối đa |
| **Ràng buộc kiểm tra (Validation)** | List | Các điều kiện kiểm tra hợp lệ trước khi xử lý (format email, regex, min/max) |
| **Logic xử lý (Processing)** | Steps | Các bước tuần tự hệ thống thực hiện, cập nhật DB, gọi service ngoài |
| **Dữ liệu đầu ra (Output)** | Schema/Data | Kết quả trả về cho client, mã phản hồi HTTP, thông báo hiển thị |
| **Business Rules liên quan** | Reference | Danh sách các quy tắc nghiệp vụ `BR-xxx` chi phối |
| **Mã lỗi có thể phát sinh** | Reference | Danh sách các mã lỗi `ERR-xxx` tương ứng khi thất bại |

## 3. Mẫu đặc tả FR hoàn chỉnh trong SRS
```markdown
### FR-ORD-CHKT-001: Áp dụng mã giảm giá khi thanh toán
- **Độ ưu tiên**: P0 (Must Have)
- **Tác nhân**: Khách hàng (Registered User / Guest)
- **Input**: `voucher_code` (String, max 20 chars, required), `cart_total` (Decimal)
- **Validation**:
  1. Mã voucher phải tồn tại trong cơ sở dữ liệu và đang ở trạng thái `ACTIVE`.
  2. Thời điểm hiện tại `now()` phải nằm trong khoảng `[start_date, end_date]`.
  3. Giá trị đơn hàng `cart_total` >= `min_order_value` của voucher.
- **Processing**:
  1. Tính toán số tiền giảm: `discount = min(cart_total * percent, max_discount)`.
  2. Cập nhật lại tổng tiền thanh toán: `final_total = cart_total - discount`.
  3. Đánh dấu giữ chỗ số lượng voucher (Hold quota) trong 15 phút.
- **Output**: Trả về `final_total`, `discount_amount`, thông báo "Áp dụng mã giảm giá thành công".
- **Business Rules chi phối**: `BR-PROMO-001`, `BR-PROMO-002`
- **Mã lỗi liên quan**: `ERR-ORD-422-03` (Mã không hợp lệ), `ERR-ORD-409-02` (Mã đã hết lượt dùng)
```
