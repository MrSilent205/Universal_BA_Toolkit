# Quy Chuẩn Đánh Giá Tác Động Yêu Cầu Thay Đổi (Change Request Impact Matrix)

> **Mã quy tắc:** `RULE-15`  
> **Áp dụng cho:** Tất cả các phiếu yêu cầu thay đổi (`47-change-request.md`), quy trình kiểm soát thay đổi (CCB).

---

## 1. Khung Đánh Giá Tác Động 4 Chiều Kích (4-Dimension Impact Framework)
Khi nhận được bất kỳ yêu cầu thay đổi nào (Change Request - CR), BA bắt buộc phải phân tích toàn diện trên 4 chiều kích sau trước khi trình Hội đồng phê duyệt (CCB):

```
+--------------------------------------------------------------------------+
|                 MA TRẬN ĐÁNH GIÁ TÁC ĐỘNG THAY ĐỔI (CR)                  |
+--------------------------------------------------------------------------+
| 1. Phạm Vi & Tài Liệu (Scope & Docs) | 2. Dữ Liệu & Kỹ Thuật (Data & API)|
| 3. Trải Nghiệm & Người Dùng (UI/UX)   | 4. Chi Phí & Tiến Độ (Effort/Time)|
+--------------------------------------------------------------------------+
```

1. **Chiều 1: Tác động Phạm vi & Yêu cầu (Scope & Specs):**
   - Thay đổi có làm thay đổi mục tiêu kinh doanh ban đầu không?
   - Những tài liệu nào cần cập nhật lại (`SRS`, `BRD`, `Use Case`, `RTM`)?
   - Có phát sinh xung đột với quy tắc nghiệp vụ hiện hữu (`RULE-02`) không?
2. **Chiều 2: Tác động Kiến trúc, Dữ liệu & API (Architecture, Data & API):**
   - Có cần thay đổi cấu trúc bảng cơ sở dữ liệu (Migration Schema) không?
   - Có gây phá vỡ tính tương thích ngược của API (Breaking Change) không?
   - Tác động tới các hệ thống tích hợp của bên thứ ba ra sao?
3. **Chiều 3: Tác động Giao diện & Trải nghiệm (UI/UX & User Journey):**
   - Người dùng có cần được đào tạo lại hoặc hướng dẫn sử dụng không?
   - Bao nhiêu màn hình, modal hoặc luồng tương tác cần thiết kế lại?
4. **Chiều 4: Tác động Kiểm thử, Chi phí & Tiến độ (Testing, Cost & Schedule):**
   - Ước tính tổng số ngày công kỹ thuật (Man-Days) cần thiết để thực hiện.
   - Số lượng kịch bản kiểm thử hồi quy (Regression Test) cần chạy lại.
   - Ngày Golive của dự án có bị lùi lại hay không?

---

## 2. Thang Điểm Phân Loại Mức Độ Tác Động Của CR
- **Cấp độ 1 - Minor (Nhỏ):** Effort $\le 1$ Man-Day, không đổi cấu trúc DB, không đổi API. Quyền duyệt: Lead BA / PO.
- **Cấp độ 2 - Moderate (Vừa):** Effort từ $2 - 5$ Man-Days, có migration DB nhỏ, tương thích ngược API. Quyền duyệt: Tech Lead + PO.
- **Cấp độ 3 - Major (Lớn):** Effort $> 5$ Man-Days, breaking API change, lùi tiến độ Release. Bắt buộc họp Hội đồng CCB toàn thể phê duyệt.
