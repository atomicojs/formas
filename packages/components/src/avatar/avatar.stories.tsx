import { Avatar } from "./avatar";
import { define } from "@atomico/storybook";

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
