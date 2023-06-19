import {test, expect} from '@playwright/test';
import {ADMIN_LOGIN} from '../config/auth';
import {PRODUCT, TOAST_CREATE_PRODUCT_SUCCESSFUL} from '../config/products';
import {TIME_OUT} from '../config/timeout';
import {APP_URL} from '../config/url';

test.beforeEach(async ({page}) => {
	await page.goto(`${APP_URL}login`);
	test.slow();

	await page.getByTestId('username').fill(ADMIN_LOGIN.username);
	await page.getByTestId('password').fill(ADMIN_LOGIN.password);
	await page.getByTestId('login-button').click();
	await page.getByTestId('anchor-admin').click();
	await page.locator('.Toastify .Toastify__close-button').click();
});

test.afterEach(async ({page}) => {
	await page.getByTestId('product-submit').click();
	await page.waitForTimeout(TIME_OUT);

	const toastContent = await page
		.locator('.toast-container .Toastify__toast-body div:nth-child(2)')
		.innerText();
	expect(toastContent).toEqual(TOAST_CREATE_PRODUCT_SUCCESSFUL);
});

test('Successful case', async ({page}) => {
	await page.getByTestId('product-name').fill(PRODUCT.name);
	await page.getByTestId('product-price').fill(PRODUCT.price);
	await page.getByTestId('product-image-url').fill(PRODUCT.imageUrl);
	await page.waitForTimeout(TIME_OUT);
});

test('Have an error case', async ({page}) => {
	await page.getByTestId('product-name').fill(PRODUCT.name);
	await page.getByTestId('product-image-url').fill(PRODUCT.imageUrl);
	await page.waitForTimeout(TIME_OUT);

	await page.getByTestId('product-submit').click();
	await page.waitForTimeout(TIME_OUT);

	await page.getByTestId('product-price').fill(PRODUCT.price);
	await page.waitForTimeout(TIME_OUT);
});

test('Click random image', async ({page}) => {
	await page.getByTestId('product-name').fill(PRODUCT.name);
	await page.waitForTimeout(TIME_OUT);

	await page.getByTestId('product-submit').click();
	await page.waitForTimeout(TIME_OUT);

	await page.getByTestId('image').click();
	await page.waitForTimeout(TIME_OUT);

	await page.getByTestId('product-price').fill(PRODUCT.price);
	await page.waitForTimeout(TIME_OUT);
});
