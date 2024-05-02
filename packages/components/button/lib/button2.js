import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useDisabled } from '@atomico/hooks/use-disabled';
import { useReflectEvent } from '@atomico/hooks/use-reflect-event';
import { useRender } from '@atomico/hooks/use-render';
import { useSlot } from '@atomico/hooks/use-slot';
import { InputGenericProps } from '@formas/props';
import { PrimitiveTokens, ActionTokens, ButtonTokens } from '@formas/tokens';
import { c, useRef, useHost, useProp, css } from 'atomico';
import { serialize } from 'atomico/utils';
import { ButtonActive } from './button-active.js';

const Button = c(
  ({ name, href, value, type, badge, color, outline }) => {
    const refPrefix = useRef();
    const refSuffix = useRef();
    const refContent = useRef();
    const refBadge = useRef();
    const refButtonLightDom = useRef();
    const refButtonShadowDom = useHost();
    const refButtonActive = useRef();
    const slotPrefix = useSlot(refPrefix);
    const slotSuffix = useSlot(refSuffix);
    const slotBadge = useSlot(refBadge);
    const slotContent = useSlot(
      refContent,
      (el) => el instanceof Text ? !!el.textContent?.trim() : true
    );
    const disabled = useDisabled();
    const [, setFocused] = useProp("focused");
    useReflectEvent(refButtonShadowDom, refButtonLightDom, "click");
    useRender(
      href ? /* @__PURE__ */ jsx(
        "a",
        {
          slot: "button",
          tabindex: "-1",
          href,
          ref: refButtonLightDom,
          staticNode: true
        }
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          type: type || "submit",
          name,
          value,
          ref: refButtonLightDom,
          slot: "button",
          tabindex: "-1",
          disabled
        }
      )
    );
    return /* @__PURE__ */ jsxs(
      "host",
      {
        shadowDom: true,
        onclick: (event) => {
          if (refButtonActive.current?.setEvent) {
            refButtonActive.current.setEvent(event);
          }
        },
        color: color ? color : outline ? "primary" : null,
        layout: serialize(
          slotPrefix.length && "prefix",
          slotContent.length && "content",
          slotSuffix.length && "suffix"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              class: "container",
              onfocus: () => !badge && setFocused(true),
              onblur: () => !badge && setFocused(false),
              tabIndex: badge ? -1 : null,
              staticNode: true,
              children: [
                /* @__PURE__ */ jsx("div", { class: "background", children: /* @__PURE__ */ jsx("slot", { name: "background", children: /* @__PURE__ */ jsx(
                  ButtonActive,
                  {
                    ref: refButtonActive,
                    class: "effect"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs("div", { class: "row", children: [
                  /* @__PURE__ */ jsx("div", { class: "action prefix", children: /* @__PURE__ */ jsx("div", { class: "icon", children: /* @__PURE__ */ jsx("slot", { ref: refPrefix, name: "prefix" }) }) }),
                  /* @__PURE__ */ jsx("div", { class: "content", children: /* @__PURE__ */ jsx("slot", { ref: refContent }) }),
                  /* @__PURE__ */ jsx("div", { class: "action suffix", children: /* @__PURE__ */ jsx("div", { class: "icon", children: /* @__PURE__ */ jsx("slot", { ref: refSuffix, name: "suffix" }) }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx("style", { children: `:host{--color: var(--color-${color}, var(--color-status-${color}-container))!important;}` })
        ]
      }
    );
  },
  {
    props: {
      ...InputGenericProps,
      ghost: { type: Boolean, reflect: true },
      type: {
        type: String,
        reflect: true,
        value: "submit"
      },
      href: { type: String, reflect: true },
      circle: { type: Boolean, reflect: true },
      outline: { type: Boolean, reflect: true },
      badge: { type: Boolean, reflect: true },
      color: { type: String, value: "primary" }
    },
    styles: [
      PrimitiveTokens,
      ActionTokens,
      ButtonTokens,
      css`:host{display:inline-block;white-space:nowrap;---border: none;---color: var(--color);---outline: none;---radius: var(--radius);---row: max-content auto max-content;---prefix-display: block;---content-display: flex;---suffix-display: block;---size: var(--size)}:host([outline]){---border: var(--border);---color: transparent}:host([focused]){---outline: var(--outline)}:host([circle]){---radius: var(--radius-circle)}:host([layout="prefix"]){---content-display: none;---suffix-display: none;---row: auto}:host([layout="content"]){---suffix-display: none;---prefix-display: none;---row: auto}:host([layout="suffix"]){---row: auto;---content-display: none;---prefix-display: none}:host([layout="prefix content"]){---row: max-content auto;---suffix-display: none}:host([layout="content suffix"]){---row: auto max-content;---prefix-display: none}:host([layout="content"]){---row: auto;---prefix-display: none;---suffix-display: none}:host([layout="prefix"]),:host([layout="suffix"]){--space: 0}:host([ghost]){---color: transparent}:host-context(.action-suffix),:host-context(.action-prefix){---size: calc(var(--size) - (var(--border-size) * 2))}.container{all:unset;position:relative;height:var(---size);width:100%;min-width:var(---size);cursor:pointer;border:var(---border);border-radius:var(---radius);background:var(---color);outline:var(---outline);outline-offset:var(--outline-offset);transition:var(--transition);box-sizing:border-box}.content{display:var(---content-display);gap:var(--space);align-items:center;line-height:0}.prefix{display:var(---prefix-display)}.suffix{display:var(---suffix-display)}.row{display:grid;align-items:center;position:relative;z-index:1;gap:var(--space);padding:0 calc(var(--space) * 2);grid-template-columns:var(---row)}.background{width:100%;height:100%;position:absolute;top:0;left:0;box-sizing:border-box}.icon{display:grid;place-content:center}.background{--color-active: var(--color-contrast-15);border-radius:var(---radius);overflow:hidden}`
    ]
  }
);

export { Button };
