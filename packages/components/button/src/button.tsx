import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { InputGenericProps } from "@formas/props";
import { ActionTokens, ButtonTokens, PrimitiveTokens } from "@formas/tokens";
import { c, css, Props, Type, useHost, useProp, useRef } from "atomico";
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
                class="container"
                onfocus={() => !badge && setFocused(true)}
                onblur={() => !badge && setFocused(false)}
                tabIndex={badge ? -1 : null}
                ref={(node) => {}}
            >
                <div class="background">
                    <slot name="background">
                        <ButtonActive
                            ref={refButtonActive}
                            class="effect"
                        ></ButtonActive>
                    </slot>
                </div>
                <div class="row">
                    <div class="action prefix">
                        <div class={`icon ${slotPrefix.length ? "" : "hide"}`}>
                            <slot ref={refPrefix} name="prefix" />
                        </div>
                    </div>
                    <div class={`content ${slotContent.length ? "" : "hide"}`}>
                        <slot ref={refContent} />
                    </div>
                    <div class="action suffix">
                        <div class={`icon ${slotSuffix.length ? "" : "hide"}`}>
                            <slot ref={refSuffix} name="suffix" />
                        </div>
                        <div class={`badge ${slotBadge.length ? "" : "hide"}`}>
                            <slot ref={refBadge} name="badge" />
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
    type: {
        type: String as Type<"submit" | "button" | "reset">,
        reflect: true,
        value: "submit" as "submit" | "button" | "reset",
    },
    href: { type: String, reflect: true },
    circle: { type: Boolean, reflect: true },
    outline: { type: Boolean, reflect: true },
    badge: { type: Boolean, reflect: true },
    color: { type: String, reflect: true },
};

button.styles = [
    PrimitiveTokens,
    ActionTokens,
    ButtonTokens,
    css`
        :host {
            display: inline-block;
            white-space: nowrap;
            line-height: 0;
            ---border: none;
            ---color: var(--color);
            ---outline: none;
            ---radius: var(--radius);
        }
        :host([outline]) {
            ---border: var(--border);
            ---color: transparent;
        }
        :host([focused]) {
            ---outline: var(--outline);
        }
        :host([circle]) {
            ---radius: var(--radius-circle);
        }
        .container {
            all: unset;
            position: relative;
            height: var(--size);
            min-width: var(--size);
            cursor: pointer;
            border: var(---border);
            border-radius: var(---radius);
            background: var(---color);
            outline: var(---outline);
            outline-offset: var(--outline-offset);
            transition: var(--transition);
            box-sizing: border-box;
        }
        .content {
            flex: 0%;
            display: flex;
            gap: var(--space);
            align-items: center;
            transition: var(--transition);
            padding: 0 var(--space);
        }
        .action {
            box-sizing: border-box;
            min-width: var(--space-around);
            height: 100%;
        }
        .row {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            padding: 0 var(--space);
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
        .background {
            --color-active: var(--color-contrast-15);
            border-radius: var(---radius);
            overflow: hidden;
        }
    `,
];

export const Button = c(button);
