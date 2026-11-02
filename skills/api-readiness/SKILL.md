---
name: api-readiness
description: "Cổng Kiểm định Mức độ Sẵn sàng Lên Production của API (API Production Readiness Audit): rà soát chứng chỉ SSL/TLS, IP Whitelisting, giám sát Alerting, Circuit Breaker và kế hoạch ứng phó sự cố"
metadata:
  phase: 06-api-integration
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /api-readiness — Cổng Kiểm định Sẵn sàng Production (API Production Gate) [STANDARD WORKFLOW]

Thực hiện quy trình kiểm tra điều kiện nghiêm ngặt tại cổng Go-Live (Readiness Gate) đối với toàn bộ các giao diện API trước khi chính thức mở kết nối cho người dùng cuối hoặc đối tác thật trên môi trường Production.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc kích hoạt trước ngày phát hành chính thức 3-5 ngày làm việc; dùng trong buổi họp "Go/No-Go Decision" giữa Ban Dự án, Đội Kỹ thuật và Vận hành.
- **Đối tượng thụ hưởng**: Release Manager, DevOps Lead, Security Lead, Product Owner, CTO.
- **Giá trị cốt lõi**: Ngăn chặn thảm họa sập hệ thống vào ngày ra mắt; đảm bảo mọi yếu tố bảo mật, chìa khóa API, cơ chế giám sát và kịch bản ứng cứu sự cố đều đã ở trạng thái sẵn sàng chiến đấu 100%.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/api-readiness [tên_dự_án_hoặc_phân_hệ]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ hồ sơ API: API Docs, Checklist QA, Báo cáo kiểm thử tải (Load Test Report).
  - Cấu hình hạ tầng môi trường Production.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/04-nfr-standards.md` — Cam kết SLA, chuẩn bảo mật TLS 1.3 và RPO/RTO.
- `rules/10-api-contract-standards.md` — Tính ổn định của hợp đồng API.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/41-api-readiness.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/api/production-readiness.md`

## Quy trình thực thi chi tiết
1. **Kiểm tra Điều kiện Tiên quyết về Bảo mật (Security Readiness Gate)**:
   - [ ] Chứng chỉ SSL/TLS: Bắt buộc TLS 1.3, chứng chỉ hợp lệ từ CA uy tín, không dùng tự ký (Self-signed).
   - [ ] Quản lý Bí mật (Secret Management): Toàn bộ API Keys, Client Secret, Private Keys được lưu trong Vault / AWS Secrets Manager / K8s Secrets, tuyệt đối không hardcode trong mã nguồn.
   - [ ] Danh sách IP tin cậy (IP Whitelisting): Đã cấu hình tường lửa chỉ mở port cho dải IP tĩnh của đối tác nếu áp dụng mô hình B2B.
2. **Kiểm tra Mức độ Chịu tải & Giới hạn Tài nguyên (Performance & Capacity Gate)**:
   - [ ] Báo cáo Kiểm thử Tải (Load Testing): Hệ thống đã vượt qua bài test tải cao điểm tối thiểu 1.5x TPS thiết kế với P95 latency < 500ms.
   - [ ] Cấu hình Auto-scaling: Cụm pods/containers đã cấu hình tự động mở rộng khi CPU > 70% hoặc RAM > 80%.
   - [ ] Database Connection Pool: Cấu hình đủ pool size, không bị cạn kiệt kết nối khi tải tăng đột biến.
3. **Cơ chế Chống Đổ vỡ Dây chuyền (Circuit Breaker & Resilience Gate)**:
   - [ ] Đã cài đặt Circuit Breaker pattern (Resilience4j, Envoy, Istio) ngắt kết nối tạm thời khi dịch vụ bên thứ ba bị sập quá 50% số request, không để treo luồng hệ thống.
   - [ ] Có phương án hiển thị thông báo lỗi lịch sự cho người dùng khi đối tác bảo trì.
4. **Hệ thống Giám sát & Cảnh báo Tức thì (Monitoring, Logging & Alerting)**:
   - [ ] Tập trung hóa log (Centralized Logging - ELK / Datadog / Grafana Loki) có gắn mã `correlation_id` xuyên suốt các dịch vụ.
   - [ ] Kênh thông báo khẩn cấp: Tự động bắn cảnh báo qua Slack / Telegram / PagerDuty khi tỷ lệ lỗi HTTP 5xx vượt quá 1% trong 5 phút.
5. **Kế hoạch Rollback & Ứng phó Sự cố (Rollback & Incident Playbook)**:
   - [ ] Quy trình quay lui (Rollback Procedure) được viết sẵn: Thời gian rollback tối đa < 15 phút.
   - [ ] Có danh sách phân công nhân sự ứng trực ca đêm (On-call Schedule) trong tuần đầu tiên Go-Live.
6. **Đưa ra Quyết định Đóng Cổng (Sign-off & Recommendation)**:
   - Đánh giá tổng thể: **GO** (Sẵn sàng 100%), **CONDITIONAL GO** (Thiếu tiêu chí phụ, có thể go-live kèm điều kiện khắc phục trong 24h), hoặc **NO-GO** (Chặn khẩn cấp vì có lỗ hổng nghiêm trọng).
   - Sử dụng template `_templates/41-api-readiness.md` và lưu vào `docs/{feature}/api/production-readiness.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Rà soát đầy đủ 5 trụ cột: Bảo mật, Hiệu năng chịu tải, Circuit Breaker, Giám sát Alerting, Kế hoạch Rollback.
- [ ] Chứng minh được kết quả kiểm thử tải thực tế đạt chuẩn SLA theo Rule 04.
- [ ] Xác nhận không còn bất kỳ secret/khóa API nào bị lộ trong code hoặc file cấu hình công khai.
- [ ] Có danh sách số điện thoại/kênh liên lạc của đội ngũ On-call sẵn sàng ứng cứu.
- [ ] Có chữ ký phê duyệt (Sign-off) của các trưởng bộ phận liên quan (Tech Lead, QA Lead, Security, PO).
