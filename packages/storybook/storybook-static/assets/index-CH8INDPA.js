import{d as s,f as r,a,j as e}from"./jsx-runtime-BESKN28P.js";import{u as l}from"./index-Dx87V8fh.js";import{c}from"./css-DxnGaO7F.js";import{P as n}from"./index-CdvvZK18.js";const i=s(()=>{const o=r(),[t]=l(o);return a("host",{shadowDom:!0,children:[e("div",{class:"content",onclick:()=>t?.click(),children:e("slot",{})}),e("div",{class:"action",children:e("slot",{name:"action",ref:o})})]})},{props:{vertical:{type:Boolean,reflect:!0},reverse:{type:Boolean,reflect:!0},gap:{type:Boolean,reflect:!0}},styles:[n,c`:host {
                    display: flex;
                    align-items: center;

                    gap: var(--gap);
                }
                :host([gap]) {
                    --gap: var(--space-between);
                }
                .content {
                    flex: 0%;
                    cursor: pointer;
                }

                :host([vertical][gap]) {
                    flex-flow: column;
                    --gap: calc(var(--space-between) / 2);
                }
                :host([reverse]) {
                    flex-flow: row-reverse;
                }
                :host([vertical][reverse]) {
                    flex-flow: column-reverse;
                }`]});customElements.define("forma-label",i);export{i as L};
