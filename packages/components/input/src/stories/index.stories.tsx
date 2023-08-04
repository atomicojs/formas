import { define } from "@atomico/storybook";
import { Input } from "@formas/input";
import { Icon } from "@formas/icon";

export default {
    title: "components/Input",
    ...define(Input, {
        args: {
            placeholder: "Placeholder...",
        },
    }),
};

export const Default = (props) => <Input {...props}></Input>;

export const IconPrefixInput = (props) => (
    <Input {...props}>
        <Icon slot="icon-prefix"></Icon>
    </Input>
);

export const IconSuffixInput = (props) => (
    <Input {...props}>
        <Icon slot="icon-suffix"></Icon>
    </Input>
);
