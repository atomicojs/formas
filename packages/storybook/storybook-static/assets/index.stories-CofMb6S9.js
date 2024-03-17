import{a as r,j as a}from"./jsx-runtime-BESKN28P.js";import{d as p}from"./index-CdvvZK18.js";import{C as c}from"./index-BMkbn-Dw.js";import{L as o}from"./index-CH8INDPA.js";import{R as l}from"./index-IiPsxxdO.js";import{S as i}from"./index-CdsrJDqr.js";import"./decorator-UqCoMbCP.js";import"./index-C0HoaoYu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./css-DxnGaO7F.js";import"./index-mkNy8REe.js";import"./index-AhVMmnpE.js";import"./index-DMqOXlvy.js";import"./index-Dx87V8fh.js";const g={title:"components/Label",...p(o,{argTypes:{layout:{control:"radio",options:["vertical","horizontal"]}}})},n=e=>r(o,{...e,children:[a(c,{slot:"action"}),a("span",{children:"Remember password"})]}),s=e=>r("form",{children:[r(o,{...e,children:[a(l,{slot:"action",value:"1",name:"type"}),a("span",{children:"Value 1"})]}),r(o,{...e,children:[a(l,{slot:"action",value:"2",name:"type"}),a("span",{children:"Value 2"})]}),r(o,{...e,children:[a(l,{slot:"action",value:"3",name:"type"}),a("span",{children:"Value 3"})]})]}),t=e=>r("form",{children:[r(o,{...e,children:[a(i,{slot:"action",value:"1",name:"type"}),a("span",{children:"Value 1"})]}),r(o,{...e,children:[a(i,{slot:"action",value:"2",name:"type"}),a("span",{children:"Value 2"})]}),r(o,{...e,children:[a(i,{slot:"action",value:"3",name:"type"}),a("span",{children:"Value 3"})]})]});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => <Label {...props}>\r
        <Checkbox slot="action"></Checkbox>\r
        <span>Remember password</span>\r
    </Label>`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => <form>\r
        <Label {...props}>\r
            <Radio slot="action" value="1" name="type"></Radio>\r
            <span>Value 1</span>\r
        </Label>\r
        <Label {...props}>\r
            <Radio slot="action" value="2" name="type"></Radio>\r
            <span>Value 2</span>\r
        </Label>\r
        <Label {...props}>\r
            <Radio slot="action" value="3" name="type"></Radio>\r
            <span>Value 3</span>\r
        </Label>\r
    </form>`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`props => <form>\r
        <Label {...props}>\r
            <Switch slot="action" value="1" name="type"></Switch>\r
            <span>Value 1</span>\r
        </Label>\r
        <Label {...props}>\r
            <Switch slot="action" value="2" name="type"></Switch>\r
            <span>Value 2</span>\r
        </Label>\r
        <Label {...props}>\r
            <Switch slot="action" value="3" name="type"></Switch>\r
            <span>Value 3</span>\r
        </Label>\r
    </form>`,...t.parameters?.docs?.source}}};const C=["Default","RadioList","SwitchList"];export{n as Default,s as RadioList,t as SwitchList,C as __namedExportsOrder,g as default};
