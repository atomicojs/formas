import { Input } from "./input";
import { defineArgTypes } from "@atomico/storybook/utils";

export default {
    title: "components/input",
    argTypes: defineArgTypes(Input, {
        color: {
            control: "color",
        },
    }),
};

export const ExampleButton = () => <Input>ok!</Input>;
