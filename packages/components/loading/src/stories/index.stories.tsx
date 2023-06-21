import { Loading } from "@formas/loading";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Loading",
    ...define(Loading),
};

export const Story = (props) => <Loading {...props}>Atomico!</Loading>;
