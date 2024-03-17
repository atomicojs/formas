import{d as f,f as o,a as i,j as e}from"./jsx-runtime-BESKN28P.js";import{u as t}from"./index-Dx87V8fh.js";import{P as p,B as d}from"./index-CdvvZK18.js";import{c as u}from"./css-DxnGaO7F.js";import{s as v}from"./utils-C1pP9zeG.js";const x=f(({action:n,color:r})=>{const a=o(),s=o(),c=t(a),l=t(s);return i("host",{shadowDom:!0,layout:v(c.length&&"prefix",l.length&&"suffix"),children:[i("button",{class:"badge",staticNode:!0,tabIndex:n?null:-1,children:[e("div",{className:"icon prefix",children:e("slot",{name:"prefix",ref:a})}),e("slot",{}),e("div",{className:"icon suffix",children:e("slot",{name:"suffix",ref:s})})]}),r&&e("style",{children:`:host{---color: var(--color-${r}, var(--color-status-${r}-container) )}`})]})},{props:{small:{type:Boolean,reflect:!0},circle:{type:Boolean,reflect:!0},action:{type:Boolean,reflect:!0},color:{type:String,value:"primary"}},styles:[p,d,u`:host {
                    display: content;
                    ---radius: var(--radius);
                    ---space-left: var(--space);
                    ---space-right: var(--space);
                    ---space: 0 var(---space-right) 0 var(---space-left);
                    ---display-prefix: none;
                    ---display-suffix: none;
                    ---pointer-event: none;
                }
                :host([action]) {
                    ---pointer-event: all;
                    ---cursor: pointer;
                }
                :host([circle]) {
                    ---radius: var(--radius-circle);
                }
                :host([layout*="prefix"]) {
                    ---space-left: var(--space-icon);
                    ---display-prefix: grid;
                }
                :host([layout*="suffix"]) {
                    ---space-right: var(--space-icon);
                    ---display-suffix: grid;
                }
                .badge {
                    height: var(--size);
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: var(--space);
                    padding: var(---space);
                    box-sizing: border-box;
                    border-radius: var(---radius);
                    background: var(---color, var(--color));
                    font-size: var(--font-size);
                    color: var(--font-color);
                    font-weight: var(--font-weight);
                    pointer-events: var(---pointer-event);
                    cursor: var(---cursor);
                }
                .icon {
                    width: var(--size-icon-container);
                    height: var(--size-icon-container);
                    background: var(--color-container);
                    place-content: center;
                    border-radius: calc(var(---radius) - var(--space-icon));
                }
                .prefix {
                    display: var(---display-prefix);
                }
                .suffix {
                    display: var(---display-suffix);
                }`]});customElements.define("formas-badge",x);export{x as B};
