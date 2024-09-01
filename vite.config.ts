import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "dist",
        target: "es2020",
        lib: {
            entry: "src/core/index.ts",
            name: "processBuilder",
            fileName: (format) => `processBuilder.${format}.js`,
            formats: ["es", "cjs", "umd"]
        },
        minify: true,
        rollupOptions: {
            external: ["axios"],
            output: {
                globals: {
                    axios: "axios"
                }
            }
        }
    },
    plugins: [
        dts({
            outDir: "dist",
            tsconfigPath: "./tsconfig.app.json"
        })
    ]
});
