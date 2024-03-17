import{d as i,a as e,j as t}from"./jsx-runtime-BESKN28P.js";import{u as a}from"./index-mkNy8REe.js";import{P as l,A as n}from"./index-CdvvZK18.js";import{c as h}from"./css-DxnGaO7F.js";const c=i(({status:r,statusPosition:s,placeholder:o})=>(a(()=>o?t("host",{children:t("strong",{children:o})}):null,[o]),e("host",{shadowDom:!0,children:[e("svg",{width:"100%",height:"100%",viewBox:"0 0 40 40",class:"mask",children:[t("mask",{id:"mask",children:t("path",{d:"M40,28.708L40,0L0,0L0,40L28.708,40C27.048,38.534 26,36.389 26,34L26,34C26,29.582 29.582,26 34,26L34,26C36.389,26 38.534,27.048 40,28.708Z",fill:"white",transform:`rotate(${s==="top left"?"180":s==="top right"?"270":s==="bottom left"?"90":"0"} 20 20)`})}),t("foreignObject",{width:"40",height:"40",mask:r?"url(#mask)":"",children:t("slot",{})})]}),r&&t("div",{class:"status",children:t("slot",{name:"status"})})]})),{props:{circle:{type:Boolean,reflect:!0},small:{type:Boolean,reflect:!0},status:{type:String,reflect:!0},statusPosition:{type:String,reflect:!0,value:()=>"bottom right"},placeholder:{type:String,reflect:!0}},styles:[l,n,h`:host {
                    width: var(--size);
                    height: var(--size);
                    display: inline-block;
                    position: relative;
                    --color: var(--color-status-success);
                }
                :host([circle]) {
                    --radius: var(--radius-circle);
                }
                :host([status="info"]) {
                    --color: var(--color-status-info);
                }
                :host([status="warning"]) {
                    --color: var(--color-status-warning);
                }
                :host([status="danger"]) {
                    --color: var(--color-status-danger);
                }
                ::slotted(*) {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .mask {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: var(--radius);
                }
                .status {
                    width: 30%;
                    height: 30%;
                    position: absolute;
                    background: var(--color);
                    border-radius: 100%;
                }

                :host([status-position="bottom right"]) .status {
                    bottom: 0px;
                    right: 0px;
                }

                :host([status-position="bottom left"]) .status {
                    bottom: 0px;
                    left: 0px;
                }

                :host([status-position="top left"]) .status {
                    top: 0px;
                    left: 0px;
                }
                :host([status-position="top right"]) .status {
                    top: 0px;
                    right: 0px;
                }`]});customElements.define("forma-avatar",c);export{c as A};
