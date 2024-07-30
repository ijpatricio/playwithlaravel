import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "/resources/js"),
            "@mingle": path.resolve(__dirname, "/vendor/ijpatricio/mingle/resources/js"),
        },
    },
    plugins: [
        react(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/js/sandbox-preview.js',
                'resources/js/sandbox-show.js',
                'resources/js/Sandbox/index.js',
            ],
            refresh: true,
        }),
    ],
})
