# teleport-kit

The current web-development world pride itself of blurring the line between backend and frontend and this is mostly done throw a process known as hydration. Your components are executed on the server and the html document is sent with all the information already in it. Later on components are re-executed on the client and listeners are attached to the elements to allow for a reactive environment without the need of a full page reload.

This is generally not a problem but it can become a problem if the functions invoked are non deterministic. An example of this could be `Math.random()` or `crypto.randomUUID` or even simpler `new Date()`. Between the two executions (the server and the client) those two values could (and most likely will) change creating in the best case a random flicker in the UI, in the worst an hydration mismatch (even tho Svelte is pretty good at dealing with those 😎)

`teleport-kit` aim to solve this issue allowing you to specify variables that will be initialized with a value on the server and will have the same value once hydrated on the client!

> **Warning**
>
> This package is meant to be used with Svelte-Kit as the name suggest. Because it uses api that are **only** present in Svelte-Kit it will not work in your normal svelte project.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![npm](https://img.shields.io/npm/v/teleport-kit)

![npm](https://img.shields.io/npm/dt/teleport-kit)

![GitHub last commit](https://img.shields.io/github/last-commit/paoloricciuti/teleport-kit)

## Contributing

Contributions are always welcome!

For the moment there's no code of conduct neither a contributing guideline but if you found a problem or have an idea feel free to [open an issue](https://github.com/paoloricciuti/teleport-kit/issues/new)

If you want the fastest way to open a PR try out Codeflow

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/paoloricciuti/teleport-kit/)

## Authors

- [@paoloricciuti](https://www.github.com/paoloricciuti)

## Installation

Install teleport-kit with npm

```bash
  npm install teleport-kit@latest
```

## Setup

After the installation of `teleport-kit` you need to do an extra step to allow the library to work for you: create or update your `hooks.server.ts` file.

```ts
export { handle } from 'teleport-kit';
```

if you already have another server handle already in your project you can make use of the `sequence` helper from Sveltekit ([link to docs](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence))

```ts
import { sequence } from '@sveltejs/kit/hooks';
import { handle as teleportkit } from 'teleport-kit';

export const handle = sequence(teleportkit, ({ event, resolve }) => {
	// your logic here
	return resolve(event);
});
```

## Usage/Examples

Once you've done with this setup you can start using the `teleport` function inside your svelte components

```svelte
<script lang="ts">
	import { teleport } from 'teleport-kit';

	let random = teleport('random', () => Math.random());
</script>

My random value: {random}
```

as you can see there's another small catch to use this library: you need to provide a unique name for your teleported variable in the form of the first argument of the `teleport` function. Is important that this name is:

- the same on the server and on the client
- unique for your whole route (this means every teleported variable including the ones in child layouts and components)
