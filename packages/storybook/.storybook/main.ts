import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";
import atomico from "@atomico/vite";

const config: StorybookConfig = {
    stories: [
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
            plugins: [
                atomico({
                    cssLiterals: {
                        postcss: true,
                    },
                }),
            ],
        });
    },
};

export default config;