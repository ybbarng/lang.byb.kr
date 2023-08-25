<script>
	import Header from './Header.svelte';
	import "../app.css";
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p></p>
	</footer>
</div>

<style lang="postcss">
:global(html) {
	background-color: theme(colors.gray.200);
}
</style>
