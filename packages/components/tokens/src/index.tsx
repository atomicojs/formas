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

export const Colors = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "neutral-50",
    "surface",
    "status-success",
    "status-warning",
    "status-info",
    "status-danger",
    "contrast-100",
    "contrast-75",
    "contrast-50",
    "contrast-30",
    "contrast-15",
    "contrast-10",
    "contrast-5",
];

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
    @tokens "./tokens.yaml" (import: card);
`;
