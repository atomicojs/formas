import{f as l,b as i,g as v}from"./jsx-runtime-BESKN28P.js";function d(n){const t=l();return t.current=n,t}function m(n,t,s){const{current:e}=l({values:[],mode:s}),c=()=>{typeof e.collector=="function"&&(e.collector(),delete e.collector)},u=e.mode?i:v;u(()=>c,[]),u(()=>{const f=e.values,r=t.map(o=>o.current);r.some((o,a)=>o!==f[a])&&(c(),r.filter(o=>o!=null).length===t.length&&(e.collector=n(r))),e.values=r})}function h(n,t,s,e){const c=d(s);m(([u])=>L(u,t,f=>c.current(f),e),[n])}function L(n,t,s,e){return n.addEventListener(t,s,e),()=>n.removeEventListener(t,s)}export{L as a,d as b,m as c,h as u};
