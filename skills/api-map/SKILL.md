---
name: api-map
description: "Lập Ma trận Ánh xạ Dữ liệu 3 Tầng (3-Tier Data Field Mapping): chuyển đổi trường giữa External API Đối tác <-> Internal DTO Hệ thống <-> Database Columns kèm công thức biến đổi (Transformations)"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-map — Ma trận Ánh xạ Dữ liệu 3 Tầng (Data Mapping Matrix) [STANDARD WORKFLOW]

Xây dựng ma trận ánh xạ dữ liệu toàn diện giữa cấu trúc dữ liệu của đối tác bên ngoài (External Third-party API), các đối tượng truyền nhận nội bộ (Internal DTOs) và bảng cơ sở dữ liệu (Database Tables), làm rõ quy tắc chuyển đổi kiểu dữ liệu, định dạng ngày tháng và giá trị mặc định.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi tích hợp các dịch vụ có cấu trúc dữ liệu khác biệt với hệ thống nội bộ (ví dụ: API cổng thanh toán trả về `vnp_Amount` tính bằng xu hoặc đơn vị nhân 100, hệ thống nội bộ lưu `amount` VND, database lưu `decimal(15,2)`).
- **Đối tượng thụ hưởng**: Backend Developers, Data Engineers, Integration Specialists, QA Testers.
- **Giá trị cốt lõi**: Tránh triệt để các lỗi sai lệch dữ liệu ngớ ngẩn (lệch múi giờ UTC/GMT+7, sai lệch đơn vị tiền tệ, mất mát số thập phân, lỗi định dạng tên người dùng), giúp đội ngũ dev viết Adapter / Serializer chính xác 100%.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-map [tên_dịch_vụ_tích_hợp] [file_api_spec]`
- **Dữ liệu đầu vào cần có**:
  - Đặc tả API đối tác (`_templates/36-api-doc.md`).
  - Từ điển dữ liệu nội bộ (`rules/09-data-dictionary-standard.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/09-data-dictionary-standard.md` — Quy chuẩn tên cột và kiểu dữ liệu Database.
- `rules/10-api-contract-standards.md` — Chuẩn hóa payload JSON nội bộ.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/38-api-map.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/data-mapping.md`

## Quy trình thực thi chi tiết
1. **Lập Bảng Ma trận Ánh xạ Chi tiết 3 Tầng**:
   - Xây dựng bảng đối chiếu gồm các cột chuẩn:
     1. `STT`: Số thứ tự.
     2. `External Field (Đối tác)`: Tên trường từ API bên thứ ba.
     3. `Internal DTO Field`: Tên trường trong hệ thống backend nội bộ (CamelCase).
     4. `DB Column`: Tên cột trong Database (Snake_case).
     5. `Data Type (Src -> Dst)`: Kiểu dữ liệu nguồn $ightarrow$ Kiểu dữ liệu đích.
     6. `Required / Nullable`: Bắt buộc hay tùy chọn.
     7. `Transformation Logic`: Công thức hoặc quy tắc chuyển đổi giá trị.
     8. `Default Value`: Giá trị mặc định nếu phía đối tác trả về null/rỗng.
2. **Quy tắc Chuyển đổi Các Trường Nhạy cảm Thường gặp (Transformation Rules)**:
   - *Tiền tệ*: `vnp_Amount / 100 -> amount` (Ví dụ 10,000,000 xu $ightarrow$ 100,000 VNĐ).
   - *Thời gian*: Chuyển đổi chuỗi định dạng lạ `YYYYMMDDHHmmss` (ví dụ: `20261102143000`) sang chuẩn ISO 8601 UTC `2026-11-02T07:30:00Z`.
   - *Trạng thái (Enum Mapping)*:
     - Đối tác `00` $ightarrow$ Nội bộ `TRANSACTION_SUCCESS`.
     - Đối tác `07`, `09` $ightarrow$ Nội bộ `TRANSACTION_FAILED_INSUFFICIENT_FUNDS`.
     - Mọi mã khác $ightarrow$ Nội bộ `TRANSACTION_FAILED_UNKNOWN`.
   - *Họ tên*: Tách chuỗi `fullName` thành `firstName` và `lastName` hoặc ngược lại.
   - *Số điện thoại*: Chuẩn hóa về định dạng E.164 (`0912345678` $ightarrow$ `+84912345678`).
3. **Xử lý Dữ liệu Mồ côi & Giá trị Bất thường (Orphan & Edge Value Handling)**:
   - Quy định rõ hành vi khi đối tác trả về trường mới chưa có trong mapping (Bỏ qua hay lưu vào cột `raw_metadata jsonb`).
4. **Ghi tệp**:
   - Sử dụng template `_templates/38-api-map.md` và lưu vào `docs/{feature}/api/data-mapping.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bảng Ma trận 3 Tầng phủ kín 100% các trường trong request và response của đối tác.
- [ ] Có công thức chuyển đổi (Transformation Logic) rõ ràng cho đơn vị tiền tệ, ngày giờ, enum trạng thái.
- [ ] Xử lý rõ ràng các trường Nullable và có giá trị Default Value an toàn.
- [ ] Cung cấp bảng Enum mapping đối chiếu từng mã trạng thái của đối tác sang enum nội bộ.
