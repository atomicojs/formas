import{d as t,j as e,a as r}from"./jsx-runtime-BESKN28P.js";import{c as i}from"./css-DxnGaO7F.js";import{P as a}from"./index-CdvvZK18.js";const o=t(()=>e("host",{shadowDom:!0,children:r("svg",{width:"100%",height:"100%",viewBox:"0 0 20 20",children:[e("mask",{id:"mask",children:e("circle",{cx:"10",cy:"10",r:"8",stroke:"white","stroke-width":"3",fill:"transparent"})}),e("foreignObject",{width:"20",height:"20",mask:"url(#mask)",children:e("div",{class:"gradient"})}),e("circle",{cx:"10",cy:"2",r:"2",fill:"black"})]})}),{props:{small:{type:Boolean,reflect:!0}},styles:[a,i`:host {
                    width: 1em;
                    height: 1em;
                    display: inline-block;
                }
                .gradient {
                    width: 100%;
                    height: 100%;
                    background: conic-gradient(
                        transparent 0deg,
                        var(--color-contrast-100) 360deg
                    );
                }
                svg {
                    animation: rotate 1s infinite linear;
                    border-radius: 100%;
                    overflow: hidden;
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }`]});customElements.define("atomico-ui-loading",o);export{o as L};
