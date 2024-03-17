import { jsxs, jsx } from 'atomico/jsx-runtime';
import { d as useSlot, P as PrimitiveTokens, g as BadgeTokens, I as Icon } from './chunks/0437656d98e858ea8604835a9dc210d1.js';
import { c, useRef, css } from 'atomico';
import { serialize } from 'atomico/utils';
import { getValues, useSetValue, joinValues } from './utils.js';

const Badge = c(
  ({ action, color }) => {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);
    return /* @__PURE__ */ jsxs(
      "host",
      {
        shadowDom: true,
        layout: serialize(
          slotPrefix.length && "prefix",
          slotSuffix.length && "suffix"
        ),
        children: [
          /* @__PURE__ */ jsxs("button", { class: "badge", staticNode: true, tabIndex: action ? null : -1, children: [
            /* @__PURE__ */ jsx("div", { className: "icon prefix", children: /* @__PURE__ */ jsx("slot", { name: "prefix", ref: refPrefix }) }),
            /* @__PURE__ */ jsx("slot", {}),
            /* @__PURE__ */ jsx("div", { className: "icon suffix", children: /* @__PURE__ */ jsx("slot", { name: "suffix", ref: refSuffix }) })
          ] }),
          color && /* @__PURE__ */ jsx("style", { children: `:host{---color: var(--color-${color}, var(--color-status-${color}-container) )}` })
        ]
      }
    );
  },
  {
    props: {
      small: { type: Boolean, reflect: true },
      circle: { type: Boolean, reflect: true },
      action: { type: Boolean, reflect: true },
      color: { type: String, value: "primary" }
    },
    styles: [
      PrimitiveTokens,
      BadgeTokens,
      css`:host{display:content;---radius: var(--radius);---space-left: var(--space);---space-right: var(--space);---space: 0 var(---space-right) 0 var(---space-left);---display-prefix: none;---display-suffix: none;---pointer-event: none}:host([action]){---pointer-event: all;---cursor: pointer}:host([circle]){---radius: var(--radius-circle)}:host([layout*="prefix"]){---space-left: var(--space-icon);---display-prefix: grid}:host([layout*="suffix"]){---space-right: var(--space-icon);---display-suffix: grid}.badge{height:var(--size);border:none;display:flex;align-items:center;gap:var(--space);padding:var(---space);box-sizing:border-box;border-radius:var(---radius);background:var(---color, var(--color));font-size:var(--font-size);color:var(--font-color);font-weight:var(--font-weight);pointer-events:var(---pointer-event);cursor:var(---cursor)}.icon{width:var(--size-icon-container);height:var(--size-icon-container);background:var(--color-container);place-content:center;border-radius:calc(var(---radius) - var(--space-icon))}.prefix{display:var(---display-prefix)}.suffix{display:var(---display-suffix)}`
    ]
  }
);

customElements.define("formas-badge", Badge);

const InputListBadge = c(
  ({ value }) => {
    const values = getValues(value);
    const dispatch = useSetValue();
    return /* @__PURE__ */ jsx("host", { shadowDom: true, children: values.map((value2) => /* @__PURE__ */ jsxs(
      Badge,
      {
        action: true,
        onclick: Object.assign(
          (event) => {
            event.stopPropagation();
            event.preventDefault();
            dispatch(
              joinValues(values.filter((_) => _ != value2))
            );
          },
          { capture: true }
        ),
        children: [
          value2,
          /* @__PURE__ */ jsx(Icon, { slot: "suffix", type: "closed" })
        ]
      }
    )) });
  },
  {
    props: {
      value: { type: String, value: "" },
      slot: { type: String, value: "input", reflect: true }
    },
    styles: css`:host{display:flex;gap:var(--space)}`
  }
);

export { InputListBadge };
