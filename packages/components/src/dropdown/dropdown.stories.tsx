import { define } from "@atomico/storybook";
import { Dropdown } from "./dropdown";
import { Button } from "../button/button";

export default {
    title: "Components/Dropdown",
    ...define(Dropdown),
};

export const Default = () => (
    <Dropdown>
        <Button slot="action">Click!</Button>
        <Button ghost>Option 1</Button>
        <Button ghost>Option 2</Button>
        <Button ghost>Option 3</Button>
    </Dropdown>
);
