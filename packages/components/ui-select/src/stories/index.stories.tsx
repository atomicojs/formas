import { UiSelect } from "@atomico/ui-select";
import { define } from "@atomico/storybook";

export default {
    title: "components/ui-select",
    ...define(
        UiSelect,
        { // Optional
            argTypes: {
                color: {
                    description: "Description..."
                }
            }
        }
)
};

export const Story = (props) =><UiSelect {...props}>Atomico!</UiSelect>;