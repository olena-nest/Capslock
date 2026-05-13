import { test, expect } from "../../fixture/fixtures";

test.describe("Single-Letter Last Name Validation", () => {
  test("should accept two-word name with single-letter last name @Critical @Bug", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.singleLetterLastNameData();

    await app.openHomePage();
    await app.submitZipStep(data.zip);
    await app.submitReasonsStep(data.reasons);
    await app.submitPropertyTypeStep(data.propertyType);

    await app.nameEmail.enterName(data.name);
    await app.nameEmail.enterEmail(data.email);
    await app.nameEmail.clickGoToEstimate();

    await expect(app.phone.getLoadedIndicator()).toBeVisible();
  });
});
