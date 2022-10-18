import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { InputLayout } from "./input-layout";

function input({ ...props }: Props<typeof input>) {
    useRender(() => <input slot="input" {...props} />);

    return (
        <host shadowDom>
            <div>
                <InputLayout>
                    <slot slot="input" name="input"></slot>
                </InputLayout>
            </div>
        </host>
    );
}

input.props = {
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    value: {
        type: String,
    },
};

input.styles = css`
    @tokens "../theme/theme.yaml" (import: input);
    :host {
        color: var(--color-text);
        display: flex;
        color: var(--color-text);
        background: var(--color-background);
        border-color: var(--color-border);
    }
`;

export const Input = c(input);
