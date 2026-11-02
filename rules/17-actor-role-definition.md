# Quy Chuẩn Định Nghĩa Tác Nhân & Ma Trận Phân Quyền (Actor & RBAC Matrix)

> **Mã quy tắc:** `RULE-17`  
> **Áp dụng cho:** Tất cả các tài liệu đặc tả User Story, Use Case, API Security và phân quyền hệ thống.

---

## 1. Phân Loại Tác Nhân (Actor Taxonomy)
Trong tài liệu phân tích nghiệp vụ, mọi tác nhân tương tác với hệ thống phải được phân loại rõ vào 1 trong 4 nhóm:

```
+--------------------------------------------------------------------------+
|                         PHÂN LOẠI TÁC NHÂN (ACTORS)                      |
+--------------------------------------------------------------------------+
| 1. Primary Actor (Tác nhân chính)   | 2. Secondary Actor (Tác nhân phụ)  |
| 3. System / Background Daemon Actor | 4. Off-stage Stakeholder           |
+--------------------------------------------------------------------------+
```

1. **Tác nhân chính (Primary Actor):** Người trực tiếp khởi xướng hành động để đạt mục tiêu nghiệp vụ (VD: Khách hàng mua sắm, Nhân viên kinh doanh tạo báo giá).
2. **Tác nhân phụ (Secondary Actor):** Hệ thống hoặc bên thứ ba tiếp nhận yêu cầu từ hệ thống chính để phối hợp xử lý (VD: Cổng thanh toán VNPay, Đơn vị vận chuyển GHTK, Tổng đài SMS).
3. **Tác nhân hệ thống ngầm (System / Daemon Actor):** Các tiến trình tự động chạy theo lịch trình hoặc sự kiện (VD: Scheduled Cronjob quét nợ, Event Consumer xử lý Kafka queue).
4. **Bên liên quan thụ hưởng (Off-stage Stakeholder):** Không trực tiếp chạm vào phần mềm nhưng quan tâm sâu sắc tới kết quả (VD: Giám đốc tài chính xem báo cáo kiểm toán, Cục thuế).

---

## 2. Ma Trận Phân Quyền Vai Trò Theo Chức Năng (RBAC Matrix)
Mọi tài liệu SRS phải có ma trận kiểm soát truy cập (Role-Based Access Control - RBAC) thể hiện rõ quyền hạn thao tác (CRUD):
- `C`: Create (Tạo mới)
- `R`: Read / View (Xem thông tin)
- `U`: Update / Edit (Chỉnh sửa)
- `D`: Delete (Xóa dữ liệu / Đóng trạng thái)
- `A`: Approve (Phê duyệt nghiệp vụ)

| Mã Quyền Hạn (Permission Code) | Mô Tả Chức Năng Nghiệp Vụ | Khách Hàng (`GUEST` / `CUSTOMER`) | Chuyên Viên Vận Hành (`OPERATOR`) | Kế Toán Viên (`ACCOUNTANT`) | Quản Trị Hệ Thống (`ADMIN`) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `PERM_ORDER_VIEW` | Xem chi tiết thông tin đơn hàng | R (Chỉ đơn của mình) | R (Toàn bộ) | R (Toàn bộ) | R (Toàn bộ) |
| `PERM_ORDER_CREATE` | Khởi tạo đơn hàng mới | C | C | Không | C |
| `PERM_ORDER_CANCEL` | Hủy đơn hàng hợp lệ | U (Khi PENDING) | U | Không | U |
| `PERM_PAYMENT_REFUND`| Kích hoạt hoàn tiền đơn hàng | Không | Không | C, A | C, A |
| `PERM_STOCK_ADJUST` | Điều chỉnh số lượng tồn kho | Không | C, U | Không | C, U, D |
| `PERM_SYSTEM_CONFIG`| Thay đổi cấu hình tham số hệ thống| Không | Không | Không | C, R, U, D |

---

## 3. Nguyên Tắc Phân Quyền Tối Thiểu (Principle of Least Privilege)
- Mặc định mọi tài khoản người dùng mới tạo đều có quyền bằng `None` (Zero Trust).
- Chỉ cấp phát đúng những quyền tối thiểu cần thiết để người dùng thực hiện nhiệm vụ công việc.
- Việc phân quyền phải được kiểm tra (enforce) nghiêm ngặt tại tầng Backend API Controller, tuyệt đối không chỉ ẩn nút trên giao diện Frontend.
