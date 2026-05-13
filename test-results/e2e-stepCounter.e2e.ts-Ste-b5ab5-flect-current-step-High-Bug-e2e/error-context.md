# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/stepCounter.e2e.ts >> Step Counter Verification >> step counter should correctly reflect current step @High @Bug
- Location: tests/e2e/stepCounter.e2e.ts:4:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#form-container-1 [data-form-progress]').locator('[data-form-progress-current-step]')
Expected: "3"
Received: "2"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#form-container-1 [data-form-progress]').locator('[data-form-progress-current-step]')
    14 × locator resolved to <span data-current-step="1" class="stepProgress__stepCurrent" data-form-progress-current-step="">2</span>
       - unexpected value "2"

```

```yaml
- text: "2"
```

# Test source

```ts
  1  | import { test, expect } from "../../fixture/fixtures";
  2  | 
  3  | test.describe("Step Counter Verification", () => {
  4  |   test("step counter should correctly reflect current step @High @Bug", async ({
  5  |     app,
  6  |     scenarios,
  7  |   }) => {
  8  |     const data = scenarios.stepCounterFlowData();
  9  | 
  10 |     await app.openHomePage();
  11 |     await app.submitZipStep(data.zip);
  12 | 
  13 |     await test.step("verify reasons step shows 2 of 5", async () => {
  14 |       await expect(app.stepProgress.getCurrentStep()).toHaveText("2");
  15 |       await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
  16 |     });
  17 | 
  18 |     await app.reasons.selectReasons(data.reasons);
  19 |     await app.reasons.clickNext();
  20 | 
  21 |     await test.step("verify property type step shows 3 of 5", async () => {
> 22 |       await expect(app.stepProgress.getCurrentStep()).toHaveText("3");
     |                                                       ^ Error: expect(locator).toHaveText(expected) failed
  23 |       await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
  24 |     });
  25 | 
  26 |     await app.propertyType.selectPropertyType(data.propertyType);
  27 |     await app.propertyType.clickNext();
  28 | 
  29 |     await test.step("verify name/email step shows 4 of 5", async () => {
  30 |       await expect(app.stepProgress.getCurrentStep()).toHaveText("4");
  31 |       await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
  32 |     });
  33 | 
  34 |     await app.nameEmail.enterName(data.name);
  35 |     await app.nameEmail.enterEmail(data.email);
  36 |     await app.nameEmail.clickGoToEstimate();
  37 | 
  38 |     await test.step("verify phone step shows 5 of 5", async () => {
  39 |       await expect(app.stepProgress.getCurrentStep()).toHaveText("5");
  40 |       await expect(app.stepProgress.getTotalSteps()).toHaveText("5");
  41 |     });
  42 |   });
  43 | });
  44 | 
```