import { jsx, jsxs } from "atomico/jsx-runtime";
import {
    useMemo,
    useHost,
    useRef,
    useEffect,
    useLayoutEffect,
    useState,
    useProp,
    h,
    options,
    template,
    css,
    c,
} from "atomico";

// src/use-parent/use-parent.js
function useParent(matches, composed) {
    const path = useParentPath(composed);
    return useMemo(
        () => ({
            current: path.find((el) => el.matches && el.matches(matches)),
        }),
        [matches]
    );
}
function useParentPath(composed) {
    const host = useHost();
    return useMemo(() => {
        const path = [];
        let { current } = host;
        while ((current = current.parentNode || (composed && current.host)))
            path.push(current);
        return path;
    }, [composed]);
}

// src/use-ref-values/use-ref-values.js
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
            if (
                values.filter((value) => value != null).length === args.length
            ) {
                current.collector = callback(values);
            }
        }
        current.values = values;
    });
}

// src/use-current-value/use-current-value.js
function useCurrentValue(value) {
    const ref = useRef();
    ref.current = value;
    return ref;
}

function useMutationObserver(ref, observe, config) {
    const value = useCurrentValue(observe);
    useRefValues(
        ([current]) => {
            const observer = new MutationObserver((mutations) =>
                value.current(mutations)
            );
            observer.observe(current, config);
            return () => observer.disconnect();
        },
        [ref]
    );
}
function useMutationObserverState(ref, config) {
    const [state, setState] = useState();
    useMutationObserver(ref, setState, config);
    return state;
}

var checkDisable = (el) => el.hasAttribute("disabled");
function useDisabled(matches = "fieldset") {
    const fieldset = useParent(matches);
    const [disabled, setDisabled] = useProp("disabled");
    useMutationObserver(
        fieldset,
        (items) =>
            items
                .filter((item) => item.attributeName == "disabled")
                .map((el) => {
                    setDisabled(checkDisable(el.target));
                }),
        {
            attributes: true,
        }
    );
    useLayoutEffect(() => {
        const { current } = fieldset;
        if (current) {
            setDisabled(checkDisable(current));
        }
    }, []);
    return disabled;
}

// src/use-render/use-render.js
var host = h("host");
var IdUseRender = Symbol.for("Atomico.useRender");
var props = {
    [IdUseRender]: true,
};
function fillHost(vdom) {
    if (vdom && typeof vdom == "object") {
        vdom =
            vdom.type == "host"
                ? {
                      ...vdom,
                      props: {
                          ...props,
                          ...vdom.props,
                      },
                  }
                : h("host", props, vdom);
        return vdom;
    }
    return host;
}
function useRender(callback, args) {
    const host2 = useHost();
    host2.id = host2.id || Symbol();
    useMemo(
        () =>
            !options.ssr &&
            fillHost(callback()).render(host2.current, host2.id),
        args
    );
    useEffect(() => () => fillHost().render(host2.current, host2.id), []);
}

function useListener(ref, name, handler, options) {
    const value = useCurrentValue(handler);
    useRefValues(
        ([current]) => {
            return addListener(
                current,
                name,
                (event) => value.current(event),
                options
            );
        },
        [ref]
    );
}
function addListener(current, name, handler, options) {
    current.addEventListener(name, handler, options);
    return () => current.removeEventListener(name, handler);
}
function useListenerState(ref, name, handler, options) {
    const [state, setState] = useState();
    useListener(ref, name, (event) => setState(handler(event)), options);
    return state;
}

function useForm() {
    return useParent("form");
}
function useFormListener(name, handler, options) {
    useListener(useForm(), name, handler, options);
}
function useFormInputHidden(name, value) {
    const [slot] = useState(Math.random);
    useRender(
        () => h("input", { type: "hidden", value, name, slot }),
        [name, value]
    );
}

