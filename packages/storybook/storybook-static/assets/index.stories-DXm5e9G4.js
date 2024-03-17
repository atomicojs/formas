import{j as o,a as l}from"./jsx-runtime-BESKN28P.js";import{d as u}from"./index-CdvvZK18.js";import{B as e}from"./index-46IOtroB.js";import{I as t}from"./index-DMqOXlvy.js";import{L as d}from"./index-AV93BdO3.js";import"./decorator-UqCoMbCP.js";import"./index-C0HoaoYu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./css-DxnGaO7F.js";import"./index-mkNy8REe.js";import"./index-AhVMmnpE.js";import"./index-Dx87V8fh.js";import"./utils-C1pP9zeG.js";const D={title:"Components/Button",...u(e,{argTypes:{href:{description:"Specifies the URL of the page the link goes to"},onlyIcon:{description:"Declares that the component will only use the prefix slot"},ghost:{description:"Declares that the button has no color or solid border by default"},type:{description:"declares the type of behavior, either `button`, `button[type=submit]`, or `a[href]`"},prefix:{category:"Slots",defaultValue:"Element"},suffix:{category:"Slots",defaultValue:"Element"},"--color-background":{description:"Define el color de fondo del boton",defaultValue:"Element"},onClick:{description:"Example: `myElement.addEventListener('click',handler)`"}}})},s=r=>o(e,{...r,children:"Button"}),n=r=>l(e,{...r,children:[o(t,{slot:"prefix"}),o("span",{children:"Button"})]}),a=r=>l(e,{...r,children:[o(t,{slot:"suffix"}),o("span",{children:"Button"})]}),i=r=>o(e,{...r,children:o(t,{slot:"prefix"})}),p=r=>l(e,{...r,children:[o(d,{}),o("span",{children:"Loading"})]}),c=()=>l(e,{children:[o(t,{slot:"prefix"}),o("span",{children:"Loading"}),o(t,{slot:"suffix",type:"right"})]});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"props => <Button {...props}>Button</Button>",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => <Button {...props}>\r
        <Icon slot="prefix"></Icon>\r
        <span>Button</span>\r
    </Button>`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`props => <Button {...props}>\r
        <Icon slot="suffix"></Icon>\r
        <span>Button</span>\r
    </Button>`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`props => <Button {...props}>\r
        <Icon slot="prefix"></Icon>\r
    </Button>`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`props => <Button {...props}>\r
        <Loading></Loading>\r
        <span>Loading</span>\r
    </Button>`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <Button>\r
        <Icon slot="prefix"></Icon>\r
        <span>Loading</span>\r
        <Icon slot="suffix" type="right"></Icon>\r
    </Button>`,...c.parameters?.docs?.source}}};const k=["Default","WithIconPrefix","WithIconSuffix","WithSquare","ExampleWithLoading","ExampleRightSuffix"];export{s as Default,c as ExampleRightSuffix,p as ExampleWithLoading,n as WithIconPrefix,a as WithIconSuffix,i as WithSquare,k as __namedExportsOrder,D as default};
