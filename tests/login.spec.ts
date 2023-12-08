import { test, expect } from '@playwright/test';
import Selectors from '../pageElements/selectors';
import LoginSteps from '../pageSteps/loginSteps';

let page;
let loginSteps: LoginSteps;

test.beforeEach(async ({ context }) => {
  page = await context.newPage();
  loginSteps = new LoginSteps(page);
  // Open URL
  await page.goto(process.env.URL);
  await page.waitForLoadState("domcontentloaded");
});

test.describe.parallel('Positive Test Cases', () => {
  test('Valid Login', async () => {
    await loginSteps.login(process.env.UNAME, process.env.PASS);
    await test.step('URL Validation', async () => {
      await page.waitForURL(`${process.env.URL}/chats`);
    });
  });
  
  test('Forgot password', async () => {
    await test.step('Click Forgot password', async () => {
      await page.getByText('Forgot password').click();
    });
    await test.step('URL Validation', async () => {
      await page.waitForURL(`${process.env.URL}/reset-password`);
    });
    await test.step('Fill in Email & Click Send button', async () => {
      await page.getByLabel('Email').fill(process.env.UNAME);
      await page.getByRole('button', { name: 'Send link to email' }).click();
    });
    await test.step('Validate a message', async () => {
      await expect(page.getByText('Password successfully reset.')).toBeVisible();
    });
  });

  test('Successful Logout', async () => {
    await loginSteps.login(process.env.UNAME, process.env.PASS);
    await test.step('Logging out', async () => {
      await page.locator(Selectors.BTN_USER_MENU).click();
      await page.getByText('Log out').click();
    });
    await test.step('URL Validation', async () => {
      await page.waitForURL(`${process.env.URL}/login`);
    });
  });
});

test.describe.parallel('Negative Test Cases', () => {
  test('Invalid Username', async () => {
    await loginSteps.login(`fake${process.env.UNAME}`, process.env.PASS);
    await loginSteps.confirmLoginError();
  });

  test('Invalid Password', async () => {
    await loginSteps.login(process.env.UNAME, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('Empty Username', async () => {
    await loginSteps.login(``, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('Empty Password', async () => {
    await loginSteps.login(process.env.UNAME, ``);
    await loginSteps.confirmLoginError();
  });

  test('Incorrect Credentials', async () => {
    await loginSteps.login(`fake${process.env.UNAME}`, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('SQL Injection Attempt', async () => {
    await loginSteps.login(`' OR 1=1-- `, `foo`);
    await loginSteps.confirmLoginError();
  });
});
