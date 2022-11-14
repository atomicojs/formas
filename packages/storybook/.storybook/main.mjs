import { mergeConfig } from "vite";

export default {
    stories: [
        "../../components/**/*.stories.mdx",
        "../../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../components/*.stories.mdx",
        "../../components/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-docs",
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    async viteFinal(config, { configType }) {
        return mergeConfig(config, {
            plugins: [
                ...(await import("@atomico/vite")).default({
                    storybook: ["components/**/*"],
                    cssLiterals: {
                        postcss: true,
                    },
                    customElements: {
                        prefix: "a",
                        define: ["components/src/**/*"],
                    },
                }),
            ],
        });
    },
};
