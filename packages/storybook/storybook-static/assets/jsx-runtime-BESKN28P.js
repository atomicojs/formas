class x{#t;#e=new Set;constructor(t){this.#t=t}get current(){return this.#t}set current(t){this.#t!=t&&(this.#t=t,this.#e.forEach(o=>o(t)))}on(t){return this.#e.add(t),()=>this.#e.delete(t)}}const v=e=>new x(e),I=Symbol.for("atomico.hooks");globalThis[I]=globalThis[I]||{};let N=globalThis[I];const V=Symbol.for("Atomico.suspense"),B=Symbol.for("Atomico.effect"),U=Symbol.for("Atomico.layoutEffect"),Y=Symbol.for("Atomico.insertionEffect"),T=(e,t,o)=>{const{i:s,hooks:n}=N.c,r=n[s]=n[s]||{};return r.value=e(r.value),r.effect=t,r.tag=o,N.c.i++,n[s].value},Dt=e=>T((t=v(e))=>t),F=()=>T((e=v(N.c.host))=>e),H=()=>N.c.update,tt=(e,t,o=0)=>{let s={},n=!1;const r=()=>n,l=(f,c)=>{for(const u in s){const i=s[u];i.effect&&i.tag===f&&(i.value=i.effect(i.value,c))}};return{load:f=>{N.c={host:t,hooks:s,update:e,i:0,id:o};let c;try{n=!1,c=f()}catch(u){if(u!==V)throw u;n=!0}finally{N.c=null}return c},cleanEffects:f=>(l(Y,f),()=>(l(U,f),()=>{l(B,f)})),isSuspense:r}},g=Symbol.for,et=queueMicrotask;function q(e,t){const o=e.length;if(o!==t.length)return!1;for(let s=0;s<o;s++){let n=e[s],r=t[s];if(n!==r)return!1}return!0}const y=e=>typeof e=="function",S=e=>typeof e=="object",{isArray:st}=Array,L=(e,t)=>(t?e instanceof HTMLStyleElement:!0)&&"hydrate"in(e?.dataset||{});function z(e,t){let o;const s=n=>{let{length:r}=n;for(let l=0;l<r;l++){const m=n[l];if(m&&Array.isArray(m))s(m);else{const a=typeof m;if(m==null||a==="function"||a==="boolean")continue;a==="string"||a==="number"?(o==null&&(o=""),o+=m):(o!=null&&(t(o),o=null),t(m))}}};s(e),o!=null&&t(o)}const J=(e,t,o)=>(e.addEventListener(t,o),()=>e.removeEventListener(t,o));class K{constructor(t,o,s){this.message=o,this.target=t,this.value=s}}class ot extends K{}class nt extends K{}const A="Custom",rt=null,it={true:1,"":1,1:1};function ct(e,t,o,s,n){const{type:r,reflect:l,event:m,value:a,attr:f=lt(t)}=o?.name!=A&&S(o)&&o!=rt?o:{type:o},c=r?.name===A&&r.map,u=a!=null?r==Function||!y(a)?()=>a:a:null;Object.defineProperty(e,t,{configurable:!0,set(i){const h=this[t];u&&r!=Boolean&&i==null&&(i=u());const{error:p,value:E}=(c?ut:ht)(r,i);if(p&&E!=null)throw new ot(this,`The value defined for prop '${t}' must be of type '${r.name}'`,E);h!=E&&(this._props[t]=E??void 0,this.update(),m&&X(this,m),this.updated.then(()=>{l&&(this._ignoreAttr=f,ft(this,r,f,this[t]),this._ignoreAttr=null)}))},get(){return this._props[t]}}),u&&(n[t]=u()),s[f]={prop:t,type:r}}const X=(e,{type:t,base:o=CustomEvent,...s})=>e.dispatchEvent(new o(t,s)),lt=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase(),ft=(e,t,o,s)=>s==null||t==Boolean&&!s?e.removeAttribute(o):e.setAttribute(o,t?.name===A&&t?.serialize?t?.serialize(s):S(s)?JSON.stringify(s):t==Boolean?"":s),at=(e,t)=>e==Boolean?!!it[t]:e==Number?Number(t):e==String?t:e==Array||e==Object?JSON.parse(t):e.name==A?t:new e(t),ut=({map:e},t)=>{try{return{value:e(t),error:!1}}catch{return{value:t,error:!0}}},ht=(e,t)=>e==null||t==null?{value:t,error:!1}:e!=String&&t===""?{value:void 0,error:!1}:e==Object||e==Array||e==Symbol?{value:t,error:{}.toString.call(t)!==`[object ${e.name}]`}:t instanceof e?{value:t,error:e==Number&&Number.isNaN(t.valueOf())}:e==String||e==Number||e==Boolean?{value:t,error:e==Number?typeof t!="number"?!0:Number.isNaN(t):e==String?typeof t!="string":typeof t!="boolean"}:{value:t,error:!0};let mt=0;const dt=e=>{const t=(e?.dataset||{})?.hydrate||"";return t||"c"+mt++},bt=(e,t=HTMLElement)=>{const o={},s={},n="prototype"in t&&t.prototype instanceof Element,r=n?t:"base"in t?t.base:HTMLElement,{props:l,styles:m}=n?e:t;class a extends r{constructor(){super(),this._setup(),this._render=()=>e({...this._props});for(const c in s)this[c]=s[c]}static get styles(){return[super.styles,m]}async _setup(){if(this._props)return;this._props={};let c,u;this.mounted=new Promise(d=>this.mount=()=>{d(),c!=this.parentNode&&(u!=c?this.unmounted.then(this.update):this.update()),c=this.parentNode}),this.unmounted=new Promise(d=>this.unmount=()=>{d(),(c!=this.parentNode||!this.isConnected)&&(i.cleanEffects(!0)()(),u=this.parentNode,c=null)}),this.symbolId=this.symbolId||Symbol(),this.symbolIdParent=Symbol();const i=tt(()=>this.update(),this,dt(this));let h,p=!0;const E=L(this);this.update=()=>(h||(h=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const d=i.load(this._render),b=i.cleanEffects();return d&&d.render(this,this.symbolId,E),h=!1,p&&!i.isSuspense()&&(p=!1,!E&&pt(this)),b()}finally{h=!1}}).then(d=>{d&&d()})),this.updated),this.update()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.unmount()}attributeChangedCallback(c,u,i){if(o[c]){if(c===this._ignoreAttr||u===i)return;const{prop:h,type:p}=o[c];try{this[h]=at(p,i)}catch{throw new nt(this,`The value defined as attr '${c}' cannot be parsed by type '${p.name}'`,i)}}else super.attributeChangedCallback(c,u,i)}static get props(){return{...super.props,...l}}static get observedAttributes(){const c=super.observedAttributes||[];for(const u in l)ct(this.prototype,u,l[u],o,s);return Object.keys(o).concat(c)}}return a};function pt(e){const{styles:t}=e.constructor,{shadowRoot:o}=e;if(o&&t.length){const s=[];z(t,n=>{n&&(n instanceof Element?o.appendChild(n.cloneNode(!0)):s.push(n))}),s.length&&(o.adoptedStyleSheets=s)}}const w=e=>(t,o)=>{T(([s,n]=[])=>((n||!n)&&(n&&q(n,o)?s=s||!0:(y(s)&&s(),s=null)),[s,o]),([s,n],r)=>r?(y(s)&&s(),[]):[s||t(),n],e)},$t=w(U),Z=w(B),Et=w(Y);class yt extends Array{constructor(t,o){let s=!0;const n=r=>{try{o(r,this,s)}finally{s=!1}};super(void 0,n,o),n(t)}}const Nt=e=>{const t=H();return T((o=new yt(e,(s,n,r)=>{s=y(s)?s(n[0]):s,s!==n[0]&&(n[0]=s,r||t())}))=>o)},vt=(e,t)=>{const[o]=T(([s,n,r=0]=[])=>((!n||n&&!q(n,t))&&(s=e()),[s,t,r]));return o},gt=(e,t={})=>{const o=F();return o[e]||(o[e]=(s=t.detail)=>X(o.current,{type:e,...t,detail:s})),o[e]},j=g("atomico/options");globalThis[j]=globalThis[j]||{sheet:!!document.adoptedStyleSheets};const St=globalThis[j],Pt={checked:1,value:1,selected:1},Tt={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},Ct={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},C={},M=[];class k extends Text{}const At=g("atomico/id"),P=g("atomico/type"),_=g("atomico/ref"),G=g("atomico/vnode"),Ot=()=>{};function _t(e,t,o){return W(this,e,t,o)}const Q=(e,t,...o)=>{const s=t||C;let{children:n}=s;if(n=n??(o.length?o:M),e===Ot)return n;const r=e?e instanceof Node?1:e.prototype instanceof HTMLElement&&2:0;if(r===!1&&e instanceof Function)return e(n!=M?{children:n,...s}:s);const l=St.render||_t;return{[P]:G,type:e,props:s,children:n,key:s.key,shadow:s.shadowDom,static:s.staticNode,raw:r,is:s.is,clone:s.cloneNode,render:l}};function W(e,t,o=At,s,n){let r;if(t&&t[o]&&t[o].vnode==e||e[P]!=G)return t;(e||!t)&&(n=n||e.type=="svg",r=e.type!="host"&&(e.raw==1?(t&&e.clone?t[_]:t)!=e.type:e.raw==2?!(t instanceof e.type):t?t[_]||t.localName!=e.type:!t),r&&e.type!=null&&(e.raw==1&&e.clone?(s=!0,t=e.type.cloneNode(!0),t[_]=e.type):t=e.raw==1?e.type:e.raw==2?new e.type:n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type,e.is?{is:e.is}:void 0)));const l=t[o]?t[o]:C,{vnode:m=C,cycle:a=0}=l;let{fragment:f,handlers:c}=l;const{children:u=M,props:i=C}=m;if(c=r?{}:c||{},e.static&&!r)return t;if(e.shadow&&!t.shadowRoot&&t.attachShadow({mode:"open",...e.shadow}),e.props!=i&&Lt(t,i,e.props,c,n),e.children!==u){const h=e.shadow?t.shadowRoot:t;f=It(e.children,f,h,o,!a&&s,n&&e.type=="foreignObject"?!1:n)}return t[o]={vnode:e,handlers:c,fragment:f,cycle:a+1},t}function Rt(e,t){const o=new k(""),s=new k("");let n;if(e[t?"prepend":"append"](o),t){let{lastElementChild:r}=e;for(;r;){const{previousElementSibling:l}=r;if(L(r,!0)&&!L(l,!0)){n=r;break}r=l}}return n?n.before(s):e.append(s),{markStart:o,markEnd:s}}function It(e,t,o,s,n,r){e=e==null?null:st(e)?e:[e];const l=t||Rt(o,n),{markStart:m,markEnd:a,keyes:f}=l;let c;const u=f&&new Set;let i=m;if(e&&z(e,h=>{if(typeof h=="object"&&!h[P])return;const p=h[P]&&h.key,E=f&&p!=null&&f.get(p);i!=a&&i===E?u.delete(i):i=i==a?a:i.nextSibling;const d=f?E:i;let b=d;if(h[P])b=W(h,d,s,n,r);else{const O=h+"";!(b instanceof Text)||b instanceof k?b=new Text(O):b.data!=O&&(b.data=O)}b!=i&&(f&&u.delete(b),!d||f?(o.insertBefore(b,i),f&&i!=a&&u.add(i)):d==a?o.insertBefore(b,a):(o.replaceChild(b,d),i=b)),p!=null&&(c=c||new Map,c.set(p,b))}),i=i==a?a:i.nextSibling,t&&i!=a)for(;i!=a;){const h=i;i=i.nextSibling,h.remove()}return u&&u.forEach(h=>h.remove()),l.keyes=c,l}function Lt(e,t,o,s,n){for(const r in t)!(r in o)&&D(e,r,t[r],null,n,s);for(const r in o)D(e,r,t[r],o[r],n,s)}function D(e,t,o,s,n,r){if(t=t=="class"&&!n?"className":t,o=o??null,s=s??null,t in e&&Pt[t]&&(o=e[t]),!(s===o||Ct[t]||t[0]=="_"))if(e.localName==="slot"&&t==="assignNode"&&"assign"in e)et(()=>e.assign(s));else if(t[0]=="o"&&t[1]=="n"&&(y(s)||y(o)))jt(e,t.slice(2),s,r);else if(t=="ref")s&&(y(s)?s(e):s.current=e);else if(t=="style"){const{style:l}=e;o=o||"",s=s||"";const m=S(o),a=S(s);if(m)for(const f in o)if(a)!(f in s)&&$(l,f,null);else break;if(a)for(const f in s){const c=s[f];m&&o[f]===c||$(l,f,c)}else l.cssText=s}else{const l=t[0]=="$"?t.slice(1):t;l===t&&(!n&&!Tt[t]&&t in e||y(s)||y(o))?e[t]=s??"":s==null?e.removeAttribute(l):e.setAttribute(l,S(s)?JSON.stringify(s):s)}}function jt(e,t,o,s){if(s.handleEvent||(s.handleEvent=n=>s[n.type].call(e,n)),o){if(!s[t]){const n=o.capture||o.once||o.passive?Object.assign({},o):null;e.addEventListener(t,s,n)}s[t]=o}else s[t]&&(e.removeEventListener(t,s),delete s[t])}function $(e,t,o){let s="setProperty";o==null&&(s="removeProperty",o=null),~t.indexOf("-")?e[s](t,o):e[t]=o}const Mt=Q("host",{style:"display: contents"}),R=g("atomico/context"),kt=(e,t)=>{const o=F();Et(()=>J(o.current,"ConnectContext",s=>{e===s.detail.id&&(s.stopPropagation(),s.detail.connect(t))}),[e])},Ft=e=>{const t=gt("ConnectContext",{bubbles:!0,composed:!0}),o=()=>{let r;return t({id:e,connect(l){r=l}}),r},[s,n]=Nt(o);return Z(()=>{s||(e[R]||(e[R]=customElements.whenDefined(new e().localName)),e[R].then(()=>n(o)))},[e]),s},Bt=e=>{const t=Ft(e),o=H();return Z(()=>{if(t)return J(t,"UpdatedValue",o)},[t]),(t||e).value},Ut=e=>{const t=bt(()=>(kt(t,F().current),Mt),{props:{value:{type:Object,event:{type:"UpdatedValue"},value:()=>e}}});return t.value=e,t},wt=(e,t,o)=>(t==null?t={key:o}:t.key=o,Q(e,t)),Yt=wt;export{Ot as F,k as M,ot as P,yt as S,Yt as a,Z as b,F as c,bt as d,W as e,Dt as f,$t as g,Q as h,H as i,wt as j,gt as k,Ut as l,Bt as m,v as n,St as o,T as p,y as q,Et as r,vt as s,Nt as u};
