import { useSlot } from "@atomico/hooks/use-slot";
import { InputLayout } from "@formas/input";
import { Props, c, css, useEffect, useProp, useRef } from "atomico";
import { serialize } from "atomico/utils";
import { getValues, joinValues } from "./utils";

interface TypeOption extends HTMLElement {
    checked: boolean;
    value: string;
}

interface TypeTemplate extends HTMLElement {
    value: string;
}

function inputList({ multiple, small }: Props<typeof inputList>) {
    const refTempalte = useRef();
    const refOptions = useRef();
    const refHeader = useRef();
    const refFooter = useRef();

    const slotTemplate = useSlot<TypeTemplate>(
        refTempalte,
        (element) => element instanceof HTMLElement
    );
    const slotHeader = useSlot<TypeTemplate>(refHeader);
    const slotFooter = useSlot<TypeTemplate>(refFooter);
    const slotOptions = useSlot<TypeOption>(
        refOptions,
        (element) => element instanceof HTMLElement
    );

    const [value, setValue] = useProp<string>("value");

    useEffect(() => {
        slotTemplate.forEach((element) => {
            console.info({ value });
            element.value = value || "";
        });
    }, [slotTemplate, value]);

    useEffect(() => {
        const list = getValues(value);
        slotOptions.forEach(
            (element) => (element.checked = list.includes(element.value))
        );
    }, [slotOptions, value]);

    return (
        <host
            shadowDom
            layout={serialize(
                slotHeader.length && "header",
                slotFooter.length && "footer"
            )}
        >
            <InputLayout
                enableDropdown
                small={small}
                onSetValue={(event: CustomEvent<string>) =>
                    setValue(event.detail)
                }
            >
                <slot ref={refTempalte} name="input" slot="input" />
                <div slot="dropdown" class="dropdown">
                    <div class="header">
                        <slot ref={refHeader} name="header" />
                    </div>
                    <div class="options">
                        <slot
                            onchange={(event) => {
                                const target = event.target as TypeOption;
                                const { checked } = target;
                                setValue((value) => {
                                    const list = getValues(value);

                                    if (!multiple) return target.value;

                                    if (list.includes(target.value)) {
                                        return checked
                                            ? value
                                            : joinValues(
                                                  list.filter(
                                                      (value) =>
                                                          value !== target.value
                                                  )
                                              );
                                    }
                                    return checked
                                        ? joinValues(list.concat(target.value))
                                        : value;
                                });
                            }}
                            name="option"
                            ref={refOptions}
                        />
                    </div>
                    <div class="footer">
                        <slot ref={refFooter} name="footer" />
                    </div>
                </div>
            </InputLayout>
        </host>
    );
}

inputList.props = {
    value: { type: String, value: "" },
    multiple: { type: Boolean, reflect: true },
    small: { type: Boolean, reflect: true },
    minLength: Number,
    maxLength: Number,
};

inputList.styles = css`
    :host {
        display: block;
        --display-header: none;
        --display-footer: none;
    }
    .dropdown {
    }
    .options {
        display: grid;
    }
    .header {
        display: var(--display-header);
        border-bottom: var(--border-split);
    }
    .footer {
        display: var(--display-footer);
        border-top: var(--border-split);
    }

    :host([layout*="header"]) {
        --display-header: block;
    }
    :host([layout*="footer"]) {
        --display-footer: block;
    }
`;

export const InputList = c(inputList);

