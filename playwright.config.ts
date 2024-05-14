import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm package && pnpm run build && pnpm run preview',
		port: 4173,
		stderr: 'pipe',
		stdout: 'pipe'
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
