# Universal BA Toolkit  — Bộ kỹ Năng Cho IT Business Analyst & Product Owner áp dụng cho AI Agents

> **Bản tiếng Anh (English Version):** [README.md](README.md)

**Universal BA Toolkit (BA-Kit Open)** là bộ công cụ mã nguồn mở gồm **56 Kỹ năng Thực chiến (Skills)**, **19 Quy tắc Nghiệp vụ Bắt buộc (Rules)** và **47 Biểu mẫu Chuẩn hóa (Templates)**. Bộ công cụ giúp các kỹ sư phân tích nghiệp vụ (Business Analyst), Product Owner và các AI Coding Agent (Claude Code, Antigravity, OpenAI Codex, Hermes Agent, Cursor, Windsurf) tự động hóa và chuẩn hóa toàn bộ chu kỳ đặc tả phần mềm theo tiêu chuẩn quốc tế.

Giải pháp hỗ trợ toàn diện: từ khơi gợi ý tưởng thô ban đầu, phỏng vấn lấy yêu cầu, thiết lập tài liệu SRS theo chuẩn IEEE 830, mô hình hóa kiến trúc và sơ đồ trực quan, dựng wireframe đơn sắc tương tác, bóc tách backlog Agile theo chuẩn INVEST, viết tiêu chí nghiệm thu Gherkin BDD, cho tới lập ma trận kiểm thử truy vết và phân tích tác động thay đổi (Change Request).

---

## Vấn Đề: Cầu Nối Giữa Yêu Cầu Nghiệp Vụ Và Mã Nguồn

Các công cụ lập trình tự động hiện đại rất mạnh ở khâu viết mã, nhưng thường thất bại khi yêu cầu đầu vào bị mơ hồ, thiếu nhất quán hoặc không có đặc tả kiểm soát biên.

```
Yêu cầu Mơ hồ ──> Giả định Sai lệch ──> Khiếm khuyết & Sửa lỗi liên tục ──> Vỡ tiến độ Sprint
                                         VS
Khái niệm Thô  ──[ Universal BA Toolkit ]──> Đặc tả Chuẩn mực & Mô hình Trực quan ──> Mã nguồn Chính xác
```

1. **Loại Bỏ Sự Mơ Hồ (Deterministic Specs):** 19 quy tắc tự động nhận diện và loại trừ các từ ngữ cảm tính (*"nhanh chóng"*, *"thân thiện"*, *"bảo mật cao"*, *"tự động"*), thay thế bằng các chỉ số định lượng đo lường được và hệ thống mã định danh chuẩn (`FR-`, `BR-`, `ERR-`, `UC-`, `US-`).
2. **Trực Quan Hóa Chuẩn Xuất Bản:** Tích hợp bộ engine **Diagram Design (v2.6)** để chuyển đổi sơ đồ Mermaid sang bản vẽ HTML và vector SVG độc lập, mở được ngay trên trình duyệt mà không cần cài đặt thêm phần mềm.
3. **Truy Vết Hai Chiều (Bi-directional Traceability):** Đảm bảo tính liên kết xuyên suốt từ `Mục tiêu (PRD/BRD)` $\rightarrow$ `Đặc tả (SRS)` $\rightarrow$ `Quy tắc (BR)` $\rightarrow$ `User Story` $\rightarrow$ `Acceptance Criteria` $\rightarrow$ `Test Cases`.
4. **Bàn Giao Một Chạm Cho Stakeholder (`/preview`):** Tự động đóng gói toàn bộ hồ sơ tính năng thành một cổng tài liệu HTML duy nhất để khách hàng và đội ngũ kỹ thuật duyệt nhanh chóng.

---

## Cấu Trúc Thư Mục Dự Án

