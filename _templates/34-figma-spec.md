# Đặc tả Bàn giao Thiết kế Figma (Figma Handoff Spec)

---
id: DOC-FIG-[MODULE]-001
title: Figma Design Specification - [Tên Màn Hình]
version: 1.0.0
phase: 05-screen-design
domain: [Design System]
tags: [figma, design-tokens, auto-layout, components]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Hệ thống Design Tokens

### 1.1. Bảng Màu Ngữ nghĩa (Semantic Color Tokens)
| Tên Token | Mã HEX | Vai trò sử dụng | Tỷ lệ tương phản WCAG 2.1 |
| :--- | :---: | :--- | :---: |
| `color.brand.primary` | `#2563EB` | Nút bấm chính (CTA), link liên kết | 4.6:1 (Đạt AA) |
| `color.surface.0` | `#FFFFFF` | Nền thẻ Card, Modal container | 1.0:1 |
| `color.surface.1` | `#F8FAFC` | Nền toàn trang (Page background) | 1.1:1 |
| `color.text.primary` | `#0F172A` | Tiêu đề chính, nhãn quan trọng | 14.8:1 (Đạt AAA) |
| `color.text.muted` | `#64748B` | Chú thích phụ trợ, placeholder | 4.9:1 (Đạt AA) |
| `color.status.error` | `#DC2626` | Viền ô lỗi, icon cảnh báo | 5.2:1 (Đạt AA) |

### 1.2. Thang đo Kiểu chữ (Typography Scale)
- **H1 (Screen Title)**: 24px / 32px line-height, Semi-bold (Font: Inter).
- **H2 (Section Header)**: 18px / 26px line-height, Semi-bold.
- **Body Regular**: 14px / 20px line-height, Regular.
- **Caption / Helper**: 12px / 16px line-height, Regular.

### 1.3. Lưới & Khoảng cách (Spacing System - Bội số 4px/8px)
`space-1`: 4px | `space-2`: 8px | `space-3`: 12px | `space-4`: 16px | `space-6`: 24px | `space-8`: 32px.

## 2. Quy chuẩn Auto-Layout & Component Variants
- **Quy tắc Auto-Layout**: Mọi button và input phải cấu hình `Hug Contents` theo chiều ngang (trên mobile đổi sang `Fill Container`), `Fixed Height = 44px` để tối ưu cho ngón tay chạm cảm ứng.
- **6 Biến thể Trạng thái Nút bấm (Button States)**:
  1. `Default`: Nền `#2563EB`, text trắng.
  2. `Hover`: Nền `#1D4ED8` (tối hơn 10%).
  3. `Focused`: Viền outline 2px màu `#93C5FD`, offset 2px.
  4. `Active/Pressed`: Thu nhỏ nhẹ `scale(0.98)`, nền `#1E40AF`.
  5. `Disabled`: Nền `#E2E8F0`, chữ `#94A3B8`, con trỏ `not-allowed`.
  6. `Loading`: Hiển thị spinner SVG trắng quay tròn, ẩn label.
