# Product Requirements Document (PRD)

---
id: DOC-PRD-[PRODUCT_CODE]-001
title: Product Requirements Document - [Tên Sản Phẩm]
version: 1.0.0
phase: 01-planning
domain: [Tên Phân Hệ / Lĩnh Vực]
tags: [prd, planning, strategy, mvp]
author: [Tên Tác Giả / Senior IT BA]
last_updated: [YYYY-MM-DD]
---

## 1. Tổng quan & Tầm nhìn Sản phẩm (Executive Summary)
- **Tên sản phẩm**: [Tên Sản Phẩm / Tên Dự Án]
- **Tầm nhìn (Vision Statement)**: [Mô tả tầm nhìn 1-2 câu: Cung cấp giải pháp gì cho ai để đạt được giá trị gì]
- **Tuyên ngôn Giá trị (Value Proposition)**:
  - *Đối tượng mục tiêu*: [Khách hàng hoặc nhóm người dùng cốt lõi]
  - *Vấn đề cần giải quyết*: [Nỗi đau lớn nhất đang gặp phải]
  - *Giải pháp khác biệt*: [Điểm độc đáo so với đối thủ hoặc phương pháp thủ công hiện tại]

## 2. Mục tiêu Kinh doanh Định lượng (Business Objectives & KPIs)
| STT | Mục tiêu Kinh doanh (SMART Objective) | Chỉ số đo lường (KPI / Metric) | Mức cơ sở (Baseline) | Mục tiêu kỳ vọng (Target) | Thời hạn hoàn thành |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 1 | Tăng tỷ lệ chuyển đổi đơn hàng | Conversion Rate | 1.8% | 3.5% | Sau 3 tháng ra mắt |
| 2 | Rút ngắn thời gian thanh toán | Checkout Duration | 180 giây | < 45 giây | Sau 1 tháng MVP |
| 3 | Giảm tỷ lệ bỏ giỏ hàng | Cart Abandonment Rate | 68% | < 45% | Sau 2 tháng ra mắt |

## 3. Chân dung Người dùng (User Personas)
### 3.1. Primary Persona: [Tên Nhân vật - vd: Nguyễn Văn An (Nhân viên Văn phòng)]
- **Độ tuổi / Nghề nghiệp**: 28 tuổi / Nhân viên Marketing
- **Mục tiêu (Goals)**: Đặt hàng nhanh gọn trong giờ nghỉ trưa, thanh toán không cần nhập lại thẻ ngân hàng.
- **Nỗi đau (Pain Points)**: Thường xuyên bị lỗi timeout thanh toán, form nhập địa chỉ quá dài dòng.
- **Mức độ am hiểu công nghệ**: Cao (thường xuyên mua sắm qua app).

### 3.2. Secondary Persona: [Tên Nhân vật - vd: Trần Thị Bình (Chuyên viên CSKH & Quản trị)]
- **Mục tiêu**: Tra cứu nhanh lịch sử đơn hàng, hỗ trợ khách xử lý giao dịch treo trong < 2 phút.
- **Nỗi đau**: Giao diện admin chậm, không có mã lỗi rõ ràng khi đối tác cổng thanh toán trả về lỗi.

## 4. Phạm vi Sản phẩm (Product Scope)
### 4.1. Trong Phạm vi (In-Scope - MVP Phase 1)
- Đăng nhập/Đăng ký bằng Số điện thoại + OTP SMS và Google SSO.
- Tìm kiếm sản phẩm, lọc theo danh mục và xem chi tiết tồn kho.
- Giỏ hàng và quy trình Checkout 3 bước.
- Tích hợp cổng thanh toán trực tuyến (VNPay / MoMo) và COD.
- Bảng quản trị đơn hàng cơ bản cho nhân viên vận hành.

### 4.2. Ngoài Phạm vi (Out-of-Scope - Dành cho Phase 2)
- Chưa hỗ trợ tích hợp cổng thanh toán quốc tế (Stripe, PayPal).
- Chưa hỗ trợ chương trình khách hàng thân thiết tích lũy điểm đa tầng.
- Chưa hỗ trợ tự động gợi ý sản phẩm bằng thuật toán AI Recommendation.

## 5. Danh mục Tính năng Cấp cao (Feature Catalog)
| Mã FR | Tên Tính năng | Mô tả tóm tắt | Độ ưu tiên | Phân hệ (Module) |
| :--- | :--- | :--- | :---: | :--- |
| `FR-AUTH-LGN-001` | Đăng nhập bằng OTP SMS | Gửi mã 6 số qua SMS Brandname xác thực | P0 | Authentication |
| `FR-AUTH-SSO-001` | Đăng nhập Google SSO | Đăng nhập 1 chạm qua giao thức OAuth2 | P1 | Authentication |
| `FR-ORD-CHKT-001` | Thanh toán đơn hàng | Cho phép chọn COD hoặc Cổng thanh toán | P0 | Order & Checkout |
| `FR-ORD-VCHR-001` | Áp dụng voucher | Kiểm tra tính hợp lệ và trừ tiền đơn | P1 | Order & Promotion |

## 6. Lịch sử sửa đổi (Revision History)
| Phiên bản | Ngày cập nhật | Người thực hiện | Vai trò | Nội dung thay đổi | Trạng thái |
| :---: | :---: | :--- | :--- | :--- | :---: |
| 1.0.0 | [YYYY-MM-DD] | [Họ Tên] | Senior IT BA | Khởi tạo tài liệu PRD ban đầu | APPROVED |
