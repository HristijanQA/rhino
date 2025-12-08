import { Page, expect } from "@playwright/test";
import { DataGenerator } from "../utils/DataGenerator";
import { SignupPage1Locators } from "../objects/signup1.objects";
import { SignupPage2Locators } from "../objects/signup2.objects";

export class SignupPage {
  private uniqueEmail: string;
  private uniquePhoneNumber: string;
  readonly page: Page;
  readonly page1: SignupPage1Locators;
  readonly page2: SignupPage2Locators;

  constructor(page: Page) {
    this.page = page;
    this.page1 = new SignupPage1Locators(page);
    this.page2 = new SignupPage2Locators(page);

    this.uniqueEmail = DataGenerator.createUniqueEmail("test_signup");
    this.uniquePhoneNumber = DataGenerator.createUniquePhoneNumber();
  }

  async signupPage1(
    firstName: string,
    lastName: string,
    password: string,
    country: string = "Benin",
  ): Promise<string> {
    await expect(this.page1.headingSignup).toHaveText("Sign up");
    await this.page1.inputFirstName.fill(firstName);
    await this.page1.inputLastName.fill(lastName);
    await this.page1.inputEmail.fill(this.uniqueEmail);
    await this.page1.inputPassword.fill(password);

    await this.page1.dropdownCountry.click();
    await this.page.getByText(country).click();
    await this.page1.buttonSubmit.click();

    return this.uniqueEmail;
  }

  async signupPage2(
    day: string,
    month: string,
    year: string,
    gender: string,
    street: string,
    city: string,
    zipCode: string,
  ): Promise<string> {
    await this.page2.dropdownDay.click();
    await this.page.getByText(day).click();
    await this.page2.dropdownMonth.click();
    await this.page.getByRole("option", { name: month }).click();
    await this.page2.dropdownYear.click();
    await this.page.getByText(year).click();
    await this.page2.dropdownGender.click();
    await this.page.getByText(gender, { exact: true }).click();
    await this.page2.inputStreet.fill(street);
    await this.page2.inputCity.fill(city);
    await this.page2.inputZipCode.fill(zipCode);
    await this.page2.inputPhone.fill(this.uniquePhoneNumber);
    await this.page2.buttonComplete.click();
    await expect(this.page).toHaveURL(/my-space/);
    return this.uniqueEmail;
  }

  async getUniqueFiledsPage1() {
    await this.page1.inputFirstName.click();
    await this.page1.inputLastName.click();
    await this.page1.inputEmail.click();
    await this.page1.inputPassword.click();
    await this.page1.inputFirstName.click();

    await expect(this.page1.fristNameRequired).toBeVisible();
    await expect(this.page1.lastNameRequired).toBeVisible();
    await expect(this.page1.emailRequired).toBeVisible();
    await expect(this.page1.passwordRequired).toBeVisible();

    await expect(this.page1.buttonSubmit).toBeDisabled();
  }

  async getUniqueFiledsPage2() {
    await this.page2.dropdownDay.click();
    await this.page2.clickAwqy.click();
    await this.page2.dropdownMonth.click();
    await this.page2.clickAwqy.click();
    await this.page2.dropdownYear.click();
    await this.page2.clickAwqy.click();
    await this.page2.inputStreet.click();
    await this.page2.inputCity.click();
    await this.page2.inputZipCode.click();
    await this.page2.inputPhone.click();
    await this.page2.inputStreet.click();

    await expect(this.page2.dayRequired).toBeVisible();
    await expect(this.page2.monthRequired).toBeVisible();
    await expect(this.page2.streetRequired).toBeVisible();
    await expect(this.page2.cityRequired).toBeVisible();
    await expect(this.page2.zipRequired).toBeVisible();
    await expect(this.page2.phoneRequired).toBeVisible();

    await expect(this.page2.buttonComplete).toBeDisabled();
  }
}
