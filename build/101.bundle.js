/*! For license information please see 101.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[101],{1101:(e,t,r)=>{r.r(t),r.d(t,{default:()=>N});var n=r(6540),o=r(7767),i=r(6266),a=r(5626),l=r(8485),c=r(6907),s=r(684),u=r.n(s),d=r(9785),f=r(4848);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){var n,o,i,a;n=e,o=t,i=r[t],a=function(e,t){if("object"!=h(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=h(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==h(a)?a:a+"")in n?Object.defineProperty(n,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[o]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(){y=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var i=t&&t.prototype instanceof b?t:b,a=Object.create(i.prototype),l=new A(n||[]);return o(a,"_invoke",{value:_(e,r,l)}),a}function d(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=u;var f="suspendedStart",m="suspendedYield",p="executing",v="completed",g={};function b(){}function x(){}function w(){}var j={};s(j,a,(function(){return this}));var N=Object.getPrototypeOf,k=N&&N(N(C([])));k&&k!==r&&n.call(k,a)&&(j=k);var S=w.prototype=b.prototype=Object.create(j);function O(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){function r(o,i,a,l){var c=d(e[o],e,i);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"==h(u)&&n.call(u,"__await")?t.resolve(u.__await).then((function(e){r("next",e,a,l)}),(function(e){r("throw",e,a,l)})):t.resolve(u).then((function(e){s.value=e,a(s)}),(function(e){return r("throw",e,a,l)}))}l(c.arg)}var i;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return i=i?i.then(o,o):o()}})}function _(t,r,n){var o=f;return function(i,a){if(o===p)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var l=n.delegate;if(l){var c=L(l,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===f)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var s=d(t,r,n);if("normal"===s.type){if(o=n.done?v:m,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=v,n.method="throw",n.arg=s.arg)}}}function L(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=d(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function I(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function T(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(I,this),this.reset(!0)}function C(t){if(t||""===t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(h(t)+" is not iterable")}return x.prototype=w,o(S,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:x,configurable:!0}),x.displayName=s(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===x||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,s(e,c,"GeneratorFunction")),e.prototype=Object.create(S),e},t.awrap=function(e){return{__await:e}},O(E.prototype),s(E.prototype,l,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},O(S),s(S,c,"Generator"),s(S,a,(function(){return this})),s(S,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=C,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return l.type="throw",l.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],l=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),T(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:C(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}function v(e,t,r,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,l=[],c=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const x=function(e){var t=e.lesson,r=e.courseId,o=e.moduleId,s=g((0,n.useState)(!1),2),h=s[0],m=s[1],b=(0,n.useRef)(null),x=g((0,n.useState)(""),2),w=x[0],j=x[1],N=(0,d.mN)({defaultValues:{title:t.title,content:t.content,order:t.order,image_link:t.image_link,video_link:t.video_link,instructorId:t.instructorId}}),k=N.register,S=N.handleSubmit,O=N.formState.errors;(0,n.useEffect)((function(){j(t.content)}),[t.content]);var E,_=("csrftoken",(E=document.cookie.split("; ").find((function(e){return e.startsWith("csrftoken=")})))?E.split("=")[1]:null),L=g((0,n.useState)(null),2),I=L[0],T=L[1],A=localStorage.getItem("authToken"),C=function(){var e,n=(e=y().mark((function e(n){var a,l;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.module=o,n.course=r,n.content=w,e.prev=3,e.next=6,i.A.put("".concat(c.x,"/api/courses/").concat(r,"/modules/").concat(o,"/lessons/").concat(t.id,"/"),n,{headers:{"X-CSRFToken":_,Authorization:"Token ".concat(A),"Content-Type":"application/json"}});case 6:a=e.sent,console.log("Lesson updated successfully",a.data),m(!1),T(null),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.error("Lesson creation failed:",(null===(l=e.t0.response)||void 0===l?void 0:l.data)||e.t0.message),T("Invalid field entries");case 16:case"end":return e.stop()}}),e,null,[[3,12]])})),function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){v(i,n,o,a,l,"next",e)}function l(e){v(i,n,o,a,l,"throw",e)}a(void 0)}))});return function(e){return n.apply(this,arguments)}}(),P=localStorage.getItem("userData")||"",F=JSON.parse(P).user_id;return console.log("instr id",t.instructorId),console.log("user id",F),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{type:"button",id:"newProjectBtn",onClick:function(){m(!0)},className:"rounded-md bg-violet-900 hover:bg-violet-950 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",children:"Edit Lesson"}),(0,f.jsx)(a.e,{appear:!0,show:h,as:n.Fragment,children:(0,f.jsxs)(l.l,{as:"div",className:"relative z-10",onClose:function(){m(!1)},children:[(0,f.jsx)(a.e.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,f.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,f.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,f.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,f.jsx)(a.e.Child,{as:n.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,f.jsxs)(l.l.Panel,{className:"w-3/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[(0,f.jsx)(l.l.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:"Create new lesson"}),(0,f.jsx)("div",{className:"mt-2",children:(0,f.jsxs)("form",{onSubmit:S(C),children:[(0,f.jsxs)("div",{className:"flex w-full gap-3 my-4",children:[(0,f.jsxs)("div",{className:"w-1/2",children:[(0,f.jsx)("label",{className:"block text-gray-700 font-semibold my-2 ",children:"title:"}),(0,f.jsx)("input",p(p({id:"title",type:"title",placeholder:"Enter title...",autoFocus:!0},k("title",{required:!0})),{},{className:"w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ".concat(O.title?"border-red-500":"")}))]}),(0,f.jsxs)("div",{className:"w-1/2",children:[(0,f.jsx)("label",{className:"block text-gray-700 font-semibold my-2",children:"order:"}),(0,f.jsx)("input",p(p({id:"order",type:"order",placeholder:"Enter order...",autoFocus:!0},k("order",{required:!0})),{},{className:"w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ".concat(O.order?"border-red-500":"")}))]})]}),(0,f.jsxs)("div",{className:"flex w-full gap-3 my-4",children:[(0,f.jsxs)("div",{className:"w-1/2",children:[(0,f.jsx)("label",{className:"block text-gray-700 font-semibold my-2",children:"image_link:"}),(0,f.jsx)("input",p(p({id:"image_link",type:"image_link",placeholder:"Enter image_link...",autoFocus:!0},k("image_link")),{},{className:"w-full border border-gray-400 rounded-md py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ".concat(O.image_link?"border-red-500":"")}))]}),(0,f.jsxs)("div",{className:"w-1/2 ",children:[(0,f.jsx)("label",{className:"block text-gray-700 font-semibold my-2",children:"video_link:"}),(0,f.jsx)("input",p(p({id:"video_link",type:"video_link",placeholder:"Enter video_link...",autoFocus:!0},k("video_link")),{},{className:"w-full border border-gray-400 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ".concat(O.video_link?"border-red-500":"")}))]}),I&&(0,f.jsx)("div",{className:"text-red-500 font-bold text-sm mt-2",children:I})]}),(0,f.jsxs)("div",{className:"my-4",children:[(0,f.jsx)("label",{className:"block text-gray-700 font-semibold my-2",children:"Content:"}),(0,f.jsx)(u(),{ref:b,value:w,onChange:function(e){return j(e)}})]}),I&&(0,f.jsx)("div",{className:"text-red-500 font-bold text-sm my-2",children:I}),(0,f.jsx)("button",{type:"submit",className:"bg-blue-500 text-white py-2 px-4 mt-4",children:"Save Changes"}),(0,f.jsx)("button",{type:"button",className:"bg-gray-300 text-gray-700 py-2 px-4 mt-4 ml-2",children:"Cancel"})]})})]})})})})]})})]})};function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,l=[],c=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const N=function(){var e=(0,o.g)(),t=e.courseID,r=e.moduleID,a=e.lessonID,l=w((0,n.useState)(),2),s=l[0],u=l[1],d=w((0,n.useState)(null),2),h=d[0],m=d[1],p=w((0,n.useState)(!1),2),y=p[0],v=p[1],g=(0,o.Zp)(),b=localStorage.getItem("authToken");if((0,n.useEffect)((function(){i.A.get("".concat(c.x,"/api/courses/").concat(t,"/modules/").concat(r,"/lessons/"),{headers:{Authorization:"Token ".concat(b)}}).then((function(e){u(e.data),console.log("Lessons fetching ",e.data)})).catch((function(e){console.error("Error fetching lessons:",e)}))}),[t,r,a,b]),(0,n.useEffect)((function(){i.A.get("http://127.0.0.1:8000/api/courses/".concat(t,"/modules/").concat(r,"/lessons/").concat(a,"/complete/"),{headers:{Authorization:"Token ".concat(b)}}).then((function(e){v(!0),console.log("completed lesson",e.data)})).catch((function(e){v(!1)}))}),[t,r,a,b]),null===s)return(0,f.jsx)("div",{children:"Loading lesson details..."});if(!h&&s){var j=s.find((function(e){return e.id===Number(a)}));j&&m(j)}if(!h)return(0,f.jsx)("div",{children:"Loading lesson details..."});var N,k=(N=a,s?s.findIndex((function(e){return e.id===Number(N)})):-1),S=s&&-1!==k?s[k-1]:null,O=s&&-1!==k?s[k+1]:null;console.log("nextLesson",k,O);var E=function(e){s&&(m(s.find((function(t){return t.id===Number(e)}))||null),g("/dashboard/courses/".concat(t,"/modules/").concat(r,"/lessons/").concat(e)),console.log("selecteddLesson",h))},_=h.video_link.match(/(?:youtu.be\/|youtube(?:-nocookie)?.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/),L="";if(_){var I=_[1];L="https://www.youtube.com/embed/".concat(I)}var T={__html:h.content},A=!1,C=localStorage.getItem("userData")||"",P=(JSON.parse(C)||"").user_id;return P&&h.instructorId==P&&(A=!0),console.log("instr id",h.instructorId),console.log("user id",P),(0,f.jsxs)("div",{className:"mx-32 ",children:[(0,f.jsxs)("div",{className:"flex justify-between",children:[(0,f.jsx)("h1",{className:"text-3xl font-semibold ",children:h.title}),y&&(0,f.jsx)("p",{className:"bg-green-400 px-14 py-2 mx-5 rounded-md items-center ",children:"✓✓ Completed"})]}),(0,f.jsx)("hr",{className:"my-5 mr-10"}),(0,f.jsxs)("div",{className:"",children:[(0,f.jsx)("div",{className:"text-md",dangerouslySetInnerHTML:T}),h.image_link&&(0,f.jsx)("div",{children:(0,f.jsx)("img",{className:"w-3/5 my-5",src:h.image_link,alt:h.title})}),h.video_link&&(0,f.jsx)("div",{className:"mt-5",children:(0,f.jsx)("iframe",{width:"560",height:"315",src:L,title:h.title,frameBorder:"0",allowFullScreen:!0})})]}),A&&(0,f.jsxs)("div",{className:"my-2",children:[(0,f.jsx)(x,{lesson:h,lessonId:h.id,courseId:t,moduleId:r}),(0,f.jsxs)("button",{className:"bg-red-500 hover:bg-red-700 text-white px-3 py-2 mx-2 rounded-md",onClick:function(){i.A.delete("".concat(c.x,"/api/courses/").concat(t,"/modules/").concat(r,"/lessons/").concat(a,"/"),{headers:{Authorization:"Token ".concat(b)}}).then((function(e){console.log("deleted lesson successfully")})).catch((function(e){console.log(e)}))},children:["Delete"," "]})]}),(0,f.jsx)("div",{children:y?(0,f.jsx)("p",{className:"bg-gray-400 px-14 py-2  rounded-md text-center ",children:"✓✓ Marked as Completed"}):(0,f.jsx)("button",{className:"bg-green-600 text-white text-bold px-14 py-2 w-full rounded-md text-center ",onClick:function(){var e=localStorage.getItem("authToken");i.A.post("".concat(c.x,"/api/courses/").concat(t,"/modules/").concat(r,"/lessons/").concat(a,"/complete/"),{},{headers:{Authorization:"Token ".concat(e)}}).then((function(e){v(!0),console.log("marked lesson as complete")})).catch((function(e){console.error("Error:",e),e.response?(console.error("Response data:",e.response.data),console.error("Response status:",e.response.status),console.error("Response headers:",e.response.headers)):e.request?console.error("No response received:",e.request):console.error("Error setting up the request:",e.message)}))},children:"Mark as Complete"})}),(0,f.jsxs)("div",{className:"grid grid-cols-3 gap-4 mx-auto my-5 place-content-center justify-center",children:[(0,f.jsx)("div",{className:"flex justify-start w-full",children:S&&(0,f.jsx)("button",{className:"bg-violet-200 px-4 py-2 w-full rounded-md items-center",onClick:function(){return E(S.id)},children:"← Previous"})}),(0,f.jsx)("div",{className:"flex justify-center",children:(0,f.jsx)("button",{className:"bg-slate-300 w-full px-4 py-2 rounded-md items-center",onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},children:"Scroll to top"})}),(0,f.jsx)("div",{className:"flex justify-end",children:O&&(0,f.jsx)("button",{className:"bg-violet-200 px-4 py-2 w-full rounded-md items-center",onClick:function(){return E(O.id)},children:"Next →"})})]})]})}}}]);