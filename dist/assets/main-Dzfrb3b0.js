(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const n=`
<nav class="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 glass rounded-full px-8 py-4 flex items-center justify-between transition-all duration-500" id="main-nav">
  <a href="/" class="flex items-center gap-2">
    <div class="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
      <span class="text-white font-bold text-lg">S</span>
    </div>
    <span class="text-brand-blue font-bold text-lg tracking-tight">SustainCore</span>
  </a>
  
  <div class="hidden md:flex items-center gap-8">
    <a href="/" class="text-sm text-slate-600 hover:text-brand-blue font-bold transition-colors">Home</a>
    <a href="/services.html" class="text-sm text-slate-600 hover:text-brand-blue font-bold transition-colors">Services</a>
    <a href="/cbam.html" class="text-sm text-slate-600 hover:text-brand-blue font-bold transition-colors">CBAM</a>
    <a href="/about.html" class="text-sm text-slate-600 hover:text-brand-blue font-bold transition-colors">About</a>
    <a href="/insights.html" class="text-sm text-slate-600 hover:text-brand-blue font-bold transition-colors">Insights</a>
    <a href="/contact.html" class="px-6 py-2 bg-brand-blue text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-brand-blue/20 transition-all">Contact</a>
  </div>

  <button class="md:hidden text-slate-600 p-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
  </button>
</nav>
`,a=`
<footer class="bg-brand-charcoal text-white pt-32 pb-12">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
    <div class="col-span-1 md:col-span-1">
      <div class="flex items-center gap-2 mb-8">
        <div class="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
          <span class="text-white font-bold text-xl">S</span>
        </div>
        <span class="text-white font-bold text-xl tracking-tight">SustainCore</span>
      </div>
      <p class="text-slate-400 leading-relaxed mb-8">
        Defining the future of verifiable sustainability through scientific integrity and data transparency.
      </p>
      <div class="flex gap-4">
        <a href="#" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
    
    <div>
      <h4 class="font-display font-bold text-lg mb-8 text-brand-lightGreen">Solutions</h4>
      <ul class="space-y-4 text-slate-400">
        <li><a href="/services.html#esg" class="hover:text-white transition-colors">ESG Reporting</a></li>
        <li><a href="/services.html#carbon" class="hover:text-white transition-colors">Carbon Solutions</a></li>
        <li><a href="/services.html#compliance" class="hover:text-white transition-colors">Compliance</a></li>
        <li><a href="/services.html#testing" class="hover:text-white transition-colors">Environmental Testing</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-lg mb-8 text-brand-lightGreen">Experience</h4>
      <ul class="space-y-4 text-slate-400">
        <li><a href="/about.html" class="hover:text-white transition-colors">Our Mission</a></li>
        <li><a href="/cbam.html" class="hover:text-white transition-colors">CBAM Advisory</a></li>
        <li><a href="/insights.html" class="hover:text-white transition-colors">Insights</a></li>
        <li><a href="/contact.html" class="hover:text-white transition-colors">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-lg mb-8 text-brand-lightGreen">Connect</h4>
      <form class="space-y-4">
        <input type="email" placeholder="Email" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-blue">
        <button type="submit" class="w-full py-3 bg-brand-blue rounded-xl font-bold hover:bg-opacity-90 transition-all tracking-wider">SUBSCRIBE</button>
      </form>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
    <p>© 2026 SustainCore Environmental Solutions Pvt. Ltd. Verified Sustainability Partners.</p>
    <div class="flex gap-12">
      <a href="#" class="hover:text-white transition-colors">Imprint</a>
      <a href="#" class="hover:text-white transition-colors">Privacy</a>
    </div>
  </div>
</footer>
`;document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("header-placeholder"),s=document.getElementById("footer-placeholder");o&&(o.innerHTML=n),s&&(s.innerHTML=a),(()=>{const l=document.querySelector("button.md\\:hidden");l&&l.addEventListener("click",()=>{console.log("Mobile menu clicked")})})()});
