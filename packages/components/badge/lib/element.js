import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useRef, useEffect, useLayoutEffect, useState, Mark, useHost, css, c } from 'atomico';
import { serialize } from 'atomico/utils';

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

const Sizes = [
  "5xs",
  "4xs",
  "3xs",
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "3xl"
];
const ColorsBackground = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "container",
  "surface"
];
const ShadowDeep = [1, 2, 3, 4];
const PrimitiveTokens = css`@tokens "./tokens.yaml" use(primitive);`;
const ActionTokens = css`@tokens "./tokens.yaml" use(action);:host{font-size:var(--font-size);font-weight:var(--font-weight);color:var(--font-color);opacity:var(--opacity)}`;
const ButtonTokens = css`@tokens "./tokens.yaml" use(button);`;
const CheckboxTokens = css`@tokens "./tokens.yaml" use(checkbox);`;
const CardTokens = css`@tokens "./tokens.yaml" use(card);`;
const BadgeTokens = css`@tokens "./tokens.yaml" use(badge);`;
const tokens = css`@tokens "./tokens.yaml" scope(:root);`;
document.adoptedStyleSheets = [
  tokens,
  ...document.adoptedStyleSheets
];

const Badge = c(
  ({ action, color }) => {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);
    return /* @__PURE__ */ jsxs(
      "host",
      {
        shadowDom: true,
        layout: serialize(
          slotPrefix.length && "prefix",
          slotSuffix.length && "suffix"
        ),
        children: [
          /* @__PURE__ */ jsxs("button", { class: "badge", staticNode: true, tabIndex: action ? null : -1, children: [
            /* @__PURE__ */ jsx("div", { className: "icon prefix", children: /* @__PURE__ */ jsx("slot", { name: "prefix", ref: refPrefix }) }),
            /* @__PURE__ */ jsx("slot", {}),
            /* @__PURE__ */ jsx("div", { className: "icon suffix", children: /* @__PURE__ */ jsx("slot", { name: "suffix", ref: refSuffix }) })
          ] }),
          color && /* @__PURE__ */ jsx("style", { children: `:host{---color: var(--color-${color}, var(--color-status-${color}-container) )}` })
        ]
      }
    );
  },
  {
    props: {
      small: { type: Boolean, reflect: true },
      circle: { type: Boolean, reflect: true },
      action: { type: Boolean, reflect: true },
      color: { type: String, value: "primary" }
    },
    styles: [
      PrimitiveTokens,
      BadgeTokens,
      css`:host{display:content;---radius: var(--radius);---space-left: var(--space);---space-right: var(--space);---space: 0 var(---space-right) 0 var(---space-left);---display-prefix: none;---display-suffix: none;---pointer-event: none}:host([action]){---pointer-event: all;---cursor: pointer}:host([circle]){---radius: var(--radius-circle)}:host([layout*="prefix"]){---space-left: var(--space-icon);---display-prefix: grid}:host([layout*="suffix"]){---space-right: var(--space-icon);---display-suffix: grid}.badge{height:var(--size);border:none;display:flex;align-items:center;gap:var(--space);padding:var(---space);box-sizing:border-box;border-radius:var(---radius);background:var(---color, var(--color));font-size:var(--font-size);color:var(--font-color);font-weight:var(--font-weight);pointer-events:var(---pointer-event);cursor:var(---cursor)}.icon{width:var(--size-icon-container);height:var(--size-icon-container);background:var(--color-container);place-content:center;border-radius:calc(var(---radius) - var(--space-icon))}.prefix{display:var(---display-prefix)}.suffix{display:var(---display-suffix)}`
    ]
  }
);

export { Badge };
