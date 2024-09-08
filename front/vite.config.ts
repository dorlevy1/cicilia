import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dynamicImport from "vite-plugin-dynamic-import";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        dynamicImport(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/assets/scss',  // The source folder you want to copy
                    dest: 'assets/scss'      // The destination folder in the build directory
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@scss': '/src/assets/scss',
        },
    },

});
