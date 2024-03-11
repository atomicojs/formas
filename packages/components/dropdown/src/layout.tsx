import { computePosition, flip, shift } from "@floating-ui/dom";
import { Container } from "@formas/container";
import { CardTokens, PrimitiveTokens } from "@formas/tokens";
import { Props, c, css, useEffect, useRef, useState } from "atomico";

export const DropdownLayout = c(
    ({ show, reference }) => {
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
                    <Container class="dropdown-card" small shadow={1}>
                        <slot></slot>
                    </Container>
                </div>
                <style>{style && `:host{${style}}`}</style>
            </host>
        );
    },
    {
        props: {
            show: {
                type: Boolean,
                reflect: true,
            },
            reference: Element,
        },
        styles: [
            PrimitiveTokens,
            CardTokens,
            css`
                :host {
                    display: inline-block;
                    position: relative;
                    ---visibility: hidden;
                    --transform-from: none;
                    --transform-to: none;
                    --transform: var(--transform-from);
                    ---opacity: 0;
                }

                :host([show]) {
                    ---visibility: visible;
                    --transform: var(--transform-to);
                    ---opacity: 1;
                }

                .dropdown {
                    min-width: var(--min-width, 100%);
                    position: absolute;
                    top: var(--top);
                    left: var(--left);
                    padding: var(--space) 0;
                    visibility: var(---visibility);
                    opacity: var(---opacity);
                    transform: var(--transform);
                    box-sizing: border-box;
                    transition: var(--transition);
                }
            `,
        ],
    }
);
