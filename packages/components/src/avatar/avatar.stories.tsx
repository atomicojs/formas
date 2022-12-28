import { define } from "@atomico/storybook";
import { Avatar } from "./avatar";
import { AvatarLabel } from "./avatar-label";

export default {
    title: "Components/Avatar",
    ...define(Avatar, {
        argTypes: {
            status: {
                control: {
                    type: "radio",
                    labels: {
                        "": "none",
                    },
                },
                options: ["", "info", "success", "warning", "danger"],
            },
            statusPosition: {
                description: "Defines the position of the status property",
                control: {
                    type: "radio",
                },
                options: [
                    "top left",
                    "top right",
                    "bottom left",
                    "bottom right",
                ],
            },
        },
    }),
};

export const Default = (props) => (
    <Avatar {...props}>
        <img src="https://github.com/atomicojs.png" alt="avatar" />
    </Avatar>
);

export const Label = (props) => (
    <AvatarLabel small={props.small}>
        <Avatar {...props} slot="avatar" placeholder="AG"></Avatar>
        <strong>UpperCod</strong>
        <span>Administrator</span>
    </AvatarLabel>
);

export const WithStatus = (props) => (
    <Avatar {...props} status={props.status || "success"}>
        <img src="https://github.com/atomicojs.png" alt="avatar" />
    </Avatar>
);
