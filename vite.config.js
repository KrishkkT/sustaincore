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
                // Sub-pages in files/ directory
                '1-brsr': resolve(__dirname, 'files/1-brsr.html'),
                '1-cdp': resolve(__dirname, 'files/1-cdp.html'),
                '1-gri': resolve(__dirname, 'files/1-gri.html'),
                '1-sasb': resolve(__dirname, 'files/1-sasb.html'),
                '1-tcfd': resolve(__dirname, 'files/1-tcfd.html'),
                '2-cbam': resolve(__dirname, 'files/2-cbam.html'),
                '2-cc': resolve(__dirname, 'files/2-cc.html'),
                '2-ghg': resolve(__dirname, 'files/2-ghg.html'),
                '2-irec': resolve(__dirname, 'files/2-irec.html'),
                '2-pcf': resolve(__dirname, 'files/2-pcf.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    }
});
