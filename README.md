# PlaywrightTS (Rhino) — E2E Test Suite

Overview

- Playwright + TypeScript end-to-end tests for the Rhino signup/registration flows.
- Tests: d:\Playwrite\Rihno\PlaywriteTS\tests
- Page methods: d:\Playwrite\Rihno\PlaywriteTS\pages
- Locators (organized by page step): d:\Playwrite\Rihno\PlaywriteTS\pages\objects
- Test data & config: d:\Playwrite\Rihno\PlaywriteTS\test_data (source of truth for credentials and user inputs)

Project structure

```
PlaywriteTS/
├── pages/
│   └── SignInPage.ts (main page methods)
├── pages/objects/
│   ├── signupPage1.locators.ts (page 1 locators)
│   └── signupPage2.locators.ts (page 2 locators)
├── tests/
│   └── registration_page.test.ts
├── test_data/
│   ├── logIn.data.ts (USERNAME, PASSWORD, PROTECTED_URL)
│   └── user.data.ts (FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, etc.)
├── utils/
│   └── DataGenerator.ts (utility functions for test data generation)
└── README.md
```

Prerequisites

- Node.js >= 16
- npm
- Windows (PowerShell examples)

Install

1. Open PowerShell in project root: `d:\Playwrite\Rihno\PlaywriteTS`
2. Install dependencies:
   ```powershell
   npm install
   npx playwright install
   ```

Test data / Environment

- This project uses files in `test_data/` for credentials and user values:
  - Login: `test_data/logIn.data.ts` (USERNAME, PASSWORD, PROTECTED_URL)
  - User: `test_data/user.data.ts` (FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, DAY, MONTH, YEAR, GENDER, STREET, CITY, ZIP, COUNTRY)
- **Required:** Populate `test_data/logIn.data.ts` with valid credentials to run tests.

Common commands

- Run all tests:
  ```powershell
  npx playwright test
  ```
- Run a single file:
  ```powershell
  npx playwright test tests/registration_page.test.ts
  ```
- Run a single test by title:
  ```powershell
  npx playwright test -g "Country/Region selection persists"
  ```
- Headed mode:
  ```powershell
  npx playwright test --headed
  ```
- Trace recording:
  ```powershell
  npx playwright test --trace on
  ```
- Debug (pause):
  ```powershell
  PWDEBUG=1 npx playwright test --debug
  ```
  or add `await page.pause()` inside a test.

Page objects & locators

- Locators are organized by page step:
  - `signupPage.page1` → `SignupPage1Locators` (first name, last name, email, password, country dropdown)
  - `signupPage.page2` → `SignupPage2Locators` (day, month, year, gender, street, city, zip, phone)
- Access locators in tests:
  ```ts
  signupPage.page1.inputFirstName;
  signupPage.page1.dropdownCountry;
  signupPage.page2.dropdownDay;
  signupPage.page2.inputStreet;
  ```

Page methods

- `signupPage1(firstName, lastName, password, country)` - Completes page 1 signup form.
- `signupPage2(day, month, year, gender, street, city, zipCode)` - Completes page 2 with personal info.
- `getUniqueFiledsPage1()` - Validates required field errors on page 1.
- `getUniqueFiledsPage2()` - Validates required field errors on page 2.

  Utilities

- `DataGenerator.ts`: Contains helper functions for generating unique test data
  - `createUniqueEmail(prefix)` - Generates unique email for each test run
  - `createUniquePhoneNumber()` - Generates unique phone number

Best practices

- Edit values in `test_data/*.ts` to change test inputs.
- Do not commit `test.only`.
- Use page objects in `pages/` to centralize locators and actions.
- Prefer exact text matching when duplicates exist:
  ```ts
  page.getByText("30", { exact: true });
  ```
- Wait for UI transitions with `expect(locator).toBeVisible()`; avoid fixed sleeps.
- Add sensitive files to `.gitignore` if needed.

Debugging failing locators

1. Run in headed mode: `npx playwright test --headed`
2. Add `await page.pause()` before the failing assertion to inspect DOM.
3. In the inspector console:
   ```ts
   await page.locator("selector").evaluateAll((e) => e.map((n) => n.innerText));
   ```

Adding new tests

- Create `*.spec.ts` or `*.test.ts` in `tests/`.
- Reuse `SignupPage` methods:
  ```ts
  await signupPage.signupPage1(FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, COUNTRY);
  await signupPage.signupPage2(DAY, MONTH, YEAR, GENDER, STREET, CITY, ZIP);
  ```
- Use Playwright `expect` and wait for key elements before actions.

Optional: npm script (package.json)

```json
"scripts": {
  "test": "npx playwright test"
}
```

Notes

- Keep secrets out of source control; prefer CI secrets or local-only files.
- Populate `test_data/logIn.data.ts` (USERNAME, PASSWORD, PROTECTED_URL) to enable test execution.
- Remove `test.only` before running or committing the full suite.
