import{r as y}from"./index-DH5ua8nC.js";import{useMDXComponents as w}from"./index-COxJNofV.js";import{o as b,c as h,j as o,e as l}from"./jsx-runtime-CJr3-XPy.js";import"./_commonjsHelpers-Cpj98o6Y.js";var x={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=y,g=Symbol.for("react.element"),S=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,E=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,j={key:!0,ref:!0,__self:!0,__source:!0};function m(t,e,n){var r,s={},i=null,u=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(u=e.ref);for(r in e)v.call(e,r)&&!j.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:g,type:t,key:i,ref:u,props:s,_owner:E.current}}c.Fragment=S;c.jsx=m;c.jsxs=m;x.exports=c;var p=x.exports;const d={};function k(t,...e){const n=(t.raw||t).reduce((r,s,i)=>r+s+(e[i]||""),"");return d[n]=d[n]||C(n)}function C(t){if(b.sheet){const e=new CSSStyleSheet;return e.replaceSync(t),e}else{const e=document.createElement("style");return e.textContent=t,e}}function O(){return o("host",{shadowDom:!0})}customElements.define("story-card",h(O));function a(){return o("host",{shadowDom:!0,children:l("div",{class:"layout",children:[l("div",{class:"layout-left",children:[o("img",{src:"/logo-by-atomico.svg",alt:""}),l("h1",{children:[o("strong",{children:"Component system"}),o("br",{}),l("span",{children:["to exemplify the use of",o("br",{}),"Atomico + Storybook"]})]})]}),o("div",{class:"layout-right",children:o("div",{class:"layout-phone",children:o("img",{src:"/sample.webp",alt:""})})})]})})}a.props={title1:String,title2:String,subtitle:String};a.styles=k`:host {
        display: flex;
        width: 100%;
    }
    h1 {
        font-size: 40px;
        font-weight: 800;
    }
    h1 span {
        -webkit-text-fill-color: white;
        -webkit-text-stroke: 1px currentColor;
    }
    .layout {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        gap: 80px;
        justify-content: space-between;
    }
    .layout-phone {
        width: 340px;
        background: white;
        border-radius: 32px;
        box-shadow: rgba(0, 0, 0, 0.05) -120px 0px 120px,
            rgba(255, 0, 0, 0.1) -60px -60px 120px,
            rgba(0, 0, 255, 0.1) 60px 60px 120px;
        overflow: hidden;
    }

    .layout-phone img {
        width: 100%;
        display: block;
    }`;customElements.define("story-hero",h(a));function f(t){return p.jsx("story-hero",{})}function P(t={}){const{wrapper:e}={...w(),...t.components};return e?p.jsx(e,{...t,children:p.jsx(f,{...t})}):f()}export{P as default};
