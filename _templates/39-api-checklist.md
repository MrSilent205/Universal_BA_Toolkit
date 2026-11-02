# Checklist Kiểm định Chất lượng Tích hợp API (API QA Checklist)

---
id: DOC-APIC-[MODULE]-001
title: API Integration Checklist - [Tên API / Phân Hệ]
version: 1.0.0
phase: 06-api-integration
domain: [Kiểm Thử]
tags: [api-checklist, qa, integration-test, security-test]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Xác thực & Phân quyền (Authentication & Authorization)
- [ ] Không gửi header `Authorization` $ightarrow$ Trả về đúng mã HTTP `401 Unauthorized`.
- [ ] Gửi token JWT đã hết hạn $ightarrow$ Trả về `401` kèm mã lỗi `ERR-AUTH-401-01`.
- [ ] Gửi token bị sửa đổi chữ ký $ightarrow$ Trả về `401 Unauthorized`.
- [ ] User A cố tình sửa `order_id` trên URL sang đơn của User B $ightarrow$ Trả về `403 Forbidden` (Chặn lỗi IDOR).

## 2. Kiểm tra Ràng buộc Dữ liệu Đầu vào (Payload Validation)
- [ ] Gửi request body rỗng `{}` $ightarrow$ Báo lỗi `422 Unprocessable Entity` chỉ rõ các trường thiếu.
- [ ] Gửi kiểu dữ liệu sai (string vào trường số tiền decimal) $ightarrow$ Trả về `422`.
- [ ] Gửi chuỗi ký tự dài 10.000 ký tự $ightarrow$ Chặn an toàn, không làm crash server.
- [ ] Thử chèn ký tự SQL Injection và XSS payload $ightarrow$ Dữ liệu được làm sạch an toàn.

## 3. Tính Bất biến & Chống Trùng lặp (Idempotency & Race Conditions)
- [ ] Gửi 2 request thanh toán cùng lúc trong 1ms với cùng `X-Idempotency-Key` $ightarrow$ Chỉ có 1 giao dịch được tạo.
- [ ] Gửi lại request đã thanh toán thành công với cùng key $ightarrow$ Trả về đúng kết quả cũ từ cache.

## 4. Kiểm soát Tải & Phân trang (Rate Limiting & Pagination)
- [ ] Bắn 150 requests liên tiếp từ 1 IP $ightarrow$ Trả về `429 Too Many Requests` có header `Retry-After`.
- [ ] Phân trang `page=1&limit=20` trả về đúng 20 bản ghi kèm object `meta` có `total`, `page`, `limit`.

## 5. Webhook & Khả năng Phục hồi (Webhook & Resilience)
- [ ] Kiểm tra xác thực chữ ký HMAC trước khi xử lý dữ liệu IPN.
- [ ] Giả lập endpoint Webhook bị lỗi 500 $ightarrow$ Server tự động kích hoạt cơ chế retry Exponential Backoff.
