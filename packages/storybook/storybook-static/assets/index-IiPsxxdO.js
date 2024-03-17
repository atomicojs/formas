import{f,b as h,d as p,c as v,j as r,a as m}from"./jsx-runtime-BESKN28P.js";import{b as n,u as k,a as b,c as y}from"./index-mkNy8REe.js";import{c as w}from"./css-DxnGaO7F.js";import{u as g}from"./index-AhVMmnpE.js";import{a as u,C as x}from"./index-BMkbn-Dw.js";import{P as z,A as R,c as E}from"./index-CdvvZK18.js";function L(c){const e=f(),[i,o]=n("checked"),[t]=n("name");return u("change",({currentTarget:s,target:a})=>{if(a instanceof HTMLInputElement){if(s instanceof HTMLFormElement){const l=s.elements[t];l instanceof RadioNodeList&&[...l].forEach(d=>{d.checked=a===d})}o(a===e.current)}}),u("reset",()=>o(!1)),k(()=>({...c,props:{...c.props,ref:e,type:"radio",name:t,checked:i}})),g(e,"change",s=>{o(s.currentTarget.checked)}),h(()=>{o(e.current.checked)},[]),e}const T=p(({tabIndex:c,value:e})=>{const i=v(),o=L(r("input",{value:e})),t=b(),[,s]=n("focused");return y(i,o,"click"),r("host",{shadowDom:!0,children:r("button",{class:"container",disabled:t,tabIndex:t?-1:c,onfocus:()=>s(!0),onblur:()=>s(!1),children:m("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[r("circle",{class:"circle-1"}),r("circle",{class:"circle-2"}),r("circle",{class:"circle-3"}),r("circle",{class:"circle-4"})]})})})},{props:x.props,styles:[z,R,E,w`:host {
                    --radius: var(--radius-circle);
                    ---opacity: 0;
                    ---stroke-color: var(--color-contrast-30);
                    ---outline: none;
                    ---offset: 60;
                    ---scale: 0.75;
                    display: inline-block;
                }
                :host([checked]) {
                    ---opacity: 1;
                    ---stroke-color: transparent;
                    ---offset: 0;
                    ---scale: 1;
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
                    width: var(--size);
                    height: var(--size);
                    display: grid;
                    place-content: center;
                    cursor: pointer;
                }
                svg {
                    width: var(--size-switch);
                    height: var(--size-switch);
                    border-radius: var(--radius);
                    outline: var(---outline);
                    outline-offset: var(--outline-offset);
                }
                .circle-1,
                .circle-2,
                .circle-3,
                .circle-4 {
                    cx: 10;
                    cy: 10;
                    r: 9;
                    fill: transparent;
                }
                .circle-1 {
                    r: 10;
                    fill: var(--color-invert);
                }
                .circle-2 {
                    stroke-width: var(--stroke-size);
                    stroke: var(---stroke-color);
                    transition: var(--transition);
                }
                .circle-3 {
                    stroke-width: var(--stroke-size);
                    stroke-dasharray: 60;
                    stroke-dashoffset: var(---offset);
                    transition: var(--transition);
                    stroke-linecap: round;
                    stroke: var(--color-contrast-100);
                }
                .circle-4 {
                    stroke-width: var(--stroke-size);
                    opacity: var(---opacity);
                    transform: scale(var(---scale));
                    transform-origin: center;
                    transition: var(--transition-medium);
                    fill: var(--color-contrast-100);
                    r: 6;
                }`]});customElements.define("atomico-ui-radio",T);export{T as R};
