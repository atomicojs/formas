import { Props, c, css, useHost } from "atomico";
// import { useCheckbox } from "../hooks/use-checkbox";
import { useDisabled } from "@atomico/hooks/use-disabled";
import { useReflectEvent } from "@atomico/hooks/use-reflect-event";
import { InputGenericProps } from "../props";
import { GenericTokens } from "../tokens/tokens";
import { Icon } from "../icon/icon";
import { useCheckbox } from "../hooks/use-checkbox";

function checkbox({ tabIndex }: Props<typeof checkbox>) {
    const host = useHost();
    const refInput = useCheckbox("radio");
    const disabled = useDisabled();

    useReflectEvent(host, refInput, "click");

    return (
        <host shadowDom>
            <button
                class="checkbox"
                disabled={disabled}
                tabIndex={disabled ? -1 : tabIndex}
            >
                <div class="checkbox-box">
                    <div class="checkbox-state">
                        <Icon size="var(--size-icon)" type="check"></Icon>
                    </div>
                </div>
            </button>
        </host>
    );
}

checkbox.props = {
    ...InputGenericProps,
    value: {
        type: null,
        value: "on",
    },
    tabIndex: { type: Number },
    checked: { type: Boolean, reflect: true },
};

checkbox.styles = [
    GenericTokens,
    css`
        @tokens "../tokens/tokens.yaml" (import: checkbox);

        :host {
            --box-width: 0.6;
            --box-height: var(--box-width);
            --state-unit: 100%;
            --state-width: 1;
            --state-height: var(--state-width);
            --state-radius: 0px;
            --state-transform: none;
            --state-transition: 0.25s;
            --background: var(--color-background-off);
            --background-state: var(--color-state-off);
            --color: var(--color-content-off);
            --border-color: var(--color-border-off);
            --radius: var(--radius-rounded);
            color: var(--color);
            display: inline-block;
        }

        :host([checked]) {
            --background: var(--color-background-on);
            --background-state: var(--color-state-on);
            --border-color: var(--color-border-on);
            --color: var(--color-content-on);
        }

        .checkbox {
            width: var(--size-height);
            height: var(--size-height);
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
        }

        .checkbox-box {
            width: calc(100% * var(--box-width));
            height: calc(100% * var(--box-height));
            margin: auto;
            border-radius: var(--radius);
            border: var(--border-width) var(--border-style) var(--border-color);
            background: var(--background);
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
        }

        .checkbox-state {
            width: calc(var(--state-unit) * var(--state-width));
            height: calc(var(--state-unit) * var(--state-height));
            border-radius: var(--state-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--background-state);
            margin: auto;
            transform: var(--state-transform);
            transition: var(--state-transition);
        }
    `,
];

export const Checkbox = c(checkbox);
