import { css } from "atomico";

export const Sizes = [
    "5xs",
    "4xs",
    "3xs",
    "xxs",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "3xl",
];

export const ColorsBackground = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "container",
    "surface",
];

export const ShadowDeep = [1, 2, 3, 4];

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

export const ButtonTokens = css`
    @tokens "./tokens.yaml" (import: button);
`;

export const CheckboxTokens = css`
    @tokens "./tokens.yaml" (import: checkbox)  (values: true);
`;

export const CardTokens = css`
    @tokens "./tokens.yaml" (import: card) (values: true);
`;

export const BadgeTokens = css`
    @tokens "./tokens.yaml" (import: badge) (values: true);
`;
