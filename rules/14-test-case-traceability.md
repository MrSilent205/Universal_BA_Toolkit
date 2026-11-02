# Quy Chuẩn Ma Trận Truy Vết Yêu Cầu & Kiểm Thử (Requirements Traceability - RTM)

> **Mã quy tắc:** `RULE-14`  
> **Áp dụng cho:** Tất cả các tài liệu SRS, User Story, Test Cases (`43-test-cases.md`) và Báo cáo nghiệm thu UAT.

---

## 1. Nguyên Tắc Truy Vết Hai Chiều (Bi-directional Traceability)
Mọi sản phẩm phần mềm phải đảm bảo tính liên kết chặt chẽ 2 chiều xuyên suốt vòng đời phát triển:
- **Truy vết xuôi (Forward Traceability):** Mỗi Mục tiêu kinh doanh (BRD) $ightarrow$ Yêu cầu chức năng (FR) $ightarrow$ User Story (US) $ightarrow$ Kịch bản kiểm thử (TC) để đảm bảo không bỏ sót bất kỳ yêu cầu nào.
- **Truy vết ngược (Backward Traceability):** Mỗi đoạn mã nguồn, API Endpoint hay Kịch bản kiểm thử (TC) đều phải chỉ ra được nó phục vụ cho Yêu cầu (FR) hoặc Quy tắc nghiệp vụ (BR) nào, tránh tình trạng phát triển tính năng thừa (Gold plating).

```
[Mục Tiêu BRD]  ───>  [Yêu Cầu FR]  ───>  [User Story]  ───>  [Test Case TC]
      ^                     ^                   ^                    ^
      └─────────────────────┴───────────────────┴────────────────────┘
```

---

## 2. Cấu Trúc Bảng Ma Trận Truy Vết Chuẩn (Standard RTM Table)

| Mã BRD / Mục Tiêu | Mã FR (SRS) | Mã User Story | Mã Quy Tắc (BR) | Mã Kịch Bản Kiểm Thử (TC ID) | Loại Kiểm Thử | Tình Trạng Nghiệm Thu | Ghi Chú |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `BRD-GOAL-01` | `FR-ORD-01` | `US-ORD-01` | `BR-ORD-01` | `TC-ORD-001` | E2E / UI | **Pass** | Luồng tạo đơn hàng chuẩn |
| `BRD-GOAL-01` | `FR-ORD-01` | `US-ORD-01` | `BR-ORD-02` | `TC-ORD-002` | Unit / API | **Pass** | Kiểm tra kiểm soát trừ tồn kho |
| `BRD-GOAL-02` | `FR-PAY-03` | `US-PAY-02` | `BR-PAY-05` | `TC-PAY-003` | Security | **Pass** | Chống thanh toán lặp (Idempotency) |
| `BRD-GOAL-03` | `FR-AUTH-02`| `US-AUTH-01`| `BR-SEC-02` | `TC-AUTH-004`| Functional | **Fail** | Bug #104: Chưa khóa sau 5 lần sai |

---

## 3. Chỉ Số Bao Phủ Kiểm Thử Tối Thiểu (Coverage Gate)
Một tính năng chỉ đủ điều kiện nghiệm thu Release khi đạt các chỉ số bao phủ sau:
- **100%** Quy tắc nghiệp vụ cốt lõi (Core Business Rules) có kịch bản kiểm thử tương ứng.
- **100%** Luồng hạnh phúc (Happy Path) được kiểm thử thành công.
- Tối thiểu **80%** Kịch bản ngoại lệ (Edge cases / Error conditions) được kiểm thử tự động hoặc thủ công.
