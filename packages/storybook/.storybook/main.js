import { mergeConfig } from "vite";

export default {
    stories: [
        "../../components/**/*.stories.mdx",
        "../../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../components/*.stories.mdx",
        "../../components/*.stories.@(js|jsx|ts|tsx)",
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
                    storybook: ["components/**/*"],
                    cssLiterals: {
                        postcss: true,
                        minify: true,
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
