import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class ReasonsStep extends Component {
  private formContainer = this.page.locator("#form-container-1");
  private title = this.formContainer.getByText(
    "Why are you interested in a walk-in tub?"
  );
  private nextButton = this.formContainer.getByRole("button", {
    name: "Next",
  });

  getLoadedIndicator(): Locator {
    return this.title;
  }

  @step()
  async selectReasons(reasons: string[]) {
    for (const reason of reasons) {
      await this.formContainer.getByText(reason, { exact: true }).click();
    }
  }

  @step()
  async clickNext() {
    await this.nextButton.click();
  }
}
