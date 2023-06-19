import { c, css } from "atomico";
import { GenericTokens } from "@atomico/ui-tokens";

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

console.log(GenericTokens);

alert.styles = [
    GenericTokens,
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
