import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to find all HTML files in a directory (non-recursive for root, specific for files/)
function getHtmlEntries() {
  const pages = {};
  
  // 1. Scan root directory for HTML files
  const rootFiles = fs.readdirSync(__dirname);
  rootFiles.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      pages[name === 'index' ? 'main' : name] = resolve(__dirname, file);
    }
  });

  // 2. Scan files/ directory for HTML files
  const subDir = 'files';
  const subPath = resolve(__dirname, subDir);
  if (fs.existsSync(subPath)) {
    const subFiles = fs.readdirSync(subPath);
    subFiles.forEach(file => {
      if (file.endsWith('.html')) {
        const name = `${subDir}/${file.replace('.html', '')}`;
        // The key in Rollup input can be the path-like name
        pages[name] = resolve(subPath, file);
      }
    });
  }

  return pages;
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
  server: {
    port: 3000,
    open: true,
  }
});
