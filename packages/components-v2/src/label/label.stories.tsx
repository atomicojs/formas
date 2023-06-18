import { define } from "@atomico/storybook";
import { Label } from "./label";
import { Checkbox, Switch, Radio, Button } from "../components";

export default {
    title: "components/Label",
    ...define(Label, {
        argTypes: {
            layout: {
                control: "radio",
                options: ["vertical", "horizontal"],
            },
        },
    }),
};

export const Default = (props) => (
    <Label {...props}>
        <Checkbox slot="action"></Checkbox>
        <span>Remember password</span>
    </Label>
);

export const RadioList = (props) => (
    <form>
        <Label {...props}>
            <Radio slot="action" value="1" name="type"></Radio>
            <span>Value 1</span>
        </Label>
        <Label {...props}>
            <Radio slot="action" value="2" name="type"></Radio>
            <span>Value 2</span>
        </Label>
        <Label {...props}>
            <Radio slot="action" value="3" name="type"></Radio>
            <span>Value 3</span>
        </Label>
    </form>
);

export const SwitchList = (props) => (
    <form>
        <Label {...props}>
            <Switch slot="action" value="1" name="type"></Switch>
            <span>Value 1</span>
        </Label>
        <Label {...props}>
            <Switch slot="action" value="2" name="type"></Switch>
            <span>Value 2</span>
        </Label>
        <Label {...props}>
            <Switch slot="action" value="3" name="type"></Switch>
            <span>Value 3</span>
        </Label>
    </form>
);
