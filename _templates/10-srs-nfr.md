# Tiêu chuẩn Yêu cầu Phi Chức năng (Non-Functional Requirements - NFR)

---
id: DOC-NFR-[MODULE]-001
title: Non-Functional Requirements Specification - [Tên Hệ Thống]
version: 1.0.0
phase: 02-elicit-spec
domain: [Hệ Thống]
tags: [srs, nfr, iso-25010, performance, security]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Khung Tiêu chuẩn Đo lường ISO/IEC 25010
Toàn bộ các tiêu chí phi chức năng dưới đây đều được định lượng bằng chỉ số kỹ thuật có thể đo kiểm tra tự động được qua các công cụ giám sát (APM, Grafana, k6, SonarQube).

## 2. Bảng Chỉ số Yêu cầu Phi Chức năng Định lượng

| Trụ cột Chất lượng | Chỉ số Đo lường (Metric) | Mức Cam kết (SLA / Target) | Phương pháp Kiểm chứng (Verification) |
| :--- | :--- | :--- | :--- |
| **1. Hiệu năng (Performance)** | Read API Latency (P95) | **< 300ms** dưới tải 1.000 RPS | Kiểm thử tải bằng k6 / Locust |
| | Write API Latency (P95) | **< 800ms** dưới tải 500 RPS | Kiểm thử tải k6 kịch bản checkout |
| | Thông lượng đỉnh (Peak TPS) | Chịu tải **3.000 TPS** không lỗi | Stress test trên môi trường Staging |
| **2. Bảo mật (Security)** | Giao thức mã hóa mạng | **TLS 1.3** bắt buộc cho mọi kết nối | SSL Labs Audit (Grade A+) |
| | Mã hóa dữ liệu lưu trữ (At-rest)| **AES-256** cho toàn bộ dữ liệu PII | Kiểm toán cấu trúc Database |
| | Thuật toán băm mật khẩu | **Argon2id** (hoặc Bcrypt cost 12) | Code review & Security scan |
| | Phòng chống tấn công OWASP | Zero Critical/High vulnerabilities | Quét tự động bằng OWASP ZAP / Snyk |
| | Giới hạn tần suất gọi API | **100 req/min/IP** cho Public APIs | Rate limiting qua API Gateway / Nginx |
| **3. Độ sẵn sàng (Reliability)** | Tỷ lệ Uptime hệ thống | **99.9%** (Downtime < 8.7h/năm) | UptimeRobot / Datadog SLA Monitor |
| | Mất mát dữ liệu tối đa (RPO) | **< 15 phút** | Cơ chế sao lưu WAL streaming |
| | Thời gian khôi phục sự cố (RTO)| **< 1 giờ** | Diễn tập phục hồi thảm họa định kỳ |
| **4. Tiếp cận (Usability)** | Chuẩn Accessibility Web | **WCAG 2.1 Level AA** | Quét tự động qua Google Lighthouse |
| | Tỷ lệ tương phản màu sắc | **>= 4.5:1** cho văn bản thông thường | Figma Contrast Checker |
| **5. Tương thích (Compatibility)**| Độ phân giải màn hình | Hỗ trợ từ **360px** đến **1920px** | Kiểm thử Responsive đa thiết bị |
