# Quy Chuẩn Đặc Tả Use Case Theo Phương Pháp Alistair Cockburn

> **Mã quy tắc:** `RULE-06`  
> **Áp dụng cho:** Tất cả các tài liệu Use Case (`26-usecase-cockburn.md`), luồng nghiệp vụ và phân tích hành vi tác nhân.

---

## 1. Phân Loại Cấp Độ Mục Tiêu (Goal-Level Taxonomy)
Theo Alistair Cockburn, mỗi Use Case phải được xác định rõ cấp độ mục tiêu thông qua 3 biểu tượng tiêu chuẩn:

| Cấp Độ Mục Tiêu | Biểu Tượng | Định Nghĩa Nghiệp Vụ | Ví Dụ Điển Hình |
| :--- | :---: | :--- | :--- |
| **Cấp Tóm Tắt (Summary Level)** | ☁️ *Đám mây / Mây trắng* | Bao quát chuỗi hoạt động kinh doanh kéo dài nhiều ngày hoặc nhiều phòng ban. | *Quản lý vòng đời đơn hàng từ đặt hàng đến đối soát kế toán.* |
| **Cấp Mục Tiêu Người Dùng (User-Goal Level)** | 🌊 *Mặt biển / Sóng biển* | Thao tác trọn vẹn của 1 tác nhân tại 1 phiên làm việc để đạt 1 mục tiêu cụ thể. (**Cấp độ khuyến nghị chuẩn cho BA**) | *Khách hàng thanh toán giỏ hàng trực tuyến.*<br>*Nhân viên kho duyệt phiếu xuất kho.* |
| **Cấp Hàm Con (Subfunction Level)** | 🐟 *Dưới nước / Đáy biển* | Thao tác kỹ thuật bổ trợ được tái sử dụng bởi nhiều Use Case cấp trên. | *Xác thực mã OTP SMS.*<br>*Tải file hóa đơn điện tử PDF.* |

---

## 2. Khung Cấu Trúc 12 Thành Phần Bắt Buộc Của Use Case Chuẩn Cockburn

1. **Mã Use Case & Tên:** `UC-[MODULE]-[NUM]: <Động từ> + <Bổ ngữ>` (VD: `UC-ORD-01: Đặt Mua Hàng Trực Tuyến`).
2. **Cấp độ (Goal Level):** `🌊 User-Goal Level` (Mục tiêu người dùng).
3. **Tác nhân chính (Primary Actor):** Vai trò khởi xướng Use Case (VD: Khách hàng mua sắm).
4. **Các bên liên quan & Quyền lợi (Stakeholders & Interests):** Ai quan tâm đến kết quả và mong muốn điều gì.
5. **Tiền điều kiện (Preconditions):** Điều kiện bắt buộc phải đúng trước khi Use Case bắt đầu (VD: Người dùng đã đăng nhập, giỏ hàng > 0).
6. **Hậu điều kiện tối thiểu (Minimal Guarantees):** Cam kết của hệ thống khi Use Case thất bại (VD: Không trừ tiền khách hàng, ghi log lỗi).
7. **Hậu điều kiện thành công (Success Guarantees):** Trạng thái của hệ thống sau khi Use Case hoàn tất thành công (VD: Đơn hàng tạo mới ở trạng thái PENDING, gửi email xác nhận).
8. **Kích hoạt (Trigger):** Sự kiện làm bắt đầu Use Case (VD: Khách hàng nhấn nút 'Tiến hành đặt hàng').
9. **Kịch bản chính / Luồng hạnh phúc (Main Success Scenario - Happy Path):**
   - Đánh số bước tuần tự: 1, 2, 3, 4, 5...
   - Mỗi bước ghi rõ: `[Tác nhân] làm gì` $ightarrow$ `[Hệ thống] phản hồi/xử lý gì`.
10. **Các luồng ngoại lệ & Mở rộng (Extensions / Alternative Flows):**
    - Đánh số theo bước phát sinh: `3a.`, `3b.`, `4a.1.`
    - Mô tả điều kiện nhánh rẽ và cách hệ thống xử lý hoặc kết thúc Use Case.
11. **Yêu cầu đặc biệt (Special Requirements):** Ràng buộc phi chức năng gắn riêng cho Use Case này (SLA phản hồi, giao diện thiết bị).
12. **Quy tắc nghiệp vụ liên quan (Related Business Rules):** Danh sách liên kết mã `BR-xxx`.