function useFormInputRadio(input) {
    const ref = useRef();
    const [checked, setChecked] = useProp("checked");
    const [name] = useProp("name");
    useFormListener("change", ({ currentTarget, target }) => {
        if (!(target instanceof HTMLInputElement)) return;
        const group = currentTarget.elements[name];
        if (group instanceof RadioNodeList) {
            [...group].forEach((input2) => {
                input2.checked = target === input2;
            });
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
        setChecked(event.target.checked);
    });
    useEffect(() => {
        setChecked(ref.current.checked);
    }, []);
    return ref;
}

// src/use-reflect-event/use-reflect-event.js
var reflectEvent = (current, event, composed) => {
    const { currentTarget } = event;
    const { shadowRoot } = currentTarget;
    const path = event.composedPath();
    if (path.includes(current)) return;
    const index = path.indexOf(currentTarget);
    const insetShadowRoot = path
        .slice(0, index)
        .find((el) => el instanceof ShadowRoot);
    if (!composed && insetShadowRoot !== shadowRoot) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    current.dispatchEvent(new event.constructor(event.type, event));
};
function useReflectEvent(
    refFrom,
    refTo,
    type,
    { capture = true, composed = true } = {}
) {
    useListener(
        refFrom,
        type,
        (event) => {
            const { current } = refTo;
            current && reflectEvent(current, event, composed);
        },
        { capture }
    );
}

function useCheckbox(type) {
    const [name] = useProp("name");
    const [value] = useProp("value");
    const [checked, setChecked] = useProp("checked");
    const refInput = useRef();
    useFormListener("reset", () => setChecked(false));
    useRender(() => {
        return /* @__PURE__ */ jsx("input", {
            type,
            name,
            value,
            ref: refInput,
            checked,
            onclick: () => setChecked(!checked),
        });
    }, [checked, name, type]);
    return refInput;
}

const Icons = {
    logo: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("g", {
                id: "icon",
                transform: "translate(-492 -270)",
                children: /* @__PURE__ */ jsx("path", {
                    id: "Path_26",
                    "data-name": "Path 26",
                    d: "M-45.825,17.48A4.48,4.48,0,0,1-41.345,13v9.52A4.48,4.48,0,0,1-45.825,27Zm5.18,2.52a2.8,2.8,0,0,1,2.8-2.8,2.8,2.8,0,0,1,2.8,2.8,2.8,2.8,0,0,1-2.8,2.8A2.8,2.8,0,0,1-40.645,20Zm2.733-4.2a2.716,2.716,0,0,1-1.933-.8,2.716,2.716,0,0,1-.8-1.933c0-.022,0-.044,0-.067h5.6c0,.025,0,.047,0,.067a2.715,2.715,0,0,1-.8,1.933,2.716,2.716,0,0,1-1.933.8Z",
                    transform: "translate(540.325 258)",
                }),
            }),
        })
    ),
    check: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-74.05-527.28l-4.243-4.243a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.536,3.536,8.486-8.486a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.415l-9.193,9.192a1,1,0,0,1-.707.293A1,1,0,0,1-74.05-527.28Z",
                transform: "translate(79 540.594)",
            }),
        })
    ),
    down: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-77.757-523.514a1,1,0,0,1,0-1.414l5.657-5.657-5.657-5.657a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l6.364,6.364a1,1,0,0,1,.293.707,1,1,0,0,1-.293.707l-6.364,6.364a1,1,0,0,1-.707.293A1,1,0,0,1-77.757-523.514Z",
                transform: "translate(-522.439 81.898) rotate(90)",
            }),
        })
    ),
    up: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M.293.293a1,1,0,0,0,0,1.414L5.949,7.364.293,13.021a1,1,0,0,0,1.415,1.415L8.072,8.072a1,1,0,0,0,0-1.415L1.708.293a1,1,0,0,0-1.415,0Z",
                transform: "translate(0.782 12.212) rotate(-90)",
            }),
        })
    ),
    left: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-69.979-523.514a1,1,0,0,0,0-1.414l-5.657-5.657,5.657-5.657a1,1,0,0,0,0-1.415,1,1,0,0,0-1.415,0l-6.364,6.364a1,1,0,0,0-.293.707,1,1,0,0,0,.293.707l6.364,6.364a1,1,0,0,0,.707.293A1,1,0,0,0-69.979-523.514Z",
                transform: "translate(82.014 538.615)",
            }),
        })
    ),
    right: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-77.757-523.514a1,1,0,0,1,0-1.414l5.657-5.657-5.657-5.657a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l6.364,6.364a1,1,0,0,1,.293.707,1,1,0,0,1-.293.707l-6.364,6.364a1,1,0,0,1-.707.293A1,1,0,0,1-77.757-523.514Z",
                transform: "translate(82.014 538.615)",
            }),
        })
    ),
    alert: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-3363.46-72.913h-10.972a2.478,2.478,0,0,1-2.2-1.3,2.48,2.48,0,0,1,.075-2.55l5.487-8.7a2.5,2.5,0,0,1,2.122-1.17,2.5,2.5,0,0,1,2.122,1.17l5.486,8.7a2.477,2.477,0,0,1,.075,2.55A2.477,2.477,0,0,1-3363.46-72.913Zm-5.486-6.591a.933.933,0,0,0-.932.932v2.485a.933.933,0,0,0,.932.932.933.933,0,0,0,.932-.932v-2.485a.933.933,0,0,0-.936-.928Zm0-3.106a.933.933,0,0,0-.932.932.933.933,0,0,0,.932.932.933.933,0,0,0,.932-.932.932.932,0,0,0-.275-.66.933.933,0,0,0-.661-.272Z",
                transform: "translate(3376.948 87.773)",
            }),
        })
    ),
    closed: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-60.443-518.378l-4.243-4.243-4.243,4.243a1,1,0,0,1-1.414,0,1,1,0,0,1,0-1.414l4.243-4.243-4.243-4.243a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l4.243,4.243,4.243-4.243a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.414l-4.243,4.243,4.243,4.243a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-60.443-518.378Z",
                transform: "translate(72.636 531.984)",
            }),
        })
    ),
    avatar: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-29.9,246.564A6.006,6.006,0,0,1-31.918,243h11.835a6,6,0,0,1-2.022,3.564A6,6,0,0,1-26,248,6,6,0,0,1-29.9,246.564ZM-22,236a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1-22,236Zm-12,0a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2A2,2,0,0,1-34,236Z",
                transform: "translate(34 -233)",
            }),
        })
    ),
    menu: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-34,246a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z",
                transform: "translate(35 -232)",
            }),
        })
    ),
    lock: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("g", {
                transform: "translate(-280 -1823)",
                children: /* @__PURE__ */ jsx("path", {
                    d: "M-34,250a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1h2v-2a4,4,0,0,1,4-4,4,4,0,0,1,4,4v2h2a1,1,0,0,1,1,1v8a1,1,0,0,1-1,1Zm4-6a2.009,2.009,0,0,0,1,1.732V247a1,1,0,0,0,1,1,1,1,0,0,0,1-1v-1.268A2.005,2.005,0,0,0-26,244a2,2,0,0,0-2-2A2,2,0,0,0-30,244Zm4-4v-2a2,2,0,0,0-2-2,2,2,0,0,0-2,2v2Z",
                    transform: "translate(316 1589)",
                }),
            }),
        })
    ),
    video: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsxs("g", {
                transform: "translate(-208 -1856)",
                children: [
                    /* @__PURE__ */ jsx("path", {
                        d: "M-17,248a1,1,0,0,1-1-1V235a1,1,0,0,1,1-1H-3a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1Zm13-2V236H-16v10Z",
                        transform: "translate(226 1623)",
                    }),
                    /* @__PURE__ */ jsx("path", {
                        d: "M2.636,1.481a1,1,0,0,1,1.728,0L6.123,4.5A1,1,0,0,1,5.259,6H1.741A1,1,0,0,1,.877,4.5Z",
                        transform: "translate(219.5 1860.5) rotate(90)",
                    }),
                ],
            }),
        })
    ),
    image: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsxs("g", {
                transform: "translate(-208 -1856)",
                children: [
                    /* @__PURE__ */ jsx("path", {
                        d: "M-14.1,245a1,1,0,0,1-.823-1.566l3.6-5.235a1,1,0,0,1,1.648,0l3.6,5.235A1,1,0,0,1-6.9,245Zm-2.9-9.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-17,235.5Z",
                        transform: "translate(229 1626)",
                        opacity: "0.75",
                    }),
                    /* @__PURE__ */ jsx("path", {
                        d: "M-10.164,242H-15a.994.994,0,0,1-.894-.553A1,1,0,0,1-15.8,240.4l2.5-3.334a.993.993,0,0,1,.8-.4.991.991,0,0,1,.8.4l1.613,2.151-.836,1.216a.985.985,0,0,0-.061,1.033.977.977,0,0,0,.82.532Z",
                        transform: "translate(225 1629)",
                        opacity: "0.5",
                    }),
                    /* @__PURE__ */ jsx("path", {
                        d: "M-17,248a1,1,0,0,1-1-1V235a1,1,0,0,1,1-1H-3a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1Zm13-2V236H-16v10Z",
                        transform: "translate(226 1623)",
                    }),
                ],
            }),
        })
    ),
    audio: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsxs("g", {
                transform: "translate(-208 -1856)",
                children: [
                    /* @__PURE__ */ jsx("rect", {
                        width: "4",
                        height: "9",
                        rx: "2",
                        transform: "translate(214 1857)",
                    }),
                    /* @__PURE__ */ jsx("path", {
                        d: "M-13,241v-1.1a5.009,5.009,0,0,1-4-4.9,1,1,0,0,1,1-1,1,1,0,0,1,1,1c0,.012,0,.023,0,.034a2.985,2.985,0,0,0,.88,2.086A2.98,2.98,0,0,0-12,238a3,3,0,0,0,3-3,1,1,0,0,1,1-1,1,1,0,0,1,1,1,5.008,5.008,0,0,1-4,4.9V241a1,1,0,0,1-1,1A1,1,0,0,1-13,241Z",
                        transform: "translate(228 1629)",
                        opacity: "0.75",
                    }),
                ],
            }),
        })
    ),
    config: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-72-524.8c-.1,0-.2,0-.3-.008a8.585,8.585,0,0,0-2.2-1.716,8.73,8.73,0,0,0-2.553-1.041,6.022,6.022,0,0,1-.319-.564A8.732,8.732,0,0,0-77-530.852a8.727,8.727,0,0,0-.372-2.724,6.026,6.026,0,0,1,.319-.564,8.694,8.694,0,0,0,2.553-1.042,8.6,8.6,0,0,0,2.2-1.715c.1-.005.2-.008.3-.008s.2,0,.3.007a8.587,8.587,0,0,0,2.2,1.715,8.692,8.692,0,0,0,2.553,1.042,6.025,6.025,0,0,1,.32.564A8.716,8.716,0,0,0-67-530.852a8.734,8.734,0,0,0,.372,2.726,6.024,6.024,0,0,1-.32.564,8.7,8.7,0,0,0-2.553,1.041,8.6,8.6,0,0,0-2.2,1.716C-71.8-524.8-71.9-524.8-72-524.8Zm0-8.054a2,2,0,0,0-2,2,2,2,0,0,0,2,2,2,2,0,0,0,2-2A2,2,0,0,0-72-532.851Z",
                transform: "translate(80 538.851)",
            }),
        })
    ),
    options: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M2 10.5A1.503 1.503 0 0 1 3.5 12 1.503 1.503 0 0 1 2 13.5 1.503 1.503 0 0 1 .5 12 1.503 1.503 0 0 1 2 10.5Zm0-5A1.503 1.503 0 0 1 3.5 7 1.503 1.503 0 0 1 2 8.5 1.503 1.503 0 0 1 .5 7 1.503 1.503 0 0 1 2 5.5Zm0-5A1.503 1.503 0 0 1 3.5 2 1.503 1.503 0 0 1 2 3.5 1.503 1.503 0 0 1 .5 2 1.503 1.503 0 0 1 2 .5Z",
                transform: "translate(6 1)",
            }),
        })
    ),
    copy: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-75-525a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v8a1,1,0,0,1-1,1Zm1-2h6v-6h-6Zm-5-2v-8a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-7v7a1,1,0,0,1-1,1A1,1,0,0,1-79-529Z",
                transform: "translate(81 540)",
            }),
        })
    ),
    dash: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M1,0H13a1,1,0,0,1,0,2H1A1,1,0,0,1,1,0Z",
                transform: "translate(1 6.952)",
            }),
        })
    ),
    plus: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16.001",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-2032.95,115.051v-6h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6v-6a1,1,0,0,1,1-1,1,1,0,0,1,1,1v6h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-2032.95,115.051Z",
                transform: "translate(116.051 2039.95) rotate(90)",
            }),
        })
    ),
    asterisk: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-74.3-527v-3.267l-2.83,1.634A1,1,0,0,1-78.5-529a1,1,0,0,1,.365-1.366L-75.3-532l-2.83-1.634A1,1,0,0,1-78.5-535a1,1,0,0,1,1.366-.365l2.83,1.634V-537a1,1,0,0,1,1-1,1,1,0,0,1,1,1v3.268l2.83-1.633a1,1,0,0,1,1.366.365,1,1,0,0,1-.366,1.366L-71.3-532l2.83,1.634A1,1,0,0,1-68.107-529a1,1,0,0,1-1.366.366l-2.83-1.634V-527a1,1,0,0,1-1,1A1,1,0,0,1-74.3-527Z",
                transform: "translate(81.634 540)",
            }),
        })
    ),
    eye: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M-76-532a3,3,0,0,1-3-3,3,3,0,0,1,3-3,3,3,0,0,1,3,3A3,3,0,0,1-76-532Zm0-4a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0-76-536Z",
                    transform: "translate(84 542.348)",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M-71-528a9.152,9.152,0,0,1-5.657-2.5A16.432,16.432,0,0,1-79-533l0-.006a16.341,16.341,0,0,1,2.339-2.494A9.152,9.152,0,0,1-71-538a9.152,9.152,0,0,1,5.657,2.5A16.258,16.258,0,0,1-63-533l0,.007a16.364,16.364,0,0,1-2.339,2.493A9.152,9.152,0,0,1-71-528Zm0-7.992c-2.912,0-5.314,2.963-5.338,2.992.023.029,2.43,2.992,5.338,2.992s5.314-2.962,5.338-2.992C-65.685-533.029-68.091-535.992-71-535.992Z",
                    transform: "translate(79 541)",
                }),
            ],
        })
    ),
    search: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 15.586 15.586",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-65.121-522.707l-3.535-3.535-.011-.011A6.465,6.465,0,0,1-72.5-525a6.507,6.507,0,0,1-6.5-6.5,6.507,6.507,0,0,1,6.5-6.5,6.507,6.507,0,0,1,6.5,6.5,6.465,6.465,0,0,1-1.253,3.833l.011.011,3.535,3.535a1,1,0,0,1,0,1.414,1,1,0,0,1-.707.293A1,1,0,0,1-65.121-522.707ZM-77-531.5a4.505,4.505,0,0,0,4.5,4.5,4.505,4.505,0,0,0,4.5-4.5,4.505,4.505,0,0,0-4.5-4.5A4.505,4.505,0,0,0-77-531.5Z",
                transform: "translate(79 538)",
            }),
        })
    ),
    file: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M-72-531h-6a1,1,0,0,1-1-1v-6h1l6,6v1Z",
                    transform: "translate(86 538.5)",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M-69-523h-8a2,2,0,0,1-2-2v-11a2,2,0,0,1,2-2h3v2h-2.5a.5.5,0,0,0-.5.5v10a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5V-531h2v6A2,2,0,0,1-69-523Zm.054-15h-1.72L-69-538h.054Z",
                    transform: "translate(81 538.499)",
                    opacity: "0.75",
                }),
            ],
        })
    ),
    drag: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M-74-526.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-526.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-526.5Zm5-5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-531.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-531.5Zm5-5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-74-536.5Zm-5,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-79-536.5Z",
                transform: "translate(83 539.5)",
            }),
        })
    ),
    home: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M3.341 15.384a1.4 1.4 0 0 1-1.361-1.431V7.39a1.468 1.468 0 0 1 .4-1.012l4.76-5.01c.261-.243.606-.375.962-.368.354.003.696.134.962.368l4.759 5.01c.258.273.402.636.4 1.012v6.562a1.398 1.398 0 0 1-1.36 1.432H3.341Zm.64-7.788v5.788h8.24V7.596L8.1 3.26 3.981 7.596Z",
                    transform: "translate(-.102 -.192)",
                }),
                /* @__PURE__ */ jsx("path", {
                    opacity: "0.75",
                    d: "M6.746 8.4h2.709v4.993H6.746z",
                    transform: "translate(-.102 -.192)",
                }),
            ],
        })
    ),
    love: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "m8 12.745 5.258-5.737a3.035 3.035 0 0 0 0-3.975 2.078 2.078 0 0 0-2.459-.541 2.078 2.078 0 0 0-.712.541L8 5.309 5.914 3.033a2.078 2.078 0 0 0-3.172 0 3.037 3.037 0 0 0 0 3.976L8 12.746v-.001Zm0 2.961L1.268 8.36a5.028 5.028 0 0 1 0-6.678A4.085 4.085 0 0 1 4.328.3a4.07 4.07 0 0 1 3.06 1.382L8 2.35l.612-.668A4.085 4.085 0 0 1 11.672.3a4.07 4.07 0 0 1 3.06 1.382 5.032 5.032 0 0 1 0 6.678L8 15.706Z",
                transform: "translate(0 -.003)",
            }),
        })
    ),
    clock: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Zm6-8a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M9 4a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0V4Z",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M10.64 9.724a1 1 0 0 0 .517-1.932l-2.898-.776a.998.998 0 1 0-.517 1.931l2.898.777Z",
                    opacity: "0.75",
                }),
            ],
        })
    ),
    profile: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: /* @__PURE__ */ jsx("path", {
                d: "M5.72 8.45C6.403 8.802 7.179 9 8 9v1-1c.821 0 1.597-.198 2.28-.55A6.003 6.003 0 0 1 14 14v.73A1.27 1.27 0 0 1 12.73 16H3.27A1.27 1.27 0 0 1 2 14.73V14a6.003 6.003 0 0 1 3.72-5.55ZM12 14H4c0-1.061.421-2.078 1.172-2.828a3.995 3.995 0 0 1 5.656 0A3.995 3.995 0 0 1 12 14ZM8 0c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4Zm0 2a2 2 0 1 1-.001 4.001A2 2 0 0 1 8 2Z",
            }),
        })
    ),
    dragX: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M3.088 7.34.132 4.315A.45.45 0 0 1 0 4c0-.117.047-.229.132-.316L3.088.659a.528.528 0 0 1 .266-.145.573.573 0 0 1 .31.017.518.518 0 0 1 .243.174A.439.439 0 0 1 4 .974v6.051a.454.454 0 0 1-.153.336.55.55 0 0 1-.369.139.537.537 0 0 1-.39-.16ZM6.912.66l2.956 3.025A.45.45 0 0 1 10 4a.451.451 0 0 1-.132.316L6.912 7.341a.528.528 0 0 1-.266.145.573.573 0 0 1-.31-.017.518.518 0 0 1-.243-.174A.439.439 0 0 1 6 7.026V.975c0-.126.055-.247.153-.336A.55.55 0 0 1 6.522.5a.537.537 0 0 1 .39.16Z",
                transform: "translate(3 4)",
            }),
        })
    ),
    dragXToLeft: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "M3.088 7.34.132 4.315A.45.45 0 0 1 0 4c0-.117.047-.229.132-.316L3.088.659a.528.528 0 0 1 .266-.145.573.573 0 0 1 .31.017.518.518 0 0 1 .243.174A.439.439 0 0 1 4 .974v6.051a.454.454 0 0 1-.153.336.55.55 0 0 1-.369.139.537.537 0 0 1-.39-.16Z",
                transform: "translate(3 4)",
            }),
        })
    ),
    dragXToRight: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx("path", {
                d: "m6.912.66 2.956 3.025A.45.45 0 0 1 10 4a.451.451 0 0 1-.132.316L6.912 7.341a.528.528 0 0 1-.266.145.573.573 0 0 1-.31-.017.518.518 0 0 1-.243-.174A.439.439 0 0 1 6 7.026V.975c0-.126.055-.247.153-.336A.55.55 0 0 1 6.522.5a.537.537 0 0 1 .39.16Z",
                transform: "translate(3 4)",
            }),
        })
    ),
    checkbox: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M13.714 4.429a2.142 2.142 0 0 0-2.143-2.143H4.429a2.142 2.142 0 0 0-2.143 2.143v7.142c0 1.184.959 2.143 2.143 2.143h7.142a2.142 2.142 0 0 0 2.143-2.143V4.429Zm-1.428 0v7.142c0 .395-.32.715-.715.715H4.429a.715.715 0 0 1-.715-.715V4.429c0-.395.32-.715.715-.715h7.142c.395 0 .715.32.715.715Z",
                    transform: "matrix(1.4 0 0 1.4 -3.2 -3.2)",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M9 8.5c0-.133-.105-.26-.293-.354A1.64 1.64 0 0 0 8 8H5c-.265 0-.52.053-.707.146C4.105 8.24 4 8.367 4 8.5c0 .133.105.26.293.354C4.48 8.947 4.735 9 5 9h3c.265 0 .52-.053.707-.146C8.895 8.76 9 8.633 9 8.5Z",
                    transform: "rotate(-135 4.545 13.159) scale(1 2)",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M9 8.5c0-.276-.28-.5-.625-.5h-3.75C4.28 8 4 8.224 4 8.5s.28.5.625.5h3.75C8.72 9 9 8.776 9 8.5Z",
                    transform: "rotate(135 11.594 12.223) scale(1.6 1.99999)",
                }),
            ],
        })
    ),
    circle: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: /* @__PURE__ */ jsx("path", {
                d: "M8 0c4.415 0 8 3.585 8 8s-3.585 8-8 8-8-3.585-8-8 3.585-8 8-8Zm0 2c3.311 0 6 2.689 6 6s-2.689 6-6 6-6-2.689-6-6 2.689-6 6-6Z",
            }),
        })
    ),
    dropdown: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M13.714 4.429a2.142 2.142 0 0 0-2.143-2.143H4.429a2.142 2.142 0 0 0-2.143 2.143v7.142c0 1.184.959 2.143 2.143 2.143h7.142a2.142 2.142 0 0 0 2.143-2.143V4.429Zm-1.428 0v7.142c0 .395-.32.715-.715.715H4.429a.715.715 0 0 1-.715-.715V4.429c0-.395.32-.715.715-.715h7.142c.395 0 .715.32.715.715Z",
                    transform: "matrix(1.4 0 0 1.4 -3.2 -3.2)",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "m7.293 10.475.018.017.021.02.018.016.019.015.019.016.019.014.02.014.021.014.02.014.021.012.021.013.022.011.022.012.022.01.023.011.022.009.023.009.023.009.024.008.023.007.024.007.024.006.024.005.024.005.03.006.024.004.025.003.024.002.025.002.025.001.025.001h.024l.025-.001.025-.001.025-.002.024-.002.025-.003.024-.004.024-.004.024-.005.024-.005.024-.006.023-.007.023-.007.024-.008.023-.008.022-.009.023-.009.022-.01.022-.01.022-.011.022-.012.021-.012.021-.012.021-.014.02-.013.02-.014.02-.015.019-.015.019-.016.019-.016.018-.016.018-.017.009-.009 3.536-3.536a1.002 1.002 0 0 0-.707-1.707c-.266 0-.52.106-.708.293L8 8.354 5.172 5.525a1.004 1.004 0 0 0-1.415 0 1.003 1.003 0 0 0 0 1.414l3.536 3.536Z",
                    transform: "translate(0 .268)",
                }),
            ],
        })
    ),
    switch: template(
        /* @__PURE__ */ jsxs("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: [
                /* @__PURE__ */ jsx("path", {
                    d: "M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0 0 10h6a5 5 0 0 0 5-5Zm-2 0a3 3 0 0 0-3-3H5a3 3 0 1 0 0 6h6a3 3 0 0 0 3-3Z",
                }),
                /* @__PURE__ */ jsx("path", {
                    d: "M12 8c0-1.105-.672-2-1.5-2S9 6.895 9 8s.672 2 1.5 2S12 9.105 12 8Z",
                    transform: "matrix(1.33333 0 0 1 -3 0)",
                }),
            ],
        })
    ),
    textarea: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: /* @__PURE__ */ jsx("path", {
                d: "M15.159 1.184a.999.999 0 0 0-1.414 0L1.184 13.745a.999.999 0 1 0 1.414 1.414L15.159 2.598a.999.999 0 0 0 0-1.414Zm-.081 11.395a.999.999 0 0 0-1.414 0l-1.085 1.085a.999.999 0 1 0 1.414 1.414l1.085-1.085a1 1 0 0 0 0-1.414Zm-.037-5.62a1.002 1.002 0 0 0-1.415 0l-6.667 6.667a1.002 1.002 0 0 0 0 1.415c.391.39 1.024.39 1.415 0l6.667-6.667c.39-.391.39-1.024 0-1.415Z",
            }),
        })
    ),
    zero: template(
        /* @__PURE__ */ jsx("svg", {
            viewBox: "0 0 16 16",
            style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2",
            children: /* @__PURE__ */ jsx("path", {
                d: "M13 6.5a5 5 0 0 0-10 0v3a5 5 0 0 0 10 0v-3Zm-2.232-1.16-4 6.927A3 3 0 0 0 11 9.531V6.5c0-.411-.083-.803-.232-1.16ZM9.339 3.815A3 3 0 0 0 5 6.5v3.031c0 .463.105.901.292 1.293l4.047-7.009Z",
            }),
        })
    ),
};

