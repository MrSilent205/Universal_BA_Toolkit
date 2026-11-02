# Quy Chuẩn Định Nghĩa Yêu Cầu Phi Chức Năng (NFR Standards - ISO/IEC 25010)

> **Mã quy tắc:** `RULE-04`  
> **Áp dụng cho:** Tất cả tài liệu SRS, URD, Architecture Spec và Test Checklist.

---

## 1. Nguyên Tắc Định Lượng Yêu Cầu Phi Chức Năng (NFR)
Mọi yêu cầu phi chức năng (Non-Functional Requirements - NFR) **bắt buộc phải đo lường được bằng số liệu cụ thể (Measurable Metrics)**, tuyệt đối không sử dụng các tính từ cảm tính như *"hệ thống phải nhanh"*, *"bảo mật cao"*, *"giao diện thân thiện"*.

### Công thức chuẩn cho 1 câu đặc tả NFR:
$$\text{Khi } [\text{Điều kiện tải/Môi trường}] \rightarrow \text{Hệ thống phải đạt } [\text{Chỉ số định lượng}] \text{ đo lường bằng } [\text{Công cụ/Phương pháp}]$$

---

## 2. Phân Loại 8 Đặc Tính Chất Lượng Theo ISO/IEC 25010

```
+--------------------------------------------------------------------------+
|                     ISO/IEC 25010 QUALITY IN USE MODEL                   |
+--------------------------------------------------------------------------+
| 1. Performance Efficiency  | 2. Reliability            | 3. Security     |
| 4. Usability               | 5. Maintainability        | 6. Compatibility|
| 7. Scalability & Capacity  | 8. Compliance & Audit     |                 |
+--------------------------------------------------------------------------+
```

| Nhóm Đặc Tính | Tiêu Chí Đánh Giá (Metric) | Ngưỡng Tiêu Chuẩn Doanh Nghiệp (Benchmark) | Phương Pháp Kiểm Chứng |
| :--- | :--- | :--- | :--- |
| **1. Hiệu Năng (Performance)** | - Thời gian phản hồi API (Response Time p95)<br>- Thời gian tải trang (LCP - Largest Contentful Paint)<br>- Thông lượng xử lý (Throughput) | - API Read: $\le 300\text{ ms}$; API Write: $\le 800\text{ ms}$<br>- LCP Web: $\le 2.5\text{ s}$<br>- Tối thiểu $500\text{ requests/giây (RPS)}$ | K6, Apache JMeter, Lighthouse |
| **2. Độ Tin Cậy & Sẵn Sàng (Reliability)** | - Thời gian hoạt động liên tục (Uptime SLA)<br>- Thời gian phục hồi sau sự cố (MTTR)<br>- Điểm khôi phục dữ liệu tối đa (RPO) | - SLA $\ge 99.9\%$ (Downtime $\le 8.76\text{ giờ/năm}$)<br>- MTTR $\le 30\text{ phút}$<br>- RPO $\le 5\text{ phút}$ (Mất mát dữ liệu tối đa) | Datadog, Prometheus, Chaos Engineering |
| **3. An Toàn & Bảo Mật (Security)** | - Mã hóa dữ liệu tĩnh (At-Rest) & truyền tải (In-Transit)<br>- Kiểm soát xác thực & phiên<br>- Tiêu chuẩn an toàn ứng dụng | - TLS 1.3 cho đường truyền, AES-256 cho DB<br>- Khóa tài khoản sau 5 lần nhập sai; JWT hết hạn 15p<br>- Không có lỗ hổng Critical/High trong OWASP Top 10 | SonarQube, OWASP ZAP, Pentest Report |
| **4. Khả Năng Sử Dụng (Usability)** | - Tỷ lệ hoàn thành tác vụ lần đầu (Task Success Rate)<br>- Tiêu chuẩn tiếp cận (Accessibility)<br>- Số bước thực hiện thao tác cốt lõi | - Task Success $\ge 90\%$ không cần hỗ trợ<br>- Đạt tiêu chuẩn WCAG 2.1 Level AA<br>- Hoàn tất thanh toán $\le 3\text{ bước}$ | Usability Testing, Google Lighthouse a11y |
| **5. Khả Năng Tương Thích (Compatibility)** | - Trình duyệt hỗ trợ (Browsers)<br>- Độ phân giải màn hình (Responsive Viewports)<br>- Hệ điều hành di động | - Chrome, Edge, Safari, Firefox (2 phiên bản gần nhất)<br>- Desktop (1440px), Tablet (768px), Mobile (375px)<br>- iOS 15+ và Android 11+ | BrowserStack, Playwright Cross-browser |
| **6. Khả Năng Mở Rộng (Scalability)** | - Khả năng chịu tải đồng thời (Concurrent Users)<br>- Tự động co giãn hạ tầng (Auto-scaling) | - Đáp ứng tối thiểu $10.000\text{ CCU}$ cùng thời điểm<br>- Tự động scale pod Kubernetes khi CPU $\ge 70\%$ trong 2p | Stress Testing, Locust |
| **7. Khả Năng Bảo Trì (Maintainability)** | - Mức độ bao phủ mã kiểm thử (Code Coverage)<br>- Thời gian triển khai bản vá (Deploy time) | - Unit Test Coverage $\ge 80\%$; Integration $\ge 70\%$<br>- CI/CD Pipeline build & deploy hoàn tất $\le 15\text{ phút}$ | SonarQube, GitHub Actions |
| **8. Tuân Thủ & Pháp Lý (Compliance)** | - Lưu vết kiểm toán (Audit Trail)<br>- Tuân thủ bảo vệ dữ liệu cá nhân | - Lưu log 100% thay đổi dữ liệu tài chính trong $\ge 5\text{ năm}$<br>- Tuân thủ Nghị định 13/2023/NĐ-CP và PCI-DSS | Audit Log Inspector, Legal Review |

---

## 3. Quy Ước Đặt Mã NFR
- Cú pháp: `NFR-[NHÓM]-[SEQ]`
- Ví dụ:
  - `NFR-PERF-01`: Thời gian phản hồi API tìm kiếm sản phẩm.
  - `NFR-SEC-01`: Mã hóa mật khẩu người dùng bằng bcrypt (cost factor = 12).
  - `NFR-AVAIL-01`: Hệ thống cam kết Uptime 99.95% trong giờ cao điểm.
  - `NFR-COMP-01`: Giao diện tương thích hoàn toàn trên iPhone SE (375px).
