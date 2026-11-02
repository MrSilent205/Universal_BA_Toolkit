---
name: api-checklist
description: "Soạn thảo Checklist Kiểm định Toàn diện Tích hợp API (API QA & Integration Checklist): rà soát bảo mật xác thực, rate limiting, kiểm tra payload lỗi, idempotency, phân trang và xử lý webhook"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-checklist — Danh mục Kiểm định Chất lượng Tích hợp API [STANDARD WORKFLOW]

Xây dựng bộ checklist kiểm tra chuyên sâu dành cho QA và Developers trước khi ký biên bản nghiệm thu tích hợp API, bao phủ toàn bộ các góc độ kỹ thuật từ bảo mật, kiểm soát lỗi, tính toàn vẹn dữ liệu cho đến giới hạn chịu tải.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trong giai đoạn Integration Testing trước khi tiến hành Audit Go-Live, nhằm phát hiện sớm các lỗ hổng bảo mật hoặc lỗi nghẽn luồng.
- **Đối tượng thụ hưởng**: QA Engineers, Security Auditors, Backend Developers, Technical BA.
- **Giá trị cốt lõi**: Ngăn ngừa 99% các sự cố phổ biến khi tích hợp API (token hết hạn không tự refresh, người dùng click đúp bị trừ tiền 2 lần, payload quá lớn làm sập RAM server, webhook bị spam gây DoS).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-checklist [tên_api_hoặc_phân_hệ]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả API (`docs/{feature}/api/api-spec.md`).
  - Thiết kế tích hợp (`docs/{feature}/api/integration-design.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Kiểm tra mã lỗi trả về.
- `rules/04-nfr-standards.md` — Chuẩn bảo mật TLS 1.3 và kiểm soát tải.
- `rules/10-api-contract-standards.md` — Tiêu chuẩn RESTful và envelope response.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/39-api-checklist.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/test-checklist.md`

## Quy trình thực thi chi tiết
1. **Nhóm 1: Xác thực & Phân quyền (Authentication & Authorization)**:
   - [ ] Kiểm tra khi thiếu Header `Authorization` $
ightarrow$ Trả về đúng `401 Unauthorized`.
   - [ ] Kiểm tra Token sai chữ ký hoặc bị sửa đổi $
ightarrow$ Trả về `401 Unauthorized`.
   - [ ] Kiểm tra Token đã hết hạn $
ightarrow$ Trả về `401 Unauthorized` kèm mã `ERR-AUTH-401-01`.
   - [ ] Kiểm tra User A truy cập tài nguyên của User B (lỗ hổng IDOR) $
ightarrow$ Trả về đúng `403 Forbidden`.
2. **Nhóm 2: Kiểm tra Ràng buộc Dữ liệu Đầu vào (Payload Validation)**:
   - [ ] Gửi body rỗng `{}` $
ightarrow$ Báo lỗi `422 Unprocessable Entity` chỉ rõ các trường thiếu.
   - [ ] Gửi kiểu dữ liệu sai (string vào trường int, string vào boolean) $
ightarrow$ Báo `422`.
   - [ ] Gửi chuỗi vượt quá độ dài tối đa (ví dụ string 10.000 ký tự) $
ightarrow$ Chặn an toàn, không bị tràn bộ nhớ.
   - [ ] Thử nghiệm chèn SQL Injection và XSS Payload $
ightarrow$ Sanitized an toàn.
3. **Nhóm 3: Tính Bất biến & Chống Trùng lặp (Idempotency & Concurrency)**:
   - [ ] Gửi 2 request thanh toán đồng thời (trong cùng 1 millisecond) với cùng `Idempotency-Key` $
ightarrow$ Chỉ xử lý duy nhất 1 giao dịch, request thứ 2 trả về 409 hoặc kết quả cache.
   - [ ] Gửi lại request đã thành công với cùng key $
ightarrow$ Trả về đúng kết quả cũ, không tạo đơn mới.
4. **Nhóm 4: Giới hạn Tải & Phân trang (Rate Limiting & Pagination)**:
   - [ ] Bắn spam 100 requests liên tục $
ightarrow$ Kích hoạt Rate Limit, trả về đúng `429 Too Many Requests` kèm header `Retry-After`.
   - [ ] Kiểm tra phân trang: Query `page=1&limit=20` trả về đúng 20 bản ghi kèm object `meta` chứa `total`, `page`, `limit`.
   - [ ] Query `limit=100000` $
ightarrow$ Hệ thống tự động giới hạn về max limit an toàn (ví dụ 100).
5. **Nhóm 5: Cơ chế Webhook & Khả năng Phục hồi (Webhook & Resilience)**:
   - [ ] Kiểm tra tính hợp lệ của chữ ký Webhook HMAC trước khi xử lý.
   - [ ] Giả lập endpoint Webhook phản hồi 500 $
ightarrow$ Server có kích hoạt cơ chế retry theo đúng Exponential Backoff không?
6. **Ghi tệp**:
   - Sử dụng template `_templates/39-api-checklist.md` và lưu vào `docs/{feature}/api/test-checklist.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bảng checklist phân chia rõ ràng theo 5 nhóm kiểm thử kỹ thuật cốt lõi.
- [ ] Từng tiêu chí kiểm thử có kịch bản đầu vào rõ ràng và kết quả HTTP status code mong đợi.
- [ ] Có kịch bản kiểm tra an toàn bảo mật (IDOR, SQL Injection, XSS).
- [ ] Có kịch bản kiểm tra tính toàn vẹn dữ liệu (Idempotency & Concurrent race condition).
