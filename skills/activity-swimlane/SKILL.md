---
name: activity-swimlane
description: "Mô hình hóa quy trình liên phòng ban phân làn theo vai trò (Swimlane Activity Diagram bằng PlantUML): làm rõ trách nhiệm giữa Khách hàng, Hệ thống, Kế toán, Vận hành và Đối tác thứ 3"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /activity-swimlane — Sơ đồ Hoạt động Phân làn Trách nhiệm (PlantUML) [STANDARD WORKFLOW]

Mô hình hóa quy trình hoạt động nghiệp vụ đa tác nhân theo định dạng phân làn (Swimlane), phân định ranh giới trách nhiệm rõ ràng giữa các vai trò người dùng, các phòng ban nghiệp vụ và các dịch vụ tự động của hệ thống.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi quy trình nghiệp vụ yêu cầu sự phối hợp liên phòng ban hoặc tương tác chéo giữa nhiều vai trò khác nhau (ví dụ: Khách đặt hàng $ightarrow$ Cổng thanh toán trừ tiền $ightarrow$ Kế toán xuất hóa đơn $ightarrow$ Thủ kho soạn hàng $ightarrow$ Shipper giao hàng).
- **Đối tượng thụ hưởng**: Trưởng phòng ban vận hành, Business Analyst, QA Lead, Đội ngũ triển khai hệ thống.
- **Giá trị cốt lõi**: Chấm dứt tình trạng "cha chung không ai khóc" trong quy trình vận hành; chỉ ra chính xác điểm bàn giao trách nhiệm (Handoff Points) giữa các bên, ngăn ngừa thất thoát dữ liệu và chậm trễ tiến độ.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/activity-swimlane [tên_quy_trình] [danh_sách_vai_trò]`
- **Dữ liệu đầu vào cần có**:
  - Danh sách các vai trò (Actors/Roles) tham gia vào quy trình theo Rule 17.
  - Trình tự các bước xử lý và các chứng từ/dữ liệu chuyển giao qua lại giữa các làn.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Quy tắc nghiệp vụ kiểm soát việc chuyển làn.
- `rules/17-actor-role-definition.md` — Định nghĩa chính xác tên các làn (Swimlane Roles).
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/17-activity-swimlane.puml`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/activity-swimlane.puml`

## Quy trình thực thi chi tiết
1. **Xác định Danh mục Làn (Swimlane Partitions)**:
   - Liệt kê các làn theo chuẩn PlantUML syntax: `|Tên Làn|`.
   - Ví dụ: `|Khách hàng|`, `|Hệ thống Frontend|`, `|Hệ thống Backend|`, `|Bộ phận CSKH / Vận hành|`, `|Đối tác Vận chuyển|`.
2. **Bố cục Dòng chảy Công việc (Cross-Lane Workflow Layout)**:
   - Khởi tạo điểm bắt đầu: `start`.
   - Di chuyển giữa các làn bằng cách chuyển tiêu đề làn trước hành động:
     ```plantuml
     |Khách hàng|
     :Chọn sản phẩm và bấm Thanh toán;
     |Hệ thống Backend|
     :Kiểm tra tồn kho và tạo mã đơn hàng;
     ```
3. **Mô hình hóa Điểm Kiểm tra & Chuyển giao (Handoff & Decision)**:
   - Sử dụng cú pháp rẽ nhánh điều kiện: `if (Tồn kho đủ?) then (có) ... else (không) ... endif`.
   - Thể hiện rõ các luồng hoàn trả (Rollback): Nếu thanh toán thất bại, hệ thống tự động hoàn lại tồn kho trong làn Backend và gửi thông báo lỗi sang làn Khách hàng.
4. **Kết thúc Quy trình**:
   - Thể hiện rõ các trạng thái kết thúc tương ứng với từng làn: `stop` hoặc `kill`.
5. **Ghi tệp**:
   - Sử dụng template `_templates/17-activity-swimlane.puml` và lưu vào `docs/{feature}/srs/activity-swimlane.puml`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phân định rõ ràng tối thiểu 2-4 làn trách nhiệm (Partitions) đúng chuẩn PlantUML.
- [ ] Các điểm bàn giao công việc (Handoff) giữa các làn liền mạch, không bị đứt đoạn logic.
- [ ] Mọi nhánh rẽ điều kiện (if/else) được bao bọc trọn vẹn và đóng bằng `endif`.
- [ ] Có đầy đủ điểm bắt đầu (`start`) và điểm kết thúc (`stop`) cho từng kịch bản.
- [ ] Mã nguồn PlantUML hợp lệ, sẵn sàng biên dịch thành hình ảnh PNG/SVG.
