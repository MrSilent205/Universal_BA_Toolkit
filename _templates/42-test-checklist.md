# Bảng Kiểm Thử Nghiệp Vụ & Điều Kiện Kiểm Thử (Business Test Conditions Checklist)

> **Mã tài liệu:** `CHK-[MODULE_CODE]-[VERSION]`  
> **Tính năng / Module:** [Tên tính năng hoặc Epic / Module]  
> **Tài liệu tham chiếu:** SRS: `[SRS-ID]`, User Story: `[US-ID]`, BR Catalog: `[BR-ID]`  
> **Người thực hiện:** Lead BA / QA Lead | **Ngày lập:** [YYYY-MM-DD] | **Trạng thái:** [Draft / Approved / In-Test]

---

## 1. Mục Tiêu & Phạm Vi Kiểm Thử (Test Scope)
- **Mục tiêu:** Đảm bảo toàn bộ quy tắc nghiệp vụ, luồng xử lý chính, ngoại lệ và ràng buộc phi chức năng của tính năng được thẩm định đầy đủ trước khi nghiệm thu UAT / Release.
- **Phạm vi kiểm thử:**
  - In-Scope: [Liệt kê màn hình, luồng giao dịch, API, quy tắc nghiệp vụ cần test]
  - Out-of-Scope: [Liệt kê các module liên đới chưa triển khai đợt này]

---

## 2. Ma Trận Checklist Theo 6 Trụ Cột Nghiệp Vụ (6-Pillar Test Checklist)

### Trụ cột 1: Luồng Nghiệp Vụ Chuẩn (Happy Path & Core Workflows)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-HP-01` | [Thực hiện giao dịch với đầy đủ dữ liệu hợp lệ] | [Giao dịch thành công, thông báo hiển thị đúng, DB ghi nhận đúng] | P1 | `US-01`, `BR-01` | [ ] Pass / [ ] Fail | |
| `CHK-HP-02` | [Luồng chuyển tiếp trạng thái theo đúng sơ đồ State Machine] | [Thực thể chuyển trạng thái từ A -> B đúng guard logic] | P1 | `BR-02`, `RULE-12` | [ ] Pass / [ ] Fail | |
| `CHK-HP-03` | [Hệ thống tự động kích hoạt notification/webhook sau khi hoàn tất] | [Email/Push notification được gửi đúng mẫu nội dung và người nhận] | P2 | `FR-05` | [ ] Pass / [ ] Fail | |

---

### Trụ cột 2: Giá Trị Biên & Định Dạng Dữ Liệu (Boundary Values & Data Constraints)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-BV-01` | [Trường ký tự đạt độ dài tối thiểu (Min Length) và tối đa (Max Length)] | [Hệ thống chấp nhận chuỗi hợp lệ, không bị cắt bớt (truncate)] | P2 | `RULE-09` | [ ] Pass / [ ] Fail | |
| `CHK-BV-02` | [Nhập chuỗi vượt quá Max Length 1 ký tự] | [Báo lỗi validation ngay tại trường nhập liệu hoặc khi submit] | P2 | `ERR-VAL-001` | [ ] Pass / [ ] Fail | |
| `CHK-BV-03` | [Giá trị số: Giá trị 0, giá trị âm, giá trị vượt ngưỡng tối đa cho phép] | [Chỉ chấp nhận số nguyên dương trong khoảng định nghĩa [Min..Max]] | P1 | `BR-VAL-02` | [ ] Pass / [ ] Fail | |
| `CHK-BV-04` | [Ký tự đặc biệt, Unicode có dấu, khoảng trắng đầu/cuối chuỗi] | [Tự động trim khoảng trắng thừa, xử lý đúng bảng mã UTF-8] | P2 | `RULE-09` | [ ] Pass / [ ] Fail | |

---

### Trụ cột 3: Xử Lý Ngoại Lệ & Mã Lỗi (Negative & Exception Scenarios)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-EX-01` | [Bỏ trống các trường bắt buộc (Mandatory fields)] | [Hiển thị thông báo inline đỏ rõ ràng, nút Submit bị disable hoặc alert] | P1 | `RULE-03` | [ ] Pass / [ ] Fail | |
| `CHK-EX-02` | [Nhập dữ liệu trùng lặp vi phạm Unique Constraint (VD: Email, MST)] | [Trả về lỗi thân thiện `ERR-DUP-001`, hướng dẫn cách xử lý] | P1 | `RULE-11` | [ ] Pass / [ ] Fail | |
| `CHK-EX-03` | [Dịch vụ bên thứ 3 (Payment Gateway / SMS) timeout hoặc phản hồi lỗi 500] | [Hệ thống kích hoạt Circuit Breaker, ghi log, đưa giao dịch vào hàng đợi retry] | P1 | `RULE-10` | [ ] Pass / [ ] Fail | |
| `CHK-EX-04` | [Tải lên file không đúng định dạng cho phép hoặc vượt dung lượng tối đa] | [Chặn file tại frontend, nếu vượt qua backend trả về 415/422 kèm mã lỗi] | P2 | `RULE-03` | [ ] Pass / [ ] Fail | |

