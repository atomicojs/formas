import { c, useRef, css } from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import { GenericTokens } from "../components";

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
    layout: {
        type: String,
        reflect: true,
        value: (): "vertical" | "horizontal" => "horizontal",
    },
    reverse: {
        type: Boolean,
        reflect: true,
    },
};

label.styles = [
    GenericTokens,
    css`
        :host {
            display: flex;
            align-items: center;
            gap: var(--space-between);
        }
        .content {
            flex: 0%;
            cursor: pointer;
        }
        :host([layout="vertical"]) {
            flex-flow: column;
        }
        :host([reverse]) {
            flex-flow: row-reverse;
        }
        :host([layout="vertical"][reverse]) {
            flex-flow: column-reverse;
        }
    `,
];

export const Label = c(label);
