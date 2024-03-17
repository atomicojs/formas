import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useDisabled } from '@atomico/hooks/use-disabled';
import { useFormInputRadio } from '@atomico/hooks/use-form';
import { useReflectEvent } from '@atomico/hooks/use-reflect-event';
import { c, useHost, useProp, css } from 'atomico';
import { Checkbox } from '@formas/checkbox';
import { PrimitiveTokens, ActionTokens, CheckboxTokens } from '@formas/tokens';

const Radio = c(
  ({ tabIndex, value }) => {
    const host = useHost();
    const refInput = useFormInputRadio(/* @__PURE__ */ jsx("input", { value }));
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
        children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", children: [
          /* @__PURE__ */ jsx("circle", { class: "circle-1" }),
          /* @__PURE__ */ jsx("circle", { class: "circle-2" }),
          /* @__PURE__ */ jsx("circle", { class: "circle-3" }),
          /* @__PURE__ */ jsx("circle", { class: "circle-4" })
        ] })
      }
    ) });
  },
  {
    props: Checkbox.props,
    styles: [
      PrimitiveTokens,
      ActionTokens,
      CheckboxTokens,
      css`:host{--radius: var(--radius-circle);---opacity: 0;---stroke-color: var(--color-contrast-30);---outline: none;---offset: 60;---scale: .75;display:inline-block}:host([checked]){---opacity: 1;---stroke-color: transparent;---offset: 0;---scale: 1}:host([focused]){---outline: var(--outline)}:host([disabled]){opacity:var(--opacity);pointer-events:none}.container{all:unset;width:var(--size);height:var(--size);display:grid;place-content:center;cursor:pointer}svg{width:var(--size-switch);height:var(--size-switch);border-radius:var(--radius);outline:var(---outline);outline-offset:var(--outline-offset)}.circle-1,.circle-2,.circle-3,.circle-4{cx:10;cy:10;r:9;fill:transparent}.circle-1{r:10;fill:var(--color-invert)}.circle-2{stroke-width:var(--stroke-size);stroke:var(---stroke-color);transition:var(--transition)}.circle-3{stroke-width:var(--stroke-size);stroke-dasharray:60;stroke-dashoffset:var(---offset);transition:var(--transition);stroke-linecap:round;stroke:var(--color-contrast-100)}.circle-4{stroke-width:var(--stroke-size);opacity:var(---opacity);transform:scale(var(---scale));transform-origin:center;transition:var(--transition-medium);fill:var(--color-contrast-100);r:6}`
    ]
  }
);

export { Radio };
