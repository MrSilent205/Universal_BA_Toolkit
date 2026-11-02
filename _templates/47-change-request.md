# Phiếu Yêu Cầu Thay Đổi (Change Request - CR)

> **Mã CR:** `CR-[PROJECT_CODE]-[NUM]` (Tuân thủ `RULE-15`)  
> **Tên yêu cầu thay đổi:** [Tên ngắn gọn, rõ ràng của yêu cầu thay đổi]  
> **Người đề xuất:** [Họ và tên / Vai trò / Đơn vị yêu cầu] | **Ngày yêu cầu:** [YYYY-MM-DD]  
> **Tài liệu tham chiếu gốc:** SRS: `[SRS-ID]`, User Story: `[US-ID]`, Module: `[Tên Module]`  
> **Mức độ ưu tiên đề xuất:** [Khẩn cấp (Critical) / Cao (High) / Trung bình (Medium) / Thấp (Low)]

---

## 1. Lý Do & Bối Cảnh Thay Đổi (Reason for Change)
- **Vấn đề / Nhu cầu thực tế:**  
  [Mô tả chi tiết nguyên nhân phát sinh thay đổi: do thay đổi quy định pháp luật, đối tác thay đổi API, người dùng phản hồi khó sử dụng, hay chiến lược kinh doanh mới].
- **Mục tiêu của sự thay đổi:**  
  [Mục tiêu cụ thể cần đạt được sau khi triển khai thay đổi này].

---

## 2. Mô Tả Nội Dung Thay Đổi (Change Specification)

### 2.1 So sánh Hiện Trạng (As-Is) vs Mục Tiêu Mới (To-Be)
| Hạng Mục | Hiện Trạng Đã Duyệt (As-Is Baseline) | Đề Xuất Thay Đổi Mới (To-Be Proposal) | Lý Do Điều Chỉnh |
| :--- | :--- | :--- | :--- |
| **Quy trình nghiệp vụ** | [Khách hàng phải thanh toán 100% trước khi giao hàng] | [Cho phép đặt cọc 30%, phần còn lại thanh toán COD khi nhận hàng] | Tăng tỷ lệ chuyển đổi đơn hàng giá trị cao |
| **Giao diện người dùng** | [Chỉ có nút 'Thanh toán toàn bộ'] | [Thêm tùy chọn radio: 'Thanh toán 100%' hoặc 'Đặt cọc 30%'] | Cung cấp lựa chọn linh hoạt cho khách hàng |
| **Dữ liệu & Bảng DB** | [Bảng `orders` chỉ có 1 trường `paid_amount`] | [Thêm trường `deposit_amount`, `remaining_amount`, `payment_mode`] | Lưu vết chi tiết từng đợt thanh toán |
| **API Backend** | `POST /api/v1/orders` nhận 1 transaction ID | Nhận thêm `payment_stage: ['FULL', 'DEPOSIT', 'FINAL']` | Hỗ trợ ghi nhận nhiều lượt thanh toán |

---

## 3. Ma Trận Đánh Giá Tác Động 4 Chiều Kích (4-Dimension Impact Analysis)

### Chiều 1: Tác Động Phạm Vi & Yêu Cầu (Scope & Requirements Impact)
- **Tài liệu bị ảnh hưởng:**
  - `SRS-ORD-01`: Cần cập nhật mục 3.2 (Luồng đặt cọc).
  - `RULE-02` (BR Catalog): Bổ sung quy tắc hủy đơn cọc `BR-DEP-01` (Không hoàn cọc nếu hủy sau 24h).
  - `RULE-08` (BDD Scenarios): Bổ sung thêm 3 kịch bản kiểm thử luồng đặt cọc.
- **Rủi ro phạm vi:** Dễ phát sinh thêm yêu cầu quản lý nợ xấu nếu không có chính sách thu tiền còn lại chặt chẽ.

