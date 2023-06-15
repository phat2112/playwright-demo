import { test, expect } from "@playwright/test";
import {
  USER_LOGIN,
  TOAST_LOGIN_FAILED,
  TOAST_LOGIN_SUCCESSFUL,
} from "../config/auth";
import { APP_URL } from "../config/url";
import { TIME_OUT } from "../config/timeout";

test("login failed", async ({ page }) => {
  await page.goto(`${APP_URL}login`);
  test.slow();

  await page.getByTestId("username").fill(USER_LOGIN.username);
  // await page.waitForTimeout(TIME_OUT);

  await page.getByTestId("password").fill("11111111");
  // await page.waitForTimeout(TIME_OUT);

  await page.getByTestId("login-button").click();
  await page.waitForTimeout(TIME_OUT);

  const toastContent = await page
    .locator(".toast-container .Toastify__toast-body div:nth-child(2)")
    .innerText();

  expect(toastContent).toEqual(TOAST_LOGIN_FAILED);
});

test("login success", async ({ page }) => {
  await page.goto(`${APP_URL}login`);
  test.slow();

  await page.getByTestId("username").fill(USER_LOGIN.username);
  // await page.waitForTimeout(TIME_OUT);

  await page.getByTestId("password").fill(USER_LOGIN.password);
  // await page.waitForTimeout(TIME_OUT);

  await page.getByTestId("login-button").click();
  await page.waitForTimeout(TIME_OUT);

  const toastContent = await page
    .locator(".toast-container .Toastify__toast-body div:nth-child(2)")
    .innerText();

  expect(toastContent).toEqual(TOAST_LOGIN_SUCCESSFUL);
});
