---
name: activity
description: "Mô hình hóa luồng xử lý nghiệp vụ bằng sơ đồ hoạt động (Activity Diagram): thể hiện điểm bắt đầu/kết thúc, các bước xử lý tuần tự, rẽ nhánh điều kiện và luồng song song"
metadata:
  phase: 03-diagrams
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /activity — Sơ đồ Hoạt động Nghiệp vụ (Activity Diagram) 🌟 [CORE WORKFLOW]

Mô hình hóa các bước thực thi công việc và dòng chảy điều khiển (Control Flow) trong quy trình nghiệp vụ bằng sơ đồ hoạt động Mermaid flowchart, làm rõ các quyết định logic rẽ nhánh và các tác vụ có thể thực hiện song song.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Sử dụng khi phân tích một luồng quy trình phức tạp có nhiều điều kiện phân nhánh (ví dụ: Quy trình phê duyệt khoản vay, Quy trình hoàn tiền đổi trả, Luồng tính giá khuyến mãi lũy tiến).
- **Đối tượng thụ hưởng**: Business Analyst, Software Developers, QA Engineers, Operations Team.
- **Giá trị cốt lõi**: Cung cấp bức tranh toàn cảnh về mặt logic, giúp đội ngũ kỹ thuật nhìn thấy mọi ngã rẽ của dữ liệu, ngăn ngừa tình trạng bỏ sót các trường hợp ngoại lệ trong code.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/activity [tên_quy_trình] [mô_tả_nghiệp_vụ]`
- **Dữ liệu đầu vào cần có**:
  - Quy tắc nghiệp vụ (`BR-xxx`) chi phối luồng xử lý.
  - Danh sách các bước thao tác và điều kiện kiểm tra dữ liệu.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/02-br-naming-convention.md` — Ánh xạ các điều kiện rẽ nhánh với mã Business Rules.
- `rules/16-ambiguity-detection-rules.md` — Làm rõ điều kiện rẽ nhánh bằng logic đo đếm được.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/16-activity-diagram.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/srs/activity.md`

## Quy trình thực thi chi tiết
1. **Xác định Ranh giới Quy trình (Start & End Boundaries)**:
   - Xác định điểm kích hoạt bắt đầu (`([Bắt đầu])` hoặc `[*]`).
   - Xác định toàn bộ các trạng thái kết thúc có thể xảy ra: Thành công, Bị từ chối, Hết hạn, Hủy bỏ.
2. **Mô hình hóa Cú pháp Mermaid Flowchart Chuẩn (`flowchart TD` / `flowchart LR`)**:
   - Sử dụng hình chữ nhật bo tròn `([Tên bước])` cho các hành động xử lý.
   - Sử dụng hình thoi `{Điều kiện kiểm tra?}` cho các điểm rẽ nhánh quyết định (Decision Diamonds).
   - Đặt nhãn rõ ràng trên các đường nối: `-->|Có / Hợp lệ|` và `-->|Không / Lỗi|`.
3. **Ánh xạ Logic Nghiệp vụ Chặt chẽ**:
   - Gắn nhãn mã `BR-xxx` tại các hình thoi kiểm tra điều kiện (ví dụ: `{BR-SEC-002: Sai pass >= 5 lần?}`).
   - Thể hiện rõ các vòng lặp (Loops): quay lại bước trước để nhập lại hoặc gửi lại OTP (kèm điều kiện thoát để chống lặp vô tận).
4. **Mô hình hóa Tác vụ Song song (Fork & Join / Parallel Streams)**:
   - Sử dụng thanh phân nhánh (Fork) khi hệ thống kích hoạt đồng thời nhiều hành động (ví dụ: vừa trừ tiền trong tài khoản vừa gửi SMS thông báo).
   - Sử dụng thanh gom luồng (Join) khi quy trình bắt buộc phải đợi toàn bộ các nhánh hoàn tất trước khi chuyển sang bước kế tiếp.
5. **Ghi tệp & Xuất bản**:
   - Sử dụng template `_templates/16-activity-diagram.md` và lưu vào `docs/{feature}/srs/activity.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Có đầy đủ điểm bắt đầu (Start) và toàn bộ các điểm kết thúc (Terminal Nodes).
- [ ] Mọi điểm rẽ nhánh hình thoi (Decision) đều có ít nhất 2 hướng đi với nhãn điều kiện rõ ràng (`Đúng / Sai`, `Có / Không`).
- [ ] Tuyệt đối không có "nút thắt chết" (Dead-end node) hoặc vòng lặp vô tận không có điều kiện thoát.
- [ ] Ánh xạ rõ ràng các mã quy tắc nghiệp vụ `BR-` vào các điểm kiểm tra.
- [ ] Cú pháp Mermaid hợp lệ, render mượt mà không bị lỗi cú pháp.
