import { define } from "@atomico/storybook";
import { Button } from "@formas/button";
import { Dropdown } from "@formas/dropdown";
import { Icon } from "@formas/icon";

export default {
    title: "Components/Dropdown",
    ...define(Dropdown),
};

export const Default = (props) => (
    <Button small ghost>
        <Icon slot="prefix" type="home"></Icon>
        Home
    </Button>
);
