import { Page, Locator } from "@playwright/test";

export class SignupPage2Locators {
  readonly page: Page;

  readonly buttonComplete: Locator;
  readonly cityRequired: Locator;
  readonly clickAwqy: Locator;
  readonly dayRequired: Locator;
  readonly dropdownDay: Locator;
  readonly dropdownGender: Locator;
  readonly dropdownMonth: Locator;
  readonly dropdownYear: Locator;
  readonly genderRequired: Locator;
  readonly inputCity: Locator;
  readonly inputPhone: Locator;
  readonly inputStreet: Locator;
  readonly inputZipCode: Locator;
  readonly monthRequired: Locator;
  readonly optionDay: Locator;
  readonly optionGenderMale: Locator;
  readonly optionMonth: Locator;
  readonly optionYear: Locator;
  readonly phoneRequired: Locator;
  readonly streetRequired: Locator;
  readonly zipRequired: Locator;

  constructor(page: Page) {
    this.page = page;

    this.buttonComplete = page.getByRole("button", {
      name: "Complete and start playing", });
    this.cityRequired = page.getByText("Enter city");
    this.clickAwqy = page.locator(".MuiBackdrop-root.MuiBackdrop-invisible");
    this.dayRequired = page.getByText("This value is required").first();
    this.dropdownDay = page.locator("#mui-component-select-bDay");
    this.dropdownGender = page.getByLabel("", { exact: true });
    this.dropdownMonth = page.locator("#mui-component-select-bMonth");
    this.dropdownYear = page.locator("#mui-component-select-bYear");
    this.genderRequired = page.getByText("Please make a selection");
    this.inputCity = page.getByRole("textbox", { name: "City" });
    this.inputPhone = page.getByRole("textbox", { name: "Phone number" });
    this.inputStreet = page.getByRole("textbox", { name: "Street address" });
    this.inputZipCode = page.getByRole("textbox", { name: "Zip code" });
    this.monthRequired = page.getByText("This value is required").nth(1);
    this.optionDay = page.getByText("08");
    this.optionGenderMale = page.getByText("Male", { exact: true });
    this.optionMonth = page.getByRole("option", { name: "05" });
    this.optionYear = page.getByText("2000");
    this.phoneRequired = page.getByText("Phone number is required");
    this.streetRequired = page.getByText("Enter address");
    this.zipRequired = page.getByText("Enter zip/postal code");
  }
}
