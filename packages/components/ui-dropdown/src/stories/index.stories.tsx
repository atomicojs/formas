import { Dropdown } from "@atomico/dropdown";
import { define } from "@atomico/storybook";

export default {
    title: "components/dropdown",
    ...define(
        Dropdown,
        { // Optional
            argTypes: {
                color: {
                    description: "Description..."
                }
            }
        }
)
};

export const Story = (props) =><Dropdown {...props}>Atomico!</Dropdown>;