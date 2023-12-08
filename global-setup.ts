// global-setup.ts
import { chromium } from '@playwright/test';
import Selectors from './pageElements/selectors';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    // Open URL
    console.log("Getting The Login State");
    await page.goto(process.env.URL);
    await page.waitForLoadState("domcontentloaded");
    // Log In
    await page.locator(Selectors.FIELD_UNAME).fill(process.env.UNAME);
    await page.locator(Selectors.FIELD_PWD).fill(process.env.PASS);
    await page.locator(Selectors.BTN_LOGIN).click();
    await page.waitForLoadState("domcontentloaded");
    // Storage State
    await page.context().storageState({ path: process.env.STATE_PATH as string });
    console.log("The Login State has been saved");
  } catch (error) {
    throw new Error("The Login State has not been saved");
  }
}
export default globalSetup;
