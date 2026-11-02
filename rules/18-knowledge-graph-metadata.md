# Quy Chuẩn Siêu Dữ Liệu Đồ Thị Tri Thức Nghiệp Vụ (Knowledge Graph Metadata)

> **Mã quy tắc:** `RULE-18`  
> **Áp dụng cho:** Tất cả các file tài liệu Markdown trong dự án để phục vụ đánh chỉ mục và truy vấn tri thức tự động.

---

## 1. Cấu Trúc Khối Frontmatter YAML Tiêu Chuẩn
Mỗi tài liệu trong bộ hồ sơ BA bắt buộc phải có khối Frontmatter YAML ở ngay đầu file với đầy đủ 8 trường siêu dữ liệu sau:

```yaml
---
id: "SRS-ORD-01"
title: "Đặc tả yêu cầu chức năng module Quản lý Đơn hàng"
type: "srs-functional"
version: "2.1.0"
status: "approved"
owner: "Nguyen Van A (Lead BA)"
domain: "sales-order"
tags:
  - "order-management"
  - "checkout"
  - "inventory-lock"
upstream_deps:
  - "BRD-ECOMMERCE-2026"
  - "URD-CUSTOMER-EXPERIENCE"
downstream_deps:
  - "API-ORD-V1"
  - "TC-ORD-SUITE"
  - "DIAG-ORD-STATE"
last_updated: "2026-11-02"
---
```

---

## 2. Ý Nghĩa Các Trường Siêu Dữ Liệu
1. **`id`:** Mã định danh duy nhất của tài liệu trong toàn bộ dự án.
2. **`title`:** Tiêu đề tài liệu ngắn gọn, súc tích.
3. **`type`:** Phân loại tài liệu chuẩn (`brd`, `urd`, `srs`, `api-spec`, `test-suite`, `diagram`, `decision-log`, `meeting-minutes`).
4. **`version`:** Phiên bản tài liệu theo chuẩn SemVer (`MAJOR.MINOR.PATCH`) tuân thủ `RULE-19`.
5. **`status`:** Trạng thái vòng đời (`draft`, `in-review`, `approved`, `deprecated`, `superseded`).
6. **`owner`:** Họ tên và vai trò của người chịu trách nhiệm chính về nội dung tài liệu.
7. **`upstream_deps`:** Danh sách mã tài liệu nguồn cấp trên mà tài liệu này kế thừa hoặc phụ thuộc.
8. **`downstream_deps`:** Danh sách mã tài liệu cấp dưới chịu ảnh hưởng khi tài liệu này thay đổi.

---

## 3. Cú Pháp Liên Kết Wikilink Hai Chiều (Bi-directional Wikilinks)
Để các công cụ Knowledge Graph (Obsidian, Logseq, AI Graph Agents) tự động xây dựng mạng lưới tri thức, sử dụng cú pháp liên kết hai chiều:
- Dẫn chiếu tới tài liệu: `[[SRS-ORD-01]]` hoặc `[[SRS-ORD-01|Đặc tả Module Đơn Hàng]]`.
- Dẫn chiếu tới quy tắc: `[[RULE-02|Quy chuẩn BR]]`.
- Dẫn chiếu tới kịch bản kiểm thử: `[[TC-ORD-001]]`.
