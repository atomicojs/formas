import { define } from "@atomico/storybook";
import { Avatar } from "../components";
import { Content } from "./content";

export default {
    title: "Components/Content",
    ...define(Content),
};

export const Default = (props) => (
    <Content {...props}>
        <Avatar slot="side" placeholder="AG"></Avatar>
        <h5>Welcome</h5>
        <span>Subtitle</span>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            et saepe laboriosam labore sapiente deleniti ab minus, vitae laborum
            eum officiis quia, minima autem perspiciatis magnam beatae cumque.
            Quod, voluptates.
        </p>
    </Content>
);
