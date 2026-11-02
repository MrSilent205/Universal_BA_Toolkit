---
name: ask
description: "Truy vấn và giải thích nghiệp vụ dự án từ kho tri thức tài liệu (Project Knowledge Query Engine): tra cứu chéo theo metadata, dẫn nguồn trích dẫn chính xác và làm rõ logic đang vận hành"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /ask — Truy vấn & Giải thích Nghiệp vụ Dự án (Knowledge Query) [STANDARD WORKFLOW]

Đóng vai trò là "Bộ bách khoa toàn thư nghiệp vụ sống" của dự án, hỗ trợ lập trình viên, tester và các bên liên quan đặt câu hỏi bằng ngôn ngữ tự nhiên và nhận được câu trả lời chính xác kèm trích dẫn điều khoản, file tài liệu và mã quy tắc đối ứng.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bất kỳ khi nào một thành viên trong dự án thắc mắc: "Trường hợp này hệ thống xử lý thế nào?", "Quy tắc tính phí phạt hủy đơn là gì?", "Mã lỗi này do đâu sinh ra?".
- **Đối tượng thụ hưởng**: Developers, QA Engineers, CSKH/Support, New team members (Onboarding).
- **Giá trị cốt lõi**: Tiết kiệm hàng giờ đọc mò mẫm hàng trăm trang tài liệu; cung cấp câu trả lời có tính xác thực cao (Grounding), loại bỏ tình trạng "nghe đồn" hoặc phỏng đoán quy tắc nghiệp vụ.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/ask [câu_hỏi_nghiệp_vụ_hoặc_mã_cần_tra_cứu]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ thư mục tài liệu `docs/` chứa các tệp Markdown có gắn Frontmatter metadata theo Rule 18.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Tra cứu mã FR.
- `rules/02-br-naming-convention.md` — Tra cứu quy tắc BR.
- `rules/03-err-naming-convention.md` — Tra cứu mã lỗi ERR.
- `rules/18-knowledge-graph-metadata.md` — Quét metadata YAML để tìm tài liệu liên quan.

## Biểu mẫu tham chiếu (Template)
- Trích xuất thông tin trực tiếp từ các file tài liệu trong `docs/` và khung SRS `_templates/08-srs.md`.

## Vị trí lưu tệp mặc định
- Xuất trực tiếp câu trả lời ra màn hình tương tác (`stdout` / Chat response) kèm đường dẫn trích dẫn.

## Quy trình thực thi chi tiết
1. **Phân tích Ý định Câu hỏi (Intent Parsing & Entity Extraction)**:
   - Nhận diện các thực thể trong câu hỏi: Mã định danh (`FR-xxx`, `BR-xxx`, `ERR-xxx`), tên phân hệ, hoặc từ khóa nghiệp vụ (ví dụ: "hoàn tiền", "khóa tài khoản", "đổi trả").
2. **Quét & Khoanh vùng Tài liệu Trọng tâm (Context Retrieval via Metadata)**:
   - Quét Frontmatter YAML của các tệp trong `docs/` theo Rule 18: lọc theo `tags`, `domain`, `phase` và các liên kết `depends_on`.
   - Tìm kiếm chính xác các đoạn văn bản chứa quy tắc chi phối vấn đề được hỏi.
3. **Tổng hợp Câu trả lời Đạt Chuẩn Senior BA**:
   - Cấu trúc câu trả lời bắt buộc gồm 3 phần:
     1. **Câu trả lời trực tiếp (Direct Answer)**: Ngắn gọn, súc tích trong 1-2 câu.
     2. **Logic & Quy tắc Chi phối (Business Rules & Conditions)**: Trích dẫn rõ ràng nguyên văn mệnh đề `WHEN ... THEN ... UNLESS ...` của mã `BR-xxx`.
     3. **Nguồn Trích dẫn Xác thực (Authoritative Citations)**: Đường dẫn file tài liệu cụ thể và số dòng (ví dụ: `docs/checkout/srs/spec.md#L45-L60`).
4. **Cảnh báo Điểm Mù (Ambiguity / Gap Warning)**:
   - Nếu câu hỏi rơi vào trường hợp tài liệu CHƯA QUY ĐỊNH $ightarrow$ Thẳng thắn thông báo: "Trường hợp này chưa có quy tắc đặc tả trong hệ thống", đồng thời gợi ý kích hoạt lệnh `/gap` hoặc `/cr` để bổ sung.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Câu trả lời trực diện, chính xác, không vòng vo hay suy diễn ngoài tài liệu.
- [ ] Trích dẫn chính xác mã định danh chuẩn (`FR-`, `BR-`, `ERR-`, `UC-`).
- [ ] Dẫn nguồn rõ ràng đến file tài liệu cụ thể trong thư mục `docs/`.
- [ ] Chủ động cảnh báo nếu vấn đề được hỏi chưa được đặc tả trong tài liệu dự án.
