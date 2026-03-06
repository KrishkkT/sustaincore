import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                services: resolve(__dirname, 'services.html'),
                cbam: resolve(__dirname, 'cbam.html'),
                insights: resolve(__dirname, 'insights.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    }
});
