import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { usePropProxy } from "@atomico/hooks/use-prop-proxy";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { Icon } from "@formas/icon";
import { InputGenericProps } from "@formas/props";
import { Props, c, css, useProp, useRef } from "atomico";
import { serialize } from "atomico/utils";
import { InputLayout } from "./layout";
import { Button } from "@formas/button";

const cssLightdom = css`
    input[type="file"]::file-selector-button,
    input[type="file"]::-webkit-file-selector-button {
        display: none;
    }
    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
    }
`;

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

    useCssLightDom(cssLightdom);

    const isTypeFile = props.type === "file";

    const handlerDragOver =
        isTypeFile &&
        ((event: DragEvent) => {
            event.preventDefault();
        });

    const handlerDrop =
        isTypeFile &&
        ((event: DragEvent) => {
            event.preventDefault();

            const data = new DataTransfer();

            [...event.dataTransfer.files]
                .slice(0, props.multiple ? event.dataTransfer.files.length : 1)
                .forEach((file) => data.items.add(file));

            refInput.current.files = data.files;
        });

    return (
        <host shadowDom>
            <div
                ondragover={() => {
                    if (props.type === "file") {
                        setFocused(true);
                    }
                }}
                ondragend={() => {
                    setFocused(false);
                }}
            >
                <InputLayout
                    class="layout"
                    focused={focused}
                    small={props.small}
                    disabled={props.disabled}
                    layout={serialize(
                        slotIconPrefix.length && "prefix",
                        (slotIconSuffix.length ||
                            props.type === "file" ||
                            props.type === "date") &&
                            "suffix"
                    )}
                    onClickIn={(event) => {
                        if (event.detail === "container") {
                            refInput.current?.focus();
                            refInput.current?.click();
                        }
                    }}
                    ondragover={handlerDragOver}
                    ondrop={handlerDrop}
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
                    >
                        {isTypeFile ? (
                            <Icon type="attachment"></Icon>
                        ) : props.type === "date" ? (
                            <Button
                                ghost
                                onclick={() => {
                                    refInput.current?.showPicker();
                                }}
                            >
                                <Icon type="calendar"></Icon>
                            </Button>
                        ) : null}
                    </slot>
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
    multiple: Boolean,
};

input.styles = css`
    :host([type="date"]) .layout {
        --padding-right: 0;
    }
    :host([type="file"]) .layout {
        --border-style: dashed;
    }
`;

export const Input = c(input);
