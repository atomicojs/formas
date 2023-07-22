import { PrimitiveTokens } from "@formas/tokens";
import { c, css } from "atomico";

function alert() {
    return (
        <host shadowDom>
            <div>
                <slot name="prefix"></slot>
            </div>
            <div>
                <slot></slot>
            </div>
        </host>
    );
}

alert.props = {
    small: { type: Boolean, reflect: true },
};

alert.styles = [
    PrimitiveTokens,
    css`
        :host {
            display: flex;
            --padding: var(--space-between)
                calc(var(--space-between) * var(--font-line));
            padding: var(--padding);
        }
    `,
];

export const Alert = c(alert);
