import { decorator } from "@atomico/storybook";

export const decorators = [decorator];

export const parameters = {
    controls: {
        expanded: true,
    },
    backgrounds: {
        default: "Default",
        values: [
            {
                name: "Default",
                value: "#f1f1f9",
            },
            {
                name: "White",
                value: "#fff",
            },
        ],
    },
};
