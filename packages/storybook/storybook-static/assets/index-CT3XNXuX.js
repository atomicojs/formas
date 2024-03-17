import{d as a,j as o}from"./jsx-runtime-BESKN28P.js";import{c as e}from"./css-DxnGaO7F.js";import{P as t,C as s,S as d,a as i,b as n}from"./index-CdvvZK18.js";const l=a(()=>o("host",{shadowDom:!0,children:o("slot",{})}),{props:{small:{type:Boolean,reflect:!0},padding:{type:String,reflect:!0},bgcolor:{type:String,reflect:!0,value:"container"},color:{type:String,reflect:!0},shadow:{type:Number,reflect:!0},radio:{type:String,reflect:!0,value:"xs"}},styles:[t,s,e`
                :host {
                    display: grid;
                    padding: var(--padding);
                    background-color: var(--bgcolor);
                    color: var(--color);
                    box-shadow: var(--shadow);
                    border-radius: var(--radius);
                    border: var(--border);
                }
                ${d.map(r=>`:host([padding=${r}]){--padding: var(--size-${r})}`).join("")}
                ${i.map(r=>`:host([bgcolor=${r}]){--bgcolor: var(--color-${r})}`).join("")}
                ${n.map(r=>`:host([shadow="${r}"]){--shadow: var(--shadow-${r})}`).join("")}
            `]});customElements.define("forma-container",l);export{l as C};
