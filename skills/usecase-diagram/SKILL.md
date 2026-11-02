---
name: usecase-diagram
description: "Mô hình hóa phạm vi hệ thống bằng Sơ đồ Ca sử dụng (Use Case Diagram Mermaid): phân định ranh giới hệ thống (System Boundary), các tác nhân Actors và quan hệ include / extend"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /usecase-diagram — Sơ đồ Ca sử dụng & Ranh giới Hệ thống [STANDARD WORKFLOW]

Mô hình hóa bức tranh tổng quan về các ca sử dụng (Use Cases) của hệ thống bằng cú pháp sơ đồ Mermaid, phân định ranh giới hệ thống (System Boundary), nhận diện tất cả các tác nhân (Actors) và mối quan hệ phụ thuộc (`<<include>>`, `<<extend>>`) giữa các chức năng.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng trong giai đoạn đầu phân tích yêu cầu (sau khi hoàn thành PRD/URD), nhằm cung cấp cái nhìn trực quan về phạm vi chức năng cho khách hàng và ban lãnh đạo.
- **Đối tượng thụ hưởng**: Business Stakeholders, Product Owner, QA Lead, Đội ngũ Lập trình.
- **Giá trị cốt lõi**: Khóa chặt phạm vi hệ thống (System Scope Boundary), giúp các bên đồng thuận về những gì hệ thống sẽ làm và không làm, ai được quyền thực hiện chức năng nào.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/usecase-diagram [tên_phân_hệ] [danh_sách_actors]`
- **Dữ liệu đầu vào cần có**:
  - Danh sách Actors từ Rule 17.
  - Danh mục chức năng hoặc các ca sử dụng từ PRD/SRS.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/06-cockburn-use-case.md` — Ánh xạ các Use Case chi tiết tương ứng.
- `rules/17-actor-role-definition.md` — Phân loại tác nhân chính, phụ và hệ thống.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/25-usecase-diagram.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/usecase-diagram.md`

## Quy trình thực thi chi tiết
1. **Xác định Tác nhân Ngoài Hệ thống (Actors Identification)**:
   - Áp dụng Rule 17: Phân định Primary Actors (Khách hàng), Secondary Actors (Admin, CSKH, Kế toán), và System Actors (Cổng thanh toán, Dịch vụ Email).
2. **Xác định Ranh giới Hệ thống (System Boundary)**:
   - Đặt toàn bộ các Use Case vào bên trong khung ranh giới hệ thống (Subsystem / Boundary box).
   - Tên Use Case bắt buộc phải là dạng [Động từ] + [Danh từ] (ví dụ: `Đăng nhập`, `Đặt hàng`, `Hủy đơn`, `Đối soát`).
3. **Mô hình hóa Mối quan hệ giữa các Use Case**:
   - **Association (Liên kết)**: Đường nối giữa Actor và Use Case mà họ trực tiếp kích hoạt.
   - **`<<include>>` (Bao hàm bắt buộc)**: Use Case con luôn luôn được thực thi khi Use Case cha chạy (ví dụ: `Thanh toán đơn hàng` luôn `<<include>>` `Xác thực người dùng`).
   - **`<<extend>>` (Mở rộng có điều kiện)**: Use Case con chỉ kích hoạt trong trường hợp đặc biệt (ví dụ: `Thanh toán đơn hàng` có thể `<<extend>>` `Áp dụng mã giảm giá`).
4. **Vẽ sơ đồ bằng Cú pháp Mermaid Flowchart hoặc Class Diagram**:
   - Sử dụng cú pháp trực quan chuẩn BA.
5. **Ghi tệp**:
   - Sử dụng template `_templates/25-usecase-diagram.md` và lưu vào `docs/{feature}/srs/usecase-diagram.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phân định rõ ràng ranh giới bên trong hệ thống (System Boundary) và các Actor bên ngoài.
- [ ] Tên mọi Use Case tuân thủ quy tắc ngữ pháp: Động từ + Tân ngữ.
- [ ] Sử dụng chuẩn xác mối quan hệ `<<include>>` (bắt buộc) và `<<extend>>` (tùy chọn theo điều kiện).
- [ ] Toàn bộ các Actors tham gia đều được định nghĩa rõ vai trò theo Rule 17.
