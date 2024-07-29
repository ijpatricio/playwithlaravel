import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/js/sandbox-preview.js',
                'resources/js/sandbox-show.js',
            ],
            refresh: true,
        }),
    ],
})
