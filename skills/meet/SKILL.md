---
name: meet
description: "Soạn thảo Biên bản Cuộc họp Dự án Chuẩn mực (Meeting Minutes & Action Items): ghi nhận bối cảnh, thành phần tham dự, các quyết định nghiệp vụ đã chốt, danh mục câu hỏi tồn đọng và bảng phân công Action Items có deadline"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /meet — Biên bản Cuộc họp & Bảng Phân công Hành động (Meeting Minutes) [STANDARD WORKFLOW]

Chuyển hóa các bản ghi chép nháp hoặc bản ghi âm/transcript cuộc họp thành một Biên bản Cuộc họp chuyên nghiệp (Meeting Minutes), tổng hợp các quyết định nghiệp vụ cốt lõi, ghi nhận các vấn đề chưa thống nhất và thiết lập bảng phân công công việc (Action Items) với người chịu trách nhiệm và thời hạn hoàn thành cụ thể.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện sau mỗi buổi họp quan trọng: Họp lấy yêu cầu với khách hàng, Họp giải quyết vướng mắc kiến trúc, Họp phân tích tác động Change Request, Họp bàn giao Sprint.
- **Đối tượng thụ hưởng**: Toàn bộ thành viên tham gia cuộc họp, Stakeholders vắng mặt, Ban Quản lý Dự án.
- **Giá trị cốt lõi**: Chấm dứt tình trạng "họp xong rồi để đấy", không ai nhớ đã thống nhất điều gì; tạo bằng chứng minh bạch về các quyết định nghiệp vụ đã chốt, bảo vệ BA và Dev khỏi các khiếu nại thay đổi sau này.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/meet [tiêu_đề_cuộc_họp] [nội_dung_ghi_chép_nháp_hoặc_transcript]`
- **Dữ liệu đầu vào cần có**:
  - Ghi chép thô trong cuộc họp hoặc file transcript ghi âm.
  - Ngày họp, địa điểm / link họp và danh sách thành viên tham gia.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/15-change-request-impact-matrix.md` — Nhận diện các quyết định làm thay đổi phạm vi.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/48-meeting-minutes.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/meetings/MM-YYYY-MM-DD-{topic}.md` (hoặc `docs/meetings/`)

## Quy trình thực thi chi tiết
1. **Thiết lập Thông tin Hành chính Cuộc họp (Administrative Header)**:
   - Tiêu đề cuộc họp: Nêu bật chủ đề chính.
   - Thời gian & Địa điểm: Ngày, giờ bắt đầu/kết thúc, phòng họp hoặc link Google Meet / Zoom.
   - Thành phần tham dự: Danh sách người có mặt (Present) và người vắng mặt (Absent).
2. **Tóm tắt Mục tiêu & Bối cảnh Buổi họp (Agenda & Objectives)**:
   - Tóm tắt ngắn gọn trong 2-3 câu: Cuộc họp này được tổ chức để giải quyết vấn đề gì?
3. **Tổng hợp Các Quyết định Nghiệp vụ Đã Chốt (Key Decisions Log)**:
   - Đánh số rõ ràng từng quyết định đã đạt được sự đồng thuận:
     - `DEC-01`: Đồng ý phương án xác thực người dùng qua OTP SMS thay vì gửi email.
     - `DEC-02`: Giới hạn giá trị giao dịch tối đa 50 triệu VNĐ/ngày trong giai đoạn thử nghiệm.
4. **Ghi nhận Các Vấn đề Chưa Thống nhất (Open Issues & Discussion Points)**:
   - Các điểm còn bất đồng ý kiến hoặc cần xin thêm ý kiến lãnh đạo: ghi rõ ai đang giữ quan điểm nào và thời hạn cần chốt phương án.
5. **Lập Bảng Phân công Công việc Cụ thể (Action Items Table)**:
   - Lập bảng 4 cột bắt buộc:
     1. `STT / Mã việc`: `ACT-01`, `ACT-02`.
     2. `Nội dung Công việc Cụ thể`: Hành động đo lường được (không viết chung chung).
     3. `Người Phụ trách (Assignee)`: Tên 1 người duy nhất chịu trách nhiệm chính.
     4. `Thời hạn Hoàn thành (Deadline)`: Ngày giờ cụ thể (ví dụ: `2026-11-05 17:00`).
6. **Ghi tệp**:
   - Sử dụng template `_templates/48-meeting-minutes.md` và lưu vào `docs/{feature}/meetings/MM-YYYY-MM-DD-{topic}.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Ghi nhận đầy đủ thông tin thời gian, địa điểm và danh sách thành viên tham dự.
- [ ] Phần Quyết định (Decisions) rõ ràng, khẳng định dứt khoát, không dùng câu lấp lửng.
- [ ] Mọi đầu việc trong bảng Action Items đều có duy nhất 1 người phụ trách và có Deadline cụ thể.
- [ ] Đánh số mã `DEC-` và `ACT-` nhất quán để tiện theo dõi trong các cuộc họp kế tiếp.
