// registration.spec.ts
import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import { SignupPage } from "../pages/SignInPage.ts";
import { LOGIN_DATA } from "../test_data/login_data.ts";
import { USER_DATA } from "../test_data/user_data.ts";
import { SignupPage2Locators } from "../objects/signup2.objects.ts";

const USERNAME = LOGIN_DATA.USERNAME;
const PASSWORD = LOGIN_DATA.PASSWORD;
const BASE_URL = LOGIN_DATA.PROTECTED_URL;

let browser: Browser;
let context: BrowserContext;
let page: Page;
let signupPage: SignupPage;
let signupPage2: SignupPage2Locators;

let FIRST_NAME = USER_DATA.FIRST_NAME;
let LAST_NAME = USER_DATA.LAST_NAME;
let SIGNUP_PASSWORD = USER_DATA.SIGNUP_PASSWORD;
let DAY = USER_DATA.DAY;
let MONTH = USER_DATA.MONTH;
let YEAR = USER_DATA.YEAR;
let GENDER = USER_DATA.GENDER;
let STREET = USER_DATA.STREET;
let CITY = USER_DATA.CITY;
let ZIP = USER_DATA.ZIP;
let COUNTRY = USER_DATA.COUNTRY;

test.beforeEach("Setup browser, authenticate, and navigate", async () => {
  browser = await chromium.launch();
  context = await browser.newContext({
    httpCredentials: {
      username: USERNAME,
      password: PASSWORD,
    },
  });

  page = await context.newPage();
  signupPage = new SignupPage(page);
  signupPage2 = new SignupPage2Locators(page);
  await page.goto(BASE_URL);

  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page).toHaveURL(/register/);
});

test("Verify user can successfully create an account @regression @KAN-1", async () => {
  await signupPage.signupPage1(FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, COUNTRY);

  await signupPage.signupPage2(DAY, MONTH, YEAR, GENDER, STREET, CITY, ZIP);
  await expect(page).toHaveURL(/my-space/);
});

test("Verify user cannot create an account without entering password @regression @KAN-3", async () => {
  await signupPage.getUniqueFiledsPage1();
  await signupPage.signupPage1(FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, COUNTRY);

  await signupPage.getUniqueFiledsPage2();
});

test("Verify that invalid days (30, 31) cannot be selected when February is the chosen month @smoke @KAN-9", async () => {
  await signupPage.signupPage1(FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, COUNTRY);

  await signupPage2.dropdownDay.click();

  await expect(signupPage.page.getByText("30", { exact: true })).toBeVisible();
  await expect(signupPage.page.getByText("31", { exact: true })).toBeVisible();

  await signupPage2.clickAwqy.click();

  await signupPage2.dropdownMonth.click();
  await signupPage.page.getByRole("option", { name: "02" }).click();

  await signupPage2.dropdownDay.click();

  await expect(signupPage.page.getByText("30", { exact: true })).toBeHidden();
  await expect(signupPage.page.getByText("31", { exact: true })).toBeHidden();
});

test("Country/Region selection persists when navigating back from screen 2 @smoke @KAN-8", async () => {
  await signupPage.signupPage1(FIRST_NAME, LAST_NAME, SIGNUP_PASSWORD, COUNTRY);

  await expect(signupPage2.dropdownDay).toBeVisible();

  const backBtn = page.locator(".icon-wrapper.modal-back > img");
  await backBtn.click();

  const countryLocator = page.getByText(COUNTRY, { exact: true });

  await expect(
    countryLocator,
    `FAILURE: Expected the selected country, to be visible after navigating back. Locator failed to find text.`
  ).toBeVisible();

  console.log(`Assertion passed: Country is visible after navigating back.`);
});

test.afterEach(async () => {
  await browser.close();
});
