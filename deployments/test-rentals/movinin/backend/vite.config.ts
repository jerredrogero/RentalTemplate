import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return defineConfig({
    plugins: [
      react({
        // Babel optimizations
        babel: {
          plugins: [
            ['@babel/plugin-transform-runtime'],
            // ['babel-plugin-react-compiler', { optimize: true }],
          ]
        }
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        ':movinin-types': path.resolve(__dirname, '../packages/movinin-types'),
        ':movinin-helper': path.resolve(__dirname, '../packages/movinin-helper'),
        ':disable-react-devtools': path.resolve(__dirname, '../packages/disable-react-devtools'),
        ':currency-converter': path.resolve(__dirname, '../packages/currency-converter'),
      },
    },

    server: {
      host: '0.0.0.0',
      port: Number.parseInt(process.env.VITE_PORT || '3003', 10),
    },

    build: {
      outDir: 'build', // Output directory
      target: 'esnext', // Use esnext to ensure the best performance
      modulePreload: true, // Keep modulePreload enabled to ensure the best performance
      sourcemap: false, // Disable sourcemaps in production
      cssCodeSplit: true, // Enable CSS code splitting

      // Minification settings (Use esbuild for minification)
      minify: 'esbuild', // Changed from 'terser' to 'esbuild'
      
      // Control chunk size
      chunkSizeWarningLimit: 1000, // Warn if a chunk exceeds 1000kb

      // Chunk splitting strategy
      rollupOptions: {
        treeshake: true, // Enable Tree Shaking: Ensure unused code is removed by leveraging ES modules and proper imports
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'], // Create a separate vendor chunk
            router: ['react-router-dom'], // Create a separate router chunk
          },
          // Generate chunk names
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entries/[name]-[hash].js',
        },
      },
      assetsInlineLimit: 8192, // This reduces the number of small chunk files
    },
  })
}
