import { Props, c, css, useRef } from "atomico";
import { serialize } from "atomico/utils";
import { PrimitiveTokens, BadgeTokens } from "@formas/tokens";
import { useSlot } from "@atomico/hooks/use-slot";

function badge({ action, color }: Props<typeof badge>) {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);

    return (
        <host
            shadowDom
            layout={serialize(
                slotPrefix.length && "prefix",
                slotSuffix.length && "suffix"
            )}
        >
            <button class="badge" staticNode tabIndex={action ? null : -1}>
                <div className="icon prefix">
                    <slot name="prefix" ref={refPrefix}></slot>
                </div>
                <slot></slot>
                <div className="icon suffix">
                    <slot name="suffix" ref={refSuffix}></slot>
                </div>
            </button>
            {color && (
                <style>{`:host{---color: var(--color-${color}, var(--color-status-${color}-container) )}`}</style>
            )}
        </host>
    );
}

badge.props = {
    small: { type: Boolean, reflect: true },
    circle: { type: Boolean, reflect: true },
    action: { type: Boolean, reflect: true },
    color: { type: String, value: "primary" },
};

badge.styles = [
    PrimitiveTokens,
    BadgeTokens,
    css`
        :host {
            display: content;
            ---radius: var(--radius);
            ---space-left: var(--space);
            ---space-right: var(--space);
            ---space: 0 var(---space-right) 0 var(---space-left);
            ---display-prefix: none;
            ---display-suffix: none;
            ---pointer-event: none;
        }
        :host([action]) {
            ---pointer-event: all;
            ---cursor: pointer;
        }
        :host([circle]) {
            ---radius: var(--radius-circle);
        }
        :host([layout*="prefix"]) {
            ---space-left: var(--space-icon);
            ---display-prefix: grid;
        }
        :host([layout*="suffix"]) {
            ---space-right: var(--space-icon);
            ---display-suffix: grid;
        }
        .badge {
            height: var(--size);
            border: none;
            display: flex;
            align-items: center;
            gap: var(--space);
            padding: var(---space);
            box-sizing: border-box;
            border-radius: var(---radius);
            background: var(---color, var(--color));
            font-size: var(--font-size);
            color: var(--font-color);
            font-weight: var(--font-weight);
            pointer-events: var(---pointer-event);
            cursor: var(---cursor);
        }
        .icon {
            width: var(--size-icon-container);
            height: var(--size-icon-container);
            background: var(--color-container);
            place-content: center;
            border-radius: calc(var(---radius) - var(--space-icon));
        }
        .prefix {
            display: var(---display-prefix);
        }
        .suffix {
            display: var(---display-suffix);
        }
    `,
];

export const Badge = c(badge);

