# Quy Chuẩn Viết User Story Theo Tiêu Chí INVEST & Kỹ Thuật Chia Nhỏ

> **Mã quy tắc:** `RULE-07`  
> **Áp dụng cho:** Tất cả Product Backlog Items, User Story (`27-userstory.md`) và kế hoạch Sprint.

---

## 1. Cấu Trúc Tiêu Chuẩn Của User Story (Connextra Template)
Mọi User Story phải tuân theo cấu trúc 3 thành phần:

$$\text{Là một } [\text{Vai trò/Actor}], \text{ tôi muốn } [\text{Hành động/Khát khao}], \text{ để } [\text{Lợi ích/Giá trị nghiệp vụ}].$$

- **Vai Trò (Who):** Phải là một Persona hoặc Role cụ thể (`RULE-17`), không viết chung chung là *"Là một người dùng"*.
- **Hành Động (What):** Mục tiêu thao tác nghiệp vụ, không ép giải pháp kỹ thuật (`"tôi muốn chọn ngày từ dropdown"` $ightarrow$ SAI, `"tôi muốn lọc danh sách theo khoảng thời gian"` $ightarrow$ ĐÚNG).
- **Giá Trị (Why):** Lý do mang lại doanh thu, tiết kiệm thời gian hoặc giảm thiểu rủi ro cho doanh nghiệp.

---

## 2. Tiêu Chí Thẩm Định INVEST

| Tiêu Chí | Ý Nghĩa Chuyên Sâu | Biểu Hiện Vi Phạm (Anti-Pattern) | Cách Khắc Phục Chuẩn |
| :--- | :--- | :--- | :--- |
| **I - Independent** *(Độc lập)* | Story có thể lên kế hoạch và hoàn thành độc lập, không bị block bởi Story khác trong cùng Sprint. | Story FE phụ thuộc chặt vào Story BE trong cùng Sprint dẫn tới tắc nghẽn. | Viết Story dạng Full-slice (dọc giá trị nghiệp vụ) hoặc dùng API Contract Mocking. |
| **N - Negotiable** *(Có thể thương lượng)* | Story là lời mời tham gia thảo luận, không phải hợp đồng cố định cứng nhắc. | Ghi chi tiết mã lệnh SQL, tên hàm, tọa độ pixel giao diện vào User Story. | Tập trung vào bài toán nghiệp vụ, để giải pháp cho Dev/Designer đề xuất. |
| **V - Valuable** *(Có giá trị)* | Mang lại giá trị trực tiếp cho người dùng cuối hoặc bên liên quan kinh doanh. | *"Nâng cấp thư viện Lodash lên bản v4"* viết thành User Story cho PO. | Viết thành Technical Debt / Enabler Task, không gán nhãn User Story người dùng. |
| **E - Estimable** *(Có thể ước lượng)* | Đội ngũ phát triển hiểu rõ phạm vi để ước lượng được kích thước (Story Points). | Story quá mơ hồ, kiến trúc chưa rõ ràng khiến Dev không thể đoán được độ phức tạp. | Tạo Spike Story (Nghiên cứu kỹ thuật) trước 1 Sprint để làm rõ rủi ro. |
| **S - Small** *(Vừa vặn)* | Đủ nhỏ để hoàn thành trọn vẹn trong vòng 1/4 đến 1/2 Sprint (thường từ 1 - 5 Story Points). | Story mất cả tháng hoặc kéo dài qua 3 Sprint không nghiệm thu được. | Áp dụng 5 kỹ thuật chia nhỏ Story (SPIDR). |
| **T - Testable** *(Có thể kiểm thử)* | Có Acceptance Criteria rõ ràng để QA/PO kiểm chứng đạt hoặc không đạt. | *"Giao diện phải hiện đại, mượt mà và dễ thao tác"*. | Chuyển thành các tiêu chí kiểm thử BDD Gherkin cụ thể (`RULE-08`). |

---

## 3. Kỹ Thuật Chia Nhỏ User Story (SPIDR Method)
Khi một User Story quá lớn (Epic), áp dụng 5 lát cắt sau để phân rã:
1. **S - Spikes:** Tách riêng phần nghiên cứu tìm hiểu công nghệ/thuật toán mới thành 1 task độc lập.
2. **P - Paths:** Tách Happy Path làm trước, các nhánh ngoại lệ phức tạp (Alternative Paths) làm ở Story sau.
3. **I - Interfaces:** Tách giao diện Web Desktop trước, ứng dụng Mobile/Tablet làm sau.
4. **D - Data:** Tách xử lý dữ liệu cơ bản (Text, Số) làm trước, dữ liệu phức tạp (File đính kèm, Video, Đa ngôn ngữ) làm sau.
5. **R - Rules:** Nới lỏng các quy tắc kiểm tra nghiêm ngặt ở phiên bản đầu, siết chặt bổ sung ở các Story tiếp theo.
