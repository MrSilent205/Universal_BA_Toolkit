---
name: roadmap
description: "Xây dựng lộ trình phát hành sản phẩm (Product Roadmap): phân bổ đợt phát hành theo khung Now / Next / Later, xác định mục tiêu Release, phụ thuộc kỹ thuật và mốc bàn giao"
metadata:
  phase: 01-planning
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /roadmap — Lộ trình Phát triển Sản phẩm (Product Roadmap) [STANDARD WORKFLOW]

Xây dựng lộ trình phát hành trực quan phân bổ danh mục tính năng theo các mốc thời gian chiến lược (Now / Next / Later hoặc Release Sprints), quản lý chuỗi phụ thuộc kỹ thuật và xác định tiêu chuẩn bàn giao cho từng giai đoạn.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thực thi sau khi hoàn thành PRD hoặc Backlog tổng thể, cần thống nhất kế hoạch triển khai với ban điều hành, khách hàng và đội ngũ kỹ thuật.
- **Đối tượng thụ hưởng**: CPO/PM, Engineering Manager, Scrum Master, Đội ngũ phát triển và Khách hàng.
- **Giá trị cốt lõi**: Giúp các bên liên quan nắm bắt tiến độ kỳ vọng, quản lý rủi ro trễ hạn, đồng thời tạo cơ sở phân bổ nguồn lực và sắp xếp Sprint Backlog hợp lý.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/roadmap [tên_sản_phẩm] [tùy_chọn: now-next-later | quarterly | sprint-based]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu PRD (`docs/{product_name}/01-prd.md`) hoặc danh sách tính năng từ Backlog.
  - Kỳ vọng về thời gian bàn giao (Target Launch Date) của các mốc quan trọng.
  - Ràng buộc về nguồn lực và các đối tác tích hợp bên ngoài.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ mã yêu cầu chức năng FR vào các đợt phát hành.
- `rules/16-ambiguity-detection-rules.md` — Chuẩn hóa tiêu chí hoàn thành đo lường được.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.
- `rules/19-document-versioning-rules.md` — Quản lý phiên bản tài liệu lộ trình.

## Biểu mẫu tham chiếu (Template)
- `_templates/02-roadmap.md`

## Vị trí lưu tệp mặc định
- `docs/{product_name}/02-roadmap.md`

## Quy trình thực thi chi tiết
1. **Thu thập & Đánh giá mức độ ưu tiên tính năng**:
   - Trích xuất danh mục tính năng P0, P1, P2 từ PRD.
   - Áp dụng phương pháp đánh giá giá trị (Value vs Effort hoặc RICE Score: Reach, Impact, Confidence, Effort) để xếp thứ tự triển khai.
2. **Phân bổ theo Khung Lộ trình 3 Tầng**:
   - **Now (Sprint hiện tại / MVP Release)**: Các tính năng P0 sống còn, cam kết bàn giao trong 2-6 tuần tới.
   - **Next (Phát hành tiếp theo / Phase 2)**: Các tính năng P1 quan trọng nhằm mở rộng thị trường, dự kiến trong 1-3 tháng.
   - **Later (Tầm nhìn dài hạn / Phase 3)**: Các cải tiến nâng cao P2, tích hợp AI hoặc tối ưu hóa mở rộng, chưa ấn định ngày cụ thể.
3. **Phân tích chuỗi phụ thuộc kỹ thuật (Technical Dependencies)**:
   - Chỉ rõ tính năng nào là tiền đề (Prerequisite) của tính năng khác (ví dụ: Module Xác thực OAuth2 và Data Schema phải hoàn thành trước luồng Thanh toán).
   - Ghi chú các điểm nghẽn tích hợp với hệ thống bên thứ ba (Cổng thanh toán, Đơn vị vận chuyển, SMS OTP).
4. **Xác định Tiêu chí Hoàn thành từng Milestone (Definition of Done)**:
   - Xác định tiêu chuẩn nghiệm thu cho từng Release: Coverage test, kiểm thử tải, tài liệu người dùng, duyệt bảo mật.
5. **Ghi tệp & Xuất bản tài liệu**:
   - Sử dụng template `_templates/02-roadmap.md` và lưu vào `docs/{product_name}/02-roadmap.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phân chia rõ ràng tính năng giữa 3 làn Now (Cam kết cao), Next (Kỳ vọng), Later (Định hướng).
- [ ] Mọi mục tiêu trong lộ trình đều ánh xạ trực tiếp với mã `FR-` trong PRD.
- [ ] Xác định rõ ràng các chuỗi phụ thuộc kỹ thuật (Dependencies) và rủi ro rào cản (Blockers).
- [ ] Định nghĩa rõ Definition of Done (DoD) và ngày phát hành kỳ vọng cho mỗi đợt Release.
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) liên kết với tài liệu PRD.
