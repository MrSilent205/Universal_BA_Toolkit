---
name: srs
description: "Soạn thảo tài liệu Đặc tả Yêu cầu Phần mềm (SRS - Software Requirements Specification) chuẩn IEEE 830 / ISO 29148: đặc tả chi tiết FR, Business Rules, Ma trận Lỗi ERR, NFR hiệu năng và bảo mật"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /srs — Đặc tả Kỹ thuật Hệ thống (SRS Master) [CORE WORKFLOW]

Tạo lập tài liệu SRS hoàn chỉnh đạt tiêu chuẩn quốc tế IEEE 830 / ISO/IEC/IEEE 29148, đóng vai trò là "bản khế ước kỹ thuật tối cao" (Source of Truth) giữa Business Analyst, Khách hàng, Đội ngũ Lập trình và Đội ngũ Kiểm thử.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng sau khi đã chốt phạm vi nghiệp vụ từ `/brainstorm` hoặc `/prd`. Đây là tài liệu bắt buộc phải có trước khi tiến hành code và thiết kế cơ sở dữ liệu.
- **Đối tượng thụ hưởng**: Full-stack Developers, QA/QC Engineers, Technical Lead, Solution Architect, Project Manager.
- **Giá trị cốt lõi**: Loại bỏ 100% sự phỏng đoán của lập trình viên, chuẩn hóa từng input/output, phát biểu chặt chẽ các điều kiện biên và bảo đảm hệ thống xử lý trọn vẹn mọi kịch bản lỗi.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/srs [tên_tính_năng_hoặc_phân_hệ] [đường_dẫn_file_brainstorm_hoặc_prd]`
- **Dữ liệu đầu vào cần có**:
  - Biên bản brainstorm (`docs/{feature}/brainstorms/...`) hoặc tài liệu PRD.
  - Các quy định pháp lý hoặc tài liệu API tích hợp liên quan.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Cấu trúc mã `FR-[MODULE]-[FEATURE]-[SEQ]` và bảng thuộc tính.
- `rules/02-br-naming-convention.md` — Cấu trúc logic `BR-[DOMAIN]-[SEQ]` (WHEN/THEN/UNLESS).
- `rules/03-err-naming-convention.md` — Mã lỗi `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]`.
- `rules/04-nfr-standards.md` — Tiêu chuẩn phi chức năng ISO 25010 (P95, TLS 1.3, SLA).
- `rules/05-srs-ieee-830.md` — Cấu trúc mục lục chuẩn 4 phần của tài liệu IEEE 830.
- `rules/11-error-matrix-convention.md` — Bảng Ma trận Lỗi tổng hợp 7 cột.
- `rules/16-ambiguity-detection-rules.md` — Bộ lọc từ ngữ mơ hồ định tính.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.
- `rules/19-document-versioning-rules.md` — Lịch sử phiên bản SemVer và Revision History.

## Biểu mẫu tham chiếu (Template)
- `_templates/08-srs.md` (kèm các module con: `09-srs-fr.md`, `10-srs-nfr.md`, `11-business-rules.md`, `12-error-matrix.md`)

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/spec.md` (hoặc `docs/{feature}/srs/08-srs.md`)

## Quy trình thực thi chi tiết
1. **Thiết lập Khung Tổng quan (IEEE 830 Section 1 & 2)**:
   - Mô tả mục đích tài liệu, phạm vi sản phẩm (Product Scope), các giả định và phụ thuộc kỹ thuật.
2. **Đặc tả Yêu cầu Chức năng Chi tiết (Functional Requirements - Section 3.1)**:
   - Gán mã định danh duy nhất `FR-[MODULE]-[FEATURE]-[SEQ]` theo Rule 01.
   - Với mỗi FR, bắt buộc mô tả chi tiết 4 trường:
     - *Input*: Dữ liệu đầu vào, kiểu dữ liệu, bắt buộc hay tùy chọn.
     - *Validation Logic*: Các ràng buộc dữ liệu kiểm tra tính hợp lệ.
     - *Processing*: Các bước xử lý tuần tự của hệ thống, tính toán công thức, cập nhật DB.
     - *Output*: Kết quả trả về cho client (dữ liệu, thông báo thành công hoặc mã lỗi).
3. **Xây dựng Quy tắc Nghiệp vụ Chặt chẽ (Business Rules - Section 3.2)**:
   - Gán mã định danh `BR-[DOMAIN]-[SEQ]` theo Rule 02.
   - Phát biểu bằng cấu trúc mệnh đề điều kiện chuẩn mực: `KHI (WHEN)` $
ightarrow$ `THÌ (THEN)` $
ightarrow$ `NGOẠI LỆ (UNLESS)`.
4. **Xây dựng Ma trận Lỗi Hợp nhất (Consolidated Error Matrix - Section 3.3)**:
   - Gán mã lỗi chuẩn `ERR-[MODULE]-[HTTP_STATUS]-[SEQ]` theo Rule 03 và Rule 11.
   - Hoàn thành đầy đủ bảng 7 cột: Error Code, HTTP Status, Trigger Condition, Localization Key, UI Display Message, Severity, Next Action.
5. **Đặc tả Yêu cầu Phi chức năng Định lượng (NFR - Section 3.4)**:
   - Áp dụng Rule 04: Thời gian phản hồi API P95 < 500ms, tải cao điểm TPS, mã hóa dữ liệu at-rest AES-256, hash mật khẩu Argon2id, độ sẵn sàng 99.9%.
6. **Rà soát Độ mơ hồ & Xuất bản**:
   - Quét toàn bộ tài liệu qua Rule 16 để loại bỏ các tính từ chủ quan.
   - Bổ sung Frontmatter metadata (Rule 18) và Revision History (Rule 19).

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Tuân thủ đúng cấu trúc khung IEEE 830 / ISO 29148.
- [ ] 100% yêu cầu chức năng có mã `FR-` và chi tiết Input - Validation - Processing - Output.
- [ ] Toàn bộ Business Rules được mã hóa `BR-` theo cấu trúc WHEN / THEN / UNLESS.
- [ ] Có bảng Ma trận Lỗi tổng hợp (Rule 11) với thông báo UI thân thiện và mã HTTP tương ứng.
- [ ] Yêu cầu NFR được định lượng bằng chỉ số đo đếm cụ thể (P95 latency, SLA, chuẩn mã hóa).
- [ ] Không chứa bất kỳ từ ngữ mơ hồ định tính nào theo Rule 16.