const PrimitiveTokens = css`
    @tokens "./tokens.yaml" (import: generic) (values: true);
    :host {
        font-size: var(--font-size);
        line-height: var(--font-line);
        --outline-color: var(--color-outline);
        --outline: var(--outline-width) var(--outline-style)
            var(--outline-color);
    }
    :host([disabled]) {
        opacity: var(--opacity);
        pointer-events: none;
    }
    :host([focused]:not([disabled])) {
        --outline-color: var(--color-outline-on);
    }
`;
const GenericStateTokens = css`
    @tokens "./tokens.yaml" (filter: state);
`;
const NavigationTokens = css`
    @tokens "./tokens.yaml" (import: navigation);
`;
const ButtonTokens = css`
    @tokens "./tokens.yaml" (import: button);
`;
const DropdownTokens = css`
    @tokens "./tokens.yaml" (import: dropdown);
`;
const CheckboxTokens = css`
    @tokens "./tokens.yaml" (import: checkbox);
`;
const RadioTokens = css`
    @tokens "./tokens.yaml" (import: radio);
`;
const SwitchTokens = css`
    @tokens "./tokens.yaml" (import: switch);
`;
const InputTokens = css`
    @tokens "./tokens.yaml" (import: input);
`;

function icon({ type, size, icons, color }) {
    const Element = icons[type];
    return /* @__PURE__ */ jsxs("host", {
        shadowDom: true,
        children: [
            /* @__PURE__ */ jsx(Element, { cloneNode: true, staticNode: true }),
            /* @__PURE__ */ jsxs("style", {
                children: [
                    size && `:host{--width: ${size};}`,
                    color && `:host{--color: ${color};}`,
                ],
            }),
        ],
    });
}
icon.props = {
    type: {
        type: String,
        reflect: true,
        value: () => "logo",
    },
    size: {
        type: String,
        reflect: true,
    },
    color: {
        type: String,
        reflect: true,
    },
    icons: {
        type: Object,
        value: Icons,
    },
};
icon.styles = [
    PrimitiveTokens,
    css`
        :host {
            width: var(--width, var(--size-icon));
            color: var(--color, currentColor);
            display: inline-flex;
            align-items: center;
            justify-items: center;
        }
        svg {
            width: 100%;
            margin: auto;
        }
        path {
            fill: currentColor;
        }
    `,
];
const Icon = c(icon);

