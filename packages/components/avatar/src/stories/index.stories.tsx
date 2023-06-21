import { define } from "@atomico/storybook";
import { Avatar, AvatarLabel } from "@formas/avatar";
// import { AvatarLabel } from "./avatar-label";
// import { Dropdown } from "../dropdown/dropdown";
// import { Button } from "../button/button";

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
        <Avatar {...props} slot="avatar"></Avatar>
        <strong>UpperCod</strong>
        <span>Administrator</span>
    </AvatarLabel>
);

Label.args = { placeholder: "AG" };

export const WithStatus = (props) =>
    Default({ ...props, status: props.status || "success" });

// export const WithDropdown = (props) => (
//     <Dropdown>
//         {WithStatus({ ...props, slot: "action" })}
//         <Button small={props.small} ghost>
//             Option 1
//         </Button>
//         <Button small={props.small} ghost>
//             Option 2
//         </Button>
//         <Button small={props.small} ghost>
//             Option 3
//         </Button>
//     </Dropdown>
// );
