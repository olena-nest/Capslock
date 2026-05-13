import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class PhoneStep extends Component {
  private formContainer = this.page.locator("#form-container-1");
  private title = this.formContainer.getByText("LAST STEP!");
  private phoneInput = this.formContainer.getByRole("textbox", {
    name: "(XXX)XXX-XXXX",
  });
  private submitButton = this.formContainer.getByRole("button", {
    name: "Submit Your Request",
  });
  private errorBlock = this.formContainer.locator(".step-5 .helpBlock");

  getLoadedIndicator(): Locator {
    return this.title;
  }

  getValidationError(): Locator {
    return this.errorBlock;
  }

  @step()
  async getValidationErrorText(): Promise<string> {
    return (await this.errorBlock.textContent()) ?? "";
  }

  @step()
  async enterPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  @step()
  async clickSubmit() {
    await this.submitButton.click();
  }
}
