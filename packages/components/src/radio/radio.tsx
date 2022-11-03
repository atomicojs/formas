import { Props, c, css, useHost } from "atomico";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { useFormInputRadio } from "@atomico/hooks/use-form";
import { Checkbox } from "../checkbox/checkbox";

function component({ tabIndex, value }: Props<typeof component>) {
    const host = useHost();
    const refInput = useFormInputRadio(<input value={value} />);
    const disabled = useDisabled();

    useReflectEvent(host, refInput, "click");

    return (
        <host shadowDom>
            <button
                class="checkbox"
                disabled={disabled}
                tabIndex={disabled ? -1 : tabIndex}
            >
                <div class="checkbox-box">
                    <div class="checkbox-state"></div>
                </div>
            </button>
        </host>
    );
}

component.props = {
    ...Checkbox.props,
};

component.styles = [
    Checkbox.styles,
    css`
        @tokens "../tokens/tokens.yaml" (import: radio);

        :host {
            --state-width: 0.7;
            --radius: var(--radius-circle);
            --state-unit: calc(var(--size-height) * var(--box-height));
            --state-radius: var(--radius-circle);
        }
        :host([checked]) {
        }
    `,
];

export const Radio = c(component);
