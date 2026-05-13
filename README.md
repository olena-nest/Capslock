Dear Team,

Please note that this framework represents one possible approach to building a test automation framework.

Two tests are intentionally failing because they identify existing bugs in the application. 

Also, this framework does not represent the AI setup, which of course should be included in a real project setup to support test generation, maintenance, documentation, and analysis.

Best regards,
Olena


# Capslock Walk-In Tub — E2E Test Framework

Playwright-based end-to-end test suite for the [Capslock QA test task](https://test-qa.capslock.global/) multi-step estimate request form.

## Install & Run

```bash
npm install
npx playwright install chromium
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/e2e/estimateRequest.e2e.ts
```

Run in headed mode:

```bash
npx playwright test --headed
```

## Architecture

```
Capslock/
├── app/
│   ├── abstractClasses.ts        # PageHolder → Component → AppPage hierarchy
│   ├── index.ts                  # Application facade (step submission helpers)
│   ├── page/                     # Page objects (one per wizard step)
│   │   ├── zip.step.ts
│   │   ├── reasons.step.ts
│   │   ├── propertyType.step.ts
│   │   ├── nameEmail.step.ts
│   │   ├── phone.step.ts
│   │   └── thankYou.page.ts
│   └── component/
│       └── stepProgress.component.ts
├── fixture/index.ts              # Playwright fixtures (app, scenarios)
├── test-data/
│   ├── interfaces/               # TypeScript interfaces
│   ├── builders/                 # Fluent builder for test data
│   └── scenarios/                # Named data recipes
├── tests/e2e/                    # Test specs
├── utils/reporters/step.ts       # @step() decorator for trace reporting
└── playwright.config.ts
```

Page objects expose locators and state — they never assert. All assertions live in the test layer.

## Test Scenarios

### Full List

| # | File | Scenario | Priority |
|---|---|---|---|
| 1 | estimateRequest.e2e.ts | Successful estimate request with valid data through all 5 steps to Thank You page | Critical |
| 2 | zipValidation.e2e.ts | Invalid 6-digit ZIP code is blocked with error message | Critical |
| 3 | zipValidation.e2e.ts | Valid 5-digit ZIP code advances to reasons step | Critical |
| 4 | nameValidation.e2e.ts | Valid first and last name is accepted | Critical |
| 5 | nameValidation.e2e.ts | Two-word name with single-letter last name (e.g. "Test B") is accepted | Critical |
| 6 | phoneValidation.e2e.ts | Fake/repeated phone number (888)888-8888 is rejected | High | Expected failure (bug raised)
| 7 | stepCounter.e2e.ts | Step counter displays correct step number at each wizard stage | High | Expected failure (bug raised)

### Top 5 Selected & Rationale

1. **Happy path (scenario 1)** — Validates the core business flow end-to-end. If this fails, nothing works.
2. **6-digit ZIP rejection (scenario 2)** — Catches a known input validation bug where the form accepts invalid ZIP lengths. ZIP is the entry gate to the entire funnel.
3. **Single-letter last name (scenario 5)** — Catches a known bug where "Test B" was rejected. Name validation directly blocks form completion.
4. **Fake phone rejection (scenario 6)** — Catches a known bug where repeated digits like (888)888-8888 are accepted. Phone is the final step before submission.
5. **Step counter accuracy (scenario 7)** — Catches a known UI bug where the step counter gets stuck at "2 of 5". Validates user orientation through the multi-step flow.

## Defects Found

1. **6-digit ZIP accepted**: Entering `104000` (6 digits) passes ZIP validation and advances to the next step. Expected: only exactly 5-digit ZIP codes should be accepted.

2. **Step counter stuck at "2 of 5"**: The step progress indicator does not update past "2 of 5" when navigating to the property type step (should show "3 of 5").

3. **Fake phone number accepted**: Submitting `(888)888-8888` completes the form and redirects to the Thank You page. Expected: repeated/fake phone patterns should be rejected.

## Ideas for Improving the Framework

1. **API-level test seeding**: If the backend exposes APIs, use them to set up test state faster instead of navigating through the UI for every prerequisite step. This would cut test execution time significantly for phone/name validation tests that must traverse 4 steps first.

2. **Visual regression testing**: Add screenshot comparison for each wizard step using Playwright's `toHaveScreenshot()`. The multi-step form has complex CSS transitions — visual regression would catch styling regressions that functional tests miss.

3. **Cross-browser and mobile coverage**: Currently tests run on Desktop Chrome only. Add Firefox, WebKit, and mobile viewport projects to `playwright.config.ts` to catch browser-specific rendering and validation behavior differences.

4. **Parallel test sharding with CI matrix**: Configure CI to shard tests across multiple workers/containers. As the test suite grows beyond the current 7 scenarios, parallel execution will keep feedback loops fast.
