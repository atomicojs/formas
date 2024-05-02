import { jsx, jsxs, Fragment } from 'atomico/jsx-runtime';
import { useClickPress, useRender, useDisabled, usePropProxy, useSlot, useCssLightDom } from '@atomico/hooks';
import { Button } from '@formas/button';
import { Icon } from '@formas/icon';
import { InputGenericProps } from '@formas/props';
import { css, useHost, c, useRef, useProp } from 'atomico';
import { serialize } from 'atomico/utils';
import { InputLayout } from './layout.js';

const cssLightdom = css`input[type=file]::file-selector-button,input[type=file]::-webkit-file-selector-button{display:none}input[type=date]::-webkit-inner-spin-button,input[type=date]::-webkit-calendar-picker-indicator,input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button,input[type=search]::-webkit-search-cancel-button{display:none;-webkit-appearance:none;-moz-appearance:none;-o-appearance:none;appearance:none}input[type=number]{-moz-appearance:textfield}`;
const ROOT = Symbol();
function useCssLightDOM() {
  const { current } = useHost();
  current[ROOT] = current[ROOT] || current.getRootNode();
}
const Input = c(
  (props) => {
    const refInput = useRef();
    const [focused, setFocused] = useProp("focused");
    const refIncrement = useRef();
    const refDecrement = useRef();
    useClickPress(refIncrement, () => {
      refInput.current.stepUp();
    });
    useClickPress(refDecrement, () => {
      refInput.current.stepDown();
    });
    useRender(() => /* @__PURE__ */ jsx(
      "input",
      {
        slot: "input",
        ...props,
        ref: refInput,
        onfocus: () => setFocused(true),
        onblur: () => setFocused(false)
      }
    ));
    useDisabled();
    usePropProxy("value", {
      get() {
        return refInput.current?.value;
      }
    });
    const refIconPrefix = useRef();
    const slotIconPrefix = useSlot(refIconPrefix);
    const refIconSuffix = useRef();
    const slotIconSuffix = useSlot(refIconSuffix);
    useCssLightDom(cssLightdom);
    const isTypeFile = props.type === "file";
    const handlerDragOver = isTypeFile && ((event) => {
      event.preventDefault();
    });
    const handlerDrop = isTypeFile && ((event) => {
      event.preventDefault();
      const data = new DataTransfer();
      [...event.dataTransfer.files].slice(
        0,
        props.multiple ? event.dataTransfer.files.length : 1
      ).forEach((file) => data.items.add(file));
      refInput.current.files = data.files;
    });
    return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx(
      "div",
      {
        ondragover: () => {
          if (props.type === "file") {
            setFocused(true);
          }
        },
        ondragend: () => {
          setFocused(false);
        },
        children: /* @__PURE__ */ jsxs(
          InputLayout,
          {
            class: "layout",
            focused,
            small: props.small,
            disabled: props.disabled,
            layout: serialize(
              slotIconPrefix.length && "prefix",
              (slotIconSuffix.length || props.type === "file" || props.type === "search" || props.type === "number" || props.type === "date") && "suffix"
            ),
            onClickIn: (event) => {
              if (event.detail === "container") {
                refInput.current?.focus();
                refInput.current?.click();
              }
            },
            ondragover: handlerDragOver,
            ondrop: handlerDrop,
            children: [
              /* @__PURE__ */ jsx("slot", { slot: "prefix", name: "prefix" }),
              /* @__PURE__ */ jsx(
                "slot",
                {
                  ref: refIconPrefix,
                  slot: "icon-prefix",
                  name: "icon-prefix"
                }
              ),
              /* @__PURE__ */ jsx("slot", { slot: "input", name: "input" }),
              /* @__PURE__ */ jsx("slot", { slot: "suffix", name: "suffix" }),
              /* @__PURE__ */ jsx(
                "slot",
                {
                  ref: refIconSuffix,
                  slot: "icon-suffix",
                  name: "icon-suffix",
                  children: isTypeFile ? /* @__PURE__ */ jsx(
                    Button,
                    {
                      ghost: true,
                      small: props.small,
                      onclick: (event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        refInput.current?.click();
                      },
                      children: /* @__PURE__ */ jsx(
                        Icon,
                        {
                          slot: "prefix",
                          type: "attachment"
                        }
                      )
                    }
                  ) : props.type === "date" ? /* @__PURE__ */ jsx(Button, { ghost: true, small: props.small, children: /* @__PURE__ */ jsx(Icon, { slot: "prefix", type: "calendar" }) }) : props.type === "search" ? /* @__PURE__ */ jsx(
                    Button,
                    {
                      ghost: true,
                      small: props.small,
                      onclick: () => {
                        refInput.current?.showPicker();
                      },
                      children: /* @__PURE__ */ jsx(Icon, { slot: "prefix", type: "search" })
                    }
                  ) : props.type === "number" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        ghost: true,
                        small: props.small,
                        ref: refDecrement,
                        children: /* @__PURE__ */ jsx(Icon, { slot: "prefix", type: "dash" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        ghost: true,
                        small: props.small,
                        ref: refIncrement,
                        children: /* @__PURE__ */ jsx(Icon, { slot: "prefix", type: "plus" })
                      }
                    )
                  ] }) : null
                }
              )
            ]
          }
        )
      }
    ) });
  },
  {
    props: {
      ...InputGenericProps,
      type: String,
      list: String,
      pattern: String,
      min: Number,
      max: Number,
      minLength: Number,
      maxLength: Number,
      placeholder: String,
      step: Number,
      multiple: Boolean,
      loading: {
        type: Boolean,
        reflect: true
      }
    },
    styles: css`:host([type="date"]) .layout,:host([type="search"]) .layout,:host([type="file"]) .layout,:host([type="number"]) .layout{--padding-right: 0}:host([type="file"]) .layout{--border-style: dashed}`
  }
);

export { Input };
