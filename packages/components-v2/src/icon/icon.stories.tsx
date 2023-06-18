import { Icon } from "./icon";
import { Icons, IconsKeys } from "./icons";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Icon",
    ...define(Icon),
};

export const Default = (props) => (
    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr))">
        {Object.keys(Icons).map((type: IconsKeys) => (
            <Icon {...props} type={type}></Icon>
        ))}
    </div>
);
