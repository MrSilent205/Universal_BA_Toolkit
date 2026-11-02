---
name: user-flow
description: "Mô hình hóa luồng di chuyển màn hình của người dùng (User Flow & Screen Transitions): thể hiện điểm chạm, các quyết định chuyển trang, các trạng thái UI (Empty, Loading, Error) và kịch bản hủy ngang"
metadata:
  phase: 05-screen-design
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /user-flow — Phân tích Luồng Người dùng & Chuyển dịch Màn hình [CORE WORKFLOW]

Mô hình hóa đường đi trực quan của người dùng (User Navigation Flow) qua từng giao diện màn hình từ lúc bắt đầu cho đến khi hoàn thành mục tiêu, làm rõ các hành động kích hoạt chuyển trang, các điểm rẽ nhánh và 5 trạng thái thiết yếu của mỗi màn hình.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trước khi vẽ Wireframe hoặc bàn giao cho đội ngũ UI/UX Designer, nhằm đảm bảo mọi hành vi click, vuốt hoặc submit đều có màn hình đích tương ứng.
- **Đối tượng thụ hưởng**: UI/UX Designers, Frontend Developers, Product Owner, QA Engineers.
- **Giá trị cốt lõi**: Tránh tình trạng "màn hình mồ côi" (Orphan Screens) hoặc luồng cụt không có lối thoát; phát hiện sớm các bước thừa thãi gây drop-off khách hàng trước khi vẽ thiết kế đắt đỏ trên Figma.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/user-flow [tên_tính_năng] [danh_sách_màn_hình_chính]`
- **Dữ liệu đầu vào cần có**:
  - Ca sử dụng (`UC-xxx`) hoặc User Story (`US-xxx`).
  - Danh sách các màn hình và modal dự kiến.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Quy tắc nghiệp vụ kiểm soát việc cho phép chuyển trang.
- `rules/03-err-naming-convention.md` — Mã lỗi hiển thị khi chuyển trang thất bại.
- `rules/16-ambiguity-detection-rules.md` — Loại bỏ mô tả luồng định tính.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/29-user-flow.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/ui/user-flow.md`

## Quy trình thực thi chi tiết
1. **Lập Danh mục Màn hình (Screen Inventory)**:
   - Đánh mã định danh màn hình: `SCR-[MODULE]-[SEQ]` (ví dụ: `SCR-ORD-001: Giỏ hàng`, `SCR-ORD-002: Chọn địa chỉ giao hàng`, `SCR-ORD-003: Xác nhận thanh toán`, `SCR-ORD-004: Kết quả đặt hàng`).
2. **Vẽ Sơ đồ Chuyển dịch Màn hình bằng Mermaid Flowchart**:
   - Sử dụng khối chữ nhật bo góc cho Màn hình chính, khối hình bình hành cho Modal/Popup, hình thoi cho Quyết định người dùng.
   - Ghi rõ hành động kích hoạt trên các mũi tên: `SCR-001 -->|Bấm Thanh toán [Tồn kho đủ]| SCR-002`.
3. **Đặc tả 5 Trạng thái Cốt lõi của Từng Màn hình (The 5 UI States)**:
   - Với mỗi màn hình, bắt buộc mô tả hành vi ở 5 trạng thái:
     - *Ideal / Normal State*: Có đầy đủ dữ liệu hoàn hảo.
     - *Loading State*: Trạng thái chờ API (Skeleton loader, Spinner, cấm click đúp).
     - *Empty State*: Chưa có dữ liệu (Giỏ hàng trống, chưa có đơn nào) kèm nút kêu gọi hành động (CTA).
     - *Error State*: Lỗi mất mạng, lỗi server 500, lỗi validation kèm thông báo `ERR-xxx`.
     - *Partial / Offline State*: Mất kết nối mạng tạm thời, hiển thị dữ liệu cache và nút "Thử lại".
4. **Phủ Kín Luồng Ngoại lệ & Quay lui (Rollback & Back Flows)**:
   - Mô tả nút "Quay lại" (Back button) hoặc nút "Hủy": người dùng sẽ quay về màn hình nào, form có giữ lại dữ liệu đã nhập hay bị reset?
5. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/29-user-flow.md` và lưu vào `docs/{feature}/ui/user-flow.md`.
   - Đề xuất lệnh kế tiếp: `/wireframe-ascii` để xem nhanh trong chat hoặc `/wireframe-html` để dựng bản demo bấm được.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] 100% các màn hình trong luồng đều có mã định danh `SCR-[MODULE]-[SEQ]`.
- [ ] Sơ đồ luồng thể hiện đầy đủ cả Happy Path, nhánh lỗi và luồng người dùng bấm Quay lại/Hủy.
- [ ] Đặc tả đầy đủ 5 trạng thái UI (Ideal, Loading, Empty, Error, Partial/Offline).
- [ ] Không có màn hình cụt (Dead-end) thiếu nút điều hướng tiếp theo hoặc nút thoát.
- [ ] Gắn mã lỗi `ERR-` cụ thể cho các màn hình/thông báo lỗi.
