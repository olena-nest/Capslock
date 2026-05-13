import type { Locator } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class StepProgress extends Component {
  private progressContainer = this.page.locator(
    "#form-container-1 [data-form-progress]"
  );
  private stepCurrent = this.progressContainer.locator(
    "[data-form-progress-current-step]"
  );
  private stepTotal = this.progressContainer.locator(
    ".stepProgress__total"
  );

  getLoadedIndicator(): Locator {
    return this.stepCurrent;
  }

  getCurrentStep(): Locator {
    return this.stepCurrent;
  }

  getTotalSteps(): Locator {
    return this.stepTotal;
  }

  @step()
  async getStepText(): Promise<string> {
    const current = await this.stepCurrent.textContent();
    const total = await this.stepTotal.textContent();
    return `${current} of ${total}`;
  }
}
