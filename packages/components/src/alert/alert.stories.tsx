import { define } from "@atomico/storybook";
import { Alert } from "./alert";

export default {
    title: "Components/Alert",
    ...define(Alert),
};

export const Default = (props) => (
    <Alert {...props}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, ullam!
        Ea alias illo
    </Alert>
);
