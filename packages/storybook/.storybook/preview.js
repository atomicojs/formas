import { decorator, options } from "@atomico/storybook";

options.ignore = {
    "*": ["focusable"],
    "a-icon": ["icons"],
};

options.global = {
    circle: {
        description: "Component variation with round edges",
    },
    small: {
        description: "Small component variation",
    },
    disabled: {
        category: "Form",
        description:
            "When present, it specifies that the component should be disabled. A disabled button is unusable and un-clickable.",
    },
    required: {
        category: "Form",
        description:
            "The required attribute is a boolean attribute. When present, it specifies that an input field must be filled out before submitting the form.<br/> **Note**: The required attribute works with the following input types: text, search, url, tel, email, password, date pickers, number, checkbox, radio, and file.",
    },
    focused: {
        category: "Internal",
    },
    color: {
        description: "defines the color of the component",
        control: "radio",
        options: [
            "neutral",
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "danger",
        ],
    },
    name: {
        category: "Form",
        description:
            "The `name` attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.",
    },
    type: {
        category: "Form",
    },
};

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
