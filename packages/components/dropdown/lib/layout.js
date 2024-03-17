import { jsxs, jsx } from 'atomico/jsx-runtime';
import { computePosition, flip, shift } from '@floating-ui/dom';
import { Container } from '@formas/container';
import { PrimitiveTokens, CardTokens } from '@formas/tokens';
import { c, useState, useRef, useEffect, css } from 'atomico';

const DropdownLayout = c(
  ({ show, reference }) => {
    const [style, setStyle] = useState();
    const ref = useRef();
    useEffect(() => {
      if (!reference)
        return;
      computePosition(reference, ref.current, {
        middleware: [
          flip({
            fallbackPlacements: ["top", "bottom"]
          }),
          shift()
        ]
      }).then(({ x, y }) => {
        setStyle(`--left: ${x}px; --top:${y}px`);
      });
    }, [show, parent]);
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
      /* @__PURE__ */ jsx("div", { class: "dropdown", ref, children: /* @__PURE__ */ jsx(Container, { class: "dropdown-card", small: true, shadow: 1, children: /* @__PURE__ */ jsx("slot", {}) }) }),
      /* @__PURE__ */ jsx("style", { children: style && `:host{${style}}` })
    ] });
  },
  {
    props: {
      show: {
        type: Boolean,
        reflect: true
      },
      reference: Element
    },
    styles: [
      PrimitiveTokens,
      CardTokens,
      css`:host{display:inline-block;position:relative;---visibility: hidden;--transform-from: none;--transform-to: none;--transform: var(--transform-from);---opacity: 0}:host([show]){---visibility: visible;--transform: var(--transform-to);---opacity: 1}.dropdown{min-width:var(--min-width, 100%);position:absolute;top:var(--top);left:var(--left);padding:var(--space) 0;visibility:var(---visibility);opacity:var(---opacity);transform:var(--transform);box-sizing:border-box;transition:var(--transition)}`
    ]
  }
);

export { DropdownLayout };
