import atomico from "@atomico/vite";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        target: "esnext",
        lib: {
            entry: "./index.js",
            name: "claStepper",
            fileName: (format) => `claStepper.${format}.js`,
            formats: ["umd"],
        },
    },
    plugins: atomico({ cssLiterals: { minify: true, postcss: true } }),
});
