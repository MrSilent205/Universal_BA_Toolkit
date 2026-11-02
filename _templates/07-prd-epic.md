# Đặc tả Phân rã Epic Tính năng (Epic Breakdown Specification)

---
id: DOC-EPC-[EPIC_CODE]-001
title: Epic Breakdown - [Tên Epic]
version: 1.0.0
phase: 02-elicit-spec
domain: [Phân Hệ Nghiệp Vụ]
tags: [epic, capability, decomposition, agile]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Định danh Epic & Tuyên ngôn Mục tiêu (Epic Statement)
- **Mã Epic**: `EPIC-[MODULE]-[SEQ]` (vd: `EPIC-PAY-001`)
- **Tên Epic**: [Tên Phân Hệ Lớn - vd: Hệ thống Xử lý Thanh toán Đa kênh & Đối soát Tự động]
- **Tuyên ngôn Giá trị**: "Epic này cung cấp giải pháp thanh toán toàn diện không dùng tiền mặt cho khách hàng mua sắm, đồng thời tự động hóa việc đối soát doanh thu cho phòng kế toán."

## 2. Phân rã Năng lực Cốt lõi (Capability Decomposition)

### Capability 1: Tích hợp Cổng Thanh toán Trực tuyến (Online Gateways)
- **Mã định danh**: `CAP-PAY-01`
- **Mức độ ưu tiên**: **P0 (Must Have - MVP)**
- **Mô tả**: Tích hợp các cổng thanh toán thông dụng tại Việt Nam (VNPay QR, MoMo, ZaloPay).
- **Yêu cầu FR thành phần**:
  - `FR-PAY-GATE-001`: Khởi tạo phiên thanh toán qua SDK/Redirect URL.
  - `FR-PAY-GATE-002`: Xử lý Webhook IPN cập nhật kết quả tức thì.

### Capability 2: Lưu trữ & Mã hóa Thẻ Quốc tế (Card Tokenization)
- **Mã định danh**: `CAP-PAY-02`
- **Mức độ ưu tiên**: **P1 (Should Have - Phase 2)**
- **Mô tả**: Cho phép người dùng lưu thông tin thẻ Visa/Mastercard an toàn đạt chuẩn PCI-DSS Level 1.
- **Yêu cầu FR thành phần**:
  - `FR-PAY-CARD-001`: Đăng ký lưu thẻ và sinh Token đại diện.
  - `FR-PAY-CARD-002`: Thanh toán 1 chạm (One-click Checkout) qua Token.

### Capability 3: Đối soát Giao dịch & Xử lý Hoàn tiền (Reconciliation & Refund)
- **Mã định danh**: `CAP-PAY-03`
- **Mức độ ưu tiên**: **P1 (Should Have - Phase 2)**
- **Mô tả**: Tự động so khớp file đối soát hàng ngày từ ngân hàng và xử lý lệnh hoàn tiền cho khách.
- **Yêu cầu FR thành phần**:
  - `FR-PAY-RECON-001`: Nhập file sao kê và tự động phát hiện lệnh lệch.
  - `FR-PAY-RFND-001`: Quy trình duyệt hoàn tiền đa cấp.

## 3. Ranh giới Kiến trúc & Dịch vụ Bên thứ Ba (Architecture Boundaries)
- **Hệ thống nội bộ bị ảnh hưởng**: Order Service, Notification Service, Accounting Database.
- **Dịch vụ đối tác bên ngoài**: VNPay API, MoMo Open API, Ngân hàng Vietcombank.

## 4. Tiêu chuẩn Nghiệm thu Toàn diện của Epic (Epic Acceptance Criteria)
- [ ] 100% giao dịch thanh toán thành công được cập nhật trạng thái đơn hàng trong vòng < 2 giây.
- [ ] Tỷ lệ xử lý lỗi mạng tự động retry đạt 99.9%, không phát sinh tình trạng trừ tiền mà đơn không tạo.
- [ ] Báo cáo đối soát doanh thu khớp 100% với số dư tài khoản ngân hàng thực tế.
