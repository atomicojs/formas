import { jsx } from 'atomico/jsx-runtime';
import { useFormListener } from '@atomico/hooks/use-form';
import { useRender } from '@atomico/hooks/use-render';
import { useProp, useRef, useEvent } from 'atomico';

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

export { useCheckbox };
