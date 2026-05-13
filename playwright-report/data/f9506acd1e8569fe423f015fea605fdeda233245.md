# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/phoneValidation.e2e.ts >> Phone Number Validation >> should reject fake/repeated phone number @High @Bug
- Location: tests/e2e/phoneValidation.e2e.ts:4:7

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/thankyou/
Received string: "https://test-qa.capslock.global/thankyou"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    14 × unexpected value "https://test-qa.capslock.global/thankyou"

```

```yaml
- heading "Thank you!" [level=1]
- paragraph: We will be calling within the next 10 minutes to confirm your estimate and ensure you get the best price!
- paragraph: This is not a sales call – we simply have to ask a couple of quick questions.
- img "logo"
- img "logo"
- img "logo"
- img "logo"
- img "logo"
- contentinfo: © Caps Lock, 2026. All Rights Reserved.
```

# Test source

```ts
  1  | import { test, expect } from "../../fixture/fixtures";
  2  | 
  3  | test.describe("Phone Number Validation", () => {
  4  |   test("should reject fake/repeated phone number @High @Bug", async ({
  5  |     app,
  6  |     scenarios,
  7  |   }) => {
  8  |     const data = scenarios.fakePhoneData();
  9  | 
  10 |     await app.navigateToPhoneStep(data);
  11 | 
  12 |     await app.phone.enterPhone(data.phone);
  13 |     await app.phone.clickSubmit();
  14 | 
> 15 |     await expect(app.page).not.toHaveURL(/\/thankyou/);
     |                                ^ Error: expect(page).not.toHaveURL(expected) failed
  16 |     await expect(app.phone.getLoadedIndicator()).toBeVisible();
  17 |   });
  18 | });
  19 | 
```