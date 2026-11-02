# Ma trận Ánh xạ Dữ liệu 3 Tầng (3-Tier Data Field Mapping)

---
id: DOC-MAP-[INTEG]-001
title: Data Mapping Matrix - [Tên Dịch Vụ Đối Tác]
version: 1.0.0
phase: 06-api-integration
domain: [Dữ Liệu]
tags: [data-mapping, transformation, adapter, etl]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Bảng Ma trận Ánh xạ Chi tiết
| STT | External Field (Đối tác) | Internal DTO Field | DB Column | Kiểu (Src $ightarrow$ Dst) | Nullable | Quy tắc Biến đổi (Transformation Logic) | Giá trị Mặc định |
| :---: | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | `vnp_TxnRef` | `orderNumber` | `orders.order_number` | String $ightarrow$ String | No | Giữ nguyên chuỗi mã đơn hàng | - |
| 2 | `vnp_Amount` | `paidAmount` | `transactions.amount` | Int $ightarrow$ Decimal | No | **Chia cho 100** (`amount = vnp_Amount / 100`) | 0.00 |
| 3 | `vnp_PayDate`| `paidAt` | `transactions.paid_at` | String $ightarrow$ Timestamptz| No | Parse `YYYYMMDDHHmmss` sang ISO 8601 UTC | `now()` |
| 4 | `vnp_ResponseCode`| `gatewayStatus` | `transactions.status` | String $ightarrow$ Enum | No | Xem Bảng ánh xạ mã phản hồi bên dưới | `'PENDING'` |
| 5 | `vnp_BankCode`| `bankCode` | `transactions.bank_code` | String $ightarrow$ String | Yes | Viết hoa chữ in `toUpperCase()` | `'UNKNOWN'` |

## 2. Bảng Ánh xạ Mã Trạng thái (Status Code Enum Mapping)
| Mã Đối tác | Ý nghĩa Đối tác | Trạng thái Nội bộ (Internal Status) | Hành động Hệ thống |
| :---: | :--- | :--- | :--- |
| `00` | Giao dịch thành công | `TRANSACTION_SUCCESS` | Cập nhật đơn hàng sang `PAID`, xuất kho |
| `07` | Trừ tiền thành công, nghi vấn | `TRANSACTION_PENDING_REVIEW` | Tạm giữ đơn, gửi cảnh báo cho Kế toán soát xét |
| `09` | Khách chưa đăng ký Internet Banking | `TRANSACTION_FAILED_USER` | Báo lỗi `ERR-PAY-422-05`, cho chọn lại cổng |
| `24` | Khách hàng bấm hủy giao dịch | `TRANSACTION_CANCELLED` | Cập nhật đơn `CANCELLED`, hoàn lại tồn kho |
