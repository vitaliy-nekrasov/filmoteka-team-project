var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},e=a.parcelRequire1688;null==e&&((e=function(a){if(a in n)return n[a].exports;if(a in s){var e=s[a];delete s[a];var t={id:a,exports:{}};return n[a]=t,e.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(a,n){s[a]=n},a.parcelRequire1688=e),e.register("2nhTy",(function(a,n){var s,e,t,l;s=a.exports,e="default",t=function(){return i},Object.defineProperty(s,e,{get:t,set:l,enumerable:!0,configurable:!0});const p=document.querySelector(".pagination__list");var i=function(a,n){let s,e="",t=(n=Number(n))-1,l=n+1;if(n>1&&(e+=`<li class="btn-skip numb prev"  data-page="${n-1}"><span class="page-number-span span-svg">\n    <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n   <title>arrow-left</title>\n    <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z" ></path>\n  </svg>\n  </span>\n  </li>`),a>=7){n>2&&(e+='<li class="first numb" data-page="1" ><span  class="page-number-span">1</span></li>',n>3&&(e+='<li class="dots"><span class="page-number-span">...</span></li>')),n==a?t-=2:n==a-1&&(t-=1),1==n?l+=2:2==n&&(l+=1);for(var i=t;i<=l;i++)i>a||(0==i&&(i+=1),s=n==i?"active":"",e+=`<li class="numb ${s}" data-page="${i}"><span  class="page-number-span">${i}</span> </li>`);n<a-1&&(n<a-2&&(e+='<li class="dots"><span class="page-number-span">...</span></li>'),e+=`<li class="last numb" data-page="${a}"><span  class="page-number-span">${a}</span> </li>`)}if(a<7)for(let s=1;s<=a;s++)e+=s!==n?`<li class="numb" data-page="${s}"><span  class="page-number-span">${s}</span> </li>`:`<li class="numb active" data-page="${s}"><span  class="page-number-span">${s}</span> </li>`;return n<a&&(e+=`<li class="btn-skip numb next" data-page="${n+1}"><span  class="page-number-span span-svg"> \n  <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <title>arrow-right</title>\n  <path d="M16.172 9l-6.071-6.071 1.414-1.414 8.485 8.485-8.485 8.485-1.414-1.414 6.071-6.071h-16.172v-2z"></path>\n</svg>\n</span></li>`),p.innerHTML=e,e}})),e("2nhTy");
//# sourceMappingURL=library.dc97b830.js.map
