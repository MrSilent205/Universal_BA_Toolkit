---
name: cr
description: "Quy trình Xử lý Yêu cầu Thay đổi Phạm vi (Change Request - CR Workflow): gán mã CR, phân tích tác động 4 góc độ (Tài liệu, Kỹ thuật DB/API, Test Cases, Kế hoạch/Rủi ro) và đồng bộ tài liệu"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /cr — Quản lý Yêu cầu Thay đổi & Phân tích Tác động (Change Request) [CORE WORKFLOW]

Quản lý và kiểm soát toàn diện các yêu cầu thay đổi nghiệp vụ (Change Requests) phát sinh giữa chừng từ phía Khách hàng hoặc Product Owner, thực hiện phân tích tác động đa chiều (Impact Analysis) trước khi quyết định điều chỉnh tài liệu hoặc mã nguồn.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc kích hoạt khi có bất kỳ yêu cầu sửa đổi, thêm mới hoặc hủy bỏ tính năng sau khi tài liệu đặc tả SRS đã được ký duyệt (Baseline Freeze).
- **Đối tượng thụ hưởng**: Project Manager, Lead BA, Tech Lead, Product Owner, Khách hàng.
- **Giá trị cốt lõi**: Chấm dứt tình trạng "khách hàng bảo sửa miệng là dev sửa ngay" dẫn đến vỡ tiến độ, phát sinh bug chéo và thất thoát ngân sách; biến các yêu cầu thay đổi thành hồ sơ minh bạch có ước tính chi phí và rủi ro rõ ràng.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/cr [tên_phân_hệ] [mô_tả_yêu_cầu_thay_đổi]`
- **Dữ liệu đầu vào cần có**:
  - Mô tả chi tiết yêu cầu thay đổi từ phía khách hàng / PO.
  - Bộ tài liệu đặc tả hiện tại của tính năng trong `docs/{feature}/`.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Cập nhật mã yêu cầu chức năng FR.
- `rules/02-br-naming-convention.md` — Cập nhật quy tắc nghiệp vụ BR.
- `rules/15-change-request-impact-matrix.md` — Quy chuẩn ma trận phân tích tác động CR 4 góc độ.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.
- `rules/19-document-versioning-rules.md` — Tăng phiên bản SemVer và ghi chép Revision History.

## Biểu mẫu tham chiếu (Template)
- `_templates/47-change-request.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/cr/CR-{MODULE}-{SEQ}.md` (ví dụ: `docs/payment/cr/CR-PAY-001.md`)

## Quy trình thực thi chi tiết
1. **Tiếp nhận & Định danh Yêu cầu Thay đổi**:
   - Gán mã định danh chuẩn theo Rule 15: `CR-[MODULE]-[SEQ]` (ví dụ: `CR-ORD-001: Cho phép hủy đơn trong trạng thái PROCESSING`).
   - Ghi nhận người yêu cầu, ngày gửi và lý do nghiệp vụ thúc đẩy thay đổi (Business Justification).
2. **Đánh giá So sánh Hành vi Cũ vs Hành vi Mới (Delta Comparison)**:
   - Mô tả hành vi hiện tại (Current Baseline Behavior).
   - Mô tả hành vi mới kỳ vọng (Proposed New Behavior).
3. **Phân tích Tác động 4 Góc độ Bắt buộc theo Rule 15 (4-Dimension Impact Analysis)**:
   - **Góc độ 1: Tác động Tài liệu (Documentation Drift)**:
     - Liệt kê chính xác các file và dòng cần sửa: SRS, BR, User Stories, Wireframe, Sequence Diagram, State Diagram.
   - **Góc độ 2: Tác động Kỹ thuật & Kiến trúc (Technical & Architecture)**:
     - Cơ sở dữ liệu: Có phải thêm cột mới, đổi kiểu dữ liệu hay chạy migration không?
     - Hợp đồng API: Có gây ra Breaking Change cho Frontend / Mobile app không? Có cần nâng version `/api/v2/` không?
   - **Góc độ 3: Tác động Kiểm thử & Chất lượng (QA & Test Cases)**:
     - Bao nhiêu Test Cases cũ bị vô hiệu hóa (Invalidated)?
     - Bao nhiêu Test Cases mới cần viết thêm để kiểm thử luồng thay đổi?
   - **Góc độ 4: Kế hoạch, Chi phí & Rủi ro (Cost, Schedule & Risks)**:
     - Ước tính Story Points phát sinh (ví dụ: +5 SP).
     - Rủi ro trễ hạn Sprint (dự kiến trễ release 2 ngày).
4. **Đưa ra Quyết định & Khuyến nghị Phê duyệt (Approval Recommendation)**:
   - Đề xuất 1 trong 3 trạng thái:
     - `APPROVED`: Đồng ý triển khai ngay trong Sprint hiện tại.
     - `DEFERRED`: Đồng ý về mặt nguyên tắc nhưng dời sang Phase/Sprint sau.
     - `REJECTED`: Từ chối vì rủi ro kỹ thuật vượt quá lợi ích mang lại.
5. **Ghi tệp & Đồng bộ Tài liệu**:
   - Lưu báo cáo vào `docs/{feature}/cr/CR-{MODULE}-{SEQ}.md`.
   - Nếu được APPROVED $
ightarrow$ Cập nhật tài liệu SRS chính thức, nâng version SemVer theo Rule 19.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Gán mã định danh duy nhất `CR-[MODULE]-[SEQ]` theo Rule 15.
- [ ] So sánh rõ ràng giữa hành vi cũ (Current) và hành vi mới đề xuất (Proposed).
- [ ] Phân tích đầy đủ và chi tiết cả 4 góc độ tác động: Tài liệu, Kỹ thuật, Kiểm thử, Kế hoạch.
- [ ] Ước tính định lượng Story Points và đánh giá rủi ro trễ hạn cụ thể.
- [ ] Có mục chữ ký phê duyệt (Approval Sign-off) của các bên có thẩm quyền.
