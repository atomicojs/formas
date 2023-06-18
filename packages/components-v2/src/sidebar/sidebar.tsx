import { useSlot } from "@atomico/hooks/use-slot";
import { c, css, Props, useEffect, useRef } from "atomico";
import { Button } from "../button/button";
import { GenericTokens, NavigationTokens } from "../components";

function siderbar({ onlyIcons }: Props<typeof siderbar>) {
    const refSlot = useRef();
    const slots = useSlot<typeof Button>(
        refSlot,
        (element) => element instanceof Button
    );

    useEffect(() => {
        slots.forEach((slot) => (slot.onlyIcon = onlyIcons));
    }, [onlyIcons, slots]);

    return (
        <host shadowDom>
            <header class="header">
                <slot name="header"></slot>
            </header>
            <div class="content">
                <slot ref={refSlot}></slot>
            </div>
            <footer class="footer">
                <slot name="footer"></slot>
            </footer>
        </host>
    );
}

siderbar.props = {
    onlyIcons: { type: Boolean, reflect: true },
};

siderbar.styles = [
    GenericTokens,
    NavigationTokens,
    css`
        :host {
            width: 100%;
            height: 100%;
            background: var(--color-fill);
            display: grid;
            grid-template:
                "header" auto
                "content" 1fr
                "footer" auto / 1fr;
            align-content: start;
            --display: block;
            transition: 0.5s ease all;
        }
        :host([only-icons]) {
            --display: none;
        }
        .header {
            grid-area: header;
            min-height: var(--size-height);
        }
        .content {
            display: grid;
            grid-area: content;
            align-content: start;
            gap: calc(var(--space-safe) / 2);
        }
        .footer {
            grid-area: footer;
            min-height: var(--size-height);
            display: var(--display);
        }
        .header,
        .content,
        .footer {
            padding: var(--space-safe);
            box-sizing: border-box;
        }
        ::slotted(hr) {
            width: calc(100% - var(--space-around) * 2);
            height: 1px;
            margin: var(--space-between) auto;
            background: var(--color-divide);
            border: none;
        }
        ::slotted(h1),
        ::slotted(h2),
        ::slotted(h3),
        ::slotted(h4),
        ::slotted(h5),
        ::slotted(h6) {
            padding: 0px;
            margin: 0px;
            display: flex;
            align-items: center;
            padding: 0px var(--space-around);
            display: var(--display);
        }
    `,
];

export const Siderbar = c(siderbar);
