import { useSlot } from "@atomico/hooks/use-slot";
import { c, css, useRef } from "atomico";
import { PrimitiveTokens } from "@formas/tokens";

interface SlotAction extends HTMLElement {
    click(): void;
}

function label() {
    const refAction = useRef();
    const [slotAction] = useSlot<SlotAction>(refAction);

    return (
        <host shadowDom>
            <div class="content" onclick={() => slotAction?.click()}>
                <slot></slot>
            </div>
            <div class="action">
                <slot name="action" ref={refAction}></slot>
            </div>
        </host>
    );
}

label.props = {
    vertical: {
        type: Boolean,
        reflect: true,
    },
    reverse: {
        type: Boolean,
        reflect: true,
    },
    gap: {
        type: Boolean,
        reflect: true,
    },
};

label.styles = [
    PrimitiveTokens,
    css`
        :host {
            display: flex;
            align-items: center;

            gap: var(--gap);
        }
        :host([gap]) {
            --gap: var(--space-between);
        }
        .content {
            flex: 0%;
            cursor: pointer;
        }

        :host([vertical][gap]) {
            flex-flow: column;
            --gap: calc(var(--space-between) / 2);
        }
        :host([reverse]) {
            flex-flow: row-reverse;
        }
        :host([vertical][reverse]) {
            flex-flow: column-reverse;
        }
    `,
];

export const Label = c(label);
