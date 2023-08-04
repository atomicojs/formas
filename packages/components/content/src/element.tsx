import { useProxySlot } from "@atomico/hooks/use-slot";
import { c, css, useRef } from "atomico";
import { PrimitiveTokens } from "@formas/tokens";

function content() {
    const ref = useRef();
    const slots = useProxySlot<HTMLElement>(ref, (el) => el instanceof Element);
    return (
        <host shadowDom>
            <slot ref={ref} />
            <div class="content">
                {slots
                    .reduce<string[]>((children, element) => {
                        const last = children.at(-1) || "";
                        if (
                            element instanceof HTMLHeadingElement ||
                            element instanceof HTMLSpanElement
                        ) {
                            if (last.includes("title-")) {
                                element.slot = last;
                            } else {
                                const name = "title-" + children.length;
                                element.slot = name;
                                children.push(name);
                            }
                        } else {
                            const name =
                                (element instanceof HTMLImageElement
                                    ? "image-"
                                    : "unknown-") + children.length;
                            element.slot = name;
                            children.push(name);
                        }
                        return children;
                    }, [])
                    .map((name) => (
                        <div class={name}>
                            <slot name={name}></slot>
                        </div>
                    ))}
            </div>
        </host>
    );
}

content.props = {
    small: { type: Boolean, reflect: true },
};

content.styles = [
    PrimitiveTokens,
    css`
        .content {
            display: grid;
            gap: calc(var(--font-line) * var(--font-size));
        }
        ::slotted(h1),
        ::slotted(h2),
        ::slotted(h3),
        ::slotted(h4),
        ::slotted(h5) {
            line-height: unset;
            font-weight: var(--font-bold);
        }
        ::slotted(h1) {
            font-size: var(--font-size-1);
        }
        ::slotted(h2) {
            font-size: var(--font-size-2);
        }
        ::slotted(h3) {
            font-size: var(--font-size-3);
        }
        ::slotted(h4) {
            font-size: var(--font-size-4);
        }
        ::slotted(h5) {
            font-size: var(--font-size-5);
        }
        ::slotted(p) {
            font-size: var(--font-size-text);
        }
        ::slotted(*) {
            margin: 0px;
        }
    `,
];

export const Content = c(content);
