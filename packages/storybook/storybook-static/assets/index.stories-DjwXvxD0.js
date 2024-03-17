import{j as r,a as p}from"./jsx-runtime-BESKN28P.js";import{d as c}from"./index-CdvvZK18.js";import{A as i}from"./index-CE4nxspC.js";import{D as m}from"./index-C_llqX6e.js";import{B as n}from"./index-46IOtroB.js";import"./decorator-UqCoMbCP.js";import"./index-C0HoaoYu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./css-DxnGaO7F.js";import"./index-mkNy8REe.js";import"./index-AhVMmnpE.js";import"./index-Dx87V8fh.js";import"./index-CT3XNXuX.js";import"./utils-C1pP9zeG.js";const W={title:"Components/Avatar",...c(i,{argTypes:{status:{control:{type:"radio",labels:{"":"none"}},options:["","info","success","warning","danger"]},statusPosition:{description:"Defines the position of the status property",control:{type:"radio"},options:["top left","top right","bottom left","bottom right"]}}})},s=t=>r(i,{...t,children:r("img",{src:"https://github.com/atomicojs.png",alt:"avatar"})}),o=t=>s({...t,status:t.status||"success"}),a=t=>s({...t,status:t.status||"success"}),e=t=>p(m,{children:[o({...t,slot:"action"}),r(n,{small:t.small,ghost:!0,children:"Option 1"}),r(n,{small:t.small,ghost:!0,children:"Option 2"}),r(n,{small:t.small,ghost:!0,children:"Option 3"})]});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => <Avatar {...props}>\r
        <img src="https://github.com/atomicojs.png" alt="avatar" />\r
    </Avatar>`,...s.parameters?.docs?.source},description:{story:`Avatar is used for showing a thumbnail representation of a single\r
user or entity. Default avatar illustration is displayed when no src is specified.`,...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`props => Default({
  ...props,
  status: props.status || "success"
})`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`props => Default({
  ...props,
  status: props.status || "success"
})`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`props => <Dropdown>\r
        {WithStatus({
    ...props,
    slot: "action"
  })}\r
        <Button small={props.small} ghost>\r
            Option 1\r
        </Button>\r
        <Button small={props.small} ghost>\r
            Option 2\r
        </Button>\r
        <Button small={props.small} ghost>\r
            Option 3\r
        </Button>\r
    </Dropdown>`,...e.parameters?.docs?.source}}};const A=["Default","WithStatus","WithLabel","WithDropdown"];export{s as Default,e as WithDropdown,a as WithLabel,o as WithStatus,A as __namedExportsOrder,W as default};
