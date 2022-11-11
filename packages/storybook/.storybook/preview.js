import { decorator } from "@atomico/storybook";
import { options } from "@atomico/storybook";

options.global = {
    size: {
        options: ["small", "normal"],
        control: { type: "radio" },
    },
    focused: false,
    focusable: false,
};

export const decorators = [decorator];
