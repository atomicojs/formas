import { useListener } from "@atomico/hooks/use-listener";
import { DropdownLayout } from "@atomico/ui-dropdown/layout";
import {
    GenericStateTokens,
    GenericTokens,
    InputTokens,
} from "@atomico/ui-tokens";
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
    small: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    focused: { type: Boolean, reflect: true },
    showDropdown: Boolean,
    enableDropdown: Boolean,
    enableIconPrefix: Boolean,
    enableIconSuffix: Boolean,
};

inputLayout.styles = [
    GenericTokens,
    GenericStateTokens,
    InputTokens,
    css`
        :host {
            --background: var(--color-fill);
            --size-icon-box: calc(
                var(--size-height) - (var(--border-width) * 2)
            );
        }

        :host([disabled]) {
            pointer-events: none;
            opacity: var(--state-disabled-opacity);
        }
        .input {
            display: flex;
            background: var(--background);
            border-radius: var(--radius);
            border: var(--border-width) var(--border-style) var(--color-neutral);
            height: var(--size-height);
            box-sizing: border-box;
            position: relative;
            outline: var(--outline);
        }
        .action-row {
            box-sizing: border-box;
            min-width: var(--space-around);
            height: 100%;
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--size-icon-box);
            height: var(--size-icon-box);
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
