import { test as base } from '@playwright/test';

export const test = base.extend({
	page: async ({ page }, use) => {
		// slow the network down
		await page.route('**/*', async (route) => {
			await new Promise((res) => setTimeout(res, 100));
			await route.continue();
		});
		await use(page);
	}
});
