---
name: brd
description: "Soạn thảo Tài liệu Yêu cầu Nghiệp vụ Doanh nghiệp (BRD - Business Requirements Document): phân tích mục tiêu kinh doanh, luồng quy trình cấp cao AS-IS vs TO-BE, phân tích chi phí lợi ích (Cost-Benefit) và yêu cầu tuân thủ"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /brd — Tài liệu Yêu cầu Nghiệp vụ Doanh nghiệp (BRD) [STANDARD WORKFLOW]

Đặc tả các yêu cầu kinh doanh ở cấp độ doanh nghiệp, làm rõ động lực triển khai dự án, đối chiếu quy trình hiện tại (AS-IS) với quy trình tương lai (TO-BE) và tính toán hiệu quả đầu tư dự án (ROI / Cost-Benefit).

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng trong các dự án chuyển đổi số doanh nghiệp, triển khai ERP, CRM, Core Banking hoặc khi trình bày phương án với Ban Giám đốc và Nhà đầu tư để xin phê duyệt ngân sách.
- **Đối tượng thụ hưởng**: C-Level, Giám đốc khối nghiệp vụ, Project Sponsor, Lead BA, Finance Team.
- **Giá trị cốt lõi**: Chứng minh tính khả thi về mặt tài chính và vận hành, làm căn cứ pháp lý và nghiệp vụ để ký kết hợp đồng hoặc nghiệm thu dự án cấp cao.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/brd [tên_dự_án_hoặc_phân_hệ] [mô_tả_mục_tiêu_kinh_doanh]`
- **Dữ liệu đầu vào cần có**:
  - Bối cảnh doanh nghiệp và lý do cần thực hiện dự án (Business Drivers).
  - Quy trình vận hành thủ công hiện tại và các điểm nghẽn chi phí / thời gian.
  - Ngân sách dự kiến và kỳ vọng thu hồi vốn.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Quy ước mã hóa các chính sách nghiệp vụ cấp cao.
- `rules/15-change-request-impact-matrix.md` — Ma trận kiểm soát thay đổi phạm vi doanh nghiệp.
- `rules/16-ambiguity-detection-rules.md` — Loại bỏ các tuyên bố định tính trong mục tiêu kinh tế.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/06-brd.md`

## Vị trí lưu tệp mặc định
- `docs/{project_name}/06-brd.md`

## Quy trình thực thi chi tiết
1. **Mô tả Bối cảnh & Động lực Kinh doanh (Business Drivers & Problem Statement)**:
   - Nêu rõ vấn đề cốt lõi mà doanh nghiệp đang gặp phải (ví dụ: Quy trình duyệt tín dụng thủ công tốn 5 ngày làm việc, tỷ lệ sai sót hồ sơ 12%, chi phí vận hành tăng 25%/năm).
2. **Thiết lập Mục tiêu Kinh doanh Định lượng (SMART Business Objectives)**:
   - Rút ngắn thời gian xử lý hồ sơ từ 5 ngày xuống dưới 4 giờ.
   - Giảm tỷ lệ thất thoát hồ sơ xuống 0%.
   - Tiết kiệm 1.2 tỷ VNĐ chi phí nhân sự vận hành mỗi năm.
3. **Phân tích Quy trình Chuyển đổi (AS-IS vs TO-BE Process Modeling)**:
   - Mô tả quy trình hiện tại (AS-IS): Nhận diện các nút thắt cổ chai, bước xử lý thừa thãi, rủi ro gian lận.
   - Mô tả quy trình tương lai (TO-BE): Tự động hóa các bước kiểm tra dữ liệu qua API, số hóa chữ ký điện tử, chuẩn hóa luồng phê duyệt.
4. **Phân tích Chi phí & Lợi ích (Cost-Benefit & ROI Analysis)**:
   - Ước tính chi phí đầu tư ban đầu (CAPEX) và chi phí vận hành hàng năm (OPEX).
   - Dự báo thời gian hoàn vốn (Payback Period) và tỷ suất sinh lời kỳ vọng.
5. **Yêu cầu Tuân thủ & Rủi ro Doanh nghiệp (Compliance & Governance)**:
   - Các quy định pháp luật và chuẩn mực ngành bắt buộc tuân thủ (Nghị định 13/2023 về Bảo vệ dữ liệu cá nhân, chuẩn bảo mật PCI-DSS, chuẩn kế toán VAS).
6. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/06-brd.md` và lưu vào `docs/{project_name}/06-brd.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Vấn đề nghiệp vụ và động lực kinh doanh được phân tích định lượng bằng số liệu thực tế.
- [ ] Mục tiêu kinh doanh tuân thủ nguyên tắc SMART (có thời hạn và con số đo lường cụ thể).
- [ ] So sánh rõ ràng giữa quy trình AS-IS (hiện tại) và TO-BE (tương lai), làm nổi bật bước cải tiến.
- [ ] Có bảng ước tính sơ bộ Cost-Benefit và thời gian hoàn vốn (ROI).
- [ ] Xác định đầy đủ các ràng buộc pháp lý, chính sách doanh nghiệp và compliance ngành.
