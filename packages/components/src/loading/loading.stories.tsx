import { define } from "@atomico/storybook";
import { Loading } from "./loading";

export default {
    title: "Components/Loading",
    ...define(Loading),
};

export const Default = (props) => <Loading {...props}></Loading>;