```
Universal_BA_Toolkit/
├── skills/                     # 56 Kỹ năng chuẩn hóa theo định dạng Agent Skills
│   ├── brainstorm/             # Phỏng vấn khơi gợi ý tưởng và xác định ranh giới phạm vi
│   ├── srs/                    # Sinh đặc tả kỹ thuật IEEE 830 / ISO 29148
│   ├── sequence/               # Mô hình hóa luồng tuần tự tương tác hệ thống
│   ├── render-diagrams/        # Script kết xuất Mermaid sang HTML và SVG độc lập
│   ├── diagram-design/         # Hệ thống 45 loại sơ đồ trực quan chuẩn editorial
│   ├── erd/                    # Sơ đồ quan hệ thực thể dữ liệu
│   ├── wireframe-html/         # Wireframe HTML đơn sắc, chạy offline, zero CDN
│   ├── userstory/              # Bóc tách User Story chuẩn INVEST
│   ├── ac/                     # Tiêu chí nghiệm thu BDD Gherkin (Happy/Negative/Boundary)
│   ├── test-cases/             # Bộ kịch bản kiểm thử 8 cột khớp Error Matrix và RTM
│   ├── preview/                # Trang tổng duyệt hồ sơ tương tác cho stakeholder
│   ├── cr/                     # Phân tích tác động yêu cầu thay đổi 4 chiều kích
│   └── ... (đầy đủ 56 skills)
├── rules/                      # 19 Quy tắc phân tích nghiệp vụ bắt buộc tuân thủ
│   ├── 01-fr-naming-convention.md          # Quy chuẩn mã hóa và cấu trúc đặc tả FR
│   ├── 02-br-naming-convention.md          # Quy chuẩn logic quy tắc nghiệp vụ (WHEN/THEN/UNLESS)
│   ├── 03-err-naming-convention.md         # Chuẩn mã lỗi RFC 7807 và đối chiếu HTTP Status
│   ├── 04-nfr-standards.md                 # Quy chuẩn định lượng NFR theo ISO/IEC 25010
│   ├── 05-srs-ieee-830.md                  # Cấu trúc khung đặc tả SRS chuẩn IEEE 830
│   ├── 06-cockburn-use-case.md             # Tiêu chuẩn đặc tả Use Case 12 mục của Alistair Cockburn
│   ├── 07-invest-user-story.md             # Thẩm định INVEST và kỹ thuật chia nhỏ SPIDR
│   ├── 08-gherkin-acceptance-criteria.md   # Cú pháp BDD Gherkin và Scenario Outline
│   ├── 09-data-dictionary-standard.md      # Bảng từ điển dữ liệu 10 cột và bảo mật PII
│   ├── 10-api-contract-standards.md        # Thiết kế RESTful API và chuẩn bọc JSON Envelope
│   ├── 11-error-matrix-convention.md       # Ma trận ngoại lệ 7 cột và quy trình xử lý lỗi 4 lớp
│   ├── 12-state-transition-rules.md        # Máy trạng thái hữu hạn (FSM) và logic bảo vệ (Guard)
│   ├── 13-wireframe-html-guidelines.md     # Quy chuẩn Wireframe đơn sắc Grayscale và Zero-CDN
│   ├── 14-test-case-traceability.md        # Ma trận truy vết yêu cầu hai chiều (RTM)
│   ├── 15-change-request-impact-matrix.md  # Khung phân tích tác động thay đổi 4 chiều kích
│   ├── 16-ambiguity-detection-rules.md     # Bộ lọc từ ngữ mơ hồ và hướng dẫn chuyển hóa
│   ├── 17-actor-role-definition.md         # Phân loại 4 nhóm Actor và ma trận phân quyền RBAC
│   ├── 18-knowledge-graph-metadata.md      # Siêu dữ liệu YAML Frontmatter cho đồ thị tri thức
│   └── 19-document-versioning-rules.md     # Quản lý phiên bản SemVer và nhật ký Changelog
├── _templates/                 # 47 Biểu mẫu tài liệu thực chiến chuẩn sản xuất
│   ├── 01-prd.md                           # Biểu mẫu Product Requirements Document
│   ├── 08-srs.md                           # Biểu mẫu SRS Master chuẩn IEEE 830
│   ├── 15-sequence-diagram.md              # Biểu mẫu sơ đồ tuần tự
│   ├── 17-activity-swimlane.puml           # Sơ đồ luồng phân làn PlantUML hợp lệ
│   ├── 18-bpmn-process.bpmn                # File quy trình nghiệp vụ BPMN 2.0 XML
│   ├── 20-erd-mermaid.md                   # Sơ đồ quan hệ thực thể Mermaid ERD
│   ├── 21-erd-d2.d2                        # Mô hình kiến trúc D2
│   ├── 24-dbdiagram.dbml                   # Cấu trúc cơ sở dữ liệu DBML
│   ├── 26-usecase-cockburn.md              # Biểu mẫu Use Case chuẩn Cockburn
│   ├── 27-userstory.md                     # Biểu mẫu Backlog User Story
│   ├── 28-acceptance-criteria.md           # Biểu mẫu tiêu chí nghiệm thu Gherkin BDD
│   ├── 31-wireframe-html.html              # Wireframe HTML đơn sắc chạy độc lập
│   ├── 40-api-test-bruno.bru               # Bộ kịch bản kiểm thử API Bruno
│   ├── 43-test-cases.md                    # Biểu mẫu bộ kịch bản kiểm thử 8 cột
│   ├── 44-playwright-gen.spec.ts           # Bộ kiểm thử tự động Playwright TypeScript
│   ├── 45-gap-analysis.md                  # Báo cáo phân tích khoảng trống nghiệp vụ 6 chiều
│   ├── 46-doc-drift.md                     # Báo cáo độ lệch tài liệu và mã nguồn
│   ├── 47-change-request.md                # Phiếu đánh giá tác động yêu cầu thay đổi
│   ├── 48-meeting-minutes.md               # Biên bản họp và nhật ký quyết định nghiệp vụ
│   └── ... (đầy đủ 47 templates gốc)
└── scripts/
    └── render_diagrams.py      # Công cụ tự động trích xuất và kết xuất sơ đồ
```

