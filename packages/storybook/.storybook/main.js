import { mergeConfig } from "vite";
import atomico from "@atomico/vite";

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../../components/**/*.stories.mdx",
        "../../components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    staticDirs: ["../public"],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    docs: {
        autodocs: true,
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: atomico({
                cssLiterals: {
                    postcss: true,
                },
            }),
        });
    },
};

export default config;
