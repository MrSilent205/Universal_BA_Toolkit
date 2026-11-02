# Quy Chuẩn Xây Dựng Từ Điển Dữ Liệu Nghiệp Vụ (Data Dictionary Standard)

> **Mã quy tắc:** `RULE-09`  
> **Áp dụng cho:** Tất cả các bảng dữ liệu, thuộc tính thực thể trong SRS, ERD và API Specs.

---

## 1. Cấu Trúc Bảng Từ Điển Dữ Liệu 10 Cột Chuẩn
Mỗi bảng hoặc thực thể dữ liệu trong tài liệu đặc tả bắt buộc phải được mô tả đầy đủ qua 10 cột tiêu chuẩn sau:

| Tên Thuộc Tính (Logical Field) | Tên Cột Cơ Sở Dữ Liệu (Physical DB) | Kiểu Dữ Liệu & Độ Rộng (Data Type) | Bắt Buộc (Nullability) | Khóa (Key Constraint) | Giá Trị Mặc Định (Default) | Ràng Buộc Miền Giá Trị (Validation Rules) | Mức Độ Nhạy Cảm (Data Sensitivity) | Quy Tắc Che Giấu (Masking Rule) | Mô Tả Nghiệp Vụ & Ý Nghĩa (Business Description) |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :---: | :--- | :--- |
| `id` | `id` | UUID | NOT NULL | PK | `gen_random_uuid()` | Định dạng UUID v4 hợp lệ | Internal | Không che | Khóa chính duy nhất định danh bản ghi. |
| `so_dien_thoai` | `phone_number` | VARCHAR(15) | NOT NULL | Unique | None | Regex: `^(\\+84\|0)[3\|5\|7\|8\|9][0-9]{8}$` | **PII (Confidential)** | Che 4 số giữa: `090****123` | Số điện thoại liên hệ chính của khách hàng. |
| `email` | `email` | VARCHAR(255)| NOT NULL | Unique | None | Regex RFC 5322, viết thường (lowercase) | **PII (Confidential)** | Che username: `u***r@domain.com` | Email nhận thông báo và hóa đơn điện tử. |
| `mat_khau_ma_hoa`| `password_hash` | VARCHAR(255)| NOT NULL | None | None | Hash bằng thuật toán Argon2id hoặc Bcrypt | **Restricted** | Không bao giờ hiển thị ra API/UI | Mật khẩu tài khoản đã được băm an toàn. |
| `trang_thai` | `status` | VARCHAR(30) | NOT NULL | None | `'PENDING'` | Enum: `['PENDING', 'ACTIVE', 'LOCKED']` | Public | Không che | Trạng thái vòng đời của thực thể. |
| `tong_tien` | `total_amount` | DECIMAL(15,2)| NOT NULL | None | `0.00` | Giá trị $\ge 0.00$; tối đa 2 số thập phân | Internal | Không che | Tổng giá trị đơn hàng sau giảm giá và thuế. |
| `ngay_tao` | `created_at` | TIMESTAMPTZ | NOT NULL | None | `CURRENT_TIMESTAMP`| Chuẩn ISO 8601 kèm múi giờ (UTC) | Public | Không che | Thời điểm bản ghi được khởi tạo trong hệ thống. |
| `ngay_cap_nhat` | `updated_at` | TIMESTAMPTZ | NULL | None | None | Cập nhật tự động khi bản ghi thay đổi | Public | Không che | Thời điểm gần nhất thông tin được cập nhật. |

---

## 2. Bảng Đối Chiếu Kiểu Dữ Liệu (Cross-Platform Data Type Mapping)
Để đảm bảo tính nhất quán giữa BA, Database Administrator, Backend Developer và Frontend Developer:

| Khái Niệm Nghiệp Vụ | PostgreSQL | MySQL 8.0 | TypeScript | JSON Schema | Ghi Chú Kỹ Thuật |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Khóa chính định danh | `UUID` | `CHAR(36)` | `string` | `{"type": "string", "format": "uuid"}` | Ưu tiên UUIDv4 hoặc ULID |
| Tiền tệ, Số tiền giao dịch | `DECIMAL(15,2)` | `DECIMAL(15,2)` | `number` / `string` | `{"type": "number", "minimum": 0}` | Tránh lỗi làm tròn IEEE 754 |
| Thời gian có múi giờ | `TIMESTAMPTZ` | `DATETIME(6)` | `string` (ISO 8601) | `{"type": "string", "format": "date-time"}` | Luôn lưu trữ UTC tại DB |
| Cờ logic nhị phân | `BOOLEAN` | `TINYINT(1)` | `boolean` | `{"type": "boolean"}` | Giá trị: `true` / `false` |
| Tập trạng thái hữu hạn | `ENUM` / `VARCHAR` | `ENUM` / `VARCHAR`| `'VAL1' \| 'VAL2'` | `{"type": "string", "enum": [...]}` | Quy định trong `RULE-12` |
| Dữ liệu có cấu trúc động | `JSONB` | `JSON` | `Record<string, any>`| `{"type": "object"}` | Không đánh index toàn phần |

---

## 3. Phân Cấp Mức Độ Nhạy Cảm Dữ Liệu & Quy Chuẩn Che Giấu (Data Masking)
Mọi trường dữ liệu phải được gắn 1 trong 4 nhãn phân loại bảo mật:
1. **Public (Công khai):** Thông tin không gây hại nếu lộ ra ngoài (VD: Tên sản phẩm, mô tả công khai, slug danh mục).
2. **Internal (Nội bộ):** Thông tin dùng trong nội bộ doanh nghiệp (VD: Mã đơn hàng, ngày tạo, tổng số lượng tồn kho).
3. **Confidential - PII (Bảo mật thông tin cá nhân):** Dữ liệu định danh cá nhân theo Nghị định 13/2023/NĐ-CP (VD: Họ tên, số CMND/CCCD, email, số điện thoại, địa chỉ nhà). **Bắt buộc che giấu (masking) trên giao diện quản trị viên thông thường.**
4. **Restricted (Tối mật):** Dữ liệu tài chính, bí mật công nghệ hoặc thông tin xác thực (VD: Mật khẩu hash, mã PIN, mã CVV, Private Key). **Nghiêm cấm trả về qua API người dùng.**
