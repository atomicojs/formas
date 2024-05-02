import { jsx, jsxs } from 'atomico/jsx-runtime';
import { Badge } from '@formas/badge';
import { Icon } from '@formas/icon';
import { c, css } from 'atomico';
import { getValues, useSetValue, joinValues } from './utils.js';

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
