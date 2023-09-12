import { useListener } from "@atomico/hooks/use-listener";
import { DropdownLayout } from "@formas/dropdown";
import { ActionTokens, PrimitiveTokens } from "@formas/tokens";
import {
    Host,
    Props,
    c,
    css,
    useEvent,
    useHost,
    useProp,
    useRef,
} from "atomico";

type CLickIn =
    | "input"
    | "prefix"
    | "suffix"
    | "icon-prefix"
    | "icon-suffix"
    | "action"
    | "action"
    | "container"
    | "dropdown";

function inputLayout({ enableDropdown }: Props<typeof inputLayout>): Host<{
    toggleDropdown(): void;
    onClickIn: CustomEvent<CLickIn>;
}> {
    const refWindow = useRef(window);
    const refHost = useHost();
    const refInputSlot = useRef();

    const dispatch = useEvent<CLickIn>("ClickIn");

    const [showDropdown, setShowDropdown] = useProp<boolean>("showDropdown");

    useListener(refWindow, "click", (event) => {
        if (
            event.isTrusted &&
            !event.composedPath().includes(refHost.current)
        ) {
            setShowDropdown(false);
        }
    });

    return (
        <host shadowDom>
            <div
                class="input"
                staticNode
                onclick={(event) => {
                    if (!event.composedPath().includes(refInputSlot.current))
                        dispatch("container");
                    if (enableDropdown) setShowDropdown((value) => !value);
                }}
            >
                <div
                    class="action action-prefix"
                    onclick={() => dispatch("action")}
                >
                    <div class="action-row">
                        <div
                            onclick={() => dispatch("icon-prefix")}
                            class="icon icon-prefix"
                        >
                            <slot name="icon-prefix"></slot>
                        </div>
                        <slot name="prefix"></slot>
                    </div>
                </div>
                <div
                    ref={refInputSlot}
                    class="input-slot"
                    onclick={() => {
                        dispatch("input");
                    }}
                >
                    <slot name="input"></slot>
                </div>
                <div
                    class="action action-suffix"
                    onclick={() => dispatch("action")}
                >
                    <div class="action-row">
                        <slot name="suffix"></slot>
                        <div
                            onclick={() => dispatch("icon-suffix")}
                            class="icon icon-suffixs"
                        >
                            <slot name="icon-suffix"></slot>
                        </div>
                    </div>
                </div>
            </div>
            {enableDropdown && (
                <div class="dropdown" onclick={() => dispatch("dropdown")}>
                    <DropdownLayout
                        show={showDropdown}
                        reference={refHost.current}
                        class="dropdown-component"
                    >
                        <slot name="dropdown"></slot>
                    </DropdownLayout>
                </div>
            )}
        </host>
    );
}

inputLayout.props = {
    small: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    focused: { type: Boolean, reflect: true },
    showDropdown: Boolean,
    enableDropdown: Boolean,
    enableIconPrefix: Boolean,
    enableIconSuffix: Boolean,
};

inputLayout.styles = [
    PrimitiveTokens,
    ActionTokens,
    css`
        :host {
            --background: var(--color-invert);
            --size-icon-box: calc(var(--size) - (var(--border-size) * 2));
            --prefix-display: none;
            --suffix-display: none;
            --padding-between: calc(var(--space) * 2);
            --padding-left: var(--padding-between);
            --padding-right: var(--padding-between);
        }
        :host([disabled]) {
            pointer-events: none;
            opacity: var(--opacity);
        }
        :host([focused]) {
            ---outline: var(--outline);
        }
        :host([layout="prefix"]),
        :host([layout="prefix suffix"]) {
            --prefix-display: block;
        }
        :host([layout="suffix"]),
        :host([layout="prefix suffix"]) {
            --suffix-display: block;
        }
        .input {
            display: flex;
            background: var(--background);
            border-radius: var(--radius);
            border: var(--border);
            min-height: var(--size);
            box-sizing: border-box;
            position: relative;
            outline: var(---outline);
            outline-offset: var(--outline-offset);
            transition: var(--transition);
            padding: 0 var(--padding-right) 0 var(--padding-left);
            align-items: center;
            gap: var(--space);
        }
        .input-slot {
            flex: 0%;
        }
        .action-prefix {
            display: var(--prefix-display);
        }
        .action-suffix {
            display: var(--suffix-display);
        }
        .action-row {
            display: flex;
            box-sizing: border-box;
            min-width: var(--space);
            height: 100%;
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        ::slotted([slot="input"]) {
            width: 100%;
            height: 100%;
            padding: 0px;
            border: 0px;
            outline: none;
            background: transparent;
            font-size: unset;
            font-family: unset;
        }
        .inputs {
            display: flex;
            flex: 0%;
        }
        .dropdown {
            width: 100%;
            height: 1px;
            position: relative;
        }
        .dropdown-component {
            width: 100%;
        }
    `,
];

export const InputLayout = c(inputLayout);
