---
name: brainstorm
description: "Phỏng vấn phản biện Socratic làm rõ ý tưởng nghiệp vụ thô, phát hiện góc khuất edge cases, phân định ranh giới In-Scope vs Out-of-Scope trước khi bắt tay viết đặc tả chi tiết"
metadata:
  phase: 02-elicit-spec
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /brainstorm — Phỏng vấn Làm rõ Nghiệp vụ Thô [CORE WORKFLOW]

Khởi động quy trình thu thập và tinh chế yêu cầu bằng kỹ thuật phỏng vấn phản biện Socratic (Socratic Interviewing), giúp chuyển hóa ý tưởng sơ khởi còn nhiều khoảng trống thành một phạm vi nghiệp vụ sắc nét và khả thi.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Dùng ngay khi nhận được một yêu cầu mơ hồ từ Stakeholder/PO ("Làm tính năng giỏ hàng", "Tích hợp cổng thanh toán mới", "Cần luồng đổi trả hàng tự động").
- **Đối tượng thụ hưởng**: Business Analyst, Product Owner, Solution Architect, Stakeholder.
- **Giá trị cốt lõi**: Khai phá các góc khuất nghiệp vụ (Unknown Unknowns) ngay từ đầu, ngăn chặn tình trạng làm sai hướng và tiết kiệm thời gian chỉnh sửa tài liệu đặc tả sau này.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/brainstorm [tên_tính_năng] [mô_tả_ý_tưởng_ban_đầu]`
- **Dữ liệu đầu vào cần có**:
  - Mô tả tự nhiên về tính năng hoặc nghiệp vụ mong muốn từ người dùng/khách hàng.
  - Các tài liệu tham khảo sơ khởi (nếu có: slide trình bày, ghi chú cuộc họp, mockup thô).

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/16-ambiguity-detection-rules.md` — Phát hiện và loại bỏ các tuyên bố định tính mơ hồ.
- `rules/17-actor-role-definition.md` — Xác định rõ vai trò các Actor tham gia vào luồng.
- `rules/18-knowledge-graph-metadata.md` — Metadata YAML frontmatter chuẩn liên kết tri thức.

## Biểu mẫu tham chiếu (Template)
- `_templates/04-brainstorm.md`

## Vị trí lưu tệp mặc định
- `docs/{feature}/brainstorms/{concept_name}.md`

## Quy trình thực thi chi tiết
1. **Tiếp nhận & Tóm tắt Ý tưởng Thô (Raw Input Ingestion)**:
   - Ghi nhận yêu cầu nguyên bản của người dùng, phân tách các thành phần chính: Ai muốn làm gì? Mục đích là gì?
2. **Phỏng vấn Phản biện Socratic (Deep Socratic Probe)**:
   - Đóng vai trò Senior IT BA khó tính, chủ động đặt ra 4-6 câu hỏi đào sâu vào các điểm mù:
     - *Luồng ngoại lệ & Timeout*: Khi dịch vụ bên thứ ba phản hồi chậm hoặc sập thì xử lý thế nào?
     - *Xử lý đồng thời & Race Conditions*: Hai người cùng mua sản phẩm cuối cùng tại 1 thời điểm?
     - *Hủy ngang & Đảo ngược trạng thái*: Người dùng bấm Back hoặc tắt app giữa chừng trong khi tiền đã trừ?
     - *Phân quyền & Ranh giới dữ liệu*: Chi nhánh A có thấy đơn hàng của chi nhánh B không?
     - *Khối lượng & Giới hạn biên*: Một đơn hàng có thể chứa tối đa bao nhiêu sản phẩm? Kích thước upload file tối đa?
3. **Chốt Phạm vi Nghiệp vụ (Scope Baseline Agreement)**:
   - Lập bảng phân định ranh giới rõ ràng:
     - **In-Scope (Phải làm)**: Danh sách các chức năng và kịch bản bắt buộc giải quyết trong đợt này.
     - **Out-of-Scope (Tuyệt đối hoãn lại)**: Các tính năng phụ trợ hoãn lại Phase sau để tránh phình to phạm vi.
4. **Lập Bảng Quyết định Nghiệp vụ (Key Business Decisions)**:
   - Ghi lại các quyết định đã thống nhất với stakeholder (ví dụ: Không hỗ trợ hoàn tiền tự động qua thẻ quốc tế trong MVP, bắt buộc liên hệ CSKH thủ công).
5. **Ghi tệp & Đề xuất Bước tiếp theo**:
   - Xuất nội dung theo template `_templates/04-brainstorm.md` vào `docs/{feature}/brainstorms/{concept_name}.md`.
   - Đề xuất lệnh kế tiếp: `/srs` để viết đặc tả chi tiết, hoặc `/sequence` để mô hình hóa luồng.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phỏng vấn phản biện tối thiểu 4 góc khuất nghiệp vụ (Ngoại lệ, Timeout, Race condition, Phân quyền).
- [ ] Bảng Scope phân tách rõ In-Scope và Out-of-Scope, không để lửng lơ các mục "sẽ xem xét sau".
- [ ] Ghi lại danh sách các quyết định nghiệp vụ (Business Decisions) có lý do cụ thể đi kèm.
- [ ] Toàn bộ các từ ngữ định tính mơ hồ đã được làm rõ bằng tiêu chí kỹ thuật (Rule 16).
- [ ] Có đầy đủ Frontmatter Metadata (Rule 18) chuẩn hóa.
