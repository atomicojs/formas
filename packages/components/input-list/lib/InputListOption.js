import { jsxs, jsx } from 'atomico/jsx-runtime';
import { c, useRef, css, useProp, useEvent, useHost } from 'atomico';
import { d as useSlot, P as PrimitiveTokens, I as Icon, A as ActionTokens, h as CheckboxTokens } from './chunks/0437656d98e858ea8604835a9dc210d1.js';
import { e as useFormListener, c as useRender, a as useDisabled, b as useReflectEvent, I as InputGenericProps } from './chunks/f9f495a3d53951c0dbc5bef64a261836.js';

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

customElements.define("forma-label", Label);

function useCheckbox(type) {
  const [name] = useProp("name");
  const [value] = useProp("value");
  const [checked, setChecked] = useProp("checked");
  const refInput = useRef();
  const dispatchChange = useEvent("change", {
    bubbles: true,
    composed: true,
    base: Event
  });
  useFormListener("reset", () => {
    setChecked(false);
    dispatchChange();
  });
  useRender(() => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        name,
        value,
        ref: refInput,
        checked,
        onchange: (event) => {
          event.stopPropagation();
        },
        onclick: () => {
          setChecked(!checked);
          dispatchChange();
        }
      }
    );
  }, [checked, name, type]);
  return refInput;
}

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

customElements.define("forma-checkbox", Checkbox);

const InputListOption = c(
  ({ value }) => {
    const [checked, setChecked] = useProp("checked");
    return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsxs(Label, { slot: "option", children: [
      /* @__PURE__ */ jsx("strong", { children: value }),
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          checked,
          slot: "action",
          value,
          onchange: ({ currentTarget }) => setChecked(currentTarget.checked)
        }
      )
    ] }) });
  },
  {
    props: {
      value: { type: String, reflect: true },
      checked: { type: Boolean, reflect: true },
      slot: { type: String, value: "option", reflect: true }
    },
    styles: css`:host{padding-left:var(--space)}`
  }
);

export { InputListOption };
