"use strict";(self["webpackChunknextfit"]=self["webpackChunknextfit"]||[]).push([[8990],{8990:(t,e,n)=>{n.r(e),n.d(e,{createSwipeBackGesture:()=>a});var r=n(6587),i=n(545),s=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const a=(t,e,n,a,o)=>{const c=t.ownerDocument.defaultView,h=(0,i.i)(t),u=t=>{const e=50,{startX:n}=t;return h?n>=c.innerWidth-e:n<=e},l=t=>h?-t.deltaX:t.deltaX,d=t=>h?-t.velocityX:t.velocityX,f=t=>u(t)&&e(),k=t=>{const e=l(t),n=e/c.innerWidth;a(n)},w=t=>{const e=l(t),n=c.innerWidth,i=e/n,s=d(t),a=n/2,h=s>=0&&(s>.2||e>a),u=h?1-i:i,f=u*n;let k=0;if(f>5){const t=f/Math.abs(s);k=Math.min(t,540)}o(h,i<=0?.01:(0,r.h)(0,i,.9999),k)};return(0,s.A)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:f,onStart:n,onMove:k,onEnd:w})}}}]);
//# sourceMappingURL=8990-legacy.f2f726d6.js.map