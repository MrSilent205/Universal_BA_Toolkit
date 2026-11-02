---
name: dashboard
description: "Khởi tạo Bảng điều khiển Tiến độ & Sức khỏe Dự án (Project Health & Coverage Dashboard): tổng hợp tỷ lệ bao phủ tài liệu (FR, Story, Test Case, Wireframe), ma trận rủi ro tồn đọng và tiến độ bàn giao"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /dashboard — Bảng Điều khiển Tiến độ & Sức khỏe Dự án [STANDARD WORKFLOW]

Quét và tổng hợp toàn bộ các tài liệu trong thư mục `docs/`, tính toán các chỉ số độ phủ kỹ thuật (Requirements Coverage Rate), lập ma trận các rủi ro tồn đọng (Blockers & Risks) và trực quan hóa sức khỏe tổng thể của dự án dưới dạng báo cáo Dashboard chuyên nghiệp.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện vào cuối mỗi tuần hoặc trước các buổi họp giao ban tiến độ với Ban Giám đốc và Khách hàng; giúp PM và Lead BA nắm bắt bức tranh toàn cảnh về tiến độ tài liệu hóa.
- **Đối tượng thụ hưởng**: Project Manager, Delivery Manager, Head of Engineering, Product Owner.
- **Giá trị cốt lõi**: Định lượng hóa chất lượng dự án bằng số liệu thực tế; phát hiện ngay các tính năng "bị bỏ rơi" (có FR nhưng không có Story, có Story nhưng chưa có Test Case hoặc Wireframe).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/dashboard [tùy_chọn: toàn_dự_án | tên_tính_năng]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ các file tài liệu trong thư mục `docs/`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Kiểm tra tổng số FR.
- `rules/14-test-case-traceability.md` — Tính toán tỷ lệ bao phủ RTM.
- `rules/18-knowledge-graph-metadata.md` — Quét metadata các file tài liệu.
- `rules/19-document-versioning-rules.md` — Theo dõi lịch sử cập nhật.

## Biểu mẫu tham chiếu (Template)
- Tổng hợp chỉ số dựa trên: `_templates/43-test-cases.md`, `_templates/08-srs.md`
- Định dạng báo cáo: Khung Dashboard Tiến độ & Sức khỏe Dự án (Project Health & Coverage Dashboard)

## Vị trí lưu tệp mặc định
- `docs/project-dashboard.md` (hoặc `docs/{feature}/dashboard.md`)

## Quy trình thực thi chi tiết
1. **Quét Hệ thống Tài liệu Toàn diện (Full-Repository Inspection)**:
   - Quét đệ quy toàn bộ thư mục `docs/`, nhận diện các tệp: PRD, SRS, Use Cases, User Stories, Test Cases, Wireframe HTML, API Specs.
2. **Tính toán Chỉ số Độ phủ Kỹ thuật (Coverage Metrics Calculation)**:
   - **Tổng số Yêu cầu Chức năng (Total FRs)**: Ví dụ 45 FRs.
   - **Tỷ lệ đã có User Story**: `(Số FR có Story / Tổng FR) * 100%` (Mục tiêu: 100%).
   - **Tỷ lệ đã có Test Case**: `(Số FR có ít nhất 1 Test Case / Tổng FR) * 100%` (Mục tiêu: 100%).
   - **Tỷ lệ đã có Wireframe/UI Spec**: `(Số FR giao diện có Wireframe / Tổng FR giao diện) * 100%`.
   - **Tỷ lệ đã có Sơ đồ Luồng (Diagram Coverage)**: Tỷ lệ các luồng chính có sơ đồ Sequence / Activity.
3. **Lập Bảng Ma trận Theo dõi Trạng thái Tính năng (Feature Health Matrix)**:
   - Bảng tổng hợp: `Mã FR` | `Tên Yêu cầu` | `Độ ưu tiên` | `PRD` | `SRS` | `Diagram` | `Wireframe` | `User Story` | `Test Case` | `Trạng thái Hoàn thiện`.
   - Sử dụng các biểu tượng trực quan: `[Done] Hoàn thành`, `[In Progress] Đang làm`, `[Pending] Chưa có`.
4. **Lập Bảng Điểm nóng & Rủi ro Tồn đọng (Blockers & Risks Registry)**:
   - Liệt kê các rủi ro kỹ thuật chưa có lời giải (ví dụ: Chờ API Sandbox từ đối tác ngân hàng; Chưa có phương án mã hóa thẻ đạt chuẩn PCI-DSS).
   - Phân cấp mức độ ảnh hưởng: Đỏ (Blocker nghiêm trọng) / Vàng (Cảnh báo) / Xanh (Ổn định).
5. **Ghi tệp Báo cáo Dashboard**:
   - Lưu báo cáo hoàn chỉnh vào `docs/project-dashboard.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Báo cáo Dashboard có đầy đủ các chỉ số định lượng % độ phủ (Story, Test Case, Wireframe).
- [ ] Bảng Ma trận Tính năng thể hiện rõ trạng thái từng đầu mục yêu cầu `FR-`.
- [ ] Danh mục rủi ro (Blockers) có phân công người phụ trách và kế hoạch tháo gỡ.
- [ ] Định dạng Markdown trình bày đẹp mắt, trực quan, sẵn sàng gửi cho lãnh đạo.
