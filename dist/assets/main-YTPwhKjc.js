(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const L=`
<nav class="fixed top-6 left-0 right-0 mx-auto w-[92%] max-w-6xl z-50 bg-white/80 dark:bg-[#0a0f16]/90 backdrop-blur-xl border border-brand-softGray dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300" id="main-nav">
  <a href="/" class="flex items-center gap-3 group">
    <img src="/Frame 4.svg" alt="SustainCore Logo" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
    <div class="flex flex-col -gap-1">
      <div class="flex items-center">
        <span class="text-xl font-display font-bold text-brand-green tracking-tight">Sustain</span>
        <span class="text-xl font-display font-medium text-brand-blue dark:text-white tracking-tight">Core</span>
      </div>
      <span class="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] leading-none">Environmental Solutions Pvt. Ltd</span>
    </div>
  </a>
  
  <div class="hidden md:flex items-center gap-8">
    <a href="/" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Home</a>
    <div class="nav-item-services group/mega">
      <a href="/services.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200 flex items-center gap-1">
        Services 
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover/mega:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      
      <div class="mega-menu">
        <a href="/services.html#esg-reporting" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          </div>
          <div>
            <span class="title">ESG Reporting</span>
            <span class="desc">BRSR, GRI, SASB & TCFD framework disclosures.</span>
          </div>
        </a>
        
        <a href="/services.html#carbon-climate" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.36 12 15 12 18c0 2.5-2.03 4-5 4-.74 0-1.42-.09-2-.25"/></svg>
          </div>
          <div>
            <span class="title">Carbon & Climate</span>
            <span class="desc">GHG inventory, CBAM advisory & Net Zero.</span>
          </div>
        </a>

        <a href="/services.html#ratings-targets" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div>
            <span class="title">Ratings & Targets</span>
            <span class="desc">EcoVadis, SBTi & Materiality analysis.</span>
          </div>
        </a>

        <a href="/services.html#clearances-eia" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <span class="title">Clearances & EIA</span>
            <span class="desc">Environmental audits & regulatory approvals.</span>
          </div>
        </a>

        <a href="/services.html#licenses-epr" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/></svg>
          </div>
          <div>
            <span class="title">Licenses & EPR</span>
            <span class="desc">Plastic, E-waste & Battery waste management.</span>
          </div>
        </a>

        <a href="/services.html#management-systems" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <span class="title">Management Systems</span>
            <span class="desc">ISO 14001, 45001 & 50001 implementation.</span>
          </div>
        </a>

        <a href="/services.html#water-testing" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
          </div>
          <div>
            <span class="title">Water Testing</span>
            <span class="desc">Potable, Waste & NABL accredited analysis.</span>
          </div>
        </a>

        <a href="/services.html#air-monitoring" class="mega-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a3.5 3.5 0 1 1-5.83-2.66h.1a4.5 4.5 0 1 1 2.33-8.13h.1a5.5 5.5 0 1 1 8.8 6.06h.1a4.5 4.5 0 1 1-5.5 4.73Z"/></svg>
          </div>
          <div>
            <span class="title">Air Monitoring</span>
            <span class="desc">Ambient, Stack & Indoor air quality audits.</span>
          </div>
        </a>
      </div>
    </div>
    <a href="/cbam.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">CBAM</a>
    <a href="/about.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">About</a>
    <a href="/insights.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Insights</a>
    <a href="/contact.html" class="px-7 py-2.5 bg-brand-green text-white rounded-full text-[13px] font-bold tracking-wide uppercase hover:bg-brand-blue hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Free Consultation</a>
    
    <!-- Theme Toggle Switch -->
    <div class="flex items-center ml-4">
      <button id="theme-toggle" class="relative inline-flex items-center h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none bg-slate-200 dark:bg-slate-800" role="switch" aria-checked="false">
        <span class="sr-only">Toggle Dark Mode</span>
        <span id="theme-toggle-thumb" class="pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out translate-x-0 dark:translate-x-5 flex items-center justify-center">
          <!-- Sun Icon -->
          <svg id="theme-toggle-light-icon" class="h-3.5 w-3.5 text-brand-blue dark:hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 4.22a1 1 0 011.415 0l.708.708a1 1 0 01-1.414 1.414l-.708-.708a1 1 0 010-1.414zM16 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-4.22 4.22a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-4.22a1 1 0 010-1.414l.708-.708a1 1 0 011.414 1.414l-.708.708a1 1 0 01-1.414 0zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm4.22-4.22a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <!-- Moon Icon -->
          <svg id="theme-toggle-dark-icon" class="hidden h-3.5 w-3.5 text-brand-green dark:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        </span>
      </button>
    </div>
  </div>

  <button class="md:hidden text-slate-800 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" id="mobile-menu-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
  </button>
</nav>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-50 bg-white dark:bg-[#060a0f] transform translate-x-full transition-transform duration-500 md:hidden flex flex-col pt-32 px-10 gap-6">
    <button id="close-menu" class="absolute top-8 right-8 text-slate-800 dark:text-white p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <a href="/" class="text-3xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Home</a>
    <a href="/services.html" class="text-3xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Services</a>
    <a href="/cbam.html" class="text-3xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">CBAM</a>
    <a href="/about.html" class="text-3xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">About</a>
    <a href="/insights.html" class="text-3xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Insights</a>
    <a href="/contact.html" class="mt-4 px-10 py-5 bg-brand-green text-white rounded-full text-xl font-bold text-center shadow-xl shadow-brand-green/20">Contact Us</a>
</div>
`,C=`
<footer class="bg-brand-softGray dark:bg-[#0a0f16] text-brand-charcoal dark:text-slate-300 pt-32 pb-12 border-t border-slate-200 dark:border-slate-800">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
    <div class="col-span-1 md:col-span-1">
      <div class="flex items-center gap-3 mb-8 group">
        <img src="/Frame 4.svg" alt="SustainCore" class="h-8 w-auto">
        <div class="flex flex-col">
          <div class="flex items-center">
            <span class="text-lg font-display font-bold text-brand-green">Sustain</span>
            <span class="text-lg font-display font-medium text-brand-blue dark:text-white">Core</span>
          </div>
        </div>
      </div>
      <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-sm">
        Defining the future of verifiable sustainability through scientific integrity and data transparency.
      </p>
      <div class="flex gap-4">
        <a href="#" class="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-brand-blue dark:hover:bg-brand-green hover:text-white dark:hover:text-white hover:border-transparent transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
    
    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-8 tracking-wide">Solutions</h4>
      <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400">
        <li><a href="/services.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">ESG Reporting</a></li>
        <li><a href="/services.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Carbon Solutions</a></li>
        <li><a href="/services.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Compliance</a></li>
        <li><a href="/services.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Environmental Testing</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-8 tracking-wide">Company</h4>
      <ul class="space-y-4 text-sm text-slate-500 dark:text-slate-400">
        <li><a href="/about.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Our Mission</a></li>
        <li><a href="/cbam.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">CBAM Advisory</a></li>
        <li><a href="/insights.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Insights</a></li>
        <li><a href="/contact.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-8 tracking-wide">Connect</h4>
      <form id="subscribe-form" class="space-y-4">
        <input type="email" name="email" required placeholder="Email Address" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30 dark:focus:ring-brand-green/50 text-sm">
        <button type="submit" class="w-full py-3.5 bg-brand-charcoal dark:bg-brand-green text-white rounded-xl font-bold hover:bg-brand-blue dark:hover:bg-[#3d694b] transition-all tracking-wider text-[13px] uppercase">SUBSCRIBE</button>
      </form>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 dark:text-slate-400 text-[13px]">
    <p>© 2026 SustainCore Environmental Solutions Pvt. Ltd.</p>
    <div class="flex gap-8">
      <a href="/imprint.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Imprint</a>
      <a href="/privacy.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Privacy</a>
    </div>
  </div>
</footer>
`;document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("calc-netmass"),r=document.getElementById("calc-see"),t=document.getElementById("calc-benchmark"),n=document.getElementById("calc-cost"),e=document.querySelector(".input-group select"),s=document.getElementById("out-netmass"),i=document.getElementById("out-emissions"),o=document.getElementById("out-phaseout"),l=document.getElementById("out-cost"),c={"Iron & Steel (72, 73)":1.6,"Aluminium (76)":2.1,"Cement (2523)":.8,"Fertilizers (3102, 3105)":1.9,"Hydrogen (2804 10 00)":10.4},h=.975,m={EUR:1,USD:1.09,INR:90};let g="EUR";const w=d=>(g==="EUR"?"€":g==="USD"?"$":"₹")+Math.round(d).toLocaleString(),v=()=>{const d=parseFloat(a.value)||0,u=parseFloat(r.value)||0,b=parseFloat(t.value)||0,k=parseFloat(n.value)||0,x=d*u,y=b*d*h,E=Math.max(0,x-y)*k;s.innerText=d.toLocaleString()+" t",i.innerText=Math.round(x).toLocaleString()+" tCO₂",o.innerText=(h*100).toFixed(2)+"%";const S=E*m[g];l.innerText=w(S)};[a,r,t,n].forEach(d=>{d&&d.addEventListener("input",v)}),e&&e.addEventListener("change",d=>{const u=c[d.target.value];u&&(t.value=u,v())});const p=document.querySelector(".calc-results");if(p){const d=document.createElement("div");d.className="currency-toggle flex gap-2 mt-4",d.innerHTML=`
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all active" data-cur="EUR">EUR</button>
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all" data-cur="USD">USD</button>
            <button class="px-3 py-1 text-[10px] font-bold border rounded hover:bg-brand-blue hover:text-white transition-all" data-cur="INR">INR</button>
        `,p.appendChild(d),d.querySelectorAll("button").forEach(u=>{u.addEventListener("click",()=>{d.querySelectorAll("button").forEach(b=>b.classList.remove("active","bg-brand-blue","text-white")),u.classList.add("active","bg-brand-blue","text-white"),g=u.getAttribute("data-cur"),v()})}),d.querySelector('[data-cur="EUR"]').classList.add("bg-brand-blue","text-white")}v()});function B(){const a=new Date,r=a.getMonth(),t=a.getFullYear();let n,e=t;r<3?n=3:r<6?n=6:r<9?n=9:(n=0,e=t+1);const i=[{m:0,d:31},{m:3,d:30},{m:6,d:31},{m:9,d:31}].find(o=>o.m===n);return new Date(e,i.m,i.d,23,59,59)}function f(){const t=B()-new Date;if(t<=0)return;const n=Math.floor(t/(1e3*60*60*24)),e=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),s=Math.floor(t%(1e3*60*60)/(1e3*60)),i=Math.floor(t%(1e3*60)/1e3);document.getElementById("days").textContent=n.toString().padStart(2,"0"),document.getElementById("hours").textContent=e.toString().padStart(2,"0"),document.getElementById("minutes").textContent=s.toString().padStart(2,"0"),document.getElementById("seconds").textContent=i.toString().padStart(2,"0")}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("cbam-timer")&&(f(),setInterval(f,1e3))});document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("header-root"),r=document.getElementById("footer-root");a&&(a.innerHTML=L),r&&(r.innerHTML=C);const t=document.getElementById("theme-toggle");document.documentElement.classList.remove("dark"),t&&t.setAttribute("aria-checked","false"),t&&t.addEventListener("click",function(){document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),t.setAttribute("aria-checked","false")):(document.documentElement.classList.add("dark"),t.setAttribute("aria-checked","true"))}),(()=>{const e=document.getElementById("mobile-menu-btn"),s=document.getElementById("close-menu"),i=document.getElementById("mobile-menu");e&&i&&e.addEventListener("click",()=>{i.classList.remove("translate-x-full")}),s&&i&&s.addEventListener("click",()=>{i.classList.add("translate-x-full")}),document.querySelectorAll("#mobile-menu a").forEach(l=>{l.addEventListener("click",()=>{i&&i.classList.add("translate-x-full")})})})()});document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelectorAll(".tab-btn"),r=document.querySelectorAll(".panel"),t=document.querySelectorAll(".mega-item"),n=()=>{const o=document.getElementById("services-scroll-target")||document.getElementById("services-nav-anchor");o&&o.scrollIntoView({behavior:"smooth",block:"start"})},e=o=>{a.forEach(l=>{l.getAttribute("data-tab")===o?l.classList.add("active"):l.classList.remove("active")}),r.forEach(l=>{l.id===o?l.classList.add("active"):l.classList.remove("active")})};a.forEach(o=>{o.addEventListener("click",l=>{const c=o.getAttribute("data-tab");e(c),n(),history.pushState(null,null,`#${c}`)})}),t.forEach(o=>{o.addEventListener("click",l=>{const c=o.getAttribute("href");if(c&&c.includes("#")){const h=c.split("#")[1];window.location.pathname.includes("services.html")&&(l.preventDefault(),e(h),n(),history.pushState(null,null,`#${h}`))}})});const s=()=>{const o=window.location.hash.substring(1);if(o)document.querySelector(`.tab-btn[data-tab="${o}"]`)&&(e(o),setTimeout(n,100));else if(a.length>0){const l=document.querySelector(".tab-btn.active");if(l){const c=l.getAttribute("data-tab");e(c)}}};window.addEventListener("load",s),window.addEventListener("hashchange",s),document.querySelectorAll(".faq-btn").forEach(o=>{o.addEventListener("click",()=>{const l=o.parentElement,c=l.classList.contains("active"),h=l.closest(".panel");h&&h.querySelectorAll(".faq-item").forEach(m=>m.classList.remove("active")),c||l.classList.add("active")})})});const M=()=>{let a=document.querySelector(".toast-container");return a||(a=document.createElement("div"),a.className="toast-container",document.body.appendChild(a)),a};window.showToast=(a,r,t="success")=>{const n=M(),e=document.createElement("div");e.className=`toast toast-${t}`;const s=t==="success"?'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';e.innerHTML=`
        <div class="toast-icon">${s}</div>
        <div class="toast-content">
            <div class="toast-title">${a}</div>
            <div class="toast-message">${r}</div>
        </div>
        <button class="toast-close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `,n.appendChild(e),setTimeout(()=>e.classList.add("show"),100);const i=()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),600)},o=setTimeout(i,5e3);e.querySelector(".toast-close").addEventListener("click",()=>{clearTimeout(o),i()})};window.handleSubmit=async function(a){a.preventDefault();const r=a.target,t=new FormData(r),n=r.querySelector('button[type="submit"]'),e=n.innerHTML;n.disabled=!0,n.innerHTML="Sending...";try{const s=await fetch(r.action,{method:r.method,body:t,headers:{Accept:"application/json"}});if(s.ok)window.showToast("Message Sent","Thank you! Our technical team will reach out shortly.","success"),r.reset();else{const i=await s.json();window.showToast("Submission Error",i.errors?i.errors[0].message:"Unable to send message. Please try again.","error")}}catch{window.showToast("System Offline","Could not connect to the server. Please check your internet.","error")}finally{n.disabled=!1,n.innerHTML=e}};
