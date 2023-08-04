import { define } from "@atomico/storybook";
import { Alert } from "@formas/alert";

export default {
    title: "In progress/Components/Alert",
    ...define(Alert),
};

/**
 * Define **algo!**
 *
 * ```tsx
 * <demo/>
 * ```
 */
export const Default = (props) => (
    <Alert {...props}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, ullam!
        Ea alias illo
    </Alert>
);
