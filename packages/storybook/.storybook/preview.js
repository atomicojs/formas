import { decorator } from "@atomico/storybook";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    backgrounds: {
        default: "formas",
        values: [
            {
                name: "formas",
                value: "#dadfe1",
            },
            {
                name: "white",
                value: "#fff",
            },
        ],
    },
    options: {
        storySort: {
            order: ["introduction", "components", ["*"]],
        },
    },
    // docs: {
    //     source: {
    //         // language: "jsx",
    //         dark: true,
    //     },
    // },
};

export const decorators = [decorator()];
