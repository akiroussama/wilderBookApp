import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Recording...
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Sebastien");
  await page.getByRole("button", { name: "Add Data" }).click();
});
