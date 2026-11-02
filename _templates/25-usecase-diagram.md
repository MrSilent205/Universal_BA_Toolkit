# Sơ đồ Ca sử dụng & Ranh giới Hệ thống (Use Case Diagram)

---
id: DIAG-UC-[MODULE]-001
title: Use Case Diagram - [Tên Phân Hệ]
version: 1.0.0
phase: 03-diagrams
domain: [Phân Hệ]
tags: [usecase-diagram, mermaid, system-boundary, actors]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Ranh giới Hệ thống & Tác nhân (Actors)
- **Tác nhân chính (Primary Actor)**: Khách hàng mua sắm (Guest & Registered User).
- **Tác nhân hỗ trợ (Secondary Actor)**: Nhân viên CSKH, Thủ kho, Quản trị viên.
- **Tác nhân hệ thống (System Actor)**: Cổng thanh toán VNPay, SMS Brandname Service.

## 2. Sơ đồ Use Case Mermaid

```mermaid
flowchart LR
    subgraph Actors["Tác nhân ngoài"]
        Cust["👤 Khách hàng"]
        Admin["👨‍💼 Quản trị viên"]
        VNPay["🏦 Cổng VNPay"]
    end

    subgraph SystemBoundary["Hệ thống Thương Mại Điện Tử (System Boundary)"]
        direction TB
        UC1(["UC-01: Đăng nhập hệ thống"])
        UC2(["UC-02: Tìm kiếm sản phẩm"])
        UC3(["UC-03: Đặt hàng"])
        UC4(["UC-04: Áp dụng mã giảm giá"])
        UC5(["UC-05: Thanh toán trực tuyến"])
        UC6(["UC-06: Hủy đơn hàng"])
        UC7(["UC-07: Quản lý cấu hình sản phẩm"])
        UC8(["UC-08: Duyệt hoàn tiền"])
    end

    Cust --> UC1
    Cust --> UC2
    Cust --> UC3
    Cust --> UC6

    UC3 -.->|<<include>>| UC1
    UC3 -.->|<<include>>| UC5
    UC3 -.->|<<extend>>| UC4

    VNPay --> UC5
    Admin --> UC7
    Admin --> UC8
    Admin --> UC6
```

## 3. Bảng Danh mục Ca sử dụng Tóm tắt
| Mã UC | Tên Ca sử dụng | Tác nhân chính | Quan hệ phụ thuộc | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| `UC-01` | Đăng nhập hệ thống | Khách hàng | - | Tiền đề để lưu thông tin giỏ hàng |
| `UC-03` | Đặt hàng | Khách hàng | `<<include>>` UC-01, UC-05 | Luồng nghiệp vụ cốt lõi |
| `UC-04` | Áp dụng mã giảm giá | Khách hàng | `<<extend>>` UC-03 | Chỉ kích hoạt khi khách có voucher |
| `UC-05` | Thanh toán trực tuyến | Khách hàng, VNPay | - | Phối hợp với cổng thanh toán |
