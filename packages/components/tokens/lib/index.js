import { css } from "atomico";

const GenericTokens = css`
    :host {
        --font-size-1: var(--formas--generic-font-size-1, 2rem);
        --font-size-2: var(--formas--generic-font-size-2, 1.75rem);
        --font-size-3: var(--formas--generic-font-size-3, 1.25rem);
        --font-size-4: var(--formas--generic-font-size-4, 1.125rem);
        --font-size-5: var(--formas--generic-font-size-5, 1rem);
        --font-size: var(--formas--generic-font-size, 1rem);
        --font-size-text: var(--formas--generic-font-size-text, 0.875rem);
        --font-line: 1.25;
        --font-light: 300;
        --font-regular: 400;
        --font-bold: 700;
        --space-around: var(--formas--generic-space-around, 1rem);
        --space-between: var(--formas--generic-space-between, 1rem);
        --space-safe: var(--formas--generic-space-safe, 0.5rem);
        --size-icon: var(--formas--generic-size-icon, 0.85em);
        --size-height: var(--formas--generic-size-height, 2.5rem);
        --radius: var(--formas--generic-radius, 0.5rem);
        --radius-circle: var(--formas--generic-radius-circle, 5rem);
        --radius-card: var(--formas--generic-radius-card, 1rem);
        --color-fill: var(--formas--generic-color-fill, white);
        --color-neutral: var(
            --formas--generic-color-neutral,
            rgba(0, 0, 0, 0.25)
        );
        --color-divide: var(--formas--generic-color-divide, rgba(0, 0, 0, 0.1));
        --color-active: var(
            --formas--generic-color-active,
            rgba(0, 0, 0, 0.05)
        );
        --color-accent: var(--formas--generic-color-accent, black);
        --color-text: var(--formas--generic-color-text, currentColor);
        --color-border: var(
            --formas--generic-color-border,
            var(--color-neutral)
        );
        --color-border-on: var(
            --formas--generic-color-border-on,
            var(--color-accent)
        );
        --color-checkbox: var(
            --formas--generic-color-checkbox,
            var(--color-fill)
        );
        --color-checkbox-on: var(
            --formas--generic-color-checkbox-on,
            var(--color-fill)
        );
        --color-content: var(--formas--generic-color-content, transparent);
        --color-content-on: var(
            --formas--generic-color-content-on,
            var(--color-fill)
        );
        --color-state: var(--formas--generic-color-state, transparent);
        --color-state-on: var(
            --formas--generic-color-state-on,
            var(--color-accent)
        );
        --color-outline: var(--formas--generic-color-outline, transparent);
        --color-outline-on: var(
            --formas--generic-color-outline-on,
            rgba(0, 0, 0, 0.1)
        );
        --color-secondary: var(--formas--generic-color-secondary, #8395a7);
        --color-secondary-neutral: var(
            --formas--generic-color-secondary-neutral,
            rgba(131, 149, 167, 0.35)
        );
        --color-secondary-accent: var(
            --formas--generic-color-secondary-accent,
            #516c86
        );
        --color-info: var(--formas--generic-color-info, #54a0ff);
        --color-info-neutral: var(
            --formas--generic-color-info-neutral,
            rgba(84, 161, 255, 0.35)
        );
        --color-info-accent: var(--formas--generic-color-info-accent, #0071ff);
        --color-success: var(--formas--generic-color-success, #1dd1a1);
        --color-success-neutral: var(
            --formas--generic-color-success-neutral,
            rgba(29, 209, 161, 0.35)
        );
        --color-success-accent: var(
            --formas--generic-color-success-accent,
            #00b09b
        );
        --color-warning: var(--formas--generic-color-warning, #ff9f43);
        --color-warning-neutral: var(
            --formas--generic-color-warning-neutral,
            rgba(255, 159, 67, 0.35)
        );
        --color-warning-accent: var(
            --formas--generic-color-warning-accent,
            #db8300
        );
        --color-danger: var(--formas--generic-color-danger, #ff5547);
        --color-danger-neutral: var(
            --formas--generic-color-danger-neutral,
            rgba(255, 85, 71, 0.35)
        );
        --color-danger-accent: var(
            --formas--generic-color-danger-accent,
            #ec3912
        );
        --transition-action: var(
            --formas--generic-transition-action,
            0.25s ease all
        );
        --outline-width: var(--formas--generic-outline-width, 2px);
        --outline-style: var(--formas--generic-outline-style, solid);
    }
    :host([small]) {
        --font-size: var(--formas--small--generic-font-size, 0.85rem);
        --space-around: var(--formas--small--generic-space-around, 0.8rem);
        --space-between: var(--formas--small--generic-space-between, 0.8rem);
        --space-safe: var(--formas--small--generic-space-safe, 0.4rem);
        --size-height: var(--formas--small--generic-size-height, 2rem);
        --radius: var(--formas--small--generic-radius, 0.4rem);
    }
    :host([disabled]) {
        --opacity: 0.5;
    }
    :host([focused]) {
        --outline-width: var(--formas--focused--generic-outline-width, 2px);
        --outline-style: var(--formas--focused--generic-outline-style, solid);
    }
    :host {
        font-size: var(--font-size);
        line-height: var(--font-line);
        --outline-color: var(--color-outline);
        --outline: var(--outline-width) var(--outline-style)
            var(--outline-color);
    }
    :host([disabled]) {
        opacity: var(--opacity);
        pointer-events: none;
    }
    :host([focused]:not([disabled])) {
        --outline-color: var(--color-outline-on);
    }
`;
const GenericStateTokens = css``;
const NavigationTokens = css`
    :host {
        --space-safe: var(--formas--navigation-space-safe, 1rem);
        --color-fill: var(--formas--navigation-color-fill, #f3f6fc);
    }
`;
const ButtonTokens = css`
    :host {
        --border-width: var(--formas--button-border-width, 0px);
        --border-style: var(--formas--button-border-style, solid);
    }
    :host([badge]) {
        --font-size: var(--formas--badge--button-font-size, 0.625rem);
        --size-height: var(--formas--badge--button-size-height, 1.25rem);
        --space-around: var(--formas--badge--button-space-around, 0.25rem);
    }
    :host([badge][small]) {
        --size-height: var(--formas--badge--small--button-size-height, 1rem);
    }
    :host([color="primary"]) {
        --color-fill: var(--formas--color--primary--button-fill, #222f3e);
        --color-text: var(--formas--color--primary--button-text, white);
    }
    :host([color="primary"][outline]) {
        --color-active: var(
            --formas--color--primary--outline--button-active,
            var(--color-neutral)
        );
        --color-fill: var(
            --formas--color--primary--outline--button-fill,
            var(--color-accent)
        );
    }
    :host([color="primary"][ghost]) {
        --color-active: var(
            --formas--color--primary--ghost--button-active,
            var(--color-neutral)
        );
        --color-text: var(
            --formas--color--primary--ghost--button-text,
            var(--color-accent)
        );
    }
    :host([color="secondary"]) {
        --color-fill: var(--formas--color--secondary--button-fill, #8395a7);
        --color-text: var(--formas--color--secondary--button-text, white);
    }
    :host([color="secondary"][outline]) {
        --color-active: var(
            --formas--color--secondary--outline--button-active,
            var(--color-secondary-neutral)
        );
        --color-fill: var(
            --formas--color--secondary--outline--button-fill,
            var(--color-secondary-accent)
        );
    }
    :host([color="secondary"][ghost]) {
        --color-active: var(
            --formas--color--secondary--ghost--button-active,
            var(--color-secondary-neutral)
        );
        --color-text: var(
            --formas--color--secondary--ghost--button-text,
            var(--color-secondary-accent)
        );
    }
    :host([color="info"]) {
        --color-fill: var(
            --formas--color--info--button-fill,
            var(--color-info)
        );
        --color-text: var(--formas--color--info--button-text, white);
    }
    :host([color="info"][outline]) {
        --color-active: var(
            --formas--color--info--outline--button-active,
            var(--color-info-neutral)
        );
        --color-fill: var(
            --formas--color--info--outline--button-fill,
            var(--color-info-accent)
        );
    }
    :host([color="info"][ghost]) {
        --color-active: var(
            --formas--color--info--ghost--button-active,
            var(--color-info-neutral)
        );
        --color-text: var(
            --formas--color--info--ghost--button-text,
            var(--color-info-accent)
        );
    }
    :host([color="success"]) {
        --color-fill: var(
            --formas--color--success--button-fill,
            var(--color-success)
        );
        --color-text: var(--formas--color--success--button-text, white);
    }
    :host([color="success"][outline]) {
        --color-active: var(
            --formas--color--success--outline--button-active,
            var(--color-success-neutral)
        );
        --color-fill: var(
            --formas--color--success--outline--button-fill,
            var(--color-success-accent)
        );
    }
    :host([color="success"][ghost]) {
        --color-active: var(
            --formas--color--success--ghost--button-active,
            var(--color-success-neutral)
        );
        --color-text: var(
            --formas--color--success--ghost--button-text,
            var(--color-success-accent)
        );
    }
    :host([color="warning"]) {
        --color-fill: var(
            --formas--color--warning--button-fill,
            var(--color-warning)
        );
        --color-text: var(--formas--color--warning--button-text, white);
    }
    :host([color="warning"][outline]) {
        --color-active: var(
            --formas--color--warning--outline--button-active,
            var(--color-warning-neutral)
        );
        --color-fill: var(
            --formas--color--warning--outline--button-fill,
            var(--color-warning-accent)
        );
    }
    :host([color="warning"][ghost]) {
        --color-active: var(
            --formas--color--warning--ghost--button-active,
            var(--color-warning-neutral)
        );
        --color-text: var(
            --formas--color--warning--ghost--button-text,
            var(--color-warning-accent)
        );
    }
    :host([color="danger"]) {
        --color-fill: var(
            --formas--color--danger--button-fill,
            var(--color-danger)
        );
        --color-text: var(--formas--color--danger--button-text, white);
    }
    :host([color="danger"][outline]) {
        --color-active: var(
            --formas--color--danger--outline--button-active,
            var(--color-danger-neutral)
        );
        --color-fill: var(
            --formas--color--danger--outline--button-fill,
            var(--color-danger-accent)
        );
    }
    :host([color="danger"][ghost]) {
        --color-active: var(
            --formas--color--danger--ghost--button-active,
            var(--color-danger-neutral)
        );
        --color-text: var(
            --formas--color--danger--ghost--button-text,
            var(--color-danger-accent)
        );
    }
    :host([outline]) {
        --border-width: var(--formas--outline--button-border-width, 1px);
    }
`;
const DropdownTokens = css`
    :host {
        --border-width: var(--formas--dropdown-border-width, 0px);
        --border-style: var(--formas--dropdown-border-style, solid);
    }
`;
const CheckboxTokens = css`
    :host {
        --border-width: var(--formas--checkbox-border-width, 1px);
        --border-style: var(--formas--checkbox-border-style, solid);
    }
`;
const RadioTokens = css`
    :host {
        --border-width: var(--formas--radio-border-width, 1px);
        --border-style: var(--formas--radio-border-style, solid);
    }
`;
const SwitchTokens = css`
    :host {
        --border-width: var(--formas--switch-border-width, 1px);
        --border-style: var(--formas--switch-border-style, solid);
    }
`;
const InputTokens = css`
    :host {
        --border-width: var(--formas--input-border-width, 1px);
        --border-style: var(--formas--input-border-style, solid);
    }
`;

export {
    ButtonTokens,
    CheckboxTokens,
    DropdownTokens,
    GenericStateTokens,
    GenericTokens,
    InputTokens,
    NavigationTokens,
    RadioTokens,
    SwitchTokens,
};
Z;
