import { define } from "@atomico/storybook";
import { Input } from "@formas/input";
import { Icon } from "@formas/icon";

export default {
    title: "components/Input",
    ...define(Input),
};

export const Default = (props) => <Input key="defaul" {...props}></Input>;

export const DefaultDate = (props) => (
    <Input key="date" {...props} type="date"></Input>
);

export const DefaultNumber = (props) => (
    <Input key="number" id="debug" {...props} type="number"></Input>
);

export const DefaultFile = (props) => (
    <Input key="file" {...props} type="file"></Input>
);

export const DefaultSearch = (props) => (
    <Input key="search" {...props} type="search" loading></Input>
);

export const IconPrefixInput = (props) => (
    <Input key="prefix" {...props}>
        <Icon slot="icon-prefix"></Icon>
    </Input>
);

export const IconSuffixInput = (props) => (
    <Input key="" {...props}>
        <Icon slot="icon-suffix"></Icon>
    </Input>
);
