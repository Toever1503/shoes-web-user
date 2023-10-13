import{K as H}from"./entry.6cef3a3f.js";const X=(t,r)=>{const n=H({},t);return Object.keys(r).forEach(o=>{const a=n[o];if(a)a.type||a.default?a.default=r[o]:a.def?a.def(r[o]):n[o]={type:a,default:r[o]};else throw new Error(`not have ${o} prop`)}),n},Ir=X;let R=t=>setTimeout(t,16),U=t=>clearTimeout(t);typeof window<"u"&&"requestAnimationFrame"in window&&(R=t=>window.requestAnimationFrame(t),U=t=>window.cancelAnimationFrame(t));let S=0;const m=new Map;function V(t){m.delete(t)}function z(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;S+=1;const n=S;function o(a){if(a===0)V(n),t();else{const A=R(()=>{o(a-1)});m.set(n,A)}}return o(r),n}z.cancel=t=>{const r=m.get(t);return V(r),U(r)};const Br=t=>{if(!t)return!1;if(t.offsetParent)return!0;if(t.getBBox){const r=t.getBBox();if(r.width||r.height)return!0}if(t.getBoundingClientRect){const r=t.getBoundingClientRect();if(r.width||r.height)return!0}return!1};var Q=typeof global=="object"&&global&&global.Object===Object&&global;const _=Q;var Y=typeof self=="object"&&self&&self.Object===Object&&self,Z=_||Y||Function("return this")();const c=Z;var tt=c.Symbol;const b=tt;var N=Object.prototype,rt=N.hasOwnProperty,et=N.toString,u=b?b.toStringTag:void 0;function nt(t){var r=rt.call(t,u),n=t[u];try{t[u]=void 0;var o=!0}catch{}var a=et.call(t);return o&&(r?t[u]=n:delete t[u]),a}var ot=Object.prototype,at=ot.toString;function ct(t){return at.call(t)}var it="[object Null]",st="[object Undefined]",O=b?b.toStringTag:void 0;function g(t){return t==null?t===void 0?st:it:O&&O in Object(t)?nt(t):ct(t)}function G(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var ut="[object AsyncFunction]",ft="[object Function]",gt="[object GeneratorFunction]",pt="[object Proxy]";function K(t){if(!G(t))return!1;var r=g(t);return r==ft||r==gt||r==ut||r==pt}var bt=c["__core-js_shared__"];const l=bt;var h=function(){var t=/[^.]+$/.exec(l&&l.keys&&l.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function lt(t){return!!h&&h in t}var yt=Function.prototype,dt=yt.toString;function s(t){if(t!=null){try{return dt.call(t)}catch{}try{return t+""}catch{}}return""}var jt=/[\\^$.*+?()[\]{}|]/g,Tt=/^\[object .+?Constructor\]$/,vt=Function.prototype,$t=Object.prototype,mt=vt.toString,wt=$t.hasOwnProperty,At=RegExp("^"+mt.call(wt).replace(jt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function St(t){if(!G(t)||lt(t))return!1;var r=K(t)?At:Tt;return r.test(s(t))}function Ot(t,r){return t==null?void 0:t[r]}function p(t,r){var n=Ot(t,r);return St(n)?n:void 0}var ht=p(c,"Map");const d=ht;var xt=Array.isArray;const Er=xt;function w(t){return t!=null&&typeof t=="object"}var Pt="[object Arguments]";function x(t){return w(t)&&g(t)==Pt}var W=Object.prototype,Mt=W.hasOwnProperty,It=W.propertyIsEnumerable,Bt=x(function(){return arguments}())?x:function(t){return w(t)&&Mt.call(t,"callee")&&!It.call(t,"callee")};const Fr=Bt;function Et(){return!1}var q=typeof exports=="object"&&exports&&!exports.nodeType&&exports,P=q&&typeof module=="object"&&module&&!module.nodeType&&module,Ft=P&&P.exports===q,M=Ft?c.Buffer:void 0,Ct=M?M.isBuffer:void 0,Dt=Ct||Et;const Cr=Dt;var kt=9007199254740991;function L(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=kt}var Rt="[object Arguments]",Ut="[object Array]",Vt="[object Boolean]",_t="[object Date]",Nt="[object Error]",Gt="[object Function]",Kt="[object Map]",Wt="[object Number]",qt="[object Object]",Lt="[object RegExp]",Jt="[object Set]",Ht="[object String]",Xt="[object WeakMap]",zt="[object ArrayBuffer]",Qt="[object DataView]",Yt="[object Float32Array]",Zt="[object Float64Array]",tr="[object Int8Array]",rr="[object Int16Array]",er="[object Int32Array]",nr="[object Uint8Array]",or="[object Uint8ClampedArray]",ar="[object Uint16Array]",cr="[object Uint32Array]",e={};e[Yt]=e[Zt]=e[tr]=e[rr]=e[er]=e[nr]=e[or]=e[ar]=e[cr]=!0;e[Rt]=e[Ut]=e[zt]=e[Vt]=e[Qt]=e[_t]=e[Nt]=e[Gt]=e[Kt]=e[Wt]=e[qt]=e[Lt]=e[Jt]=e[Ht]=e[Xt]=!1;function ir(t){return w(t)&&L(t.length)&&!!e[g(t)]}function sr(t){return function(r){return t(r)}}var J=typeof exports=="object"&&exports&&!exports.nodeType&&exports,f=J&&typeof module=="object"&&module&&!module.nodeType&&module,ur=f&&f.exports===J,y=ur&&_.process,fr=function(){try{var t=f&&f.require&&f.require("util").types;return t||y&&y.binding&&y.binding("util")}catch{}}();const I=fr;var B=I&&I.isTypedArray,gr=B?sr(B):ir;const Dr=gr;var pr=Object.prototype;function br(t){var r=t&&t.constructor,n=typeof r=="function"&&r.prototype||pr;return t===n}function lr(t,r){return function(n){return t(r(n))}}var yr=lr(Object.keys,Object);const dr=yr;var jr=Object.prototype,Tr=jr.hasOwnProperty;function kr(t){if(!br(t))return dr(t);var r=[];for(var n in Object(t))Tr.call(t,n)&&n!="constructor"&&r.push(n);return r}function Rr(t){return t!=null&&L(t.length)&&!K(t)}var vr=p(c,"DataView");const j=vr;var $r=p(c,"Promise");const T=$r;var mr=p(c,"Set");const v=mr;var wr=p(c,"WeakMap");const $=wr;var E="[object Map]",Ar="[object Object]",F="[object Promise]",C="[object Set]",D="[object WeakMap]",k="[object DataView]",Sr=s(j),Or=s(d),hr=s(T),xr=s(v),Pr=s($),i=g;(j&&i(new j(new ArrayBuffer(1)))!=k||d&&i(new d)!=E||T&&i(T.resolve())!=F||v&&i(new v)!=C||$&&i(new $)!=D)&&(i=function(t){var r=g(t),n=r==Ar?t.constructor:void 0,o=n?s(n):"";if(o)switch(o){case Sr:return k;case Or:return E;case hr:return F;case xr:return C;case Pr:return D}return r});const Ur=i;export{d as M,b as S,Er as a,Cr as b,Dr as c,Fr as d,br as e,kr as f,Ur as g,Br as h,Rr as i,Ir as j,p as k,w as l,c as r,z as w};