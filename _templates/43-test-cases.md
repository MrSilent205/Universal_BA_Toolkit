# Bộ Kịch Bản Kiểm Thử Chi Tiết (Detailed Test Cases Suite)

> **Mã tài liệu:** `TC-[MODULE_CODE]-[VERSION]`  
> **Module / Tính năng:** [Tên Module / Tính năng]  
> **Tài liệu tham chiếu:** SRS: `[SRS-ID]`, Use Case: `[UC-ID]`, API Spec: `[API-ID]`  
> **Người viết kịch bản:** [Tên BA / QA Engineer] | **Ngày lập:** [YYYY-MM-DD]

---

## 1. Thông Tin Môi Trường Kiểm Thử (Test Environment)
- **Môi trường:** Staging / UAT (`https://uat.example.com`)
- **Tài khoản kiểm thử (Test Accounts):**
  - Quản trị viên: `admin_test@example.com` (Role: `SUPER_ADMIN`)
  - Chuyên viên nghiệp vụ: `operator_test@example.com` (Role: `OPERATOR`)
  - Khách hàng tiêu chuẩn: `user_regular@example.com` (Role: `END_USER`)
- **Dữ liệu giả lập (Pre-seeded Data):** Mã sản phẩm `SKU-TEST-001` (Tồn kho: 5 cái), Đơn hàng `ORD-TEST-999` (Trạng thái: `PENDING`).

---

## 2. Bảng Kịch Bản Kiểm Thử Chi Tiết (8-Column Test Suite)

