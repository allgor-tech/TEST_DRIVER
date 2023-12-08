import { test, expect } from '@playwright/test';
import Selectors from '../pageElements/selectors';
import LoginSteps from '../pageSteps/loginSteps';

let webContext
let page;
let loginSteps: LoginSteps;

test.beforeEach(async ({ browser }) => {
  webContext = await browser.newContext({ storageState: process.env.STATE_PATH })
  page = await webContext.newPage();
  loginSteps = new LoginSteps(page);
  // Open URL
  await page.goto(process.env.URL);
  await page.waitForLoadState("domcontentloaded");
});

test('Driver List', async () => {
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
