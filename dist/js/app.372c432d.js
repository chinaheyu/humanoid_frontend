(function(e){function t(t){for(var r,o,u=t[0],i=t[1],l=t[2],d=0,s=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&s.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);h&&h(t);while(s.length)s.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==c[u]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},c={app:0},a=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-060d7e56":"60a1e0ac","chunk-5d58d3a5":"4ef12b49","chunk-7e12226c":"08fb5720","chunk-9fcea8ca":"0b697b53","chunk-6867e9b6":"f9cf0944","chunk-d6062cec":"ef84dd87"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-060d7e56":1,"chunk-5d58d3a5":1,"chunk-7e12226c":1,"chunk-9fcea8ca":1,"chunk-6867e9b6":1,"chunk-d6062cec":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-060d7e56":"bad17a8c","chunk-5d58d3a5":"b03d653e","chunk-7e12226c":"6db49b31","chunk-9fcea8ca":"c4e11cc5","chunk-6867e9b6":"26abb93b","chunk-d6062cec":"09b9b911"}[e]+".css",c=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===r||d===c))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){l=s[u],d=l.getAttribute("data-href");if(d===r||d===c)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],h.parentNode.removeChild(h),n(a)},h.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=a);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var s=new Error;l=function(t){d.onerror=d.onload=null,clearTimeout(h);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}c[e]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var h=d;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("7a23");const o={id:"app"};function c(e,t){const n=Object(r["resolveComponent"])("router-view");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",o,[Object(r["createVNode"])(n)])}n("8a4b");var a=n("6b0d"),u=n.n(a);const i={},l=u()(i,[["render",c]]);var d=l,s=n("6605");const h=[{name:"notFound",path:"/:path(.*)+",redirect:{name:"robot"}},{name:"user",path:"/user",component:()=>Promise.all([n.e("chunk-060d7e56"),n.e("chunk-7e12226c")]).then(n.bind(null,"718b")),meta:{title:"会员中心"}},{name:"cart",path:"/cart",component:()=>Promise.all([n.e("chunk-060d7e56"),n.e("chunk-9fcea8ca"),n.e("chunk-d6062cec")]).then(n.bind(null,"da2a")),meta:{title:"购物车"}},{name:"goods",path:"/goods",component:()=>Promise.all([n.e("chunk-060d7e56"),n.e("chunk-9fcea8ca"),n.e("chunk-6867e9b6")]).then(n.bind(null,"00ce")),meta:{title:"商品详情"}},{name:"robot",path:"/robot",component:()=>Promise.all([n.e("chunk-060d7e56"),n.e("chunk-5d58d3a5")]).then(n.bind(null,"0fd9")),meta:{title:"机器人控制器"}}],f=Object(s["a"])({routes:h,history:Object(s["b"])()});f.beforeEach((e,t,n)=>{const r=e.meta&&e.meta.title;r&&(document.title=r),n()});var p=n("cee4");n("b749");const b=Object(r["createApp"])(d);b.use(f),b.config.globalProperties.$axios=p["a"],b.mount("#app")},"89cf":function(e,t,n){},"8a4b":function(e,t,n){"use strict";n("89cf")}});
//# sourceMappingURL=app.372c432d.js.map