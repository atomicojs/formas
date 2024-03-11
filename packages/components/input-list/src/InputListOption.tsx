import { Props, c, useProp, css } from "atomico";
import { Label } from "@formas/label";
import { Checkbox } from "@formas/checkbox";

export const InputListOption = c(
    ({ value }) => {
        const [checked, setChecked] = useProp("checked");
        return (
            <host shadowDom>
                <Label slot="option">
                    <strong>{value}</strong>
                    <Checkbox
                        checked={checked}
                        slot="action"
                        value={value}
                        onchange={({ currentTarget }) =>
                            setChecked(currentTarget.checked)
                        }
                    ></Checkbox>
                </Label>
            </host>
        );
    },
    {
        props: {
            value: { type: String, reflect: true },
            checked: { type: Boolean, reflect: true },
            slot: { type: String, value: "option", reflect: true },
        },
        styles: css`
            :host {
                padding-left: var(--space);
            }
        `,
    }
);
