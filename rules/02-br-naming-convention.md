# Quy ước mã hoá Quy tắc Nghiệp vụ (Business Rules - BR)

## 1. Định dạng chuẩn
Mã Business Rule phải tuân theo cấu trúc:
`BR-[DOMAIN]-[SEQ]`

- **DOMAIN**: Lĩnh vực nghiệp vụ cốt lõi chi phối (vd: `SEC` - Bảo mật/Xác thực, `PRIC` - Giá cả/Thuế, `PROMO` - Khuyến mãi/Chiết khấu, `KYC` - Định danh, `ORD` - Đơn hàng, `INV` - Tồn kho, `SHIP` - Vận chuyển).
- **SEQ**: Số thứ tự 3 chữ số bắt đầu từ `001` đến `999`.

*Ví dụ:*
- `BR-SEC-001`: Độ phức tạp và thời hạn mật khẩu người dùng.
- `BR-SEC-002`: Tạm khóa tài khoản khi đăng nhập sai nhiều lần.
- `BR-PROMO-001`: Giới hạn áp dụng mã giảm giá trên một đơn hàng.
- `BR-ORD-001`: Thời hạn tự động hủy đơn hàng chưa thanh toán.

## 2. Cấu trúc Phát biểu Logic Bắt buộc
Mọi Business Rule trong tài liệu đặc tả bắt buộc phải được phát biểu theo mệnh đề điều kiện 3 vế:

1. **KHI (WHEN / CONDITION)**: Sự kiện hoặc trạng thái kích hoạt quy tắc.
2. **THÌ (THEN / ACTION)**: Ràng buộc hoặc hành vi bắt buộc hệ thống phải tuân thủ.
3. **NGOẠI LỆ (UNLESS / EXCEPTION)**: Các trường hợp đặc biệt được miễn trừ (nếu không có thì ghi "Không có").

## 3. Bảng Danh mục Business Rules Mẫu

| Mã BR | Tên Quy tắc | Phạm vi áp dụng | Logic phát biểu (WHEN ... THEN ... UNLESS ...) | Mã lỗi đối ứng |
| :--- | :--- | :--- | :--- | :--- |
| `BR-SEC-001` | Độ phức tạp mật khẩu | Toàn hệ thống | **WHEN** người dùng tạo hoặc đổi mật khẩu **THEN** mật khẩu phải có tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt **UNLESS** đăng nhập qua Google SSO | `ERR-AUTH-422-02` |
| `BR-SEC-002` | Khóa tài khoản đăng nhập sai | Phân hệ Auth | **WHEN** người dùng nhập sai mật khẩu 5 lần liên tiếp trong 15 phút **THEN** hệ thống tạm khóa tài khoản 15 phút và gửi email cảnh báo **UNLESS** được mở khóa thủ công bởi Super Admin | `ERR-AUTH-403-02` |
| `BR-PROMO-001` | Kết hợp mã voucher | Giỏ hàng & Checkout | **WHEN** khách hàng áp dụng voucher **THEN** mỗi đơn hàng chỉ được dùng tối đa 01 voucher giảm giá sản phẩm và 01 voucher phí vận chuyển **UNLESS** có chương trình Flash-sale đặc biệt cho phép cộng dồn | `ERR-ORD-422-04` |
| `BR-ORD-001` | Tự động hủy đơn quá hạn | Phân hệ Order | **WHEN** đơn hàng ở trạng thái `PENDING_PAYMENT` quá 15 phút mà chưa nhận được tín hiệu thanh toán thành công **THEN** hệ thống tự động chuyển sang `EXPIRED`, giải phóng tồn kho **UNLESS** đơn hàng thuộc diện COD | - |
