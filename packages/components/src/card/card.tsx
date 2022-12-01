import { useSlot, useProxySlot } from "@atomico/hooks/use-slot";
import { c, css, useRef } from "atomico";
import { GenericTokens } from "../components";

function card() {
    const ref = useRef();
    const refHeader = useRef();
    const refFooter = useRef();
    const slotsHeader = useSlot(refHeader);
    const slotsFooter = useSlot(refFooter);
    const slots = useProxySlot<Element>(
        ref,
        (element) => element instanceof Element
    );
    return (
        <host shadowDom>
            <div class={`header ${slotsHeader.length ? "" : "hide"}`}>
                <slot ref={refHeader} name="header"></slot>
            </div>
            <slot ref={ref}></slot>
            <div class="content">
                {slots.map((element, i) => (
                    <div
                        class={
                            element instanceof HTMLImageElement ||
                            element instanceof HTMLVideoElement ||
                            element instanceof HTMLIFrameElement
                                ? "embed"
                                : "item"
                        }
                    >
                        <slot name={(element.slot = `slot-${i}`)}></slot>
                    </div>
                ))}
            </div>
            <div class={`footer ${slotsFooter.length ? "" : "hide"}`}>
                <slot ref={refFooter} name="footer"></slot>
            </div>
        </host>
    );
}

card.props = {};

card.styles = [
    GenericTokens,
    css`
        :host {
            background: #fff;
            display: block;
            border-radius: var(--radius-card);
            --space-x: calc(var(--space-around) * var(--font-line));
            --space-gap: calc(var(--space-around) * (var(--font-line) / 2));
        }
        .content {
            display: grid;
        }
        .embed {
            width: 100%;
        }
        .item {
            padding: var(--space-gap) var(--space-x);
            box-sizing: border-box;
        }
        .header,
        .footer {
            display: flex;
            gap: var(--space-gap);
        }
        .header {
            padding: var(--space-around) var(--space-x) var(--space-gap);
            justify-content: space-between;
            align-items: center;
        }
        .footer {
            padding: 0 var(--space-x) var(--space-x);
        }
        .hide {
            display: none;
        }
        ::slotted(img),
        ::slotted(iframe),
        ::slotted(video) {
            width: 100%;
            display: block;
        }
        .content > *:last-child {
            padding-bottom: var(--space-x);
        }
        .header.hide ~ .content > .embed:first-child {
            border-radius: var(--radius-card) var(--radius-card) 0 0;
            overflow: hidden;
        }
        .embed + .item {
            padding-top: var(--space-x);
        }
    `,
];

export const Card = c(card);
