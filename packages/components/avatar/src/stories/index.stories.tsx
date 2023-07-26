import { define } from "@atomico/storybook";
import { Avatar } from "@formas/avatar";
import { Dropdown } from "@formas/dropdown";
import { Button } from "@formas/button";

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

/**
 * Avatar is used for showing a thumbnail representation of a single
 * user or entity. Default avatar illustration is displayed when no src is specified.
 */
export const Default = (props) => (
    <Avatar {...props}>
        <img src="https://github.com/atomicojs.png" alt="avatar" />
    </Avatar>
);

export const WithStatus = (props) =>
    Default({ ...props, status: props.status || "success" });

export const WithDropdown = (props) => (
    <Dropdown>
        {WithStatus({ ...props, slot: "action" })}
        <Button small={props.small} ghost>
            Option 1
        </Button>
        <Button small={props.small} ghost>
            Option 2
        </Button>
        <Button small={props.small} ghost>
            Option 3
        </Button>
    </Dropdown>
);
