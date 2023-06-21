import { useDisabled } from "@atomico/hooks/use-disabled";
import { useFormInputRadio } from "@atomico/hooks/use-form";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { c, css, Props, useHost, useProp } from "atomico";
import { Checkbox } from "@atomico/ui-checkbox";
import { RadioTokens } from "@atomico/ui-tokens";

function component({ tabIndex, value }: Props<typeof component>) {
    const host = useHost();
    const refInput = useFormInputRadio(<input value={value} />);
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
    RadioTokens,
    css`
        :host {
            --state-width: 0.6;
            --radius: var(--radius-circle);
            --state-unit: calc(var(--size-height) * var(--box-height));
            --state-radius: var(--radius-circle);
        }
    `,
];

export const Radio = c(component);
