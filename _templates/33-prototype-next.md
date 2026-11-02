# Đặc tả Kiến trúc Thành phần Next.js (Component Architecture)

---
id: DOC-NXT-[MODULE]-001
title: Next.js Component Architecture - [Tên Phân Hệ]
version: 1.0.0
phase: 05-screen-design
domain: [Frontend]
tags: [nextjs, react, app-router, components, zod]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Cấu trúc Thư mục Định tuyến (App Router Structure)
```
app/
├── (shop)/
│   ├── layout.tsx                  # Root shop layout (Header, Nav, Cart Drawer)
│   ├── cart/
│   │   └── page.tsx                # Server Component: Render danh sách giỏ
│   └── checkout/
│       ├── page.tsx                # Server Component: Fetch metadata thanh toán
│       ├── loading.tsx             # Skeleton loader khi load thông tin
│       └── error.tsx               # Error boundary bắt lỗi checkout
└── api/
    └── checkout/
        └── route.ts                # API Route Handler: Xử lý submit đơn hàng
```

## 2. Phân rã Cây Thành phần (Server vs Client Components)
- **`CheckoutPage` (Server Component)**:
  - Fetch thông tin sản phẩm và chính sách freeship trực tiếp từ Database.
  - Render tĩnh khung layout bảo đảm tốc độ First Contentful Paint < 0.8s.
- **`CheckoutFormClient` (`"use client"`)**:
  - Nhập liệu thông tin khách hàng, chọn địa chỉ và voucher.
  - Sử dụng `react-hook-form` kết hợp validation schema Zod.
- **`PaymentMethodSelectorClient` (`"use client"`)**:
  - Quản lý state chọn VNPay / MoMo / COD; trigger mở modal xác nhận.

## 3. Schema Xác thực Dữ liệu Nhập liệu (Zod Schema)
```typescript
import { z } from 'zod';

export const CheckoutPayloadSchema = z.object({
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự").max(100),
  phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không đúng định dạng"),
  shippingAddress: z.string().min(10, "Địa chỉ nhận hàng chi tiết tối thiểu 10 ký tự"),
  paymentMethod: z.enum(["VNPAY", "MOMO", "COD"]),
  voucherCode: z.string().max(20).optional(),
});

export type CheckoutPayload = z.infer<typeof CheckoutPayloadSchema>;
```
