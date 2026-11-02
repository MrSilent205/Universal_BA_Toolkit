---
name: playwright-gen
description: "Sinh mã Kịch bản Kiểm thử Tự động E2E bằng Playwright TypeScript (.spec.ts): sử dụng locators chuẩn khả năng tiếp cận (getByRole, getByLabel), Page Object Model, auth fixture và assertions kiểm tra trạng thái"
metadata:
  phase: 07-testing
  category: business-analysis
  version: 2.0.0
  is_core: false
---

# /playwright-gen — Sinh Mã Kiểm thử Tự động Playwright E2E (.spec.ts) [STANDARD WORKFLOW]

Tự động chuyển hóa các kịch bản Acceptance Criteria và Test Cases thành mã nguồn kiểm thử toàn trình (End-to-End Automation Test) bằng framework Playwright (TypeScript), áp dụng các phương pháp tốt nhất trong ngành để bảo đảm kịch bản chạy ổn định, nhanh và không bị lỗi giả (flaky tests).

## Mục tiêu & Bối cảnh
- **Bối cảnh sử dụng**: Bắt buộc thực hiện khi đội dự án triển khai CI/CD tự động hóa kiểm thử hồi quy (Regression Testing), cần bộ test tự động chạy trước mỗi đợt deploy lên môi trường Staging/Production.
- **Đối tượng thụ hưởng**: QA Automation Engineers, Frontend Developers, DevOps Engineers.
- **Giá trị cốt lõi**: Tiết kiệm hàng trăm giờ chạy test thủ công lặp đi lặp lại; phát hiện ngay lập tức các lỗi hồi quy khi mã nguồn bị chỉnh sửa; đảm bảo giao diện web hoạt động trơn tru trên nhiều trình duyệt (Chromium, Firefox, WebKit).

## Cách thức kích hoạt & Tham số đầu vào
- **Cú pháp lệnh**: `/playwright-gen [tên_tính_năng] [đường_dẫn_file_test_cases_hoặc_wireframe]`
- **Dữ liệu đầu vào cần có**:
  - File Test Cases (`docs/{feature}/test/test-cases.md`) hoặc kịch bản AC.
  - File Wireframe HTML (`docs/{feature}/html-wireframe/...`) để trích xuất cấu trúc DOM và text nhãn.

## Quy chuẩn bắt buộc tuân thủ (Rules)
- `rules/08-gherkin-acceptance-criteria.md` — Cấu trúc kịch bản kiểm thử.
- `rules/14-test-case-traceability.md` — Ánh xạ tên test suite với mã `TC-xxx`.
- `rules/18-knowledge-graph-metadata.md` — Metadata liên kết tri thức hệ thống.

## Biểu mẫu tham chiếu (Template)
- `_templates/44-playwright-gen.spec.ts`

## Vị trí lưu tệp mặc định
- `tests/e2e/{feature}.spec.ts` (hoặc `docs/{feature}/test/{feature}.spec.ts`)

## Quy trình thực thi chi tiết
1. **Thiết lập Khung Kiểm thử Playwright Chuẩn mực**:
   - Sử dụng cú pháp TypeScript hiện đại:
     ```typescript
     import { test, expect } from '@playwright/test';
     ```
   - Gom nhóm các kịch bản liên quan trong khối `test.describe('Feature Name', () => { ... })`.
   - Cài đặt `test.beforeEach` để khởi tạo trạng thái và điều hướng đến màn hình đích.
2. **Sử dụng Locators Khả năng Tiếp cận Thân thiện (Resilient Locators)**:
   - *Nguyên tắc cốt lõi*: Tuyệt đối không dùng các selector CSS dễ vỡ (`div > div:nth-child(2) > input` hoặc class Tailwind phức tạp).
   - *Ưu tiên hàng đầu*:
     - `page.getByRole('button', { name: 'Thanh toán' })`
     - `page.getByLabel('Địa chỉ Email')`
     - `page.getByPlaceholder('Nhập họ và tên')`
     - `page.getByTestId('cart-item-row')` (Nếu có thuộc tính `data-testid`).
3. **Cài đặt Kịch bản Happy Path Toàn trình**:
   - Điền form, tương tác bàn phím, bấm xác nhận và kiểm tra kết quả:
     ```typescript
     test('TC-AUTH-001: Đăng nhập thành công và chuyển hướng đến Dashboard', async ({ page }) => {
       await page.goto('/login');
       await page.getByLabel('Email').fill('user@domain.vn');
       await page.getByLabel('Mật khẩu').fill('Pass@1234');
       await page.getByRole('button', { name: 'Đăng nhập' }).click();

       // Assert URL và hiển thị Dashboard
       await expect(page).toHaveURL(/.*dashboard/);
       await expect(page.getByRole('heading', { name: 'Tổng quan tài khoản' })).toBeVisible();
     });
     ```
4. **Cài đặt Kịch bản Negative Path & Kiểm tra Báo lỗi**:
   - Kiểm tra hiển thị thông báo lỗi khi nhập sai:
     ```typescript
     test('TC-AUTH-002: Báo lỗi khi nhập sai định dạng email', async ({ page }) => {
       await page.goto('/login');
       await page.getByLabel('Email').fill('email-sai-dinh-dang');
       await page.getByLabel('Mật khẩu').fill('123456');
       await page.getByRole('button', { name: 'Đăng nhập' }).click();

       const errorAlert = page.getByText('Email không đúng định dạng');
       await expect(errorAlert).toBeVisible();
     });
     ```
5. **Ghi tệp**:
   - Sử dụng template `_templates/44-playwright-gen.spec.ts` và lưu vào `tests/e2e/{feature}.spec.ts`.

## Tiêu chí Nghiệm thu (Quality Checklist)
- [ ] Mã nguồn TypeScript Playwright chuẩn xác, không có lỗi cú pháp hoặc import thiếu.
- [ ] Sử dụng các Locators thân thiện chuẩn tiếp cận (`getByRole`, `getByLabel`, `getByText`).
- [ ] Không sử dụng câu lệnh `page.waitForTimeout()` tĩnh (dễ gây flaky test); sử dụng auto-wait assertions của Playwright (`toBeVisible`, `toHaveURL`).
- [ ] Bao phủ cả kịch bản Happy Path và ít nhất 2 kịch bản Negative/Validation.
- [ ] Tên các block `test('TC-xxx: ...')` ánh xạ trực tiếp với mã Test Case trong tài liệu.
