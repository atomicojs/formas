import { Switch } from "./switch";
import { define } from "@atomico/storybook/utils";

export default {
    title: "Components/Switch",
    ...define(Switch),
};

export const Default = (props) => <Switch {...props}></Switch>;
