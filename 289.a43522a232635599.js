(()=>{"use strict";var e,g={6289:(e,a,r)=>{var x=r(6283),u=r(2798),l=r(3594),_=r(9484),d=r(1367);class c{constructor(){this._undefinedValue="''",this._typeLogElement=".type log",this._attributesElement=".attributes",this._eventsElement=".events",this._caseIdElement="case-id",this._activityElement="concept:name",this._escapeString="'"}parse(t){if(""===t.trim())return new u.K([],[],[],[],[]);const s=t.split(/\r?\n/),o=c.indexOfTokenIfExists(s,this._typeLogElement),i=c.indexOfTokenIfExists(s,this._attributesElement),f=c.indexOfTokenIfExists(s,this._eventsElement),w=[o,i,f,s.length],O=s.slice(i+1,c.nextKeyword(w,i)).map(R=>R.trim()),h=s.slice(f+1,c.nextKeyword(w,f)),b=this.parseTraces(O,h);return new u.K([],[],[],b,[])}parseTraces(t,s){const o=s.map(f=>this.splitEventLineString(f)),i=new Map;return o.forEach(f=>{var p;if(void 0===f[t.indexOf(this._caseIdElement)]||void 0===f[t.indexOf(this._activityElement)])throw c.PARSING_ERROR;const w=parseInt(f[t.indexOf(this._caseIdElement)]),v=f[t.indexOf(this._activityElement)],O=t.filter(h=>![this._caseIdElement,this._activityElement].includes(h)).filter(h=>t.indexOf(h)<f.length).filter(h=>f[t.indexOf(h)]!==this._undefinedValue).map(h=>c.eventLogAttributeOf(h,f[t.indexOf(h)]));i.has(w)||i.set(w,new _.f([],[],w)),null===(p=i.get(w))||void 0===p||p.events.push(new l.j(O,v))}),Array.from(i.values())}splitEventLineString(t){let s=[];for(;""!==t;){let o,i,f;if(t.startsWith(this._undefinedValue))s.push(this._undefinedValue),t=t.slice(this._undefinedValue.length+1);else{if(t.startsWith(this._escapeString)){o=1;for(let p=o;p<t.length;p++)if(t.charAt(p)==this._escapeString&&"\\"!==t.charAt(p-1)){i=p,f=i+2;break}if(void 0===i||void 0===f)throw c.PARSING_ERROR}else o=0,i=-1===t.indexOf(" ")?t.length:t.indexOf(" "),f=i+1;s.push(t.slice(o,i).replace(new RegExp("\\\\'","g"),"'")),t=t.slice(f)}}return s}static eventLogAttributeOf(t,s){switch(s){case"true":return new d.Co(!0,t);case"false":return new d.Co(!1,t)}if(s.includes("T")||s.includes(":")||s.includes("-")){const i=Date.parse(s);if(!isNaN(i))return new d.JM(new Date(i),t)}if(s.includes(".")||s.includes(",")){const i=parseFloat(s);if(!isNaN(i))return new d.Iy(i,t)}const o=parseInt(s);return isNaN(o)?new d.EP(s,t):new d.uX(o,t)}static indexOfTokenIfExists(t,s){const o=t.indexOf(s);if(-1===o)throw c.PARSING_ERROR;return o}static nextKeyword(t,s){const o=Math.min(...t.filter(i=>i>s));if(isNaN(o))throw c.PARSING_ERROR;return o}}c.PARSING_ERROR=new Error("given .type log string can not be parsed"),onmessage=function(m){const s=(new c).parse(m.data),i=new x.r5(u.K).stringify(s);postMessage(i)}}},E={};function n(e){var a=E[e];if(void 0!==a)return a.exports;var r=E[e]={exports:{}};return g[e](r,r.exports,n),r.exports}n.m=g,n.x=()=>{var e=n.O(void 0,[817],()=>n(6289));return n.O(e)},e=[],n.O=(a,r,x,u)=>{if(!r){var _=1/0;for(l=0;l<e.length;l++){for(var[r,x,u]=e[l],d=!0,c=0;c<r.length;c++)(!1&u||_>=u)&&Object.keys(n.O).every(f=>n.O[f](r[c]))?r.splice(c--,1):(d=!1,u<_&&(_=u));if(d){e.splice(l--,1);var m=x();void 0!==m&&(a=m)}}return a}u=u||0;for(var l=e.length;l>0&&e[l-1][2]>u;l--)e[l]=e[l-1];e[l]=[r,x,u]},n.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return n.d(a,{a}),a},n.d=(e,a)=>{for(var r in a)n.o(a,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce((a,r)=>(n.f[r](e,a),a),[])),n.u=e=>e+".5cb2a4b03aec1c43.js",n.miniCssF=e=>{},n.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),(()=>{var e;n.tt=()=>(void 0===e&&(e={createScriptURL:a=>a},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),n.tu=e=>n.tt().createScriptURL(e),n.p="",(()=>{var e={289:1};n.f.i=(u,l)=>{e[u]||importScripts(n.tu(n.p+n.u(u)))};var r=self.webpackChunkevent_logs=self.webpackChunkevent_logs||[],x=r.push.bind(r);r.push=u=>{var[l,_,d]=u;for(var c in _)n.o(_,c)&&(n.m[c]=_[c]);for(d&&d(n);l.length;)e[l.pop()]=1;x(u)}})(),(()=>{var e=n.x;n.x=()=>n.e(817).then(e)})(),n.x()})();