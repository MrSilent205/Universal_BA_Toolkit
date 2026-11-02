import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 * E2E TEST SUITE: [Module Name / Feature Title]
 * Document Reference: SRS-[MODULE-ID] | Rule 08 (Gherkin/BDD) | Rule 10 (API)
 * Target URL: /app/[feature-route]
 * ============================================================================
 */

test.describe('Module: [Feature Title] - Business Scenarios & Validation', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Setup mock data or authenticate test user session
    await page.goto('/login');
    await page.getByLabel('Tài khoản / Email').fill('tester@example.com');
    await page.getByLabel('Mật khẩu').fill('SecurePassword123!');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page).toHaveURL(/.*dashboard/);

    // 2. Navigate to target feature page
    await page.goto('/app/orders');
    await expect(page.getByRole('heading', { name: 'Quản lý Đơn Hàng' })).toBeVisible();
  });

  test('TC-01: Happy Path - Khách hàng tạo mới đơn hàng thành công', async ({ page }) => {
    // Given: Người dùng ở màn hình tạo mới
    await page.getByRole('button', { name: 'Tạo đơn mới' }).click();
    await expect(page.getByRole('dialog', { name: 'Thêm mới đơn hàng' })).toBeVisible();

    // When: Nhập đầy đủ thông tin hợp lệ
    await page.getByLabel('Khách hàng').click();
    await page.getByRole('option', { name: 'Công ty TNHH ABC' }).click();

    await page.getByLabel('Mã sản phẩm').fill('SKU-TEST-001');
    await page.getByLabel('Số lượng').fill('2');
    await page.getByLabel('Đơn giá').fill('150000');
    await page.getByLabel('Ghi chú đơn hàng').fill('Giao trong giờ hành chính');

    // And: Nhấn nút Lưu đơn hàng
    const submitButton = page.getByRole('button', { name: 'Lưu đơn hàng' });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Then: Hệ thống hiển thị thông báo thành công (Toast notification)
    const successToast = page.locator('.ant-notification-notice-success, [data-testid="toast-success"]');
    await expect(successToast).toBeVisible();
    await expect(successToast).toContainText('Tạo đơn hàng thành công');

    // And: Đơn hàng mới xuất hiện trên đầu bảng danh sách với trạng thái 'PENDING'
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toContainText('Công ty TNHH ABC');
    await expect(firstRow).toContainText('PENDING');
  });

  test('TC-02: Negative - Chặn submit khi bỏ trống trường bắt buộc', async ({ page }) => {
    // Given: Mở modal tạo mới
    await page.getByRole('button', { name: 'Tạo đơn mới' }).click();

    // When: Cố tình không nhập thông tin và nhấn Lưu
    const submitButton = page.getByRole('button', { name: 'Lưu đơn hàng' });
    await submitButton.click();

    // Then: Hiển thị thông báo validation lỗi màu đỏ cho các trường bắt buộc
    await expect(page.getByText('Vui lòng chọn khách hàng')).toBeVisible();
    await expect(page.getByText('Số lượng phải lớn hơn 0')).toBeVisible();

    // And: Modal không bị đóng lại
    await expect(page.getByRole('dialog', { name: 'Thêm mới đơn hàng' })).toBeVisible();
  });

  test('TC-03: Boundary & Business Rule - Cảnh báo vượt quá hạn mức tồn kho khả dụng', async ({ page }) => {
    // Given: Mở modal tạo mới
    await page.getByRole('button', { name: 'Tạo đơn mới' }).click();
    await page.getByLabel('Khách hàng').click();
    await page.getByRole('option', { name: 'Công ty TNHH ABC' }).click();

    // When: Nhập số lượng vượt quá tồn kho khả dụng (VD: Tồn kho chỉ còn 5, nhập 999)
    await page.getByLabel('Mã sản phẩm').fill('SKU-LIMITED-STOCK');
    await page.getByLabel('Số lượng').fill('999');

    // Then: Xuất hiện cảnh báo inline trực tiếp
    const stockWarning = page.locator('[data-testid="stock-error-message"]');
    await expect(stockWarning).toBeVisible();
    await expect(stockWarning).toContainText('Số lượng yêu cầu vượt quá tồn kho khả dụng');

    // And: Nút Lưu bị vô hiệu hóa (disabled)
    await expect(page.getByRole('button', { name: 'Lưu đơn hàng' })).toBeDisabled();
  });

  test('TC-04: Security & Idempotency - Không gửi lặp request khi nhấp nút liên tiếp', async ({ page }) => {
    await page.getByRole('button', { name: 'Tạo đơn mới' }).click();
    await page.getByLabel('Khách hàng').click();
    await page.getByRole('option', { name: 'Công ty TNHH ABC' }).click();
    await page.getByLabel('Mã sản phẩm').fill('SKU-TEST-001');
    await page.getByLabel('Số lượng').fill('1');

    // Intercept network call to verify single API invocation
    let apiCallCount = 0;
    await page.route('**/api/v1/orders', async route => {
      apiCallCount++;
      await route.continue();
    });

    const submitBtn = page.getByRole('button', { name: 'Lưu đơn hàng' });
    // Double click fast
    await submitBtn.click({ clickCount: 2, delay: 50 });

    // Ensure API was only dispatched once or button was immediately disabled
    expect(apiCallCount).toBeLessThanOrEqual(1);
  });

});
