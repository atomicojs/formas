import { define } from "@atomico/storybook";
import { Card } from "./card";

export default {
    title: "Components/Card",
    ...define(Card),
};

export const Default = (props) => (
    <Card {...props}>
        <span slot="header">Header</span>
        <img
            src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80"
            alt="Image"
        />
        <span>Content...</span>
        <span slot="footer"></span>
    </Card>
);
