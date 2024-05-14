import { expect } from '@playwright/test';
import { test } from './utils.js';

test('content of random_id stays the same before and after hydration while non teleported changes', async ({
	page
}) => {
	await page.goto('/');
	const before_hydration = await page.getByTestId('random_id').innerText();
	const non_teleported_before_hydration = await page
		.getByTestId('non_teleported_random_id')
		.innerText();
	await page.waitForSelector('body[kit-started]');
	const after_hydration = await page.getByTestId('random_id').innerText();
	const non_teleported_after_hydration = await page
		.getByTestId('non_teleported_random_id')
		.innerText();
	expect(before_hydration).toBe(after_hydration);
	expect(non_teleported_before_hydration).not.toBe(non_teleported_after_hydration);
});

test('html content of the page to include a script lang `text/svelte`', async ({ page }) => {
	await page.goto('/');
	expect(await page.content()).toContain('<script lang="text/svelte">');
});

test("components keep the same value only during hydration (a newly freshed component doesn't have undefined and a remounted component doesn't have the same value)", async ({
	page
}) => {
	await page.goto('/');
	const before_hydration = await page.getByTestId('component_random_id_one').innerText();
	const non_teleported_before_hydration = await page
		.getByTestId('component_non_teleported_random_id_one')
		.innerText();
	await page.waitForSelector('body[kit-started]');
	const after_hydration = await page.getByTestId('component_random_id_one').innerText();
	const non_teleported_after_hydration = await page
		.getByTestId('component_non_teleported_random_id_one')
		.innerText();
	expect(before_hydration).toBe(after_hydration);
	expect(non_teleported_before_hydration).not.toBe(non_teleported_after_hydration);
	const checkbox = page.getByTestId('checkbox');
	await checkbox.click();
	const teleported_non_hydrated = await page.getByTestId('component_random_id_two').innerText();
	expect(teleported_non_hydrated).toBeTruthy();
	await checkbox.click();
	const after_remounted = await page.getByTestId('component_random_id_one').innerText();
	expect(before_hydration).not.toBe(after_remounted);
	await checkbox.click();
	const teleported_non_hydrated_after_remounted = await page
		.getByTestId('component_random_id_two')
		.innerText();
	expect(teleported_non_hydrated).not.toBe(teleported_non_hydrated_after_remounted);
});
