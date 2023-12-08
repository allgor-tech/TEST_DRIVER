import { test, expect } from '../fixtures/base';
import Selectors from '../pageElements/selectors';
import LoginSteps from '../pageSteps/loginSteps';

test.use({
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto(process.env.URL);
    await page.waitForLoadState("domcontentloaded");
    await use(page);
  },
  loginSteps: async ({ page }, use) => {
    await use(new LoginSteps(page));
  }
});

test.describe.parallel('Positive Test Cases', () => {
  test('Valid Login', async ({ page, loginSteps }) => {
    await loginSteps.login(process.env.UNAME, process.env.PASS);
    await test.step('URL Validation', async () => {
      await page.waitForURL(`${process.env.URL}/chats`);
    });
  });
  
  test('Forgot password', async ({ page, loginSteps }) => {
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

  test('Successful Logout', async ({ page, loginSteps }) => {
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
  test('Invalid Username', async ({ loginSteps }) => {
    await loginSteps.login(`fake${process.env.UNAME}`, process.env.PASS);
    await loginSteps.confirmLoginError();
  });

  test('Invalid Password', async ({ loginSteps }) => {
    await loginSteps.login(process.env.UNAME, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('Empty Username', async ({ loginSteps }) => {
    await loginSteps.login(``, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('Empty Password', async ({ loginSteps }) => {
    await loginSteps.login(process.env.UNAME, ``);
    await loginSteps.confirmLoginError();
  });

  test('Incorrect Credentials', async ({ loginSteps }) => {
    await loginSteps.login(`fake${process.env.UNAME}`, `fake${process.env.PASS}`);
    await loginSteps.confirmLoginError();
  });

  test('SQL Injection Attempt', async ({ loginSteps }) => {
    await loginSteps.login(`' OR 1=1-- `, `foo`);
    await loginSteps.confirmLoginError();
  });
});
