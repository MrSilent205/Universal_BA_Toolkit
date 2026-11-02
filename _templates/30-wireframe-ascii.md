# Phác thảo Giao diện Ký tự ASCII (ASCII Wireframe)

---
id: DOC-WFA-[SCREEN]-001
title: ASCII Wireframe - [Tên Màn Hình]
version: 1.0.0
phase: 05-screen-design
domain: [Giao Diện]
tags: [wireframe, ascii, low-fi, layout]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Màn hình Mobile: Đặt hàng & Thanh toán (`SCR-ORD-002`)
*Độ rộng chuẩn: 38 ký tự monospace*

```text
+------------------------------------+
| [<-]       THANH TOÁN         [?]  |
+------------------------------------+
| 1. ĐỊA CHỈ GIAO HÀNG           [v] |
| Nguyen Van An | 0912 345 678       |
| 123 Đường Nguyễn Huệ, Q.1, TP.HCM  |
+------------------------------------+
| 2. DANH SÁCH SẢN PHẨM (2 món)      |
| [img] Áo Polo Nam (Size L)   x1    |
|       Giá: 250.000 đ               |
| [img] Quần Kaki Đen (Size 32) x1   |
|       Giá: 450.000 đ               |
+------------------------------------+
| 3. MÃ GIẢM GIÁ (VOUCHER)           |
| [ VNPAY50K            ] [ ÁP DỤNG ]|
| (v) Đã giảm 50.000 đ từ voucher    |
+------------------------------------+
| 4. PHƯƠNG THỨC THANH TOÁN          |
| (o) Cổng VNPay (Quét mã QR)        |
| ( ) Ví điện tử MoMo                |
| ( ) Thanh toán khi nhận hàng (COD) |
+------------------------------------+
| Tạm tính:                700.000 đ |
| Phí vận chuyển:           30.000 đ |
| Giảm giá voucher:        -50.000 đ |
| ---------------------------------- |
| TỔNG THANH TOÁN:         680.000 đ |
+------------------------------------+
| [====== XÁC NHẬN ĐẶT HÀNG =======] | [1]
| [ Hủy bỏ và quay lại giỏ hàng ]    |
+------------------------------------+
```

## 2. Bảng Chú thích Hành vi Tương tác (Footnotes)
- **[1] Nút Xác nhận đặt hàng**: Trạng thái mặc định là Enabled; khi click sẽ hiển thị loading spinner và vô hiệu hóa nút trong 15s để chống double-click.
- **[ÁP DỤNG]**: Gọi API kiểm tra tính hợp lệ của voucher. Nếu sai định dạng báo lỗi viền đỏ `ERR-ORD-422-04`.
