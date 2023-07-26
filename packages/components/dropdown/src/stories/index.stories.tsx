import { define } from "@atomico/storybook";
import { Button } from "@formas/button";
import { Dropdown } from "@formas/dropdown";

export default {
    title: "Components/Dropdown",
    ...define(Dropdown),
};

export const Default = (props) => (
    <Dropdown {...props}>
        <Button small slot="action">
            Click!
        </Button>
        <Button small ghost>
            Option 1
        </Button>
        <Button small ghost>
            Option 2
        </Button>
        <Button small ghost>
            Option 3
        </Button>
    </Dropdown>
);
