var z=Object.defineProperty;var $=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var A=(e,t,n)=>$(e,typeof t!="symbol"?t+"":t,n);import{i as G,c as U,a as X,b as H,d as O,e as Q}from"./redux-DITMfSWq.js";import{i as x,p as I,a as Y}from"./immer-DqxjFn0G.js";import{t as K,w as J}from"./redux-thunk-ClJT1hhx.js";var Z=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?O:O.apply(null,arguments)},ee=e=>e&&typeof e.match=="function";function j(e,t){function n(...r){if(t){let i=t(...r);if(!i)throw new Error(T(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:r[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=r=>Q(r)&&r.type===e,n}var N=class S extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,S.prototype)}static get[Symbol.species](){return S}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new S(...t[0].concat(this)):new S(...t.concat(this))}};function B(e){return x(e)?I(e,()=>{}):e}function P(e,t,n){if(e.has(t)){let i=e.get(t);return n.update&&(i=n.update(i,t,e),e.set(t,i)),i}if(!n.insert)throw new Error(T(10));const r=n.insert(t,e);return e.set(t,r),r}function te(e){return typeof e=="boolean"}var re=()=>function(t){const{thunk:n=!0,immutableCheck:r=!0,serializableCheck:i=!0,actionCreatorCheck:u=!0}=t??{};let s=new N;return n&&(te(n)?s.push(K):s.push(J(n.extraArgument))),s},ne="RTK_autoBatch",W=e=>t=>{setTimeout(t,e)},ie=typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:W(10),ae=(e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let i=!0,u=!1,s=!1;const l=new Set,c=e.type==="tick"?queueMicrotask:e.type==="raf"?ie:e.type==="callback"?e.queueNotification:W(e.timeout),o=()=>{s=!1,u&&(u=!1,l.forEach(a=>a()))};return Object.assign({},r,{subscribe(a){const f=()=>i&&a(),p=r.subscribe(f);return l.add(a),()=>{p(),l.delete(a)}},dispatch(a){var f;try{return i=!((f=a==null?void 0:a.meta)!=null&&f[ne]),u=!i,u&&(s||(s=!0,c(o))),r.dispatch(a)}finally{i=!0}}})},ce=e=>function(n){const{autoBatch:r=!0}=n??{};let i=new N(e);return r&&i.push(ae(typeof r=="object"?r:void 0)),i};function Ae(e){const t=re(),{reducer:n=void 0,middleware:r,devTools:i=!0,preloadedState:u=void 0,enhancers:s=void 0}=e||{};let l;if(typeof n=="function")l=n;else if(G(n))l=U(n);else throw new Error(T(1));let c;typeof r=="function"?c=r(t):c=t();let o=O;i&&(o=Z({trace:!1,...typeof i=="object"&&i}));const a=X(...c),f=ce(a);let p=typeof s=="function"?s(f):f();const b=o(...p);return H(l,u,b)}function L(e){const t={},n=[];let r;const i={addCase(u,s){const l=typeof u=="string"?u:u.type;if(!l)throw new Error(T(28));if(l in t)throw new Error(T(29));return t[l]=s,i},addMatcher(u,s){return n.push({matcher:u,reducer:s}),i},addDefaultCase(u){return r=u,i}};return e(i),[t,n,r]}function ue(e){return typeof e=="function"}function se(e,t){let[n,r,i]=L(t),u;if(ue(e))u=()=>B(e());else{const l=B(e);u=()=>l}function s(l=u(),c){let o=[n[c.type],...r.filter(({matcher:a})=>a(c)).map(({reducer:a})=>a)];return o.filter(a=>!!a).length===0&&(o=[i]),o.reduce((a,f)=>{if(f)if(Y(a)){const b=f(a,c);return b===void 0?a:b}else{if(x(a))return I(a,p=>f(p,c));{const p=f(a,c);if(p===void 0){if(a===null)return a;throw new Error(T(9))}return p}}return a},l)}return s.getInitialState=u,s}var oe=(e,t)=>ee(e)?e.match(t):e(t);function fe(...e){return t=>e.some(n=>oe(n,t))}var le="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",de=(e=21)=>{let t="",n=e;for(;n--;)t+=le[Math.random()*64|0];return t},he=["name","message","stack","code"],_=class{constructor(e,t){A(this,"_type");this.payload=e,this.meta=t}},q=class{constructor(e,t){A(this,"_type");this.payload=e,this.meta=t}},me=e=>{if(typeof e=="object"&&e!==null){const t={};for(const n of he)typeof e[n]=="string"&&(t[n]=e[n]);return t}return{message:String(e)}},_e=(()=>{function e(t,n,r){const i=j(t+"/fulfilled",(c,o,a,f)=>({payload:c,meta:{...f||{},arg:a,requestId:o,requestStatus:"fulfilled"}})),u=j(t+"/pending",(c,o,a)=>({payload:void 0,meta:{...a||{},arg:o,requestId:c,requestStatus:"pending"}})),s=j(t+"/rejected",(c,o,a,f,p)=>({payload:f,error:(r&&r.serializeError||me)(c||"Rejected"),meta:{...p||{},arg:a,requestId:o,rejectedWithValue:!!f,requestStatus:"rejected",aborted:(c==null?void 0:c.name)==="AbortError",condition:(c==null?void 0:c.name)==="ConditionError"}}));function l(c){return(o,a,f)=>{const p=r!=null&&r.idGenerator?r.idGenerator(c):de(),b=new AbortController;let C,M;function D(E){M=E,b.abort()}const k=async function(){var m,w;let E;try{let y=(m=r==null?void 0:r.condition)==null?void 0:m.call(r,c,{getState:a,extra:f});if(ye(y)&&(y=await y),y===!1||b.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const g=new Promise((d,R)=>{C=()=>{R({name:"AbortError",message:M||"Aborted"})},b.signal.addEventListener("abort",C)});o(u(p,c,(w=r==null?void 0:r.getPendingMeta)==null?void 0:w.call(r,{requestId:p,arg:c},{getState:a,extra:f}))),E=await Promise.race([g,Promise.resolve(n(c,{dispatch:o,getState:a,extra:f,requestId:p,signal:b.signal,abort:D,rejectWithValue:(d,R)=>new _(d,R),fulfillWithValue:(d,R)=>new q(d,R)})).then(d=>{if(d instanceof _)throw d;return d instanceof q?i(d.payload,p,c,d.meta):i(d,p,c)})])}catch(y){E=y instanceof _?s(null,p,c,y.payload,y.meta):s(y,p,c)}finally{C&&b.signal.removeEventListener("abort",C)}return r&&!r.dispatchConditionRejection&&s.match(E)&&E.meta.condition||o(E),E}();return Object.assign(k,{abort:D,requestId:p,arg:c,unwrap(){return k.then(pe)}})}}return Object.assign(l,{pending:u,rejected:s,fulfilled:i,settled:fe(s,i),typePrefix:t})}return e.withTypes=()=>e,e})();function pe(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function ye(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var we=Symbol.for("rtk-slice-createasyncthunk");function be(e,t){return`${e}/${t}`}function Ce({creators:e}={}){var n;const t=(n=e==null?void 0:e.asyncThunk)==null?void 0:n[we];return function(i){const{name:u,reducerPath:s=u}=i;if(!u)throw new Error(T(11));typeof process<"u";const l=(typeof i.reducers=="function"?i.reducers(ge()):i.reducers)||{},c=Object.keys(l),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(h,m){const w=typeof h=="string"?h:h.type;if(!w)throw new Error(T(12));if(w in o.sliceCaseReducersByType)throw new Error(T(13));return o.sliceCaseReducersByType[w]=m,a},addMatcher(h,m){return o.sliceMatchers.push({matcher:h,reducer:m}),a},exposeAction(h,m){return o.actionCreators[h]=m,a},exposeCaseReducer(h,m){return o.sliceCaseReducersByName[h]=m,a}};c.forEach(h=>{const m=l[h],w={reducerName:h,type:be(u,h),createNotation:typeof i.reducers=="function"};Re(m)?Me(w,m,a,t):Te(w,m,a)});function f(){const[h={},m=[],w=void 0]=typeof i.extraReducers=="function"?L(i.extraReducers):[i.extraReducers],y={...h,...o.sliceCaseReducersByType};return se(i.initialState,g=>{for(let d in y)g.addCase(d,y[d]);for(let d of o.sliceMatchers)g.addMatcher(d.matcher,d.reducer);for(let d of m)g.addMatcher(d.matcher,d.reducer);w&&g.addDefaultCase(w)})}const p=h=>h,b=new Map;let C;function M(h,m){return C||(C=f()),C(h,m)}function D(){return C||(C=f()),C.getInitialState()}function k(h,m=!1){function w(g){let d=g[h];return typeof d>"u"&&m&&(d=D()),d}function y(g=p){const d=P(b,m,{insert:()=>new WeakMap});return P(d,g,{insert:()=>{const R={};for(const[V,F]of Object.entries(i.selectors??{}))R[V]=Ee(F,g,D,m);return R}})}return{reducerPath:h,getSelectors:y,get selectors(){return y(w)},selectSlice:w}}const E={name:u,reducer:M,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:D,...k(s),injectInto(h,{reducerPath:m,...w}={}){const y=m??s;return h.inject({reducerPath:y,reducer:M},w),{...E,...k(y,!0)}}};return E}}function Ee(e,t,n,r){function i(u,...s){let l=t(u);return typeof l>"u"&&r&&(l=n()),e(l,...s)}return i.unwrapped=e,i}var Oe=Ce();function ge(){function e(t,n){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...n}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...n){return t(...n)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,n){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:n}},asyncThunk:e}}function Te({type:e,reducerName:t,createNotation:n},r,i){let u,s;if("reducer"in r){if(n&&!De(r))throw new Error(T(17));u=r.reducer,s=r.prepare}else u=r;i.addCase(e,u).exposeCaseReducer(t,u).exposeAction(t,s?j(e,s):j(e))}function Re(e){return e._reducerDefinitionType==="asyncThunk"}function De(e){return e._reducerDefinitionType==="reducerWithPrepare"}function Me({type:e,reducerName:t},n,r,i){if(!i)throw new Error(T(18));const{payloadCreator:u,fulfilled:s,pending:l,rejected:c,settled:o,options:a}=n,f=i(e,u,a);r.exposeAction(t,f),s&&r.addCase(f.fulfilled,s),l&&r.addCase(f.pending,l),c&&r.addCase(f.rejected,c),o&&r.addMatcher(f.settled,o),r.exposeCaseReducer(t,{fulfilled:s||v,pending:l||v,rejected:c||v,settled:o||v})}function v(){}function T(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}export{Oe as a,Ae as b,_e as c};
