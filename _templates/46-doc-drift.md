# Báo Cáo Độ Lệch Tài Liệu & Mã Nguồn (Specification vs Code Drift Report)

> **Mã tài liệu:** `DRIFT-[PROJECT_CODE]-[VERSION]`  
> **Dự án:** [Tên Dự Án] | **Ngày rà soát:** [YYYY-MM-DD]  
> **Phiên bản tài liệu đối chiếu (Spec Baseline):** `SRS v2.1.0` (Ngày: [YYYY-MM-DD])  
> **Phiên bản mã nguồn kiểm tra (Codebase Commit):** `Git Commit: [commit-hash]` (Branch: `main`)  
> **Người thực hiện:** Technical BA / Solution Architect

---

## 1. Tóm Tắt Tình Trạng Độ Lệch (Drift Executive Summary)
Hiện tượng lệch pha (Doc Drift) xảy ra khi mã nguồn thực tế đã qua nhiều lần chỉnh sửa/hotfix nhưng tài liệu đặc tả nghiệp vụ (SRS, API Doc, Data Model) chưa được cập nhật tương ứng, dẫn tới sai lệch giữa kiến trúc lý thuyết và vận hành thực tế.

```
                  +-----------------------------------+
                  |   SRS & Đặc Tả Nghiệp Vụ (Spec)   |
                  +-----------------+-----------------+
                                    |
                            ĐỘ LỆCH (DRIFT)
                                    |
                  +-----------------v-----------------+
                  |   Mã Nguồn Đang Chạy (Source Code)|
                  +-----------------------------------+
```

- **Tổng số mục kiểm tra:** [Số mục]
- **Số lượng sai lệch phát hiện:** [Số mục lệch]
- **Mức độ rủi ro:** [Nghiêm trọng / Trung bình / Thấp]

---

## 2. Bảng Ma Trận Sai Lệch Chi Tiết (Delta Drift Matrix)

### 2.1 Sai lệch Cấu Trúc Dữ Liệu & Thực Thể (Entity & Schema Drift)
| Mã Thực Thể | Thuộc Tính Trong Tài Liệu SRS | Thuộc Tính Trong Database/Code Thực Tế | Bản Chất Sai Lệch | Mức Độ | Phương Án Đồng Bộ Hóa |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `users` | `phone_number` VARCHAR(15) NULL | `phone_e164` VARCHAR(20) NOT NULL | Code đã chuẩn hóa E.164 và bắt buộc, tài liệu chưa update | Medium | Cập nhật SRS `RULE-09` theo mã nguồn thực tế. |
| `orders` | `status`: `[DRAFT, PENDING, PAID, CANCELLED]` | `status`: `[DRAFT, PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED]` | Code phát sinh thêm 3 trạng thái mới phục vụ logistics | High | Bổ sung 3 trạng thái mới vào State Machine SRS. |
| `payments` | Lưu `card_number` masked | Bảng đã xóa trường này, dùng `payment_gateway_token` | Tài liệu vẫn còn vết giải pháp cũ chưa dùng token hóa | High | Xóa bỏ trường trong tài liệu để đúng chuẩn PCI-DSS. |

---

### 2.2 Sai lệch Hợp Đồng Giao Diện API (API Contract Drift)
| Mã Endpoint | Đặc Tả Trong Tài Liệu API Spec | Triển Khai Thực Tế Trong Controller | Chi Tiết Lệch Chuẩn | Mức Độ | Phương Án Đồng Bộ Hóa |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `POST /api/v1/orders` | Response trả về: `{ "data": { "id": "uuid" } }` | Response trả về thẳng object không bọc envelope: `{ "order_id": "123" }` | Vi phạm Envelope chuẩn của dự án (`RULE-10`) | Critical | Refactor mã nguồn backend theo đúng chuẩn Envelope `RULE-10`. |
| `GET /api/v1/customers` | Query param: `?page=1&size=20` | Query param thực tế: `?offset=0&limit=20` | Sai khác quy chuẩn phân trang giữa BA và Dev | Medium | Thống nhất chuẩn `page/page_size`, cập nhật tài liệu hoặc code. |
| `POST /api/v1/auth/login` | Header: Không yêu cầu thiết bị | Header: Bắt buộc gửi `X-Device-Fingerprint` | Dev thêm cơ chế chống gian lận nhưng không báo BA | High | Cập nhật SRS bổ sung yêu cầu bảo mật định danh thiết bị. |

