# Tài liệu Đặc tả Yêu cầu Kỹ thuật (SRS Master)

---
id: DOC-SRS-[MODULE]-001
title: Software Requirements Specification (IEEE 830) - [Tên Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [srs, ieee-830, specifications, fr, nfr]
author: [Tên Tác Giả / Senior IT BA]
last_updated: [YYYY-MM-DD]
---

## 1. Giới thiệu (Introduction)
- **1.1 Mục đích (Purpose)**: Đặc tả toàn diện các yêu cầu kỹ thuật và nghiệp vụ của phân hệ [Tên Phân Hệ] theo tiêu chuẩn IEEE 830 / ISO/IEC/IEEE 29148.
- **1.2 Phạm vi Sản phẩm (Scope)**: Hệ thống giải quyết các bài toán [Mô tả phạm vi], làm căn cứ phát triển backend, frontend, database và kiểm thử.
- **1.3 Thuật ngữ & Viết tắt (Definitions & Acronyms)**:
  - *FR*: Functional Requirement (Yêu cầu chức năng).
  - *BR*: Business Rule (Quy tắc nghiệp vụ).
  - *ERR*: Error Code (Mã lỗi hệ thống).
  - *NFR*: Non-Functional Requirement (Yêu cầu phi chức năng).
  - *Idempotency*: Tính chất xử lý nhiều lần nhưng cho ra kết quả duy nhất không đổi.
- **1.4 Tài liệu Tham chiếu (References)**:
  - Tài liệu PRD: `docs/{product_name}/01-prd.md`
  - Quy chuẩn đặt mã: `rules/01-fr-naming-convention.md`, `rules/02-br-naming-convention.md`

## 2. Mô tả Tổng quan Hệ thống (Overall Description)
- **2.1 Bối cảnh Sản phẩm (Product Perspective)**: Phân hệ đóng vai trò là lõi trung tâm kết nối giữa Web/Mobile client, Payment Gateway và Data Warehouse.
- **2.2 Phân loại Người dùng (User Classes & Characteristics)**:
  - *Khách vãng lai (Guest)*: Chỉ có quyền xem danh mục.
  - *Thành viên đã xác thực (Registered User)*: Toàn quyền đặt hàng và quản lý tài khoản.
  - *Quản trị viên (Admin)*: Quản lý cấu hình và duyệt hoàn tiền.
- **2.3 Ràng buộc Thiết kế & Triển khai (Design & Implementation Constraints)**:
  - Kiến trúc Microservices giao tiếp qua RESTful JSON và Kafka Event-Driven.
  - Cơ sở dữ liệu chính: PostgreSQL 16; Cache: Redis Cluster.

## 3. Danh mục Yêu cầu Kỹ thuật Chi tiết (Specific Requirements)

### 3.1. Danh mục Yêu cầu Chức năng (Functional Requirements)
*Tham chiếu chi tiết tại: `09-srs-fr.md`*

| Mã FR | Tên Yêu cầu | Tác nhân | Ưu tiên | BR chi phối | Mã lỗi liên quan |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `FR-[MODULE]-[FEAT]-001` | [Tên yêu cầu] | [Actor] | P0 | `BR-[DOMAIN]-001` | `ERR-[MODULE]-422-01` |
| `FR-[MODULE]-[FEAT]-002` | [Tên yêu cầu] | [Actor] | P1 | `BR-[DOMAIN]-002` | `ERR-[MODULE]-409-01` |

### 3.2. Quy tắc Nghiệp vụ Hệ thống (Business Rules)
*Tham chiếu chi tiết tại: `11-business-rules.md`*

### 3.3. Ma trận Lỗi Hợp nhất (Consolidated Error Matrix)
*Tham chiếu chi tiết tại: `12-error-matrix.md`*

### 3.4. Yêu cầu Phi Chức năng (Non-Functional Requirements)
*Tham chiếu chi tiết tại: `10-srs-nfr.md`*
- P95 API Latency < 500ms; Throughput >= 1.000 TPS; Uptime SLA 99.9%.

## 4. Phụ lục (Appendices)
- Sơ đồ tương tác tuần tự: `docs/{feature}/srs/flows.md`
- Sơ đồ quan hệ thực thể: `docs/{feature}/srs/erd.md`
- Ma trận truy vết yêu cầu (RTM): `docs/{feature}/test/rtm.md`
