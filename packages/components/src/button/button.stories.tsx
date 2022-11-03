import { Button } from "./button";
import { define } from "@atomico/storybook/utils";
import { Icon } from "../icon/icon";

export default {
    title: "components/Button",
    ...define(Button),
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

export const WithSquare = (props) => (
    <Button {...props}>
        <Icon slot="icon-prefix"></Icon>
    </Button>
);
