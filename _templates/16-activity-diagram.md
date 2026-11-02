# Sơ đồ Hoạt động Nghiệp vụ (Activity Diagram)

---
id: DIAG-ACT-[FEATURE]-001
title: Activity Diagram - [Tên Quy Trình]
version: 1.0.0
phase: 03-diagrams
domain: [Phân Hệ]
tags: [activity, flowchart, mermaid, business-process]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Mô tả Quy trình Nghiệp vụ
Sơ đồ hoạt động mô hình hóa dòng chảy xử lý logic từ lúc bắt đầu cho đến khi hoàn thành, làm rõ các điểm rẽ nhánh điều kiện và các kịch bản ngoại lệ.

## 2. Sơ đồ Hoạt động Mermaid (Flowchart)

```mermaid
flowchart TD
    Start([Bắt đầu: Khách bấm Đặt hàng]) --> ValidateInput[Kiểm tra thông tin giao hàng]
    
    ValidateInput --> IsValid{Thông tin hợp lệ?}
    IsValid -- Không --> ShowError[Báo lỗi ERR-VAL-422-01: Sai thông tin]
    ShowError --> InputCorrection[Khách nhập lại thông tin]
    InputCorrection --> ValidateInput

    IsValid -- Có --> CheckStock[Kiểm tra tồn kho thực tế]
    CheckStock --> IsStockAvailable{Tồn kho đủ?}
    
    IsStockAvailable -- Không --> OutOfStock[Báo lỗi ERR-ORD-409-01: Hết hàng]
    OutOfStock --> RefreshCart[Cập nhật lại giỏ hàng]
    RefreshCart --> EndFail([Kết thúc: Đặt hàng thất bại])

    IsStockAvailable -- Có --> HoldStock[Giữ chỗ tồn kho trong 15 phút]
    HoldStock --> ChoosePayment{Chọn phương thức?}

    ChoosePayment -- COD --> CreateOrderCOD[Tạo đơn COD: Chờ xuất kho]
    CreateOrderCOD --> SendEmailCOD[Gửi email xác nhận đơn]
    SendEmailCOD --> EndSuccess([Kết thúc: Đặt hàng thành công])

    ChoosePayment -- Online Gateway --> CreatePaymentLink[Khởi tạo link thanh toán VNPay]
    CreatePaymentLink --> RedirectUser[Chuyển hướng sang cổng thanh toán]
    RedirectUser --> WaitForIPN{Nhận kết quả IPN?}

    WaitForIPN -- Thành công trong 15p --> UpdatePaid[Cập nhật đơn: Đã thanh toán]
    UpdatePaid --> NotifyWMS[Bắn sự kiện sang Kho soạn hàng]
    NotifyWMS --> EndSuccess

    WaitForIPN -- Thất bại / Bấm hủy --> CancelOrder[Báo lỗi ERR-PAY-400-02: Hủy giao dịch]
    CancelOrder --> ReleaseStock[Hoàn lại tồn kho đã giữ]
    ReleaseStock --> EndFail

    WaitForIPN -- Quá hạn 15 phút --> AutoExpire[Hệ thống tự hủy theo BR-ORD-001]
    AutoExpire --> ReleaseStock
```

## 3. Danh mục Điểm Rẽ nhánh (Decision Gates)
- **Điểm 1 (Thông tin hợp lệ?)**: Kiểm tra định dạng số điện thoại, địa chỉ nhận hàng.
- **Điểm 2 (Tồn kho đủ?)**: Kiểm tra số lượng tồn khả dụng trong bảng kho.
- **Điểm 3 (Phương thức?)**: Phân luồng giữa COD (Thanh toán khi nhận) và Online (Cổng điện tử).
- **Điểm 4 (Kết quả IPN?)**: Đón nhận 3 khả năng: Thành công, Thất bại do hủy, hoặc Quá hạn 15 phút.
