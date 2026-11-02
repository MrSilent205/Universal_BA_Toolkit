---
name: test-checklist
description: "Lập Khung Kịch bản Kiểm thử & Điều kiện Thử nghiệm (QA Test Conditions Checklist): rà soát nhanh độ phủ trước khi viết test case chi tiết, thống nhất phạm vi kiểm thử giữa QA, BA và Dev"
metadata:
  phase: 07-testing
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /test-checklist — Khung Điều kiện Kiểm định Chất lượng (Test Conditions Checklist) [STANDARD WORKFLOW]

Xây dựng bản tóm tắt danh mục các điều kiện và kịch bản kiểm thử ở cấp độ tổng quan (High-level Test Conditions), giúp đội ngũ QA, BA và Lập trình viên nhanh chóng rà soát và thống nhất độ phủ kiểm thử (Test Coverage) trước khi đầu tư thời gian viết hàng trăm test case chi tiết.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng ngay sau khi chốt tài liệu SRS hoặc User Story AC, trong buổi họp 3 Amigos (BA - Dev - QA) trước khi bắt đầu sprint.
- **Đối tượng thụ hưởng**: QA Lead, Manual Testers, Automation Engineers, Product Owner.
- **Giá trị cốt lõi**: Tiết kiệm 70% thời gian so với việc viết ngay test case dài dòng; phát hiện sớm các kịch bản kiểm thử bị bỏ sót (ví dụ: test khi mất mạng giữa chừng, test khi concurrency cao, test trên thiết bị cấu hình yếu).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/test-checklist [tên_tính_năng] [đường_dẫn_tài_liệu_srs_hoặc_ac]`
- **Dữ liệu đầu vào cần có**:
  - Đặc tả yêu cầu SRS (`docs/{feature}/srs/spec.md`) hoặc kịch bản AC.
  - Ma trận lỗi (`rules/11-error-matrix-convention.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/08-gherkin-acceptance-criteria.md` — Ánh xạ kịch bản BDD vào checklist.
- `rules/11-error-matrix-convention.md` — Danh mục mã lỗi bắt buộc phải kiểm thử.
- `rules/14-test-case-traceability.md` — Ma trận truy vết yêu cầu RTM.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/42-test-checklist.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/test/test-conditions-checklist.md`

## Quy trình thực thi chi tiết
1. **Phân rã Kịch bản theo 6 Trục Kiểm thử Toàn diện**:
   - **Trục 1: Luồng Nghiệp vụ Chính (Functional & Happy Path)**: Các bước thao tác chuẩn mang lại kết quả mong đợi.
   - **Trục 2: Xác thực & Ràng buộc Dữ liệu (Validation & Field Constraints)**: Rỗng, min, max, ký tự đặc biệt, định dạng sai, trùng lặp.
   - **Trục 3: Quy tắc Nghiệp vụ Phức tạp (Business Rules & Exception Flows)**: Thử nghiệm vi phạm từng điều kiện `BR-xxx` và kiểm tra phản hồi `ERR-xxx`.
   - **Trục 4: Bảo mật & Phân quyền (Security & Access Control)**: Truy cập trái phép, hết hạn token, leo thang đặc quyền (IDOR), SQL injection.
   - **Trục 5: Tính Bất thường của Mạng & Thiết bị (Network & Device Resilience)**: Mất mạng đột ngột, mạng yếu (3G slow), chuyển đổi app sang background rồi quay lại, người dùng bấm nút back trình duyệt.
   - **Trục 6: Xung đột Dữ liệu Đồng thời (Concurrency & Race Conditions)**: 2 thiết bị cùng đăng nhập 1 tài khoản, 2 người cùng thanh toán 1 sản phẩm cuối cùng trong kho.
2. **Thiết lập Định dạng Bảng Rà soát Nhanh**:
   - Cột: `Mã Kịch bản` | `Nhóm Kiểm thử` | `Điều kiện Thử nghiệm` | `Kết quả Kỳ vọng Tóm tắt` | `Mã Quy tắc/Mã Lỗi Đối ứng` | `Độ ưu tiên (P0/P1/P2)`.
3. **Thẩm định & Ký duyệt Độ phủ (Sign-off Coverage)**:
   - Thống nhất các mục bắt buộc test trong sprint này (P0) và các mục dời sang Regression Test cuối đợt phát hành (P1, P2).
4. **Ghi tệp**:
   - Sử dụng template `_templates/42-test-checklist.md` và lưu vào `docs/{feature}/test/test-conditions-checklist.md`.
   - Đề xuất lệnh kế tiếp: `/test-cases` để sinh bộ test case chi tiết.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phủ kín đầy đủ 6 trục kiểm thử (Chức năng, Validation, BR/Ngoại lệ, Bảo mật, Mạng/Thiết bị, Concurrency).
- [ ] 100% các mã `BR-` và `ERR-` trong đặc tả đều có ít nhất một dòng kiểm thử tương ứng.
- [ ] Phân loại độ ưu tiên P0 (Chặn release nếu lỗi) / P1 (Quan trọng) / P2 (Phụ).
- [ ] Kết quả kỳ vọng được định nghĩa rõ ràng, không dùng từ ngữ định tính theo Rule 16.
