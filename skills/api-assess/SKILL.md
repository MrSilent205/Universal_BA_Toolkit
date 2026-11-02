---
name: api-assess
description: "Thẩm định và đánh giá đối tác API bên thứ ba (Third-party API Feasibility Assessment): đối chiếu năng lực kỹ thuật, SLA cam kết, giới hạn Rate Limit, môi trường Sandbox, chi phí và bài toán Tự xây vs Mua ngoài (Build vs Buy)"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-assess — Đánh giá Khả thi & Thẩm định Đối tác API [STANDARD WORKFLOW]

Thực hiện quy trình thẩm định kỹ thuật toàn diện đối với các dịch vụ API bên thứ ba (Cổng thanh toán, Đơn vị vận chuyển, SMS Brandname, eKYC, Dịch vụ AI/LLM), cung cấp căn cứ ra quyết định lựa chọn đối tác tối ưu cho doanh nghiệp.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi dự án cần tích hợp dịch vụ bên ngoài, cần so sánh giữa 2-3 nhà cung cấp hoặc phân vân giữa việc tự lập trình (Build) hay sử dụng giải pháp có sẵn (Buy).
- **Đối tượng thụ hưởng**: CTO, Lead Architect, Product Owner, Procurement Team, Lead BA.
- **Giá trị cốt lõi**: Tránh rủi ro chọn nhầm đối tác có API chập chờn, tài liệu sơ sài hoặc chính sách chi phí ẩn; đảm bảo đối tác đáp ứng đầy đủ các tiêu chuẩn bảo mật và SLA của doanh nghiệp.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-assess [tên_dịch_vụ_hoặc_đối_tác] [tài_liệu_api_url_hoặc_file]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu kỹ thuật API của nhà cung cấp (API Docs URL, Postman Collection, Swagger/OpenAPI).
  - Yêu cầu NFR của hệ thống (lượng tải TPS dự kiến, ngân sách hàng tháng).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/04-nfr-standards.md` — Chuẩn bảo mật TLS 1.3 và cam kết thời gian đáp ứng SLA.
- `rules/10-api-contract-standards.md` — Tiêu chuẩn hợp đồng RESTful API.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/35-api-assess.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/vendor-assessment.md`

## Quy trình thực thi chi tiết
1. **Khảo sát Năng lực Kỹ thuật Cốt lõi (Technical Capability Audit)**:
   - Đánh giá kiến trúc API: Chuẩn RESTful, GraphQL hay SOAP XML cũ kỹ?
   - Phương thức xác thực: OAuth 2.0, API Key, HMAC-SHA256 Signature hay Mutual TLS (mTLS)?
   - Định dạng payload: JSON hay XML? Có hỗ trợ Webhook bất đồng bộ khi xử lý tác vụ lâu không?
2. **Kiểm tra Môi trường Thử nghiệm & Tài liệu (Developer Experience - DX)**:
   - Có môi trường Sandbox/Staging tách biệt hoàn toàn với Production không?
   - Có sẵn tài khoản test, thẻ test, số điện thoại ảo để test tự động không?
   - Tài liệu API có đầy đủ mã lỗi (Error Codes) và curl mẫu chạy được ngay không? Có sẵn SDK (Node.js, Python, Java, Go) không?
3. **Đánh giá Cam kết Vận hành & Giới hạn Tải (SLA & Rate Limits)**:
   - Cam kết Uptime hàng tháng: 99.9% hay 99.99%? Có chính sách bồi thường khi sập hệ thống (SLA Credits) không?
   - Giới hạn tải (Rate Limiting): Bao nhiêu requests/giây (RPS) hoặc requests/phút (RPM)? Khi vượt ngưỡng trả về mã 429 hay ngắt kết nối đột ngột?
   - Thời gian phản hồi trung bình (P95 Latency): Có dưới 1.000ms không?
4. **Phân tích Bài toán Chi phí (Cost & Pricing Model)**:
   - Mô hình tính giá: Theo lượt gọi (Pay-as-you-go), theo gói tháng (Tiered), hay phần trăm giá trị giao dịch (% transaction)?
   - Chi phí ẩn: Phí khởi tạo ban đầu (Setup fee), phí duy trì tối thiểu hàng tháng (Minimum commitment)?
5. **Đưa ra Ma trận So sánh & Kết luận Đề xuất (Recommendation Matrix)**:
   - Lập bảng chấm điểm (Scorecard) từ 1 đến 5 sao theo các tiêu chí: Bảo mật, Ổn định, Giá cả, Hỗ trợ kỹ thuật.
   - Kết luận rõ ràng: CHỌN ĐỐI TÁC NÀO kèm phương án dự phòng (Fallback Vendor) khi gặp sự cố.
6. **Ghi tệp**:
   - Sử dụng template `_templates/35-api-assess.md` và lưu vào `docs/{feature}/api/vendor-assessment.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bảng đánh giá chi tiết cả 5 khía cạnh: Kỹ thuật, Môi trường test, SLA/Rate Limit, Chi phí, Hỗ trợ.
- [ ] So sánh đối chiếu tối thiểu 2 đối tác cạnh tranh hoặc so sánh phương án Build vs Buy.
- [ ] Xác minh tính sẵn sàng của môi trường Sandbox và dữ liệu mẫu kiểm thử.
- [ ] Có phương án xử lý dự phòng (Fallback / Circuit Breaker) khi dịch vụ đối tác gặp sự cố.
