import { test, expect } from "@playwright/test";

test("add new wilder", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.fill('[data-cy="name"]', "Michael Jackson");
  await page.click('[data-cy="submitBtn"]');
});
