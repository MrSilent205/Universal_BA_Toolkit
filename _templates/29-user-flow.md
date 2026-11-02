# Phân tích Luồng Người dùng (User Navigation Flow)

---
id: DOC-FLW-[FEATURE]-001
title: User Flow Specification - [Tên Tính Năng]
version: 1.0.0
phase: 05-screen-design
domain: [Giao Diện]
tags: [user-flow, screen-transitions, ux, mermaid]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Danh mục Màn hình trong Luồng (Screen Inventory)
| Mã Màn hình | Tên Màn hình | Loại giao diện | Mục tiêu người dùng | Hành động chính (CTA) |
| :--- | :--- | :---: | :--- | :--- |
| `SCR-ORD-001` | Màn hình Giỏ hàng | Full Screen | Kiểm tra danh sách sản phẩm và số lượng | Nút "Tiến hành Đặt hàng" |
| `SCR-ORD-002` | Màn hình Điền Thông tin | Full Screen | Chọn địa chỉ giao hàng và mã voucher | Nút "Tiếp tục Thanh toán" |
| `SCR-ORD-003` | Modal Chọn Phương thức | Modal Popup | Chọn Cổng VNPay, MoMo hoặc COD | Nút "Xác nhận & Trả tiền" |
| `SCR-ORD-004` | Màn hình Kết quả Đơn hàng | Full Screen | Xem mã đơn hàng và hướng dẫn nhận hàng | Nút "Về trang chủ" |

## 2. Sơ đồ Luồng Chuyển dịch Màn hình (Mermaid Navigation Flow)

```mermaid
flowchart TD
    SCR01["SCR-ORD-001: Giỏ hàng"] -->|Bấm Đặt hàng [Giỏ có SP]| SCR02["SCR-ORD-002: Thông tin giao hàng"]
    SCR01 -->|Giỏ hàng trống| EmptyCart["SCR-ORD-001-Empty: Giỏ trống"]
    EmptyCart -->|Bấm Mua sắm ngay| Catalog["Danh mục sản phẩm"]

    SCR02 -->|Bấm Tiếp tục| SCR03{"SCR-ORD-003: Chọn phương thức"}
    SCR02 -->|Bấm Quay lại| SCR01

    SCR03 -->|Chọn COD| OrderCOD["Xử lý tạo đơn COD"]
    OrderCOD --> SCR04["SCR-ORD-004: Đặt hàng thành công"]

    SCR03 -->|Chọn VNPay| RedirectVNPay["Chuyển sang trang VNPay QR"]
    RedirectVNPay -->|Thanh toán thành công| SCR04
    RedirectVNPay -->|Khách hủy / Timeout| FailScreen["SCR-ORD-005: Thanh toán thất bại"]

    FailScreen -->|Bấm Thử lại| SCR03
    FailScreen -->|Bấm Hủy đơn| SCR01
```

## 3. Đặc tả 5 Trạng thái Cốt lõi của Màn hình (The 5 UI States)
- **1. Normal State**: Danh sách sản phẩm hiển thị đầy đủ ảnh, giá, nút tăng giảm số lượng.
- **2. Loading State**: Skeleton placeholders nhấp nháy xám nhạt, vô hiệu hóa các nút bấm tránh click đúp.
- **3. Empty State**: Hình minh họa giỏ hàng rỗng, thông điệp "Giỏ hàng của bạn đang trống", nút CTA "Khám phá sản phẩm ngay".
- **4. Error State**: Hiển thị banner đỏ ở đầu form nếu có sản phẩm hết hàng hoặc mã giảm giá hết hạn (`ERR-ORD-409-01`).
- **5. Offline State**: Thanh thông báo vàng "Mất kết nối Internet", giữ nguyên dữ liệu đã nhập trong form, nút "Thử kết nối lại".
