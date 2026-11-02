# Biên Bản Cuộc Họp Nghiệp Vụ & Quyết Định (Meeting Minutes & Requirements Log)

> **Mã biên bản:** `MOM-[PROJECT_CODE]-[YYYYMMDD]`  
> **Chủ đề cuộc họp:** [Tên chủ đề / Workshop lấy yêu cầu / Thẩm định giải pháp]  
> **Thời gian:** [HH:mm] - [HH:mm], Ngày [DD/MM/YYYY]  
> **Hình thức:** [Trực tiếp tại Phòng họp X / Online qua MS Teams / Google Meet]  
> **Người chủ trì (Facilitator):** [Họ tên - Lead BA] | **Người ghi biên bản (Note Taker):** [Họ tên - BA]

---

## 1. Thành Phần Tham Dự (Attendees)
| STT | Họ và Tên | Vai Trò / Bộ Phận | Trạng Thái Tham Gia |
| :---: | :--- | :--- | :---: |
| 1 | [Nguyễn Văn A] | Product Owner (PO) / Khách hàng | Có mặt |
| 2 | [Trần Thị B] | Lead Business Analyst | Có mặt |
| 3 | [Lê Văn C] | Technical Architect / Tech Lead | Có mặt |
| 4 | [Phạm Văn D] | QA Lead | Có mặt |
| 5 | [Hoàng Thị E] | Đại diện nghiệp vụ Kế toán / Vận hành | Có mặt |

---

## 2. Mục Tiêu & Chương Trình Nghị Sự (Agenda)
1. Thống nhất luồng thanh toán và cơ chế đối soát tự động giữa hệ thống và đối tác ngân hàng.
2. Giải quyết xung đột quy tắc nghiệp vụ về chính sách hủy đơn và hoàn tiền.
3. Rà soát tiến độ triển khai các yêu cầu thay đổi (CR) trong Sprint hiện tại.

---

## 3. Nội Dung Thảo Luận Chi Tiết (Key Discussion Points)

### Điểm 1: Quy trình đối soát thanh toán định kỳ
- Đại diện Kế toán đề xuất hệ thống phải tự động đối soát vào 23:59 hàng ngày thay vì thủ công tải file CSV.
- Tech Lead xác nhận cổng thanh toán đã có sẵn API Reconciliation. Đội ngũ kỹ thuật có thể xây dựng Cronjob tự động chạy hàng đêm.
- Lead BA đề xuất bổ sung màn hình 'Lịch sử đối soát' để kế toán có thể kiểm tra danh sách chênh lệch và kích hoạt chạy lại khi cần.

### Điểm 2: Xử lý đơn hàng khách hủy khi tiền đã vào tài khoản
- PO yêu cầu hoàn tiền tự động 100% nếu khách hủy trước khi đơn chuyển sang 'Đang xử lý'.
- Nghiệp vụ Vận hành lưu ý: Phí xử lý giao dịch qua cổng (1.5%) bên nào sẽ chịu?
- Thống nhất: Doanh nghiệp chịu phí hoàn tiền này để nâng cao trải nghiệm khách hàng.

---

## 4. Nhật Ký Quyết Định Nghiệp Vụ (Decisions Log)
*(Mọi quyết định tại cuộc họp đều mang tính ràng buộc pháp lý kỹ thuật và được dùng làm căn cứ cập nhật SRS)*

| Mã Quyết Định (DEC-ID) | Nội Dung Quyết Định | Căn Cứ / Lý Do (Rationale) | Các Bên Thống Nhất | Tác Động Tài Liệu |
| :---: | :--- | :--- | :---: | :---: |
| `DEC-ORD-01` | Áp dụng chính sách hoàn tiền 100% tự động qua cổng thanh toán gốc nếu đơn hủy trước 15 phút. | Tối ưu trải nghiệm khách hàng, giảm tải 80% ticket hỗ trợ thủ công. | PO, Kế toán, Tech Lead | Cập nhật `BR-ORD-05` và `SRS-ORD-02`. |
| `DEC-PAY-02` | Tần suất đối soát thanh toán tự động: Chạy mỗi ngày vào lúc 01:00 sáng. | Tránh giờ cao điểm giao dịch, đảm bảo số liệu ngân hàng đã chốt ngày làm việc. | Kế toán, Tech Lead, BA | Cập nhật `RULE-04` (NFR Job Schedule). |
| `DEC-SEC-03` | Bắt buộc xác thực sinh trắc học hoặc OTP SMS đối với giao dịch chuyển tiền trên 20.000.000 VNĐ. | Tuân thủ Quyết định 2345/QĐ-NHNN về an toàn thanh toán trực tuyến. | Legal, Security, PO | Cập nhật `RULE-17` và `FR-SEC-04`. |

---

## 5. Vấn Đề Tồn Đọng & Cần Làm Rõ Thêm (Open Issues / Parking Lot)
| Mã Vấn Đề | Mô Tả Vấn Đề Chưa Thống Nhất | Người Chịu Trách Nhiệm | Hạn Chót Giải Quyết | Ghi Chú |
| :---: | :--- | :---: | :---: | :--- |
| `ISSUE-01` | Chưa chốt được mức phí vận chuyển áp dụng cho các khu vực vùng sâu vùng xa / hải đảo. | Đại diện Vận hành | [YYYY-MM-DD] | Đang chờ đơn vị vận chuyển Viettel Post báo giá mới. |
| `ISSUE-02` | Có cần lưu trữ ảnh chứng từ giao dịch trên hệ thống quá 5 năm theo luật kế toán? | Đội Pháp chế & DBA | [YYYY-MM-DD] | Cần cân đối chi phí lưu trữ Cloud S3 Cold Storage. |

---

## 6. Kế Hoạch Hành Động (Action Items & Next Steps)

| STT | Mã Công Việc | Nội Dung Hành Động Cụ Thể | Người Thực Hiện | Người Hỗ Trợ | Hạn Hoàn Thành | Trạng Thái |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: |
| 1 | `ACT-01` | Cập nhật tài liệu SRS v1.2 theo các quyết định `DEC-ORD-01` và `DEC-PAY-02` | [Lead BA] | [BA Team] | [YYYY-MM-DD] | [In Progress] |
| 2 | `ACT-02` | Thiết kế Wireframe chi tiết màn hình Quản lý đối soát và phân quyền Kế toán | [UI/UX Designer] | [Lead BA] | [YYYY-MM-DD] | [Open] |
| 3 | `ACT-03` | Nghiên cứu API Refund của cổng VNPay và gửi tài liệu kỹ thuật cho BA | [Tech Lead] | [Backend Dev] | [YYYY-MM-DD] | [In Progress] |
| 4 | `ACT-04` | Làm việc với đối tác Logistics để chốt bảng giá cước vùng sâu vùng xa (`ISSUE-01`) | [Vận Hành] | [PO] | [YYYY-MM-DD] | [Open] |

---

## 7. Phê Duyệt Biên Bản (Approval Sign-off)
Biên bản này được gửi cho toàn bộ người tham dự qua email trong vòng 24 giờ sau cuộc họp. Nếu không có phản hồi khiếu nại trong 48 giờ, nội dung biên bản tự động được xem là đã phê duyệt chính thức.

- **Chủ trì cuộc họp:** [Họ tên & Chữ ký] | **Ngày:** [YYYY-MM-DD]  
- **Product Owner:** [Họ tên & Chữ ký] | **Ngày:** [YYYY-MM-DD]
