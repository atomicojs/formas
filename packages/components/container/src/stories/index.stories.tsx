import { Container } from "@atomico/container";
import { define } from "@atomico/storybook";

export default {
    title: "components/Container",
    ...define(Container),
};

export const Story = (props) => <Container {...props}>Atomico!</Container>;