---

### 2.3 Sai lệch Quy Tắc Nghiệp Vụ (Business Logic Drift)
| Mã Quy Tắc | Quy Định Trong Tài Liệu (SRS / BR) | Thực Tế Đang Xử Lý Trong Code | Hậu Quả Phát Sinh | Mức Độ | Quyết Định Xử Lý |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `BR-FEE-01` | Phí vận chuyển mặc định là 30.000 VNĐ cho đơn < 500.000 VNĐ | Code hardcode: 25.000 VNĐ (được sửa trong đợt marketing cũ) | Khách hàng bị tính thiếu phí so với bài toán tài chính | High | Chỉnh sửa code về lại 30.000 VNĐ hoặc điều chỉnh BRD nếu có quyết định mới. |
| `BR-RET-01` | Cho phép trả hàng trong vòng 7 ngày kể từ ngày nhận | Code check điều kiện: `created_at + 3 days` | Khách hàng bị từ chối trả hàng oan dù chưa quá 7 ngày | Critical | Sửa code ngay lập tức để khớp quy định 7 ngày theo luật. |

---

### 2.4 Tính Năng "Chui" Chưa Được Đặc Tả (Undocumented Features)
| Tên Tính Năng | File Mã Nguồn Phát Hiện | Tác Động Hệ Thống | Hướng Xử Lý |
| :--- | :--- | :--- | :--- |
| Cho phép đăng nhập bằng tài khoản Google | `src/auth/oauth-google.service.ts` | Chưa có đánh giá an toàn thông tin và quy trình liên kết tài khoản | Bổ sung tài liệu đặc tả User Story và kiểm tra bảo mật. |
| Cơ chế tự động hoàn tiền cho đơn thanh toán lỗi | `src/jobs/auto-refund.cron.ts` | Hoạt động ngầm chưa có dashboard đối soát cho kế toán | Bổ sung màn hình đối soát trong SRS Phase tiếp theo. |

---

## 3. Kế Hoạch Đồng Bộ Hóa (Reconciliation Roadmap)

| STT | Hành Động Đồng Bộ (Reconciliation Action) | Phân Loại Xử Lý | Trách Nhiệm | Hạn Chót | Trạng Thái |
| :---: | :--- | :---: | :---: | :---: | :---: |
| 1 | Cập nhật SRS v2.2.0: Bổ sung 3 trạng thái mới của đơn hàng và chuẩn hóa DB Schema | **Update Doc** | Lead BA | [YYYY-MM-DD] | [Open] |
| 2 | Refactor API Response đơn hàng để tuân thủ chuẩn JSON Envelope `RULE-10` | **Refactor Code** | Backend Dev | [YYYY-MM-DD] | [Pending] |
| 3 | Sửa thời hạn cho phép trả hàng từ 3 ngày thành 7 ngày trong mã nguồn | **Hotfix Code** | Backend Dev | [YYYY-MM-DD] | [Done] |
| 4 | Bổ sung quy định kiểm soát tài liệu: Mọi PR code thay đổi API/DB phải gắn link tài liệu | **Process** | Tech Lead / BA | [YYYY-MM-DD] | [Active] |

---

## 4. Xác Nhận Từ Các Bên (Sign-off)
- **Technical Lead:** [Họ tên & Chữ ký] | **Ngày:** [YYYY-MM-DD]
- **Lead Business Analyst:** [Họ tên & Chữ ký] | **Ngày:** [YYYY-MM-DD]
