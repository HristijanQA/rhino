import { Page, Locator } from "@playwright/test";

export class SignupPage1Locators {
  readonly page: Page;

  readonly headingSignup: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly dropdownCountry: Locator;
  readonly optionBenin: Locator;
  readonly buttonSubmit: Locator;
  readonly fristNameRequired: Locator;
  readonly lastNameRequired: Locator;
  readonly emailRequired: Locator;
  readonly passwordRequired: Locator;

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

    this.fristNameRequired = page.getByText("First Name is required");
    this.lastNameRequired = page.getByText("Last Name is required");
    this.emailRequired = page.getByText("Email is required");
    this.passwordRequired = page.getByText("Password is required");
  }
}