# Sơ đồ Quan hệ Thực thể (Entity Relationship Diagram - ERD)

---
id: DIAG-ERD-[MODULE]-001
title: Entity Relationship Diagram - [Tên Phân Hệ]
version: 1.0.0
phase: 03-diagrams
domain: [Cơ Sở Dữ Liệu]
tags: [erd, database, mermaid, data-modeling]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Mô tả Phạm vi Mô hình Dữ liệu
Sơ đồ ERD mô hình hóa các thực thể lưu trữ dữ liệu chính của phân hệ Đơn hàng & Thanh toán, tuân thủ chuẩn hóa 3NF và phân rã triệt để quan hệ nhiều-nhiều qua bảng trung gian.

## 2. Sơ đồ ERD Mermaid (`erDiagram`)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar full_name
        varchar phone UK
        varchar status
        timestamptz created_at
    }

    ORDERS ||--|{ ORDER_ITEMS : contains
    ORDERS {
        uuid id PK
        uuid user_id FK
        varchar order_number UK
        decimal total_amount
        decimal discount_amount
        decimal final_amount
        varchar status
        varchar payment_method
        timestamptz created_at
    }

    PRODUCTS ||--o{ ORDER_ITEMS : "included in"
    PRODUCTS {
        uuid id PK
        varchar sku UK
        varchar name
        decimal price
        int stock_quantity
        varchar status
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
        decimal subtotal
    }

    ORDERS ||--o{ PAYMENT_TRANSACTIONS : has
    PAYMENT_TRANSACTIONS {
        uuid id PK
        uuid order_id FK
        varchar transaction_ref UK
        varchar gateway
        decimal amount
        varchar status
        timestamptz paid_at
    }
```

## 3. Bảng Từ điển Dữ liệu Tóm lược (Data Dictionary)
| Bảng | Cột | Kiểu | Nullable | Ràng buộc | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `orders` | `id` | UUID | No | Primary Key | Khóa chính đơn hàng |
| `orders` | `user_id` | UUID | No | Foreign Key `users.id` | Người đặt hàng |
| `orders` | `order_number` | VARCHAR(20) | No | Unique | Mã hiển thị tra cứu |
| `orders` | `final_amount` | DECIMAL(15,2)| No | `>= 0` | Số tiền thực trả sau giảm |
| `orders` | `status` | VARCHAR(50) | No | Default `'DRAFT'` | Trạng thái vòng đời FSM |
