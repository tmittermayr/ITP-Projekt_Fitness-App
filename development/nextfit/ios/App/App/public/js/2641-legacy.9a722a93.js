"use strict";(self["webpackChunknextfit"]=self["webpackChunknextfit"]||[]).push([[2641],{7641:(e,t,n)=>{n.r(t),n.d(t,{startInputShims:()=>D});var o=n(655),r=n(218),i=n(8395),a=new WeakMap,u=function(e,t,n,o,r){void 0===o&&(o=0),void 0===r&&(r=!1),a.has(e)!==n&&(n?d(e,t,o,r):s(e,t))},c=function(e){return e===e.getRootNode().activeElement},d=function(e,t,n,o){void 0===o&&(o=!1);var r=t.parentNode,i=t.cloneNode(!1);i.classList.add("cloned-input"),i.tabIndex=-1,o&&(i.disabled=!0),r.appendChild(i),a.set(e,i);var u=e.ownerDocument,c="rtl"===u.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform="translate3d(".concat(c,"px,").concat(n,"px,0) scale(0)")},s=function(e,t){var n=a.get(e);n&&(a.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},l=function(e,t,n){if(!n||!t)return function(){};var o=function(n){c(t)&&u(e,t,n)},r=function(){return u(e,t,!1)},a=function(){return o(!0)},d=function(){return o(!1)};return(0,i.a)(n,"ionScrollStart",a),(0,i.a)(n,"ionScrollEnd",d),t.addEventListener("blur",r),function(){(0,i.b)(n,"ionScrollStart",a),(0,i.b)(n,"ionScrollEnd",d),t.addEventListener("ionBlur",r)}},f="input, textarea, [no-blur], [contenteditable]",v=function(){var e=!0,t=!1,n=document,o=function(){t=!0},r=function(){e=!0},a=function(o){if(t)t=!1;else{var r=n.activeElement;if(r&&!r.matches(f)){var i=o.target;i!==r&&(i.matches(f)||i.closest(f)||(e=!1,setTimeout((function(){e||r.blur()}),50)))}}};return(0,i.a)(n,"ionScrollStart",o),n.addEventListener("focusin",r,!0),n.addEventListener("touchend",a,!1),function(){(0,i.b)(n,"ionScrollStart",o,!0),n.removeEventListener("focusin",r,!0),n.removeEventListener("touchend",a,!1)}},m=.3,h=function(e,t,n){var o,r=null!==(o=e.closest("ion-item,[ion-item]"))&&void 0!==o?o:e;return p(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)},p=function(e,t,n,o){var r=e.top,i=e.bottom,a=t.top,u=Math.min(t.bottom,o-n),c=a+15,d=.75*u,s=d-i,l=c-r,f=Math.round(s<0?-s:l>0?-l:0),v=Math.min(f,r-a),h=Math.abs(v),p=h/m,w=Math.min(400,Math.max(150,p));return{scrollAmount:v,scrollDuration:w,scrollPadding:n,inputSafeY:4-(r-c)}},w=function(e,t,n,o,r,a){var u;void 0===a&&(a=!1);var d=function(e){u=(0,i.p)(e)},s=function(d){if(u){var s=(0,i.p)(d);b(6,u,s)||c(t)||E(e,t,n,o,r,a)}};return e.addEventListener("touchstart",d,{capture:!0,passive:!0}),e.addEventListener("touchend",s,!0),function(){e.removeEventListener("touchstart",d,!0),e.removeEventListener("touchend",s,!0)}},E=function(e,t,n,a,c,d){return void 0===d&&(d=!1),(0,o.mG)(void 0,void 0,void 0,(function(){var s,l,f,v,m,p;return(0,o.Jh)(this,(function(w){switch(w.label){case 0:return n||a?(s=h(e,n||a,c),n&&Math.abs(s.scrollAmount)<4?(t.focus(),[2]):(u(e,t,!0,s.inputSafeY,d),t.focus(),(0,i.r)((function(){return e.click()})),"undefined"===typeof window?[3,3]:(f=function(){return(0,o.mG)(void 0,void 0,void 0,(function(){return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return void 0!==l&&clearTimeout(l),window.removeEventListener("ionKeyboardDidShow",v),window.removeEventListener("ionKeyboardDidShow",f),n?[4,(0,r.c)(n,0,s.scrollAmount,s.scrollDuration)]:[3,2];case 1:o.sent(),o.label=2;case 2:return u(e,t,!1,s.inputSafeY),t.focus(),[2]}}))}))},v=function(){window.removeEventListener("ionKeyboardDidShow",v),window.addEventListener("ionKeyboardDidShow",f)},n?[4,(0,r.g)(n)]:[3,2]))):[2];case 1:if(m=w.sent(),p=m.scrollHeight-m.clientHeight,s.scrollAmount>p-m.scrollTop)return"password"===t.type?(s.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",v)):window.addEventListener("ionKeyboardDidShow",f),l=setTimeout(f,1e3),[2];w.label=2;case 2:f(),w.label=3;case 3:return[2]}}))}))},b=function(e,t,n){if(t&&n){var o=t.x-n.x,r=t.y-n.y,i=o*o+r*r;return i>e*e}return!1},g="$ionPaddingTimer",y=function(e){var t=document,n=function(t){S(t.target,e)},o=function(e){S(e.target,0)};return t.addEventListener("focusin",n),t.addEventListener("focusout",o),function(){t.removeEventListener("focusin",n),t.removeEventListener("focusout",o)}},S=function(e,t){var n,o;if("INPUT"===e.tagName&&(!e.parentElement||"ION-INPUT"!==e.parentElement.tagName)&&"ION-SEARCHBAR"!==(null===(o=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===o?void 0:o.tagName)){var i=(0,r.f)(e);if(null!==i){var a=i[g];a&&clearTimeout(a),t>0?i.style.setProperty("--keyboard-offset","".concat(t,"px")):i[g]=setTimeout((function(){i.style.setProperty("--keyboard-offset","0px")}),120)}}},L=!0,x=!0,D=function(e,t){var n=document,a="ios"===t,u="android"===t,c=e.getNumber("keyboardHeight",290),d=e.getBoolean("scrollAssist",!0),s=e.getBoolean("hideCaretOnScroll",a),f=e.getBoolean("inputBlurring",a),m=e.getBoolean("scrollPadding",!0),h=Array.from(n.querySelectorAll("ion-input, ion-textarea")),p=new WeakMap,E=new WeakMap,b=function(e){return(0,o.mG)(void 0,void 0,void 0,(function(){var t,n,a,f,v,m;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return[4,new Promise((function(t){return(0,i.c)(e,t)}))];case 1:return o.sent(),t=e.shadowRoot||e,n=t.querySelector("input")||t.querySelector("textarea"),a=(0,r.f)(e),f=a?null:e.closest("ion-footer"),n?(a&&s&&!p.has(e)&&(m=l(e,n,a),p.set(e,m)),v="date"===n.type||"datetime-local"===n.type,v||!a&&!f||!d||E.has(e)||(m=w(e,n,a,f,c,u),E.set(e,m)),[2]):[2]}}))}))},g=function(e){if(s){var t=p.get(e);t&&t(),p.delete(e)}if(d){t=E.get(e);t&&t(),E.delete(e)}};f&&L&&v(),m&&x&&y(c);for(var S=0,D=h;S<D.length;S++){var k=D[S];b(k)}n.addEventListener("ionInputDidLoad",(function(e){b(e.detail)})),n.addEventListener("ionInputDidUnload",(function(e){g(e.detail)}))}}}]);
//# sourceMappingURL=2641-legacy.9a722a93.js.map