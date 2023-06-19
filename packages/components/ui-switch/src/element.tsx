import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { c, css, Props, useHost, useProp } from "atomico";
import { Checkbox } from "@atomico/ui-checkbox";
import { useCheckbox } from "@atomico/ui-checkbox/hooks";
import { SwitchTokens } from "@atomico/ui-tokens";

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
    SwitchTokens,
    css`
        :host {
            --box-width: 0.9;
            --box-height: 0.48;
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
