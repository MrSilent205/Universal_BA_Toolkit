# Đặc tả Kỹ thuật Dịch ngược từ Mã Nguồn (Code-to-SRS Specification)

---
id: DOC-C2S-[MODULE]-001
title: Code-to-SRS Specification - [Tên Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [code-to-srs, reverse-engineering, legacy-code, api-endpoints]
author: [Tên Tác Giả / Senior IT BA]
last_updated: [YYYY-MM-DD]
---

## 1. Nguồn Mã Nguồn Quét (Codebase Inspection Scope)
- **Repository**: [Đường dẫn repo / Tên dự án]
- **Commit SHA / Branch**: `main` @ `abcdef123`
- **Các tệp mã nguồn phân tích**:
  - Routers: `src/routes/order.routes.ts`
  - Controllers: `src/controllers/order.controller.ts`
  - Services: `src/services/order.service.ts`
  - Database Models: `src/models/order.model.ts`

## 2. Bảng Danh mục API Endpoints Trích xuất từ Code
| HTTP Method | URL Path | Controller Action | Middleware Xác thực | Mã FR Tái lập |
| :---: | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | `OrderController.createOrder` | `AuthGuard`, `RateLimit` | `FR-ORD-CHKT-001` |
| `GET` | `/api/v1/orders/{id}` | `OrderController.getOrderById` | `AuthGuard`, `OwnerCheck` | `FR-ORD-VIEW-001` |
| `PATCH`| `/api/v1/orders/{id}/cancel` | `OrderController.cancelOrder` | `AuthGuard` | `FR-ORD-CNCL-001` |

## 3. Logic Nghiệp vụ & Validation Ẩn Trích xuất từ Service Layer
- **Validation trích xuất từ code**:
  - Dòng 45 `order.service.ts`: `if (cart.items.length === 0) throw new BadRequest('Cart is empty')` $ightarrow$ Tái lập thành điều kiện kiểm tra giỏ hàng.
  - Dòng 82 `order.service.ts`: `if (product.stock < item.quantity) throw new Conflict('Stock not enough')` $ightarrow$ Tái lập thành `ERR-ORD-409-01`.
- **Business Rules tái lập**:
  - `BR-ORD-001`: Đơn hàng tự động hủy nếu sau 900 giây (15 phút) không nhận được IPN từ cổng thanh toán.

## 4. Mô hình Dữ liệu Trích xuất (Extracted Schema)
- Bảng `orders`: Khóa chính `id UUID`, Khóa ngoại `user_id UUID`, Cột `status VARCHAR(50)`, Cột `total_amount DECIMAL(15,2)`.
