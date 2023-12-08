import { test, expect } from '../fixtures/base';
import Selectors from '../pageElements/selectors';

test.beforeEach(async ({ page }) => {
  // Open URL
  await page.goto(process.env.URL);
  await page.waitForLoadState("domcontentloaded");
});

test('Driver List', async ({ page }) => {
  await test.step('Navigate to drivers page', async () => {
    await page.locator(Selectors.BTN_MENU_USER).click();
    await page.locator(Selectors.BTN_MENU_USER_DRIVERS).click();
    await page.waitForURL(`${process.env.URL}/users/drivers`);
  });
  await test.step('Find a table which cells contain data', async () => {
    const tableWithData = page.locator('table').filter({ has: page.locator(Selectors.TABLE_CELL_WITH_DATA)})
    await expect(tableWithData).toBeVisible();
  });
});
