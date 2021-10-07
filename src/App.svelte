<script lang="ts">
	import Header from './Header.svelte';
	import Level from './Level.svelte';
</script>

<main>
	<Header />
	<Level />
</main>

<style>
    :global(body, html) {
        padding: 0;
        margin: 0;

		overflow: hidden;
    }


	main {
		width: 100%;
		overflow-x: hidden;

		min-height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		background: #393D3F;
	}
</style>