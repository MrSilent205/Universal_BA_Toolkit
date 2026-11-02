---
name: update-overview
description: "Cập nhật và Đồng bộ Hồ sơ Tổng quan Dự án (Project Overview & README Synchronizer): rà soát toàn bộ thay đổi tính năng để cập nhật README, kiến trúc tổng thể và tài liệu dùng chung"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /update-overview — Cập nhật & Đồng bộ Hồ sơ Tổng quan Dự án [STANDARD WORKFLOW]

Quét toàn bộ các thay đổi mới nhất về tính năng, quy tắc nghiệp vụ và sơ đồ trong thư mục `docs/`, tự động đồng bộ và cập nhật lại các tài liệu dùng chung ở mức độ toàn dự án như `README.md`, `README_VI.md`, tài liệu Kiến trúc Tổng thể và bản đồ phân hệ.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện ở cuối mỗi Sprint, sau khi hoàn thành một đợt phát hành mới hoặc sau khi xử lý thành công một yêu cầu thay đổi (Change Request).
- **Đối tượng thụ hưởng**: Toàn bộ thành viên dự án, Khách hàng, Thành viên mới tham gia dự án.
- **Giá trị cốt lõi**: Đảm bảo tệp mặt tiền `README.md` của dự án không bao giờ bị lỗi thời; bất kỳ ai clone repository về máy đều nhìn thấy bức tranh mới nhất, chính xác nhất về các tính năng đang có trong hệ thống.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/update-overview [tùy_chọn: full-sync | feature_name]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ thư mục `docs/`.
  - File `README.md` và `README_VI.md` hiện tại ở thư mục gốc.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Cập nhật danh mục phân hệ.
- `rules/18-knowledge-graph-metadata.md` — Quét metadata toàn dự án.
- `rules/19-document-versioning-rules.md` — Đồng bộ phiên bản tài liệu.

## Biểu mẫu tham chiếu (Template)
- Áp dụng chuẩn cấu trúc tổng quan từ `_templates/01-prd.md`.

## Vị trí lưu tệp mặc định
- `README.md`, `README_VI.md` và `docs/overview.md`

## Quy trình thực thi chi tiết
1. **Quét Danh mục Tính năng Mới & Đã Sửa đổi**:
   - Quét các thư mục `docs/{feature}/`: nhận diện các tính năng mới được tạo, các phân hệ đã được nghiệm thu hoặc các yêu cầu thay đổi `CR-` vừa được phê duyệt.
2. **Cập nhật Bảng Tổng kết Tính năng trong README**:
   - Cập nhật số lượng kỹ năng/tính năng, phân loại trạng thái hoàn thiện.
   - Thêm đường dẫn liên kết đến các tài liệu mới trong cấu trúc thư mục.
3. **Đồng bộ Song ngữ Tiếng Việt & Tiếng Anh**:
   - Cập nhật song song cả 2 bản `README.md` (English) và `README_VI.md` (Tiếng Việt) để bảo đảm tính nhất quán toàn diện.
4. **Cập nhật Bản đồ Phụ thuộc Dùng chung (Cross-Module Map)**:
   - Nếu có module mới ra đời, cập nhật mối quan hệ phụ thuộc trong file kiến trúc dùng chung `docs/architecture-overview.md`.
5. **Ghi tệp & Xác nhận**:
   - Ghi lại các thay đổi vào `README.md`, `README_VI.md` và các file tổng quan tương ứng.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Bảng tổng hợp tính năng trong README phản ánh chính xác 100% tình trạng tài liệu hiện có.
- [ ] Đồng bộ hóa hoàn hảo cả 2 ngôn ngữ Tiếng Anh và Tiếng Việt.
- [ ] Toàn bộ các đường link liên kết nội bộ trong file README hoạt động tốt, không có link chết (Broken link).
- [ ] Đóng dấu ngày cập nhật mới nhất ở chân trang.
