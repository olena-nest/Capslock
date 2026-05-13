import { defineConfig, devices } from "@playwright/test";
import { env } from "./env";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list", { printSteps: true }],
    ["html", { open: "never" }],
  ],
  use: {
    baseURL: env.BASE_URL,
    headless: process.env.CI ? true : false,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
  },
  projects: [
    {
      name: "e2e",
      testMatch: /.*\.e2e\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
