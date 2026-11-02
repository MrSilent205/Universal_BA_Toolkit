# Quy Chuẩn Quản Lý Phiên Bản & Lịch Sử Thay Đổi Tài Liệu (Semantic Versioning)

> **Mã quy tắc:** `RULE-19`  
> **Áp dụng cho:** Tất cả các tài liệu đặc tả, hợp đồng API và hồ sơ bàn giao dự án.

---

## 1. Cú Pháp Quản Lý Phiên Bản (Semantic Versioning for Documentation)
Mọi tài liệu phải áp dụng chuẩn quản lý phiên bản gồm 3 số:

$$\text{Phiên bản: } [\text{MAJOR}].[\text{MINOR}].[\text{PATCH}]$$

Ví dụ: `v1.0.0`, `v1.1.0`, `v1.1.2`, `v2.0.0`.

### Quy tắc tăng số phiên bản:
1. **MAJOR (vX.0.0):** Tăng khi có sự thay đổi lớn về định hướng sản phẩm, tái cấu trúc toàn diện kiến trúc nghiệp vụ, hoặc các thay đổi phá vỡ tính tương thích ngược (Breaking changes - VD: Bỏ một phân hệ cũ, thay đổi toàn bộ luồng thanh toán).
2. **MINOR (v1.X.0):** Tăng khi bổ sung thêm tính năng mới, thêm Use Case mới, mở rộng phạm vi nghiệp vụ nhưng vẫn tương thích hoàn toàn với các phần đã thống nhất trước đó.
3. **PATCH (v1.0.X):** Tăng khi sửa lỗi chính tả, làm rõ câu chữ chống mơ hồ (`RULE-16`), bổ sung kịch bản kiểm thử chi tiết hoặc sửa lỗi nhỏ trong bảng từ điển dữ liệu.

---

## 2. Bảng Lịch Sử Sửa Đổi Tài Liệu Chuẩn (Standard Revision History Table)
Mỗi tài liệu bắt buộc phải có bảng Lịch sử phiên bản đặt ngay sau trang bìa hoặc phần giới thiệu:

| Phiên Bản (Version) | Ngày Phát Hành (Release Date) | Tác Giả / Người Sửa (Author) | Phân Loại Thay Đổi (Change Type) | Tóm Tắt Chi Tiết Nội Dung Thay Đổi (Description of Change) | Người Phê Duyệt (Approved By) |
| :---: | :---: | :--- | :---: | :--- | :--- |
| `v1.0.0` | 2026-10-01 | Nguyen Van A (BA) | **Initial** | Khởi tạo tài liệu đặc tả SRS bản Baseline đầu tiên. | Tran Thi B (PO) |
| `v1.1.0` | 2026-10-15 | Nguyen Van A (BA) | **Added** | Bổ sung tính năng thanh toán bằng mã QR và đối soát tự động. | Le Van C (Tech Lead) |
| `v1.1.1` | 2026-10-20 | Pham Van D (BA) | **Fixed** | Đính chính quy tắc làm tròn số thập phân trong bảng tính phí ship. | Nguyen Van A (BA) |
| `v2.0.0` | 2026-11-02 | Nguyen Van A (BA) | **Breaking** | Tái cấu trúc quy trình từ thanh toán trả trước sang cơ chế đặt cọc 30%. | Hoi Dong CCB |

---

## 3. Các Nhãn Phân Loại Thay Đổi Tiêu Chuẩn (Keep a Changelog)
- **Added:** Bổ sung tính năng, quy tắc hoặc màn hình mới.
- **Changed:** Điều chỉnh logic, luồng xử lý hoặc giao diện hiện có.
- **Deprecated:** Cảnh báo tính năng sắp bị loại bỏ trong phiên bản tới.
- **Removed:** Xóa bỏ hoàn toàn tính năng hoặc trường dữ liệu cũ.
- **Fixed:** Sửa lỗi sai lệch logic hoặc chỉnh sửa câu từ mơ hồ.
- **Security:** Nâng cấp các biện pháp kiểm soát an toàn thông tin và bảo mật.
