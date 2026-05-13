import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class NameEmailStep extends Component {
  private formContainer = this.page.locator("#form-container-1");
  private title = this.formContainer.getByText(
    "Who should we prepare this FREE estimate for?"
  );
  private nameInput = this.formContainer.getByRole("textbox", {
    name: "Enter Your Name",
  });
  private emailInput = this.formContainer.getByRole("textbox", {
    name: "Enter Your Email",
  });
  private goToEstimateButton = this.formContainer.getByRole("button", {
    name: "Go To Estimate",
  });
  private errorBlock = this.formContainer.locator(".step-4 .helpBlock");

  getLoadedIndicator(): Locator {
    return this.title;
  }

  getValidationError(): Locator {
    return this.errorBlock;
  }

  @step()
  async enterName(name: string) {
    await this.nameInput.fill(name);
  }

  @step()
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  @step()
  async clickGoToEstimate() {
    await this.goToEstimateButton.click();
  }
}
