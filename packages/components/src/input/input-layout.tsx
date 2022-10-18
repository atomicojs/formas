import {
    Props,
    c,
    css,
    useRef,
    useProp,
    useHost,
    Host,
    useEvent,
} from "atomico";
import { useListener } from "@atomico/hooks/use-listener";
import { DropdownLayout } from "../dropdown/dropdown-layout";

type CLickIn =
    | "input"
    | "prefix"
    | "suffix"
    | "icon-prefix"
    | "icon-suffix"
    | "action"
    | "dropdown";

function inputLayout({
    enableIconPrefix,
    enableIconSuffix,
}: Props<typeof inputLayout>): Host<{
    toggleDropdown(): void;
    onClickIn: CustomEvent<CLickIn>;
}> {
    const refWindow = useRef(window);
    const refHost = useHost();

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
            <div class="input">
                <div class="action" onclick={() => dispatch("action")}>
                    <div class="action-row">
                        <div
                            onclick={() => dispatch("icon-prefix")}
                            class={`icon icon-prefix ${
                                enableIconPrefix ? "" : "hide"
                            }`}
                        >
                            <slot name="icon-prefix"></slot>
                        </div>
                        <slot name="prefix"></slot>
                    </div>
                </div>
                <div
                    class="inputs"
                    onclick={() => {
                        dispatch("input");
                    }}
                >
                    <slot name="input"></slot>
                </div>
                <div class="action" onclick={() => dispatch("action")}>
                    <div class="action-row">
                        <slot name="suffix"></slot>
                        <div
                            onclick={() => dispatch("icon-suffix")}
                            class={`icon icon-suffix ${
                                enableIconSuffix ? "" : "hide"
                            }`}
                        >
                            <slot name="icon-suffix"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown" onclick={() => dispatch("dropdown")}>
                <DropdownLayout show={showDropdown} reference={refHost.current}>
                    <slot name="dropdown"></slot>
                </DropdownLayout>
            </div>
        </host>
    );
}

inputLayout.props = {
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    focused: { type: Boolean, reflect: true },
    showDropdown: Boolean,
    enableDropdown: Boolean,
    enableIconPrefix: Boolean,
    enableIconSuffix: Boolean,
};

inputLayout.styles = [
    css`
        @tokens "../theme/theme.yaml" (import: generic);
    `,
    css`
        @tokens "../theme/theme.yaml" (import: input);
        :host {
            font-size: var(--font-size);
        }
        :host([focused]) {
            --outline: var(--border-focus-width) var(--border-focus-style)
                var(--border-focus-color);
        }
        :host([disabled]) {
            pointer-events: none;
            opacity: var(--opacity-disabled);
        }
        .input {
            display: flex;
            background: var(--color-input-60);
            border-radius: var(--border-input-radius);

            height: var(--size-height);
            box-sizing: border-box;
            position: relative;
        }
        .action-row {
            padding: var(--padding-action-y);
            box-sizing: border-box;
            min-width: var(--space-around);
            height: 100%;
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--size-height);
            height: var(--size-height);
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
        .hide {
            display: none;
        }
        .inputs {
            display: flex;
            flex: 0%;
        }
    `,
];

export const InputLayout = c(inputLayout);
