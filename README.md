# PlaywrightTS (Rhino) — E2E Test Suite

Overview
- Playwright + TypeScript end-to-end tests for the Rhino signup/registration flows.
- Tests: d:\Playwrite\Rihno\PlaywriteTS\tests
- Page objects: d:\Playwrite\Rihno\PlaywriteTS\pages
- Test data & config: d:\Playwrite\Rihno\PlaywriteTS\test_data (source of truth for credentials and user inputs)

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

Best practices
- Edit values in `test_data/*.ts` to change test inputs.
- Do not commit `test.only`.
- Use page objects in `pages/` to centralize locators and actions.
- Prefer exact text matching when duplicates exist:
  ```ts
  page.getByText('30', { exact: true })
  ```
- Wait for UI transitions with `expect(locator).toBeVisible()`; avoid fixed sleeps.
- Add sensitive files to `.gitignore` if needed.

Known bug: Country reset
- Repro steps are included in tests: selecting Country/Region on screen 1, going to screen 2 and back, may reset the dropdown.
- Suggested frontend fix: lift the country value into shared form state (parent/context or a form store) so it persists across steps.

Debugging failing locators
1. Run in headed mode: `npx playwright test --headed`
2. Add `await page.pause()` before the failing assertion to inspect DOM.
3. In the inspector console:
   ```ts
   await page.locator('selector').evaluateAll(e => e.map(n => n.innerText))
   ```

Adding new tests
- Create `*.spec.ts` or `*.test.ts` in `tests/`.
- Reuse `SignupPage` methods (e.g., `signupPage.signupPage1`, `signupPage.signupPage2`).
- Use Playwright `expect` and wait for key elements before actions.

Optional: npm script (package.json)
```json
"scripts": {
  "test": "npx playwright test"
}
```

Notes
- Keep secrets out of source control; prefer CI secrets or local-only files.