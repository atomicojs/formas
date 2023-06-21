import { useDisabled } from "@atomico/hooks/use-disabled";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { Icon } from "@atomico/ui-icon";
import { InputLayout } from "@atomico/ui-input";
import { InputGenericProps } from "@atomico/ui-props";
import { GenericTokens } from "@atomico/ui-tokens";
import { c, css, Props, useProp, useRef, useUpdate } from "atomico";
import { SelectOption } from "./option";
export { SelectOption } from "./option";

function select({ name, placeholder, small }: Props<typeof select>) {
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
                enableIconSuffix
                class="input-layout"
                narrowHeader
                small={small}
                disabled={disabled}
                focused={focused}
            >
                <slot slot="input" name="input"></slot>
                <Icon class="input-icon" type="down" slot="icon-suffix"></Icon>
            </InputLayout>
        </host>
    );
}

select.props = {
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
};

select.styles = [
    GenericTokens,
    css`
        ::slotted([slot="input"]) {
            border: none;
            background: transparent;
            appearance: none;
            z-index: 1;
            left: 0px;
            top: 0px;
            position: absolute;
            padding: 0px var(--space-around);
        }
    `,
];

export const Select = c(select);
