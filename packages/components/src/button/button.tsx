import {
    Type,
    Props,
    DOMListener,
    c,
    css,
    useRef,
    useProp,
    useHost,
} from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import { useRender } from "@atomico/hooks/use-render";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { InputGenericProps } from "../props";
import { GenericTokens, GenericStateTokens } from "../tokens/tokens";
import { ButtonActive } from "./button-active";

function button({ name, href, value, type }: Props<typeof button>) {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const refContent = useRef();
    const refButtonLightDom = useRef();
    const refButtonShadowDom = useHost();
    const refButtonActive = useRef<typeof ButtonActive>();

    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);
    const slotContent = useSlot(refContent, (el) =>
        el instanceof Text ? !!el.textContent?.trim() : true
    );

    const disabled = useDisabled();

    const [focused, setFocused] = useProp<boolean>("focused");

    useRender(
        () =>
            href ? (
                <a
                    slot="button"
                    tabindex="-1"
                    href={href}
                    ref={refButtonLightDom}
                ></a>
            ) : (
                <button
                    type={type || "submit"}
                    name={name}
                    value={value}
                    ref={refButtonLightDom}
                    slot="button"
                    tabindex="-1"
                    disabled={disabled}
                ></button>
            ),
        [type, name, value, href]
    );

    useReflectEvent(refButtonShadowDom, refButtonLightDom, "click");

    return (
        <host
            shadowDom
            onlyIconPrefix={!slotContent.length && !slotSuffix.length}
            onclick={(event) => {
                if (refButtonActive.current?.setEvent) {
                    refButtonActive.current.setEvent(event);
                }
            }}
        >
            <button
                class="button"
                onfocus={() => setFocused(true)}
                onblur={() => setFocused(false)}
            >
                <div class="background">
                    <slot name="background">
                        <ButtonActive
                            ref={refButtonActive}
                            class="button-fx"
                        ></ButtonActive>
                    </slot>
                </div>
                <div class="row">
                    <div class="action action-prefix">
                        <div
                            class={`icon icon-prefix ${
                                slotPrefix.length ? "" : "hide"
                            }`}
                        >
                            <slot ref={refPrefix} name="icon-prefix"></slot>
                        </div>
                    </div>
                    <div class="content">
                        <slot ref={refContent} />
                    </div>
                    <div class="action action-suffix">
                        <div
                            class={`icon icon-suffix ${
                                slotSuffix.length ? "" : "hide"
                            }`}
                        >
                            <slot ref={refSuffix} name="icon-suffix"></slot>
                        </div>
                    </div>
                </div>
            </button>
        </host>
    );
}

button.props = {
    ...InputGenericProps,
    onlyIconPrefix: { type: Boolean, reflect: true },
    ghost: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    type: {
        type: String as Type<"submit" | "button" | "reset">,
        reflect: true,
        value: "submit",
    },
    href: { type: String, reflect: true },
    circle: { type: Boolean, reflect: true },
};

button.styles = [
    GenericTokens,
    GenericStateTokens,
    css`
        @tokens "../tokens/tokens.yaml" (import: button);
        :host {
            --size-icon: calc(var(--size-height) - (var(--border-width) * 2));
            --radius: var(--radius-rounded);
            --background: var(--color-background);

            display: inline-block;
            height: var(--size-height);
            white-space: nowrap;
        }

        :host([focused]) {
        }

        :host([only-icon-prefix]) .action-suffix {
            display: none;
        }

        :host([circle]) {
            --radius: var(--radius-circle);
        }

        :host([ghost]) {
            --background: transparent;
            --border-width: 0px;
        }

        .button {
            position: relative;
            padding: 0px;
            width: 100%;
            height: var(--size-height);
            min-width: var(--size-height);
            outline: none;
            border: var(--border-width) var(--border-style) var(--color-border);
            border-radius: var(--radius);
            font-family: unset;
            font-size: unset;
            overflow: hidden;
            cursor: pointer;
            background: var(--background);
        }

        .content {
            flex: 0%;
        }

        .action {
            box-sizing: border-box;
            min-width: var(--space-around);
            height: 100%;
        }

        .row {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            height: 100%;
        }

        .background {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--size-icon);
            height: var(--size-icon);
        }
        .hide {
            display: none;
        }
    `,
];

export const Button = c(button);
