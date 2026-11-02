# Kế hoạch Lộ trình Sản phẩm (Product Roadmap)

---
id: DOC-RDM-[PRODUCT_CODE]-001
title: Product Roadmap - [Tên Sản Phẩm]
version: 1.0.0
phase: 01-planning
domain: [Tên Phân Hệ]
tags: [roadmap, timeline, release, planning]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Tóm tắt Chiến lược Phát hành (Release Strategy)
Lộ trình phát triển được phân bổ theo mô hình linh hoạt **Now / Next / Later**, kết hợp các đợt phát hành Release Sprints nhằm kiểm soát rủi ro và thu hồi giá trị đầu tư sớm nhất.

## 2. Ma trận Lộ trình 3 Làn (Now / Next / Later Matrix)

```
========================================================================================
           NOW (Tháng 1-2)       │       NEXT (Tháng 3-4)       │      LATER (Q3-Q4)
             [MVP Launch]        │      [Growth & Expand]       │      [Scale & AI]
========================================================================================
- Xác thực OTP & Google SSO      │ - Thanh toán Thẻ quốc tế     │ - Hệ thống AI Gợi ý
- Quản lý Giỏ hàng & Checkout    │ - Ví điện tử & Trả góp       │ - Chatbot CSKH tự động
- Cổng VNPay & Thanh toán COD    │ - Mã giảm giá cá nhân hóa    │ - Mở rộng Bán hàng Đa kênh
- Quản trị Đơn hàng Nội bộ       │ - Tích hợp Đơn vị Vận chuyển │ - Ứng dụng Mobile iOS/Android
========================================================================================
```

## 3. Kế hoạch Chi tiết Từng Đợt Phát hành (Release Milestones)

### 3.1. Release 1.0 — MVP Core Launch (Now)
- **Mục tiêu đợt phát hành**: Đưa phiên bản cốt lõi lên môi trường Production, cho phép khách hàng đặt hàng và thanh toán trực tuyến an toàn.
- **Thời hạn phát hành kỳ vọng (Target Date)**: [YYYY-MM-DD]
- **Danh mục Yêu cầu Chức năng**:
  - `FR-AUTH-LGN-001`: Đăng nhập OTP SMS (P0).
  - `FR-ORD-CHKT-001`: Giỏ hàng và luồng Checkout (P0).
  - `FR-PAY-GATE-001`: Tích hợp VNPay (P0).
- **Phụ thuộc kỹ thuật (Dependencies)**: Đăng ký thành công SMS Brandname và tài khoản Merchant VNPay.
- **Tiêu chuẩn Hoàn thành (Definition of Done - DoD)**:
  - 100% test cases P0 passed trên Staging.
  - Vượt qua bài kiểm thử tải 1.000 TPS với P95 < 500ms.
  - Hoàn tất tài liệu hướng dẫn vận hành CSKH (`user-guide.md`).

### 3.2. Release 1.1 — Logistics & Promotion (Next)
- **Mục tiêu đợt phát hành**: Tự động hóa kết nối vận chuyển và tối ưu hóa tỷ lệ chuyển đổi bằng voucher.
- **Thời hạn phát hành kỳ vọng**: [YYYY-MM-DD]
- **Danh mục Yêu cầu**:
  - `FR-SHIP-TRACK-001`: Tự động đẩy đơn sang Giao Hàng Nhanh / ViettelPost (P1).
  - `FR-PROMO-VCHR-001`: Hệ thống mã giảm giá theo điều kiện giỏ hàng (P1).

### 3.3. Release 2.0 — Omni-channel & Ecosystem (Later)
- **Mục tiêu**: Tích hợp POS cửa hàng trực tiếp và phát hành ứng dụng di động React Native.

## 4. Quản trị Rủi ro & Điểm nghẽn (Risks & Blockers)
| STT | Rủi ro tiềm ẩn | Mức độ | Biện pháp giảm thiểu rủi ro | Người phụ trách |
| :---: | :--- | :---: | :--- | :--- |
| 1 | Cổng thanh toán cấp môi trường Sandbox trễ | Cao | Sử dụng Mock API Server để dev frontend/backend song song | Tech Lead |
| 2 | Quy trình ký hợp đồng SMS Brandname kéo dài | Trung bình | Kích hoạt phương án dự phòng gửi OTP qua Email trong bản Beta | Project Manager |

## 5. Lịch sử sửa đổi
| Phiên bản | Ngày | Người thực hiện | Tóm tắt thay đổi |
| :---: | :---: | :--- | :--- |
| 1.0.0 | [YYYY-MM-DD] | [Họ Tên] | Thiết lập lộ trình phát hành ban đầu |
