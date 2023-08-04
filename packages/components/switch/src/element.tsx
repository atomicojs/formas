import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { c, css, Props, useHost, useProp } from "atomico";
import { Checkbox } from "@formas/checkbox";
import { useCheckbox } from "@formas/checkbox/hooks";
import { PrimitiveTokens, CheckboxTokens, ActionTokens } from "@formas/tokens";

function component({ tabIndex }: Props<typeof component>) {
    const host = useHost();
    const refInput = useCheckbox("checkbox");
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
                <svg width="32" height="20" viewBox="0 0 32 20">
                    <rect class="rect-1" />
                    <rect class="rect-2" />
                    <rect class="rect-3" />
                    <circle r="6" cx="10" cy="10" />
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
            ---stroke-color: var(--color-contrast-30);
            ---stroke-offset: 90;
            ---x: 0;
        }
        :host([checked]) {
            ---stroke-color: var(--color-contrast-100);
            ---stroke-offset: 0;
            ---x: 12px;
        }
        :host([focused]) {
            ---outline: var(--outline);
        }
        .container {
            all: unset;
            cursor: pointer;
        }
        svg {
            border-radius: 100vh;
            outline: var(---outline);
            outline-offset: var(--outline-offset);
        }
        .rect-2,
        .rect-3 {
            width: 30px;
            height: 18px;
            x: 1;
            y: 1;
            stroke-width: var(--stroke-size);
            rx: 9;
            fill: transparent;
        }

        circle {
            fill: var(---stroke-color);
            transition: var(--transition-medium);
            transform: translateX(var(---x));
        }
        .rect-1 {
            fill: var(--color-invert);
            width: 100%;
            height: 100%;
            rx: 10;
        }
        .rect-2 {
            stroke: var(--color-contrast-30);
        }
        .rect-3 {
            stroke: var(---stroke-color);
            stroke-dasharray: 90;
            stroke-dashoffset: var(---stroke-offset);
            transition: var(--transition);
            stroke-linecap: round;
        }
    `,
];

export const Switch = c(component);
