import { Badge } from "@formas/badge";
import { Icon } from "@formas/icon";
import { Props, c, css } from "atomico";
import { getValues, joinValues, useSetValue } from "./utils";

function inputListBadge({ value }: Props<typeof inputListBadge>) {
    const values = getValues(value);
    const dispatch = useSetValue();

    return (
        <host shadowDom>
            {values.map((value) => (
                <Badge
                    action
                    onclick={Object.assign(
                        (event: Event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            dispatch(
                                joinValues(values.filter((_) => _ != value))
                            );
                        },
                        { capture: true }
                    )}
                >
                    {value}
                    <Icon slot="suffix" type="closed" />
                </Badge>
            ))}
        </host>
    );
}

inputListBadge.props = {
    value: { type: String, value: "" },
    slot: { type: String, value: "input", reflect: true },
};

inputListBadge.styles = css`
    :host {
        display: flex;
        gap: var(--space);
    }
`;

export const InputListBadge = c(inputListBadge);
