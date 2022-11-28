import { c, css } from "atomico";
import { NavigationTokens, GenericTokens } from "../components";

function navigationMinimal() {
    return (
        <host shadowDom>
            <header class="header">
                <slot name="header"></slot>
            </header>
            <div class="content">
                <slot></slot>
            </div>
            <footer class="footer">
                <slot name="footer"></slot>
            </footer>
        </host>
    );
}

navigationMinimal.styles = [
    GenericTokens,
    NavigationTokens,
    css`
        :host {
            width: auto;
            height: 100%;
            background: var(--color-fill);
            display: grid;
            grid-template:
                "header" auto
                "content" 1fr
                "footer" auto / 1fr;
            align-content: start;
        }
        .header {
            grid-area: header;
            min-height: var(--size-height);
        }
        .content {
            display: grid;
            grid-area: content;
            align-content: start;
            padding: var(--space-safe);
            gap: calc(var(--space-safe) / 2);
        }
        .footer {
            grid-area: footer;
            min-height: var(--size-height);
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
        }
    `,
];

export const NavigationMinimal = c(navigationMinimal);