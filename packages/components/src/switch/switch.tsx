import { Props, c, css, useHost, useProp } from "atomico";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { Checkbox } from "../checkbox/checkbox";
import { useCheckbox } from "../hooks/use-checkbox";

function component({ tabIndex }: Props<typeof component>) {
    const host = useHost();
    const refInput = useCheckbox("checkbox");
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");

    useReflectEvent(host, refInput, "click");

    return (
        <host shadowDom>
            <button
                class="checkbox"
                disabled={disabled}
                tabIndex={disabled ? -1 : tabIndex}
                onfocus={() => setFocused(true)}
                onblur={() => setFocused(false)}
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
        @tokens "../tokens/tokens.yaml" (import: switch);

        :host {
            --state-scale: 0.38;
            --box-width: 0.9;
            --box-height: 0.5;
            --radius: var(--radius-circle);
            --state-unit: calc(var(--size-height) * var(--box-height));
            --state-width: 0.7;
            --state-radius: var(--radius-circle);
            --state-transform: translateX(-50%);
            --background-state: var(--color-border);
        }

        :host([checked]) {
            --state-transform: translateX(50%);
        }
    `,
];

export const Switch = c(component);
