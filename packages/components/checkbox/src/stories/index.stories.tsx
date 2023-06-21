import { define } from "@atomico/storybook";
import { Checkbox } from "@formas/checkbox";

export default {
    title: "Components/Checkbox",
    ...define(Checkbox),
};

export const Default = (props) => <Checkbox {...props} />;
