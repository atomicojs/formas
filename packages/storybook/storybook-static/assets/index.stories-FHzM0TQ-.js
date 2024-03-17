import{k as D,d as b,f as u,b as x,j as e,a as p}from"./jsx-runtime-BESKN28P.js";import{d as P}from"./index-CdvvZK18.js";import{a as _,I as H}from"./index-DOIfiALZ.js";import{u as d}from"./index-Dx87V8fh.js";import{b as O}from"./index-mkNy8REe.js";import{c as I}from"./css-DxnGaO7F.js";import{s as C}from"./utils-C1pP9zeG.js";import{L as N}from"./index-CH8INDPA.js";import{C as R}from"./index-BMkbn-Dw.js";import{B as F}from"./index-Crhpbdcu.js";import{I as G}from"./index-DMqOXlvy.js";import"./decorator-UqCoMbCP.js";import"./index-C0HoaoYu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-AhVMmnpE.js";import"./index-46IOtroB.js";import"./index-C_llqX6e.js";import"./index-CT3XNXuX.js";const M=", ",z=/, */,X=()=>D("SetValue",{bubbles:!0}),v=t=>t?t.split(z):[],g=t=>t.join(M),L=b(({multiple:t,small:a})=>{const n=u(),r=u(),l=u(),c=u(),S=d(n,o=>o instanceof HTMLElement),B=d(l),T=d(c),V=d(r,o=>o instanceof HTMLElement),[i,k]=O("value");return x(()=>{S.forEach(o=>{console.info({value:i}),o.value=i||""})},[S,i]),x(()=>{const o=v(i);V.forEach(s=>s.checked=o.includes(s.value))},[V,i]),e("host",{shadowDom:!0,layout:C(B.length&&"header",T.length&&"footer"),children:p(_,{enableDropdown:!0,small:a,onSetValue:o=>k(o.detail),children:[e("slot",{ref:n,name:"input",slot:"input"}),p("div",{slot:"dropdown",class:"dropdown",children:[e("div",{class:"header",children:e("slot",{ref:l,name:"header"})}),e("div",{class:"options",children:e("slot",{onchange:o=>{const s=o.target,{checked:E}=s;k(h=>{const y=v(h);return t?y.includes(s.value)?E?h:g(y.filter(j=>j!==s.value)):E?g(y.concat(s.value)):h:s.value})},name:"option",ref:r})}),e("div",{class:"footer",children:e("slot",{ref:c,name:"footer"})})]})]})})},{props:{value:{type:String,value:""},multiple:{type:Boolean,reflect:!0},small:{type:Boolean,reflect:!0},minLength:Number,maxLength:Number},styles:I`:host {
                display: block;
                --display-header: none;
                --display-footer: none;
            }
            .dropdown {
            }
            .options {
                display: grid;
            }
            .header {
                display: var(--display-header);
                border-bottom: var(--border-split);
            }
            .footer {
                display: var(--display-footer);
                border-top: var(--border-split);
            }

            :host([layout*="header"]) {
                --display-header: block;
            }
            :host([layout*="footer"]) {
                --display-footer: block;
            }`}),f=b(({value:t})=>{const[a,n]=O("checked");return e("host",{shadowDom:!0,children:p(N,{slot:"option",children:[e("strong",{children:t}),e(R,{checked:a,slot:"action",value:t,onchange:({currentTarget:r})=>n(r.checked)})]})})},{props:{value:{type:String,reflect:!0},checked:{type:Boolean,reflect:!0},slot:{type:String,value:"option",reflect:!0}},styles:I`:host {
                padding-left: var(--space);
            }`}),w=b(({value:t})=>{const a=v(t),n=X();return e("host",{shadowDom:!0,children:a.map(r=>p(F,{action:!0,onclick:Object.assign(l=>{l.stopPropagation(),l.preventDefault(),n(g(a.filter(c=>c!=r)))},{capture:!0}),children:[r,e(G,{slot:"suffix",type:"closed"})]}))})},{props:{value:{type:String,value:""},slot:{type:String,value:"input",reflect:!0}},styles:I`:host {
                display: flex;
                gap: var(--space);
            }`});customElements.define("formas-input-list",L);customElements.define("formas-input-list-option",f);customElements.define("formas-input-list-badge",w);const ie={title:"In progress/Input list",...P(L)},m=t=>p(L,{...t,value:"Value 1",children:[e(w,{}),e(H,{type:"search",style:"--formas--action-border-color: transparent",slot:"header",small:!0}),e(f,{value:"Value 1"}),e(f,{value:"Value 2"}),e(f,{value:"Value 3"})]});m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`props => <InputList {...props} value="Value 1">\r
        <InputListBadge />\r
        <Input type="search" style="--formas--action-border-color: transparent" slot="header" small></Input>\r
        <InputListOption value="Value 1" />\r
        <InputListOption value="Value 2" />\r
        <InputListOption value="Value 3" />\r
    </InputList>`,...m.parameters?.docs?.source}}};const pe=["Story"];export{m as Story,pe as __namedExportsOrder,ie as default};
