import { c, css } from "atomico";
import { PrimitiveTokens, Sizes, Colors } from "@formas/tokens";

function container() {
    return (
        <host shadowDom>
            <slot></slot>
        </host>
    );
}

container.props = {
    padding: {
        type: String,
        reflect: true,
    },
    bgcolor: {
        type: String,
        reflect: true,
    },
    color: {
        type: String,
        reflect: true,
    },
};

container.styles = [
    PrimitiveTokens,
    css`
        :host {
            display: grid;
            padding: var(--padding);
            background-color: var(--bgcolor);
            color: var(--color);
        }
        ${Sizes.map(
            (size) => `:host([padding=${size}]){--padding: var(--size-${size})}`
        ).join("")}
        ${Colors.map(
            (color) => `
            :host([bgcolor=${color}]){--bgcolor: var(--color-${color})}
            :host([color=${color}]){--color: var(--color-${color})}
        `
        ).join("")}
    `,
];

export const Container = c(container);

