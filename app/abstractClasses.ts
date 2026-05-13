import type { Locator, Page } from "@playwright/test";
import { step } from "../utils/reporters/step";

export abstract class PageHolder {
  constructor(public readonly page: Page) {}
}

export abstract class Component extends PageHolder {
  /**
   * Returns the primary locator used to determine if this component is loaded.
   * Tests should assert on this locator directly.
   */
  abstract getLoadedIndicator(): Locator;
}

export abstract class AppPage extends Component {
  public abstract pagePath: string;

  @step()
  async open(path?: string) {
    await this.page.goto(path ?? this.pagePath);
  }
}
