import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, 'resources/images'),
        },
    },
})
