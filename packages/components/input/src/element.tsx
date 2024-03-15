import {
    useCssLightDom,
    useDisabled,
    usePropProxy,
    useRender,
    useSlot,
    useClickPress,
} from "@atomico/hooks";
import { Button } from "@formas/button";
import { Icon } from "@formas/icon";
import { InputGenericProps } from "@formas/props";
import { c, css, useProp, useRef } from "atomico";
import { serialize } from "atomico/utils";
import { InputLayout } from "./layout";

const cssLightdom = css`
    input[type="file"]::file-selector-button,
    input[type="file"]::-webkit-file-selector-button {
        display: none;
    }
    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button,
    input[type="search"]::-webkit-search-cancel-button {
        display: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
`;

export const Input = c(
    (props) => {
        const refInput = useRef<HTMLInputElement>();
        const [focused, setFocused] = useProp<boolean>("focused");
        const refIncrement = useRef<HTMLInputElement>();
        const refDecrement = useRef<HTMLInputElement>();

        useClickPress(refIncrement, () => {
            refInput.current.stepUp();
        });
        useClickPress(refDecrement, () => {
            refInput.current.stepDown();
        });

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
                    .slice(
                        0,
                        props.multiple ? event.dataTransfer.files.length : 1
                    )
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
                                props.type === "search" ||
                                props.type === "number" ||
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
                                <Button
                                    ghost
                                    small={props.small}
                                    onclick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        refInput.current?.click();
                                    }}
                                >
                                    <Icon
                                        slot="prefix"
                                        type="attachment"
                                    ></Icon>
                                </Button>
                            ) : props.type === "date" ? (
                                <Button ghost small={props.small}>
                                    <Icon slot="prefix" type="calendar"></Icon>
                                </Button>
                            ) : props.type === "search" ? (
                                <Button
                                    ghost
                                    small={props.small}
                                    onclick={() => {
                                        refInput.current?.showPicker();
                                    }}
                                >
                                    <Icon slot="prefix" type="search"></Icon>
                                </Button>
                            ) : props.type === "number" ? (
                                <>
                                    <Button
                                        ghost
                                        small={props.small}
                                        ref={refDecrement}
                                    >
                                        <Icon slot="prefix" type="dash"></Icon>
                                    </Button>
                                    <Button
                                        ghost
                                        small={props.small}
                                        ref={refIncrement}
                                    >
                                        <Icon slot="prefix" type="plus"></Icon>
                                    </Button>
                                </>
                            ) : null}
                        </slot>
                    </InputLayout>
                </div>
            </host>
        );
    },
    {
        props: {
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
            loading: {
                type: Boolean,
                reflect: true,
            },
        },
        styles: css`
            :host([type="date"]) .layout,
            :host([type="search"]) .layout,
            :host([type="file"]) .layout,
            :host([type="number"]) .layout {
                --padding-right: 0;
            }
            :host([type="file"]) .layout {
                --border-style: dashed;
            }
        `,
    }
);
