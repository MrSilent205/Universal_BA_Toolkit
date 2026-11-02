---
name: urd
description: "Soạn thảo Tài liệu Yêu cầu Người dùng (URD - User Requirements Document): phân tích chân dung Personas, lập bản đồ hành trình trải nghiệm (Customer Journey Map) và tổng hợp danh mục User Needs"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /urd — Tài liệu Yêu cầu Người dùng (User Requirements Document) [STANDARD WORKFLOW]

Đặc tả các kỳ vọng, trải nghiệm và nhu cầu của người dùng cuối dưới góc độ lấy người dùng làm trung tâm (User-Centric), làm cầu nối chuyển tiếp từ chiến lược sản phẩm sang giải pháp kỹ thuật.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Soạn thảo sau khi hoàn thành PRD hoặc Discovery, trước khi bắt đầu thiết kế luồng màn hình UI hoặc viết SRS chi tiết.
- **Đối tượng thụ hưởng**: UI/UX Designer, Product Owner, Business Analyst, QA Team.
- **Giá trị cốt lõi**: Đảm bảo toàn bộ giải pháp kỹ thuật giải quyết đúng nỗi đau (Pain Points) thực tế của người dùng, tránh việc xây dựng các chức năng phức tạp mà trải nghiệm người dùng lại cồng kềnh, khó thao tác.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/urd [tên_tính_năng_hoặc_phân_hệ]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu PRD (`docs/{product_name}/01-prd.md`) hoặc biên bản phỏng vấn người dùng.
  - Dữ liệu khảo sát hành vi khách hàng mục tiêu.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/16-ambiguity-detection-rules.md` — Loại bỏ mô tả cảm tính về trải nghiệm người dùng.
- `rules/17-actor-role-definition.md` — Quy chuẩn định nghĩa Actor và phân loại nhóm người dùng.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/05-urd.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/05-urd.md`

## Quy trình thực thi chi tiết
1. **Xây dựng Chân dung Người dùng Chi tiết (User Personas)**:
   - Xác định bối cảnh làm việc, mục tiêu (Goals), nỗi đau (Frustrations) và mức độ am hiểu công nghệ của từng nhóm người dùng theo Rule 17.
2. **Lập Bản đồ Hành trình Người dùng (User Journey Map)**:
   - Mô phỏng hành trình trải nghiệm qua 5 giai đoạn: Nhận biết (Awareness) $ightarrow$ Cân nhắc (Consideration) $ightarrow$ Thao tác (Action) $ightarrow$ Nhận giá trị (Value Achievement) $ightarrow$ Giữ chân (Retention).
   - Xác định rõ hành động (Touchpoints), cảm xúc người dùng và các điểm tắc nghẽn (Drop-off points) tại mỗi chặng.
3. **Phân rã Danh mục Nhu cầu Người dùng (User Needs Catalog)**:
   - Đánh mã phân cấp `UN-[MODULE]-[SEQ]` (ví dụ: `UN-AUTH-001`: Người dùng muốn đăng nhập bằng vân tay/FaceID thay vì nhớ mật khẩu phức tạp).
   - Phân loại mức độ cấp bách: Critical (Sống còn), Important (Quan trọng), Desirable (Mong muốn có thêm).
4. **Định hình Tiêu chuẩn Trải nghiệm & Tiếp cận (UX Standards)**:
   - Quy định số bước thao tác tối đa cho tác vụ chính (ví dụ: Tối đa 3 bước click để hoàn tất đặt hàng).
   - Đáp ứng chuẩn tiếp cận WCAG 2.1 Level AA (tương phản màu, hỗ trợ screen-reader cho người khiếm thị).
5. **Ghi tệp & Xuất bản**:
   - Áp dụng template `_templates/05-urd.md` và lưu vào `docs/{feature}/05-urd.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Chân dung Persona thể hiện rõ Pain Points và Goals cụ thể, không viết chung chung.
- [ ] Bản đồ hành trình User Journey Map bóc tách đầy đủ các điểm chạm (Touchpoints) và điểm rơi (Drop-off).
- [ ] Mọi User Need đều có mã định danh `UN-` và đánh giá mức độ cấp thiết cụ thể.
- [ ] Đặt ra các tiêu chí trải nghiệm đo lường được (số lần click, thời gian hoàn thành tác vụ).
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) chuẩn hóa.
