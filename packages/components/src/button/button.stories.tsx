import { Button } from "./button";
import { defineArgTypes } from "@atomico/storybook/utils";
import { Icon } from "../icon/icon";

export default {
    title: "components/Button",
    argTypes: defineArgTypes(Button, {
        color: {
            control: "color",
        },
    }),
};

export const Default = (props) => <Button {...props}>Button</Button>;

export const WithIconPrefix = (props) => (
    <Button {...props}>
        <Icon slot="icon-prefix"></Icon>
        <span>Button</span>
    </Button>
);

export const WithIconSuffix = (props) => (
    <Button {...props}>
        <Icon slot="icon-suffix"></Icon>
        <span>Button</span>
    </Button>
);
