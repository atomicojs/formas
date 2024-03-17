import{r as h}from"./index-DH5ua8nC.js";import{useMDXComponents as y}from"./index-COxJNofV.js";import{d as f,j as o,a as n}from"./jsx-runtime-BESKN28P.js";import{c as w}from"./css-DxnGaO7F.js";import"./_commonjsHelpers-Cpj98o6Y.js";var x={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b=h,_=Symbol.for("react.element"),g=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,j=b.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k={key:!0,ref:!0,__self:!0,__source:!0};function m(e,t,c){var r,s={},l=null,d=null;c!==void 0&&(l=""+c),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(d=t.ref);for(r in t)v.call(t,r)&&!k.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:_,type:e,key:l,ref:d,props:s,_owner:j.current}}i.Fragment=g;i.jsx=m;i.jsxs=m;x.exports=i;var p=x.exports;function E(){return o("host",{shadowDom:!0})}customElements.define("story-card",f(E));function a(){return o("host",{shadowDom:!0,children:n("div",{class:"layout",children:[n("div",{class:"layout-left",children:[o("img",{src:"/logo-by-atomico.svg",alt:""}),n("h1",{children:[o("strong",{children:"Component system"}),o("br",{}),n("span",{children:["to exemplify the use of",o("br",{}),"Atomico + Storybook"]})]})]}),o("div",{class:"layout-right",children:o("div",{class:"layout-phone",children:o("img",{src:"/sample.webp",alt:""})})})]})})}a.props={title1:String,title2:String,subtitle:String};a.styles=w`:host {
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
    }`;customElements.define("story-hero",f(a));function u(e){return p.jsx("story-hero",{})}function L(e={}){const{wrapper:t}={...y(),...e.components};return t?p.jsx(t,{...e,children:p.jsx(u,{...e})}):u()}export{L as default};
