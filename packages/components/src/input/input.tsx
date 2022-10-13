import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";

function input({ theme }: Props<typeof input>) {
    useRender(() => <input type="text" slot="input" />);
    return (
        <host shadowDom>
            <div>
                <slot name="input"></slot>
            </div>
        </host>
    );
}

input.props = {
    theme: {
        type: String,
    },
};

input.styles = css`
    @tokens "../theme/theme.yaml" (import: input);
    :host {
        color: var(--color-text);
        padding: 1rem;
        display: flex;
        color: var(--color-text);
        background: var(--color-background);
        border-color: var(--color-border);
    }
`;

export const Input = c(input);

customElements.define("a-input", Input);