---

## 9 Giai Đoạn Phát Triển & 56 Kỹ Năng

| Giai Đoạn | Số Lượng | Lệnh `/skill` | Mục Tiêu & Sản Phẩm Đầu Ra |
| :--- | :---: | :--- | :--- |
| **1. Kế hoạch Sản phẩm** | **3** | `/prd`<br>`/roadmap`<br>`/discover` | Tài liệu PRD tổng quan, lộ trình triển khai theo mốc thời gian và phỏng vấn khám phá định hướng. |
| **2. Thu thập & Đặc tả Yêu cầu** | **7** | `/brainstorm`<br>`/urd`<br>`/brd`<br>`/prd-epic`<br>`/srs`<br>`/reverse-doc`<br>`/code-to-srs` | Làm rõ ý tưởng thô, tài liệu URD/BRD, phân rã Epic, đặc tả kỹ thuật IEEE 830 và dịch ngược mã nguồn cũ thành tài liệu. |
| **3. Mô hình hóa Nghiệp vụ & Dữ liệu** | **12** | `/sequence`<br>`/render-diagrams`<br>`/diagram-design`<br>`/activity`<br>`/activity-swimlane`<br>`/bpmn`<br>`/state`<br>`/erd`<br>`/d2-erd`<br>`/d2-activity`<br>`/dbdiagram`<br>`/usecase-diagram` | Sơ đồ tuần tự, kết xuất bản vẽ vector HTML/SVG, sơ đồ luồng hoạt động, swimlane phân làn, quy trình BPMN XML, máy trạng thái FSM, mô hình ERD và DBML. |
| **4. Use Case & User Story** | **3** | `/usecase`<br>`/userstory`<br>`/ac` | Use Case chuẩn Cockburn, phân tách backlog theo chuẩn INVEST và tiêu chí nghiệm thu Gherkin BDD. |
| **5. Thiết kế Giao diện & Luồng Màn hình** | **6** | `/user-flow`<br>`/wireframe-ascii`<br>`/wireframe-html`<br>`/prototype-html`<br>`/prototype-next`<br>`/figma` | Luồng di chuyển màn hình, wireframe ASCII nhanh, wireframe HTML đơn sắc độc lập, prototype tương tác, bản dựng Next.js và token thiết kế Figma. |
| **6. Tích hợp API** | **7** | `/api-assess`<br>`/api-doc`<br>`/api-design`<br>`/api-map`<br>`/api-checklist`<br>`/api-test`<br>`/api-readiness` | Đánh giá tính khả thi API bên thứ ba, tài liệu RESTful, thiết kế hợp đồng API/Webhook, ánh xạ từ điển dữ liệu, bộ test Bruno và kiểm tra sẵn sàng golive. |
| **7. Đảm bảo Chất lượng (QA/QC)** | **3** | `/test-checklist`<br>`/test-cases`<br>`/playwright-gen` | Bảng kiểm tra điều kiện test 6 trụ cột, ma trận test cases 8 cột gắn kết Error Matrix và kịch bản test tự động Playwright. |
| **8. Quản trị & Kiểm soát Thay đổi** | **6** | `/gap`<br>`/doc-drift`<br>`/ask`<br>`/cr`<br>`/dashboard`<br>`/kg` | Phân tích khoảng trống nghiệp vụ, phát hiện độ lệch giữa đặc tả và mã nguồn, tra cứu tri thức dự án, ma trận tác động Change Request, dashboard và Knowledge Graph. |
| **9. Bàn giao & Vận hành** | **9** | `/jira`<br>`/confluence`<br>`/export`<br>`/preview`<br>`/reverse-preview`<br>`/userguide`<br>`/meet`<br>`/update-overview`<br>`/delegate` | Xuất backlog CSV cho Jira, xuất tài liệu Confluence, đóng gói đa định dạng, cổng duyệt một chạm preview.html, cẩm nang vận hành người dùng và biên bản họp. |

