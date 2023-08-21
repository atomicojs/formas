import { Container } from "@atomico/container";
import { define } from "@atomico/storybook";

export default {
    title: "components/Container",
    ...define(Container),
    args: {
        padding: "l",
        shadow: 1,
    },
};

export const Story = (props) => <Container {...props}>Atomico!</Container>;

