import { Switch } from "./switch";
import { defineArgTypes } from "@atomico/storybook/utils";

export default {
    title: "Switch",
    argTypes: defineArgTypes(Switch),
};

export const Default = (props) => <Switch checked={props.checked}></Switch>;

Default.args = {
    checked: false,
};
