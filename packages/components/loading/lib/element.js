import { jsx, jsxs } from 'atomico/jsx-runtime';
import { c, css } from 'atomico';
import { PrimitiveTokens } from '@formas/tokens';

const Loading = c(
  () => /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 20 20", children: [
    /* @__PURE__ */ jsx("mask", { id: "mask", children: /* @__PURE__ */ jsx(
      "circle",
      {
        cx: "10",
        cy: "10",
        r: "8",
        stroke: "white",
        "stroke-width": "3",
        fill: "transparent"
      }
    ) }),
    /* @__PURE__ */ jsx("foreignObject", { width: "20", height: "20", mask: "url(#mask)", children: /* @__PURE__ */ jsx("div", { class: "gradient" }) }),
    /* @__PURE__ */ jsx("circle", { cx: "10", cy: "2", r: "2", fill: "black" })
  ] }) }),
  {
    props: {
      small: { type: Boolean, reflect: true }
    },
    styles: [
      PrimitiveTokens,
      css`:host{width:1em;height:1em;display:inline-block}.gradient{width:100%;height:100%;background:conic-gradient(transparent 0deg,var(--color-contrast-100) 360deg)}svg{animation:rotate 1s infinite linear;border-radius:100%;overflow:hidden}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}`
    ]
  }
);

export { Loading };
