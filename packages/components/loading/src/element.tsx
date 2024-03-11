import { c, css } from "atomico";
import { PrimitiveTokens } from "@formas/tokens";

export const Loading = c(
    () => (
        <host shadowDom>
            <svg width="100%" height="100%" viewBox="0 0 20 20">
                <mask id="mask">
                    <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="white"
                        stroke-width="3"
                        fill="transparent"
                    />
                </mask>
                <foreignObject width="20" height="20" mask="url(#mask)">
                    <div class="gradient"></div>
                </foreignObject>
                <circle cx="10" cy="2" r="2" fill="black" />
            </svg>
        </host>
    ),
    {
        props: {
            small: { type: Boolean, reflect: true },
        },
        styles: [
            PrimitiveTokens,
            css`
                :host {
                    width: 1em;
                    height: 1em;
                    display: inline-block;
                }
                .gradient {
                    width: 100%;
                    height: 100%;
                    background: conic-gradient(
                        transparent 0deg,
                        var(--color-contrast-100) 360deg
                    );
                }
                svg {
                    animation: rotate 1s infinite linear;
                    border-radius: 100%;
                    overflow: hidden;
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `,
        ],
    }
);
