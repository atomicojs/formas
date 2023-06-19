import { define } from "@atomico/storybook";
import { Icon } from "@atomico/ui-icon";
import { Loading } from "@atomico/ui-loading";
import { Button } from "@atomico/ui-button";

export default {
    title: "Components/Button",
    ...define(Button, {
        argTypes: {
            href: {
                description: "Specifies the URL of the page the link goes to",
            },
            onlyIcon: {
                description:
                    "Declares that the component will only use the icon-prefix slot",
            },
            ghost: {
                description:
                    "Declares that the button has no color or solid border by default",
            },
            type: {
                description:
                    "declares the type of behavior, either `button`, `button[type=submit]`, or `a[href]`",
            },
            "icon-prefix": {
                category: "Slots",
                defaultValue: "Element",
            },
            "icon-suffix": {
                category: "Slots",
                defaultValue: "Element",
            },
            "--color-background": {
                description: "Define el color de fondo del boton",
                defaultValue: "Element",
            },
            onClick: {
                description:
                    "Example: `myElement.addEventListener('click',handler)`",
            },
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

export const ExampleWithLoading = (props) => (
    <Button {...props}>
        <Loading slot="icon-prefix"></Loading>
        <span>Loading</span>
    </Button>
);
