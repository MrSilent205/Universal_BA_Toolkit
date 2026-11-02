# Báo Cáo Phân Tích Khoảng Trống Nghiệp Vụ (Business Logic Gap Analysis Report)

> **Mã tài liệu:** `GAP-[PROJECT_CODE]-[VERSION]`  
> **Dự án / Sản phẩm:** [Tên dự án]  
> **Phạm vi phân tích:** [Module / Tính năng phân tích]  
> **Ngày lập:** [YYYY-MM-DD] | **Chuyên viên phân tích (Lead BA):** [Tên Lead BA]  
> **Phiên bản đối sánh:** Yêu cầu đặc tả: `[SRS-v1.x]` vs Hiện trạng triển khai: `[Build/Release-Tag]`

---

## 1. Tóm Tắt Điều Hành (Executive Summary)
- **Bối cảnh:** Báo cáo nhằm nhận diện độ lệch (gap) giữa mục tiêu nghiệp vụ ban đầu (As-Is / Specs) so với giải pháp hoặc hệ thống thực tế đang vận hành/phát triển (To-Be / Implementation).
- **Kết quả tổng quát:**
  - Tổng số hạng mục rà soát: **[Số lượng]**
  - Số lượng khoảng trống phát hiện: **[Số gap]** (Nghiêm trọng: [X], Cao: [Y], Trung bình: [Z], Thấp: [W])
  - Đánh giá rủi ro tổng thể: **[Cao / Trung bình / Thấp]**

```
+--------------------------------------------------------------------------+
|  Mục Tiêu Nghiệp Vụ (Requirements)  vs  Hiện Trạng Thực Tế (Actual)      |
|  [Đặc tả SRS / BRD / Rules]              [Mã nguồn / API / Quy trình]     |
|                   \                           /                          |
|                    \                         /                           |
|                     v                       v                            |
|             +--------------------------------------+                     |
|             |        PHÁT HIỆN KHOẢNG TRỐNG (GAP)  |                     |
|             |  - Thiếu quy tắc kiểm soát biên      |                     |
|             |  - Thiếu phân quyền vai trò          |                     |
|             |  - Lệch cấu trúc dữ liệu             |                     |
|             +--------------------------------------+                     |
+--------------------------------------------------------------------------+
```

---

## 2. Ma Trận Phân Tích Khoảng Trống Theo 6 Chiều Kích (6-Dimension Gap Matrix)

### Chiều 1: Độ Đầy Đủ Chức Năng (Functional Completeness)
| Mã Gap | Mô tả yêu cầu nghiệp vụ (Target Spec) | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-FN-01` | [Hệ thống phải cho phép xuất danh sách đơn hàng ra file Excel theo mẫu template kế toán] | [Hiện chỉ hỗ trợ xem trên giao diện web, chưa có nút Export] | [Thiếu tính năng xuất file báo cáo phục vụ đối soát] | **High** | Chuyên viên kế toán phải nhập tay dữ liệu, tốn 2h/ngày. |
| `GAP-FN-02` | [Gửi email tự động thông báo khi trạng thái đơn hàng thay đổi sang 'Đã giao hàng'] | [Code backend chưa tích hợp email provider, chỉ cập nhật status trong DB] | [Khách hàng không nhận được email thông báo hành trình đơn] | **Medium** | Khách hàng liên tục gọi lên tổng đài để hỏi trạng thái. |

---

### Chiều 2: Thực Thi Quy Tắc Nghiệp Vụ (Business Rule Enforcement)
| Mã Gap | Mô tả quy tắc chuẩn (Rule / BRD) | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-BR-01` | [BR-ORD-02: Đơn hàng chỉ được phép hủy khi trạng thái là 'Chờ xác nhận'] | [Hệ thống cho phép người dùng bấm hủy ngay cả khi đơn đang 'Đang giao'] | [Thiếu guard logic kiểm tra trạng thái trước khi hủy] | **Critical** | Shipper đã lấy hàng nhưng đơn bị hủy, gây thất thoát chi phí. |
| `GAP-BR-02` | [BR-DISC-01: Mã giảm giá chỉ được dùng 1 lần duy nhất cho mỗi khách hàng] | [Hệ thống chỉ kiểm tra theo mã giỏ hàng, chưa khóa theo User ID] | [Khách hàng có thể tạo nhiều giỏ hàng để dùng lại cùng voucher] | **Critical** | Thiệt hại ngân sách khuyến mãi của doanh nghiệp. |

---

