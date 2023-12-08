// global-setup.ts
import { chromium } from '@playwright/test';
import LoginSteps from './pageSteps/loginSteps';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginSteps = new LoginSteps(page);
  try {
    // Open URL
    console.log("Getting The Login State");
    await page.goto(process.env.URL);
    await page.waitForLoadState("domcontentloaded");
    // Log In
    await loginSteps.login(process.env.UNAME, process.env.PASS);
    await page.waitForLoadState("domcontentloaded");
    // Storage State
    await page.context().storageState({ path: process.env.STATE_PATH as string });
    console.log("The Login State has been saved");
  } catch (error) {
    throw new Error("The Login State has not been saved");
  }
}
export default globalSetup;
