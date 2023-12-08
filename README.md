Hello, there are two Smole Playwright test files in the test folder. These files include both positive and negative scenarios for the login page and indicate that a web table is not empty.

# STEPS TO RUN AUTOTESTS

1. Install Playwright with - npm init playwright@latest
(during the installation process, please update your browsers and do not change the configuration file).

2. Specify Credentials in .env file.

3. Commands to run autotets:
    - "npx playwright test" to run everything.
    - "npx playwright test testName.spec" to run a specific test file.

4. Have Fun!


# Automated Tests for Web Login Page using Playwright

## Positive Test Cases

### Valid Login

1. **Navigate to Login Page:**
   - Open the login page at `${process.env.URL}/login`.

2. **Enter Valid Credentials:**
   - Provide a valid username and password using the `loginSteps.login` method.

3. **Submit Login Form:**
   - Click the login button.

4. **Verify Successful Login:**
   - Ensure the URL is redirected to `${process.env.URL}/chats`.

### Forgot Password

1. **Click Forgot Password:**
   - Click on the "Forgot password" link.

2. **Verify URL Redirect:**
   - Confirm the URL redirection to `${process.env.URL}/reset-password`.

3. **Fill in Email and Send:**
   - Enter the email.
   - Click the "Send link to email" button.

4. **Validate Success Message:**
   - Confirm the presence of the success message: "Password successfully reset."

### Successful Logout

1. **Login:**
   - Log in using valid credentials.

2. **Open User Menu:**
   - Click on the user menu button.

3. **Click Logout:**
   - Click on the "Log out" option.

4. **Verify Logout:**
   - Ensure the URL is redirected to `${process.env.URL}/login`.

## Negative Test Cases

### Invalid Username

1. **Enter Invalid Username:**
   - Input an invalid username using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating an invalid username.

### Invalid Password

1. **Enter Invalid Password:**
   - Input an invalid password using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating an invalid password.

### Empty Username

1. **Submit Empty Username:**
   - Enter an empty username using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating a required username.

### Empty Password

1. **Submit Empty Password:**
   - Enter an empty password using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating a required password.

### Incorrect Credentials

1. **Enter Incorrect Credentials:**
   - Input incorrect username and password using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating incorrect credentials.

### SQL Injection Attempt

1. **Attempt SQL Injection:**
   - Try a SQL injection attempt using the `loginSteps.login` method.

2. **Submit Login Form:**
   - Click on the login button.

3. **Verify Error Message:**
   - Confirm the presence of an error message indicating a login error.



# Automated Test for Driver List Page using Playwright

## Driver List

### Navigate to Drivers Page

1. **Navigate to Drivers Page:**
   - Open the user menu.
   - Select the "Drivers" option from the user menu.
   - Verify that the URL is redirected to the Drivers page.

### Find a Table with Data

1. **Find a Table with Data:**
   - Locate a table on the Drivers page.
   - Filter the table to find cells containing data.
   - Filter the table further to include only tables with data.
   - Verify that the filtered table is visible.

