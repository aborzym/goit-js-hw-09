const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");let o;e.addEventListener("click",(r=>{o=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.setAttribute("disabled","disabled")})),r.addEventListener("click",(()=>{clearInterval(o),e.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.ce0d0d4c.js.map
