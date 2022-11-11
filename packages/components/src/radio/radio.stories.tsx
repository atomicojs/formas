import { Radio } from "./radio";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Radio",
    ...define(Radio),
};

export const Default = (props) => <Radio {...props}></Radio>;

export const DefaultGroup = () => (
    <form>
        <label>
            One <Radio name="option" value="one"></Radio>
        </label>
        <label>
            Two <Radio name="option" value="two"></Radio>
        </label>
        <label>
            Three <Radio name="option" value="three"></Radio>
        </label>
    </form>
);
