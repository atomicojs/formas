import { c, css, Props, Type } from "atomico";
import { GenericTokens } from "../components";

function avatar({ status, statusPosition }: Props<typeof avatar>) {
    return (
        <host shadowDom>
            <svg width="100%" height="100%" viewBox="0 0 40 40" class="mask">
                <mask id="mask">
                    <path
                        d="M40,28.708L40,0L0,0L0,40L28.708,40C27.048,38.534 26,36.389 26,34L26,34C26,29.582 29.582,26 34,26L34,26C36.389,26 38.534,27.048 40,28.708Z"
                        fill="white"
                        transform={`rotate(${
                            statusPosition === "top left"
                                ? "180"
                                : statusPosition === "top right"
                                ? "270"
                                : statusPosition === "bottom left"
                                ? "90"
                                : "0"
                        } 20 20)`}
                    />
                </mask>
                <foreignObject
                    width="40"
                    height="40"
                    mask={status ? "url(#mask)" : ""}
                >
                    <slot></slot>
                </foreignObject>
            </svg>
            {status && (
                <div class="status">
                    <slot name="status"></slot>
                </div>
            )}
        </host>
    );
}

avatar.props = {
    circle: {
        type: Boolean,
        reflect: true,
    },
    small: {
        type: Boolean,
        reflect: true,
    },
    status: {
        type: String as Type<"info" | "success" | "warning" | "danger">,
        reflect: true,
    },
    statusPosition: {
        type: String,
        reflect: true,
        value: (): "top left" | "top right" | "bottom left" | "bottom right" =>
            "bottom right",
    },
};

avatar.styles = [
    GenericTokens,
    css`
        :host {
            --size: var(--size-height);
            width: var(--size);
            height: var(--size);
            display: inline-block;
            position: relative;
            --color: var(--color-success);
        }
        :host([circle]) {
            --radius: var(--radius-circle);
        }
        :host([status="info"]) {
            --color: var(--color-info);
        }
        :host([status="warning"]) {
            --color: var(--color-warning);
        }
        :host([status="danger"]) {
            --color: var(--color-danger);
        }
        ::slotted(*) {
            width: 100%;
            height: 100%;
            display: block;
        }
        .mask {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: var(--radius);
        }
        .status {
            width: 30%;
            height: 30%;
            position: absolute;
            background: var(--color);
            border-radius: 100%;
        }

        :host([status-position="bottom right"]) .status {
            bottom: 0px;
            right: 0px;
        }

        :host([status-position="bottom left"]) .status {
            bottom: 0px;
            left: 0px;
        }

        :host([status-position="top left"]) .status {
            top: 0px;
            left: 0px;
        }
        :host([status-position="top right"]) .status {
            top: 0px;
            right: 0px;
        }
    `,
];

export const Avatar = c(avatar);