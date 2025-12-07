import { Page, Locator } from "@playwright/test";

export class SignupPage2Locators {
  readonly page: Page;

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
  readonly clickAwqy: Locator;
  readonly dayRequired: Locator;
  readonly monthRequired: Locator;
  readonly genderRequired: Locator;
  readonly streetRequired: Locator;
  readonly cityRequired: Locator;
  readonly zipRequired: Locator;
  readonly phoneRequired: Locator;

  constructor(page: Page) {
    this.page = page;

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
    this.clickAwqy = page.locator('.MuiBackdrop-root.MuiBackdrop-invisible');

    this.dayRequired = page.getByText("This value is required").first();
    this.monthRequired = page.getByText("This value is required").nth(1);
    this.genderRequired = page.getByText("Please make a selection");
    this.streetRequired = page.getByText("Enter address");
    this.cityRequired = page.getByText("Enter city");
    this.zipRequired = page.getByText("Enter zip/postal code");
    this.phoneRequired = page.getByText("Phone number is required");
  }
}