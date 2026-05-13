import { test, expect } from "../../fixture/fixtures";

test.describe("Step Counter Verification", () => {
  test("step counter should correctly reflect current step @High @Bug", async ({
    app,
    scenarios,
  }) => {
    const data = scenarios.stepCounterFlowData();

    await app.openHomePage();
    await app.submitZipStep(data.zip);

    await test.step("verify reasons step shows 2 of 5", async () => {
      await expect(app.stepProgress.getCurrentStep()).toHaveText("2");
      await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
    });

    await app.reasons.selectReasons(data.reasons);
    await app.reasons.clickNext();

    await test.step("verify property type step shows 3 of 5", async () => {
      await expect(app.stepProgress.getCurrentStep()).toHaveText("3");
      await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
    });

    await app.propertyType.selectPropertyType(data.propertyType);
    await app.propertyType.clickNext();

    await test.step("verify name/email step shows 4 of 5", async () => {
      await expect(app.stepProgress.getCurrentStep()).toHaveText("4");
      await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
    });

    await app.nameEmail.enterName(data.name);
    await app.nameEmail.enterEmail(data.email);
    await app.nameEmail.clickGoToEstimate();

    await test.step("verify phone step shows 5 of 5", async () => {
      await expect(app.stepProgress.getCurrentStep()).toHaveText("5");
      await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
    });
  });
});
