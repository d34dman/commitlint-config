import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		exclude: ['**/node_modules/**', '**/lib/*.test.js'],
		coverage: {
			provider: 'istanbul',
			include: ['**/@commitlint/*/src/**'],
		},
	},
});
