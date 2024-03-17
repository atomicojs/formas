import { jsx } from 'atomico/jsx-runtime';
import { css, c } from 'atomico';

const Sizes = [
  "5xs",
  "4xs",
  "3xs",
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "3xl"
];
const ColorsBackground = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "container",
  "surface"
];
const ShadowDeep = [1, 2, 3, 4];
const PrimitiveTokens = css`@tokens "./tokens.yaml" use(primitive);`;
const ActionTokens = css`@tokens "./tokens.yaml" use(action);:host{font-size:var(--font-size);font-weight:var(--font-weight);color:var(--font-color);opacity:var(--opacity)}`;
const ButtonTokens = css`@tokens "./tokens.yaml" use(button);`;
const CheckboxTokens = css`@tokens "./tokens.yaml" use(checkbox);`;
const CardTokens = css`@tokens "./tokens.yaml" use(card);`;
const BadgeTokens = css`@tokens "./tokens.yaml" use(badge);`;
const tokens = css`@tokens "./tokens.yaml" scope(:root);`;
document.adoptedStyleSheets = [
  tokens,
  ...document.adoptedStyleSheets
];

const Container = c(
  () => {
    return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx("slot", {}) });
  },
  {
    props: {
      small: {
        type: Boolean,
        reflect: true
      },
      padding: {
        type: String,
        reflect: true
      },
      bgcolor: {
        type: String,
        reflect: true,
        value: "container"
      },
      color: {
        type: String,
        reflect: true
      },
      shadow: {
        type: Number,
        reflect: true
      },
      radio: {
        type: String,
        reflect: true,
        value: "xs"
      }
    },
    styles: [
      PrimitiveTokens,
      CardTokens,
      css`
                :host {
                    display: grid;
                    padding: var(--padding);
                    background-color: var(--bgcolor);
                    color: var(--color);
                    box-shadow: var(--shadow);
                    border-radius: var(--radius);
                    border: var(--border);
                }
                ${Sizes.map(
        (size) => `:host([padding=${size}]){--padding: var(--size-${size})}`
      ).join("")}
                ${ColorsBackground.map(
        (color) => `:host([bgcolor=${color}]){--bgcolor: var(--color-${color})}`
      ).join("")}
                ${ShadowDeep.map(
        (deep) => `:host([shadow="${deep}"]){--shadow: var(--shadow-${deep})}`
      ).join("")}
            `
    ]
  }
);

export { Container };
