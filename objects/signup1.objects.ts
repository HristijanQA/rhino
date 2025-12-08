import { Page, Locator } from "@playwright/test";

export class SignupPage1Locators {
  readonly page: Page;

  readonly buttonSubmit: Locator;
  readonly dropdownCountry: Locator;
  readonly emailRequired: Locator;
  readonly fristNameRequired: Locator;
  readonly headingSignup: Locator;
  readonly inputEmail: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPassword: Locator;
  readonly lastNameRequired: Locator;
  readonly optionBenin: Locator;
  readonly passwordRequired: Locator;

  constructor(page: Page) {
    this.page = page;


    this.buttonSubmit = page.locator('button[type="submit"]');
    this.dropdownCountry = page.getByLabel("", { exact: true });
    this.emailRequired = page.getByText("Email is required");
    this.fristNameRequired = page.getByText("First Name is required");
    this.headingSignup = page.getByRole("heading", { name: "Sign up" });
    this.inputEmail = page.getByRole("textbox", { name: "Email address" });
    this.inputFirstName = page.getByRole("textbox", { name: "First name" });
    this.inputLastName = page.getByRole("textbox", { name: "Last name" });
    this.inputPassword = page.getByRole("textbox", { name: "Password" });
    this.lastNameRequired = page.getByText("Last Name is required");
    this.optionBenin = page.getByText("Benin");
    this.passwordRequired = page.getByText("Password is required");
  }
}
