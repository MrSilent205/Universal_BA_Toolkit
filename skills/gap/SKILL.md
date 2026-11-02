---
name: gap
description: "Phân tích Lỗ hổng Nghiệp vụ & Kịch bản Thiếu sót (Business Logic Gap Analysis): soi chiếu toàn diện các góc khuất, timeout, lỗi mạng, hủy ngang, race conditions, xung đột phân quyền và mã lỗi chưa xử lý"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /gap — Phân tích Lỗ hổng Nghiệp vụ (Gap Analysis) [CORE WORKFLOW]

Thực hiện quy trình soi chiếu phản biện độc lập đối với hồ sơ tài liệu tính năng (SRS, Wireframe, Use Case, API Specs), phát hiện các kịch bản bị bỏ sót, các điểm nghẽn logic và các giả định ngầm chưa được kiểm chứng trước khi đội ngũ lập trình bắt đầu code.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc kích hoạt ngay sau khi hoàn thành bản nháp SRS hoặc trước khi chốt phạm vi Sprint Planning; đóng vai trò là "bộ lọc an toàn" ngăn ngừa bug logic ngay từ khâu thiết kế.
- **Đối tượng thụ hưởng**: Business Analyst, Lead Architect, QA Lead, Product Owner.
- **Giá trị cốt lõi**: Khắc phục hiện tượng "chỉ vẽ con đường màu hồng" (Happy Path bias); phát hiện sớm 90% các tình huống ngoại lệ khó nhằn mà BA và Dev thường bỏ quên, giảm thiểu tối đa rework và bug production.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/gap [tên_tính_năng] [đường_dẫn_thư_mục_tai_lieu_srs]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ hồ sơ tính năng: SRS (`docs/{feature}/srs/spec.md`), Sơ đồ luồng, Wireframe, Ma trận lỗi.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Phát hiện các kịch bản chưa có Business Rule chi phối.
- `rules/03-err-naming-convention.md` — Phát hiện các trường hợp lỗi chưa được gán mã ERR.
- `rules/11-error-matrix-convention.md` — Kiểm tra tính toàn diện của Ma trận Lỗi.
- `rules/16-ambiguity-detection-rules.md` — Quét sạch từ ngữ mơ hồ định tính trong giải pháp.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/45-gap-analysis.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/gap-analysis.md`

## Quy trình thực thi chi tiết
1. **Rà soát theo 6 Chiều Không gian Lỗ hổng (The 6 Gap Dimensions)**:
   - **Chiều 1: Timeout & Lỗi Mạng (Network & Third-Party Failures)**:
     - Đã có kịch bản xử lý khi cổng thanh toán hoặc SMS OTP bị timeout quá 30s chưa?
     - Dữ liệu giao dịch treo được hoàn tiền tự động hay bắt khách hàng gọi CSKH?
   - **Chiều 2: Hủy ngang & Quay lui (Abort & Rollback Scenarios)**:
     - Người dùng bấm nút Back trình duyệt hoặc tắt app ngay sau khi bấm thanh toán thì hệ thống xử lý thế nào? Đã trừ kho chưa?
   - **Chiều 3: Xung đột Đồng thời & Chống Trùng lặp (Concurrency & Idempotency)**:
     - Hai người cùng mua món đồ cuối cùng trong kho tại cùng 1 giây?
     - Người dùng bấm nút Submit 3 lần liên tiếp do mạng lag có bị tạo 3 đơn không?
   - **Chiều 4: Dữ liệu Biên & Giới hạn Vật lý (Data Boundaries & Truncation)**:
     - Tên khách hàng dài 200 ký tự có làm vỡ layout không?
     - Tải file ảnh 25MB có làm tràn RAM server không?
   - **Chiều 5: Ranh giới Phân quyền & Bảo mật (Access Control & RBAC)**:
     - Khách hàng có xem được đơn hàng của người khác khi đổi `order_id` trên URL không (IDOR)?
     - Nhân viên cấp thấp có bấm được nút hoàn tiền không?
   - **Chiều 6: Xung đột Quy tắc Nghiệp vụ (Business Rule Conflicts)**:
     - Hai mã voucher giảm giá có được áp dụng đè lên nhau không?
2. **Lập Bảng Danh mục Phát hiện Lỗ hổng (Gap Inventory Table)**:
   - Cột: `Mã Lỗ hổng (GAP-xxx)` | `Hạng mục` | `Mô tả Rủi ro / Điểm mù` | `Hậu quả nếu không xử lý` | `Mức độ Nghiêm trọng (Critical/Major/Minor)` | `Giải pháp Đề xuất`.
3. **Đề xuất Bổ sung Quy tắc & Mã lỗi Cụ thể**:
   - Kiến nghị bổ sung ngay mã `BR-[DOMAIN]-[SEQ]` mới và mã lỗi `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` vào SRS.
4. **Ghi tệp Báo cáo**:
   - Sử dụng template `_templates/45-gap-analysis.md` và lưu vào `docs/{feature}/gap-analysis.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Báo cáo rà soát đầy đủ cả 6 chiều không gian lỗ hổng kỹ thuật và nghiệp vụ.
- [ ] Từng phát hiện (Gap) đều chỉ rõ hậu quả thực tế và đề xuất giải pháp kỹ thuật cụ thể.
- [ ] Phân loại mức độ nghiêm trọng chính xác (Critical: Phải sửa trước khi code; Major: Cần sửa trong sprint; Minor: Cải tiến sau).
- [ ] Đề xuất bổ sung trực tiếp các mã `BR-` và `ERR-` đối ứng vào tài liệu SRS chính thức.
