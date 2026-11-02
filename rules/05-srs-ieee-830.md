# Quy Chuẩn Cấu Trúc Đặc Tả Yêu Cầu Phần Mềm (SRS - IEEE 830 / ISO 29148)

> **Mã quy tắc:** `RULE-05`  
> **Áp dụng cho:** Tất cả các tài liệu SRS (`08-srs.md`, `09-srs-fr.md`, `10-srs-nfr.md`).

---

## 1. Cấu Trúc Bắt Buộc Của Tài Liệu SRS Chuẩn Quốc Tế
Mọi tài liệu SRS phải tuân thủ khung cấu trúc 5 phần chính theo tiêu chuẩn IEEE 830 và ISO/IEC/IEEE 29148:

```
1. Giới thiệu tổng quan (Introduction)
   1.1 Mục đích tài liệu (Purpose)
   1.2 Phạm vi sản phẩm (Product Scope - In/Out Scope)
   1.3 Định nghĩa, từ viết tắt & thuật ngữ (Definitions & Acronyms)
   1.4 Tài liệu tham chiếu (References)
2. Mô tả tổng thể hệ thống (Overall Description)
   2.1 Bối cảnh & Mô hình kiến trúc tổng quát (Product Perspective)
   2.2 Tóm tắt chức năng chính (Product Functions Summary)
   2.3 Đối tượng người dùng & Đặc điểm phân quyền (User Classes & Characteristics)
   2.4 Môi trường vận hành (Operating Environment)
   2.5 Ràng buộc thiết kế & triển khai (Constraints & Assumptions)
3. Yêu cầu chức năng chi tiết (Functional Requirements - FR)
   3.x [Module X]: Danh sách FR-xxx, Use Cases, Luồng nghiệp vụ, Quy tắc BR-xxx
4. Yêu cầu giao diện bên ngoài (External Interface Requirements)
   4.1 Giao diện người dùng (User Interfaces - UI/UX Wireframes)
   4.2 Giao diện phần cứng / thiết bị (Hardware Interfaces)
   4.3 Giao diện phần mềm & Dịch vụ bên thứ ba (Software / 3rd Party Interfaces)
   4.4 Giao diện truyền thông & Giao thức mạng (Communications Interfaces)
5. Yêu cầu phi chức năng (Non-Functional Requirements - NFR)
   5.1 Hiệu năng (Performance) | 5.2 An toàn bảo mật (Security)
   5.3 Độ tin cậy & Sẵn sàng (Reliability) | 5.4 Khả năng bảo trì (Maintainability)
```

---

## 2. Tiêu Chí Thẩm Định Chất Lượng Một Yêu Cầu Trong SRS (IEEE 830 Quality Checklist)
Mỗi yêu cầu chức năng (FR) được đưa vào tài liệu SRS bắt buộc phải đạt đủ 8 thuộc tính chất lượng sau:

1. **Tính Đúng Đắn (Correct):** Phản ánh chính xác mục tiêu nghiệp vụ của các bên liên quan (Stakeholders).
2. **Không Mơ Hồ (Unambiguous):** Chỉ có duy nhất một cách hiểu; tuân thủ bộ lọc chống mơ hồ `RULE-16`.
3. **Tính Đầy Đủ (Complete):** Mô tả trọn vẹn điều kiện đầu vào, tiền đề, luồng chính, luồng ngoại lệ và kết quả đầu ra.
4. **Tính Nhất Quán (Consistent):** Không mâu thuẫn với bất kỳ yêu cầu, quy tắc nghiệp vụ (`RULE-02`) hoặc tài liệu khác.
5. **Xếp Hạng Ưu Tiên (Ranked for Importance/Stability):** Được phân loại rõ mức độ ưu tiên theo MoSCoW (Must, Should, Could, Won't).
6. **Có Thể Kiểm Chứng Được (Verifiable):** Tồn tại phương pháp kiểm thử xác định rõ ràng để kiểm tra hệ thống có đạt yêu cầu hay không.
7. **Có Thể Sửa Đổi Được (Modifiable):** Cấu trúc tài liệu rõ ràng, có mục lục, mã định danh duy nhất để chỉnh sửa mà không vỡ ngữ cảnh.
8. **Có Thể Truy Vết Được (Traceable):** Có mã ID duy nhất (`FR-[MOD]-[NUM]`) liên kết 2 chiều với BRD, Use Case, Test Case (`RULE-14`).
