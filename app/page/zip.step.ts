import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class ZipStep extends Component {
  private formContainer = this.page.locator("#form-container-1");
  private zipInput = this.formContainer.getByRole("textbox", {
    name: "Enter ZIP Code",
  });
  private nextButton = this.formContainer.getByRole("button", {
    name: "Next",
  });
  private errorBlock = this.formContainer.locator(
    ".step-1 .helpBlock[data-error-block]"
  );

  getLoadedIndicator(): Locator {
    return this.zipInput;
  }

  getValidationError(): Locator {
    return this.errorBlock;
  }

  @step()
  async getValidationErrorText(): Promise<string> {
    return (await this.errorBlock.textContent()) ?? "";
  }

  @step()
  async enterZip(zip: string) {
    await this.zipInput.fill(zip);
  }

  @step()
  async clickNext() {
    await this.nextButton.click();
  }
}
