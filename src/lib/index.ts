import type { Handle } from '@sveltejs/kit';
import { stringify } from 'devalue';
import { AsyncLocalStorage } from 'node:async_hooks';

const storage = new AsyncLocalStorage<Record<string, unknown>>();

export function teleport<T>(name: string, fn: () => T): T {
	const value = fn();
	const store_value = storage.getStore();
	if (!store_value)
		throw new Error(
			"can't find the reference to the current request...remember to use the hooks handle function."
		);
	if (store_value[name]) throw new Error(`multiple teleportations with the name \`${name}\``);
	store_value[name] = value;
	return value;
}

export const handle: Handle = ({ event, resolve }) => {
	return storage.run({}, async () => {
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				const last_close_body = html.toLowerCase().lastIndexOf('</body>');
				const before = html.substring(0, last_close_body);
				const after = html.substring(last_close_body + 7);
				return `${before}</body><script lang="text/svelte">${stringify(storage.getStore())}</script>${after}`;
			}
		});
	});
};
