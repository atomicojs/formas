import { mergeConfig } from "vite";

export default {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    async viteFinal(config, { configType }) {
        // return the customized config
        return mergeConfig(config, {
            plugins: [
                ...(await import("@atomico/vite")).default({
                    storybook: ["stories/**/*"],
                    cssLiterals: {
                        postcss: true,
                        minify: true,
                    },
                }),
            ],
        });
    },
};
