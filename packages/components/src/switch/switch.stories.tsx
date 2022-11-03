import { Switch } from "./switch";
import { defineArgTypes } from "@atomico/storybook/utils";

export default {
    title: "Components/Switch",
    // argTypes: defineArgTypes(Switch, { size: false }),
};

export const Default = (props) => <Switch {...props}></Switch>;
