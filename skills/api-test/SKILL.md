---
name: api-test
description: "Khởi tạo Bộ sưu tập Kiểm thử API Tự động bằng Bruno (Bruno API Collection .bru): cấu trúc thư mục, biến môi trường (Environment Variables), script assertions kiểm tra HTTP code và chuỗi request tự động"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-test — Bộ Sưu tập Kiểm thử API Bruno (.bru Collection) [STANDARD WORKFLOW]

Khởi tạo bộ sưu tập kiểm thử API mã nguồn mở dạng tệp thuần văn bản (`.bru`) tương thích 100% với công cụ Bruno API Client, quản lý trực tiếp trong Git repository, hỗ trợ chạy kiểm thử tự động trong CI/CD pipeline bằng `@usebruno/cli`.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Thay thế cho các file Postman Collection JSON cồng kềnh, dễ bị conflict git khi làm việc nhóm; cung cấp bộ test API chạy được ngay cho toàn bộ đội ngũ lập trình và kiểm thử.
- **Đối tượng thụ hưởng**: QA Automation Engineers, Backend Developers, DevOps/CI-CD Engineers.
- **Giá trị cốt lõi**: Lưu trữ kiểm thử API dạng code (Test-as-Code) trực tiếp bên cạnh mã nguồn dự án; không phụ thuộc cloud trả phí của Postman; dễ dàng tự động hóa chạy test trong GitHub Actions.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-test [tên_phân_hệ] [đường_dẫn_api_spec]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả API (`docs/{feature}/api/api-spec.md`).
  - Thông tin môi trường: URL Base, Client ID, Secret Key.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/03-err-naming-convention.md` — Assertions kiểm tra mã lỗi ERR.
- `rules/10-api-contract-standards.md` — Chuẩn cấu trúc RESTful envelope.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/40-api-test-bruno.bru`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/bruno/{request_name}.bru` (hoặc `tests/api/bruno/{feature}/`)

## Quy trình thực thi chi tiết
1. **Cấu hình Môi trường Kiểm thử (Bruno Environment Config)**:
   - Tạo file biến môi trường `environments/local.bru`, `environments/staging.bru`:
     ```bru
     vars {
       baseUrl: https://staging-api.domain.com/v1
       jwtToken: 
       testOrderId: 
     }
     ```
2. **Soạn thảo Kịch bản Request Bằng Định dạng Chuẩn Bruno (`.bru`)**:
   - Định nghĩa metadata, URL và HTTP Method:
     ```bru
     meta {
       name: Tạo đơn hàng mới - Happy Path
       type: http
       seq: 1
     }

     post {
       url: {{baseUrl}}/orders
       body: json
       auth: bearer
     }

     auth:bearer {
       token: {{jwtToken}}
     }
     ```
3. **Khai báo Headers & Request Body JSON**:
   - Thêm headers an toàn: `Content-Type`, `X-Idempotency-Key: {{idempotencyKey}}`.
   - Body dữ liệu mẫu bám sát kịch bản Happy Path hoặc Negative Path.
4. **Cài đặt Kịch bản Kiểm tra Tự động (Tests & Assertions)**:
   - Viết các câu assertion kiểm tra HTTP code và cấu trúc envelope:
     ```bru
     tests {
       test("Status code phải là 201 Created", function() {
         expect(res.getStatus()).to.equal(201);
       });

       test("Response phải có success = true và mã đơn hàng", function() {
         const data = res.getBody();
         expect(data.success).to.be.true;
         expect(data.data.id).to.be.a('string');
         bru.setVar("testOrderId", data.data.id); // Lưu biến dùng cho request kế tiếp
       });
     }
     ```
5. **Tạo Chuỗi Kịch bản Kiểm thử Toàn trình (Chained Workflow)**:
   - Sequence 1: Đăng nhập lấy Bearer Token $ightarrow$ Tự động lưu `jwtToken`.
   - Sequence 2: Tạo đơn hàng mới $ightarrow$ Lưu `testOrderId`.
   - Sequence 3: Gọi API Thanh toán đơn hàng với `testOrderId`.
   - Sequence 4: Tra cứu trạng thái đơn hàng xác nhận `status === "PAID"`.
6. **Ghi tệp**:
   - Sử dụng template `_templates/40-api-test-bruno.bru` và lưu vào `docs/{feature}/api/bruno/{request_name}.bru`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Cú pháp file `.bru` chuẩn xác, mở và chạy được mượt mà trên ứng dụng Bruno Client.
- [ ] Tách biệt biến môi trường (baseUrl, tokens) ra khỏi tệp request.
- [ ] Có đầy đủ các câu lệnh Assertions kiểm tra cả HTTP Status, success flag và data payload.
- [ ] Có cơ chế truyền dữ liệu nối tiếp (Chaining Variables) giữa các request trong luồng.
- [ ] Sẵn sàng tích hợp chạy tự động qua CLI bằng lệnh `bru run`.
