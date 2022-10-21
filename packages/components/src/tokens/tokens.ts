import { css } from "atomico";

export const GenericTokens = css`
    @tokens "./tokens.yaml" (import: generic);
    :host {
        font-family: var(--font-size);
    }
`;

export const GenericStateTokens = css`
    @tokens "./tokens.yaml" (filter: state);
`;
