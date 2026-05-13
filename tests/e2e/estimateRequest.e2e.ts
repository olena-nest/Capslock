import { test, expect } from "../../fixture/fixtures";

test.describe("Estimate Request - Happy Path", () => {
  test("successful estimate request with valid user data @Critical", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.validFullRequest();

    await app.openHomePage();
    await app.submitZipStep(data.zip);
    await app.submitReasonsStep(data.reasons);
    await app.submitPropertyTypeStep(data.propertyType);
    await app.submitNameEmailStep(data.name, data.email);

    await app.phone.enterPhone(data.phone);
    await app.phone.clickSubmit();

    await expect(app.page).toHaveURL(/\/thankyou/);
    await expect(app.thankYou.getLoadedIndicator()).toBeVisible();
    await expect(app.thankYou.getCallbackMessage()).toBeVisible();
  });
});
