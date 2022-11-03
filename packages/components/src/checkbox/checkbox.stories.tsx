import { Checkbox } from "./checkbox";
import { define } from "@atomico/storybook/utils";

console.log(define(Checkbox));
export default {
    title: "Components/Checkbox",
    // ...define(Checkbox),
};

export const Default = (props) => <Checkbox {...props} />;
