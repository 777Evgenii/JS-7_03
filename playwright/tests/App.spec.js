import { test, expect } from "@playwright/test";
import { email, password } from "../user";

test("Authorization successful", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page.locator("body")).toContainText("Вход в личный кабинет");
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[data-testid="login-submit-btn"]');
  await expect(page.locator("h2")).toHaveText(["Моё обучение"]);
  await page.close();
});

test("Authorization failed", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page.locator("body")).toContainText("Вход в личный кабинет");
  await page.fill('input[type="email"]', "john.smith@gmail.com");
  await page.fill('input[type="password"]', "123456");
  await page.click('button[data-testid="login-submit-btn"]');
  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText("Вы ввели неправильно логин или пароль");
  await page.close();
});
