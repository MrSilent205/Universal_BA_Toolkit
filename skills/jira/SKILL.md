---
name: jira
description: "Chuyển đổi và xuất bản Backlog sang định dạng Jira CSV / Jira Cloud API: cấu trúc Epics, Stories, Story Points Fibonacci, kịch bản Gherkin AC và Labels phân hệ"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /jira — Xuất bản & Đồng bộ Backlog sang Jira Cloud [STANDARD WORKFLOW]

Chuyển hóa danh mục User Stories và Acceptance Criteria trong tài liệu thành định dạng tệp CSV chuẩn hóa hoặc payload REST API v3 tương thích 100% với Jira Cloud, giúp Product Owner và Scrum Master import toàn bộ backlog vào Jira trong 30 giây mà không cần copy-paste thủ công.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trước mỗi đợt Sprint Planning, khi đội ngũ đã hoàn thành phân rã story và chốt AC, cần đưa các hạng mục công việc lên Jira Software để quản lý bảng Kanban/Scrum.
- **Đối tượng thụ hưởng**: Product Owner, Scrum Master, Agile Coach, Developers.
- **Giá trị cốt lõi**: Tiết kiệm hàng giờ nhập liệu thủ công nhàm chán; đảm bảo 100% các trường thông tin (Issue Type, Summary, Description, Story Points, Acceptance Criteria, Priority, Component) đều được mapping chính xác vào các trường tùy biến (Custom Fields) trên Jira.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/jira [tên_tính_năng] [tùy_chọn: export-csv | json-payload]`
- **Dữ liệu đầu vào cần có**:
  - Danh mục User Stories (`docs/{feature}/userstories/backlog.md`).
  - Tiêu chí chấp nhận AC (`docs/{feature}/userstories/acceptance-criteria.md`).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/07-invest-user-story.md` — Chuẩn hóa câu User Story.
- `rules/08-gherkin-acceptance-criteria.md` — Chuẩn hóa kịch bản Gherkin BDD.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/27-userstory.md` (kèm kịch bản AC `_templates/28-acceptance-criteria.md`)

## Vị trí lưu tệp mặc định
- `docs/{feature}/jira/jira-import.csv` (hoặc `docs/jira-sync-log.md`)

## Quy trình thực thi chi tiết
1. **Trích xuất Toàn bộ Dữ liệu Backlog**:
   - Đọc danh sách User Stories (`US-xxx`) và các kịch bản AC tương ứng.
2. **Thiết lập Cấu trúc Cột Chuẩn Jira CSV Import**:
   - Chuẩn hóa các cột bắt buộc:
     1. `Issue Type`: `Epic` hoặc `Story`.
     2. `Issue ID`: Mã định danh tạm để liên kết quan hệ (ví dụ: `1`, `2`, `3`).
     3. `Parent ID`: Dùng để gắn Story vào Epic tương ứng.
     4. `Summary`: Tiêu đề ngắn gọn dạng `[US-MODULE-001] Động từ + Tân ngữ`.
     5. `Description`: Cấu trúc câu Connextra (Là một... Tôi muốn... Để...).
     6. `Acceptance Criteria`: Toàn bộ các kịch bản Given/When/Then định dạng Markdown.
     7. `Story Points`: Điểm Fibonacci (1, 2, 3, 5, 8).
     8. `Priority`: `Highest` (P0), `High` (P1), `Medium` (P2), `Low`.
     9. `Component / Epic Name`: Tên phân hệ nghiệp vụ.
     10. `Labels`: Các nhãn phân loại (ví dụ: `mvp`, `backend`, `frontend`, `auth`).
3. **Xử lý Xuống dòng & Ký tự Đặc biệt trong CSV**:
   - Bao bọc toàn bộ trường `Description` và `Acceptance Criteria` bằng dấu ngoặc kép `""`.
   - Thay thế các dấu ngoặc kép bên trong thành cặp dấu ngoặc kép kép `""` để tránh vỡ cột khi import vào Jira.
4. **Tạo Tệp Hướng dẫn Import Nhanh**:
   - Kèm theo bảng hướng dẫn mapping các trường trong giao diện Jira External System Import.
5. **Ghi tệp**:
   - Lưu vào `docs/{feature}/jira/jira-import.csv`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Tệp CSV đạt chuẩn UTF-8 with BOM (đảm bảo hiển thị đúng tiếng Việt có dấu trên Excel và Jira).
- [ ] Toàn bộ các Story đều có liên kết chính xác với Parent Epic.
- [ ] Định dạng Acceptance Criteria giữ nguyên vẹn cấu trúc kịch bản Given/When/Then.
- [ ] Điểm Story Points tuân thủ dãy số Fibonacci chuẩn Agile.
- [ ] Import thử nghiệm thành công vào Jira mà không gặp lỗi lệch cột hay lỗi encoding.
