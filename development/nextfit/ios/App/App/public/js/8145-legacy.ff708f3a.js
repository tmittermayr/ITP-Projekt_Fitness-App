"use strict";(self["webpackChunknextfit"]=self["webpackChunknextfit"]||[]).push([[8145],{8145:(e,n,t)=>{t.r(n),t.d(n,{C:()=>a,a:()=>i,d:()=>c});var r=t(655),o=t(8395),i=function(e,n,t,i,c,a){return(0,r.mG)(void 0,void 0,void 0,(function(){var s,u;return(0,r.Jh)(this,(function(r){switch(r.label){case 0:if(e)return[2,e.attachViewToDom(n,t,c,i)];if(!a&&"string"!==typeof t&&!(t instanceof HTMLElement))throw new Error("framework delegate is missing");return u="string"===typeof t?null===(s=n.ownerDocument)||void 0===s?void 0:s.createElement(t):t,i&&i.forEach((function(e){return u.classList.add(e)})),c&&Object.assign(u,c),n.appendChild(u),[4,new Promise((function(e){return(0,o.c)(u,e)}))];case 1:return r.sent(),[2,u]}}))}))},c=function(e,n){if(n){if(e){var t=n.parentElement;return e.removeViewFromDom(t,n)}n.remove()}return Promise.resolve()},a=function(){var e,n,t=function(t,i,c,a){return void 0===c&&(c={}),void 0===a&&(a=[]),(0,r.mG)(void 0,void 0,void 0,(function(){var s,u,d,l,f,m;return(0,r.Jh)(this,(function(r){switch(r.label){case 0:return e=t,i?(d="string"===typeof i?null===(s=e.ownerDocument)||void 0===s?void 0:s.createElement(i):i,a.forEach((function(e){return d.classList.add(e)})),Object.assign(d,c),e.appendChild(d),[4,new Promise((function(e){return(0,o.c)(d,e)}))]):[3,2];case 1:return r.sent(),[3,3];case 2:e.children.length>0&&(l=e.children[0],l.classList.contains("ion-delegate-host")||(f=null===(u=e.ownerDocument)||void 0===u?void 0:u.createElement("div"),f.classList.add("ion-delegate-host"),a.forEach((function(e){return f.classList.add(e)})),f.append.apply(f,e.children),e.appendChild(f))),r.label=3;case 3:return m=document.querySelector("ion-app")||document.body,n=document.createComment("ionic teleport"),e.parentNode.insertBefore(n,e),m.appendChild(e),[2,e]}}))}))},i=function(){return e&&n&&(n.parentNode.insertBefore(e,n),n.remove()),Promise.resolve()};return{attachViewToDom:t,removeViewFromDom:i}}}}]);
//# sourceMappingURL=8145-legacy.ff708f3a.js.map