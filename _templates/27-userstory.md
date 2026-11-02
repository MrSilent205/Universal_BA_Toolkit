# Danh mục User Story & Sprint Backlog

---
id: DOC-US-[MODULE]-001
title: User Story Backlog - [Tên Phân Hệ]
version: 1.0.0
phase: 04-usecase-story
domain: [Phân Hệ]
tags: [user-story, backlog, invest, agile, scrum]
author: [Tên Tác Giả / Senior IT BA]
last_updated: [YYYY-MM-DD]
---

## 1. Bảng Danh mục User Stories Chuẩn INVEST

| Story ID | Cấu trúc Connextra (Là một... Tôi muốn... Để...) | FR Ref | Epic Ref | Story Points | Ưu tiên | Trạng thái |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `US-ORD-01` | **Là một** khách hàng mua sắm,<br>**Tôi muốn** thanh toán qua cổng VNPay,<br>**Để** hoàn tất mua hàng không dùng tiền mặt nhanh gọn. | `FR-ORD-CHKT-001` | `EPIC-PAY-001` | **5** | P0 (Must) | Ready for Sprint |
| `US-ORD-02` | **Là một** khách hàng mua sắm,<br>**Tôi muốn** nhập mã giảm giá khi thanh toán,<br>**Để** được trừ tiền khuyến mãi theo chương trình. | `FR-ORD-VCHR-001` | `EPIC-PAY-001` | **3** | P1 (Should) | Ready for Sprint |
| `US-ORD-03` | **Là một** khách hàng mua sắm,<br>**Tôi muốn** nhận email xác nhận đơn kèm mã tra cứu,<br>**Để** yên tâm rằng đơn hàng đã được ghi nhận. | `FR-NOTI-EML-001` | `EPIC-PAY-001` | **2** | P0 (Must) | Ready for Sprint |
| `US-CSKH-01` | **Là một** nhân viên CSKH,<br>**Tôi muốn** tra cứu lịch sử thanh toán theo mã đơn hàng,<br>**Để** giải đáp thắc mắc khi khách hàng khiếu nại trừ tiền. | `FR-RPT-ORD-001` | `EPIC-OPS-001` | **3** | P1 (Should) | Ready for Sprint |

---

## 2. Đặc tả Chi tiết Từng User Story

### US-ORD-01: Thanh toán đơn hàng qua cổng VNPay
- **Mã Story**: `US-ORD-01`
- **Story Points**: 5 (Fibonacci)
- **Độ ưu tiên**: P0 (Must Have - MVP)
- **Đặc tả Connextra**:
  - *Là một*: Khách hàng đã chọn xong giỏ hàng.
  - *Tôi muốn*: Lựa chọn thanh toán bằng cổng trực tuyến VNPay và quét mã QR trên điện thoại.
  - *Để*: Hoàn thành đơn hàng trong vòng chưa đầy 1 phút mà không cần chuẩn bị tiền mặt.
- **Tiêu chí Kiểm định INVEST (Rule 07)**:
  - [x] **I (Independent)**: Có thể phát triển và kiểm thử độc lập với phương thức COD.
  - [x] **N (Negotiable)**: Có thể thương lượng chọn quét QR trước, thẻ quốc tế sau.
  - [x] **V (Valuable)**: Giảm 50% thời gian chờ đợi nhận hàng của khách.
  - [x] **E (Estimable)**: Đội Dev đã nắm rõ tài liệu VNPay SDK (5 SP).
  - [x] **S (Small)**: Hoàn thành trọn vẹn trong 1 Sprint 2 tuần.
  - [x] **T (Testable)**: Đi kèm 3 kịch bản Acceptance Criteria tại `docs/{feature}/userstories/acceptance-criteria.md`.

## 3. Tiêu chuẩn Hoàn thành của Story (Definition of Done - DoD)
1. Mã nguồn được review và phê duyệt (Approved PR) bởi ít nhất 1 Senior Developer.
2. Unit tests đạt độ bao phủ dòng (Code Coverage) >= 80%.
3. Vượt qua 100% kịch bản Acceptance Criteria trên môi trường Staging.
4. Không còn bug Blocker hoặc Critical tồn đọng.
5. Cập nhật tài liệu kỹ thuật và API contract tương ứng.
