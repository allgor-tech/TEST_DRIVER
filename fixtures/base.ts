//base.js
import { chromium, test as baseTest } from "@playwright/test";
import LoginSteps from "../pageSteps/loginSteps";

type pages = {
    loginSteps: LoginSteps;
}

const testPages = baseTest.extend<pages>({
    page: async ({ }, use) => {
            const browser = await chromium.launch();
            const webContext = await browser.newContext({ storageState: process.env.STATE_PATH })
            const page = await webContext.newPage();
            await page.goto(process.env.URL);
            await page.waitForLoadState("domcontentloaded");
            await use(page);
    
    },
    loginSteps: async ({ page }, use) => {
        await use(new LoginSteps(page));
    },
});

export const test = testPages;
export const expect = testPages.expect;