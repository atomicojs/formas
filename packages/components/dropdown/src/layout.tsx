import { computePosition, flip, shift } from "@floating-ui/dom";
import { c, css, Props, useEffect, useRef, useState } from "atomico";
import { PrimitiveTokens, DropdownTokens } from "@formas/tokens";

function dropdownLayout({ show, reference }: Props<typeof dropdownLayout>) {
    const [style, setStyle] = useState<string>();
    const ref = useRef();

    useEffect(() => {
        if (!reference) return;
        computePosition(reference as Element, ref.current, {
            middleware: [
                flip({
                    fallbackPlacements: ["top", "bottom"],
                }),
                shift(),
            ],
        }).then(({ x, y }) => {
            setStyle(`--left: ${x}px; --top:${y}px`);
        });
    }, [show, parent]);

    return (
        <host shadowDom>
            <div class="dropdown" ref={ref}>
                <div class="dropdown-card">
                    <slot></slot>
                </div>
            </div>
            <style>{style && `:host{${style}}`}</style>
        </host>
    );
}

dropdownLayout.props = {
    show: {
        type: Boolean,
        reflect: true,
    },
    reference: Element,
};

dropdownLayout.styles = [
    PrimitiveTokens,
    DropdownTokens,
    css`
        :host {
            display: inline-block;
            position: relative;
            --visibility: hidden;
            --transform-from: none;
            --transform-to: none;
            --transform: var(--transform-from);
            --transition: 0.25s ease all;
            --opacity: 0;
            --background: var(--color-fill);
        }

        :host([show]) {
            --visibility: visible;
            --transform: var(--transform-to);
            --opacity: 1;
        }

        .dropdown {
            min-width: 100%;
            position: absolute;
            top: var(--top);
            left: var(--left);
            padding: 0.25rem 0px;
            visibility: var(--visibility);
            opacity: var(--opacity);
            transform: var(--transform);
            box-sizing: border-box;
            transition: var(--transition);
        }

        .dropdown-card {
            background: var(--background);
            border-radius: var(--radius);
            border: var(--border-width) var(--border-style) var(--color-border);
            display: grid;
        }
    `,
];

export const DropdownLayout = c(dropdownLayout);