| Mã Kịch Bản (TC ID) | Mã FR / US Liên Quan | Mục Tiêu Kiểm Thử (Objective) | Điều Kiện Tiên Quyết (Preconditions) | Các Bước Thực Hiện (Execution Steps) | Dữ Liệu Kiểm Thử (Test Data) | Kết Quả Kỳ Vọng (Expected Results: UI, API, DB) | Kết Quả Thực Tế & Trạng Thái |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-ORD-001` | `FR-ORD-01`<br>`US-01` | Tạo mới đơn hàng thành công khi tồn kho đáp ứng đủ (Happy Path) | - User đã đăng nhập vai trò `END_USER`<br>- Sản phẩm `SKU-001` tồn kho > 2 | 1. Điều hướng đến trang chi tiết sản phẩm `SKU-001`.<br>2. Chọn số lượng = 2.<br>3. Bấm 'Thêm vào giỏ' -> 'Thanh toán'.<br>4. Nhập địa chỉ giao hàng hợp lệ.<br>5. Bấm 'Xác nhận đặt hàng'. | - SKU: `SKU-001`<br>- Qty: 2<br>- Address: '123 Le Loi, Q1, HCMC'<br>- Payment: COD | **UI:** Hiển thị trang Success kèm mã đơn `ORD-xxxx`.<br>**API:** `POST /api/v1/orders` trả về `201 Created`.<br>**DB:** Tạo 1 record bảng `orders` (status: `CONFIRMED`), giảm tồn kho bảng `inventories` đi 2. | [ ] Pass<br>[ ] Fail<br>Bug ID: _____ |
| `TC-ORD-002` | `FR-ORD-02`<br>`BR-VAL-01` | Chặn tạo đơn hàng khi số lượng đặt vượt quá tồn kho khả dụng | - User đã đăng nhập.<br>- Sản phẩm `SKU-002` có tồn kho khả dụng = 1. | 1. Truy cập chi tiết sản phẩm `SKU-002`.<br>2. Nhập số lượng đặt mua = 2.<br>3. Bấm nút 'Đặt hàng ngay'. | - SKU: `SKU-002`<br>- Qty: 2 (Tồn kho: 1) | **UI:** Nút Đặt hàng báo lỗi hoặc hiển thị banner: 'Sản phẩm chỉ còn 1 cái trong kho'.<br>**API:** `POST /api/v1/orders` trả về `422 Unprocessable Entity` kèm code `ERR-ORD-003`.<br>**DB:** Không phát sinh record mới trong bảng `orders`. | [ ] Pass<br>[ ] Fail<br>Bug ID: _____ |
| `TC-ORD-003` | `FR-ORD-03`<br>`RULE-10` | Cơ chế Idempotency: Người dùng nhấn nút Xác nhận liên tục | - User ở bước xác nhận đơn hàng cuối cùng.<br>- Giỏ hàng có sản phẩm. | 1. Nhấp liên tiếp 3 lần cực nhanh vào nút 'Xác nhận đặt hàng' trong vòng 500ms. | - Mã giỏ hàng hiện tại<br>- Idempotency-Key gửi kèm header | **UI:** Nút submit chuyển sang trạng thái Loading (disable) sau lần click đầu tiên.<br>**API:** 1 request trả về `201 Created`, các request trùng lặp trả về cùng response mà không xử lý 2 lần.<br>**DB:** Chỉ có duy nhất 1 đơn hàng được tạo. | [ ] Pass<br>[ ] Fail<br>Bug ID: _____ |
| `TC-ORD-004` | `FR-ORD-04`<br>`RULE-17` | Phân quyền: Người dùng thông thường cố tình hủy đơn hàng của người khác qua API | - User A đăng nhập, sở hữu đơn hàng `ORD-001`.<br>- User B đăng nhập, không sở hữu đơn hàng này. | 1. User B gửi request `DELETE /api/v1/orders/ORD-001` bằng công cụ API Client với token của User B. | - Target Order ID: `ORD-001`<br>- Bearer Token: User B | **API:** Trả về `403 Forbidden` hoặc `404 Not Found`. Không chấp nhận thao tác.<br>**DB:** Trạng thái đơn `ORD-001` giữ nguyên không đổi.<br>**Audit:** Ghi log cảnh báo vi phạm bảo mật trái phép. | [ ] Pass<br>[ ] Fail<br>Bug ID: _____ |
| `TC-ORD-005` | `FR-ORD-05`<br>`RULE-12` | Hủy đơn hàng hợp lệ: Đơn đang ở trạng thái `CONFIRMED` | - User sở hữu đơn `ORD-002` có trạng thái `CONFIRMED`. | 1. Vào danh sách đơn hàng cá nhân.<br>2. Chọn đơn `ORD-002`.<br>3. Bấm nút 'Hủy đơn hàng'.<br>4. Nhập lý do: 'Đổi ý không mua nữa'.<br>5. Bấm Xác nhận hủy. | - Order: `ORD-002`<br>- Reason: 'Customer request' | **UI:** Badge trạng thái chuyển sang xám: `CANCELLED`.<br>**API:** `PUT /api/v1/orders/ORD-002/cancel` trả lời `200 OK`.<br>**DB:** Cập nhật `orders.status = 'CANCELLED'`, tự động hoàn lại tồn kho (+Qty). | [ ] Pass<br>[ ] Fail<br>Bug ID: _____ |

---

## 3. Ma Trận Truy Vết Kiểm Thử (Requirements Traceability Matrix - RTM)

| Yêu Cầu Chức Năng (FR ID) | Quy Tắc Nghiệp Vụ (BR ID) | Kịch Bản Kiểm Thử (TC ID) | Mức Độ Bao Phủ (Coverage) | Kết Quả Đánh Giá |
| :--- | :--- | :--- | :---: | :--- |
| `FR-ORD-01` | `BR-ORD-01`, `BR-ORD-02` | `TC-ORD-001`, `TC-ORD-003` | 100% | Verified |
| `FR-ORD-02` | `BR-VAL-01` | `TC-ORD-002` | 100% | Verified |
| `FR-ORD-03` | `RULE-10` | `TC-ORD-003` | 100% | Verified |
| `FR-ORD-04` | `RULE-17` | `TC-ORD-004` | 100% | Verified |
| `FR-ORD-05` | `RULE-12` | `TC-ORD-005` | 100% | Verified |

---

## 4. Báo Cáo Khiếm Khuyết Phát Sinh (Defect Log)
| Bug ID | Tóm Tắt Lỗi | Mức Độ Nghiêm Trọng | Kịch Bản Liên Quan | Người Giao Việc | Trạng Thái Xử Lý |
| :--- | :--- | :---: | :---: | :--- | :---: |
| `BUG-001` | [Mô tả vắn tắt lỗi phát hiện] | [Critical / High / Medium / Low] | `TC-xxx` | [Dev Name] | [Open / Fixed / Verified] |
