import { define } from "@atomico/storybook";
import { Button } from "@formas/button";
import { Dropdown } from "@formas/dropdown";

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
