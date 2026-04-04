import { defineConfig } from 'vite';

export default defineConfig(async () => {
	const plugin = await import('@sveltejs/vite-plugin-svelte');
	const svelte = plugin.svelte;

	return {
		plugins: [svelte()],
		server: { open: true },
		base: '/MarchBlocks/',
	};
});
