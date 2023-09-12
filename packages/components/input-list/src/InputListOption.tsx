import { Props, c, useProp, css } from "atomico";
import { Label } from "@formas/label";
import { Checkbox } from "@formas/checkbox";

function inputListOption({ value }: Props<typeof inputListOption>) {
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
}

inputListOption.props = {
    value: { type: String, reflect: true },
    checked: { type: Boolean, reflect: true },
    slot: { type: String, value: "option", reflect: true },
};

inputListOption.styles = css`
    :host {
        padding-left: var(--space);
    }
`;

export const InputListOption = c(inputListOption);

