import { Props, c, css, JSX } from "atomico";
import { Icons, IconsKeys } from "./icons";

function icon({ type, size, icons, color }: Props<typeof icon>) {
    const Element = icons[type] as JSX;

    return (
        <host shadowDom>
            <Element></Element>
            <style>
                {size && `:host{--width: ${size};}`}
                {color && `:host{--color: ${color};}`}
            </style>
        </host>
    );
}

icon.props = {
    type: {
        type: String,
        reflect: true,
        value: (): IconsKeys => "formilk",
    },
    size: {
        type: String,
        reflect: true,
        value: "1em",
    },
    color: {
        type: String,
        reflect: true,
        value: "currentColor",
    },
    icons: {
        type: Object,
        value: Icons,
    },
};

icon.styles = css`
    :host {
        width: var(--width);
        color: var(--color);
        display: inline-flex;
        align-items: center;
        justify-items: center;
    }
    svg {
        width: 100%;
        margin: auto;
    }
    path {
        fill: var(--color-status, var(--color-current-contrast, currentColor));
    }
    :host([define]) {
        display: none;
    }
`;

export const Icon = c(icon);
