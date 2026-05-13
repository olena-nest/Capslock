import type { Locator } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../utils/reporters/step";

export class ThankYouPage extends AppPage {
  public pagePath = "/thankyou";

  private thankYouHeading = this.page.getByText("Thank you!");
  private callbackMessage = this.page.getByText(
    "We will be calling within the next 10 minutes"
  );

  getLoadedIndicator(): Locator {
    return this.thankYouHeading;
  }

  getCallbackMessage(): Locator {
    return this.callbackMessage;
  }

  @step()
  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
