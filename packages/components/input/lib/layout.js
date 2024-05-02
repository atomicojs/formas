import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useListener } from '@atomico/hooks/use-listener';
import { DropdownLayout } from '@formas/dropdown';
import { PrimitiveTokens, ActionTokens } from '@formas/tokens';
import { c, useRef, useHost, useEvent, useProp, css } from 'atomico';

const InputLayout = c(
  ({
    enableDropdown
  }) => {
    const refWindow = useRef(window);
    const refHost = useHost();
    const refInputSlot = useRef();
    const dispatch = useEvent("ClickIn");
    const [showDropdown, setShowDropdown] = useProp("showDropdown");
    useListener(refWindow, "click", (event) => {
      if (event.isTrusted && !event.composedPath().includes(refHost.current)) {
        setShowDropdown(false);
      }
    });
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          class: "input",
          staticNode: true,
          onclick: (event) => {
            if (!event.composedPath().includes(refInputSlot.current))
              dispatch("container");
            if (enableDropdown)
              setShowDropdown((value) => !value);
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                class: "action action-prefix",
                onclick: () => dispatch("action"),
                children: /* @__PURE__ */ jsxs("div", { class: "action-row", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      onclick: () => dispatch("icon-prefix"),
                      class: "icon icon-prefix",
                      children: /* @__PURE__ */ jsx("slot", { name: "icon-prefix" })
                    }
                  ),
                  /* @__PURE__ */ jsx("slot", { name: "prefix" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: refInputSlot,
                class: "input-slot",
                onclick: () => {
                  dispatch("input");
                },
                children: /* @__PURE__ */ jsx("slot", { name: "input" })
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                class: "action action-suffix",
                onclick: () => dispatch("action"),
                children: /* @__PURE__ */ jsxs("div", { class: "action-row", children: [
                  /* @__PURE__ */ jsx("slot", { name: "suffix" }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      onclick: () => dispatch("icon-suffix"),
                      class: "icon icon-suffixs",
                      children: /* @__PURE__ */ jsx("slot", { name: "icon-suffix" })
                    }
                  )
                ] })
              }
            )
          ]
        }
      ),
      enableDropdown && /* @__PURE__ */ jsx("div", { class: "dropdown", onclick: () => dispatch("dropdown"), children: /* @__PURE__ */ jsx(
        DropdownLayout,
        {
          show: showDropdown,
          reference: refHost.current,
          class: "dropdown-component",
          children: /* @__PURE__ */ jsx("slot", { name: "dropdown" })
        }
      ) })
    ] });
  },
  {
    props: {
      small: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      focused: { type: Boolean, reflect: true },
      showDropdown: Boolean,
      enableDropdown: Boolean,
      enableIconPrefix: Boolean,
      enableIconSuffix: Boolean
    },
    styles: [
      PrimitiveTokens,
      ActionTokens,
      css`:host{--background: var(--color-invert);--size-icon-box: calc( var(--size) - (var(--border-size) * 2) );--prefix-display: none;--suffix-display: none;--padding-between: calc(var(--space) * 2);--padding-left: var(--padding-between);--padding-right: var(--padding-between)}:host([disabled]){pointer-events:none;opacity:var(--opacity)}:host([focused]){---outline: var(--outline)}:host([layout="prefix"]),:host([layout="prefix suffix"]){--prefix-display: block}:host([layout="suffix"]),:host([layout="prefix suffix"]){--suffix-display: block}.input{display:flex;background:var(--background);border-radius:var(--radius);border:var(--border);min-height:var(--size);box-sizing:border-box;position:relative;outline:var(---outline);outline-offset:var(--outline-offset);transition:var(--transition);padding:0 var(--padding-right) 0 var(--padding-left);align-items:center;gap:var(--space)}.input-slot{flex:0%}.action-prefix{display:var(--prefix-display)}.action-suffix{display:var(--suffix-display)}.action-row{display:flex;box-sizing:border-box;min-width:var(--space);height:100%}.icon{display:flex;align-items:center;justify-content:center}::slotted([slot="input"]){width:100%;height:100%;padding:0;border:0px;outline:none;background:transparent;font-size:unset;font-family:unset}.inputs{display:flex;flex:0%}.dropdown{width:100%;height:1px;position:relative}.dropdown-component{width:100%}`
    ]
  }
);

export { InputLayout };
