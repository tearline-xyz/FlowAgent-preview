import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { compression } from 'vite-plugin-compression2';
import type { Plugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3090,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3080',
        changeOrigin: true,
      },
      '/oauth': {
        target: 'http://localhost:3080',
        changeOrigin: true,
      },
      '/okx/api': {
        target: 'https://www1.test.tearline.io/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/okx\/api/, ''),
      },
    },
  },
  // Set the directory where environment variables are loaded from and restrict prefixes
  envDir: '../',
  envPrefix: ['VITE_', 'SCRIPT_', 'DOMAIN_', 'ALLOW_'],
  plugins: [
    react(),
    nodePolyfills(),
    VitePWA({
      injectRegister: 'auto', // 'auto' | 'manual' | 'disabled'
      registerType: 'autoUpdate', // 'prompt' | 'autoUpdate'
      devOptions: {
        enabled: false, // disable service worker registration in development mode
      },
      useCredentials: true,
      workbox: {
        globPatterns: ['**/*'],
        globIgnores: ['images/**/*'],
        maximumFileSizeToCacheInBytes: 7 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/oauth/],
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'LibreChat',
        short_name: 'LibreChat',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#009688',
        icons: [
          {
            src: '/assets/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/assets/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/assets/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    sourcemapExclude({ excludeNodeModules: true }),
    compression({
      threshold: 10240,
    }),
  ],
  publicDir: './public',
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    outDir: './dist',
    minify: 'terser',
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      // external: ['uuid'],
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // Group Radix UI libraries together.
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Group framer-motion separately.
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Group markdown-related libraries.
            if (id.includes('node_modules/highlight.js')) {
              return 'markdown_highlight';
            }
            if (id.includes('node_modules/hast-util-raw') || id.includes('node_modules/katex')) {
              return 'markdown_large';
            }
            // Group TanStack libraries together.
            if (id.includes('@tanstack')) {
              return 'tanstack-vendor';
            }
            // Additional grouping for other node_modules:
            if (id.includes('@headlessui')) {
              return 'headlessui';
            }
            // Start
            // if (id.includes('@reown')) {
            //   return 'reown-vendor';
            // }
            // if (id.includes('@wagmi')) {
            //   return 'wagmi-vendor';
            // }
            // if (id.includes('axios')) {
            //   return 'axios-vendor';
            // }
            // if (id.includes('react-query-v4')) {
            //   return 'react-query-v4-vendor';
            // }
            // if (id.includes('react-query-v5')) {
            //   return 'react-query-v5-vendorv5';
            // }
            // End

            // Everything else falls into a generic vendor chunk.
            return 'vendor';
          }
          // Create a separate chunk for all locale files under src/locales.
          if (id.includes(path.join('src', 'locales'))) {
            return 'locales';
          }
          // Let Rollup decide automatically for any other files.
          return null;
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && /\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.names)) {
            return 'assets/fonts/[name][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
      /**
       * Ignore "use client" warning since we are not using SSR
       * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
       */
      onwarn(warning, warn) {
        if (warning.message.includes('Error when using sourcemap')) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src/'),
      $fonts: resolve('public/fonts'),
      '@tanstack/react-query': path.resolve(__dirname, 'node_modules/react-query-v4'),
      '@tanstack/react-query-v5': path.resolve(__dirname, 'node_modules/react-query-v5'),
    },
  },
});

interface SourcemapExclude {
  excludeNodeModules?: boolean;
}
export function sourcemapExclude(opts?: SourcemapExclude): Plugin {
  return {
    name: 'sourcemap-exclude',
    transform(code: string, id: string) {
      if (opts?.excludeNodeModules && id.includes('node_modules')) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: '' },
        };
      }
    },
  };
}
