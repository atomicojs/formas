import { useProxySlot } from "@atomico/hooks/use-slot";
import { c, css, useRef } from "atomico";

import { GenericTokens } from "../components";

function card() {
    const ref = useRef();
    const slots = useProxySlot<Element>(
        ref,
        (element) => element instanceof Element
    );
    return (
        <host shadowDom>
            <div class="header">
                <slot name="header"></slot>
            </div>
            <slot ref={ref}></slot>
            <div class="content">
                {slots.map((element, i) => (
                    <div
                        class={
                            element instanceof HTMLImageElement
                                ? "embed"
                                : "item"
                        }
                    >
                        <slot name={(element.slot = `slot-${i}`)}></slot>
                    </div>
                ))}
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </host>
    );
}

card.props = {};

card.styles = [
    GenericTokens,
    css`
        :host {
            background: rgba(0, 0, 0, 0.25);
            display: block;
            border-radius: var(--radius-card);
        }
        .content {
            display: grid;
        }
        .embed {
            width: 100%;
        }
        .item {
            padding: 10px 20px;
            box-sizing: border-box;
        }
        ::slotted(img) {
            width: 100%;
            display: block;
        }
    `,
];

export const Card = c(card);
