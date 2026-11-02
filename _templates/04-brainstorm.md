# Biên bản Phỏng vấn & Làm rõ Yêu cầu (Brainstorming & Elicitation)

---
id: DOC-BRN-[FEATURE_CODE]-001
title: Brainstorming Log - [Tên Tính Năng]
version: 1.0.0
phase: 02-elicit-spec
domain: [Phân Hệ]
tags: [brainstorm, elicitation, socratic, scope]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Ý tưởng Sơ khởi & Nhu cầu Gốc (Raw Concept)
- **Người đề xuất**: [Tên Stakeholder / Khách hàng / PO]
- **Mô tả ban đầu**: "[Trích dẫn nguyên văn yêu cầu tự nhiên ban đầu của stakeholder]"

## 2. Nhật ký Phỏng vấn Phản biện Socratic (Socratic Interview Log)

### Câu hỏi 1: Về Luồng Ngoại lệ & Timeout Mạng
- **BA hỏi**: "Khi khách hàng bấm thanh toán mà cổng thanh toán phản hồi timeout quá 30 giây thì hệ thống sẽ hành xử thế nào để không trừ tiền 2 lần?"
- **Stakeholder trả lời**: "Hệ thống phải giữ đơn ở trạng thái PENDING_VERIFICATION, hiển thị đồng hồ đếm ngược và tự động gọi API đối soát ngầm, không được bắt khách bấm thanh toán lại ngay."

### Câu hỏi 2: Về Xung đột Dữ liệu Đồng thời (Race Conditions)
- **BA hỏi**: "Nếu chỉ còn 1 sản phẩm cuối cùng trong kho nhưng có 2 người cùng bấm đặt hàng tại 1 thời điểm?"
- **Stakeholder trả lời**: "Áp dụng cơ chế khóa tạm thời (Pessimistic / Optimistic Lock); ai bấm xác nhận trước giữ chỗ kho 15 phút, người bấm sau lập tức nhận thông báo hết hàng `ERR-ORD-409-01`."

### Câu hỏi 3: Về Quyền Hạn & Ranh giới Dữ liệu
- **BA hỏi**: "Nhân viên chăm sóc khách hàng có quyền sửa số tiền thanh toán hoặc tự ý duyệt hoàn tiền không?"
- **Stakeholder trả lời**: "Nhân viên chỉ được tạo Yêu cầu Hoàn tiền (Refund Request), quyền phê duyệt thực tế bắt buộc phải là Trưởng nhóm CSKH hoặc Kế toán."

## 3. Bảng Chốt Phạm vi Nghiệp vụ (Scope Baseline Agreement)
| Hạng mục | Trong phạm vi (In-Scope - Bắt buộc làm) | Ngoài phạm vi (Out-of-Scope - Hoãn lại) |
| :--- | :--- | :--- |
| **Kênh thanh toán** | Hỗ trợ VNPay QR và Thẻ ATM Nội địa | Chưa hỗ trợ thẻ tín dụng quốc tế Visa/Master |
| **Quy trình hoàn tiền** | Hỗ trợ hoàn tiền thủ công qua đối soát | Chưa có tính năng hoàn tiền tự động 1 chạm |
| **Thông báo** | Gửi thông báo kết quả qua Email & In-app | Chưa tích hợp gửi SMS thông báo biến động |

## 4. Quyết định Nghiệp vụ Đã Chốt (Key Business Decisions)
1. **DEC-01**: Thời gian giữ chỗ đơn hàng chưa thanh toán tối đa là 15 phút.
2. **DEC-02**: Cho phép người dùng áp dụng tối đa 01 voucher giảm giá và 01 voucher freeship trên cùng 1 đơn hàng.

## 5. Đề xuất Bước tiếp theo
Chuyển tiếp hồ sơ sang lệnh `/srs` để soạn thảo đặc tả kỹ thuật IEEE 830 và `/sequence` để mô hình hóa luồng gọi API.
