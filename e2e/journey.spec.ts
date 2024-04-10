import { test, expect } from "@playwright/test";

test("upload a file and check table render", async ({ page }) => {
  await test.step("navigate to the app and check basic elemens", async () => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Excel editor/);
    await expect(page.getByText("upload")).toBeAttached();
  });

  await test.step("upload a file", async () => {
    const filePickerPromise = page.waitForEvent("filechooser");
    await page.getByText("upload").click();
    const fileChooser = await filePickerPromise;
    await fileChooser.setFiles("./e2e/sample.xlsx");
    await expect(page.getByText("sample.xlsx")).toBeVisible();
  });

  await test.step("check if headers and rows were rendered", async () => {
    await expect(page.getByText("education")).toBeVisible();
    await expect(page.getByRole("table").getByRole("row")).toHaveCount(
      1 + 11 + 1 // header + body rows + footer (filters)
    );
  });
});
