import { Props, c, css } from "atomico";

function button({ theme }: Props<typeof button>) {
    return <host shadowDom>welcome!</host>;
}

button.props = {
    theme: {
        type: String,
    },
};

button.styles = css`
    @tokens "../theme/theme.yaml" (import: button);
    :host {
        color: var(--color-text);
        padding: 1rem;
        display: flex;
        color: var(--color-text);
        background: var(--color-background);
        border-color: var(--color-border);
    }
`;

export const Button = c(button);

customElements.define("a-button", Button);
