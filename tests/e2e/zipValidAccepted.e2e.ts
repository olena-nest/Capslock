import { test, expect } from "../../fixture/fixtures";

test.describe("ZIP Code - Valid Input", () => {
  test("should accept valid 5-digit ZIP code", async ({ app, scenarios }) => {
    const data = scenarios.validZipFiveDigits();

    await app.openHomePage();
    await app.zip.enterZip(data.zip);
    await app.zip.clickNext();

    await expect(app.reasons.getLoadedIndicator()).toBeVisible();
  });
});
