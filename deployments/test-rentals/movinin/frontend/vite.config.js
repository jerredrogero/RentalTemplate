var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
// https://vitejs.dev/config/
export default (function (_a) {
    var mode = _a.mode;
    process.env = __assign(__assign({}, process.env), loadEnv(mode, process.cwd(), ''));
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
            createHtmlPlugin({
                inject: {
                    data: {
                        WEBSITE_NAME: process.env.VITE_MI_WEBSITE_NAME || "Movin' In",
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                ':movinin-types': path.resolve(__dirname, '../packages/movinin-types'),
                ':movinin-helper': path.resolve(__dirname, '../packages/movinin-helper'),
                ':disable-react-devtools': path.resolve(__dirname, '../packages/disable-react-devtools'),
                ':currency-converter': path.resolve(__dirname, '../packages/currency-converter'),
                ':reactjs-social-login': path.resolve(__dirname, '../packages/reactjs-social-login'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number.parseInt(process.env.VITE_PORT || '3004', 10),
        },
        build: {
            outDir: 'build', // Output directory
            target: 'esnext', // Use esnext to ensure the best performance
            modulePreload: true, // Keep modulePreload enabled to ensure the best performance
            sourcemap: false, // Disable sourcemaps in production
            cssCodeSplit: true, // Enable CSS code splitting
            // Minification settings (Use terser for minification with aggressive settings)
            minify: 'terser', // Can also use 'esbuild' which is faster but less optimized
            terserOptions: {
                compress: {
                    drop_console: false, // Keep console.* calls
                    drop_debugger: true, // Removes debugger statements
                    dead_code: true, // Removes unreachable code
                    passes: 3, // Number of compression passes
                    unsafe_math: true, // Optimize math expressions
                    conditionals: true, // Optimize if-s and conditional expressions
                    sequences: true, // Join consecutive simple statements using the comma operator
                    booleans: true, // various optimizations for boolean context
                    unused: true, // Drop unreferenced functions and variables
                    if_return: true, // Optimizations for if/return and if/continue
                    join_vars: true, // Join consecutive var statements
                },
                format: {
                    comments: false, // Remove comments
                },
                mangle: {
                    properties: false // Don't rename properties (safer)
                }
            },
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
    });
});