### Chiều 2: Tác Động Kiến Trúc, Dữ Liệu & API (Architecture, Data & API Impact)
- **Cơ sở dữ liệu:** Cần chạy migration thêm 3 cột vào bảng `orders`, tạo bảng mới `order_milestone_payments`.
- **Hợp đồng API:** Breaking change đối với API `POST /api/v1/orders` (Cần versioning lên `v2` hoặc bổ sung default value để tương thích ngược).
- **Hệ thống liên kết:** Cần cập nhật webhook kết nối với Cổng thanh toán để bắt 2 lần giao dịch cho 1 mã đơn.

### Chiều 3: Tác Động Giao Diện & Trải Nghiệm (UI/UX & User Flows)
- **Màn hình thay đổi:**
  - Màn hình Checkout: Thêm component chọn tỷ lệ cọc và hiển thị số tiền cần trả trước.
  - Màn hình Danh sách & Chi tiết đơn: Thêm badge trạng thái `PARTIALLY_PAID` (Đã cọc).
  - Màn hình Portal Shipper: Bổ sung chỉ dẫn thu nốt số tiền còn lại khi giao.

### Chiều 4: Tác Động Kiểm Thử, Nỗ Lực & Thời Gian (Testing & Effort Impact)
- **Nỗ lực phát triển ước tính:**
  - Thiết kế UI/UX: **0.5 Ngày công (Man-Day)**
  - Backend Development: **2.0 Man-Days**
  - Frontend Development: **1.5 Man-Days**
  - QA Testing & Automation Test: **1.5 Man-Days**
  - **Tổng nỗ lực (Total Effort):** **5.5 Man-Days**
- **Tác động tiến độ:** Có thể dời ngày release dự án thêm 3 ngày làm việc hoặc lùi một số task Low priority sang Sprint sau.

---

## 4. Đánh Giá Lợi Ích vs Chi Phí (Cost-Benefit Analysis)
- **Chi phí dự tính:** ~ 5.5 ngày công kỹ thuật.
- **Lợi ích mang lại:** Tăng tỷ lệ chốt đơn hàng giá trị cao từ 15% lên dự kiến 28%, giảm tỷ lệ bỏ giỏ hàng.
- **Hạn chế nếu không làm:** Mất khách hàng vào tay đối thủ đã hỗ trợ cơ chế đặt cọc.

---

## 5. Rủi Ro & Kế Hoạch Dự Phòng / Rollback (Risks & Rollback Strategy)
- **Rủi ro:** Khách hàng cọc nhưng không nhận hàng khi giao tới nơi.
- **Biện pháp phòng ngừa:** Ghi rõ điều khoản không hoàn tiền cọc trong màn hình thanh toán; SMS nhắc trước khi giao.
- **Phương án Rollback:** Sử dụng Feature Flag `FEATURE_ORDER_DEPOSIT = false`. Nếu có lỗi hệ thống, tắt flag để quay về luồng thanh toán 100% truyền thống mà không cần redeploy code.

---

## 6. Hội Đồng Phê Duyệt Thay Đổi (Change Control Board - CCB Sign-off)

| Vai Trò Phê Duyệt | Đại Diện | Quyết Định (Approve / Reject / Defer) | Nhận Xét / Điều Kiện Kèm Theo | Chữ Ký & Ngày |
| :--- | :--- | :---: | :--- | :---: |
| **Product Owner (PO)** | [Tên PO] | **[ Approved ]** | Đồng ý triển khai trong Sprint 24 | [Sign / Date] |
| **Lead BA** | [Tên Lead BA] | **[ Approved ]** | Đã hoàn tất tài liệu đặc tả chi tiết | [Sign / Date] |
| **Technical Lead** | [Tên Tech Lead]| **[ Approved ]** | Kiến trúc DB và API đã thống nhất | [Sign / Date] |
| **Project Manager (PM)**| [Tên PM] | **[ Approved ]** | Tiến độ dự án được cộng thêm 3 ngày | [Sign / Date] |
