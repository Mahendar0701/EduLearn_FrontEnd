"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[181],{2897:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(6540),o=n(8868),s=n(4848);const a=function(e){var t=e.totalLessons,n=e.completedLessons,a=(0,r.useRef)(null);return(0,r.useEffect)((function(){var e=null;if(a.current){var r=a.current.getContext("2d");r&&(e=new o.Ay(r,{type:"doughnut",data:{labels:["Completed Lessons","Remaining Lessons"],datasets:[{data:[n.length,t-n.length],backgroundColor:["#36A2EB","#FF6384"]}]},options:{cutout:"80%",plugins:{legend:{display:!0,position:"bottom"},title:{display:!0,text:"Course Progress",padding:20}}}}))}if(e&&n.length>0){var s=Math.round(n.length/t*100);!function(e,t){var n=a.current;if(n){var r=n.width/2,o=n.height/2,s=.1*Math.min(n.width,n.height);e.font="".concat(s,"px Arial"),e.fillStyle="#000000",e.textAlign="center",e.textBaseline="middle",e.fillText("".concat(t,"% hi"),r,o)}}(e.ctx,s)}return function(){e&&e.destroy()}}),[t,n]),(0,s.jsx)("canvas",{ref:a})}},7181:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var r=n(6540),o=n(4058),s=n(6807),a=n(6266),l=n(2897),i=n(6907),c=n(4848);function u(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||f(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,s,a,l=[],i=!0,c=!1;try{if(s=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=s.call(n)).done)&&(l.push(r.value),l.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw o}}return l}}(e,t)||f(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const m=function(){var e=d((0,r.useState)([]),2),t=e[0],n=e[1],o=d((0,r.useState)([]),2),f=o[0],h=o[1],m=d((0,r.useState)(null),2),x=m[0],g=m[1],p=d((0,r.useState)([]),2),y=p[0],b=p[1],v=(0,s.ut)(),j=v.courses,A=v.isLoading,w=v.isError,N=v.errorMessage,S=localStorage.getItem("authToken");(0,r.useEffect)((function(){a.A.get("".concat(i.x,"/api/user/enrolled-courses/"),{headers:{Authorization:"Token ".concat(S)}}).then((function(e){n(e.data),console.log("setEnrolledCourses",e.data),e.data.forEach((function(e){k(e.course)}))})).catch((function(e){console.log(e)}))}),[]);var k=function(e){a.A.get("".concat(i.x,"/api/courses/").concat(e,"/completed-lessons/"),{headers:{Authorization:"Token ".concat(S)}}).then((function(t){h((function(e){return[].concat(u(e),u(t.data))})),console.log("completed lesson",t.data),L(e)})).catch((function(e){console.log(e),h([])}))},L=function(e){a.A.get("".concat(i.x,"/api/courses/").concat(e,"/modules/"),{headers:{Authorization:"Token ".concat(S)}}).then((function(e){console.log(" setModules",e.data),b((function(t){return[].concat(u(t),u(e.data))}))})).catch((function(e){console.log(e),h([])}))};if(A)return(0,c.jsx)("span",{children:"Loading courses..."});if(w)return(0,c.jsx)("span",{children:N});var C,E,I,T,M=t.map((function(e){return e.course})),_=j.filter((function(e){return M.includes(e.id)})),z=function(e){return f.filter((function(t){return t.course==e}))},O=function(e,t){return f.filter((function(n){return n.course===e&&n.module===t}))};return(0,c.jsxs)("div",{className:"container mx-auto py-8",children:[(0,c.jsx)("h1",{className:"text-3xl font-bold mb-4 text-center ",children:"My Report"}),(0,c.jsx)("hr",{className:"my-3"}),(0,c.jsxs)("select",{className:"block mx-auto px-4 py-3 mb-4 bg-violet-800 text-white rounded-lg shadow-lg hover:bg-violet-900 focus:outline-none",onChange:function(e){var t=parseInt(e.target.value),n=_.find((function(e){return e.id===t}));g(n)},children:[(0,c.jsx)("option",{children:"Select your course"}),_.map((function(e){return(0,c.jsx)("option",{className:"bg-white text-black py-3",value:e.id,children:e.title},e.id)}))]}),x&&(0,c.jsx)("div",{className:"max-w-xl mx-auto mt-8 bg-white rounded-lg shadow-lg",children:(0,c.jsxs)("div",{className:"p-6",children:[(0,c.jsxs)("div",{className:"flex",children:[(0,c.jsxs)("div",{className:"my-5",children:[(0,c.jsx)("h2",{className:"text-xl font-bold mb-4",children:x.title}),(0,c.jsxs)("p",{children:["Percentage:"," ",z(x.id).length,"/",x.num_lessons," (",function(e,t){var n=z(t).length,r=e.num_lessons;if(0===r)return 0;var o=n/r*100;return isNaN(o)?0:o}(x,x.id),"%)"]}),(0,c.jsxs)("p",{children:["Completed Lessons:"," ",z(x.id).length]}),(0,c.jsxs)("p",{children:["Incomplete Lessons:"," ",(C=x,E=x.id,I=z(E).length,T=C.num_lessons,0===T?0:T-I)]}),(0,c.jsxs)("p",{children:["Total Lessons: ",x.num_lessons]})]}),(0,c.jsx)("div",{children:(0,c.jsx)(l.A,{totalLessons:x.num_lessons,completedLessons:f})})]}),(0,c.jsx)("hr",{className:"my-4"}),(0,c.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Modules:"}),(0,c.jsx)("ul",{children:y.filter((function(e){return e.course===x.id})).map((function(e){return(0,c.jsx)("li",{className:"px-3 py-2 my-2 border rounded ".concat(1==(t=O(x.id,e.id).length,n=e.num_lessons,0===n?0:t/n)?"bg-green-500 text-white":""),children:e.title},e.id);var t,n}))})]})})]})};function x(){var e=(0,s.zk)();return(0,r.useEffect)((function(){(0,o.D)(e)}),[]),(0,c.jsxs)("div",{className:"mr-7 my-5",children:[(0,c.jsx)(m,{}),(0,c.jsx)("br",{})]})}}}]);