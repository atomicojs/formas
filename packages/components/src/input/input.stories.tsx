import { defineArgTypes } from "@atomico/storybook/utils";
import { Input } from "./input";
import { Icon } from "../icon/icon";

export default {
    title: "components/Input",
    // argTypes: defineArgTypes(Input),
};

const args = {
    placeholder: "Placeholder...",
};

export const BasicInput = (props) => <Input {...props}></Input>;

BasicInput.args = args;

export const IconPrefixInput = (props) => (
    <Input {...props}>
        <Icon slot="icon-prefix"></Icon>
    </Input>
);

IconPrefixInput.args = args;

export const IconSuffixInput = (props) => (
    <Input {...props}>
        <Icon slot="icon-suffix"></Icon>
    </Input>
);

IconSuffixInput.args = args;
