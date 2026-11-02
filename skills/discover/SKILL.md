---
name: discover
description: "Thẩm định ý tưởng sản phẩm (Product Discovery): khảo sát nhu cầu, phân tích đối thủ cạnh tranh, đánh giá 4 loại rủi ro (Value, Usability, Feasibility, Viability) và đưa ra quyết định GO / NO-GO"
metadata:
  phase: 01-planning
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /discover — Điều tra & Thẩm định Ý tưởng (Product Discovery) [STANDARD WORKFLOW]

Thực hiện quy trình điều tra chuyên sâu nhằm kiểm chứng tính đúng đắn của các giả thuyết sản phẩm trước khi phân bổ ngân sách lập trình, giảm thiểu tối đa rủi ro xây dựng sản phẩm không ai cần.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Kích hoạt khi có một ý tưởng tính năng mới còn mơ hồ, khi ban lãnh đạo phân vân giữa nhiều hướng giải pháp hoặc trước khi quyết định đầu tư một phân hệ lớn.
- **Đối tượng thụ hưởng**: Founder, Product Owner, Head of Product, Business Sponsor, Technical Architect.
- **Giá trị cốt lõi**: Tiết kiệm hàng tháng trời code vô ích bằng cách xác thực nhu cầu thực tế, bóc tách điểm mạnh yếu của đối thủ và đánh giá khả năng thực thi kỹ thuật ngay từ ngày đầu.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/discover [tên_ý_tưởng_hoặc_sản_phẩm] [mô_tả_bài_toán_cần_thẩm_định]`
- **Dữ liệu đầu vào cần có**:
  - Mô tả giả thuyết giá trị (Value Hypothesis): Ai đang gặp vấn đề gì?
  - Giải pháp đề xuất sơ khởi.
  - Danh sách 2-3 đối thủ cạnh tranh trực tiếp hoặc giải pháp thay thế hiện có trên thị trường.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/16-ambiguity-detection-rules.md` — Chặn các giả định định tính không có căn cứ thực nghiệm.
- `rules/17-actor-role-definition.md` — Định danh chính xác phân khúc khách hàng mục tiêu.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/03-discover.md`

## Vị trí lưu tệp mặc định
- `docs/{product_name}/03-discovery-report.md`

## Quy trình thực thi chi tiết
1. **Thiết lập Khung Giả thuyết Cốt lõi (Core Hypotheses)**:
   - Phát biểu giả thuyết: "Chúng tôi tin rằng [Nhóm đối tượng] đang gặp khó khăn khi [Vấn đề], và họ sẵn sàng dùng [Giải pháp] để đạt được [Kết quả]".
2. **Phân tích Cạnh tranh (Competitive Analysis)**:
   - Lập ma trận so sánh tính năng (Feature Matrix) và mô hình định giá (Pricing Model) với tối thiểu 3 đối thủ.
   - Nhận diện "khoảng trống thị trường" (Market Gap) và đề xuất lợi thế cạnh tranh bất bình đẳng (Unfair Advantage).
3. **Đánh giá 4 Rủi ro Sản phẩm (Marty Cagan's 4 Big Risks)**:
   - **Value Risk**: Khách hàng có thực sự muốn mua/dùng giải pháp này không?
   - **Usability Risk**: Người dùng có hiểu và thao tác được một cách trực quan không?
   - **Feasibility Risk**: Đội ngũ kỹ thuật có đủ công nghệ, năng lực và thời gian để xây dựng không?
   - **Viability Risk**: Giải pháp có phù hợp với pháp lý, tài chính, đối tác và mô hình kinh doanh không?
4. **Đề xuất Kết luận Chiến lược (Go / No-Go / Pivot)**:
   - **GO**: Ý tưởng khả thi cao, đề xuất chuyển tiếp sang lệnh `/prd` hoặc `/brainstorm`.
   - **PIVOT**: Nhu cầu có thật nhưng giải pháp đề xuất chưa tối ưu, cần tinh chỉnh mô hình.
   - **NO-GO**: Thị trường quá nhỏ, rủi ro kỹ thuật vượt quá ngân sách hoặc đối thủ đã độc quyền.
5. **Ghi tệp báo cáo**:
   - Xuất toàn bộ nội dung theo template `_templates/03-discover.md` vào `docs/{product_name}/03-discovery-report.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Giả thuyết sản phẩm được phát biểu rõ ràng, có tiêu chí đo lường định lượng cụ thể.
- [ ] Bảng phân tích đối thủ cạnh tranh có chiều sâu, chỉ ra được điểm yếu và khoảng trống thị trường.
- [ ] Đánh giá đầy đủ cả 4 rủi ro: Value, Usability, Feasibility, Viability.
- [ ] Đưa ra kết luận rõ ràng (GO, NO-GO hoặc PIVOT) có lập luận chặt chẽ kèm bước hành động tiếp theo.
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) chuẩn hóa.
