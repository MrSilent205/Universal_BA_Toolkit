# Tài liệu Yêu cầu Nghiệp vụ Doanh nghiệp (Business Requirements Document - BRD)

---
id: DOC-BRD-[PROJECT_CODE]-001
title: Business Requirements Document - [Tên Dự Án]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực Doanh Nghiệp]
tags: [brd, enterprise, as-is-to-be, roi, business-case]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Động lực Doanh nghiệp & Vấn đề Cốt lõi (Business Drivers)
- **Bối cảnh hiện tại**: Quy trình xử lý hồ sơ vay tiêu dùng của doanh nghiệp đang phụ thuộc 80% vào thao tác thủ công của nhân viên tín dụng.
- **Vấn đề cốt lõi (Problem Statement)**:
  - Thời gian xử lý trung bình tốn 4-5 ngày làm việc / hồ sơ.
  - Tỷ lệ sai lệch thông tin và thất thoát giấy tờ chiếm 8.5%.
  - Chi phí nhân sự vận hành tăng 30% hàng năm khi quy mô khách hàng mở rộng.

## 2. Mục tiêu Chiến lược Định lượng (SMART Business Goals)
1. Giảm thời gian phê duyệt hồ sơ từ 5 ngày xuống dưới **4 giờ** làm việc thông qua tự động hóa eKYC và chấm điểm tín dụng.
2. Giảm tỷ lệ sai sót dữ liệu xuống **< 0.5%**.
3. Cắt giảm 1.8 tỷ VNĐ chi phí in ấn và kho lưu trữ hồ sơ giấy trong năm đầu tiên.

## 3. Đối chiếu Quy trình Hiện tại vs Tương lai (AS-IS vs TO-BE)

### 3.1. Quy trình Hiện tại (AS-IS Process)
```
[Khách nộp hồ sơ giấy] ──> [Nhân viên scan & nhập tay] ──> [Chuyển phòng thẩm định] ──> [Ký duyệt giấy] ──> [Giải ngân]
(Tốn 2-3 ngày)               (Tốn 1 ngày, dễ gõ sai)          (Tốn 1-2 ngày)              (Tốn nửa ngày)
```

### 3.2. Quy trình Tương lai (TO-BE Process)
```
[Khách eKYC qua Mobile App] ──> [AI Trích xuất OCR & Check CIC tự động] ──> [Hệ thống Auto-Approve] ──> [Chuyển khoản ngay]
(Hoàn thành trong 3 phút)       (Xử lý trong 30 giây qua API)                 (90% duyệt tự động)        (Giải ngân 24/7)
```

## 4. Phân tích Chi phí & Lợi ích (Cost-Benefit & ROI Analysis)
| Hạng mục Chi phí (CAPEX/OPEX) | Ước tính (VNĐ) | Lợi ích Kinh tế Mang lại (Hàng năm) | Ước tính (VNĐ) |
| :--- | :---: | :--- | :---: |
| Chi phí phát triển phần mềm | 850.000.000 | Tiết kiệm chi phí nhân sự nhập liệu | 960.000.000 |
| Chi phí bản quyền eKYC / API | 150.000.000 | Giảm thất thoát rủi ro nợ xấu gian lận | 1.200.000.000 |
| Hạ tầng đám mây Cloud (Hàng năm)| 120.000.000 | Doanh thu tăng trưởng do duyệt nhanh | 2.500.000.000 |
| **Tổng Chi phí Đầu tư Năm 1** | **1.120.000.000** | **Tổng Lợi ích Thu về Năm 1** | **4.660.000.000** |

- **Thời gian hoàn vốn dự kiến (Payback Period)**: 4.5 tháng.

## 5. Ràng buộc Pháp lý & Chính sách Doanh nghiệp (Compliance & Governance)
- Tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân (yêu cầu sự đồng thuận rõ ràng của khách hàng trước khi tra cứu CIC).
- Toàn bộ dữ liệu tài chính bắt buộc lưu trữ tại máy chủ vật lý đặt trong lãnh thổ Việt Nam.
