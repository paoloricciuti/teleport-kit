<script lang="ts">
	import { teleport } from 'teleport-kit';

	const { name }: { name: string } = $props();

	const random_id = teleport(name, () => crypto.randomUUID());
	const non_teleported_random_id = crypto.randomUUID();
</script>

<p data-testid="component_random_id_{name}">{random_id}</p>
<p data-testid="component_non_teleported_random_id_{name}">{non_teleported_random_id}</p>
