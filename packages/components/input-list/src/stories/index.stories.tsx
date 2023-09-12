import { define } from "@atomico/storybook";
import { Input } from "@formas/input";
import { InputList, InputListOption, InputListBadge } from "@formas/input-list";

export default {
    title: "components/Input list",
    ...define(InputList),
};

export const Story = (props) => (
    <InputList {...props} value="Value 1">
        <InputListBadge />
        <Input
            type="search"
            style="--formas--action-border-color: transparent"
            slot="header"
            small
        ></Input>
        <InputListOption value="Value 1" />
        <InputListOption value="Value 2" />
        <InputListOption value="Value 3" />
    </InputList>
);

