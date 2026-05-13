import { test, expect } from "../../fixture/fixtures";

test.describe("Full Name Validation", () => {
  test("should accept valid first and last name @Critical", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.validNameData();

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
