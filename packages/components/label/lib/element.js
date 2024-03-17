import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useSlot } from '@atomico/hooks/use-slot';
import { c, useRef, css } from 'atomico';
import { PrimitiveTokens } from '@formas/tokens';

const Label = c(
  () => {
    const refAction = useRef();
    const [slotAction] = useSlot(refAction);
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
      /* @__PURE__ */ jsx("div", { class: "content", onclick: () => slotAction?.click(), children: /* @__PURE__ */ jsx("slot", {}) }),
      /* @__PURE__ */ jsx("div", { class: "action", children: /* @__PURE__ */ jsx("slot", { name: "action", ref: refAction }) })
    ] });
  },
  {
    props: {
      vertical: {
        type: Boolean,
        reflect: true
      },
      reverse: {
        type: Boolean,
        reflect: true
      },
      gap: {
        type: Boolean,
        reflect: true
      }
    },
    styles: [
      PrimitiveTokens,
      css`:host{display:flex;align-items:center;gap:var(--gap)}:host([gap]){--gap: var(--space-between)}.content{flex:0%;cursor:pointer}:host([vertical][gap]){flex-flow:column;--gap: calc(var(--space-between) / 2)}:host([reverse]){flex-flow:row-reverse}:host([vertical][reverse]){flex-flow:column-reverse}`
    ]
  }
);

export { Label };
