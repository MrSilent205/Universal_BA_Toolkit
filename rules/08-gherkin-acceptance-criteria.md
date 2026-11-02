# Tiêu chuẩn Acceptance Criteria (Cú pháp Gherkin BDD)

Mỗi User Story bắt buộc phải có tối thiểu 03 kịch bản Acceptance Criteria độc lập:
1. **Kịch bản Thành công (Happy Path)**: Dữ liệu hợp lệ, xử lý hoàn tất, kết quả mong đợi.
2. **Kịch bản Lỗi nghiệp vụ (Business Negative Path)**: Vi phạm quy tắc `BR-xxx`, chặn an toàn kèm mã lỗi `ERR-xxx`.
3. **Kịch bản Biên & Bảo mật (Boundary & Security Path)**: Chạm ngưỡng min/max, ký tự đặc biệt, click đúp, injection.

## 1. Cấu trúc cú pháp Gherkin chuẩn
```gherkin
Scenario: [Tên kịch bản mô tả mục tiêu kiểm thử]
  Given [Trạng thái ban đầu của hệ thống và dữ liệu người dùng]
  And [Bổ sung thêm điều kiện tiên quyết nếu có]
  When [Hành động cụ thể do người dùng hoặc hệ thống kích hoạt]
  And [Bổ sung thêm hành động nếu có]
  Then [Kết quả quan sát được của hệ thống và thay đổi dữ liệu]
  And [Thông báo hiển thị thân thiện kèm mã lỗi ERR-xxx (nếu có)]
```

## 2. Cú pháp Scenario Outline cho Dữ liệu Nhiều biến thể
```gherkin
Scenario Outline: Kiểm tra validation trường mật khẩu khi đăng ký
  Given người dùng đang ở màn hình Đăng ký
  When người dùng nhập mật khẩu "<password_input>"
  Then hệ thống hiển thị thông báo "<error_message>" và mã lỗi "<error_code>"

  Examples:
    | password_input | error_message                                 | error_code      |
    | 12345          | Mật khẩu phải có tối thiểu 8 ký tự            | ERR-VAL-422-02  |
    | abcdefgh       | Mật khẩu phải chứa ít nhất 1 chữ hoa và 1 số  | ERR-VAL-422-02  |
    | ABCDEF12       | Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt   | ERR-VAL-422-02  |
```
