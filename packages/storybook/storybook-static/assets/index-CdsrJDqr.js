import{d as a,c as i,j as o,a as n}from"./jsx-runtime-BESKN28P.js";import{a as l,b as h,c as f}from"./index-mkNy8REe.js";import{c as u}from"./css-DxnGaO7F.js";import{C as d,u as k}from"./index-BMkbn-Dw.js";import{P as v,A as p,c as x}from"./index-CdvvZK18.js";const m=a(({tabIndex:r})=>{const e=i(),c=k("checkbox"),t=l(),[,s]=h("focused");return f(e,c,"click"),o("host",{shadowDom:!0,children:o("button",{class:"container",disabled:t,tabIndex:t?-1:r,onfocus:()=>s(!0),onblur:()=>s(!1),children:n("svg",{width:"32",height:"20",viewBox:"0 0 32 20",children:[o("rect",{class:"rect-1"}),o("rect",{class:"rect-2"}),o("rect",{class:"rect-3"}),o("circle",{r:"6",cx:"10",cy:"10"})]})})})},{props:d.props,styles:[v,p,x,u`:host {
                    ---stroke-color: var(--color-contrast-30);
                    ---stroke-offset: 90;
                    ---x: 0;
                    display: inline-block;
                }
                :host([checked]) {
                    ---stroke-color: var(--color-contrast-100);
                    ---stroke-offset: 0;
                    ---x: 12px;
                }
                :host([focused]) {
                    ---outline: var(--outline);
                }
                :host([disabled]) {
                    opacity: var(--opacity);
                    pointer-events: none;
                }
                .container {
                    all: unset;
                    cursor: pointer;
                }
                svg {
                    border-radius: 100vh;
                    outline: var(---outline);
                    outline-offset: var(--outline-offset);
                }
                .rect-2,
                .rect-3 {
                    width: 30px;
                    height: 18px;
                    x: 1;
                    y: 1;
                    stroke-width: var(--stroke-size);
                    rx: 9;
                    fill: transparent;
                }
                circle {
                    fill: var(---stroke-color);
                    transition: var(--transition-medium);
                    transform: translateX(var(---x));
                }
                .rect-1 {
                    fill: var(--color-invert);
                    width: 100%;
                    height: 100%;
                    rx: 10;
                }
                .rect-2 {
                    stroke: var(--color-contrast-30);
                }
                .rect-3 {
                    stroke: var(---stroke-color);
                    stroke-dasharray: 90;
                    stroke-dashoffset: var(---stroke-offset);
                    transition: var(--transition);
                    stroke-linecap: round;
                }`]});customElements.define("forma-switch",m);export{m as S};
