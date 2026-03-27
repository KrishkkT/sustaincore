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
                'air-monitoring': resolve(__dirname, 'air-monitoring.html'),
                'carbon-climate': resolve(__dirname, 'carbon-climate.html'),
                'clearances-eia': resolve(__dirname, 'clearances-eia.html'),
                'esg-reporting': resolve(__dirname, 'esg-reporting.html'),
                'imprint': resolve(__dirname, 'imprint.html'),
                'licenses-epr': resolve(__dirname, 'licenses-epr.html'),
                'management-systems': resolve(__dirname, 'management-systems.html'),
                'privacy': resolve(__dirname, 'privacy.html'),
                'ratings-targets': resolve(__dirname, 'ratings-targets.html'),
                'water-testing': resolve(__dirname, 'water-testing.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    }
});
