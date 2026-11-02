---
name: prototype-next
description: "Đặc tả kiến trúc thành phần Next.js / React (Component Architecture): cấu trúc App Router, phân định Server vs Client Components, State Management, API Route Handlers và schema validation Zod"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /prototype-next — Đặc tả Kiến trúc Thành phần Next.js / React [STANDARD WORKFLOW]

Đặc tả chi tiết kiến trúc tầng giao diện ứng dụng theo framework Next.js (App Router) và React, phân rã cây thành phần (Component Hierarchy), phân định Server Components vs Client Components, thiết kế luồng dữ liệu (State Management) và định nghĩa các API Route Handlers.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi đội ngũ phát triển chuẩn bị lập trình giao diện thực tế bằng Next.js / React, cần một bản thiết kế kiến trúc frontend rõ ràng trước khi gõ code.
- **Đối tượng thụ hưởng**: Frontend Lead, React Developers, Full-stack Engineers.
- **Giá trị cốt lõi**: Tránh tình trạng viết bừa bãi `"use client"` lên mọi component làm mất lợi thế SEO và hiệu năng của Next.js; phân định ranh giới rõ ràng giữa data fetching ở server và tương tác state ở client.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/prototype-next [tên_tính_năng] [danh_sách_màn_hình]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả API (`docs/{feature}/api/api-spec.md`) và luồng người dùng (`user-flow.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/10-api-contract-standards.md` — Ánh xạ API routes với backend contract.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/33-prototype-next.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/ui/nextjs-architecture.md`

## Quy trình thực thi chi tiết
1. **Quy hoạch Cấu trúc Thư mục App Router (`app/`)**:
   - Định nghĩa cây định tuyến (File-based Routing):
     - `app/(checkout)/cart/page.tsx`
     - `app/(checkout)/payment/page.tsx`
     - `app/(checkout)/layout.tsx`
     - `app/api/checkout/route.ts`
2. **Phân rã Cây Thành phần (Component Tree & Server vs Client Boundary)**:
   - **Server Components (RSC - Default)**: Dùng để fetch dữ liệu trực tiếp, render tĩnh, tối ưu SEO (ví dụ: `ProductDetailsServer`, `OrderSummaryServer`).
   - **Client Components (`"use client"`)**: Chỉ dùng khi có tương tác người dùng, form input, hook React (`useState`, `useEffect`) hoặc browser APIs (ví dụ: `PaymentFormClient`, `QuantityCounterClient`, `AddressSelectorModal`).
3. **Thiết kế Luồng Dữ liệu & Quản lý Trạng thái (State Management)**:
   - Trạng thái cục bộ (Local UI State): `useState` cho modal, input text.
   - Trạng thái toàn cục (Global State): Sử dụng Zustand hoặc React Context API cho Giỏ hàng và Session người dùng.
   - Trạng thái bất đồng bộ (Server State): Sử dụng TanStack Query (React Query) hoặc Server Actions để revalidate cache.
4. **Định nghĩa Schema Validation Nhập liệu (Zod Schema)**:
   - Khai báo schema Zod dùng chung cho cả client form (React Hook Form) và API route:
     ```typescript
     export const CheckoutSchema = z.object({
       recipientName: z.string().min(2, "Họ tên quá ngắn"),
       phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "SĐT không hợp lệ"),
       paymentMethod: z.enum(["VNPAY", "MOMO", "COD"])
     });
     ```
5. **Ghi tệp**:
   - Sử dụng template `_templates/33-prototype-next.md` và lưu vào `docs/{feature}/ui/nextjs-architecture.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cấu trúc thư mục tuân thủ chặt chẽ Next.js App Router (`app/` directory).
- [ ] Phân định chính xác giữa Server Components và Client Components (`"use client"`).
- [ ] Có phương án quản lý state rõ ràng (Local State, Global State, Server Cache).
- [ ] Có schema validation chuẩn Zod tương thích với React Hook Form.
- [ ] Mô tả chi tiết các loading state (`loading.tsx`) và error boundary (`error.tsx`).
