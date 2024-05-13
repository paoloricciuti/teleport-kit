import { stringify, parse } from 'devalue';

const teleported_script = document.querySelector('script[lang="text/svelte"]');

export function teleport<T>(name: string, fn: () => T): T {
	if (!teleported_script)
		throw new Error("can't find the teleported script...remember to use the hooks handle function");
	const teleported = parse(teleported_script.innerHTML);
	const value = teleported[name] ?? fn();
	delete teleported[name];
	teleported_script.innerHTML = stringify(teleported);
	return value;
}

export function handle() {}
