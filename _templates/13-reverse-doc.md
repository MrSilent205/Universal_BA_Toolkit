# Tài liệu Tái lập Đặc tả Nghiệp vụ (Reverse Documentation Spec)

---
id: DOC-REV-[MODULE]-001
title: Reverse Documentation Specification - [Tên Tính Năng Tái Lập]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [reverse-doc, legacy, recovered, gap-resolution]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Nguồn Dữ liệu Tái lập (Source Ingestion Log)
Tài liệu này được tái lập và chuẩn hóa từ các nguồn thông tin phân mảnh sau:
- Biên bản cuộc họp nghiệp vụ ngày [YYYY-MM-DD].
- Ghi chép trao đổi qua kênh chat Slack / Email giữa PO và Development Team.
- Tài liệu Word / Slides trình chiếu phiên bản cũ.

## 2. Bảng Danh mục Điểm Mâu thuẫn & Phương án Thống nhất
| STT | Vấn đề / Quy tắc Nghiệp vụ | Thông tin cũ (Nguồn phân mảnh) | Quyết định Chuẩn hóa Cuối cùng | Người phê duyệt |
| :---: | :--- | :--- | :--- | :--- |
| 1 | Thời hạn hủy đơn hàng | Ghi chú A ghi 24h; Ghi chú B ghi 15 phút | **15 phút** kể từ lúc tạo đơn (chuẩn hóa thành `BR-ORD-001`) | Product Owner |
| 2 | Phương thức xác thực OTP | Đề xuất gửi qua Email | **SMS Brandname** cho khách hàng, Email cho Admin | Tech Lead |

## 3. Khung Đặc tả Nghiệp vụ Tái lập Chuẩn hóa
- **Yêu cầu Chức năng**: Gán mã `FR-[MODULE]-[FEAT]-[SEQ]` theo Rule 01.
- **Quy tắc Nghiệp vụ**: Gán mã `BR-[DOMAIN]-[SEQ]` phát biểu WHEN/THEN/UNLESS theo Rule 02.
- **Mã Lỗi Hệ thống**: Chuẩn hóa mã phản hồi HTTP `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]`.
