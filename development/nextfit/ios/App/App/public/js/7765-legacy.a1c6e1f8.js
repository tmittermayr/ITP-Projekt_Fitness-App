"use strict";(self["webpackChunknextfit"]=self["webpackChunknextfit"]||[]).push([[7765],{7765:(e,t,i)=>{i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>n,copyVisualViewport:()=>D,keyboardDidClose:()=>w,keyboardDidOpen:()=>b,keyboardDidResize:()=>g,resetKeyboardAssist:()=>u,setKeyboardClose:()=>p,setKeyboardOpen:()=>c,startKeyboardAssist:()=>f,trackViewportChanges:()=>l});
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var n="ionKeyboardDidShow",o="ionKeyboardDidHide",r=150,a={},s={},d=!1,u=function(){a={},s={},d=!1},f=function(e){h(e),e.visualViewport&&(s=D(e.visualViewport),e.visualViewport.onresize=function(){l(e),b()||g(e)?c(e):w(e)&&p(e)})},h=function(e){e.addEventListener("keyboardDidShow",(function(t){return c(e,t)})),e.addEventListener("keyboardDidHide",(function(){return p(e)}))},c=function(e,t){v(e,t),d=!0},p=function(e){y(e),d=!1},b=function(){var e=(a.height-s.height)*s.scale;return!d&&a.width===s.width&&e>r},g=function(e){return d&&!w(e)},w=function(e){return d&&s.height===e.innerHeight},v=function(e,t){var i=t?t.keyboardHeight:e.innerHeight-s.height,o=new CustomEvent(n,{detail:{keyboardHeight:i}});e.dispatchEvent(o)},y=function(e){var t=new CustomEvent(o);e.dispatchEvent(t)},l=function(e){a=Object.assign({},s),s=D(e.visualViewport)},D=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=7765-legacy.a1c6e1f8.js.map