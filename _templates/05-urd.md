# Tài liệu Yêu cầu Người dùng (User Requirements Document - URD)

---
id: DOC-URD-[MODULE]-001
title: User Requirements Document - [Tên Tính Năng / Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [urd, personas, journey-map, user-needs]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Mục tiêu Tài liệu
Tài liệu này xác định các nhu cầu, kỳ vọng và hành trình trải nghiệm của các nhóm người dùng đối với hệ thống, làm căn cứ chuyển giao cho đội ngũ thiết kế UI/UX và đặc tả kỹ thuật SRS.

## 2. Hồ sơ Chân dung Người dùng (User Profiles & Personas)
| Vai trò (Actor) | Phân loại | Mục tiêu trọng tâm | Trở ngại / Nỗi đau lớn nhất | Môi trường sử dụng |
| :--- | :---: | :--- | :--- | :--- |
| **Khách hàng Mua sắm** | Primary | Mua hàng nhanh, xem trạng thái đơn minh bạch | Quá nhiều bước điền thông tin rườm rà | Mobile Web / App iOS |
| **Nhân viên CSKH** | Secondary | Tra cứu thông tin đơn, xử lý khiếu nại | Dữ liệu đơn phân tán ở nhiều hệ thống | Desktop Dashboard |
| **Quản trị viên (Admin)** | Secondary | Cấu hình tham số, theo dõi doanh thu | Báo cáo chậm, không thể phân quyền chi tiết | Desktop Admin Portal |

## 3. Bản đồ Hành trình Người dùng (Customer Journey Map)
```
[Giai đoạn 1: Khám phá] ──> [Giai đoạn 2: Lựa chọn] ──> [Giai đoạn 3: Thanh toán] ──> [Giai đoạn 4: Nhận hàng]
- Thấy sản phẩm qua quảng cáo    - Tìm kiếm & xem chi tiết    - Chọn địa chỉ & voucher       - Nhận hàng từ shipper
- Điểm chạm: Landing page       - Điểm chạm: Product detail  - Điểm chạm: Checkout screen   - Điểm chạm: SMS tracking
- Nỗi đau: Trang load chậm      - Nỗi đau: Thiếu ảnh thực tế - Nỗi đau: Phí ship quá cao    - Nỗi đau: Giao trễ hẹn
```

## 4. Danh mục Nhu cầu Người dùng (User Needs Catalog)
| Mã UN | Vai trò | Tuyên bố Nhu cầu Người dùng | Mức độ cấp thiết | Ánh xạ Yêu cầu FR |
| :--- | :--- | :--- | :---: | :--- |
| `UN-AUTH-001` | Khách hàng | Tôi muốn đăng nhập 1 chạm qua Google để không phải nhớ thêm mật khẩu | Critical | `FR-AUTH-SSO-001` |
| `UN-ORD-001` | Khách hàng | Tôi muốn lưu sẵn danh sách địa chỉ nhận hàng để không phải nhập lại mỗi lần mua | Important | `FR-USER-ADDR-001` |
| `UN-ORD-002` | Khách hàng | Tôi muốn nhìn thấy rõ số tiền giảm giá của từng voucher trước khi bấm thanh toán | Critical | `FR-ORD-CHKT-001` |
| `UN-CSKH-001` | CSKH | Tôi muốn xem được lịch sử thanh toán thời gian thực để giải đáp khi khách bị trừ tiền | Critical | `FR-RPT-ORD-001` |

## 5. Yêu cầu về Trải nghiệm & Tiếp cận (UX Standards)
- **Tốc độ thao tác**: Người dùng hoàn tất quá trình thanh toán trong tối đa 3 lần chạm (clicks/taps).
- **Hỗ trợ lỗi**: Mọi thông báo lỗi phải giải thích rõ nguyên nhân bằng tiếng Việt và hướng dẫn cách sửa ngay tại trường dữ liệu đó.
