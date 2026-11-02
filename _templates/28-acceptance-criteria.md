# Tiêu chí Chấp nhận (Acceptance Criteria - Gherkin BDD)

---
id: DOC-AC-[MODULE]-001
title: Acceptance Criteria Specification - [Tên Tính Năng]
version: 1.0.0
phase: 04-usecase-story
domain: [Phân Hệ]
tags: [acceptance-criteria, bdd, gherkin, qa, testing]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## Feature: Thanh toán đơn hàng trực tuyến qua Cổng VNPay
*Ánh xạ User Story: `US-ORD-01` | Yêu cầu Kỹ thuật: `FR-ORD-CHKT-001`*

---

### Kịch bản 1: Thanh toán thành công qua cổng VNPay (Happy Path)
```gherkin
Scenario: Khách hàng thanh toán đơn hàng thành công qua mã QR VNPay
  Given người dùng đã đăng nhập và đang ở màn hình Thanh toán với đơn hàng hợp lệ trị giá "250.000 VNĐ"
  And toàn bộ sản phẩm trong giỏ hàng đều có đủ số lượng tồn kho
  When người dùng chọn phương thức thanh toán "Cổng VNPay"
  And bấm nút "Xác nhận và Thanh toán"
  Then hệ thống tạo đơn hàng với trạng thái "PENDING_PAYMENT" và giữ chỗ tồn kho trong 15 phút
  And hệ thống chuyển hướng người dùng sang trang thanh toán VNPay có mã QR
  When người dùng quét mã QR và thanh toán thành công
  Then cổng VNPay gửi Webhook IPN thông báo giao dịch thành công về hệ thống
  And hệ thống cập nhật trạng thái đơn hàng sang "PAID"
  And hiển thị màn hình "Đặt hàng thành công" kèm mã đơn hàng
  And hệ thống gửi email xác nhận thanh toán cho người dùng
```

---

### Kịch bản 2: Sản phẩm bị hết tồn kho trong lúc thanh toán (Negative Path)
```gherkin
Scenario: Báo lỗi khi sản phẩm trong giỏ hàng đã bị người khác mua hết
  Given người dùng đang ở màn hình Thanh toán với sản phẩm "Áo thun Polo size L" số lượng 1
  But sản phẩm này vừa bị người khác mua hết và tồn kho thực tế bằng 0
  When người dùng bấm nút "Xác nhận và Thanh toán"
  Then hệ thống không tạo giao dịch thanh toán sang cổng VNPay
  And hiển thị thông báo lỗi "Sản phẩm trong giỏ đã hết hàng. Vui lòng chọn sản phẩm khác."
  And trả về mã lỗi kỹ thuật "ERR-ORD-409-01"
  And tự động cập nhật lại giao diện giỏ hàng
```

---

### Kịch bản 3: Hết hạn phiên thanh toán 15 phút (Boundary & Timeout Path)
```gherkin
Scenario: Đơn hàng tự động hủy khi khách hàng không quét mã QR trong 15 phút
  Given đơn hàng "ORD-20261102-001" đang ở trạng thái "PENDING_PAYMENT"
  When thời gian chờ vượt quá 15 phút mà hệ thống chưa nhận được tín hiệu thanh toán thành công
  Then hệ thống tự động cập nhật trạng thái đơn hàng sang "EXPIRED" theo quy tắc BR-ORD-001
  And hệ thống tự động giải phóng số lượng tồn kho đã giữ chỗ
  And nếu sau đó khách hàng cố tình quét mã thanh toán, hệ thống cổng sẽ từ chối giao dịch
```

---

### Kịch bản 4: Kiểm tra Validation trường thông tin giao hàng (Scenario Outline)
```gherkin
Scenario Outline: Kiểm tra tính hợp lệ của số điện thoại nhận hàng
  Given người dùng đang ở form điền thông tin giao hàng
  When người dùng nhập số điện thoại "<phone_input>"
  And bấm nút "Tiếp tục"
  Then hệ thống hiển thị thông báo lỗi "<error_message>" và mã lỗi "<error_code>"

  Examples:
    | phone_input   | error_message                                | error_code      |
    |               | Số điện thoại không được để trống            | ERR-VAL-422-01  |
    | 12345         | Số điện thoại phải có đúng 10 chữ số         | ERR-VAL-422-01  |
    | 091234567a    | Số điện thoại chỉ được chứa ký tự số         | ERR-VAL-422-01  |
    | 0123456789    | Đầu số nhà mạng không hợp lệ tại Việt Nam    | ERR-VAL-422-01  |
```
