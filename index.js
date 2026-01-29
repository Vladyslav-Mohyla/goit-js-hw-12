import{a as d,i as a,S as f}from"./assets/vendor-Cq7ZUixy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="54239914-b8bb815315f9ce22f6479101b",h=n=>d.get("https://pixabay.com/api/",{params:{key:m,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(({data:r})=>r).catch(r=>a.error({message:`${r}`,position:"topRight"})),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),g=new f(".gallery a",{captionsData:"alt"});function y(n){const r=n.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:s,comments:p,downloads:u})=>`<li>
  <a href='${i}'>
  <img src="${o}" alt="${e}" width = 360px height = 200px/>
  </a>
  <div class="text-img-engagement">
    <p>Likes <span>${t}</span></p>
    <p>View <span>${s}</span></p>
    <p>Comments <span>${p}</span></p>
    <p>Downloads <span>${u}</span></p>
  </div>
</li>`).join("");c.insertAdjacentHTML("beforeend",r),g.refresh()}function L(){c.innerHTML=""}function b(){l.classList.remove("hidden")}function $(){l.classList.add("hidden")}const x=document.querySelector(".form");x.addEventListener("submit",S);function S(n){n.preventDefault();const r=n.target.elements["search-text"].value.trim();if(!r){alert("Введіть пошукове значення");return}b(),L(),h(r).then(({hits:o})=>{if(o.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(o)}).catch(o=>a.error({message:`${o}`,position:"topRight"})).finally(()=>{$()})}
//# sourceMappingURL=index.js.map
