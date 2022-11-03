import "./disable-hmr";
import { decorator } from "@atomico/storybook";
import { options } from "@atomico/storybook/utils";

options.global = {
    size: {
        options: ["small", "normal"],
        control: { type: "radio" },
    },
    focused: false,
    focusable: false,
};

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
};

export const decorators = [decorator];
