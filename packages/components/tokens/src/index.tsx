import { css } from "atomico";

export const PrimitiveTokens = css`
    @tokens "./tokens.yaml" (import: primitive) (values: true);
`;

export const ActionTokens = css`
    @tokens "./tokens.yaml" (import: action) (values: true);

    :host {
        font-size: var(--font-size);
        font-weight: var(--font-weight);
        color: var(--font-color);
        opacity: var(--opacity);
    }
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
    @tokens "./tokens.yaml" (import: checkbox)  (values: true);
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
