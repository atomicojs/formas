import{f as u,k as d,j as e,d as h,c as f,a as v}from"./jsx-runtime-BESKN28P.js";import{d as p,b as n,u as k,I as m,a as b,c as x}from"./index-mkNy8REe.js";import{I as g}from"./index-DMqOXlvy.js";import{P as y,A as w,c as I}from"./index-CdvvZK18.js";import{c as C}from"./css-DxnGaO7F.js";import{u as P}from"./index-AhVMmnpE.js";function j(){return p("form")}function z(o,r,s){P(j(),o,r,s)}function E(o){const[r]=n("name"),[s]=n("value"),[t,c]=n("checked"),a=u(),i=d("change",{bubbles:!0,composed:!0,base:Event});return z("reset",()=>{c(!1),i()}),k(()=>e("input",{type:o,name:r,value:s,ref:a,checked:t,onchange:l=>{l.stopPropagation()},onclick:()=>{c(!t),i()}}),[t,r,o]),a}const F=h(({tabIndex:o})=>{const r=f(),s=E("radio"),t=b(),[,c]=n("focused");return x(r,s,"click"),e("host",{shadowDom:!0,children:e("button",{class:"container",disabled:t,tabIndex:t?-1:o,onfocus:()=>c(!0),onblur:()=>c(!1),staticNode:!0,children:v("svg",{width:"20",height:"20",viewBox:"0 0 20 20",children:[e("rect",{class:"rect-1"}),e("rect",{class:"rect-2"}),e("rect",{class:"rect-3"}),e("foreignObject",{x:0,y:0,width:"20",height:"20",children:e("div",{class:"icon",children:e(g,{type:"check"})})})]})})})},{props:{...m,value:{type:String,value:"on"},tabIndex:{type:Number},checked:{type:Boolean,reflect:!0}},styles:[y,w,I,C`:host {
                    ---stroke-color: var(--color-contrast-30);
                    ---fill: transparent;
                    ---color: var(--color-invert);
                    ---icon-color: var(--color-invert);
                    ---outline: none;
                    ---stroke-offset: 70;
                    display: inline-block;
                }
                :host([focused]) {
                    ---outline: var(--outline);
                }
                :host([disabled]) {
                    opacity: var(--opacity);
                    pointer-events: none;
                }
                :host([checked]) {
                    ---stroke-color: var(--color-contrast-100);
                    ---color: var(--color-contrast-100);
                    ---icon-color: var(--color-invert);
                    ---fill: var(--color-contrast-100);
                    ---stroke-offset: 0;
                }
                .container {
                    all: unset;
                    height: var(--size);
                    width: var(--size);
                    display: grid;
                    place-content: center;
                    cursor: pointer;
                }
                svg {
                    outline: var(---outline);
                    border-radius: var(--radius);
                    outline-offset: var(--outline-offset);
                }
                rect {
                    width: 18px;
                    height: 18px;
                    rx: var(--radius);
                    fill: transparent;
                    x: 1;
                    y: 1;
                    stroke-linecap: round;
                    stroke-width: 2;
                }
                .rect-1 {
                    width: 20px;
                    height: 20px;
                    x: 0;
                    y: 0;
                    rx: calc(var(--radius) + 1px);
                    fill: var(--color-invert);
                }
                .rect-2 {
                    stroke: var(---stroke-color);
                    stroke-width: var(--stroke-size);
                }
                .rect-3 {
                    fill: var(---fill);
                    transition: var(--transition-medium);
                    stroke: var(---stroke-color);
                    stroke-width: var(--stroke-size);
                    stroke-dasharray: 70;
                    stroke-dashoffset: var(---stroke-offset);
                }
                .icon {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-content: center;
                    color: var(---icon-color);
                    transition: var(--transition);
                }`]});customElements.define("forma-checkbox",F);export{F as C,z as a,E as u};