---

### Trụ cột 4: Phân Quyền & Kiểm Soát Truy Cập (Authorization & RBAC)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-SEC-01` | [Người dùng chưa đăng nhập cố tình truy cập trực tiếp URL trang quản trị] | [Chuyển hướng về trang Login kèm tham số `redirect_uri`] | P1 | `RULE-17` | [ ] Pass / [ ] Fail | |
| `CHK-SEC-02` | [User có vai trò 'Viewer' cố tình gọi API POST/PUT sửa đổi dữ liệu] | [Hệ thống từ chối với HTTP 403 Forbidden, không lộ thông tin nội bộ] | P1 | `RULE-10` | [ ] Pass / [ ] Fail | |
| `CHK-SEC-03` | [Kiểm tra IDOR: User A gọi API truy vấn dữ liệu chi tiết của User B bằng ID] | [Hệ thống từ chối hoặc trả về 404/403 do vi phạm quyền sở hữu tài nguyên] | P1 | `RULE-17` | [ ] Pass / [ ] Fail | |
| `CHK-SEC-04` | [Token hết hạn (Expired JWT) khi đang thực hiện thao tác dở dang] | [Tự động refresh token âm thầm hoặc yêu cầu đăng nhập lại an toàn] | P2 | `RULE-10` | [ ] Pass / [ ] Fail | |

---

### Trụ cột 5: Đồng Thời & Tính Toàn Vẹn Dữ Liệu (Concurrency & Data Integrity)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-CON-01` | [Hai người dùng cùng bấm xác nhận 1 đơn hàng khi tồn kho chỉ còn 1 sản phẩm] | [Khóa lạc quan/bi quan: 1 đơn thành công, 1 đơn báo hết hàng, không âm kho] | P1 | `BR-INV-01` | [ ] Pass / [ ] Fail | |
| `CHK-CON-02` | [Người dùng double-click liên tiếp vào nút Submit/Thanh toán] | [Idempotency Key chặn request trùng lặp, chỉ trừ tiền 1 lần duy nhất] | P1 | `RULE-10` | [ ] Pass / [ ] Fail | |
| `CHK-CON-03` | [Lỗi xảy ra ở bước cuối cùng trong chuỗi giao dịch đa bảng (DB Transaction)] | [Toàn bộ dữ liệu rollback về trạng thái ban đầu, không bị mồ côi dữ liệu] | P1 | `RULE-09` | [ ] Pass / [ ] Fail | |

---

### Trụ cột 6: Hiệu Năng & Phi Chức Năng (Performance & NFR Verification)
| Mã TK | Điều kiện kiểm thử (Test Condition) | Tiêu chí kỳ vọng (Expected Outcome) | Độ ưu tiên | Truy vết (Trace) | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `CHK-NFR-01` | [Tải trang với danh sách 1.000 bản ghi có phân trang chuẩn] | [Thời gian phản hồi giao diện < 1.5 giây, API response < 500ms] | P2 | `RULE-04` | [ ] Pass / [ ] Fail | |
| `CHK-NFR-02` | [Kiểm tra Responsive trên 3 kích thước: Desktop (1440px), Tablet (768px), Mobile (375px)] | [Giao diện co giãn chuẩn, không bị vỡ bố cục, không tràn ngang màn hình] | P2 | `RULE-13` | [ ] Pass / [ ] Fail | |
| `CHK-NFR-03` | [Kiểm tra Audit Log sau khi thực hiện thao tác Create/Update/Delete] | [Ghi nhận đầy đủ: Actor, Timestamp, Action, Old Values, New Values, Client IP] | P1 | `RULE-04`, `RULE-09` | [ ] Pass / [ ] Fail | |

---

## 3. Đánh Giá & Kết Luận Nghiệm Thu (Sign-off)
- **Tổng số điều kiện kiểm thử:** [Tổng số]
- **Tỉ lệ Pass:** [.. %] | **Fail:** [.. %] | **Block:** [.. %]
- **Ý kiến BA Lead:** [Đạt yêu cầu nghiệm thu / Cần khắc phục các lỗi P1 trước khi release]
