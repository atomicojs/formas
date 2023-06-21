import { define } from "@atomico/storybook";
import { Button } from "@atomico/ui-button";
import { Dropdown } from "@atomico/ui-dropdown";

export default {
    title: "Components/Dropdown",
    ...define(Dropdown),
};

export const Default = (props) => (
    <Dropdown {...props}>
        <Button slot="action">Click!</Button>
        <Button ghost>Option 1</Button>
        <Button ghost>Option 2</Button>
        <Button ghost>Option 3</Button>
    </Dropdown>
);
