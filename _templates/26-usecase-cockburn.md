# Đặc tả Use Case Chi tiết (Alistair Cockburn Format)

---
id: DOC-UC-[MODULE]-001
title: Use Case Specification - [Tên Ca Sử Dụng]
version: 1.0.0
phase: 04-usecase-story
domain: [Phân Hệ]
tags: [usecase, cockburn, fully-dressed, requirements]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Thông tin Nhận diện Ca sử dụng
- **Use Case ID**: `UC-[MODULE]-[SEQ]` (vd: `UC-ORD-001`)
- **Tên Use Case**: [Động từ] + [Tân ngữ] (vd: `Thanh toán Đơn hàng qua Cổng VNPay`)
- **Mức độ Mục tiêu (Goal Level)**: 🌊 **Sea Level** (Mục tiêu người dùng mang lại giá trị trọn vẹn)
- **Tác nhân chính (Primary Actor)**: Khách hàng mua sắm (Registered User / Guest)
- **Các bên quan tâm & Quyền lợi (Stakeholders & Interests)**:
  - *Khách hàng*: Muốn thanh toán nhanh chóng, an toàn, được trừ đúng số tiền.
  - *Kế toán*: Muốn tiền vào tài khoản ngân hàng chính xác, có mã giao dịch đối soát.
  - *Bộ phận Kho*: Muốn nhận thông tin đơn hàng đã thanh toán ngay để kịp đóng gói.

## 2. Bối cảnh & Điều kiện Tiên quyết
- **Điều kiện Tiên quyết (Pre-conditions)**:
  1. Người dùng đang ở màn hình Giỏ hàng với tối thiểu 01 sản phẩm khả dụng.
  2. Người dùng đã cung cấp đầy đủ thông tin địa chỉ giao nhận hàng.
- **Bảo đảm Thành công (Success Guarantees)**:
  1. Đơn hàng chuyển sang trạng thái `PAID`.
  2. Số lượng tồn kho sản phẩm được cập nhật trừ vĩnh viễn.
  3. Gửi email xác nhận kèm biên lai thanh toán cho khách hàng.
- **Bảo đảm Tối thiểu khi Lỗi (Minimal Guarantees)**:
  1. Hệ thống tự động rollback giao dịch; tiền của khách không bị trừ sai lệch.
  2. Đơn hàng giữ nguyên trạng thái chờ hoặc giải phóng kho an toàn.
- **Sự kiện Kích hoạt (Trigger)**: Khách hàng bấm nút "Xác nhận và Thanh toán".

## 3. Luồng Sự kiện Chính (Main Success Scenario / Happy Path)
1. Khách hàng lựa chọn phương thức thanh toán "Cổng VNPay" và bấm "Xác nhận".
2. Hệ thống kiểm tra số lượng tồn kho khả dụng của các sản phẩm trong giỏ hàng.
3. Hệ thống giữ chỗ tồn kho trong 15 phút và khởi tạo đơn hàng trạng thái `PENDING_PAYMENT`.
4. Hệ thống sinh chữ ký bảo mật HMAC-SHA256 và gọi API đối tác để tạo URL thanh toán.
5. Hệ thống chuyển hướng trình duyệt của khách hàng sang cổng thanh toán VNPay.
6. Khách hàng quét mã QR trên ứng dụng ngân hàng và hoàn tất xác thực sinh trắc học.
7. Cổng VNPay gửi Webhook IPN thông báo giao dịch thành công về hệ thống backend.
8. Hệ thống xác thực tính hợp lệ của chữ ký Webhook và cập nhật đơn hàng thành `PAID`.
9. Hệ thống gửi email xác nhận đơn hàng cho khách hàng và hiển thị màn hình Cảm ơn.

## 4. Các Luồng Nhánh & Ngoại lệ (Extensions / Alternative Flows)
- **2a. Sản phẩm trong giỏ hàng bị hết tồn kho**:
  - 2a1. Hệ thống hủy quy trình, giữ đơn ở trạng thái `DRAFT`.
  - 2a2. Hiển thị thông báo lỗi `ERR-ORD-409-01` (Sản phẩm đã hết hàng).
  - 2a3. Đưa khách hàng quay lại màn hình giỏ hàng để cập nhật số lượng.
- **5a. Cổng thanh toán bên thứ ba bị timeout quá 30 giây**:
  - 5a1. Hệ thống ghi log sự cố và trả về mã lỗi `ERR-PAY-502-01`.
  - 5a2. Hiển thị thông báo: "Cổng thanh toán đang gián đoạn, tiền của bạn chưa bị trừ".
  - 5a3. Cho phép khách hàng chọn phương thức thanh toán khác (vd: COD).
- **6a. Khách hàng bấm nút Hủy trên giao diện cổng thanh toán**:
  - 6a1. Cổng thanh toán chuyển hướng khách hàng về trang thất bại kèm mã `99`.
  - 6a2. Hệ thống chuyển đơn hàng về `CANCELLED`, giải phóng tồn kho đã giữ.
  - 6a3. Hiển thị nút "Thử thanh toán lại" cho người dùng.
- **7a. Webhook gửi sai chữ ký bảo mật**:
  - 7a1. Hệ thống từ chối cập nhật đơn, ghi log bảo mật `ERR-PAY-400-03`.
  - 7a2. Bắn cảnh báo khẩn cấp lên kênh giám sát kỹ thuật.

## 5. Quy tắc Nghiệp vụ Chi phối (Business Rules)
- `BR-SEC-002`: Kiểm tra phiên làm việc người dùng.
- `BR-PROMO-001`: Giới hạn áp dụng mã voucher.
- `BR-ORD-001`: Thời hạn tự động hủy đơn sau 15 phút.
