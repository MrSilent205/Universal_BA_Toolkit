---
name: bpmn
description: "Mô hình hóa quy trình chuẩn BPMN 2.0 (Business Process Model and Notation): tạo file định dạng chuẩn XML (.bpmn) chứa Pool, Lane, Start/End Event, Service Task, Exclusive/Parallel Gateway"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /bpmn — Quy trình Nghiệp vụ Chuẩn Quốc tế BPMN 2.0 [STANDARD WORKFLOW]

Khởi tạo mô hình quy trình kinh doanh tuân thủ chặt chẽ đặc tả BPMN 2.0 (OMG Standard) dưới dạng tệp XML chuẩn, có khả năng import trực tiếp vào các công cụ chuyên dụng như Camunda Modeler, Signavio, bpmn.io hoặc chạy trên các workflow engine thực thi tự động.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Dùng trong các dự án quy mô doanh nghiệp lớn (Enterprise Architecture), triển khai hệ thống quản lý quy trình nghiệp vụ (BPMS), số hóa quy trình thẩm định ngân hàng, bảo hiểm, viễn thông.
- **Đối tượng thụ hưởng**: Business Architect, Process Owner, Solution Architect, Camunda/Flowable Developers.
- **Giá trị cốt lõi**: Tạo ra quy trình không chỉ "nhìn được" mà còn "thực thi tự động được" (Executable Workflow), tương thích 100% với các công cụ BPMN quốc tế mà không cần vẽ lại từ đầu.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/bpmn [tên_quy_trình] [mô_tả_các_bước_và_nguyên_tắc]`
- **Dữ liệu đầu vào cần có**:
  - Mô tả quy trình nghiệp vụ chi tiết và vai trò các bên tham gia.
  - Các loại tác vụ: User Task (con người làm), Service Task (hệ thống tự động), Script Task, Send/Receive Task.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Mã hóa Business Rules áp dụng vào Gateways.
- `rules/17-actor-role-definition.md` — Ánh xạ Actor vào cấu trúc Pool và Lane.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/18-bpmn-process.bpmn`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/process.bpmn`

## Quy trình thực thi chi tiết
1. **Xác định Cấu trúc Pool & Lane (Collaboration & Process Structure)**:
   - Khởi tạo `bpmn:collaboration` chứa các `bpmn:participant` (Pool đại diện cho tổ chức/hệ thống).
   - Chia nhỏ thành các `bpmn:lane` phân định vai trò nội bộ.
2. **Khai báo Các Loại Sự kiện (BPMN Events)**:
   - Sự kiện bắt đầu: `bpmn:startEvent` (None, Timer, Message).
   - Sự kiện trung gian: `bpmn:intermediateCatchEvent` (Chờ thông điệp, chờ thời gian quá hạn).
   - Sự kiện kết thúc: `bpmn:endEvent` (Thành công, Báo lỗi Error End Event, Chấm dứt Terminate End Event).
3. **Phân loại Tác vụ Kỹ thuật (Task Typology)**:
   - Gán đúng loại tác vụ:
     - `bpmn:userTask`: Tác vụ cần nhân viên thao tác trên giao diện (ví dụ: Duyệt hồ sơ vay).
     - `bpmn:serviceTask`: Tác vụ gọi API tự động (ví dụ: Trừ tiền qua Payment Gateway).
     - `bpmn:businessRuleTask`: Tác vụ tính toán biểu phí qua bảng quyết định DMN.
4. **Cấu hình Cổng Điều hướng (Gateways)**:
   - `bpmn:exclusiveGateway` (XOR): Chọn duy nhất 1 nhánh thỏa mãn điều kiện.
   - `bpmn:parallelGateway` (AND): Rẽ nhánh song song và chờ đợi tất cả các nhánh.
   - `bpmn:inclusiveGateway` (OR): Chọn 1 hoặc nhiều nhánh thỏa mãn.
5. **Ghi tệp XML BPMN 2.0 Hoàn chỉnh**:
   - Đảm bảo đầy đủ các thẻ Sequence Flow kết nối (`bpmn:sequenceFlow`) và thông tin tọa độ đồ họa `bpmndi:BPMNDiagram`.
   - Lưu vào `docs/{feature}/srs/process.bpmn`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Tệp XML đạt chuẩn BPMN 2.0 namespace quốc tế (`xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"`).
- [ ] Có thể mở và hiển thị mượt mà trên bpmn.io hoặc Camunda Modeler mà không gặp lỗi parse XML.
- [ ] Phân loại chính xác các tác vụ (`userTask`, `serviceTask`, `businessRuleTask`).
- [ ] Đầy đủ các luồng Sequence Flow kết nối giữa Start Event, Tasks, Gateways và End Events.
- [ ] Có nhánh xử lý ngoại lệ Error End Event hoặc Timer Boundary Event khi quá hạn SLA.