customElements.define("atomico-ui-icon", Icon);

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
        value: true,
    },
};

function checkbox({ tabIndex }) {
    const host = useHost();
    const refInput = useCheckbox("radio");
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");
    useReflectEvent(host, refInput, "click");
    return /* @__PURE__ */ jsx("host", {
        shadowDom: true,
        children: /* @__PURE__ */ jsx("button", {
            class: "checkbox",
            disabled,
            tabIndex: disabled ? -1 : tabIndex,
            onfocus: () => setFocused(true),
            onblur: () => setFocused(false),
            children: /* @__PURE__ */ jsx("div", {
                class: "checkbox-box",
                children: /* @__PURE__ */ jsx("div", {
                    class: "checkbox-state",
                    children: /* @__PURE__ */ jsx(Icon, { type: "check" }),
                }),
            }),
        }),
    });
}
checkbox.props = {
    ...InputGenericProps,
    value: {
        type: null,
        value: "on",
    },
    tabIndex: { type: Number },
    checked: { type: Boolean, reflect: true },
};
checkbox.styles = [
    PrimitiveTokens,
    CheckboxTokens,
    css`
        :host {
            --box-width: 0.6;
            --box-height: var(--box-width);
            --state-unit: 100%;
            --state-width: 1;
            --state-height: var(--state-width);
            --state-radius: 0px;
            --state-transform: none;
            --state-transition: 0.25s;
            --background: var(--color-checkbox);
            --background-state: var(--color-state);
            --color: var(--color-content);
            --border-color: var(--color-border);
            color: var(--color);
            display: inline-block;
        }
        :host([checked]) {
            --background: var(--color-checkbox-on);
            --background-state: var(--color-state-on);
            --border-color: var(--color-border-on);
            --color: var(--color-content-on);
        }
        .checkbox {
            width: var(--size-height);
            height: var(--size-height);
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            outline: none;
        }
        .checkbox-box {
            width: calc(100% * var(--box-width));
            height: calc(100% * var(--box-height));
            margin: auto;
            border-radius: var(--radius);
            border: var(--border-width) var(--border-style) var(--border-color);
            background: var(--background);
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            outline: var(--outline);
        }
        .checkbox-state {
            width: calc(var(--state-unit) * var(--state-width));
            height: calc(var(--state-unit) * var(--state-height));
            border-radius: var(--state-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--background-state);
            margin: auto;
            transform: var(--state-transform);
            transition: var(--state-transition);
        }
    `,
];
const Checkbox = c(checkbox);

customElements.define("forma-checkbox", Checkbox);

function component({ tabIndex, value }) {
    const host = useHost();
    const refInput = useFormInputRadio(/* @__PURE__ */ jsx("input", { value }));
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");
    useReflectEvent(host, refInput, "click");
    return /* @__PURE__ */ jsx("host", {
        shadowDom: true,
        children: /* @__PURE__ */ jsx("button", {
            class: "checkbox",
            disabled,
            tabIndex: disabled ? -1 : tabIndex,
            onfocus: () => setFocused(true),
            onblur: () => setFocused(false),
            children: /* @__PURE__ */ jsx("div", {
                class: "checkbox-box",
                children: /* @__PURE__ */ jsx("div", {
                    class: "checkbox-state",
                }),
            }),
        }),
    });
}
component.props = {
    ...Checkbox.props,
};
component.styles = [
    Checkbox.styles,
    RadioTokens,
    css`
        :host {
            --state-width: 0.6;
            --radius: var(--radius-circle);
            --state-unit: calc(var(--size-height) * var(--box-height));
            --state-radius: var(--radius-circle);
        }
    `,
];
const Radio = c(component);

export { Radio };
