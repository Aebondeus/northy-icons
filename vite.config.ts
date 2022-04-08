import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

module.exports = defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'northy-icons',
            fileName: (format) => `northy-icons.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                dir: 'lib',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})