import { css } from "atomico";

export const GenericTokens = css`
    @tokens "./tokens.yaml" (import: generic);
    :host {
        font-size: var(--font-size);
        --outline-color: var(--color-outline);
        --outline: var(--outline-width) var(--outline-style)
            var(--outline-color);
    }
    :host([disabled]) {
        opacity: var(--opacity);
        pointer-events: none;
    }
    :host([focused]:not([disabled])) {
        --outline-color: var(--color-outline-on);
    }
`;

export const GenericStateTokens = css`
    @tokens "./tokens.yaml" (filter: state);
`;

export const NavigationTokens = css`
    @tokens "./tokens.yaml" (import: navigation);
`;
