---
name: kg
description: "Khởi tạo Đồ thị Tri thức Toàn bộ Tài liệu Dự án (Documentation Knowledge Graph): quét frontmatter YAML theo Rule 18, trích xuất nodes và edges quan hệ phụ thuộc, xuất file JSON chuẩn Graphology/Cytoscape và bảng tra cứu"
metadata:
  phase: 08-quality-change
  category: business-analysis
  version: 2.0.0
  is_core: true
---

# /kg — Đồ thị Tri thức Toàn bộ Tài liệu (Knowledge Graph) [CORE WORKFLOW]

Quét tự động toàn bộ cây tài liệu của dự án, phân tích các trường YAML Frontmatter theo Rule 18 để tái hiện mạng lưới quan hệ đa chiều (Knowledge Graph) giữa các tài liệu, yêu cầu chức năng (`FR`), quy tắc nghiệp vụ (`BR`), thực thể dữ liệu (`ERD`) và sơ đồ hệ thống.

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện trong các dự án có quy mô tài liệu lớn (hàng chục đến hàng trăm file), khi một thay đổi nhỏ có thể kéo theo hàng loạt hệ lụy dây chuyền khó lường trước.
- **Đối tượng thụ hưởng**: Solution Architect, Lead BA, Technical PO, AI Coding Agents.
- **Giá trị cốt lõi**: Biến các file tài liệu rời rạc thành một mạng lưới tri thức liên kết (Linked Knowledge Network); cho phép tra cứu ngay lập tức "Nếu sửa BR-001 thì những file nào, sơ đồ nào và test case nào bị ảnh hưởng?".

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/kg [tùy_chọn: scan | export-json | query_node]`
- **Dữ liệu đầu vào cần có**:
  - Toàn bộ các file `.md` trong thư mục `docs/` có gắn Frontmatter metadata chuẩn theo Rule 18.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/01-fr-naming-convention.md` — Nhận diện nodes yêu cầu FR.
- `rules/02-br-naming-convention.md` — Nhận diện nodes quy tắc BR.
- `rules/18-knowledge-graph-metadata.md` — Quy chuẩn Metadata YAML frontmatter bắt buộc.

## Biểu mẫu tham chiếu (Template)
- Cấu trúc Metadata & Quan hệ thực thể: `rules/18-knowledge-graph-metadata.md`
- Định dạng xuất bản: Đồ thị JSON (Nodes & Edges) và Bảng tra cứu liên kết tri thức (Knowledge Graph Index)

## Vị trí lưu tệp mặc định
- `docs/knowledge-graph.json` và `docs/knowledge-graph-index.md`

## Quy trình thực thi chi tiết
1. **Quét & Phân tích Cú pháp Frontmatter (Frontmatter Parsing)**:
   - Đọc đệ quy tất cả các tệp `.md` trong `docs/`.
   - Trích xuất khối YAML: `id`, `title`, `phase`, `domain`, `tags`, `depends_on`, `related_diagrams`.
2. **Khởi tạo Danh mục Đỉnh (Nodes Extraction)**:
   - Mỗi file tài liệu là một Node loại `Document`.
   - Mỗi mã `FR-xxx`, `BR-xxx`, `UC-xxx` được trích xuất thành Node loại tương ứng:
     ```json
     {
       "id": "DOC-SRS-AUTH-001",
       "label": "Đặc tả Phân hệ Xác thực",
       "type": "document",
       "phase": "02-elicit-spec"
     }
     ```
3. **Thiết lập Danh mục Cạnh Liên kết (Edges & Relationships Extraction)**:
   - Phân tích các mối quan hệ đa chiều:
     - Quan hệ phụ thuộc: `depends_on` $
ightarrow$ Cạnh `DEPENDS_ON`.
     - Quan hệ sơ đồ minh họa: `related_diagrams` $
ightarrow$ Cạnh `ILLUSTRATED_BY`.
     - Quan hệ chi phối: `BR` áp dụng vào `FR` $
ightarrow$ Cạnh `ENFORCES`.
     - Quan hệ kiểm thử: `TC` kiểm tra `FR` $
ightarrow$ Cạnh `VERIFIES`.
4. **Xuất bản Dữ liệu Đồ thị Chuẩn Quốc tế (Cytoscape / Graphology JSON)**:
   - Xuất file `docs/knowledge-graph.json` cấu trúc chuẩn để dễ dàng import vào các công cụ trực quan hóa đồ thị như Cytoscape, Gephi hoặc Neo4j:
     ```json
     {
       "nodes": [ ... ],
       "edges": [
         { "source": "DOC-SRS-AUTH-001", "target": "DOC-BRD-CORE-001", "relationship": "DEPENDS_ON" }
       ]
     }
     ```
5. **Tạo Bảng Tra cứu Tri thức Nhanh (Knowledge Graph Markdown Index)**:
   - Tạo file `docs/knowledge-graph-index.md` tổng hợp bảng tra cứu chéo giúp con người đọc trực tiếp.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] 100% các file `.md` trong thư mục `docs/` được quét và lập chỉ mục trong đồ thị.
- [ ] File `docs/knowledge-graph.json` hợp lệ cú pháp JSON, chứa đầy đủ danh sách `nodes` và `edges`.
- [ ] Không có "nút cô lập" (Islands / Disconnected Nodes) đối với các tài liệu cốt lõi.
- [ ] Có bảng tra cứu tóm tắt quan hệ phụ thuộc trong file `knowledge-graph-index.md`.
