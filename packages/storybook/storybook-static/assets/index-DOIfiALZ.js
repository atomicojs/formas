import{f,c as v,g as E,u as N,d as P,k as L,a as y,j as o,F as A}from"./jsx-runtime-BESKN28P.js";import{b as T,I as j,u as F,a as O}from"./index-mkNy8REe.js";import{c as w}from"./css-DxnGaO7F.js";import{u as d,b as W}from"./index-AhVMmnpE.js";import{u as S}from"./index-Dx87V8fh.js";import{B as x}from"./index-46IOtroB.js";import{I as g}from"./index-DMqOXlvy.js";import{s as H}from"./utils-C1pP9zeG.js";import{a as G}from"./index-C_llqX6e.js";import{P as K,A as U}from"./index-CdvvZK18.js";function I(e,s,r=.9,n=24){const t=f(),i=l=>l.type.startsWith("touch"),a=l=>{let h=i(l);if(h&&(t.touches=!0),!t.current&&(!t.touches||h)){t.current=!0;const m=p=>{p=n>p?n:p,t.current&&(t.timeout=setTimeout(()=>{t.current&&(s(),m(p*r))},p))};m(200)}},c=l=>{let h=i(l);t.touches&&!h||(t.timeout&&t.current&&(clearInterval(t.timeout),s()),t.current=!1)};d(e,"mousedown",a),d(e,"touchstart",a),new Image,d(e,"keydown",l=>l.code==="Space"&&a(l)),d(e,"mouseup",c),d(e,"mouseleave",c),d(e,"touchend",c),d(e,"touchmove",c),d(e,"keyup",l=>c(l))}const C=e=>e.replace(/([^\w\_\-])/g,"\\$1"),_=({cssText:e,selectorText:s},r)=>`${s.split(/\s*,\s*/).map(n=>(n.startsWith(":")?n:":host "+n).replace(/(:host)\((.+)\)/,"$1$2").replace(/::slotted\((.+)\)/,":host > $1").replace(/:host/g,r))}${e.replace(s,"").replace(/(animation(?:-name){0,1}\s*:\s*)([^;}]+)/g,"$1$2-"+C(r))}`;function $(e,s){const{cssRules:r}=e;let n=[];for(let t=0;t<r.length;t++){const i=r[t];if(i instanceof CSSStyleRule)n.push(_(i,s));else if(i instanceof CSSKeyframesRule){const{cssText:a}=i;n.push(a.replace(/\s+([^\s{]+)/," $1-"+C(s)))}else if(i instanceof CSSMediaRule){const{conditionText:a}=i;n.push(`@media ${a}{${$(i,s)}}`)}}return n}let b;function q(e){if(e instanceof CSSStyleSheet)return e;if(e.sheet)return e.sheet;b||(b=document.createElement("iframe"),b.style.display="none",document.body.appendChild(b));const{contentDocument:s}=b;s.head.appendChild(e);const{sheet:r}=e,{cloneNode:n}=e;return e.cloneNode=t=>{const i=n.call(e),{cssRules:a}=r;for(let c=0;c<a.length;c++)i.textContent+=a[c].cssText;return i},r}const D="data-sheet";let J=0;function M(e){const s=v();E(()=>{const r=document.createElement("style"),{current:n}=s;return n.hasAttribute(D)||n.setAttribute(D,`${J++}`),n.appendChild(r),r.sheet&&(Array.isArray(e)?e.flat(100):[e]).forEach(t=>{if(!t)return;const i=q(t);$(i,n.localName+`[data-sheet="${n.dataset.sheet}"]`).forEach(a=>r.sheet.insertRule(a,r.sheet.cssRules.length))}),()=>r.remove()},[e])}function Q(e,s){const r=v(),n=W(s);N(()=>{const{current:t}=r,i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);Object.defineProperty(t,e,{configurable:!0,enumerable:!!i?.enumerable,get(){if(n.current?.get)return n.current?.get();if(i?.get)return i?.get?.call(t)},set(a){if(n.current?.set&&n.current?.set(a),i?.set)return i?.set?.call(t,a)}})})}const R=P(({enableDropdown:e})=>{const s=f(window),r=v(),n=f(),t=L("ClickIn"),[i,a]=T("showDropdown");return d(s,"click",c=>{c.isTrusted&&!c.composedPath().includes(r.current)&&a(!1)}),y("host",{shadowDom:!0,children:[y("div",{class:"input",staticNode:!0,onclick:c=>{c.composedPath().includes(n.current)||t("container"),e&&a(l=>!l)},children:[o("div",{class:"action action-prefix",onclick:()=>t("action"),children:y("div",{class:"action-row",children:[o("div",{onclick:()=>t("icon-prefix"),class:"icon icon-prefix",children:o("slot",{name:"icon-prefix"})}),o("slot",{name:"prefix"})]})}),o("div",{ref:n,class:"input-slot",onclick:()=>{t("input")},children:o("slot",{name:"input"})}),o("div",{class:"action action-suffix",onclick:()=>t("action"),children:y("div",{class:"action-row",children:[o("slot",{name:"suffix"}),o("div",{onclick:()=>t("icon-suffix"),class:"icon icon-suffixs",children:o("slot",{name:"icon-suffix"})})]})})]}),e&&o("div",{class:"dropdown",onclick:()=>t("dropdown"),children:o(G,{show:i,reference:r.current,class:"dropdown-component",children:o("slot",{name:"dropdown"})})})]})},{props:{small:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},focused:{type:Boolean,reflect:!0},showDropdown:Boolean,enableDropdown:Boolean,enableIconPrefix:Boolean,enableIconSuffix:Boolean},styles:[K,U,w`:host {
                    --background: var(--color-invert);
                    --size-icon-box: calc(
                        var(--size) - (var(--border-size) * 2)
                    );
                    --prefix-display: none;
                    --suffix-display: none;
                    --padding-between: calc(var(--space) * 2);
                    --padding-left: var(--padding-between);
                    --padding-right: var(--padding-between);
                }
                :host([disabled]) {
                    pointer-events: none;
                    opacity: var(--opacity);
                }
                :host([focused]) {
                    ---outline: var(--outline);
                }
                :host([layout="prefix"]),
                :host([layout="prefix suffix"]) {
                    --prefix-display: block;
                }
                :host([layout="suffix"]),
                :host([layout="prefix suffix"]) {
                    --suffix-display: block;
                }
                .input {
                    display: flex;
                    background: var(--background);
                    border-radius: var(--radius);
                    border: var(--border);
                    min-height: var(--size);
                    box-sizing: border-box;
                    position: relative;
                    outline: var(---outline);
                    outline-offset: var(--outline-offset);
                    transition: var(--transition);
                    padding: 0 var(--padding-right) 0 var(--padding-left);
                    align-items: center;
                    gap: var(--space);
                }
                .input-slot {
                    flex: 0%;
                }
                .action-prefix {
                    display: var(--prefix-display);
                }
                .action-suffix {
                    display: var(--suffix-display);
                }
                .action-row {
                    display: flex;
                    box-sizing: border-box;
                    min-width: var(--space);
                    height: 100%;
                }
                .icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                ::slotted([slot="input"]) {
                    width: 100%;
                    height: 100%;
                    padding: 0px;
                    border: 0px;
                    outline: none;
                    background: transparent;
                    font-size: unset;
                    font-family: unset;
                }
                .inputs {
                    display: flex;
                    flex: 0%;
                }
                .dropdown {
                    width: 100%;
                    height: 1px;
                    position: relative;
                }
                .dropdown-component {
                    width: 100%;
                }`]}),V=w`input[type="file"]::file-selector-button,
    input[type="file"]::-webkit-file-selector-button {
        display: none;
    }
    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button,
    input[type="search"]::-webkit-search-cancel-button {
        display: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }`,X=P(e=>{const s=f(),[r,n]=T("focused"),t=f(),i=f();I(t,()=>{s.current.stepUp()}),I(i,()=>{s.current.stepDown()}),F(()=>o("input",{slot:"input",...e,ref:s,onfocus:()=>n(!0),onblur:()=>n(!1)})),O(),Q("value",{get(){return s.current?.value}});const a=f(),c=S(a),l=f(),h=S(l);M(V);const m=e.type==="file",p=m&&(u=>{u.preventDefault()}),z=m&&(u=>{u.preventDefault();const k=new DataTransfer;[...u.dataTransfer.files].slice(0,e.multiple?u.dataTransfer.files.length:1).forEach(B=>k.items.add(B)),s.current.files=k.files});return o("host",{shadowDom:!0,children:o("div",{ondragover:()=>{e.type==="file"&&n(!0)},ondragend:()=>{n(!1)},children:y(R,{class:"layout",focused:r,small:e.small,disabled:e.disabled,layout:H(c.length&&"prefix",(h.length||e.type==="file"||e.type==="search"||e.type==="number"||e.type==="date")&&"suffix"),onClickIn:u=>{u.detail==="container"&&(s.current?.focus(),s.current?.click())},ondragover:p,ondrop:z,children:[o("slot",{slot:"prefix",name:"prefix"}),o("slot",{ref:a,slot:"icon-prefix",name:"icon-prefix"}),o("slot",{slot:"input",name:"input"}),o("slot",{slot:"suffix",name:"suffix"}),o("slot",{ref:l,slot:"icon-suffix",name:"icon-suffix",children:m?o(x,{ghost:!0,small:e.small,onclick:u=>{u.stopPropagation(),u.preventDefault(),s.current?.click()},children:o(g,{slot:"prefix",type:"attachment"})}):e.type==="date"?o(x,{ghost:!0,small:e.small,children:o(g,{slot:"prefix",type:"calendar"})}):e.type==="search"?o(x,{ghost:!0,small:e.small,onclick:()=>{s.current?.showPicker()},children:o(g,{slot:"prefix",type:"search"})}):e.type==="number"?y(A,{children:[o(x,{ghost:!0,small:e.small,ref:i,children:o(g,{slot:"prefix",type:"dash"})}),o(x,{ghost:!0,small:e.small,ref:t,children:o(g,{slot:"prefix",type:"plus"})})]}):null})]})})})},{props:{...j,type:String,list:String,pattern:String,min:Number,max:Number,minLength:Number,maxLength:Number,placeholder:String,step:Number,multiple:Boolean,loading:{type:Boolean,reflect:!0}},styles:w`:host([type="date"]) .layout,
            :host([type="search"]) .layout,
            :host([type="file"]) .layout,
            :host([type="number"]) .layout {
                --padding-right: 0;
            }
            :host([type="file"]) .layout {
                --border-style: dashed;
            }`});customElements.define("forma-input-layout",R);customElements.define("forma-input",X);export{X as I,R as a};
