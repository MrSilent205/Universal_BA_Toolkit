---
name: reverse-doc
description: "Tái lập tài liệu đặc tả chuẩn hóa (Reverse Documentation) từ các nguồn rời rạc: biên bản họp, bản ghi chép nháp, slides trình chiếu, email trao đổi hoặc tài liệu phân mảnh"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /reverse-doc — Tái lập Tài liệu Đặc tả từ Nguồn Rời rạc [STANDARD WORKFLOW]

Quét, tổng hợp và cấu trúc lại các thông tin phân mảnh nằm rải rác trong các bản ghi chú cuộc họp, email, slide thuyết trình hoặc tài liệu thiết kế cũ để tái tạo một bộ tài liệu đặc tả nghiệp vụ đạt chuẩn IEEE 830.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Dự án tiếp nhận tính năng dở dang không có tài liệu chuẩn, chỉ có các bản chat Slack, biên bản họp, tài liệu cũ viết sơ sài hoặc sơ đồ vẽ tay.
- **Đối tượng thụ hưởng**: Business Analyst kế nhiệm, Tech Lead, Đội ngũ QA, Ban quản lý dự án.
- **Giá trị cốt lõi**: Khôi phục "nguồn sự thật duy nhất" (Single Source of Truth) từ đống thông tin hỗn loạn, tránh thất thoát tri thức dự án và tạo tiền đề để bảo trì/nâng cấp hệ thống an toàn.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/reverse-doc [thư_mục_chứa_tài_liệu_cũ_hoặc_file_ghi_chú] [tên_tính_năng]`
- **Dữ liệu đầu vào cần có**:
  - File ghi chép nháp, biên bản họp, file markdown cũ, slides xuất text.
  - Các trao đổi thảo luận về quy tắc nghiệp vụ giữa PO và Dev.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Mã hóa lại các yêu cầu tìm thấy thành FR chuẩn.
- `rules/02-br-naming-convention.md` — Trích xuất và chuẩn hóa Business Rules.
- `rules/05-srs-ieee-830.md` — Khung cấu trúc tái lập tài liệu.
- `rules/16-ambiguity-detection-rules.md` — Rà soát làm rõ các điểm mâu thuẫn trong ghi chép cũ.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/13-reverse-doc.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/spec-recovered.md` (hoặc `docs/{feature}/13-reverse-doc.md`)

## Quy trình thực thi chi tiết
1. **Quét & Khảo sát Nguồn Dữ liệu (Source Ingestion & Extraction)**:
   - Đọc toàn bộ các tệp ghi chép, trích xuất: danh sách tác nhân, hành động hệ thống, quy tắc nghiệp vụ, điều kiện ràng buộc.
2. **Đối chiếu Xung đột & Làm sạch Dữ liệu (Conflict Resolution & Cleansing)**:
   - Phát hiện các điểm mâu thuẫn giữa các ghi chú ở các thời điểm khác nhau (ví dụ: Bản ghi tháng 5 ghi "cho phép hủy đơn trong 24h", bản ghi tháng 8 ghi "chỉ hủy trong 15 phút").
   - Lập bảng danh sách "Điểm cần xác nhận lại" (Open Clarifications) để PO/Stakeholder chốt phương án cuối cùng.
3. **Cấu trúc hóa thành Khung Chuẩn IEEE 830**:
   - Gán lại mã định danh phân cấp: `FR-[MODULE]-[FEATURE]-[SEQ]`, `BR-[DOMAIN]-[SEQ]`, `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]`.
   - Viết lại các phát biểu thành câu khẳng định kỹ thuật rõ ràng, loại bỏ từ ngữ văn nói và cảm tính.
4. **Tái lập Ma trận Truy vết & Sơ đồ Tương tác**:
   - Tóm tắt lại luồng tương tác chính giữa các bên.
5. **Ghi tệp & Cập nhật Lịch sử**:
   - Sử dụng template `_templates/13-reverse-doc.md` và lưu vào `docs/{feature}/srs/spec-recovered.md`.
   - Ghi chú rõ nguồn gốc tài liệu trong phần Revision History.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Trích xuất đầy đủ và không bỏ sót các quy tắc nghiệp vụ từ các tài liệu nguồn.
- [ ] Lập bảng danh mục các điểm mâu thuẫn/chưa rõ ràng (Open Questions) có phân công người duyệt.
- [ ] Toàn bộ yêu cầu được gán mã chuẩn `FR-`, `BR-`, `ERR-` theo quy ước chung của BA-Kit.
- [ ] Văn phong được chuẩn hóa thành ngôn ngữ kỹ thuật chuyên nghiệp, không còn dạng văn nói ghi chép.
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) liên kết tài liệu nguồn.
