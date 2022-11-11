import { Checkbox } from "./checkbox";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Checkbox",
    ...define(Checkbox),
};

export const Default = (props) => <Checkbox {...props} />;
