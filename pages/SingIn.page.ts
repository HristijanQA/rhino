// pages/SignupPage.ts
import { Page, expect, Locator } from "@playwright/test";
import { DataGenerator } from "../utils/DataGenerator";

export class SignupPage {
  readonly page: Page;

  readonly headingSignup: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly dropdownCountry: Locator;
  readonly optionBenin: Locator;
  readonly buttonSubmit: Locator;
  readonly dropdownDay: Locator;
  readonly optionDay: Locator;
  readonly dropdownMonth: Locator;
  readonly optionMonth: Locator;
  readonly dropdownYear: Locator;
  readonly optionYear: Locator;
  readonly dropdownGender: Locator;
  readonly optionGenderMale: Locator;
  readonly inputStreet: Locator;
  readonly inputCity: Locator;
  readonly inputZipCode: Locator;
  readonly inputPhone: Locator;
  readonly buttonComplete: Locator;
  private uniqueEmail: string;
  private uniquePhoneNumber: string;
  readonly fristNameRequired: Locator;
  readonly lastNameRequired: Locator;
  readonly emailRequired: Locator;
  readonly passwordRequired: Locator;
  readonly dayRequired: Locator;
  readonly monthRequired: Locator;
  readonly genderRequired: Locator;
  readonly streetRequired: Locator;
  readonly cityRequired: Locator;
  readonly zipRequired: Locator;
  readonly phoneRequired: Locator;
  readonly clickAwqy: Locator;

  constructor(page: Page) {
    this.page = page;

    this.headingSignup = page.getByRole("heading", { name: "Sign up" });
    this.inputFirstName = page.getByRole("textbox", { name: "First name" });
    this.inputLastName = page.getByRole("textbox", { name: "Last name" });
    this.inputEmail = page.getByRole("textbox", { name: "Email address" });
    this.inputPassword = page.getByRole("textbox", { name: "Password" });
    this.dropdownCountry = page.getByLabel("", { exact: true });
    this.optionBenin = page.getByText("Benin");
    this.buttonSubmit = page.locator('button[type="submit"]');

    this.dropdownDay = page.locator("#mui-component-select-bDay");
    this.optionDay = page.getByText("08");
    this.dropdownMonth = page.locator("#mui-component-select-bMonth");
    this.optionMonth = page.getByRole("option", { name: "05" });
    this.dropdownYear = page.locator("#mui-component-select-bYear");
    this.optionYear = page.getByText("2000");
    this.dropdownGender = page.getByLabel("", { exact: true });
    this.optionGenderMale = page.getByText("Male", { exact: true });
    this.inputStreet = page.getByRole("textbox", { name: "Street address" });
    this.inputCity = page.getByRole("textbox", { name: "City" });
    this.inputZipCode = page.getByRole("textbox", { name: "Zip code" });
    this.inputPhone = page.getByRole("textbox", { name: "Phone number" });
    this.buttonComplete = page.getByRole("button", {
      name: "Complete and start playing",
    });
    this.clickAwqy = page.locator('.MuiBackdrop-root.MuiBackdrop-invisible')

    this.fristNameRequired = page.getByText("First Name is required");
    this.lastNameRequired = page.getByText("Last Name is required");
    this.emailRequired = page.getByText("Email is required");
    this.passwordRequired = page.getByText("Password is required");
    this.dayRequired = page.getByText("This value is required").first();
    this.monthRequired = page.getByText("This value is required").nth(1);
    this.genderRequired = page.getByText("Please make a selection");
    this.streetRequired = page.getByText("Enter address");
    this.cityRequired = page.getByText("Enter city");
    this.zipRequired = page.getByText("Enter zip/postal code");
    this.phoneRequired = page.getByText("Phone number is required");

    // Generate the unique email upon page object creation
    this.uniqueEmail = DataGenerator.createUniqueEmail("test_signup");
    this.uniquePhoneNumber = DataGenerator.createUniquePhoneNumber();
  }

  async signupPage1(
    firstName: string,
    lastName: string,
    password: string,
    country: string = "Benin"
  ): Promise<string> {
    await expect(this.headingSignup).toHaveText("Sign up");
    await this.inputFirstName.fill(firstName);
    await this.inputLastName.fill(lastName);
    await this.inputEmail.fill(this.uniqueEmail);
    await this.inputPassword.fill(password);

    await this.dropdownCountry.click();
    await this.page.getByText(country).click();
    await this.buttonSubmit.click();

    return this.uniqueEmail;
  }

  async signupPage2(
    day: string,
    month: string,
    year: string,
    gender: string,
    street: string,
    city: string,
    zipCode: string
  ): Promise<string> {
    await this.dropdownDay.click();
    await this.page.getByText(day).click();
    await this.dropdownMonth.click();
    await this.page.getByRole("option", { name: month }).click();
    await this.dropdownYear.click();
    await this.page.getByText(year).click();
    await this.dropdownGender.click();
    await this.page.getByText(gender, { exact: true }).click();
    await this.inputStreet.fill(street);
    await this.inputCity.fill(city);
    await this.inputZipCode.fill(zipCode);
    await this.inputPhone.fill(this.uniquePhoneNumber);
    await this.buttonComplete.click();
    await expect(this.page).toHaveURL(/my-space/);
    return this.uniqueEmail;
  }

  async getUniqueFiledsPage1() {
    await this.inputFirstName.click();
    await this.inputLastName.click();
    await this.inputEmail.click();
    await this.inputPassword.click();
    await this.inputFirstName.click();

    await expect(this.fristNameRequired).toBeVisible();
    await expect(this.lastNameRequired).toBeVisible();
    await expect(this.emailRequired).toBeVisible();
    await expect(this.passwordRequired).toBeVisible();

    await expect(this.buttonSubmit).toBeDisabled();

  }

    async getUniqueFiledsPage2() {
   await this.dropdownDay.click();
   await this.clickAwqy.click();
    await this.dropdownMonth.click();
    await this.clickAwqy.click();
    await this.dropdownYear.click();
    await this.clickAwqy.click();
    await this.inputStreet.click();
    await this.inputCity.click();
    await this.inputZipCode.click();
    await this.inputPhone.click();
    await this.inputStreet.click();

    await expect(this.dayRequired).toBeVisible();
    await expect(this.monthRequired).toBeVisible();
    await expect(this.streetRequired).toBeVisible();
    await expect(this.cityRequired).toBeVisible();
    await expect(this.zipRequired).toBeVisible();
    await expect(this.phoneRequired).toBeVisible();

    await expect(this.buttonComplete).toBeDisabled();

  }
}
