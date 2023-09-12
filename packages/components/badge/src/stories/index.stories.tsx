import { define } from "@atomico/storybook";
import { Badge } from "@formas/badge";
import { Icon } from "@formas/icon";

export default {
    title: "components/Badge",
    ...define(Badge),
};

export const BadgeWithPrefix = (props) => (
    <Badge {...props}>
        <Icon slot="prefix" type="check"></Icon>
        Accepted
    </Badge>
);

export const BadgeWithSuffix = (props) => (
    <Badge {...props}>
        <Icon slot="suffix" type="closed"></Icon>
        Cancel
    </Badge>
);

