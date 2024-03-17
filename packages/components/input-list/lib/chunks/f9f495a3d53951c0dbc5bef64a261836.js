import { jsx } from 'atomico/jsx-runtime';
import { a as useListener } from './0437656d98e858ea8604835a9dc210d1.js';
import { useHost, useRef, useRefEffect, useMemo, createRef, useProp, useLayoutEffect, useInsertionEffect, render, useState, useEffect } from 'atomico';

function useMutationObserver(callback, config = {
    childList: true,
    characterData: true,
}) {
    useRefMutationObserver(useHost(), callback, config);
}
function useRefMutationObserver(host, callback, config = {
    childList: true,
    characterData: true,
}) {
    const ref = useRef();
    ref.current = callback;
    useRefEffect(() => {
        if (!host.current)
            return;
        const mutation = new MutationObserver((entries) => {
            entries.forEach(({ addedNodes }) => addedNodes.forEach(map));
            ref.current(entries, mutation);
        });
        const map = (child) => {
            if (child instanceof Text) {
                mutation.observe(child, { ...config, characterData: true });
            }
        };
        mutation.observe(host.current, config);
        host.current.childNodes.forEach(map);
        return () => mutation.disconnect();
    }, [host]);
}

function useParent(matches, composed) {
    const path = useParentPath(composed);
    return useMemo(() => createRef(path.find(typeof matches === "string"
        ? (el) => el?.matches?.(matches)
        : //@ts-ignore
            (el) => el instanceof matches)), [matches]);
}
function useParentPath(composed) {
    const host = useHost();
    return useMemo(() => {
        const path = [];
        let { current } = host;
        //@ts-ignore
        while ((current = current.parentNode || (composed && current.host)))
            path.push(current);
        return path;
    }, [composed]);
}

const checkDisable = (el) => el.hasAttribute("disabled");
/**
 * Synchronize disabled status with a parent
 * @example
 * ```jsx
 * <fieldset disabled>
 *      <my-input>I am disabled</my-input>
 * </fieldset>
 * ```
 * @example
 * ```css
 * :host([disabled]){
 *      pointer-events: none;
 * }
 * ```
 */
function useDisabled(matches = "fieldset") {
    const fieldset = useParent(matches);
    const [disabled, setDisabled] = useProp("disabled");
    useRefMutationObserver(fieldset, (items) => items
        .filter((item) => item.attributeName == "disabled")
        .map((el) => {
        setDisabled(checkDisable(el.target));
    }), {
        attributes: true,
    });
    useLayoutEffect(() => {
        const { current } = fieldset;
        if (current) {
            setDisabled(checkDisable(current));
        }
    }, []);
    return disabled;
}

/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 */
const fillHost = (vnode) => vnode && vnode.type === "host" ? vnode : jsx("host", { children: vnode });
/**
 * Generate a second render, this render escapes the current
 * one and is useful for collaborative work between LightDOM and shadowDOM
 */
function useRender(view, args) {
    const host = useHost();
    host.id = host.id || Symbol();
    useInsertionEffect(() => {
        render(fillHost(typeof view === "function" ? view() : view), host.current, host.id);
    }, args);
}

function useForm() {
    return useParent("form");
}
/**
 * Allows you to listen to the native events of the form
 */
function useFormListener(name, handler, options) {
    useListener(useForm(), name, handler, options);
}
function useFormInputHidden(name, value) {
    const [slot] = useState(Math.random);
    useRender(() => (jsx("input", { type: "hidden", value: value, name: name, slot: `${slot}` })), [name, value]);
}

/**
 * reflects input radio in forms, this hook requires the declaration
 * of the props checked: Boolean and name: String
 */
function useFormInputRadio(input) {
    const ref = useRef();
    const [checked, setChecked] = useProp("checked");
    const [name] = useProp("name");
    useFormListener("change", ({ currentTarget, target }) => {
        if (!(target instanceof HTMLInputElement))
            return;
        if (currentTarget instanceof HTMLFormElement) {
            const group = currentTarget.elements[name];
            if (group instanceof RadioNodeList) {
                [...group].forEach((input) => {
                    input.checked = target === input;
                });
            }
        }
        setChecked(target === ref.current);
    });
    useFormListener("reset", () => setChecked(false));
    useRender(() => ({
        ...input,
        props: {
            ...input.props,
            ref,
            type: "radio",
            name,
            checked,
        },
    }));
    useListener(ref, "change", (event) => {
        setChecked(event.currentTarget.checked);
    });
    useEffect(() => {
        setChecked(ref.current.checked);
    }, []);
    return ref;
}

/**
 * reflects an event to another node
 */
const reflectEvent = (current, event, composed) => {
    const { currentTarget } = event;
    const { shadowRoot } = currentTarget;
    const path = event.composedPath();
    if (path.includes(current))
        return;
    const index = path.indexOf(currentTarget);
    const insetShadowRoot = path
        .slice(0, index)
        .find((el) => el instanceof ShadowRoot);
    if (!composed && insetShadowRoot !== shadowRoot)
        return;
    event.preventDefault();
    event.stopImmediatePropagation();
    //@ts-ignore
    current.dispatchEvent(new event.constructor(event.type, event));
};
/**
 * This hook reflects an event and cancels its propagation
 */
function useReflectEvent(refFrom, refTo, type, { capture = true, composed = true, } = {}) {
    useListener(refFrom, type, (event) => {
        const { current } = refTo;
        current && reflectEvent(current, event, composed);
    }, { capture });
}

const InputGenericProps = {
  name: { type: String, reflect: true },
  required: { type: Boolean, reflect: true },
  disabled: { type: Boolean, reflect: true },
  value: null,
  small: { type: Boolean, reflect: true },
  focused: { type: Boolean, reflect: true },
  focusable: {
    type: Boolean,
    reflect: true,
    value: true
  }
};

export { InputGenericProps as I, useDisabled as a, useReflectEvent as b, useRender as c, useParent as d, useFormListener as e, useMutationObserver as u };
