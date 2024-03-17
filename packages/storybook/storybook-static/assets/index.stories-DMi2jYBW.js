import{d as v,f as l,j as e,a as r}from"./jsx-runtime-BESKN28P.js";import{P as q,d as x}from"./index-CdvvZK18.js";import{A as C}from"./index-CE4nxspC.js";import{B as n}from"./index-46IOtroB.js";import{I as w}from"./index-DMqOXlvy.js";import{u as p,a as b}from"./index-Dx87V8fh.js";import{C as h}from"./index-CT3XNXuX.js";import{c as B}from"./css-DxnGaO7F.js";import{s as I}from"./utils-C1pP9zeG.js";import"./decorator-UqCoMbCP.js";import"./index-C0HoaoYu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-mkNy8REe.js";import"./index-AhVMmnpE.js";const i=v(o=>{const d=l(),c=l(),m=l(),f=p(c),g=p(m),u=b(d,t=>t instanceof Element);return e("host",{shadowDom:{},layout:I(!!f.length&&"header",!!u.length&&"content",!!g.length&&"footer"),children:e(h,{...o,children:r("div",{class:"layout",children:[e("div",{class:"header",children:e("slot",{ref:c,name:"header"})}),e("slot",{ref:d}),e("div",{class:"layout content",children:u.map((t,y)=>e("div",{class:t instanceof HTMLImageElement||t instanceof HTMLVideoElement||t instanceof HTMLIFrameElement?"embed":"item",children:e("slot",{name:t.slot=`slot-${y}`})}))}),e("div",{class:"footer ",children:e("slot",{ref:m,name:"footer"})})]})})})},{props:{small:{type:Boolean,reflect:!0},...h.props},styles:[q,B`:host {
                    display: block;
                    --display-header: none;
                    --display-footer: none;
                }
                :host([layout*="header"]) {
                    --display-header: flex;
                }
                :host([layout*="content"]) {
                }
                :host([layout*="footer"]) {
                    --display-footer: flex;
                }
                :host([layout^="content"]) .content .embed:first-child {
                    border-radius: var(--radius) var(--radius) 0 0;
                    overflow: hidden;
                }
                .layout {
                    display: grid;
                }
                .header {
                    padding: var(--space);
                    display: var(--display-header);
                    justify-content: space-between;
                    align-items: center;
                }
                ::slotted(img) {
                    display: block;
                    max-width: 100%;
                }
                .embed {
                }
                .item {
                    padding: var(--space);
                }
                .content{
                    gap: var(--space)
                }
                .footer {
                    display: var(--display-footer);
                    padding: var(--space);
                }`]});customElements.define("forma-card",i);const _={title:"Components/Card",...x(i)},a=o=>r(i,{...o,class:"layout ",style:"width: 320px",children:[e(C,{slot:"header",children:e("img",{src:"https://github.com/atomicojs.png",alt:"avatar"})}),e(n,{slot:"header",ghost:!0,children:e(w,{size:"1.2rem",slot:"prefix",type:"options"})}),e("img",{src:"https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80",alt:"Image",width:"100%"}),r("article",{children:[e("h3",{children:"Title"}),e("span",{children:"Subtitle"}),e("p",{children:"fugiat veniam quis incididunt anim eiusmod nulla minim sunt ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo duis reprehenderit Lorem aliqua aute consequat dolor culpa tempor quis"})]}),e(n,{slot:"footer",small:!0,outline:!0,children:"Create"})]}),s=o=>r(i,{...o,style:"width: 320px",children:[e("img",{src:"https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80",alt:"Image"}),r("article",{children:[e("h5",{children:"Title"}),e("span",{children:"Subtitle"}),e("p",{children:"fugiat veniam quis incididunt anim eiusmod nulla minim sunt ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo duis reprehenderit Lorem aliqua aute consequat dolor culpa tempor quis"})]}),e(n,{slot:"footer",small:!0,outline:!0,children:"Create"}),e(n,{slot:"footer",small:!0,color:"danger",ghost:!0,children:"Remove"})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`props => <Card {...props} class="layout " style="width: 320px">\r
        <Avatar slot="header">\r
            <img src="https://github.com/atomicojs.png" alt="avatar" />\r
        </Avatar>\r
        <Button slot="header" ghost>\r
            <Icon size="1.2rem" slot="prefix" type="options"></Icon>\r
        </Button>\r
        <img src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80" alt="Image" width="100%" />\r
        <article>\r
            <h3>Title</h3>\r
            <span>Subtitle</span>\r
            <p>\r
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt\r
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo\r
                duis reprehenderit Lorem aliqua aute consequat dolor culpa\r
                tempor quis\r
            </p>\r
        </article>\r
        <Button slot="footer" small outline>\r
            Create\r
        </Button>\r
    </Card>`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => <Card {...props} style="width: 320px">\r
        <img src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80" alt="Image" />\r
        <article>\r
            <h5>Title</h5>\r
            <span>Subtitle</span>\r
            <p>\r
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt\r
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo\r
                duis reprehenderit Lorem aliqua aute consequat dolor culpa\r
                tempor quis\r
            </p>\r
        </article>\r
        <Button slot="footer" small outline>\r
            Create\r
        </Button>\r
        <Button slot="footer" small color="danger" ghost>\r
            Remove\r
        </Button>\r
    </Card>`,...s.parameters?.docs?.source}}};const O=["Default","ContentAndFooter"];export{s as ContentAndFooter,a as Default,O as __namedExportsOrder,_ as default};