---

## Quy Trình Một Ngày Làm Việc Thực Chiến Của BA

Quy trình mẫu xây dựng trọn bộ hồ sơ đặc tả tính năng trong một ngày làm việc:

```
09:00  /brainstorm      Làm rõ ý tưởng thô và xác lập phạm vi tính năng
09:40  /srs             Soạn thảo tài liệu đặc tả kỹ thuật IEEE 830 (FR, BR, ERR, NFR)
10:30  /sequence + /erd Vẽ sơ đồ tuần tự tương tác hệ thống và quan hệ thực thể dữ liệu
10:45  /render-diagrams Tự động chuyển đổi sơ đồ sang bản vẽ vector HTML và SVG
11:00  /wireframe-html  Dựng giao diện đơn sắc tương tác mở trực tiếp trên trình duyệt
14:00  /userstory + /ac Bóc tách User Story chuẩn INVEST và Acceptance Criteria Gherkin
16:00  /test-cases      Thiết lập bộ kịch bản kiểm thử chi tiết gắn với Ma trận ngoại lệ
16:45  /preview         Đóng gói toàn bộ tài liệu thành trang tổng quan gửi duyệt
Hôm sau /cr             Tiếp nhận yêu cầu thay đổi, phân tích tác động và đồng bộ hồ sơ
```

---

## Cài Đặt & Sử Dụng

Bộ công cụ hoạt động trên nền tảng tệp tin thuần túy và tương thích hoàn toàn với **chuẩn Agent Skills**.

### Lựa chọn 1: Cài đặt cho Claude Code
```bash
mkdir -p ~/.claude/skills
ln -s /path/to/universal-ba-toolkit/skills/* ~/.claude/skills/
```

### Lựa chọn 2: Cài đặt cho Hermes Agent / Antigravity / Codex
```bash
mkdir -p ~/.hermes/skills
ln -s /path/to/universal-ba-toolkit/skills/* ~/.hermes/skills/
```

### Lựa chọn 3: Sử dụng trực tiếp trong Workspace (Cursor, Windsurf, Antigravity)
Chỉ cần sao chép hoặc clone thư mục dự án này vào thư mục gốc của dự án. Trợ lý AI sẽ tự động đọc hiểu các chỉ dẫn trong thư mục `skills/` và `rules/` khi bạn kích hoạt các lệnh `/slash`.

---

## Đóng Góp & Bản Quyền

Dự án phát hành theo giấy phép mã nguồn mở **[MIT License](LICENSE)**. Mọi đóng góp về biểu mẫu nghiệp vụ chuyên ngành (Fintech, Thương mại điện tử, Y tế, Logistics, ERP).
