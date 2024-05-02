import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useDisabled } from '@atomico/hooks/use-disabled';
import { useReflectEvent } from '@atomico/hooks/use-reflect-event';
import { Icon } from '@formas/icon';
import { InputGenericProps } from '@formas/props';
import { PrimitiveTokens, ActionTokens, CheckboxTokens } from '@formas/tokens';
import { c, useHost, useProp, css } from 'atomico';
import { useCheckbox } from './hooks.js';

const Checkbox = c(
  ({ tabIndex }) => {
    const host = useHost();
    const refInput = useCheckbox("radio");
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");
    useReflectEvent(host, refInput, "click");
    return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        class: "container",
        disabled,
        tabIndex: disabled ? -1 : tabIndex,
        onfocus: () => setFocused(true),
        onblur: () => setFocused(false),
        staticNode: true,
        children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", children: [
          /* @__PURE__ */ jsx("rect", { class: "rect-1" }),
          /* @__PURE__ */ jsx("rect", { class: "rect-2" }),
          /* @__PURE__ */ jsx("rect", { class: "rect-3" }),
          /* @__PURE__ */ jsx("foreignObject", { x: 0, y: 0, width: "20", height: "20", children: /* @__PURE__ */ jsx("div", { class: "icon", children: /* @__PURE__ */ jsx(Icon, { type: "check" }) }) })
        ] })
      }
    ) });
  },
  {
    props: {
      ...InputGenericProps,
      value: {
        type: String,
        value: "on"
      },
      tabIndex: { type: Number },
      checked: {
        type: Boolean,
        reflect: true
      }
    },
    styles: [
      PrimitiveTokens,
      ActionTokens,
      CheckboxTokens,
      css`:host{---stroke-color: var(--color-contrast-30);---fill: transparent;---color: var(--color-invert);---icon-color: var(--color-invert);---outline: none;---stroke-offset: 70;display:inline-block}:host([focused]){---outline: var(--outline)}:host([disabled]){opacity:var(--opacity);pointer-events:none}:host([checked]){---stroke-color: var(--color-contrast-100);---color: var(--color-contrast-100);---icon-color: var(--color-invert);---fill: var(--color-contrast-100);---stroke-offset: 0}.container{all:unset;height:var(--size);width:var(--size);display:grid;place-content:center;cursor:pointer}svg{outline:var(---outline);border-radius:var(--radius);outline-offset:var(--outline-offset)}rect{width:18px;height:18px;rx:var(--radius);fill:transparent;x:1;y:1;stroke-linecap:round;stroke-width:2}.rect-1{width:20px;height:20px;x:0;y:0;rx:calc(var(--radius) + 1px);fill:var(--color-invert)}.rect-2{stroke:var(---stroke-color);stroke-width:var(--stroke-size)}.rect-3{fill:var(---fill);transition:var(--transition-medium);stroke:var(---stroke-color);stroke-width:var(--stroke-size);stroke-dasharray:70;stroke-dashoffset:var(---stroke-offset)}.icon{width:100%;height:100%;display:grid;place-content:center;color:var(---icon-color);transition:var(--transition)}`
    ]
  }
);

export { Checkbox };