### Chiều 3: Xử Lý Biên & Tình Huống Ngoại Lệ (Edge Cases & Exception Handling)
| Mã Gap | Tình huống ngoại lệ đặc tả | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-ED-01` | [Khi cổng thanh toán mất kết nối (timeout), hệ thống phải giữ chỗ đơn 15 phút] | [Hệ thống văng lỗi 500 Unhandled Exception, đơn hàng bị hủy ngay lập tức] | [Thiếu cơ chế hàng đợi xử lý timeout và retry của payment gateway] | **High** | Khách hàng bị trừ tiền tại ngân hàng nhưng đơn bị hủy trên web. |
| `GAP-ED-02` | [Nhập tên khách hàng có chứa emoji hoặc ký tự đặc biệt ngôn ngữ hiếm] | [Database văng lỗi cú pháp collation `Incorrect string value`] | [Database sử dụng `utf8` thay vì `utf8mb4`] | **Low** | Một số đơn hàng quốc tế không lưu được vào hệ thống. |

---

### Chiều 4: Bảo Mật, Phân Quyền & Kiểm Soát Truy Cập (Security & RBAC)
| Mã Gap | Yêu cầu bảo mật chuẩn | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-SEC-01` | [Chỉ tài khoản vai trò 'Admin Kho' mới có quyền duyệt phiếu nhập hàng] | [API `PUT /api/v1/stock-in/{id}` không kiểm tra scope token] | [Bất kỳ user nào có tài khoản nhân viên đều có thể duyệt phiếu] | **Critical** | Rủi ro gian lận kho hàng nội bộ. |
| `GAP-SEC-02` | [Che giấu thông tin định danh (PII: Số điện thoại, Email) của khách hàng] | [Dữ liệu trả về đầy đủ trong API response, chỉ ẩn bằng CSS frontend] | [Rò rỉ dữ liệu khách hàng nếu inspect network browser] | **High** | Vi phạm quy định bảo vệ dữ liệu cá nhân (Nghị định 13). |

---

### Chiều 5: Độ Toàn Vẹn & Đồng Bộ Dữ Liệu (Data Integrity & Synchronization)
| Mã Gap | Yêu cầu toàn vẹn dữ liệu | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-DAT-01` | [Tồn kho tổng = Tổng tồn kho các chi nhánh cộng lại tại mọi thời điểm] | [Không dùng Transaction khi chuyển kho, dẫn tới lệch số lượng khi timeout] | [Số tồn kho hiển thị sai lệch giữa báo cáo tổng và thực tế kho] | **High** | Bán vượt quá số lượng hàng thực tế có trong kho. |
| `GAP-DAT-02` | [Lưu vết toàn bộ lịch sử chỉnh sửa giá sản phẩm (Audit trail)] | [Bảng `products` chỉ có trường `updated_at`, không có bảng `price_history`] | [Không thể tra cứu ai đã đổi giá sản phẩm vào thời điểm nào] | **Medium** | Khó quy trách nhiệm khi xảy ra sai sót bán sai giá. |

---

### Chiều 6: Hiệu Năng & Khả Năng Mở Rộng (NFR & Scalability)
| Mã Gap | Chỉ số NFR cam kết | Hiện trạng thực tế (Current State) | Đánh giá khoảng trống (Gap Description) | Mức độ nghiêm trọng | Rủi ro tác động |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `GAP-NFR-01` | [Thời gian tìm kiếm sản phẩm < 500ms với 500.000 bản ghi] | [Tìm kiếm bằng `LIKE %keyword%` không đánh index, mất từ 4s - 6s] | [Truy vấn chậm khi lượng dữ liệu lớn, làm treo database connection] | **Medium** | Trải nghiệm người dùng kém, tỷ lệ thoát trang cao. |

---

## 3. Kế Hoạch Khắc Phục & Lộ Trình Triển Khai (Action Plan & Roadmap)

| Mã Gap | Giải Pháp Khắc Phục Đề Xuất (Remediation Strategy) | Đơn Vị Phụ Trách | Người Thực Hiện | Sprint / Milestone Mục Tiêu | Trạng Thái |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `GAP-BR-01` | Bổ sung middleware kiểm tra State Machine transition trước khi hủy đơn | Backend Team | [Dev Lead] | Sprint 24 (Ngày kết thúc: [Date]) | [In Progress] |
| `GAP-BR-02` | Thêm Unique Index `(user_id, coupon_id)` trong bảng áp dụng khuyến mãi | Database Team | [DBA] | Hotfix Immediate | [Open] |
| `GAP-SEC-01`| Bổ sung role guard annotation `@Roles('WAREHOUSE_ADMIN')` tại controller API | Security & BE | [BE Dev] | Hotfix Immediate | [In Progress] |
| `GAP-FN-01` | Xây dựng background job xuất file Excel bằng thư viện chuyên dụng | Frontend + BE | [FE/BE Dev] | Sprint 25 | [Backlog] |

---

## 4. Ý Kiến Chuyên Gia BA & Phê Duyệt (Sign-off)
- **Đề xuất từ BA:** Đội ngũ phát triển cần ưu tiên giải quyết dứt điểm các lỗi Critical liên quan đến logic trừ kho và phân quyền API trước khi tiếp tục release tính năng mới.
- **Xác nhận của Product Owner:** `[ Đã duyệt / Yêu cầu điều chỉnh ]`  
- **Chữ ký:** [PO Name] | **Ngày:** [YYYY-MM-DD]
