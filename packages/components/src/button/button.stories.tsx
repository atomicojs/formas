import { define } from "@atomico/storybook";
import { Icon } from "../icon/icon";
import { Button } from "./button";

export default {
    ...define(Button, {
        argTypes: {
            color: {
                description: "XXX",
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
        },
    }),
    title: "Components/Button",
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

export const WithBadge = (props) => (
    <Button {...props}>
        <Icon slot="icon-prefix" type="file"></Icon>
        <span>Messages</span>
        <Button slot="badge" badge color="primary">
            10
        </Button>
    </Button>
);
