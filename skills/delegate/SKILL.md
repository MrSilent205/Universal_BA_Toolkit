---
name: delegate
description: "Phân chia và Ủy quyền Công việc Kỹ thuật cho Đội ngũ AI Subagents (Multi-Agent Task Delegation): bóc tách hợp đồng kỹ thuật rõ ràng cho Frontend Agent, Backend Agent, QA Automation Agent và DevOps"
metadata:
  phase: 09-handoff-ops
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /delegate — Phân chia & Ủy quyền Tác vụ Kỹ thuật Đa Tác nhân [STANDARD WORKFLOW]

Bóc tách tài liệu đặc tả kỹ thuật SRS và User Stories thành các gói nhiệm vụ kỹ thuật độc lập (Work Breakdown Packages), thiết lập hợp đồng giao tiếp rõ ràng và ủy quyền thực thi cho các AI Agent chuyên biệt (Backend Developer Agent, Frontend Developer Agent, QA Automation Agent, DevOps Agent).

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi triển khai mô hình phát triển phần mềm đa tác nhân tự hành (Autonomous Multi-Agent Development), giúp phân phối công việc song song mà không bị xung đột code hoặc hiểu nhầm yêu cầu.
- **Đối tượng thụ hưởng**: AI Coding Agents (Claude Code, Antigravity, Cursor, Windsurf), Tech Lead, Engineering Manager.
- **Giá trị cốt lõi**: Đảm bảo mỗi Subagent nhận được đúng "hợp đồng kỹ thuật" của mình kèm ranh giới rõ ràng; Frontend agent có mock API để cắt giao diện; Backend agent có schema DB để viết migrations; QA agent có tiêu chí AC để viết kịch bản test.

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/delegate [tên_tính_năng] [đường_dẫn_tai_lieu_srs]`
- **Dữ liệu đầu vào cần có**:
  - Tài liệu đặc tả kỹ thuật SRS (`docs/{feature}/srs/spec.md`).
  - Hợp đồng API (`docs/{feature}/api/api-spec.md`) và Wireframes.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Ánh xạ nhiệm vụ với mã yêu cầu FR.
- `rules/08-gherkin-acceptance-criteria.md` — Hợp đồng nghiệm thu cho QA Agent.
- `rules/10-api-contract-standards.md` — Hợp đồng giao tiếp giữa Frontend và Backend.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- Áp dụng cấu trúc phân rã công việc dựa trên `_templates/08-srs.md` và `_templates/27-userstory.md`.

## Vị trí lưu tệp mặc định
- `docs/{feature}/delegation-plan.md`

## Quy trình thực thi chi tiết
1. **Phân tích Ranh giới Công việc theo 4 Vai trò Kỹ thuật**:
   - **Gói 1: Backend Developer Agent**:
     - *Nhiệm vụ*: Tạo database migrations, ORM models, Service logic kiểm tra `BR-xxx`, REST API endpoints và xử lý mã lỗi `ERR-xxx`.
     - *Hợp đồng nhận*: API Spec (`docs/{feature}/api/api-spec.md`) và Schema ERD.
     - *Hợp đồng trả*: API chạy được, pass kiểm thử unit test.
   - **Gói 2: Frontend Developer Agent**:
     - *Nhiệm vụ*: Cắt giao diện theo Wireframe HTML, cài đặt client state, form validation và kết nối API.
     - *Hợp đồng nhận*: Wireframe HTML (`docs/{feature}/html-wireframe/`) và API Spec mock response.
     - *Hợp đồng trả*: Giao diện web/mobile chạy được, đáp ứng responsive.
   - **Gói 3: QA Automation Agent**:
     - *Nhiệm vụ*: Viết kịch bản kiểm thử tự động Playwright E2E và Bruno API collections.
     - *Hợp đồng nhận*: Kịch bản Acceptance Criteria Gherkin (`docs/{feature}/userstories/acceptance-criteria.md`).
     - *Hợp đồng trả*: Bộ test scripts pass 100% khi chạy qua CLI.
   - **Gói 4: DevOps / Infrastructure Agent**:
     - *Nhiệm vụ*: Thiết lập CI/CD pipeline, cấu hình biến môi trường, bảo mật Secrets và kiểm tra tải.
     - *Hợp đồng nhận*: Checklist sẵn sàng production (`docs/{feature}/api/production-readiness.md`).
2. **Thiết lập Chuỗi Phụ thuộc & Thứ tự Triển khai (Execution Order)**:
   - Bước 1: Backend Agent tạo Migration và Mock API Server.
   - Bước 2: Frontend Agent và QA Agent tiến hành lập trình song song dựa trên Mock API.
   - Bước 3: Backend Agent hoàn thành logic nghiệp vụ thật và kết nối Database.
   - Bước 4: Tích hợp Frontend với Backend thật; QA Agent kích hoạt chạy toàn bộ test suite.
3. **Ghi tệp Kế hoạch Ủy quyền**:
   - Lưu vào `docs/{feature}/delegation-plan.md`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Phân chia rõ ràng 4 gói nhiệm vụ kỹ thuật độc lập, không bị chồng lấn trách nhiệm.
- [ ] Mỗi gói nhiệm vụ đều có hợp đồng đầu vào (Input Contract) và đầu ra (Deliverable) rõ ràng.
- [ ] Có sơ đồ thứ tự thực thi tuần tự và song song giữa các Agents.
- [ ] Các Agent có thể làm việc độc lập mà không bị nghẽn (Block) nhờ có Mock Data.
