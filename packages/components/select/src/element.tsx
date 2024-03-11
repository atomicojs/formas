import { useDisabled } from "@atomico/hooks/use-disabled";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { Icon } from "@formas/icon";
import { InputLayout } from "@formas/input";
import { InputGenericProps } from "@formas/props";
import { ActionTokens, PrimitiveTokens } from "@formas/tokens";
import { c, css, Props, useProp, useRef, useUpdate } from "atomico";
import { SelectOption } from "./option";
export { SelectOption } from "./option";

export const Select = c(
    ({ name, placeholder, small }) => {
        const refSlotOption = useRef();
        const slotOption = useSlot<typeof SelectOption>(refSlotOption);
        const disabled = useDisabled();
        const update = useUpdate();
        const [value, setValue] = useProp("value");
        const [focused, setFocused] = useProp<boolean>("focused");

        useRender(() => (
            <select
                slot="input"
                class="reset"
                name={name}
                disabled={disabled}
                onchange={({ currentTarget: { value } }) => setValue(value)}
                onfocus={() => setFocused(true)}
                onblur={() => setFocused(false)}
            >
                {placeholder && (
                    <option value="" disabled selected>
                        {placeholder}
                    </option>
                )}
                {slotOption.map(function option(child) {
                    return child?.options?.length ? (
                        <optgroup label={child.label}>
                            {child?.options.map(option)}
                        </optgroup>
                    ) : (
                        <option
                            value={child.value}
                            selected={value === child.value || child.selected}
                        >
                            {child.label || child.value}
                        </option>
                    );
                })}
            </select>
        ));

        return (
            <host shadowDom onOptionChange={update}>
                <slot name="option" ref={refSlotOption}></slot>
                <InputLayout
                    class="input-layout"
                    narrowHeader
                    small={small}
                    disabled={disabled}
                    focused={focused}
                    layout="suffix"
                >
                    <slot slot="input" name="input"></slot>
                    <Icon
                        class="input-icon"
                        type="down"
                        slot="icon-suffix"
                    ></Icon>
                </InputLayout>
            </host>
        );
    },
    {
        props: {
            ...InputGenericProps,
            placeholder: String,
            narrow: {
                type: Boolean,
                reflect: true,
            },
            ghost: {
                type: Boolean,
                reflect: true,
            },
        },
        styles: [
            PrimitiveTokens,
            ActionTokens,
            css`
                ::slotted([slot="input"]) {
                    border: none;
                    background: transparent;
                    appearance: none;
                    z-index: 1;
                    left: 0px;
                    top: 0px;
                    position: absolute;
                    padding: 0px calc(var(--space) * 2);
                }
            `,
        ],
    }
);
