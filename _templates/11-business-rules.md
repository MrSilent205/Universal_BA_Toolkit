# Danh mục Quy tắc Nghiệp vụ (Business Rules Catalog)

---
id: DOC-BR-[MODULE]-001
title: Business Rules Catalog - [Tên Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [srs, business-rules, validation, policies]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Nguyên tắc Áp dụng
Mọi quy tắc nghiệp vụ trong tài liệu này có tính chất bắt buộc tuân thủ (Mandatory Enforcement), được cài đặt ở tầng Backend Service / Domain Entity và không phụ thuộc vào giao diện người dùng. Mọi phát biểu đều tuân thủ cấu trúc logic 3 vế: **WHEN (Khi)** $ightarrow$ **THEN (Thì)** $ightarrow$ **UNLESS (Ngoại lệ)**.

## 2. Bảng Danh mục Quy tắc Nghiệp vụ Toàn diện

| Mã BR | Tên Quy tắc | Phân hệ chi phối | Phát biểu Logic Chuẩn (WHEN ... THEN ... UNLESS ...) | Mã lỗi phát sinh |
| :--- | :--- | :--- | :--- | :--- |
| `BR-SEC-001` | Độ phức tạp mật khẩu | Xác thực | **WHEN** tạo mới hoặc đổi mật khẩu **THEN** độ dài tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt **UNLESS** người dùng đăng nhập bằng mạng xã hội OAuth2 | `ERR-AUTH-422-02` |
| `BR-SEC-002` | Tạm khóa tài khoản | Bảo mật | **WHEN** người dùng nhập sai mật khẩu 5 lần liên tiếp trong 15 phút **THEN** khóa tạm thời form đăng nhập trong 15 phút **UNLESS** được mở khóa bởi Super Admin | `ERR-AUTH-403-02` |
| `BR-PROMO-001`| Giới hạn mã giảm giá | Khuyến mãi | **WHEN** thanh toán đơn hàng **THEN** mỗi đơn chỉ được áp dụng tối đa 01 voucher sản phẩm và 01 voucher vận chuyển **UNLESS** đơn hàng VIP hạng Kim Cương | `ERR-ORD-422-04` |
| `BR-ORD-001` | Tự động hủy đơn | Đơn hàng | **WHEN** đơn hàng ở trạng thái `PENDING_PAYMENT` quá 15 phút mà chưa nhận được tín hiệu thanh toán **THEN** tự động chuyển sang `EXPIRED` và giải phóng kho **UNLESS** đơn hàng COD | - |
| `BR-ORD-002` | Hủy đơn đang xử lý | Vận hành | **WHEN** khách hàng bấm yêu cầu hủy đơn **THEN** chỉ chấp thuận khi đơn chưa chuyển sang trạng thái `SHIPPING` **UNLESS** có sự can thiệp duyệt thủ công của Trưởng phòng Vận hành | `ERR-ORD-403-05` |
| `BR-RFND-001`| Hoàn tiền giao dịch | Kế toán | **WHEN** đơn hàng bị hủy hoặc giao thất bại **THEN** hoàn tiền lại đúng phương thức thanh toán gốc của khách trong vòng 3-5 ngày làm việc **UNLESS** khách hàng chọn nhận voucher hoàn tiền ngay | - |
