# Báo cáo Thẩm định Khả thi API Đối tác (Third-Party API Assessment)

---
id: DOC-APIA-[VENDOR]-001
title: API Assessment Report - [Tên Đối Tác / Dịch Vụ]
version: 1.0.0
phase: 06-api-integration
domain: [Tích Hợp]
tags: [api-assess, vendor-evaluation, sla, feasibility]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Thông tin Đối tác & Dịch vụ Khảo sát
- **Nhà cung cấp**: [Tên Đối tác - vd: Cổng Thanh toán VNPay / MoMo / SMS FPT]
- **Dịch vụ khảo sát**: [Tên API - vd: Cổng Thanh toán QR & Thẻ nội địa]
- **Đường dẫn tài liệu API**: `https://sandbox.vnpayment.vn/apis/docs/`

## 2. Bảng Chấm điểm Thẩm định Năng lực Kỹ thuật (Vendor Scorecard)
| Tiêu chí Đánh giá | Trọng số | Điểm (1-5) | Nhận xét chi tiết của Chuyên gia BA |
| :--- | :---: | :---: | :--- |
| **Kiến trúc & Chuẩn API** | 20% | 4.5 | Chuẩn RESTful JSON, có Webhook IPN, hỗ trợ HMAC-SHA256 |
| **Môi trường Sandbox & DX** | 20% | 5.0 | Cấp tài khoản test ngay lập tức, có sẵn thẻ test và dữ liệu ảo |
| **Cam kết SLA Uptime** | 25% | 4.0 | Cam kết 99.9%, có bồi thường dịch vụ khi sập quá 2h/tháng |
| **Giới hạn Tải (Rate Limit)**| 15% | 4.0 | Giới hạn 500 RPS trong gói Standard, đủ đáp ứng MVP |
| **Chính sách Chi phí** | 20% | 3.5 | Phí giao dịch 1.1% + 1.500đ/giao dịch thành công, không phí setup |
| **TỔNG ĐIỂM TRỌNG SỐ** | **100%** | **4.2 / 5.0** | **ĐẠT TIÊU CHUẨN LỰA CHỌN** |

## 3. Phân tích Bài toán Tự Xây vs Mua Ngoài (Build vs Buy)
- **Tự xây dựng (Build)**: Chi phí phát triển lớn (ước tính 400 triệu VNĐ, 6 tháng), rủi ro pháp lý giấy phép trung gian thanh toán của Ngân hàng Nhà nước.
- **Tích hợp giải pháp sẵn có (Buy/Partner)**: Triển khai trong 2 tuần, chi phí ban đầu 0đ, chỉ trả phí trên giao dịch thành công.
- **Kết luận**: **CHỌN MUA NGOÀI / HỢP TÁC TÍCH HỢP**.

## 4. Phương án Dự phòng & Ngắt mạch (Fallback & Circuit Breaker)
Cấu hình Circuit Breaker ngắt kết nối tạm thời nếu tỷ lệ lỗi từ VNPay vượt quá 50% trong 2 phút; tự động chuyển sang hiển thị cổng MoMo hoặc COD làm phương án thay thế.
