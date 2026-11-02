# Báo cáo Thẩm định Ý tưởng (Product Discovery Report)

---
id: DOC-DSC-[CONCEPT_CODE]-001
title: Discovery Report - [Tên Ý Tưởng / Tính Năng]
version: 1.0.0
phase: 01-planning
domain: [Lĩnh Vực Nghiệp Vụ]
tags: [discovery, research, feasibility, risk-assessment]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Giả thuyết Cốt lõi (Core Hypotheses)
- **Phát biểu giả thuyết**: "Chúng tôi tin rằng [Nhóm khách hàng] đang gặp khó khăn nghiêm trọng khi [Vấn đề thực tế], và họ sẵn sàng sử dụng giải pháp [Tính năng đề xuất] để đạt được [Lợi ích kỳ vọng]."
- **Tiêu chí kiểm chứng (Success Signal)**: Tối thiểu 65% người dùng tham gia khảo sát đồng ý sử dụng tính năng và sẵn sàng chi trả mức phí đề xuất.

## 2. Phân tích Cạnh tranh (Competitive Landscape)
| Tiêu chí So sánh | Giải pháp Đề xuất của Chúng ta | Đối thủ A (Trực tiếp) | Đối thủ B (Gián tiếp) |
| :--- | :--- | :--- | :--- |
| **Tính năng cốt lõi** | [Mô tả tính năng] | [Mô tả] | [Mô tả] |
| **Thời gian hoàn thành tác vụ** | < 30 giây | ~ 2 phút | Thủ công (1-2 ngày) |
| **Mô hình chi phí / Giá** | [Mô hình giá] | [Phí đối thủ A] | [Phí đối thủ B] |
| **Điểm yếu lớn nhất** | Thương hiệu mới ra mắt | Giao diện cũ, khó dùng | Không có tích hợp tự động |
| **Lợi thế cạnh tranh (Moat)**| [Lợi thế độc quyền của ta] | Tập khách hàng lớn | Quan hệ đối tác lâu năm |

## 3. Đánh giá 4 Rủi ro Sản phẩm (Marty Cagan's 4 Big Risks)

### 3.1. Rủi ro Giá trị (Value Risk) — Khách hàng có thực sự muốn dùng/mua không?
- **Đánh giá**: [Thấp / Trung bình / Cao]
- **Dẫn chứng thực nghiệm**: [Kết quả phỏng vấn 15 khách hàng mục tiêu: 12/15 phản hồi rất tích cực].

### 3.2. Rủi ro Trải nghiệm (Usability Risk) — Người dùng có thể hiểu và thao tác dễ dàng không?
- **Đánh giá**: [Thấp / Trung bình / Cao]
- **Biện pháp giảm thiểu**: Thiết kế quy trình tối giản, áp dụng mẫu thiết kế quen thuộc của ngành.

### 3.3. Rủi ro Khả thi Kỹ thuật (Feasibility Risk) — Đội ngũ kỹ thuật có đủ năng lực xây dựng không?
- **Đánh giá**: [Thấp / Trung bình / Cao]
- **Rào cản kỹ thuật**: Cần tích hợp với hệ thống Core Banking cũ của đối tác; giải pháp là xây dựng tầng API Adapter trung gian.

### 3.4. Rủi ro Khả thi Doanh nghiệp (Viability Risk) — Có phù hợp với pháp lý, tài chính và đạo đức kinh doanh không?
- **Đánh giá**: [Thấp / Trung bình / Cao]
- **Kiểm tra tuân thủ**: Đã tham vấn bộ phận Pháp chế về Nghị định bảo vệ dữ liệu cá nhân (NĐ 13/2023).

## 4. Kết luận Chiến lược & Quyết định (Decision Gate)
- **Quyết định đề xuất**: **[GO / PIVOT / NO-GO]**
- **Lập luận**: [Tóm tắt căn cứ số liệu đưa ra quyết định trên]
- **Bước hành động tiếp theo**:
  - Nếu **GO**: Kích hoạt lệnh `/prd` và `/brainstorm` để tiến hành đặc tả kỹ thuật chi tiết.
  - Nếu **PIVOT**: Điều chỉnh lại mô hình giải pháp và khảo sát lại nhóm người dùng trong 2 tuần.
  - Nếu **NO-GO**: Hủy bỏ ý tưởng, lưu trữ tài liệu vào kho bài học kinh nghiệm.
