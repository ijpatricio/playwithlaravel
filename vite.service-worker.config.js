import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir: 'public',
        assetsDir: '',
        rollupOptions: {
            input: {
                ['cgi-worker']: 'resources/service-worker/cgi-worker.mjs',
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].[ext]',
                assetFileNames: '[name].[ext]',
            }
        },
    },
})
