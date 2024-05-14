<script lang="ts">
	const { children } = $props();

	$effect(() => {
		document.body.setAttribute('kit-started', '');
	});
</script>

{@render children()}
