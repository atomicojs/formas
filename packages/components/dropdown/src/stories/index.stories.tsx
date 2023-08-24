import { define } from "@atomico/storybook";
import { Button } from "@formas/button";
import { Dropdown } from "@formas/dropdown";
import { Icon } from "@formas/icon";

export default {
    title: "Components/Dropdown",
    ...define(Dropdown),
};

export const Default = (props) => (
    <Dropdown {...props} width="140px">
        <Button small slot="action">
            Show options
            <Icon slot="suffix" type="down"></Icon>
        </Button>
        <Button small ghost>
            <Icon slot="prefix" type="home"></Icon>
            Home
        </Button>
        <Button small ghost>
            <Icon slot="prefix" type="profile"></Icon>
            Account
        </Button>
        <Dropdown {...props}>
            <Button small ghost slot="action">
                <Icon slot="prefix" type="config"></Icon>
                Option 3<Icon slot="suffix" type="right"></Icon>
            </Button>
            <Button small ghost>
                <Icon slot="prefix" type="lock"></Icon>
                Security
            </Button>
            <Button small ghost>
                <Icon slot="prefix" type="options"></Icon>
                Options
            </Button>
        </Dropdown>
    </Dropdown>
);
