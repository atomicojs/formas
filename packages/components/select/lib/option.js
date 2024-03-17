import { jsx } from 'atomico/jsx-runtime';
import { useSlot } from '@atomico/hooks/use-slot';
import { useRef, c } from 'atomico';

function selectOption() {
  const refSlotOption = useRef();
  const slotOption = useSlot(refSlotOption);
  return /* @__PURE__ */ jsx("host", { shadowDom: true, options: slotOption, children: /* @__PURE__ */ jsx("slot", { ref: refSlotOption, name: "option" }) });
}
const eventOptionChange = { type: "OptionChange", bubbles: true };
selectOption.props = {
  slot: {
    type: String,
    reflect: true,
    value: "option"
  },
  value: {
    type: String,
    event: eventOptionChange
  },
  label: {
    type: String,
    event: eventOptionChange
  },
  options: {
    type: Array,
    event: eventOptionChange
  },
  selected: Boolean
};
const SelectOption = c(selectOption);

export { SelectOption };
