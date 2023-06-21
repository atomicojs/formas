import { Switch } from "@formas/switch";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Switch",
    ...define(Switch),
};

export const Default = (props) => <Switch {...props}></Switch>;
