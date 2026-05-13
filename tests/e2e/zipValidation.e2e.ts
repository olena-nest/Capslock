import { test, expect } from "../../fixture/fixtures";

test.describe("ZIP Code Validation", () => {
  test("should block invalid 6-digit ZIP code @Critical @Bug", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.invalidZipSixDigits();

    await app.openHomePage();
    await app.zip.enterZip(data.zip);
    await app.zip.clickNext();

    await expect(app.zip.getLoadedIndicator()).toBeVisible();
    await expect(app.zip.getValidationError()).toBeVisible();
    await expect(app.zip.getValidationError()).toHaveText("Wrong ZIP code.");
  });
});
