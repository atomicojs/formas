import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useDisabled } from '@atomico/hooks/use-disabled';
import { useRender } from '@atomico/hooks/use-render';
import { useSlot } from '@atomico/hooks/use-slot';
import { Icon } from '@formas/icon';
import { InputLayout } from '@formas/input';
import { InputGenericProps } from '@formas/props';
import { PrimitiveTokens, ActionTokens } from '@formas/tokens';
import { c, useRef, useUpdate, useProp, css } from 'atomico';
export { SelectOption } from './option.js';

const Select = c(
  ({ name, placeholder, small }) => {
    const refSlotOption = useRef();
    const slotOption = useSlot(refSlotOption);
    const disabled = useDisabled();
    const update = useUpdate();
    const [value, setValue] = useProp("value");
    const [focused, setFocused] = useProp("focused");
    useRender(() => /* @__PURE__ */ jsxs(
      "select",
      {
        slot: "input",
        class: "reset",
        name,
        disabled,
        onchange: ({ currentTarget: { value: value2 } }) => setValue(value2),
        onfocus: () => setFocused(true),
        onblur: () => setFocused(false),
        children: [
          placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, selected: true, children: placeholder }),
          slotOption.map(function option(child) {
            return child?.options?.length ? /* @__PURE__ */ jsx("optgroup", { label: child.label, children: child?.options.map(option) }) : /* @__PURE__ */ jsx(
              "option",
              {
                value: child.value,
                selected: value === child.value || child.selected,
                children: child.label || child.value
              }
            );
          })
        ]
      }
    ));
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, onOptionChange: update, children: [
      /* @__PURE__ */ jsx("slot", { name: "option", ref: refSlotOption }),
      /* @__PURE__ */ jsxs(
        InputLayout,
        {
          class: "input-layout",
          narrowHeader: true,
          small,
          disabled,
          focused,
          layout: "suffix",
          children: [
            /* @__PURE__ */ jsx("slot", { slot: "input", name: "input" }),
            /* @__PURE__ */ jsx(
              Icon,
              {
                class: "input-icon",
                type: "down",
                slot: "icon-suffix"
              }
            )
          ]
        }
      )
    ] });
  },
  {
    props: {
      ...InputGenericProps,
      placeholder: String,
      narrow: {
        type: Boolean,
        reflect: true
      },
      ghost: {
        type: Boolean,
        reflect: true
      }
    },
    styles: [
      PrimitiveTokens,
      ActionTokens,
      css`::slotted([slot="input"]){border:none;background:transparent;appearance:none;z-index:1;left:0;top:0;position:absolute;padding:0px calc(var(--space) * 2)}`
    ]
  }
);

export { Select };
