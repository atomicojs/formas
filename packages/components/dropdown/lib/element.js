import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useListener } from '@atomico/hooks/use-listener';
import { useParent } from '@atomico/hooks/use-parent';
import { useResizeObserverState } from '@atomico/hooks/use-resize-observer';
import { useSlot } from '@atomico/hooks/use-slot';
import { createContext, createRef, c, useHost, useRef, useProp, useContext, css } from 'atomico';
import { DropdownLayout } from './layout.js';

const DropdownContext = createContext({ show: false });
const refWindow = createRef(window);
const Dropdown = c(
  ({ showWithOver }) => {
    const host = useHost();
    const refSlotAction = useRef();
    const slotAction = useSlot(refSlotAction);
    const [show, setShow] = useProp("show");
    const refAction = useRef();
    refAction.current = slotAction.at(0);
    useListener(refWindow, "click", (event) => {
      if (!event.composedPath().includes(host.current)) {
        setShow(false);
      }
    });
    const { show: parentShowWithOver } = useContext(DropdownContext);
    showWithOver = parentShowWithOver || showWithOver;
    const listenerShow = (event) => event.isTrusted && setShow(!show);
    listenerShow.capture = true;
    const state = useResizeObserverState(refAction);
    const withIntDropdown = useParent(host.current.localName);
    console.log({ withIntDropdown });
    return /* @__PURE__ */ jsxs(
      "host",
      {
        shadowDom: true,
        onmouseleave: () => {
          showWithOver && setShow(false);
        },
        children: [
          /* @__PURE__ */ jsx(
            "slot",
            {
              onclick: listenerShow,
              onmouseover: showWithOver ? listenerShow : null,
              ref: refSlotAction,
              name: "action"
            }
          ),
          /* @__PURE__ */ jsx(DropdownContext, { value: { show: showWithOver }, children: /* @__PURE__ */ jsx(
            DropdownLayout,
            {
              show,
              reference: slotAction[0],
              style: state?.width ? `--min-width: ${state.width}px;` : null,
              children: /* @__PURE__ */ jsx("slot", {})
            }
          ) })
        ]
      }
    );
  },
  {
    props: {
      show: {
        type: Boolean,
        reflect: true
      },
      showWithOver: {
        type: Boolean,
        reflect: true
      },
      width: String,
      widthFull: {
        type: Boolean,
        reflect: true
      }
    },
    styles: css`:host{display:contents}`
  }
);

export { Dropdown, DropdownContext };
