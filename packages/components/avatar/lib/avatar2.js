import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useRender } from '@atomico/hooks/use-render';
import { PrimitiveTokens, ActionTokens } from '@formas/tokens';
import { c, css } from 'atomico';

const Avatar = c(
  ({ status, statusPosition, placeholder }) => {
    useRender(
      () => placeholder ? /* @__PURE__ */ jsx("host", { children: /* @__PURE__ */ jsx("strong", { children: placeholder }) }) : null,
      [placeholder]
    );
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
      /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "100%",
          height: "100%",
          viewBox: "0 0 40 40",
          class: "mask",
          children: [
            /* @__PURE__ */ jsx("mask", { id: "mask", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M40,28.708L40,0L0,0L0,40L28.708,40C27.048,38.534 26,36.389 26,34L26,34C26,29.582 29.582,26 34,26L34,26C36.389,26 38.534,27.048 40,28.708Z",
                fill: "white",
                transform: `rotate(${statusPosition === "top left" ? "180" : statusPosition === "top right" ? "270" : statusPosition === "bottom left" ? "90" : "0"} 20 20)`
              }
            ) }),
            /* @__PURE__ */ jsx(
              "foreignObject",
              {
                width: "40",
                height: "40",
                mask: status ? "url(#mask)" : "",
                children: /* @__PURE__ */ jsx("slot", {})
              }
            )
          ]
        }
      ),
      status && /* @__PURE__ */ jsx("div", { class: "status", children: /* @__PURE__ */ jsx("slot", { name: "status" }) })
    ] });
  },
  {
    props: {
      circle: {
        type: Boolean,
        reflect: true
      },
      small: {
        type: Boolean,
        reflect: true
      },
      status: {
        type: String,
        reflect: true
      },
      statusPosition: {
        type: String,
        reflect: true,
        value: () => "bottom right"
      },
      placeholder: {
        type: String,
        reflect: true
      }
    },
    styles: [
      PrimitiveTokens,
      ActionTokens,
      css`:host{width:var(--size);height:var(--size);display:inline-block;position:relative;--color: var(--color-status-success)}:host([circle]){--radius: var(--radius-circle)}:host([status="info"]){--color: var(--color-status-info)}:host([status="warning"]){--color: var(--color-status-warning)}:host([status="danger"]){--color: var(--color-status-danger)}::slotted(*){width:100%;height:100%;display:flex;align-items:center;justify-content:center}.mask{width:100%;height:100%;overflow:hidden;border-radius:var(--radius)}.status{width:30%;height:30%;position:absolute;background:var(--color);border-radius:100%}:host([status-position="bottom right"]) .status{bottom:0;right:0}:host([status-position="bottom left"]) .status{bottom:0;left:0}:host([status-position="top left"]) .status{top:0;left:0}:host([status-position="top right"]) .status{top:0;right:0}`
    ]
  }
);

export { Avatar };
