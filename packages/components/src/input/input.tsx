import { Props, c, css, useRef, useProp } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { usePropProxy } from "@atomico/hooks/use-prop-proxy";
import { InputLayout } from "./input-layout";
import { GenericTokens } from "../tokens/tokens";
import { InputGenericProps } from "../props";

function input({ ...props }: Props<typeof input>) {
    const refInput = useRef<HTMLInputElement>();
    const [focused, setFocused] = useProp<boolean>("focused");

    useRender(() => (
        <input
            slot="input"
            {...(props as any)}
            ref={refInput}
            onfocus={() => setFocused(true)}
            onblur={() => setFocused(false)}
        />
    ));

    useDisabled();

    usePropProxy("value", {
        get() {
            return refInput.current?.value;
        },
    });

    const refIconPrefix = useRef();
    const slotIconPrefix = useSlot(refIconPrefix);

    const refIconSuffix = useRef();
    const slotIconSuffix = useSlot(refIconSuffix);

    return (
        <host shadowDom>
            <div>
                <InputLayout
                    focused={focused}
                    size={props.size}
                    disabled={props.disabled}
                    enableIconPrefix={!!slotIconPrefix.length}
                    enableIconSuffix={!!slotIconSuffix.length}
                >
                    <slot slot="prefix" name="prefix"></slot>
                    <slot
                        ref={refIconPrefix}
                        slot="icon-prefix"
                        name="icon-prefix"
                    ></slot>
                    <slot slot="input" name="input"></slot>
                    <slot slot="suffix" name="suffix"></slot>
                    <slot
                        ref={refIconSuffix}
                        slot="icon-suffix"
                        name="icon-suffix"
                    ></slot>
                </InputLayout>
            </div>
        </host>
    );
}

input.props = {
    ...InputGenericProps,
    type: String,
    list: String,
    pattern: String,
    min: Number,
    max: Number,
    minLength: Number,
    maxLength: Number,
    placeholder: String,
    step: Number,
};

input.styles = [
    GenericTokens,
    css`
        @tokens "../tokens/tokens.yaml" (import: input);
    `,
];

export const Input = c(input);
