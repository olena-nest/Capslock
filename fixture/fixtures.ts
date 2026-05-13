import { test as base } from "@playwright/test";
import { Application } from "../app";
import { EstimateRequestScenarios } from "../test-data/scenarios/estimate-request.scenarios";

interface TestFixtures {
  app: Application;
  scenarios: EstimateRequestScenarios;
}

export const test = base.extend<TestFixtures>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },

  // eslint-disable-next-line no-empty-pattern
  scenarios: async ({}, use) => {
    const scenarios = new EstimateRequestScenarios();
    await use(scenarios);
  },
});

export { expect } from "@playwright/test";
