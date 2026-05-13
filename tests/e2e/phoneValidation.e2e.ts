import { test, expect } from "../../fixture/fixtures";

test.describe("Phone Number Validation", () => {
  test("should reject fake/repeated phone number @High @Bug", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.fakePhoneData();

    await app.navigateToPhoneStep(data);

    await app.phone.enterPhone(data.phone);
    await app.phone.clickSubmit();

    await expect(app.page).not.toHaveURL(/\/thankyou/);
    await expect(app.phone.getLoadedIndicator()).toBeVisible();
  });
});
