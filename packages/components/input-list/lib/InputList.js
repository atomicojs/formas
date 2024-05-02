import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useRef, useEffect, useLayoutEffect, useState, Mark, useHost, c, useProp, css } from 'atomico';
import { InputLayout } from '@formas/input';
import { serialize } from 'atomico/utils';
import { getValues, joinValues } from './utils.js';

function useCurrentValue(value) {
    const ref = useRef();
    ref.current = value;
    return ref;
}

function useRefValues(callback, args, mode) {
    const { current } = useRef({ values: [], mode });
    const clean = () => {
        if (typeof current.collector === "function") {
            current.collector();
            delete current.collector;
        }
    };
    const effect = current.mode ? useEffect : useLayoutEffect;
    effect(() => clean, []);
    effect(() => {
        const oldValues = current.values;
        const values = args.map((ref) => ref.current);
        const withDiff = values.some((value, i) => value !== oldValues[i]);
        if (withDiff) {
            clean();
            if (values.filter((value) => value != null).length === args.length) {
                current.collector = callback(values);
            }
        }
        current.values = values;
    });
}

function useListener(ref, name, handler, options) {
    const value = useCurrentValue(handler);
    useRefValues(([current]) => {
        return addListener(current, name, (event) => value.current(event), options);
    }, [ref]);
}
/**
 * Associate an event and return a callback to remove said event
 */
function addListener(current, name, handler, options) {
    current.addEventListener(name, handler, options);
    return () => current.removeEventListener(name, handler);
}
function useListenerState(ref, name, handler, options) {
    const [state, setState] = useState();
    useListener(ref, name, (event) => setState(handler(event)), options);
    return state;
}

/**
 * returns the assigned nodes of a slot
3 */
function useSlot(ref, filter) {
    const [childNodes, setChildNodes] = useState([]);
    useEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        // handler subscriber to the event
        const handler = () => setChildNodes(current.assignedNodes().filter((child) => 
        //@ts-ignore
        !(child instanceof Mark) &&
            //@ts-ignore
            (filter ? filter(child) : true)));
        // First load
        handler();
        // listener and unlistener
        return addListener(current, "slotchange", handler);
    }, [ref.current]);
    return childNodes;
}
/**
 * creates a persistent list of nodes from a source with the intention of
 * keeping the node in the list as long as it remains on the host
 */
function useProxySlot(ref, filter) {
    const host = useHost();
    const children = useSlot(ref, filter);
    const [currentChildren, setCurrentChildren] = useState(children);
    const intoHost = (node) => node.parentElement === host.current;
    useEffect(() => {
        if (!children.length)
            return;
        // clean the list keeping only the nodes nested in the host
        setCurrentChildren([...currentChildren, ...children].filter(intoHost));
    }, children);
    useEffect(() => {
        if (!currentChildren.length)
            return;
        // gets all assigned slots
        const slots = new Set(currentChildren.map((child) => child.assignedSlot));
        // Avoid the reference given as parameter
        slots.delete(ref.current);
        const unlisteners = [...slots].map((slot) => addListener(slot, "slotchange", () => setCurrentChildren((children) => {
            // clean the list keeping only the nodes nested in the host
            const next = children.filter(intoHost);
            if (children.length === next.length)
                return children;
            return next;
        })));
        // remove the subscription to assigned slots
        return () => unlisteners.map((unlistener) => unlistener());
    }, currentChildren);
    return currentChildren;
}

const InputList = c(
  ({ multiple, small }) => {
    const refTempalte = useRef();
    const refOptions = useRef();
    const refHeader = useRef();
    const refFooter = useRef();
    const slotTemplate = useSlot(
      refTempalte,
      (element) => element instanceof HTMLElement
    );
    const slotHeader = useSlot(refHeader);
    const slotFooter = useSlot(refFooter);
    const slotOptions = useSlot(
      refOptions,
      (element) => element instanceof HTMLElement
    );
    const [value, setValue] = useProp("value");
    useEffect(() => {
      slotTemplate.forEach((element) => {
        console.info({ value });
        element.value = value || "";
      });
    }, [slotTemplate, value]);
    useEffect(() => {
      const list = getValues(value);
      slotOptions.forEach(
        (element) => element.checked = list.includes(element.value)
      );
    }, [slotOptions, value]);
    return /* @__PURE__ */ jsx(
      "host",
      {
        shadowDom: true,
        layout: serialize(
          slotHeader.length && "header",
          slotFooter.length && "footer"
        ),
        children: /* @__PURE__ */ jsxs(
          InputLayout,
          {
            enableDropdown: true,
            small,
            onSetValue: (event) => setValue(event.detail),
            children: [
              /* @__PURE__ */ jsx("slot", { ref: refTempalte, name: "input", slot: "input" }),
              /* @__PURE__ */ jsxs("div", { slot: "dropdown", class: "dropdown", children: [
                /* @__PURE__ */ jsx("div", { class: "header", children: /* @__PURE__ */ jsx("slot", { ref: refHeader, name: "header" }) }),
                /* @__PURE__ */ jsx("div", { class: "options", children: /* @__PURE__ */ jsx(
                  "slot",
                  {
                    onchange: (event) => {
                      const target = event.target;
                      const { checked } = target;
                      setValue((value2) => {
                        const list = getValues(value2);
                        if (!multiple)
                          return target.value;
                        if (list.includes(target.value)) {
                          return checked ? value2 : joinValues(
                            list.filter(
                              (value3) => value3 !== target.value
                            )
                          );
                        }
                        return checked ? joinValues(
                          list.concat(target.value)
                        ) : value2;
                      });
                    },
                    name: "option",
                    ref: refOptions
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { class: "footer", children: /* @__PURE__ */ jsx("slot", { ref: refFooter, name: "footer" }) })
              ] })
            ]
          }
        )
      }
    );
  },
  {
    props: {
      value: { type: String, value: "" },
      multiple: { type: Boolean, reflect: true },
      small: { type: Boolean, reflect: true },
      minLength: Number,
      maxLength: Number
    },
    styles: css`:host{display:block;--display-header: none;--display-footer: none}.options{display:grid}.header{display:var(--display-header);border-bottom:var(--border-split)}.footer{display:var(--display-footer);border-top:var(--border-split)}:host([layout*="header"]){--display-header: block}:host([layout*="footer"]){--display-footer: block}`
  }
);

export { InputList };
