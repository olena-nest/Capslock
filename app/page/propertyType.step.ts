import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class PropertyTypeStep extends Component {
  private formContainer = this.page.locator("#form-container-1");
  private title = this.formContainer.getByText(
    "What type of property is this for?"
  );
  private nextButton = this.formContainer.getByRole("button", {
    name: "Next",
  });

  getLoadedIndicator(): Locator {
    return this.title;
  }

  @step()
  async selectPropertyType(type: string) {
    await this.formContainer.getByText(type, { exact: true }).click();
  }

  @step()
  async clickNext() {
    await this.nextButton.click();
  }
}
