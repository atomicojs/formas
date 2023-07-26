import { define } from "@atomico/storybook";
import { Button } from "@formas/button";
import { Icon } from "@formas/icon";
import { Loading } from "@formas/loading";

export default {
    title: "Components/Button",
    ...define(Button, {
        argTypes: {
            href: {
                description: "Specifies the URL of the page the link goes to",
            },
            onlyIcon: {
                description:
                    "Declares that the component will only use the prefix slot",
            },
            ghost: {
                description:
                    "Declares that the button has no color or solid border by default",
            },
            type: {
                description:
                    "declares the type of behavior, either `button`, `button[type=submit]`, or `a[href]`",
            },
            prefix: {
                category: "Slots",
                defaultValue: "Element",
            },
            suffix: {
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
        <Icon slot="prefix"></Icon>
        <span>Button</span>
    </Button>
);

export const WithIconSuffix = (props) => (
    <Button {...props}>
        <Icon slot="suffix"></Icon>
        <span>Button</span>
    </Button>
);

export const WithSquare = (props) => (
    <Button {...props}>
        <Icon slot="prefix"></Icon>
    </Button>
);

export const ExampleWithLoading = (props) => (
    <Button {...props}>
        <Loading></Loading>
        <span>Loading</span>
    </Button>
);

export const ExampleRightSuffix = () => (
    <Button>
        <Icon slot="prefix"></Icon>
        <span>Loading</span>
        <Icon slot="suffix" type="right"></Icon>
    </Button>
);
