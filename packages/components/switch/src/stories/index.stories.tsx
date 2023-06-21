import { Switch } from "@atomico/ui-switch";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Switch",
    ...define(Switch),
};

export const Default = (props) => <Switch {...props}></Switch>;
