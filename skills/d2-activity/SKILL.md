---
name: d2-activity
description: "Mô hình hóa quy trình hoạt động bằng ngôn ngữ D2 (Declarative Diagramming): sơ đồ hoạt động trực quan, đường vẽ mượt mà, phân cấp container và nhãn điều kiện sắc nét"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /d2-activity — Sơ đồ Hoạt động D2 Hiện đại [STANDARD WORKFLOW]

Mô hình hóa các bước thực thi quy trình nghiệp vụ phức tạp bằng ngôn ngữ D2, mang lại chất lượng hiển thị tối ưu cho các tài liệu đặc tả kiến trúc đòi hỏi tính thẩm mỹ cao.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thay thế cho các sơ đồ lưu đồ truyền thống khi cần tài liệu hóa quy trình cho hồ sơ thầu, kiến trúc tổng thể hoặc tài liệu bàn giao cao cấp cho đối tác.
- **Đối tượng thụ hưởng**: Solution Architect, Project Manager, Khách hàng doanh nghiệp.
- **Giá trị cốt lõi**: Bản vẽ sắc nét, tự động tối ưu hóa đường đi của các kết nối, không bị đè chữ hay rối mắt khi quy trình có nhiều bước rẽ nhánh phức tạp.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/d2-activity [tên_quy_trình] [mô_tả_các_bước]`
- **Dữ liệu đầu vào cần có**:
  - Trình tự các bước xử lý và các điều kiện rẽ nhánh nghiệp vụ (`BR-xxx`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Ánh xạ điều kiện rẽ nhánh với mã Business Rules.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/22-activity-d2.d2`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/activity.d2`

## Quy trình thực thi chi tiết
1. **Thiết lập Hướng Dòng chảy & Phong cách**:
   - Đặt hướng: `direction: down` hoặc `direction: right`.
2. **Khai báo Các Node Hoạt động**:
   - Sử dụng các hình dạng chuẩn: `start: "" {shape: circle}`, `end: "" {shape: double_circle}`.
   - Các bước thao tác: `action_step: "Tên bước xử lý" {shape: rectangle}`.
   - Quyết định rẽ nhánh: `check_step: "Điều kiện kiểm tra?" {shape: diamond}`.
3. **Khai báo Kết nối & Nhãn Điều kiện**:
   - Gắn nhãn điều kiện rõ ràng: `check_step -> approve_step: "Hợp lệ [BR-xxx]"` và `check_step -> reject_step: "Không hợp lệ"`.
4. **Phân cụm Giai đoạn (Phases / Sub-processes)**:
   - Sử dụng container để bao bọc các giai đoạn: ví dụ `Giai_đoạn_Xác_thực: { ... }`.
5. **Ghi tệp**:
   - Sử dụng template `_templates/22-activity-d2.d2` và lưu vào `docs/{feature}/srs/activity.d2`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cú pháp D2 hợp lệ, biên dịch mượt mà qua công cụ D2 CLI.
- [ ] Thể hiện rõ điểm bắt đầu (circle) và kết thúc (double_circle).
- [ ] Điểm rẽ nhánh diamond có nhãn điều kiện cụ thể cho từng hướng đi.
- [ ] Các bước được đặt tên theo cấu trúc động từ + tân ngữ chuẩn BA.
