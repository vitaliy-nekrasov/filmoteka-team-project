!function(){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},e=a.parcelRequire1688;null==e&&((e=function(a){if(a in n)return n[a].exports;if(a in s){var e=s[a];delete s[a];var t={id:a,exports:{}};return n[a]=t,e.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(a,n){s[a]=n},a.parcelRequire1688=e),e.register("jcFG7",(function(a,n){var s,e,t,l;s=a.exports,e="default",t=function(){return p},Object.defineProperty(s,e,{get:t,set:l,enumerable:!0,configurable:!0});var i=document.querySelector(".pagination__list");var p=function(a,n){var s="",e=(n=Number(n))-1,t=n+1;if(n>1&&(s+='<li class="btn-skip numb prev"  data-page="'.concat(n-1,'"><span class="page-number-span span-svg">\n    <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n   <title>arrow-left</title>\n    <path d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z" ></path>\n  </svg>\n  </span>\n  </li>')),a>=7){n>2&&(s+='<li class="first numb" data-page="1" ><span  class="page-number-span">1</span></li>',n>3&&(s+='<li class="dots"><span class="page-number-span">...</span></li>')),n==a?e-=2:n==a-1&&(e-=1),1==n?t+=2:2==n&&(t+=1);for(var l=e;l<=t;l++)l>a||(0==l&&(l+=1),s+='<li class="numb '.concat(n==l?"active":"",'" data-page="').concat(l,'"><span  class="page-number-span">').concat(l,"</span> </li>"));n<a-1&&(n<a-2&&(s+='<li class="dots"><span class="page-number-span">...</span></li>'),s+='<li class="last numb" data-page="'.concat(a,'"><span  class="page-number-span">').concat(a,"</span> </li>"))}if(a<7)for(var p=1;p<=a;p++)s+=p!==n?'<li class="numb" data-page="'.concat(p,'"><span  class="page-number-span">').concat(p,"</span> </li>"):'<li class="numb active" data-page="'.concat(p,'"><span  class="page-number-span">').concat(p,"</span> </li>");return n<a&&(s+='<li class="btn-skip numb next" data-page="'.concat(n+1,'"><span  class="page-number-span span-svg"> \n  <svg class="svg-btn" version="1.1" width="16"  height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <title>arrow-right</title>\n  <path d="M16.172 9l-6.071-6.071 1.414-1.414 8.485 8.485-8.485 8.485-1.414-1.414 6.071-6.071h-16.172v-2z"></path>\n</svg>\n</span></li>')),i.innerHTML=s,s}})),e("jcFG7")}();
//# sourceMappingURL=library.0e35664f.js.map