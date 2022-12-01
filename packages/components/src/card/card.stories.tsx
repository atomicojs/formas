import { define } from "@atomico/storybook";
import { AvatarLabel, Avatar, Button, Icon, Content } from "../components";
import { Card } from "./card";

export default {
    title: "Components/Card",
    ...define(Card),
};

export const Default = (props) => (
    <Card {...props} style="width: 320px">
        <AvatarLabel slot="header" small={props.small}>
            <Avatar {...props} slot="avatar" placeholder="AG"></Avatar>
            <strong>UpperCod</strong>
            <span>Administrator</span>
        </AvatarLabel>
        <Button slot="header">
            <Icon size="1.2rem" slot="icon-prefix" type="options"></Icon>
        </Button>
        <img
            src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80"
            alt="Image"
        />
        <Content>
            <h5>Title</h5>
            <span>Subtitle</span>
            <p>
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo
                duis reprehenderit Lorem aliqua aute consequat dolor culpa
                tempor quis
            </p>
        </Content>
        <Button slot="footer" small circle outline>
            Create
        </Button>
    </Card>
);

export const ContentAndFooter = (props) => (
    <Card {...props} style="width: 320px">
        <img
            src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80"
            alt="Image"
        />
        <Content>
            <h5>Title</h5>
            <span>Subtitle</span>
            <p>
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo
                duis reprehenderit Lorem aliqua aute consequat dolor culpa
                tempor quis
            </p>
        </Content>
        <Button slot="footer" small circle outline>
            Create
        </Button>
        <Button slot="footer" small color="danger" circle ghost>
            Remove
        </Button>
    </Card>
);
