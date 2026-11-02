---
name: api-doc
description: "Soạn thảo Tài liệu API Kỹ thuật Chuẩn RESTful (API Documentation): đặc tả chi tiết Endpoints, HTTP Methods, Request Headers, Request Body, Responses 200/4xx/5xx và cURL mẫu"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-doc — Tài liệu Đặc tả Kỹ thuật API (API Documentation) [STANDARD WORKFLOW]

Soạn thảo tài liệu đặc tả API hoàn chỉnh dành cho lập trình viên, làm rõ từng tham số URL, headers, cấu trúc payload request, các mã phản hồi HTTP thành công và danh mục toàn bộ mã lỗi ngoại lệ kèm ví dụ cURL chạy được ngay.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi thiết kế API nội bộ cho Frontend/Mobile gọi, hoặc khi công bố Public API / Open API cho các đối tác bên ngoài tích hợp vào hệ thống của doanh nghiệp.
- **Đối tượng thụ hưởng**: Frontend Developers, Mobile Developers, Partner Integration Engineers, QA Engineers.
- **Giá trị cốt lõi**: Tạo tài liệu chính xác tuyệt đối, loại bỏ câu hỏi qua lại giữa frontend và backend; cung cấp sẵn dữ liệu mẫu (Mock Response) để frontend có thể lập trình song song mà không cần đợi backend code xong.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-doc [tên_endpoint_hoặc_phân_hệ] [mô_tả_nghiệp_vụ]`
- **Dữ liệu đầu vào cần có**:
  - Yêu cầu chức năng (`FR-xxx`) và hợp đồng API từ Rule 10.
  - Từ điển dữ liệu (`rules/09-data-dictionary-standard.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Mã lỗi phản hồi trong response body.
- `rules/10-api-contract-standards.md` — Chuẩn thiết kế URL, HTTP Verbs và envelope response JSON.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/36-api-doc.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/api-spec.md` (hoặc `docs/{feature}/api/endpoints/{endpoint_name}.md`)

## Quy trình thực thi chi tiết
1. **Quy ước Định tuyến & Tiêu chuẩn RESTful theo Rule 10**:
   - Sử dụng danh từ số nhiều cho tài nguyên: `/api/v1/orders`, `/api/v1/orders/{order_id}/items`.
   - Sử dụng đúng HTTP Method: `GET` (Đọc), `POST` (Tạo mới), `PUT` (Cập nhật toàn bộ), `PATCH` (Cập nhật 1 phần), `DELETE` (Xóa).
2. **Đặc tả Request Headers & Authentication**:
   - `Authorization: Bearer <jwt_access_token>`
   - `Content-Type: application/json`
   - `X-Idempotency-Key: <uuid_v4>` (Bắt buộc cho các tác vụ thanh toán hoặc trừ tiền).
   - `X-Client-Version: 2.1.0`
3. **Đặc tả Tham số Đầu vào (Parameters & Request Body)**:
   - *Path Parameters*: `{order_id}` (UUID v4).
   - *Query Parameters*: `page=1&limit=20&sort=created_at:desc&status=PAID`.
   - *Request Body*: Cấu trúc JSON kèm bảng giải thích từng trường (Kiểu dữ liệu, Bắt buộc/Tùy chọn, Ràng buộc validate min/max/regex).
4. **Đặc tả Cấu trúc Phản hồi Chuẩn Envelope JSON (Rule 10)**:
   - **Thành công (200 OK / 201 Created)**:
     ```json
     {
       "success": true,
       "data": { "id": "ord_123", "status": "PENDING_PAYMENT", "total_amount": 250000 },
       "error": null,
       "meta": { "timestamp": "2026-11-02T10:00:00Z" }
     }
     ```
   - **Thất bại (400, 401, 403, 404, 422, 500)**:
     ```json
     {
       "success": false,
       "data": null,
       "error": {
         "code": "ERR-ORD-422-01",
         "message": "Số lượng sản phẩm trong kho không đủ để đặt hàng",
         "details": [{ "field": "quantity", "issue": "Available stock is 2, requested 5" }]
       },
       "meta": { "timestamp": "2026-11-02T10:00:00Z" }
     }
     ```
5. **Cung cấp Lệnh cURL Hoàn chỉnh & Chạy được Ngay**:
   - Viết sẵn block `curl -X POST https://api.domain.com/v1/...` có đầy đủ headers và dummy data để dev có thể import trực tiếp vào Postman / Bruno.
6. **Ghi tệp**:
   - Sử dụng template `_templates/36-api-doc.md` và lưu vào `docs/{feature}/api/api-spec.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] URL tuân thủ nghiêm ngặt chuẩn RESTful danh từ số nhiều và phiên bản `/api/v1/`.
- [ ] Request body có bảng mô tả chi tiết từng trường: Data Type, Required, Validation Rules.
- [ ] Response Body tuân thủ chuẩn cấu trúc Envelope (`success`, `data`, `error`, `meta`).
- [ ] Phủ kín toàn bộ các mã HTTP lỗi phổ biến (400, 401, 403, 404, 409, 422, 500) kèm mã `ERR-`.
- [ ] Có lệnh cURL mẫu thực tế, có thể copy chạy kiểm tra ngay lập tức.
