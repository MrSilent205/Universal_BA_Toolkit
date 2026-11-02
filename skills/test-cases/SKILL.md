---
name: test-cases
description: "Soạn thảo Bộ Test Cases Kiểm thử Toàn diện (Detailed Test Suite Specification): đầy đủ Pre-conditions, Test Steps, Test Data thực tế, Expected Results, Severity và liên kết ma trận truy vết RTM"
metadata:
  phase: 07-testing
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /test-cases — Bộ Đặc tả Test Cases Chi tiết (Executable Test Suite) 🌟 [CORE WORKFLOW]

Xây dựng bộ kịch bản kiểm thử chi tiết từng bước (Step-by-Step Test Cases), cung cấp đầy đủ dữ liệu thử nghiệm cụ thể, điều kiện tiên quyết và kết quả mong đợi có thể thực thi ngay lập tức bởi Manual Testers hoặc làm đầu vào lập trình kiểm thử tự động.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trong giai đoạn chuẩn bị kiểm thử (Test Design Phase) của mỗi Sprint hoặc trước mỗi đợt UAT (User Acceptance Testing) bàn giao cho khách hàng.
- **Đối tượng thụ hưởng**: QA Engineers, UAT Testers, Developers (dùng để tự test trước khi tạo Pull Request), Product Owner.
- **Giá trị cốt lõi**: Bảo đảm tính lặp lại (Reproducibility) của bài kiểm thử — bất kỳ ai đọc vào cũng có thể thực thi chính xác và thu được kết quả đồng nhất; bảo đảm 100% yêu cầu chức năng (FR) đều được kiểm chứng.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/test-cases [tên_tính_năng] [đường_dẫn_file_ac_hoặc_checklist]`
- **Dữ liệu đầu vào cần có**:
  - Kịch bản Acceptance Criteria (`docs/{feature}/userstories/acceptance-criteria.md`).
  - Ma trận Lỗi tổng hợp (`rules/11-error-matrix-convention.md`).
  - Quy tắc truy vết RTM (`rules/14-test-case-traceability.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ Test Case với mã yêu cầu chức năng FR.
- `rules/03-err-naming-convention.md` — Mã lỗi kỳ vọng khi kiểm thử ca thất bại.
- `rules/08-gherkin-acceptance-criteria.md` — Chuyển hóa kịch bản BDD thành test cases.
- `rules/11-error-matrix-convention.md` — Đối chiếu thông báo lỗi thực tế và mã HTTP.
- `rules/14-test-case-traceability.md` — Ma trận truy vết yêu cầu (RTM Table).
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/43-test-cases.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/test/test-cases.md`

## Quy trình thực thi chi tiết
1. **Thiết lập Quy ước Đặt Mã Test Case (Naming Convention)**:
   - Gán mã duy nhất: `TC-[MODULE]-[FEATURE]-[SEQ]` (ví dụ: `TC-AUTH-LGN-001: Đăng nhập thành công với email và mật khẩu hợp lệ`).
2. **Cấu trúc Bảng Test Case Chi tiết Chuẩn Quốc tế**:
   - Với mỗi Test Case, bắt buộc bao gồm đầy đủ 8 trường thông tin:
     1. `Test Case ID`: Mã định danh duy nhất.
     2. `Tên Kịch bản`: Ngắn gọn, mô tả rõ mục tiêu kiểm thử.
     3. `FR / Story Ref`: Ánh xạ trực tiếp mã `FR-xxx` và `US-xxx`.
     4. `Điều kiện Tiên quyết (Pre-conditions)`: Trạng thái tài khoản, dữ liệu sẵn có trong DB (ví dụ: Tài khoản `test@domain.com` đã kích hoạt, số dư = 500.000đ).
     5. `Các Bước Thực hiện (Test Steps)`: Đánh số 1, 2, 3... rõ ràng hành động người dùng.
     6. `Dữ liệu Thử nghiệm (Test Data)`: Giá trị cụ thể điền vào form (Email: `user@test.vn`, Mật khẩu: `Pass@1234`).
     7. `Kết quả Mong đợi (Expected Result)`: Mô tả chính xác màn hình hiển thị, dữ liệu lưu trong DB, mã lỗi `ERR-xxx` và HTTP code trả về nếu là ca lỗi.
     8. `Mức độ Nghiêm trọng (Severity) & Độ ưu tiên (Priority)`:
        - Severity: Blocker / Critical / Major / Minor.
        - Priority: P0 (Bắt buộc chạy trước) / P1 / P2.
3. **Bao phủ Đầy đủ 3 Nhóm Ca Kiểm thử Bắt buộc**:
   - **Positive Tests (Happy Path)**: Kiểm thử luồng hợp lệ thông thường.
   - **Negative Tests (Error Path)**: Cố tình nhập sai dữ liệu, vi phạm quy tắc `BR-xxx` để kiểm chứng mã lỗi `ERR-xxx`.
   - **Boundary Tests (Giới hạn biên)**: Kiểm thử trường rỗng, chuỗi ký tự max độ dài, giá trị tiền tệ 0đ và mức tối đa.
4. **Xây dựng Bảng Ma trận Truy vết Yêu cầu (RTM Table)**:
   - Bổ sung bảng RTM ở cuối file đối chiếu 100% `FR-ID` $ightarrow$ `US-ID` $ightarrow$ `AC-ID` $ightarrow$ `TC-ID` theo Rule 14.
5. **Ghi tệp**:
   - Sử dụng template `_templates/43-test-cases.md` và lưu vào `docs/{feature}/test/test-cases.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] 100% Test Cases có mã định danh `TC-[MODULE]-[FEATURE]-[SEQ]` chuẩn mực.
- [ ] Từng bước thực hiện (Steps) và Dữ liệu thử nghiệm (Test Data) cụ thể, không nói chung chung "nhập dữ liệu hợp lệ".
- [ ] Kết quả mong đợi (Expected Results) đo lường được, có ghi rõ mã lỗi `ERR-` cho các ca negative.
- [ ] Có bảng Ma trận Truy vết (RTM) đối chiếu từ FR $ightarrow$ Story $ightarrow$ Test Case theo Rule 14.
- [ ] Phân loại rõ ràng Severity (Blocker/Critical/Major) và Priority (P0/P1/P2).
