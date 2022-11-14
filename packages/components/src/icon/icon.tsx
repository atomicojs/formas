import { Props, c, css, JSX } from "atomico";
import { GenericTokens } from "../components";
import { Icons, IconsKeys } from "./icons";

function icon({ type, size, icons, color }: Props<typeof icon>) {
    const Element = icons[type] as JSX;

    return (
        <host shadowDom>
            <Element cloneNode></Element>
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
    },
    color: {
        type: String,
        reflect: true,
    },
    icons: {
        type: Object,
        value: Icons,
    },
};

icon.styles = [
    GenericTokens,
    css`
        :host {
            width: var(--width, var(--size-icon));
            color: var(--color, currentColor);
            display: inline-flex;
            align-items: center;
            justify-items: center;
        }
        svg {
            width: 100%;
            margin: auto;
        }
        path {
            fill: currentColor;
        }
    `,
];

export const Icon = c(icon);
