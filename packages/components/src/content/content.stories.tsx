import { Content } from "./content";
import { Avatar } from "../components";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Content",
    ...define(Content),
};

export const Default = (props) => (
    <Content {...props}>
        <Avatar slot="side" placeholder="AG"></Avatar>
        <h5>Welcome</h5>
        <span>Subtitle</span>
    </Content>
);
