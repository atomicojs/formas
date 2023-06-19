import { css } from "atomico";

export const GenericTokens = css`
    @tokens "./tokens.yaml" (import: generic) (values: true);
    :host {
        font-size: var(--font-size);
        line-height: var(--font-line);
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

export const ButtonTokens = css`
    @tokens "./tokens.yaml" (import: button);
`;

export const DropdownTokens = css`
    @tokens "./tokens.yaml" (import: dropdown);
`;

export const CheckboxTokens = css`
    @tokens "./tokens.yaml" (import: checkbox);
`;

export const RadioTokens = css`
    @tokens "./tokens.yaml" (import: radio);
`;

export const SwitchTokens = css`
    @tokens "./tokens.yaml" (import: switch);
`;

export const InputTokens = css`
    @tokens "./tokens.yaml" (import: input);
`;
