import { Radio } from "./radio";
import { defineArgTypes } from "@atomico/storybook/utils";

export default {
    title: "Components/Radio",
    // argTypes: defineArgTypes(Radio),
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
