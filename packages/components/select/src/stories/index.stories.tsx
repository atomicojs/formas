import { Select, SelectOption } from "@formas/select";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Select",
    ...define(Select),
};

export const Default = (props) => (
    <Select {...props}>
        <SelectOption value="1" label="Option 1"></SelectOption>
        <SelectOption value="2" label="Option 2"></SelectOption>
        <SelectOption value="3" label="Option 3"></SelectOption>
    </Select>
);
