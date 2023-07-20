import { useDisabled } from "@atomico/hooks/use-disabled";
import { useFormInputRadio } from "@atomico/hooks/use-form";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { c, css, Props, useHost, useProp } from "atomico";
import { Checkbox } from "@formas/checkbox";
import { ActionTokens, CheckboxTokens, PrimitiveTokens } from "@formas/tokens";

function component({ tabIndex, value }: Props<typeof component>) {
    const host = useHost();
    const refInput = useFormInputRadio(<input value={value} />);
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");

    useReflectEvent(host, refInput, "click");

    return (
        <host shadowDom>
            <button
                class="container"
                disabled={disabled}
                tabIndex={disabled ? -1 : tabIndex}
                onfocus={() => setFocused(true)}
                onblur={() => setFocused(false)}
            >
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle class="circle-1"></circle>
                    <circle class="circle-2"></circle>
                    <circle class="circle-3"></circle>
                    <circle class="circle-4"></circle>
                </svg>
            </button>
        </host>
    );
}

component.props = {
    ...Checkbox.props,
};

component.styles = [
    PrimitiveTokens,
    ActionTokens,
    CheckboxTokens,
    css`
        :host {
            --radius: var(--radius-circle);
            ---opacity: 0;
            ---stroke-color: var(--color-contrast-30);
            ---outline: none;
            ---offset: 60;
            ---scale: 0.75;
        }
        :host([checked]) {
            ---opacity: 1;
            ---stroke-color: transparent;
            ---offset: 0;
            ---scale: 1;
        }
        :host([focused]) {
            ---outline: var(--outline);
        }
        .container {
            all: unset;
            width: var(--size);
            height: var(--size);
            display: grid;
            place-content: center;
            cursor: pointer;
        }
        svg {
            width: var(--size-switch);
            height: var(--size-switch);
            border-radius: var(--radius);
            outline: var(---outline);
            outline-offset: var(--outline-offset);
        }
        .circle-1,
        .circle-2,
        .circle-3,
        .circle-4 {
            cx: 10;
            cy: 10;
            r: 9;
            fill: transparent;
        }
        .circle-1 {
            r: 10;
            fill: var(--color-invert);
        }
        .circle-2 {
            stroke-width: var(--stroke-size);
            stroke: var(---stroke-color);
            transition: var(--transition);
        }
        .circle-3 {
            stroke-width: var(--stroke-size);
            stroke-dasharray: 60;
            stroke-dashoffset: var(---offset);
            transition: var(--transition);
            stroke-linecap: round;
            stroke: var(--color-contrast-100);
        }
        .circle-4 {
            stroke-width: var(--stroke-size);
            opacity: var(---opacity);
            transform: scale(var(---scale));
            transform-origin: center;
            transition: var(--transition-medium);
            fill: var(--color-contrast-100);
            r: 6;
        }
    `,
];

export const Radio = c(component);
