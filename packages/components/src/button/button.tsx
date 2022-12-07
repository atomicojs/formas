import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { c, css, Props, Type, useHost, useProp, useRef } from "atomico";
import { InputGenericProps } from "../props";
import { GenericStateTokens, GenericTokens } from "../tokens/tokens";
import { ButtonActive } from "./button-active";

function button({
    name,
    href,
    value,
    type,
    badge,
    color,
    outline,
}: Props<typeof button>) {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const refContent = useRef();
    const refBadge = useRef();
    const refButtonLightDom = useRef();
    const refButtonShadowDom = useHost();
    const refButtonActive = useRef<typeof ButtonActive>();

    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);
    const slotBadge = useSlot(refBadge);

    const slotContent = useSlot(refContent, (el) =>
        el instanceof Text ? !!el.textContent?.trim() : true
    );

    const disabled = useDisabled();

    const [, setFocused] = useProp<boolean>("focused");

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
            onlyIcon={!slotContent.length && !slotSuffix.length}
            onclick={(event) => {
                if (refButtonActive.current?.setEvent) {
                    refButtonActive.current.setEvent(event);
                }
            }}
            color={color ? color : outline ? "primary" : null}
        >
            <button
                class="button"
                onfocus={() => !badge && setFocused(true)}
                onblur={() => !badge && setFocused(false)}
                tabIndex={badge ? -1 : null}
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
                    <div class="only-icon content">
                        <slot ref={refContent} />
                    </div>
                    <div class="only-icon action action-suffix">
                        <div
                            class={`icon icon-suffix ${
                                slotSuffix.length ? "" : "hide"
                            }`}
                        >
                            <slot ref={refSuffix} name="icon-suffix"></slot>
                        </div>
                        <div class={`badge ${slotBadge.length ? "" : "hide"}`}>
                            <slot ref={refBadge} name="badge"></slot>
                        </div>
                    </div>
                </div>
            </button>
        </host>
    );
}

button.props = {
    ...InputGenericProps,
    onlyIcon: { type: Boolean, reflect: true },
    ghost: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    type: {
        type: String as Type<"submit" | "button" | "reset">,
        reflect: true,
        value: "submit",
    },
    href: { type: String, reflect: true },
    circle: { type: Boolean, reflect: true },
    outline: { type: Boolean, reflect: true },
    badge: { type: Boolean, reflect: true },
    color: { type: String, reflect: true },
};

button.styles = [
    GenericTokens,
    GenericStateTokens,
    css`
        @tokens "../tokens/tokens.yaml" (import: button);
        :host {
            --size-icon: calc(var(--size-height) - (var(--border-width) * 2));
            --background: var(--color-fill);
            --size-width: 100%;
            --opacity-content: 1;
            --transition-content: 0.25s ease all 0.1s;
            display: inline-block;
            height: var(--size-height);
            white-space: nowrap;
            color: var(--color-text);
            font-weight: var(--font-bold);
        }
        .only-icon {
            transition: 0.3s ease all;
        }
        :host([only-icon]) {
            --size-width: var(--size-height);
            --opacity-content: 0;
            --transition-content: 0.1s ease all 0s;
        }
        :host([circle]) {
            --radius: var(--radius-circle);
        }
        :host([ghost]) {
            --background: transparent;
            --border-width: 0px;
        }
        :host([outline]) {
            --background: transparent;
            --color-text: var(--color-fill);
        }
        :host([outline]) .button-fx,
        :host([ghost]) .button-fx {
            --background: var(--color-active);
        }
        .button-fx {
            border-radius: var(--radius);
        }
        .button {
            position: relative;
            padding: 0px;
            width: var(--size-width);
            height: var(--size-height);
            min-width: var(--size-height);
            outline: var(--outline);
            border: var(--border-width) var(--border-style) var(--color-active);
            border-radius: var(--radius);
            font-family: unset;
            font-size: unset;
            cursor: pointer;
            background: var(--background);
            transition: var(--transition-action);
            color: unset;
            font-weight: unset;
        }
        .content {
            flex: 0%;
            display: flex;
            align-items: center;
            opacity: var(--opacity-content);
            transition: var(--transition-content);
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
        .badge {
            height: 100%;
            padding: var(--space-safe);
            display: flex;
            align-items: center;
            box-sizing: border-box;
        }
        .hide {
            display: none;
        }
        :host([only-icon]) .badge {
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 0px;
            height: auto;
        }
    `,
];

export const Button = c(button);
