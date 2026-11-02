---
name: doc-drift
description: "Phát hiện Lệch pha giữa Tài liệu Đặc tả và Mã nguồn Thực tế (Documentation vs Code Drift Analysis): quét đối chiếu code dev với SRS, phát hiện thiếu endpoint, logic validate sai lệch hoặc tính năng làm chui"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /doc-drift — Kiểm tra Lệch pha Giữa Đặc tả và Mã nguồn (Doc Drift) [CORE WORKFLOW]

Quét đối chiếu song song giữa tài liệu đặc tả nghiệp vụ (SRS, User Stories, API Specs) và mã nguồn thực tế của lập trình viên (Controllers, Models, Validations), phát hiện các điểm "lệch pha" (Drift) nguy hiểm phát sinh trong quá trình code.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện ở giữa sprint (Mid-sprint review) hoặc trước ngày UAT/Release; khi chuẩn bị bàn giao dự án cho khách hàng hoặc khi tài liệu không còn khớp với những gì đang chạy.
- **Đối tượng thụ hưởng**: Technical Product Owner, Lead BA, QA Lead, Tech Lead.
- **Giá trị cốt lõi**: Khắc phục căn bệnh kinh niên của ngành IT: "Code chạy một đằng, tài liệu viết một nẻo"; bảo vệ tính toàn vẹn của hồ sơ bàn giao và ngăn ngừa các lỗi nghiệm thu ngớ ngẩn.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/doc-drift [đường_dẫn_tai_lieu_srs] [đường_dẫn_ma_nguon_codebase]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu SRS (`docs/{feature}/srs/spec.md`) và danh mục FR/BR.
  - Thư mục mã nguồn backend / frontend tương ứng.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Đối chiếu danh mục FR với mã nguồn.
- `rules/02-br-naming-convention.md` — Đối chiếu logic điều kiện trong code với BR.
- `rules/14-test-case-traceability.md` — Kiểm tra độ phủ thực tế.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/46-doc-drift.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/doc-drift-report.md`

## Quy trình thực thi chi tiết
1. **Quét & Đối chiếu Danh mục Yêu cầu Chức năng (FR Completeness Check)**:
   - So sánh danh sách `FR-xxx` trong tài liệu với API Endpoints / UI Buttons trong code:
     - Tính năng đã hoàn thành đúng đặc tả (Implemented & Matched).
     - Tính năng có trong đặc tả nhưng code CHƯA LÀM (Missing Feature).
     - Tính năng có trong code nhưng tài liệu KHÔNG HỀ CÓ (Phantom / Shadow Feature — Dev tự chế).
2. **Đối chiếu Ràng buộc Nghiệp vụ (Business Rule & Validation Drift)**:
   - Đọc các câu lệnh validate và `if / else` trong code:
     - *Lỏng hơn đặc tả*: SRS yêu cầu mật khẩu tối thiểu 8 ký tự có ký tự đặc biệt, nhưng code chỉ check `length >= 6` $
ightarrow$ Lỗ hổng bảo mật.
     - *Chặt hơn đặc tả*: SRS cho phép đặt tối đa 10 sản phẩm, code chặn ở mức 5 sản phẩm $
ightarrow$ Khách hàng không mua được hàng.
3. **Đối chiếu Mã Lỗi & Thông báo Người dùng (Error Response Drift)**:
   - Đối chiếu danh sách `throw new Exception` trong code với Ma trận Lỗi (`ERR-xxx`):
     - Phát hiện các mã lỗi "tự chế" chưa được định nghĩa trong tài liệu SRS.
     - Phát hiện thông báo lỗi kỹ thuật lộ ra ngoài frontend (lộ stack trace, lộ câu lệnh SQL).
4. **Phân loại Mức độ Nghiêm trọng của Độ lệch (Drift Severity)**:
   - **Breaking Drift**: Lệch cấu trúc dữ liệu, thiếu trường bắt buộc, API trả về 500.
   - **Logic Drift**: Validate sai quy tắc nghiệp vụ, tính toán sai thuế/chiết khấu.
   - **Cosmetic Drift**: Lệch nhãn hiển thị, sai chính tả nhẹ.
5. **Đề xuất Hành động Khắc phục (Resolution Action Plan)**:
   - Với mỗi điểm lệch: Chỉ rõ sửa CODE hay sửa TÀI LIỆU (nếu yêu cầu thay đổi đã được PO duyệt miệng).
6. **Ghi tệp**:
   - Sử dụng template `_templates/46-doc-drift.md` và lưu vào `docs/{feature}/doc-drift-report.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Báo cáo phân tích đối chiếu rõ ràng giữa 3 cột: Đặc tả SRS vs Thực tế Codebase vs Kết luận.
- [ ] Phát hiện được cả 2 chiều: Tính năng thiếu trong code và tính năng dev tự chế (Phantom feature).
- [ ] Chỉ ra chính xác các sai lệch về quy tắc validate dữ liệu và mã lỗi phản hồi.
- [ ] Có kế hoạch hành động cụ thể (Action Items): Ai sửa, sửa Code hay sửa Tài liệu, thời hạn hoàn thành.
