import { jsx, jsxs } from 'atomico/jsx-runtime';
import { c, useProp, css } from 'atomico';
import { Label } from '@formas/label';
import { Checkbox } from '@formas/checkbox';

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
