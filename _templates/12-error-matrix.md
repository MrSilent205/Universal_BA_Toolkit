# Ma trận Lỗi Hệ thống Hợp nhất (Consolidated Error Matrix)

---
id: DOC-ERR-[MODULE]-001
title: Consolidated Error Matrix - [Tên Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [srs, error-matrix, exceptions, http-codes, ui-messages]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Nguyên tắc Xây dựng Ma trận Lỗi
Tất cả các thông báo lỗi trả về cho client đều phải được chuẩn hóa:
1. Có mã định danh duy nhất theo cấu trúc `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` (Rule 03 & Rule 11).
2. Thông báo hiển thị cho người dùng cuối (UI Message) phải thân thiện, dễ hiểu, viết bằng tiếng Việt tự nhiên và hướng dẫn bước xử lý tiếp theo.
3. Không để lộ thông tin nhạy cảm của hệ thống (stack trace, câu lệnh SQL, IP máy chủ) trong thông báo người dùng.

## 2. Bảng Ma trận Lỗi Hợp nhất Chuẩn

| Mã Lỗi (ERR Code) | HTTP | Điều kiện kích hoạt (Trigger Condition) | Khóa Đa ngôn ngữ (i18n Key) | Thông báo Hiển thị (End-User Message) | Mức độ | Hướng xử lý đề xuất (Next Action) |
| :--- | :---: | :--- | :--- | :--- | :---: | :--- |
| `ERR-AUTH-401-01` | 401 | JWT access token hết hạn hoặc không hợp lệ | `error.auth.token_expired` | Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại. | High | Xóa token client, chuyển hướng về `/login` |
| `ERR-AUTH-403-02` | 403 | Nhập sai mật khẩu 5 lần (theo BR-SEC-002) | `error.auth.account_locked` | Tài khoản tạm khóa 15 phút do nhập sai mật khẩu nhiều lần. | High | Vô hiệu hóa nút Đăng nhập, đếm ngược 15 phút |
| `ERR-VAL-422-01` | 422 | Định dạng email nhập vào không hợp lệ | `error.val.email_invalid` | Email không đúng định dạng (vd: user@domain.vn). | Medium | Focus vào ô input Email, hiển thị viền đỏ |
| `ERR-VAL-422-02` | 422 | Mật khẩu không thỏa mãn độ phức tạp (BR-SEC-001) | `error.val.password_weak` | Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt. | Medium | Hiển thị checklist gợi ý dưới ô mật khẩu |
| `ERR-ORD-409-01` | 409 | Sản phẩm trong giỏ bị hết tồn kho khi bấm mua | `error.ord.out_of_stock` | Một số sản phẩm trong giỏ đã hết hàng. Vui lòng kiểm tra lại. | High | Tự động làm mới giỏ hàng, đánh dấu đỏ mục hết |
| `ERR-ORD-422-04` | 422 | Áp dụng 2 mã voucher cùng loại (BR-PROMO-001) | `error.ord.voucher_conflict` | Mỗi đơn hàng chỉ được dùng 1 mã giảm giá sản phẩm. | Medium | Giữ lại mã có giá trị cao hơn, hủy mã cũ |
| `ERR-PAY-502-01` | 502 | Cổng thanh toán bên thứ ba bị timeout quá 30s | `error.pay.gateway_timeout` | Cổng thanh toán đang gián đoạn. Giao dịch chưa bị trừ tiền. | Critical | Giữ đơn ở trạng thái PENDING, gợi ý thử lại |
| `ERR-SYS-500-01` | 500 | Lỗi ngoại lệ hệ thống không xác định | `error.sys.internal_server` | Đã xảy ra sự cố kỹ thuật. Đội ngũ kỹ thuật đang xử lý. | Critical | Log stack trace kèm request_id lên hệ thống giám sát |
