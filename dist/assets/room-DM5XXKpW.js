(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const nc=()=>{};var xs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw ht(e)},ht=function(n){return new Error("Firebase Database ("+jr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ic=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Wi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,h=r>>2,d=(r&3)<<4|a>>4;let u=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(u=64)),i.push(t[h],t[d],t[u],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Kr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ic(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new sc;const u=r<<2|a>>4;if(i.push(u),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const _=l<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yr=function(n){const e=Kr(n);return Wi.encodeByteArray(e,!0)},hn=function(n){return Yr(n).replace(/\./g,"")},un=function(n){try{return Wi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(n){return Qr(void 0,n)}function Qr(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!oc(t)||(n[t]=Qr(n[t],e[t]));return n}function oc(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=()=>ac().__FIREBASE_DEFAULTS__,lc=()=>{if(typeof process>"u"||typeof xs>"u")return;const n=xs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},hc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&un(n[1]);return e&&JSON.parse(e)},Bi=()=>{try{return nc()||cc()||lc()||hc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jr=n=>{var e,t;return(t=(e=Bi())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},uc=n=>{const e=Jr(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Xr=()=>{var n;return(n=Bi())==null?void 0:n.config},Zr=n=>{var e;return(e=Bi())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function eo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[hn(JSON.stringify(t)),hn(JSON.stringify(o)),""].join(".")}const Tt={};function fc(){const n={prod:[],emulator:[]};for(const e of Object.keys(Tt))Tt[e]?n.emulator.push(e):n.prod.push(e);return n}function pc(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ms=!1;function to(n,e){if(typeof window>"u"||typeof document>"u"||!ut(window.location.host)||Tt[n]===e||Tt[n]||Ms)return;Tt[n]=e;function t(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=fc().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function c(u,f){u.setAttribute("width","24"),u.setAttribute("id",f),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function l(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Ms=!0,o()},u}function h(u,f){u.setAttribute("id",f),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function d(){const u=pc(i),f=t("text"),_=document.getElementById(f)||document.createElement("span"),I=t("learnmore"),R=document.getElementById(I)||document.createElement("a"),H=t("preprendIcon"),F=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const z=u.element;a(z),h(R,I);const ze=l();c(F,H),z.append(F,_,R,ze),document.body.appendChild(z)}r?(_.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(B())}function _c(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function no(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mc(){const n=B();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function yc(){return jr.NODE_ADMIN===!0}function vc(){try{return typeof indexedDB=="object"}catch{return!1}}function wc(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic="FirebaseError";class Re extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Ic,Object.setPrototypeOf(this,Re.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ht.prototype.create)}}class Ht{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Ec(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Re(s,a,i)}}function Ec(n,e){return n.replace(Cc,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Cc=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){return JSON.parse(n)}function P(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Pt(un(r[0])||""),t=Pt(un(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Tc=function(n){const e=io(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},bc=function(n){const e=io(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Me(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function dn(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function fn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Le(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ls(r)&&Ls(o)){if(!Le(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ls(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const u=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,h;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),h=1518500249):(l=r^o^a,h=1859775393):d<60?(l=r&o|a&(r|o),h=2400959708):(l=r^o^a,h=3395469782);const u=(s<<5|s>>>27)+l+c+h+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function kc(n,e){const t=new Rc(n,e);return t.subscribe.bind(t)}class Rc{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Nc(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ti),s.error===void 0&&(s.error=ti),s.complete===void 0&&(s.complete=ti);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Nc(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ti(){}function et(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ln=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n){return n&&n._delegate?n._delegate:n}class Fe{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new K;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dc(e))try{this.getOrInitializeService({instanceIdentifier:Ne})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ne){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ne){return this.instances.has(e)}getOptions(e=Ne){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Oc(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ne){return this.component?this.component.multipleInstances?e:Ne:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Oc(n){return n===Ne?void 0:n}function Dc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Pc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const Mc={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Lc=T.INFO,Fc={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Uc=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Fc[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vi{constructor(e){this.name=e,this._logLevel=Lc,this._logHandler=Uc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}}const Wc=(n,e)=>e.some(t=>n instanceof t);let Fs,Us;function Bc(){return Fs||(Fs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hc(){return Us||(Us=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const so=new WeakMap,gi=new WeakMap,ro=new WeakMap,ni=new WeakMap,$i=new WeakMap;function Vc(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ye(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&so.set(t,n)}).catch(()=>{}),$i.set(e,n),e}function $c(n){if(gi.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});gi.set(n,e)}let mi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return gi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ro.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ye(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Gc(n){mi=n(mi)}function zc(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ii(this),e,...t);return ro.set(i,e.sort?e.sort():[e]),ye(i)}:Hc().includes(n)?function(...e){return n.apply(ii(this),e),ye(so.get(this))}:function(...e){return ye(n.apply(ii(this),e))}}function qc(n){return typeof n=="function"?zc(n):(n instanceof IDBTransaction&&$c(n),Wc(n,Bc())?new Proxy(n,mi):n)}function ye(n){if(n instanceof IDBRequest)return Vc(n);if(ni.has(n))return ni.get(n);const e=qc(n);return e!==n&&(ni.set(n,e),$i.set(e,n)),e}const ii=n=>$i.get(n);function jc(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=ye(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ye(o.result),c.oldVersion,c.newVersion,ye(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Kc=["get","getKey","getAll","getAllKeys","count"],Yc=["put","add","delete","clear"],si=new Map;function Ws(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(si.get(e))return si.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Yc.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Kc.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return si.set(e,r),r}Gc(n=>({...n,get:(e,t,i)=>Ws(e,t)||n.get(e,t,i),has:(e,t)=>!!Ws(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Jc(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Jc(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yi="@firebase/app",Bs="0.14.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he=new Vi("@firebase/app"),Xc="@firebase/app-compat",Zc="@firebase/analytics-compat",el="@firebase/analytics",tl="@firebase/app-check-compat",nl="@firebase/app-check",il="@firebase/auth",sl="@firebase/auth-compat",rl="@firebase/database",ol="@firebase/data-connect",al="@firebase/database-compat",cl="@firebase/functions",ll="@firebase/functions-compat",hl="@firebase/installations",ul="@firebase/installations-compat",dl="@firebase/messaging",fl="@firebase/messaging-compat",pl="@firebase/performance",_l="@firebase/performance-compat",gl="@firebase/remote-config",ml="@firebase/remote-config-compat",yl="@firebase/storage",vl="@firebase/storage-compat",wl="@firebase/firestore",Il="@firebase/ai",El="@firebase/firestore-compat",Cl="firebase",Tl="12.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="[DEFAULT]",bl={[yi]:"fire-core",[Xc]:"fire-core-compat",[el]:"fire-analytics",[Zc]:"fire-analytics-compat",[nl]:"fire-app-check",[tl]:"fire-app-check-compat",[il]:"fire-auth",[sl]:"fire-auth-compat",[rl]:"fire-rtdb",[ol]:"fire-data-connect",[al]:"fire-rtdb-compat",[cl]:"fire-fn",[ll]:"fire-fn-compat",[hl]:"fire-iid",[ul]:"fire-iid-compat",[dl]:"fire-fcm",[fl]:"fire-fcm-compat",[pl]:"fire-perf",[_l]:"fire-perf-compat",[gl]:"fire-rc",[ml]:"fire-rc-compat",[yl]:"fire-gcs",[vl]:"fire-gcs-compat",[wl]:"fire-fst",[El]:"fire-fst-compat",[Il]:"fire-vertex","fire-js":"fire-js",[Cl]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=new Map,Sl=new Map,wi=new Map;function Hs(n,e){try{n.container.addComponent(e)}catch(t){he.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function tt(n){const e=n.name;if(wi.has(e))return he.debug(`There were multiple attempts to register component ${e}.`),!1;wi.set(e,n);for(const t of pn.values())Hs(t,n);for(const t of Sl.values())Hs(t,n);return!0}function Gi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function q(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ve=new Ht("app","Firebase",kl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ve.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=Tl;function oo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:vi,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ve.create("bad-app-name",{appName:String(s)});if(t||(t=Xr()),!t)throw ve.create("no-options");const r=pn.get(s);if(r){if(Le(t,r.options)&&Le(i,r.config))return r;throw ve.create("duplicate-app",{appName:s})}const o=new xc(s);for(const c of wi.values())o.addComponent(c);const a=new Rl(t,i,o);return pn.set(s,a),a}function ao(n=vi){const e=pn.get(n);if(!e&&n===vi&&Xr())return oo();if(!e)throw ve.create("no-app",{appName:n});return e}function we(n,e,t){let i=bl[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),he.warn(o.join(" "));return}tt(new Fe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="firebase-heartbeat-database",Al=1,Ot="firebase-heartbeat-store";let ri=null;function co(){return ri||(ri=jc(Nl,Al,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ot)}catch(t){console.warn(t)}}}}).catch(n=>{throw ve.create("idb-open",{originalErrorMessage:n.message})})),ri}async function Pl(n){try{const t=(await co()).transaction(Ot),i=await t.objectStore(Ot).get(lo(n));return await t.done,i}catch(e){if(e instanceof Re)he.warn(e.message);else{const t=ve.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});he.warn(t.message)}}}async function Vs(n,e){try{const i=(await co()).transaction(Ot,"readwrite");await i.objectStore(Ot).put(e,lo(n)),await i.done}catch(t){if(t instanceof Re)he.warn(t.message);else{const i=ve.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});he.warn(i.message)}}}function lo(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=1024,Dl=30;class xl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ll(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=$s();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>Dl){const o=Fl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){he.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$s(),{heartbeatsToSend:i,unsentEntries:s}=Ml(this._heartbeatsCache.heartbeats),r=hn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return he.warn(t),""}}}function $s(){return new Date().toISOString().substring(0,10)}function Ml(n,e=Ol){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Gs(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Gs(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Ll{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vc()?wc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Pl(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Vs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Vs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Gs(n){return hn(JSON.stringify({version:2,heartbeats:n})).length}function Fl(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n){tt(new Fe("platform-logger",e=>new Qc(e),"PRIVATE")),tt(new Fe("heartbeat",e=>new xl(e),"PRIVATE")),we(yi,Bs,n),we(yi,Bs,"esm2020"),we("fire-js","")}Ul("");var Wl="firebase",Bl="12.2.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */we(Wl,Bl,"app");var zs={};const qs="@firebase/database",js="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ho="";function Hl(n){ho=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),P(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Pt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return te(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Vl(e)}}catch{}return new $l},Pe=uo("localStorage"),Gl=uo("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye=new Vi("@firebase/database"),fo=function(){let n=1;return function(){return n++}}(),po=function(n){const e=Ac(n),t=new Sc;t.update(e);const i=t.digest();return Wi.encodeByteArray(i)},Vt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Vt.apply(null,i):typeof i=="object"?e+=P(i):e+=i,e+=" "}return e};let bt=null,Ks=!0;const zl=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Ye.logLevel=T.VERBOSE,bt=Ye.log.bind(Ye)},x=function(...n){if(Ks===!0&&(Ks=!1,bt===null&&Gl.get("logging_enabled")===!0&&zl()),bt){const e=Vt.apply(null,n);bt(e)}},$t=function(n){return function(...e){x(n,...e)}},Ii=function(...n){const e="FIREBASE INTERNAL ERROR: "+Vt(...n);Ye.error(e)},ue=function(...n){const e=`FIREBASE FATAL ERROR: ${Vt(...n)}`;throw Ye.error(e),new Error(e)},W=function(...n){const e="FIREBASE WARNING: "+Vt(...n);Ye.warn(e)},ql=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&W("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Fn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},jl=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},nt="[MIN_NAME]",Ue="[MAX_NAME]",Ve=function(n,e){if(n===e)return 0;if(n===nt||e===Ue)return-1;if(e===nt||n===Ue)return 1;{const t=Ys(n),i=Ys(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Kl=function(n,e){return n===e?0:n<e?-1:1},wt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+P(e))},zi=function(n){if(typeof n!="object"||n===null)return P(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=P(e[i]),t+=":",t+=zi(n[e[i]]);return t+="}",t},_o=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function M(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const go=function(n){p(!Fn(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const h=l.join("");let d="";for(c=0;c<64;c+=8){let u=parseInt(h.substr(c,8),2).toString(16);u.length===1&&(u="0"+u),d=d+u}return d.toLowerCase()},Yl=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ql=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Jl(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Xl=new RegExp("^-?(0*)\\d{1,10}$"),Zl=-2147483648,eh=2147483647,Ys=function(n){if(Xl.test(n)){const e=Number(n);if(e>=Zl&&e<=eh)return e}return null},pt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw W("Exception was thrown by user callback.",t),e},Math.floor(0))}},th=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},St=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,q(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){W(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(x("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',W(e)}}class sn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}sn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi="5",mo="v",yo="s",vo="r",wo="f",Io=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Eo="ls",Co="p",Ei="ac",To="websocket",bo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Pe.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Pe.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function sh(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function ko(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===To)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===bo)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);sh(n)&&(t.ns=n.namespace);const s=[];return M(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(){this.counters_={}}incrementCounter(e,t=1){te(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return rc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi={},ai={};function ji(n){const e=n.toString();return oi[e]||(oi[e]=new rh),oi[e]}function oh(n,e){const t=n.toString();return ai[t]||(ai[t]=e()),ai[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&pt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs="start",ch="close",lh="pLPCommand",hh="pRTLPCB",Ro="id",No="pw",Ao="ser",uh="cb",dh="seg",fh="ts",ph="d",_h="dframe",Po=1870,Oo=30,gh=Po-Oo,mh=25e3,yh=3e4;class je{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=$t(e),this.stats_=ji(t),this.urlFn=c=>(this.appCheckToken&&(c[Ei]=this.appCheckToken),ko(t,bo,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ah(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(yh)),jl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ki((...r)=>{const[o,a,c,l,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Qs)this.id=a,this.password=c;else if(o===ch)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Qs]="t",i[Ao]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[uh]=this.scriptTagHolder.uniqueCallbackIdentifier),i[mo]=qi,this.transportSessionId&&(i[yo]=this.transportSessionId),this.lastSessionId&&(i[Eo]=this.lastSessionId),this.applicationId&&(i[Co]=this.applicationId),this.appCheckToken&&(i[Ei]=this.appCheckToken),typeof location<"u"&&location.hostname&&Io.test(location.hostname)&&(i[vo]=wo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){je.forceAllow_=!0}static forceDisallow(){je.forceDisallow_=!0}static isAvailable(){return je.forceAllow_?!0:!je.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Yl()&&!Ql()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Yr(t),s=_o(i,gh);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[_h]="t",i[Ro]=e,i[No]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=P(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Ki{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=fo(),window[lh+this.uniqueCallbackIdentifier]=e,window[hh+this.uniqueCallbackIdentifier]=t,this.myIFrame=Ki.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){x("frame writing exception"),a.stack&&x(a.stack),x(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||x("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ro]=this.myID,e[No]=this.myPW,e[Ao]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Oo+i.length<=Po;){const o=this.pendingSegs.shift();i=i+"&"+dh+s+"="+o.seg+"&"+fh+s+"="+o.ts+"&"+ph+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(mh)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{x("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=16384,wh=45e3;let _n=null;typeof MozWebSocket<"u"?_n=MozWebSocket:typeof WebSocket<"u"&&(_n=WebSocket);class Y{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=$t(this.connId),this.stats_=ji(t),this.connURL=Y.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[mo]=qi,typeof location<"u"&&location.hostname&&Io.test(location.hostname)&&(o[vo]=wo),t&&(o[yo]=t),i&&(o[Eo]=i),s&&(o[Ei]=s),r&&(o[Co]=r),ko(e,To,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Pe.set("previous_websocket_failure",!0);try{let i;yc(),this.mySock=new _n(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Y.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&_n!==null&&!Y.forceDisallow_}static previouslyFailed(){return Pe.isInMemoryStorage||Pe.get("previous_websocket_failure")===!0}markConnectionHealthy(){Pe.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Pt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=_o(t,vh);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(wh))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Y.responsesRequiredToBeHealthy=2;Y.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{static get ALL_TRANSPORTS(){return[je,Y]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Y&&Y.isAvailable();let i=t&&!Y.previouslyFailed();if(e.webSocketOnly&&(t||W("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Y];else{const s=this.transports_=[];for(const r of Dt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Dt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Dt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih=6e4,Eh=5e3,Ch=10*1024,Th=100*1024,ci="t",Js="d",bh="s",Xs="r",Sh="e",Zs="o",er="a",tr="n",nr="p",kh="h";class Rh{constructor(e,t,i,s,r,o,a,c,l,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=$t("c:"+this.id+":"),this.transportManager_=new Dt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=St(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Th?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Ch?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ci in e){const t=e[ci];t===er?this.upgradeIfSecondaryHealthy_():t===Xs?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Zs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:nr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:er,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:tr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=wt(ci,e);if(Js in e){const i=e[Js];if(t===kh){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===tr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===bh?this.onConnectionShutdown_(i):t===Xs?this.onReset_(i):t===Sh?Ii("Server Error: "+i):t===Zs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ii("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),qi!==i&&W("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),St(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Ih))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):St(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Eh))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:nr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Pe.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends xo{static getInstance(){return new gn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Hi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=32,sr=768;class C{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new C("")}function y(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Te(n){return n.pieces_.length-n.pieceNum_}function b(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new C(n.pieces_,e)}function Yi(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Nh(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function xt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Mo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new C(e,0)}function A(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof C)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new C(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function U(n,e){const t=y(n),i=y(e);if(t===null)return e;if(t===i)return U(b(n),b(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ah(n,e){const t=xt(n,0),i=xt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Ve(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Qi(n,e){if(Te(n)!==Te(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function j(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Te(n)>Te(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Ph{constructor(e,t){this.errorPrefix_=t,this.parts_=xt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Ln(this.parts_[i]);Lo(this)}}function Oh(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ln(e),Lo(n)}function Dh(n){const e=n.parts_.pop();n.byteLength_-=Ln(e),n.parts_.length>0&&(n.byteLength_-=1)}function Lo(n){if(n.byteLength_>sr)throw new Error(n.errorPrefix_+"has a key path longer than "+sr+" bytes ("+n.byteLength_+").");if(n.parts_.length>ir)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ir+") or object contains a cycle "+Ae(n))}function Ae(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji extends xo{static getInstance(){return new Ji}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=1e3,xh=60*5*1e3,rr=30*1e3,Mh=1.3,Lh=3e4,Fh="server_kill",or=3;class le extends Do{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=le.nextPersistentConnectionId_++,this.log_=$t("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=It,this.maxReconnectDelay_=xh,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ji.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&gn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(P(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new K,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;le.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&te(e,"w")){const i=Me(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();W(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||bc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=rr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Tc(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+P(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ii("Unrecognized action received from server: "+P(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=It,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=It,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Lh&&(this.reconnectDelay_=It),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Mh)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+le.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,u]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?x("getToken() completed but was canceled"):(x("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=u&&u.token,a=new Rh(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{W(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Fh)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&W(d),c())}}}interrupt(e){x("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){x("Resuming connection for reason: "+e),delete this.interruptReasons_[e],dn(this.interruptReasons_)&&(this.reconnectDelay_=It,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>zi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new C(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){x("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=or&&(this.reconnectDelay_=rr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){x("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=or&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+ho.replace(/\./g,"-")]=1,Hi()?e["framework.cordova"]=1:no()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gn.getInstance().currentlyOnline();return dn(this.interruptReasons_)&&e}}le.nextPersistentConnectionId_=0;le.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new w(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(nt,e),s=new w(nt,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zt;class Fo extends Un{static get __EMPTY_NODE(){return Zt}static set __EMPTY_NODE(e){Zt=e}compare(e,t){return Ve(e.name,t.name)}isDefinedOn(e){throw ht("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(Ue,Zt)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,Zt)}toString(){return".key"}}const Qe=new Fo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class D{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??D.RED,this.left=s??V.EMPTY_NODE,this.right=r??V.EMPTY_NODE}copy(e,t,i,s,r){return new D(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return V.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return V.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,D.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,D.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}D.RED=!0;D.BLACK=!1;class Uh{copy(e,t,i,s,r){return this}insert(e,t,i){return new D(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class V{constructor(e,t=V.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new V(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,D.BLACK,null,null))}remove(e){return new V(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,D.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new en(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new en(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new en(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new en(this.root_,null,this.comparator_,!0,e)}}V.EMPTY_NODE=new Uh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(n,e){return Ve(n.name,e.name)}function Xi(n,e){return Ve(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ci;function Bh(n){Ci=n}const Uo=function(n){return typeof n=="number"?"number:"+go(n):"string:"+n},Wo=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&te(e,".sv"),"Priority must be a string or number.")}else p(n===Ci||n.isEmpty(),"priority of unexpected type.");p(n===Ci||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ar;class O{static set __childrenNodeConstructor(e){ar=e}static get __childrenNodeConstructor(){return ar}constructor(e,t=O.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Wo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new O(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:y(e)===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:O.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=y(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Te(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,O.__childrenNodeConstructor.EMPTY_NODE.updateChild(b(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Uo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=go(this.value_):e+=this.value_,this.lazyHash_=po(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===O.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof O.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=O.VALUE_TYPE_ORDER.indexOf(t),r=O.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}O.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bo,Ho;function Hh(n){Bo=n}function Vh(n){Ho=n}class $h extends Un{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Ve(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(Ue,new O("[PRIORITY-POST]",Ho))}makePost(e,t){const i=Bo(e);return new w(t,new O("[PRIORITY-POST]",i))}toString(){return".priority"}}const k=new $h;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=Math.log(2);class zh{constructor(e){const t=r=>parseInt(Math.log(r)/Gh,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mn=function(n,e,t,i){n.sort(e);const s=function(c,l){const h=l-c;let d,u;if(h===0)return null;if(h===1)return d=n[c],u=t?t(d):d,new D(u,d.node,D.BLACK,null,null);{const f=parseInt(h/2,10)+c,_=s(c,f),I=s(f+1,l);return d=n[f],u=t?t(d):d,new D(u,d.node,D.BLACK,_,I)}},r=function(c){let l=null,h=null,d=n.length;const u=function(_,I){const R=d-_,H=d;d-=_;const F=s(R+1,H),z=n[R],ze=t?t(z):z;f(new D(ze,z.node,I,null,F))},f=function(_){l?(l.left=_,l=_):(h=_,l=_)};for(let _=0;_<c.count;++_){const I=c.nextBitIsOne(),R=Math.pow(2,c.count-(_+1));I?u(R,D.BLACK):(u(R,D.BLACK),u(R,D.RED))}return h},o=new zh(n.length),a=r(o);return new V(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let li;const qe={};class oe{static get Default(){return p(qe&&k,"ChildrenNode.ts has not been loaded"),li=li||new oe({".priority":qe},{".priority":k}),li}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Me(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof V?t:null}hasIndex(e){return te(this.indexSet_,e.toString())}addIndex(e,t){p(e!==Qe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=mn(i,e.getCompare()):a=qe;const c=e.toString(),l={...this.indexSet_};l[c]=e;const h={...this.indexes_};return h[c]=a,new oe(h,l)}addToIndexes(e,t){const i=fn(this.indexes_,(s,r)=>{const o=Me(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===qe)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(w.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),mn(a,o.getCompare())}else return qe;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new w(e.name,a))),c.insert(e,e.node)}});return new oe(i,this.indexSet_)}removeFromIndexes(e,t){const i=fn(this.indexes_,s=>{if(s===qe)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new oe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Et;class g{static get EMPTY_NODE(){return Et||(Et=new g(new V(Xi),null,oe.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Wo(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Et}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Et:t}}getChild(e){const t=y(e);return t===null?this:this.getImmediateChild(t).getChild(b(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Et:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=y(e);if(i===null)return t;{p(y(e)!==".priority"||Te(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(b(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(k,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Uo(this.getPriority().val())+":"),this.forEachChild(k,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":po(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Gt?-1:0}withIndex(e){if(e===Qe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Qe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(k),s=t.getIterator(k);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Qe?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class qh extends g{constructor(){super(new V(Xi),g.EMPTY_NODE,oe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const Gt=new qh;Object.defineProperties(w,{MIN:{value:new w(nt,g.EMPTY_NODE)},MAX:{value:new w(Ue,Gt)}});Fo.__EMPTY_NODE=g.EMPTY_NODE;O.__childrenNodeConstructor=g;Bh(Gt);Vh(Gt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh=!0;function N(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new O(t,N(e))}if(!(n instanceof Array)&&jh){const t=[];let i=!1;if(M(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=N(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new w(o,c)))}}),t.length===0)return g.EMPTY_NODE;const r=mn(t,Wh,o=>o.name,Xi);if(i){const o=mn(t,k.getCompare());return new g(r,N(e),new oe({".priority":o},{".priority":k}))}else return new g(r,N(e),oe.Default)}else{let t=g.EMPTY_NODE;return M(n,(i,s)=>{if(te(n,i)&&i.substring(0,1)!=="."){const r=N(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(N(e))}}Hh(N);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh extends Un{constructor(e){super(),this.indexPath_=e,p(!v(e)&&y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Ve(e.name,t.name):r}makePost(e,t){const i=N(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,Gt);return new w(Ue,e)}toString(){return xt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh extends Un{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ve(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=N(e);return new w(t,i)}toString(){return".value"}}const Qh=new Yh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(n){return{type:"value",snapshotNode:n}}function it(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Mt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Lt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Jh(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Mt(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(it(t,i)):o.trackChildChange(Lt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(k,(s,r)=>{t.hasChild(s)||i.trackChildChange(Mt(s,r))}),t.isLeafNode()||t.forEachChild(k,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Lt(s,r,o))}else i.trackChildChange(it(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.indexedFilter_=new Zi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ft.getStartPost_(e),this.endPost_=Ft.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(k,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ft(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(u,f)=>d(f,u)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new w(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let u=s.getChildAfterChild(this.index_,l,this.reverse_);for(;u!=null&&(u.name===t||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,c);if(h&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Lt(t,i,d)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Mt(t,d));const I=a.updateImmediateChild(t,g.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r!=null&&r.trackChildChange(it(u.name,u.node)),I.updateImmediateChild(u.name,u.node)):I}}else return i.isEmpty()?e:h&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Mt(l.name,l.node)),r.trackChildChange(it(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=k}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:nt}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ue}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===k}copy(){const e=new es;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Zh(n){return n.loadsAllData()?new Zi(n.getIndex()):n.hasLimit()?new Xh(n):new Ft(n)}function eu(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function cr(n){const e={};if(n.isDefault())return e;let t;if(n.index_===k?t="$priority":n.index_===Qh?t="$value":n.index_===Qe?t="$key":(p(n.index_ instanceof Kh,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=P(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=P(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+P(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=P(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+P(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function lr(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==k&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends Do{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=$t("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=yn.getListenId_(e,i),a={};this.listens_[o]=a;const c=cr(e._queryParams);this.restRequest_(r+".json",c,(l,h)=>{let d=h;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Me(this.listens_,o)===a){let u;l?l===401?u="permission_denied":u="rest_error:"+l:u="ok",s(u,null)}})}unlisten(e,t){const i=yn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=cr(e._queryParams),i=e._path.toString(),s=new K;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+dt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Pt(a.responseText)}catch{W("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&W("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(){return{value:null,children:new Map}}function _t(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=y(e);n.children.has(i)||n.children.set(i,vn());const s=n.children.get(i);e=b(e),_t(s,e,t)}}function Ti(n,e){if(v(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(k,(i,s)=>{_t(n,new C(i),s)}),Ti(n,e)}}else if(n.children.size>0){const t=y(e);return e=b(e),n.children.has(t)&&Ti(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function bi(n,e,t){n.value!==null?t(e,n.value):nu(n,(i,s)=>{const r=new C(e.toString()+"/"+i);bi(s,r,t)})}function nu(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&M(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr=10*1e3,su=30*1e3,ru=5*60*1e3;class ou{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new iu(e);const i=hr+(su-hr)*Math.random();St(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;M(e,(s,r)=>{r>0&&te(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),St(this.reportStats_.bind(this),Math.floor(Math.random()*2*ru))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Q||(Q={}));function ts(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ns(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function is(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Q.ACK_USER_WRITE,this.source=ts()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new C(e));return new wn(E(),t,this.revert)}}else return p(y(this.path)===e,"operationForChild called for unrelated child."),new wn(b(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t){this.source=e,this.path=t,this.type=Q.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new Ut(this.source,E()):new Ut(this.source,b(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Q.OVERWRITE}operationForChild(e){return v(this.path)?new We(this.source,E(),this.snap.getImmediateChild(e)):new We(this.source,b(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Q.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new C(e));return t.isEmpty()?null:t.value?new We(this.source,E(),t.value):new st(this.source,E(),t)}else return p(y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new st(this.source,b(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=y(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function cu(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Jh(o.childName,o.snapshotNode))}),Ct(n,s,"child_removed",e,i,t),Ct(n,s,"child_added",e,i,t),Ct(n,s,"child_moved",r,i,t),Ct(n,s,"child_changed",e,i,t),Ct(n,s,"value",e,i,t),s}function Ct(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>hu(n,a,c)),o.forEach(a=>{const c=lu(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function lu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function hu(n,e,t){if(e.childName==null||t.childName==null)throw ht("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(n,e){return{eventCache:n,serverCache:e}}function kt(n,e,t,i){return Wn(new be(e,t,i),n.serverCache)}function $o(n,e,t,i){return Wn(n.eventCache,new be(e,t,i))}function In(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Be(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;const uu=()=>(hi||(hi=new V(Kl)),hi);class S{static fromObject(e){let t=new S(null);return M(e,(i,s)=>{t=t.set(new C(i),s)}),t}constructor(e,t=uu()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const i=y(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(b(e),t);return r!=null?{path:A(new C(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=y(e),i=this.children.get(t);return i!==null?i.subtree(b(e)):new S(null)}}set(e,t){if(v(e))return new S(t,this.children);{const i=y(e),r=(this.children.get(i)||new S(null)).set(b(e),t),o=this.children.insert(i,r);return new S(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new S(null):new S(null,this.children);{const t=y(e),i=this.children.get(t);if(i){const s=i.remove(b(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new S(null):new S(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=y(e),i=this.children.get(t);return i?i.get(b(e)):null}}setTree(e,t){if(v(e))return t;{const i=y(e),r=(this.children.get(i)||new S(null)).setTree(b(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new S(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(A(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(v(e))return null;{const r=y(e),o=this.children.get(r);return o?o.findOnPath_(b(e),A(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(v(e))return this;{this.value&&i(t,this.value);const s=y(e),r=this.children.get(s);return r?r.foreachOnPath_(b(e),A(t,s),i):new S(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(A(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.writeTree_=e}static empty(){return new X(new S(null))}}function Rt(n,e,t){if(v(e))return new X(new S(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=U(s,e);return r=r.updateChild(o,t),new X(n.writeTree_.set(s,r))}else{const s=new S(t),r=n.writeTree_.setTree(e,s);return new X(r)}}}function Si(n,e,t){let i=n;return M(t,(s,r)=>{i=Rt(i,A(e,s),r)}),i}function ur(n,e){if(v(e))return X.empty();{const t=n.writeTree_.setTree(e,new S(null));return new X(t)}}function ki(n,e){return $e(n,e)!=null}function $e(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(U(t.path,e)):null}function dr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(k,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function Ie(n,e){if(v(e))return n;{const t=$e(n,e);return t!=null?new X(new S(t)):new X(n.writeTree_.subtree(e))}}function Ri(n){return n.writeTree_.isEmpty()}function rt(n,e){return Go(E(),n.writeTree_,e)}function Go(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Go(A(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(A(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bn(n,e){return Ko(e,n)}function du(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Rt(n.visibleWrites,e,t)),n.lastWriteId=i}function fu(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Si(n.visibleWrites,e,t),n.lastWriteId=i}function pu(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function _u(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&gu(a,i.path)?s=!1:j(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return mu(n),!0;if(i.snap)n.visibleWrites=ur(n.visibleWrites,i.path);else{const a=i.children;M(a,c=>{n.visibleWrites=ur(n.visibleWrites,A(i.path,c))})}return!0}else return!1}function gu(n,e){if(n.snap)return j(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&j(A(n.path,t),e))return!0;return!1}function mu(n){n.visibleWrites=zo(n.allWrites,yu,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function yu(n){return n.visible}function zo(n,e,t){let i=X.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)j(t,o)?(a=U(t,o),i=Rt(i,a,r.snap)):j(o,t)&&(a=U(o,t),i=Rt(i,E(),r.snap.getChild(a)));else if(r.children){if(j(t,o))a=U(t,o),i=Si(i,a,r.children);else if(j(o,t))if(a=U(o,t),v(a))i=Si(i,E(),r.children);else{const c=Me(r.children,y(a));if(c){const l=c.getChild(b(a));i=Rt(i,E(),l)}}}else throw ht("WriteRecord should have .snap or .children")}}return i}function qo(n,e,t,i,s){if(!i&&!s){const r=$e(n.visibleWrites,e);if(r!=null)return r;{const o=Ie(n.visibleWrites,e);if(Ri(o))return t;if(t==null&&!ki(o,E()))return null;{const a=t||g.EMPTY_NODE;return rt(o,a)}}}else{const r=Ie(n.visibleWrites,e);if(!s&&Ri(r))return t;if(!s&&t==null&&!ki(r,E()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(j(l.path,e)||j(e,l.path))},a=zo(n.allWrites,o,e),c=t||g.EMPTY_NODE;return rt(a,c)}}}function vu(n,e,t){let i=g.EMPTY_NODE;const s=$e(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(k,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Ie(n.visibleWrites,e);return t.forEachChild(k,(o,a)=>{const c=rt(Ie(r,new C(o)),a);i=i.updateImmediateChild(o,c)}),dr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ie(n.visibleWrites,e);return dr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function wu(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(ki(n.visibleWrites,r))return null;{const o=Ie(n.visibleWrites,r);return Ri(o)?s.getChild(t):rt(o,s.getChild(t))}}function Iu(n,e,t,i){const s=A(e,t),r=$e(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Ie(n.visibleWrites,s);return rt(o,i.getNode().getImmediateChild(t))}else return null}function Eu(n,e){return $e(n.visibleWrites,e)}function Cu(n,e,t,i,s,r,o){let a;const c=Ie(n.visibleWrites,e),l=$e(c,E());if(l!=null)a=l;else if(t!=null)a=rt(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=u.getNext();for(;f&&h.length<s;)d(f,i)!==0&&h.push(f),f=u.getNext();return h}else return[]}function Tu(){return{visibleWrites:X.empty(),allWrites:[],lastWriteId:-1}}function En(n,e,t,i){return qo(n.writeTree,n.treePath,e,t,i)}function ss(n,e){return vu(n.writeTree,n.treePath,e)}function fr(n,e,t,i){return wu(n.writeTree,n.treePath,e,t,i)}function Cn(n,e){return Eu(n.writeTree,A(n.treePath,e))}function bu(n,e,t,i,s,r){return Cu(n.writeTree,n.treePath,e,t,i,s,r)}function rs(n,e,t){return Iu(n.writeTree,n.treePath,e,t)}function jo(n,e){return Ko(A(n.treePath,e),n.writeTree)}function Ko(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Lt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Mt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,it(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Lt(i,e.snapshotNode,s.oldSnap));else throw ht("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Yo=new ku;class os{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new be(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return rs(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Be(this.viewCache_),r=bu(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(n){return{filter:n}}function Nu(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Au(n,e,t,i,s){const r=new Su;let o,a;if(t.type===Q.OVERWRITE){const l=t;l.source.fromUser?o=Ni(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!v(l.path),o=Tn(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===Q.MERGE){const l=t;l.source.fromUser?o=Ou(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Ai(n,e,l.path,l.children,i,s,a,r))}else if(t.type===Q.ACK_USER_WRITE){const l=t;l.revert?o=Mu(n,e,l.path,i,s,r):o=Du(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===Q.LISTEN_COMPLETE)o=xu(n,e,t.path,i,r);else throw ht("Unknown operation type: "+t.type);const c=r.getChanges();return Pu(e,o,c),{viewCache:o,changes:c}}function Pu(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=In(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Vo(In(e)))}}function Qo(n,e,t,i,s,r){const o=e.eventCache;if(Cn(i,t)!=null)return e;{let a,c;if(v(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Be(e),h=l instanceof g?l:g.EMPTY_NODE,d=ss(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=En(i,Be(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=y(t);if(l===".priority"){p(Te(t)===1,"Can't have a priority with additional path components");const h=o.getNode();c=e.serverCache.getNode();const d=fr(i,t,h,c);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=b(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const u=fr(i,t,o.getNode(),c);u!=null?d=o.getNode().getImmediateChild(l).updateChild(h,u):d=o.getNode().getImmediateChild(l)}else d=rs(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,h,s,r):a=o.getNode()}}return kt(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function Tn(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const h=o?n.filter:n.filter.getIndexedFilter();if(v(t))l=h.updateFullNode(c.getNode(),i,null);else if(h.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=h.updateFullNode(c.getNode(),f,null)}else{const f=y(t);if(!c.isCompleteForPath(t)&&Te(t)>1)return e;const _=b(t),R=c.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?l=h.updatePriority(c.getNode(),R):l=h.updateChild(c.getNode(),f,R,_,Yo,null)}const d=$o(e,l,c.isFullyInitialized()||v(t),h.filtersNodes()),u=new os(s,d,r);return Qo(n,d,t,s,u,a)}function Ni(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const h=new os(s,e,r);if(v(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=kt(e,l,!0,n.filter.filtersNodes());else{const d=y(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=kt(e,l,a.isFullyInitialized(),a.isFiltered());else{const u=b(t),f=a.getNode().getImmediateChild(d);let _;if(v(u))_=i;else{const I=h.getCompleteChild(d);I!=null?Yi(u)===".priority"&&I.getChild(Mo(u)).isEmpty()?_=I:_=I.updateChild(u,i):_=g.EMPTY_NODE}if(f.equals(_))c=e;else{const I=n.filter.updateChild(a.getNode(),d,_,u,h,o);c=kt(e,I,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function pr(n,e){return n.eventCache.isCompleteForChild(e)}function Ou(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const h=A(t,c);pr(e,y(h))&&(a=Ni(n,a,h,l,s,r,o))}),i.foreach((c,l)=>{const h=A(t,c);pr(e,y(h))||(a=Ni(n,a,h,l,s,r,o))}),a}function _r(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ai(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;v(t)?l=i:l=new S(null).setTree(t,i);const h=e.serverCache.getNode();return l.children.inorderTraversal((d,u)=>{if(h.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),_=_r(n,f,u);c=Tn(n,c,new C(d),_,s,r,o,a)}}),l.children.inorderTraversal((d,u)=>{const f=!e.serverCache.isCompleteForChild(d)&&u.value===null;if(!h.hasChild(d)&&!f){const _=e.serverCache.getNode().getImmediateChild(d),I=_r(n,_,u);c=Tn(n,c,new C(d),I,s,r,o,a)}}),c}function Du(n,e,t,i,s,r,o){if(Cn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(v(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Tn(n,e,t,c.getNode().getChild(t),s,r,a,o);if(v(t)){let l=new S(null);return c.getNode().forEachChild(Qe,(h,d)=>{l=l.set(new C(h),d)}),Ai(n,e,t,l,s,r,a,o)}else return e}else{let l=new S(null);return i.foreach((h,d)=>{const u=A(t,h);c.isCompleteForPath(u)&&(l=l.set(h,c.getNode().getChild(u)))}),Ai(n,e,t,l,s,r,a,o)}}function xu(n,e,t,i,s){const r=e.serverCache,o=$o(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return Qo(n,o,t,i,Yo,s)}function Mu(n,e,t,i,s,r){let o;if(Cn(i,t)!=null)return e;{const a=new os(i,e,s),c=e.eventCache.getNode();let l;if(v(t)||y(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=En(i,Be(e));else{const d=e.serverCache.getNode();p(d instanceof g,"serverChildren would be complete if leaf node"),h=ss(i,d)}h=h,l=n.filter.updateFullNode(c,h,r)}else{const h=y(t);let d=rs(i,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=c.getImmediateChild(h)),d!=null?l=n.filter.updateChild(c,h,d,b(t),a,r):e.eventCache.getNode().hasChild(h)?l=n.filter.updateChild(c,h,g.EMPTY_NODE,b(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=En(i,Be(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Cn(i,E())!=null,kt(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Zi(i.getIndex()),r=Zh(i);this.processor_=Ru(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),h=new be(c,o.isFullyInitialized(),s.filtersNodes()),d=new be(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Wn(d,h),this.eventGenerator_=new au(this.query_)}get query(){return this.query_}}function Fu(n){return n.viewCache_.serverCache.getNode()}function Uu(n){return In(n.viewCache_)}function Wu(n,e){const t=Be(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(y(e)).isEmpty())?t.getChild(e):null}function gr(n){return n.eventRegistrations_.length===0}function Bu(n,e){n.eventRegistrations_.push(e)}function mr(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function yr(n,e,t,i){e.type===Q.MERGE&&e.source.queryId!==null&&(p(Be(n.viewCache_),"We should always have a full cache before handling merges"),p(In(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Au(n.processor_,s,e,t,i);return Nu(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Jo(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Hu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(k,(r,o)=>{i.push(it(r,o))}),t.isFullyInitialized()&&i.push(Vo(t.getNode())),Jo(n,i,t.getNode(),e)}function Jo(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return cu(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bn;class Xo{constructor(){this.views=new Map}}function Vu(n){p(!bn,"__referenceConstructor has already been defined"),bn=n}function $u(){return p(bn,"Reference.ts has not been loaded"),bn}function Gu(n){return n.views.size===0}function as(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),yr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(yr(o,e,t,i));return r}}function Zo(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=En(t,s?i:null),c=!1;a?c=!0:i instanceof g?(a=ss(t,i),c=!1):(a=g.EMPTY_NODE,c=!1);const l=Wn(new be(a,c,!1),new be(i,s,!1));return new Lu(e,l)}return o}function zu(n,e,t,i,s,r){const o=Zo(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Bu(o,t),Hu(o,t)}function qu(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Se(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(mr(l,t,i)),gr(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(mr(c,t,i)),gr(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Se(n)&&r.push(new($u())(e._repo,e._path)),{removed:r,events:o}}function ea(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ee(n,e){let t=null;for(const i of n.views.values())t=t||Wu(i,e);return t}function ta(n,e){if(e._queryParams.loadsAllData())return Hn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function na(n,e){return ta(n,e)!=null}function Se(n){return Hn(n)!=null}function Hn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sn;function ju(n){p(!Sn,"__referenceConstructor has already been defined"),Sn=n}function Ku(){return p(Sn,"Reference.ts has not been loaded"),Sn}let Yu=1;class vr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new S(null),this.pendingWriteTree_=Tu(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function cs(n,e,t,i,s){return du(n.pendingWriteTree_,e,t,i,s),s?gt(n,new We(ts(),e,t)):[]}function Qu(n,e,t,i){fu(n.pendingWriteTree_,e,t,i);const s=S.fromObject(t);return gt(n,new st(ts(),e,s))}function me(n,e,t=!1){const i=pu(n.pendingWriteTree_,e);if(_u(n.pendingWriteTree_,e)){let r=new S(null);return i.snap!=null?r=r.set(E(),!0):M(i.children,o=>{r=r.set(new C(o),!0)}),gt(n,new wn(i.path,r,t))}else return[]}function zt(n,e,t){return gt(n,new We(ns(),e,t))}function Ju(n,e,t){const i=S.fromObject(t);return gt(n,new st(ns(),e,i))}function Xu(n,e){return gt(n,new Ut(ns(),e))}function Zu(n,e,t){const i=ls(n,t);if(i){const s=hs(i),r=s.path,o=s.queryId,a=U(r,e),c=new Ut(is(o),a);return us(n,r,c)}else return[]}function kn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||na(o,e))){const c=qu(o,e,t,i);Gu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const h=l.findIndex(u=>u._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(u,f)=>Se(f));if(h&&!d){const u=n.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=nd(u);for(let _=0;_<f.length;++_){const I=f[_],R=I.query,H=oa(n,I);n.listenProvider_.startListening(Nt(R),Wt(n,R),H.hashFn,H.onComplete)}}}!d&&l.length>0&&!i&&(h?n.listenProvider_.stopListening(Nt(e),null):l.forEach(u=>{const f=n.queryToTagMap.get($n(u));n.listenProvider_.stopListening(Nt(u),f)}))}id(n,l)}return a}function ia(n,e,t,i){const s=ls(n,i);if(s!=null){const r=hs(s),o=r.path,a=r.queryId,c=U(o,e),l=new We(is(a),c,t);return us(n,o,l)}else return[]}function ed(n,e,t,i){const s=ls(n,i);if(s){const r=hs(s),o=r.path,a=r.queryId,c=U(o,e),l=S.fromObject(t),h=new st(is(a),c,l);return us(n,o,h)}else return[]}function Pi(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(u,f)=>{const _=U(u,s);r=r||Ee(f,_),o=o||Se(f)});let a=n.syncPointTree_.get(s);a?(o=o||Se(a),r=r||Ee(a,E())):(a=new Xo,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,_)=>{const I=Ee(_,E());I&&(r=r.updateImmediateChild(f,I))}));const l=na(a,e);if(!l&&!e._queryParams.loadsAllData()){const u=$n(e);p(!n.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=sd();n.queryToTagMap.set(u,f),n.tagToQueryMap.set(f,u)}const h=Bn(n.pendingWriteTree_,s);let d=zu(a,e,t,h,r,c);if(!l&&!o&&!i){const u=ta(a,e);d=d.concat(rd(n,e,u))}return d}function Vn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=U(o,e),l=Ee(a,c);if(l)return l});return qo(s,e,r,t,!0)}function td(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,h)=>{const d=U(l,t);i=i||Ee(h,d)});let s=n.syncPointTree_.get(t);s?i=i||Ee(s,E()):(s=new Xo,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new be(i,!0,!1):null,a=Bn(n.pendingWriteTree_,e._path),c=Zo(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return Uu(c)}function gt(n,e){return sa(e,n.syncPointTree_,null,Bn(n.pendingWriteTree_,E()))}function sa(n,e,t,i){if(v(n.path))return ra(n,e,t,i);{const s=e.get(E());t==null&&s!=null&&(t=Ee(s,E()));let r=[];const o=y(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,h=jo(i,o);r=r.concat(sa(a,c,l,h))}return s&&(r=r.concat(as(s,n,i,t))),r}}function ra(n,e,t,i){const s=e.get(E());t==null&&s!=null&&(t=Ee(s,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=jo(i,o),h=n.operationForChild(o);h&&(r=r.concat(ra(h,a,c,l)))}),s&&(r=r.concat(as(s,n,i,t))),r}function oa(n,e){const t=e.query,i=Wt(n,t);return{hashFn:()=>(Fu(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Zu(n,t._path,i):Xu(n,t._path);{const r=Jl(s,t);return kn(n,t,null,r)}}}}function Wt(n,e){const t=$n(e);return n.queryToTagMap.get(t)}function $n(n){return n._path.toString()+"$"+n._queryIdentifier}function ls(n,e){return n.tagToQueryMap.get(e)}function hs(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new C(n.substr(0,e))}}function us(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=Bn(n.pendingWriteTree_,e);return as(i,t,s,null)}function nd(n){return n.fold((e,t,i)=>{if(t&&Se(t))return[Hn(t)];{let s=[];return t&&(s=ea(t)),M(i,(r,o)=>{s=s.concat(o)}),s}})}function Nt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Ku())(n._repo,n._path):n}function id(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=$n(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function sd(){return Yu++}function rd(n,e,t){const i=e._path,s=Wt(n,e),r=oa(n,t),o=n.listenProvider_.startListening(Nt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!Se(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,h,d)=>{if(!v(l)&&h&&Se(h))return[Hn(h).query];{let u=[];return h&&(u=u.concat(ea(h).map(f=>f.query))),M(d,(f,_)=>{u=u.concat(_)}),u}});for(let l=0;l<c.length;++l){const h=c[l];n.listenProvider_.stopListening(Nt(h),Wt(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ds(t)}node(){return this.node_}}class fs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new fs(this.syncTree_,t)}node(){return Vn(this.syncTree_,this.path_)}}const od=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},wr=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ad(n[".sv"],e,t);if(typeof n[".sv"]=="object")return cd(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ad=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},cd=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},aa=function(n,e,t,i){return _s(e,new fs(t,n),i)},ps=function(n,e,t){return _s(n,new ds(e),t)};function _s(n,e,t){const i=n.getPriority().val(),s=wr(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=wr(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new O(a,N(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new O(s))),o.forEachChild(k,(a,c)=>{const l=_s(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Gn(n,e){let t=e instanceof C?e:new C(e),i=n,s=y(t);for(;s!==null;){const r=Me(i.node.children,s)||{children:{},childCount:0};i=new gs(s,i,r),t=b(t),s=y(t)}return i}function Ge(n){return n.node.value}function ms(n,e){n.node.value=e,Oi(n)}function ca(n){return n.node.childCount>0}function ld(n){return Ge(n)===void 0&&!ca(n)}function zn(n,e){M(n.node.children,(t,i)=>{e(new gs(t,n,i))})}function la(n,e,t,i){t&&e(n),zn(n,s=>{la(s,e,!0)})}function hd(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function qt(n){return new C(n.parent===null?n.name:qt(n.parent)+"/"+n.name)}function Oi(n){n.parent!==null&&ud(n.parent,n.name,n)}function ud(n,e,t){const i=ld(t),s=te(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Oi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Oi(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd=/[\[\].#$\/\u0000-\u001F\u007F]/,fd=/[\[\].#$\u0000-\u001F\u007F]/,ui=10*1024*1024,ys=function(n){return typeof n=="string"&&n.length!==0&&!dd.test(n)},ha=function(n){return typeof n=="string"&&n.length!==0&&!fd.test(n)},pd=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ha(n)},vs=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Fn(n)||n&&typeof n=="object"&&te(n,".sv")},Di=function(n,e,t,i){jt(et(n,"value"),e,t)},jt=function(n,e,t){const i=t instanceof C?new Ph(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ae(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ae(i)+" with contents = "+e.toString());if(Fn(e))throw new Error(n+"contains "+e.toString()+" "+Ae(i));if(typeof e=="string"&&e.length>ui/3&&Ln(e)>ui)throw new Error(n+"contains a string greater than "+ui+" utf8 bytes "+Ae(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(M(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ys(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ae(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Oh(i,o),jt(n,a,i),Dh(i)}),s&&r)throw new Error(n+' contains ".value" child '+Ae(i)+" in addition to actual children.")}},_d=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=xt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ys(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ah);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&j(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ua=function(n,e,t,i){const s=et(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];M(e,(o,a)=>{const c=new C(o);if(jt(s,a,A(t,c)),Yi(c)===".priority"&&!vs(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),_d(s,r)},gd=function(n,e,t){if(Fn(e))throw new Error(et(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!vs(e))throw new Error(et(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},da=function(n,e,t,i){if(!ha(t))throw new Error(et(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},md=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),da(n,e,t)},Oe=function(n,e){if(y(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},yd=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ys(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!pd(t))throw new Error(et(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function qn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Qi(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function fa(n,e,t){qn(n,t),pa(n,i=>Qi(i,e))}function G(n,e,t){qn(n,t),pa(n,i=>j(i,e)||j(e,i))}function pa(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(wd(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function wd(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();bt&&x("event: "+t.toString()),pt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="repo_interrupt",Ed=25;class Cd{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new vd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=vn(),this.transactionQueueTree_=new gs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Td(n,e,t){if(n.stats_=ji(n.repoInfo_),n.forceRestClient_||th())n.server_=new yn(n.repoInfo_,(i,s,r,o)=>{Ir(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Er(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{P(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new le(n.repoInfo_,e,(i,s,r,o)=>{Ir(n,i,s,r,o)},i=>{Er(n,i)},i=>{Sd(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=oh(n.repoInfo_,()=>new ou(n.stats_,n.server_)),n.infoData_=new tu,n.infoSyncTree_=new vr({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=zt(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ws(n,"connected",!1),n.serverSyncTree_=new vr({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);G(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function bd(n){const t=n.infoData_.getNode(new C(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Kt(n){return od({timestamp:bd(n)})}function Ir(n,e,t,i,s){n.dataUpdateCount++;const r=new C(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=fn(t,l=>N(l));o=ed(n.serverSyncTree_,r,c,s)}else{const c=N(t);o=ia(n.serverSyncTree_,r,c,s)}else if(i){const c=fn(t,l=>N(l));o=Ju(n.serverSyncTree_,r,c)}else{const c=N(t);o=zt(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=ot(n,r)),G(n.eventQueue_,a,o)}function Er(n,e){ws(n,"connected",e),e===!1&&Ad(n)}function Sd(n,e){M(e,(t,i)=>{ws(n,t,i)})}function ws(n,e,t){const i=new C("/.info/"+e),s=N(t);n.infoData_.updateSnapshot(i,s);const r=zt(n.infoSyncTree_,i,s);G(n.eventQueue_,i,r)}function jn(n){return n.nextWriteId_++}function kd(n,e,t){const i=td(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=N(s).withIndex(e._queryParams.getIndex());Pi(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=zt(n.serverSyncTree_,e._path,r);else{const a=Wt(n.serverSyncTree_,e);o=ia(n.serverSyncTree_,e._path,r,a)}return G(n.eventQueue_,e._path,o),kn(n.serverSyncTree_,e,t,null,!0),r},s=>(mt(n,"get for query "+P(e)+" failed: "+s),Promise.reject(new Error(s))))}function Rd(n,e,t,i,s){mt(n,"set",{path:e.toString(),value:t,priority:i});const r=Kt(n),o=N(t,i),a=Vn(n.serverSyncTree_,e),c=ps(o,a,r),l=jn(n),h=cs(n.serverSyncTree_,e,c,l,!0);qn(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(u,f)=>{const _=u==="ok";_||W("set at "+e+" failed: "+u);const I=me(n.serverSyncTree_,l,!_);G(n.eventQueue_,e,I),ke(n,s,u,f)});const d=Es(n,e);ot(n,d),G(n.eventQueue_,d,[])}function Nd(n,e,t,i){mt(n,"update",{path:e.toString(),value:t});let s=!0;const r=Kt(n),o={};if(M(t,(a,c)=>{s=!1,o[a]=aa(A(e,a),N(c),n.serverSyncTree_,r)}),s)x("update() called with empty data.  Don't do anything."),ke(n,i,"ok",void 0);else{const a=jn(n),c=Qu(n.serverSyncTree_,e,o,a);qn(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,h)=>{const d=l==="ok";d||W("update at "+e+" failed: "+l);const u=me(n.serverSyncTree_,a,!d),f=u.length>0?ot(n,e):e;G(n.eventQueue_,f,u),ke(n,i,l,h)}),M(t,l=>{const h=Es(n,A(e,l));ot(n,h)}),G(n.eventQueue_,e,[])}}function Ad(n){mt(n,"onDisconnectEvents");const e=Kt(n),t=vn();bi(n.onDisconnect_,E(),(s,r)=>{const o=aa(s,r,n.serverSyncTree_,e);_t(t,s,o)});let i=[];bi(t,E(),(s,r)=>{i=i.concat(zt(n.serverSyncTree_,s,r));const o=Es(n,s);ot(n,o)}),n.onDisconnect_=vn(),G(n.eventQueue_,E(),i)}function Pd(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Ti(n.onDisconnect_,e),ke(n,t,i,s)})}function Cr(n,e,t,i){const s=N(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&_t(n.onDisconnect_,e,s),ke(n,i,r,o)})}function Od(n,e,t,i,s){const r=N(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&_t(n.onDisconnect_,e,r),ke(n,s,o,a)})}function Dd(n,e,t,i){if(dn(t)){x("onDisconnect().update() called with empty data.  Don't do anything."),ke(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&M(t,(o,a)=>{const c=N(a);_t(n.onDisconnect_,A(e,o),c)}),ke(n,i,s,r)})}function xd(n,e,t){let i;y(e._path)===".info"?i=Pi(n.infoSyncTree_,e,t):i=Pi(n.serverSyncTree_,e,t),fa(n.eventQueue_,e._path,i)}function Md(n,e,t){let i;y(e._path)===".info"?i=kn(n.infoSyncTree_,e,t):i=kn(n.serverSyncTree_,e,t),fa(n.eventQueue_,e._path,i)}function Ld(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Id)}function mt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),x(t,...e)}function ke(n,e,t,i){e&&pt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Fd(n,e,t,i,s,r){mt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:fo(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Is(n,e,void 0);o.currentInputSnapshot=a;const c=o.update(a.val());if(c===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{jt("transaction failed: Data returned ",c,o.path),o.status=0;const l=Gn(n.transactionQueueTree_,e),h=Ge(l)||[];h.push(o),ms(l,h);let d;typeof c=="object"&&c!==null&&te(c,".priority")?(d=Me(c,".priority"),p(vs(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(Vn(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const u=Kt(n),f=N(c,d),_=ps(f,a,u);o.currentOutputSnapshotRaw=f,o.currentOutputSnapshotResolved=_,o.currentWriteId=jn(n);const I=cs(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);G(n.eventQueue_,e,I),Kn(n,n.transactionQueueTree_)}}function Is(n,e,t){return Vn(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Kn(n,e=n.transactionQueueTree_){if(e||Yn(n,e),Ge(e)){const t=ga(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Ud(n,qt(e),t)}else ca(e)&&zn(e,t=>{Kn(n,t)})}function Ud(n,e,t){const i=t.map(l=>l.currentWriteId),s=Is(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const h=t[l];p(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=U(e,h.path);r=r.updateChild(d,h.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{mt(n,"transaction put response",{path:c.toString(),status:l});let h=[];if(l==="ok"){const d=[];for(let u=0;u<t.length;u++)t[u].status=2,h=h.concat(me(n.serverSyncTree_,t[u].currentWriteId)),t[u].onComplete&&d.push(()=>t[u].onComplete(null,!0,t[u].currentOutputSnapshotResolved)),t[u].unwatcher();Yn(n,Gn(n.transactionQueueTree_,e)),Kn(n,n.transactionQueueTree_),G(n.eventQueue_,e,h);for(let u=0;u<d.length;u++)pt(d[u])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{W("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}ot(n,e)}},o)}function ot(n,e){const t=_a(n,e),i=qt(t),s=ga(n,t);return Wd(n,s,i),i}function Wd(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=U(t,c.path);let h=!1,d;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,s=s.concat(me(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Ed)h=!0,d="maxretry",s=s.concat(me(n.serverSyncTree_,c.currentWriteId,!0));else{const u=Is(n,c.path,o);c.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){jt("transaction failed: Data returned ",f,c.path);let _=N(f);typeof f=="object"&&f!=null&&te(f,".priority")||(_=_.updatePriority(u.getPriority()));const R=c.currentWriteId,H=Kt(n),F=ps(_,u,H);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=F,c.currentWriteId=jn(n),o.splice(o.indexOf(R),1),s=s.concat(cs(n.serverSyncTree_,c.path,F,c.currentWriteId,c.applyLocally)),s=s.concat(me(n.serverSyncTree_,R,!0))}else h=!0,d="nodata",s=s.concat(me(n.serverSyncTree_,c.currentWriteId,!0))}G(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(u){setTimeout(u,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}Yn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)pt(i[a]);Kn(n,n.transactionQueueTree_)}function _a(n,e){let t,i=n.transactionQueueTree_;for(t=y(e);t!==null&&Ge(i)===void 0;)i=Gn(i,t),e=b(e),t=y(e);return i}function ga(n,e){const t=[];return ma(n,e,t),t.sort((i,s)=>i.order-s.order),t}function ma(n,e,t){const i=Ge(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);zn(e,s=>{ma(n,s,t)})}function Yn(n,e){const t=Ge(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,ms(e,t.length>0?t:void 0)}zn(e,i=>{Yn(n,i)})}function Es(n,e){const t=qt(_a(n,e)),i=Gn(n.transactionQueueTree_,e);return hd(i,s=>{di(n,s)}),di(n,i),la(i,s=>{di(n,s)}),t}function di(n,e){const t=Ge(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(me(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ms(e,void 0):t.length=r+1,G(n.eventQueue_,qt(e),s);for(let o=0;o<i.length;o++)pt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bd(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Hd(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):W(`Invalid query segment '${t}' in query '${n}'`)}return e}const Tr=function(n,e){const t=Vd(n),i=t.namespace;t.domain==="firebase.com"&&ue(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||ql();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new So(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new C(t.pathString)}},Vd=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(s=Bd(n.substring(h,d)));const u=Hd(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+P(this.snapshot.exportVal())}}class Gd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new K;return Pd(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Oe("OnDisconnect.remove",this._path);const e=new K;return Cr(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Oe("OnDisconnect.set",this._path),Di("OnDisconnect.set",e,this._path);const t=new K;return Cr(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Oe("OnDisconnect.setWithPriority",this._path),Di("OnDisconnect.setWithPriority",e,this._path),gd("OnDisconnect.setWithPriority",t);const i=new K;return Od(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){Oe("OnDisconnect.update",this._path),ua("OnDisconnect.update",e,this._path);const t=new K;return Dd(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return v(this._path)?null:Yi(this._path)}get ref(){return new se(this._repo,this._path)}get _queryIdentifier(){const e=lr(this._queryParams),t=zi(e);return t==="{}"?"default":t}get _queryObject(){return lr(this._queryParams)}isEqual(e){if(e=L(e),!(e instanceof Qn))return!1;const t=this._repo===e._repo,i=Qi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Nh(this._path)}}class se extends Qn{constructor(e,t){super(e,t,new es,!1)}get parent(){const e=Mo(this._path);return e===null?null:new se(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class at{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new C(e),i=xi(this.ref,e);return new at(this._node.getChild(t),i,k)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new at(s,xi(this.ref,i),k)))}hasChild(e){const t=new C(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Rn(n,e){return n=L(n),n._checkNotDeleted("ref"),e!==void 0?xi(n._root,e):n._root}function xi(n,e){return n=L(n),y(n._path)===null?md("child","path",e):da("child","path",e),new se(n._repo,A(n._path,e))}function E_(n){return n=L(n),new zd(n._repo,n._path)}function C_(n){return Oe("remove",n._path),qd(n,null)}function qd(n,e){n=L(n),Oe("set",n._path),Di("set",e,n._path);const t=new K;return Rd(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function jd(n,e){ua("update",e,n._path);const t=new K;return Nd(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Kd(n){n=L(n);const e=new ya(()=>{}),t=new Jn(e);return kd(n._repo,n,t).then(i=>new at(i,new se(n._repo,n._path),n._queryParams.getIndex()))}class Jn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new $d("value",this,new at(e.snapshotNode,new se(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Gd(this,e,t):null}matches(e){return e instanceof Jn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Yd(n,e,t,i,s){const r=new ya(t,void 0),o=new Jn(r);return xd(n._repo,n,o),()=>Md(n._repo,n,o)}function Cs(n,e,t,i){return Yd(n,"value",e)}class Qd{}class Jd extends Qd{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Qn(e._repo,e._path,eu(e._queryParams,this._limit),e._orderByCalled)}}function T_(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new Jd(n)}function b_(n,...e){let t=L(n);for(const i of e)t=i._apply(t);return t}Vu(se);ju(se);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="FIREBASE_DATABASE_EMULATOR_HOST",Mi={};let Zd=!1;function ef(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=ut(r);n.repoInfo_=new So(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function tf(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),x("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Tr(r,s),a=o.repoInfo,c;typeof process<"u"&&zs&&(c=zs[Xd]),c?(r=`http://${c}?ns=${a.namespace}`,o=Tr(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new ih(n.name,n.options,e);yd("Invalid Firebase Database URL",o),v(o.path)||ue("Database URL must point to the root of a Firebase Database (not including a child path).");const h=sf(a,n,l,new nh(n,t));return new rf(h,n)}function nf(n,e){const t=Mi[e];(!t||t[n.key]!==n)&&ue(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Ld(n),delete t[n.key]}function sf(n,e,t,i){let s=Mi[e.name];s||(s={},Mi[e.name]=s);let r=s[n.toURLString()];return r&&ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Cd(n,Zd,t,i),s[n.toURLString()]=r,r}class rf{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Td(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new se(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(nf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ue("Cannot call "+e+" on a deleted database.")}}function of(n=ao(),e){const t=Gi(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=uc("database");i&&af(t,...i)}return t}function af(n,e,t,i={}){n=L(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Le(i,r.repoInfo_.emulatorOptions))return;ue("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new sn(sn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:dc(i.mockUserToken,n.app.options.projectId);o=new sn(a)}ut(e)&&(eo(e),to("Database",!0)),ef(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf(n){Hl(ft),tt(new Fe("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return tf(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),we(qs,js,n),we(qs,js,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf={".sv":"timestamp"};function S_(){return lf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function k_(n,e,t){if(n=L(n),Oe("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=t==null?void 0:t.applyLocally,s=new K,r=(a,c,l)=>{let h=null;a?s.reject(a):(h=new at(l,new se(n._repo,n._path),k),s.resolve(new hf(c,h)))},o=Cs(n,()=>{});return Fd(n._repo,n._path,e,r,o,i),s.promise}le.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};le.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};cf();function va(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const uf=va,wa=new Ht("auth","Firebase",va());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=new Vi("@firebase/auth");function df(n,...e){Nn.logLevel<=T.WARN&&Nn.warn(`Auth (${ft}): ${n}`,...e)}function rn(n,...e){Nn.logLevel<=T.ERROR&&Nn.error(`Auth (${ft}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n,...e){throw bs(n,...e)}function Z(n,...e){return bs(n,...e)}function Ts(n,e,t){const i={...uf(),[e]:t};return new Ht("auth","Firebase",i).create(e,{appName:n.name})}function Ce(n){return Ts(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ia(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&ie(n,"argument-error"),Ts(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function bs(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return wa.create(n,...e)}function m(n,e,...t){if(!n)throw bs(e,...t)}function ae(n){const e="INTERNAL ASSERTION FAILED: "+n;throw rn(e),new Error(e)}function de(n,e){n||ae(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function ff(){return br()==="http:"||br()==="https:"}function br(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ff()||gc()||"connection"in navigator)?navigator.onLine:!0}function _f(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t){this.shortDelay=e,this.longDelay=t,de(t>e,"Short delay should be less than long delay!"),this.isMobile=Hi()||no()}get(){return pf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(n,e){de(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ae("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ae("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ae("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],yf=new Yt(3e4,6e4);function ks(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yt(n,e,t,i,s={}){return Ca(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=dt({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return _c()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&ut(n.emulatorConfig.host)&&(l.credentials="include"),Ea.fetch()(await Ta(n,n.config.apiHost,t,a),l)})}async function Ca(n,e,t){n._canInitEmulator=!1;const i={...gf,...e};try{const s=new wf(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw tn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw tn(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw tn(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw tn(n,"user-disabled",o);const h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ts(n,h,l);ie(n,h)}}catch(s){if(s instanceof Re)throw s;ie(n,"network-request-failed",{message:String(s)})}}async function vf(n,e,t,i,s={}){const r=await yt(n,e,t,i,s);return"mfaPendingCredential"in r&&ie(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Ta(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Ss(n.config,s):`${n.config.apiScheme}://${s}`;return mf.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class wf{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Z(this.auth,"network-request-failed")),yf.get())})}}function tn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Z(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function If(n,e){return yt(n,"POST","/v1/accounts:delete",e)}async function An(n,e){return yt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ef(n,e=!1){const t=L(n),i=await t.getIdToken(e),s=Rs(i);m(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:At(fi(s.auth_time)),issuedAtTime:At(fi(s.iat)),expirationTime:At(fi(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function fi(n){return Number(n)*1e3}function Rs(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return rn("JWT malformed, contained fewer than 3 sections"),null;try{const s=un(t);return s?JSON.parse(s):(rn("Failed to decode base64 JWT payload"),null)}catch(s){return rn("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Sr(n){const e=Rs(n);return m(e,"internal-error"),m(typeof e.exp<"u","internal-error"),m(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Re&&Cf(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Cf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=At(this.lastLoginAt),this.creationTime=At(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pn(n){var d;const e=n.auth,t=await n.getIdToken(),i=await Bt(n,An(e,{idToken:t}));m(i==null?void 0:i.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=(d=s.providerUserInfo)!=null&&d.length?ba(s.providerUserInfo):[],o=Sf(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Fi(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function bf(n){const e=L(n);await Pn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Sf(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function ba(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e){const t=await Ca(n,{},async()=>{const i=dt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Ta(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&ut(n.emulatorConfig.host)&&(c.credentials="include"),Ea.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Rf(n,e){return yt(n,"POST","/v2/accounts:revokeToken",ks(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){m(e.idToken,"internal-error"),m(typeof e.idToken<"u","internal-error"),m(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Sr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){m(e.length!==0,"internal-error");const t=Sr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(m(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await kf(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Je;return i&&(m(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(m(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(m(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Je,this.toJSON())}_performRefresh(){return ae("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(n,e){m(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class J{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new Tf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Fi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Bt(this,this.stsTokenManager.getToken(this.auth,e));return m(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ef(this,e)}reload(){return bf(this)}_assign(e){this!==e&&(m(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new J({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){m(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Pn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(q(this.auth.app))return Promise.reject(Ce(this.auth));const e=await this.getIdToken();return await Bt(this,If(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:d,emailVerified:u,isAnonymous:f,providerData:_,stsTokenManager:I}=t;m(d&&I,e,"internal-error");const R=Je.fromJSON(this.name,I);m(typeof d=="string",e,"internal-error"),fe(i,e.name),fe(s,e.name),m(typeof u=="boolean",e,"internal-error"),m(typeof f=="boolean",e,"internal-error"),fe(r,e.name),fe(o,e.name),fe(a,e.name),fe(c,e.name),fe(l,e.name),fe(h,e.name);const H=new J({uid:d,auth:e,email:s,emailVerified:u,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:R,createdAt:l,lastLoginAt:h});return _&&Array.isArray(_)&&(H.providerData=_.map(F=>({...F}))),c&&(H._redirectEventId=c),H}static async _fromIdTokenResponse(e,t,i=!1){const s=new Je;s.updateFromServerResponse(t);const r=new J({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Pn(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];m(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?ba(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Je;a.updateFromIdToken(i);const c=new J({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Fi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr=new Map;function ce(n){de(n instanceof Function,"Expected a class definition");let e=kr.get(n);return e?(de(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,kr.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Sa.type="NONE";const Rr=Sa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(n,e,t){return`firebase:${n}:${e}:${t}`}class Xe{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=on(this.userKey,s.apiKey,r),this.fullPersistenceKey=on("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await An(this.auth,{idToken:e}).catch(()=>{});return t?J._fromGetAccountInfoResponse(this.auth,t,e):null}return J._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Xe(ce(Rr),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||ce(Rr);const o=on(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){let d;if(typeof h=="string"){const u=await An(e,{idToken:h}).catch(()=>{});if(!u)break;d=await J._fromGetAccountInfoResponse(e,u,h)}else d=J._fromJSON(e,h);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Xe(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Xe(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Aa(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ka(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Oa(e))return"Blackberry";if(Da(e))return"Webos";if(Ra(e))return"Safari";if((e.includes("chrome/")||Na(e))&&!e.includes("edge/"))return"Chrome";if(Pa(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function ka(n=B()){return/firefox\//i.test(n)}function Ra(n=B()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Na(n=B()){return/crios\//i.test(n)}function Aa(n=B()){return/iemobile/i.test(n)}function Pa(n=B()){return/android/i.test(n)}function Oa(n=B()){return/blackberry/i.test(n)}function Da(n=B()){return/webos/i.test(n)}function Ns(n=B()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Nf(n=B()){var e;return Ns(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Af(){return mc()&&document.documentMode===10}function xa(n=B()){return Ns(n)||Pa(n)||Da(n)||Oa(n)||/windows phone/i.test(n)||Aa(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(n,e=[]){let t;switch(n){case"Browser":t=Nr(B());break;case"Worker":t=`${Nr(B())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ft}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Of(n,e={}){return yt(n,"GET","/v2/passwordPolicy",ks(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=6;class xf{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Df,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ar(this),this.idTokenSubscription=new Ar(this),this.beforeStateQueue=new Pf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=wa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ce(t)),this._initializationPromise=this.queue(async()=>{var i,s,r;if(!this._deleted&&(this.persistenceManager=await Xe.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await An(this,{idToken:e}),i=await J._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var r;if(q(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(r=this.redirectUser)==null?void 0:r._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return m(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Pn(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_f()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(q(this.app))return Promise.reject(Ce(this));const t=e?L(e):null;return t&&m(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&m(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return q(this.app)?Promise.reject(Ce(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return q(this.app)?Promise.reject(Ce(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ce(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Of(this),t=new xf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ht("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Rf(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ce(e)||this._popupRedirectResolver;m(t,this,"argument-error"),this.redirectPersistenceManager=await Xe.create(this,[ce(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(m(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return m(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ma(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(q(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&df(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function vt(n){return L(n)}class Ar{constructor(e){this.auth=e,this.observer=null,this.addObserver=kc(t=>this.observer=t)}get next(){return m(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let As={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Lf(n){As=n}function Ff(n){return As.loadJS(n)}function Uf(){return As.gapiScript}function Wf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(n,e){const t=Gi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Le(r,e??{}))return s;ie(s,"already-initialized")}return t.initialize({options:e})}function Hf(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(ce);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Vf(n,e,t){const i=vt(n);m(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=La(e),{host:o,port:a}=$f(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){m(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),m(Le(l,i.config.emulator)&&Le(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,ut(o)?(eo(`${r}//${o}${c}`),to("Auth",!0)):Gf()}function La(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $f(n){const e=La(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Pr(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Pr(o)}}}function Pr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Gf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ae("not implemented")}_getIdTokenResponse(e){return ae("not implemented")}_linkToIdToken(e,t){return ae("not implemented")}_getReauthenticationResolver(e){return ae("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ze(n,e){return vf(n,"POST","/v1/accounts:signInWithIdp",ks(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf="http://localhost";class He extends Fa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new He(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ie("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new He(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ze(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Ze(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ze(e,t)}buildRequest(){const e={requestUri:zf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=dt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends Xn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe extends Qt{constructor(){super("facebook.com")}static credential(e){return He._fromParams({providerId:pe.PROVIDER_ID,signInMethod:pe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pe.credentialFromTaggedObject(e)}static credentialFromError(e){return pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pe.credential(e.oauthAccessToken)}catch{return null}}}pe.FACEBOOK_SIGN_IN_METHOD="facebook.com";pe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re extends Qt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return He._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return re.credential(t,i)}catch{return null}}}re.GOOGLE_SIGN_IN_METHOD="google.com";re.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends Qt{constructor(){super("github.com")}static credential(e){return He._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _e.credentialFromTaggedObject(e)}static credentialFromError(e){return _e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _e.credential(e.oauthAccessToken)}catch{return null}}}_e.GITHUB_SIGN_IN_METHOD="github.com";_e.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge extends Qt{constructor(){super("twitter.com")}static credential(e,t){return He._fromParams({providerId:ge.PROVIDER_ID,signInMethod:ge.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ge.credentialFromTaggedObject(e)}static credentialFromError(e){return ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ge.credential(t,i)}catch{return null}}}ge.TWITTER_SIGN_IN_METHOD="twitter.com";ge.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await J._fromIdTokenResponse(e,i,s),o=Or(i);return new ct({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Or(i);return new ct({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Or(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On extends Re{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,On.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new On(e,t,i,s)}}function Ua(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?On._fromErrorAndOperation(n,r,e,i):r})}async function qf(n,e,t=!1){const i=await Bt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ct._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jf(n,e,t=!1){const{auth:i}=n;if(q(i.app))return Promise.reject(Ce(i));const s="reauthenticate";try{const r=await Bt(n,Ua(i,s,e,n),t);m(r.idToken,i,"internal-error");const o=Rs(r.idToken);m(o,i,"internal-error");const{sub:a}=o;return m(n.uid===a,i,"user-mismatch"),ct._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&ie(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kf(n,e,t=!1){if(q(n.app))return Promise.reject(Ce(n));const i="signIn",s=await Ua(n,i,e),r=await ct._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Yf(n,e,t,i){return L(n).onIdTokenChanged(e,t,i)}function Qf(n,e,t){return L(n).beforeAuthStateChanged(e,t)}function R_(n,e,t,i){return L(n).onAuthStateChanged(e,t,i)}const Dn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Dn,"1"),this.storage.removeItem(Dn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=1e3,Xf=10;class Ba extends Wa{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Af()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Xf):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Jf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ba.type="LOCAL";const Zf=Ba;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha extends Wa{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ha.type="SESSION";const Va=Ha;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ep(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Zn(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await ep(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Zn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Ps("",20);s.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const u=d;if(u.data.eventId===l)switch(u.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(u.data.response);break;default:clearTimeout(h),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(){return window}function np(n){ne().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(){return typeof ne().WorkerGlobalScope<"u"&&typeof ne().importScripts=="function"}async function ip(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function rp(){return $a()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="firebaseLocalStorageDb",op=1,xn="firebaseLocalStorage",za="fbase_key";class Jt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ei(n,e){return n.transaction([xn],e?"readwrite":"readonly").objectStore(xn)}function ap(){const n=indexedDB.deleteDatabase(Ga);return new Jt(n).toPromise()}function Ui(){const n=indexedDB.open(Ga,op);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(xn,{keyPath:za})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(xn)?e(i):(i.close(),await ap(),e(await Ui()))})})}async function Dr(n,e,t){const i=ei(n,!0).put({[za]:e,value:t});return new Jt(i).toPromise()}async function cp(n,e){const t=ei(n,!1).get(e),i=await new Jt(t).toPromise();return i===void 0?null:i.value}function xr(n,e){const t=ei(n,!0).delete(e);return new Jt(t).toPromise()}const lp=800,hp=3;class qa{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ui(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>hp)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return $a()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Zn._getInstance(rp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await ip(),!this.activeServiceWorker)return;this.sender=new tp(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ui();return await Dr(e,Dn,"1"),await xr(e,Dn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Dr(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>cp(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>xr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=ei(s,!1).getAll();return new Jt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}qa.type="LOCAL";const up=qa;new Yt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(n,e){return e?ce(e):(m(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends Fa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ze(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ze(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ze(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function dp(n){return Kf(n.auth,new Ds(n),n.bypassAuthState)}function fp(n){const{auth:e,user:t}=n;return m(t,e,"internal-error"),jf(t,new Ds(n),n.bypassAuthState)}async function pp(n){const{auth:e,user:t}=n;return m(t,e,"internal-error"),qf(t,new Ds(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dp;case"linkViaPopup":case"linkViaRedirect":return pp;case"reauthViaPopup":case"reauthViaRedirect":return fp;default:ie(this.auth,"internal-error")}}resolve(e){de(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){de(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=new Yt(2e3,1e4);async function N_(n,e,t){if(q(n.app))return Promise.reject(Z(n,"operation-not-supported-in-this-environment"));const i=vt(n);Ia(n,e,Xn);const s=Os(i,t);return new De(i,"signInViaPopup",e,s).executeNotNull()}class De extends ja{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,De.currentPopupAction&&De.currentPopupAction.cancel(),De.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return m(e,this.auth,"internal-error"),e}async onExecution(){de(this.filter.length===1,"Popup operations only handle one event");const e=Ps();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Z(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Z(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,De.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Z(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_p.get())};e()}}De.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp="pendingRedirect",an=new Map;class mp extends ja{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=an.get(this.auth._key());if(!e){try{const i=await yp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}an.set(this.auth._key(),e)}return this.bypassAuthState||an.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yp(n,e){const t=Ya(e),i=Ka(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function vp(n,e){return Ka(n)._set(Ya(e),"true")}function wp(n,e){an.set(n._key(),e)}function Ka(n){return ce(n._redirectPersistence)}function Ya(n){return on(gp,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_(n,e,t){return Ip(n,e,t)}async function Ip(n,e,t){if(q(n.app))return Promise.reject(Ce(n));const i=vt(n);Ia(n,e,Xn),await i._initializationPromise;const s=Os(i,t);return await vp(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function P_(n,e){return await vt(n)._initializationPromise,Qa(n,e,!1)}async function Qa(n,e,t=!1){if(q(n.app))return Promise.reject(Ce(n));const i=vt(n),s=Os(i,e),o=await new mp(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=10*60*1e3;class Cp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Ja(e)){const s=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(Z(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ep&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mr(e))}saveEventToCache(e){this.cachedEventUids.add(Mr(e)),this.lastProcessedEventTime=Date.now()}}function Mr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ja({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Tp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ja(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bp(n,e={}){return yt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kp=/^https?/;async function Rp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bp(n);for(const t of e)try{if(Np(t))return}catch{}ie(n,"unauthorized-domain")}function Np(n){const e=Li(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!kp.test(t))return!1;if(Sp.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap=new Yt(3e4,6e4);function Lr(){const n=ne().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Pp(n){return new Promise((e,t)=>{var s,r,o;function i(){Lr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Lr(),t(Z(n,"network-request-failed"))},timeout:Ap.get()})}if((r=(s=ne().gapi)==null?void 0:s.iframes)!=null&&r.Iframe)e(gapi.iframes.getContext());else if((o=ne().gapi)!=null&&o.load)i();else{const a=Wf("iframefcb");return ne()[a]=()=>{gapi.load?i():t(Z(n,"network-request-failed"))},Ff(`${Uf()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw cn=null,e})}let cn=null;function Op(n){return cn=cn||Pp(n),cn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp=new Yt(5e3,15e3),xp="__/auth/iframe",Mp="emulator/auth/iframe",Lp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Up(n){const e=n.config;m(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ss(e,Mp):`https://${n.config.authDomain}/${xp}`,i={apiKey:e.apiKey,appName:n.name,v:ft},s=Fp.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${dt(i).slice(1)}`}async function Wp(n){const e=await Op(n),t=ne().gapi;return m(t,n,"internal-error"),e.open({where:document.body,url:Up(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Lp,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Z(n,"network-request-failed"),a=ne().setTimeout(()=>{r(o)},Dp.get());function c(){ne().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hp=500,Vp=600,$p="_blank",Gp="http://localhost";class Fr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zp(n,e,t,i=Hp,s=Vp){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...Bp,width:i.toString(),height:s.toString(),top:r,left:o},l=B().toLowerCase();t&&(a=Na(l)?$p:t),ka(l)&&(e=e||Gp,c.scrollbars="yes");const h=Object.entries(c).reduce((u,[f,_])=>`${u}${f}=${_},`,"");if(Nf(l)&&a!=="_self")return qp(e||"",a),new Fr(null);const d=window.open(e||"",a,h);m(d,n,"popup-blocked");try{d.focus()}catch{}return new Fr(d)}function qp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp="__/auth/handler",Kp="emulator/auth/handler",Yp=encodeURIComponent("fac");async function Ur(n,e,t,i,s,r){m(n.config.authDomain,n,"auth-domain-config-required"),m(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:ft,eventId:s};if(e instanceof Xn){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",dn(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Qt){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${Yp}=${encodeURIComponent(c)}`:"";return`${Qp(n)}?${dt(a).slice(1)}${l}`}function Qp({config:n}){return n.emulator?Ss(n,Kp):`https://${n.authDomain}/${jp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="webStorageSupport";class Jp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Va,this._completeRedirectFn=Qa,this._overrideRedirectResult=wp}async _openPopup(e,t,i,s){var o;de((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const r=await Ur(e,t,i,Li(),s);return zp(e,r,Ps())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Ur(e,t,i,Li(),s);return np(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(de(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Wp(e),i=new Cp(e);return t.register("authEvent",s=>(m(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(pi,{type:pi},s=>{var o;const r=(o=s==null?void 0:s[0])==null?void 0:o[pi];r!==void 0&&t(!!r),ie(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Rp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return xa()||Ra()||Ns()}}const Xp=Jp;var Wr="@firebase/auth",Br="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){m(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function t_(n){tt(new Fe("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;m(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ma(n)},l=new Mf(i,s,r,c);return Hf(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),tt(new Fe("auth-internal",e=>{const t=vt(e.getProvider("auth").getImmediate());return(i=>new Zp(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),we(Wr,Br,e_(n)),we(Wr,Br,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=5*60,i_=Zr("authIdTokenMaxAge")||n_;let Hr=null;const s_=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>i_)return;const s=t==null?void 0:t.token;Hr!==s&&(Hr=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function r_(n=ao()){const e=Gi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Bf(n,{popupRedirectResolver:Xp,persistence:[up,Zf,Va]}),i=Zr("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=s_(r.toString());Qf(t,o,()=>o(t.currentUser)),Yf(t,a=>o(a))}}const s=Jr("auth");return s&&Vf(t,`http://${s}`),t}function o_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Lf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Z("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",o_().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});t_("Browser");const a_={apiKey:"AIzaSyClUceeJ-yqfxh_v4_l7ldy8JfjRypg3Ng",authDomain:"datn2-7cd83.firebaseapp.com",projectId:"datn2-7cd83",storageBucket:"datn2-7cd83.firebasestorage.app",messagingSenderId:"369880265020",appId:"1:369880265020:web:20734c017235938fc6ee39",measurementId:"G-Q3VQ2HQQVV"},Xa=oo(a_),c_=r_(Xa),Mn=of(Xa),l_=new re;l_.setCustomParameters({prompt:"select_account"});const Za=[{id:1,name:"rook",pos:"A1",v:"b",side:"black",img:"/images/rookB.png",isClick:!1,x:0,y:0},{id:2,name:"knight",pos:"B1",v:"b",side:"black",img:"/images/knightB.png",isClick:!1,x:0,y:1},{id:3,name:"bishop",pos:"C1",v:"b",side:"black",img:"/images/bishopB.png",isClick:!1,x:0,y:2},{id:4,name:"queen",pos:"E1",v:"b",side:"black",img:"/images/queenB.png",isClick:!1,x:0,y:3},{id:5,name:"king",pos:"D1",v:"b",side:"black",img:"/images/kingB.png",isClick:!1,x:0,y:4},{id:6,name:"bishop",pos:"F1",v:"b",side:"black",img:"/images/bishopB.png",isClick:!1,x:0,y:5},{id:7,name:"knight",pos:"G1",v:"b",side:"black",img:"/images/knightB.png",isClick:!1,x:0,y:6},{id:8,name:"rook",pos:"H1",v:"b",side:"black",img:"/images/rookB.png",isClick:!1,x:0,y:77},{id:9,name:"pawn",pos:"A2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:0},{id:10,name:"pawn",pos:"B2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:1},{id:11,name:"pawn",pos:"C2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:2},{id:12,name:"pawn",pos:"D2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:3},{id:13,name:"pawn",pos:"E2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:4},{id:14,name:"pawn",pos:"F2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:5},{id:15,name:"pawn",pos:"G2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:6},{id:16,name:"pawn",pos:"H2",v:"b",side:"black",img:"/images/pawnB.png",isClick:!1,x:1,y:7},{id:17,name:"rook",pos:"A8",v:"w",side:"white",img:"/images/rookW.png",isClick:!1,x:7,y:0},{id:18,name:"knight",pos:"B8",v:"w",side:"white",img:"/images/knightW.png",isClick:!1,x:7,y:1},{id:19,name:"bishop",pos:"C8",v:"w",side:"white",img:"/images/bishopW.png",isClick:!1,x:7,y:2},{id:20,name:"queen",pos:"D8",v:"w",side:"white",img:"/images/queenW.png",isClick:!1,x:7,y:3},{id:21,name:"king",pos:"E8",v:"w",side:"white",img:"/images/kingW.png",isClick:!1,x:7,y:4},{id:22,name:"bishop",pos:"F8",v:"w",side:"white",img:"/images/bishopW.png",isClick:!1,x:7,y:5},{id:23,name:"knight",pos:"G8",v:"w",side:"white",img:"/images/knightW.png",isClick:!1,x:7,y:6},{id:24,name:"rook",pos:"H8",v:"w",side:"white",img:"/images/rookW.png",isClick:!1,x:7,y:7},{id:25,name:"pawn",pos:"A7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:0},{id:26,name:"pawn",pos:"B7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:1},{id:27,name:"pawn",pos:"C7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:2},{id:28,name:"pawn",pos:"D7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:3},{id:29,name:"pawn",pos:"E7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:4},{id:30,name:"pawn",pos:"F7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:5},{id:31,name:"pawn",pos:"G7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:6},{id:32,name:"pawn",pos:"H7",v:"w",side:"white",img:"/images/pawnW.png",isClick:!1,x:6,y:7}],h_=[["A1","B1","C1","D1","E1","F1","G1","H1"],["A2","B2","C2","D2","E2","F2","G2","H2"],["A3","B3","C3","D3","E3","F3","G3","H3"],["A4","B4","C4","D4","E4","F4","G4","H4"],["A5","B5","C5","D5","E5","F5","G5","H5"],["A6","B6","C6","D6","E6","F6","G6","H6"],["A7","B7","C7","D7","E7","F7","G7","H7"],["A8","B8","C8","D8","E8","F8","G8","H8"]],O_=[[1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[25,26,27,28,29,30,31,32],[17,18,19,20,21,22,23,24]];function u_(n,e,t){const i=n.dataset.value,s=Za.find(r=>r.id==i);switch(console.log(t),s.name){case"pawn":return d_(s,e,t);case"knight":return f_(s,e,t);case"rook":return ec(s,e,t);case"bishop":return tc(s,e,t);case"queen":return p_(s,e,t);case"king":return __(s,e,t)}}function ee(n){const e=document.querySelectorAll("#board li");let t=null;return e.forEach((i,s)=>{i.dataset.value==n&&(t=[Math.floor(s/8),s%8])}),console.log(t),t}function lt(n,e,t){if(console.log(t),n<0||n>7||e<0||e>7)return!1;for(const[i,s]of Object.entries(Ke)){const r=ee(i);if(r&&n==r[0]&&e==r[1]&&t.id!=s)return!0}return!1}function Xt(n,e){return n&&e&&n[0]==n[0]&&e[1]==e[1]}function d_(n,e,t){let{isClick:i}=n;const s=ee(e),r=ee(t),o=s[0],a=s[1];let c=[];return lt(o-1,a,n)&&c.push([o-1,a]),console.log(c),!i&&lt(o-2,a,n)&&c.push([o-2,a]),c.some(h=>Xt(h,r))}function f_(n,e,t){const i=ee(e),s=ee(t),r=i[0],o=i[1];let a=[-2,-1,1,2],c=[];for(let h of a)for(let d of a){let u=r+h,f=o+d;lt(u,f,n)&&Math.abs(h*d)==2&&c.push([u,f])}return c.some(h=>Xt(h,s))}function ec(n,e,t){const i=ee(e),s=ee(t),r=i[0],o=i[1];let a=[],c=[1,-1,0];for(let h of c)for(let d of c){if(h*d!=0)continue;let u=r+h,f=o+d;for(;lt(u,f,n);)a.push([u,f]),u+=h,f+=d}return console.log(a),a.some(h=>Xt(h,s))}function tc(n,e,t){const i=ee(e),s=ee(t),r=i[0],o=i[1];let a=[],c=[1,-1];for(let h of c)for(let d of c){let u=r+h,f=o+d;for(;lt(u,f,n);)a.push([u,f]),u+=h,f+=d}return a.some(h=>Xt(h,s))}function p_(n,e,t){let i=tc(n,e,t),s=ec(n,e,t);return i||s}function __(n,e,t){const i=ee(e),s=ee(t),r=i[0],o=i[1];let a=[],c=[1,-1,0];for(let h of c)for(let d of c){let u=r+h,f=o+d;lt(u,f,n)&&(a.push([u,f]),u+=h,f+=d)}return a.some(h=>Xt(h,s))}const xe=document.getElementById("board");let $=null,Vr=0,$r=0,Gr=0,zr=0,nn=null,ln="",_i=null,Ke=null;function g_(){const n=Array.from(xe.children);for(let e=7;e>=0;e--)for(let t=0;t<8;t++)xe.appendChild(n[e*8+t])}async function m_(n){const e=n.val(),t=n.key,{a:i,b:s}=e,o=c_.currentUser.uid==i?"white":"black";ln=o,h_.flat().forEach((a,c)=>{const l=document.createElement("li");l.className="square",l.dataset.value=a,xe.appendChild(l)}),y_(),o=="black"&&g_(),await v_(t)}function y_(){document.querySelectorAll("#board li").forEach((e,t)=>{e.style.backgroundColor=(Math.floor(t/8)+t)%2==0?"#EEEED2":"#769656"})}async function v_(n,e,t){const i=Rn(Mn,`matches/${n}/board`),s=document.querySelectorAll("#board li");Cs(i,r=>{if(!r.exists())return;const o=r.val();Ke=o;const a=[];for(const[l,h]of Object.entries(o))a.push({k:l,v:h});const c=new Map(Object.entries(o));s.forEach(l=>{const h=l.dataset.value;c.get(h)==0&&(l.innerHTML="")}),a.forEach(l=>{const{k:h,v:d}=l,u=Za.find(f=>f.id==d);if(u){console.log(u);const{pos:f,img:_,id:I,x:R,y:H}=u;s.forEach(F=>{if(F.dataset.value!==h||F.querySelector(".piece"))return;const z=document.createElement("div");z.className="piece",z.dataset.value=I;const ze=document.createElement("img");ze.src=_,z.appendChild(ze),F.appendChild(z)})}})}),await w_(n)}let qr=!1;async function w_(n){if(qr)return;qr=!0;const e=Rn(Mn,`matches/${n}/turn`);Cs(e,t=>{t.exists()&&(_i=t.val())}),xe.addEventListener("pointerdown",t=>{var r,o;if(_i!==ln){console.log("[TURN] Not your turn:",{currentTurn:_i,curSide:ln});return}const i=t.target.closest(".piece");if(!i||!xe.contains(i))return;$=i,nn=((o=(r=$.parentElement)==null?void 0:r.dataset)==null?void 0:o.value)||null,$.style.zIndex=1,$.style.cursor="grabbing",Gr=t.clientX,zr=t.clientY;const s=getComputedStyle($);Vr=Number.isNaN(parseFloat(s.left))?0:parseFloat(s.left),$r=Number.isNaN(parseFloat(s.top))?0:parseFloat(s.top),t.preventDefault()}),xe.addEventListener("pointermove",t=>{if(!$)return;const i=t.clientX-Gr,s=t.clientY-zr;$.style.left=Vr+i+"px",$.style.top=$r+s+"px"}),xe.addEventListener("pointerup",async t=>{if(!$)return;$.style.pointerEvents="none";const i=document.elementFromPoint(t.clientX,t.clientY).closest(".square");$.style.pointerEvents="";const s=$;if($=null,s.style.zIndex="",s.style.cursor="grab",!i||!nn){console.log("clm"),s.style.left="0px",s.style.top="0px";return}const r=i.dataset.value,o=nn;nn=null;let a=null;if(console.log("TO",r),!u_(s,o,r)){s.style.left="0px",s.style.top="0px";return}for(const[l,h]of Object.entries(Ke))l==o&&(Ke[l]=0),l==r&&(Ke[l]=s.dataset.value);if(a={board:Ke,lastMove:{from:o,to:r,ts:Date.now()},turn:ln=="white"?"black":"white"},a)try{const l=Rn(Mn,`matches/${n}`);await jd(l,a)}catch(l){console.error("update(board) failed:",l)}console.log("POINT UP")})}async function I_(n){const e=Rn(Mn,`matches/${n}`),t=await Kd(e);m_(t)}document.addEventListener("DOMContentLoaded",async()=>{const e=new URLSearchParams(location.search).get("room");await I_(e)});export{h_ as B,O_ as P,c_ as a,N_ as b,A_ as c,Mn as d,E_ as e,Cs as f,P_ as g,Kd as h,k_ as i,C_ as j,S_ as k,T_ as l,R_ as o,l_ as p,b_ as q,Rn as r,qd as s,jd as u};
