<script lang="ts">
	import { teleport } from 'teleport-kit';
	import Component from './Component.svelte';

	const random_id = teleport('random_id', () => crypto.randomUUID());
	const non_teleported_random_id = crypto.randomUUID();

	let checked = $state(true);
</script>

<p data-testid="random_id">{random_id}</p>
<p data-testid="non_teleported_random_id">{non_teleported_random_id}</p>

<input data-testid="checkbox" type="checkbox" bind:checked />

{#if checked}
	<Component name="one" />
{:else}
	<Component name="two" />
{/if}
