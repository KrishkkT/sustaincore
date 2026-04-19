export const header = `
<nav class="fixed top-0 left-0 right-0 mx-auto w-[92%] max-w-6xl z-50 bg-white/80 backdrop-blur-xl border border-brand-softGray shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300" id="main-nav">
  <a href="/" class="flex items-center gap-3 group notranslate">
    <img src="/favicon.svg" alt ="SustainCore Logo - Environmental Solutions" title="SustainCore - Home" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
    <img src="/main_logo.svg" alt="SustainCore Logo - ESG and Sustainability" title="SustainCore - Home" class="h-7 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
  </a>
  
  <div class="hidden lg:flex items-center gap-8 navbar-items">
    <a href="/" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.home">Home</a>
    <div class="nav-item-services group/mega" id="nav-services-dropdown">
      <a href="/services.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200 flex items-center gap-1 cursor-pointer" id="nav-services-toggle">
        <span data-i18n="navbar.services">Services</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover/mega:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      
      <div class="mega-menu">
        <a href="/esg-reporting.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.esg_title">Environmental, Social, and Governance(ESG) Reporting & Disclosure</span>
            <span class="desc" data-i18n="navbar.esg_desc">BRSR, CDP, GRI, SASB & TCFD</span>
          </div>
        </a>
        
        <a href="/carbon-climate.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.carbon_title">Carbon Management & Climate Action</span>
            <span class="desc" data-i18n="navbar.carbon_desc">CBAM, GHG, PCF, Carbon Credits & I-REC</span>
          </div>
        </a>

        <a href="/clearances-eia.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.GPCB_title">GPCB & SPCB Compliance</span>
            <span class="desc" data-i18n="navbar.GPCB_desc">GPCB, EC, EIA, CTO/R/E, Waste Authorization</span>
          </div>
        </a>

        <a href="/ratings-targets.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.ratings_title">Ratings & Targets</span>
            <span class="desc" data-i18n="navbar.ratings_desc">Materiality Assessment, EcoVadis, EPD, SBTI</span>
          </div>
        </a>

        <a href="/management-systems.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.audits_title">Environmental Audits</span>
            <span class="desc" data-i18n="navbar.audits_desc">ISO 14001, 45001, 50001</span>
          </div>
        </a>

        <a href="/water-testing.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.water_title">Water and Wastewater Quality Testing</span>
            <span class="desc" data-i18n="navbar.water_desc">Effluent analysis, Groundwater & Water audits, Water Risk</span>
          </div>
        </a>

        <a href="/air-monitoring.html" class="mega-item">
          <div>
            <span class="title" data-i18n="navbar.air_title">Air Quality Monitoring & Emission Testing</span>
            <span class="desc" data-i18n="navbar.air_desc">Stack, Ambient, Workplace air quality & CEMS</span>
          </div>
        </a>
      </div>
    </div>
    <a href="/cbam.html" title="CBAM Advisory" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.cbam">CBAM</a>
    <a href="/insights.html" title="Sustainability Insights" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.insights">Insights</a>
    <a href="/join-us.html" title="Careers at SustainCore" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.careers">Careers</a>
    <a href="/partners.html" title="SustainCore Partners" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.partners">Partners</a>
    <a href="/about.html" title="About SustainCore Ahmedabad, Germany & Europe" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green transition-colors duration-200" data-i18n="navbar.about">About Us</a>
    
    <!-- Premium Language Selector
    <div class="relative group/lang" id="lang-selector-root">
      <button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-100 transition-all duration-300" id="current-lang-btn">
        <span id="current-lang-flag">🇺🇸</span>
        <span id="current-lang-label" class="uppercase">EN</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      
      <div class="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 z-[60] translate-y-2 group-hover/lang:translate-y-0">
        <div class="p-2 grid grid-cols-1 gap-1">
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left" data-lang="en" data-flag="🇺🇸">
            <span class="text-base">🇺🇸</span>
            <span class="text-[13px] font-medium text-slate-700" data-i18n="navbar.lang_en">English</span>
          </button>
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left" data-lang="de" data-flag="🇩🇪">
            <span class="text-base">🇩🇪</span>
            <span class="text-[13px] font-medium text-slate-700" data-i18n="navbar.lang_de">Deutsch (German)</span>
          </button>
        </div>
      </div>
    </div> -->

    <!-- Hidden native Google Translate element -->
    <div id="google_translate_element" style="display:none !important;"></div>

    <a href="/contact.html" class="px-5 py-2 bg-brand-green text-white rounded-full text-[12px] font-bold tracking-wide uppercase hover:bg-brand-blue hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" data-i18n="navbar.cta">Free Consultation</a>
  </div>

  <button class="lg:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-lg transition-colors" id="mobile-menu-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
  </button>
</nav>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-50 bg-white transform translate-x-full transition-transform duration-500 lg:hidden flex flex-col pt-32 px-6 gap-4 overflow-y-auto">
    <button id="close-menu" class="absolute top-6 right-6 text-slate-800 p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <a href="/" class="text-xl font-display font-bold text-slate-900 py-3 border-b border-slate-100" data-i18n="navbar.home">Home</a>
    <button id="mobile-services-toggle" class="flex items-center gap-2 w-full text-left text-xl font-display font-bold text-slate-900 py-3 border-b border-slate-100">
      <span data-i18n="navbar.services">Services</span>
      <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
    </button>
    <div id="mobile-services-list" class="hidden flex flex-col gap-2 px-3">
      <a href="/esg-reporting.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.esg_reporting">ESG Reporting</a>
      <a href="/carbon-climate.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.carbon_management">Carbon Management</a>
      <a href="/ratings-targets.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.ratings_title">Sustainability Ratings</a>
      <a href="/clearances-eia.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.GPCB_compliance">GPCB Compliance</a>
      <a href="/management-systems.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.environmental_audits">Environmental Audits</a>
      <a href="/water-testing.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.water_testing">Water Testing</a>
      <a href="/air-monitoring.html" class="text-base font-medium text-slate-700 py-2" data-i18n="navbar.air_monitoring">Air Monitoring</a>
    </div>
    <a href="/cbam.html" class="text-xl font-display font-bold text-slate-900 py-3 border-b border-slate-100" data-i18n="navbar.cbam">CBAM</a>
    <a href="/about.html" class="text-xl font-display font-bold text-slate-900 py-3 border-b border-slate-100" data-i18n="navbar.about">About Us</a>
    <a href="/insights.html" class="text-xl font-display font-bold text-slate-900 py-3 border-b border-slate-100" data-i18n="navbar.insights">Insights</a>
    <a href="/contact.html" class="mt-4 px-8 py-4 bg-brand-green text-white rounded-full text-xl font-bold text-center shadow-xl shadow-brand-green/20" data-i18n="navbar.contact">Contact Us</a>
    
    <!-- Mobile Language Selector
    <div class="mt-6 pt-6 border-t border-slate-100">
      <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2" data-i18n="navbar.mobile_lang_select">Select Language</p>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
        <button class="lang-switch-btn" data-lang="en" style="display: flex; align-items: center; justify-content: center; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.75rem; background: #fff; cursor: pointer;">
          <span style="font-size: 0.875rem; font-weight: 500; color: #334155;">English</span>
        </button>
        <button class="lang-switch-btn" data-lang="de" style="display: flex; align-items: center; justify-content: center; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.75rem; background: #fff; cursor: pointer;">
          <span style="font-size: 0.875rem; font-weight: 500; color: #334155;">German</span>
        </button>
      </div>
    </div> -->
</div>
`;

export const footer = `
<footer class="bg-brand-softGray text-brand-charcoal pt-14 pb-8 border-t border-slate-200">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[320px_1fr_1fr_1fr] gap-10 mb-10">
    <div class="flex flex-col items-start text-left sm:col-span-2 lg:col-span-1 max-w-sm">
      <div class="flex items-center gap-2 mb-4 group">
       <a href="/" class="flex items-center gap-3 group notranslate">
         <img src="/favicon.svg" alt ="SustainCore Logo" class="h-12 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
         <img src="/main_logo_bgremoved.svg" alt="SustainCore Logo" class="h-14 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
        </a>
      </div>
      <p class="text-slate-500 leading-relaxed mb-6 text-sm" data-i18n="footer.tagline">
        SustainCore is defining the future of verified sustainability and <strong>Environmental Solutions</strong>.
      </p>
      <div class="flex gap-3">
     <!-- LinkedIn -->
      <a href="https://linkedin.com/in/sustaincore" aria-label="LinkedIn"
        class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-transparent transition-all shadow-sm">
  
        <svg xmlns="http://www.w3.org/2000/svg" 
       width="20" height="20" 
       viewBox="0 0 24 24" 
       fill="none" 
       stroke="currentColor" 
       stroke-width="2" 
       stroke-linecap="round" 
       stroke-linejoin="round">
       
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
    
      </svg>
      </a>
      </div>
    </div>
    
    <div class="space-y-4">
      <h4 class="font-display font-bold text-brand-blue tracking-wide uppercase text-xs" data-i18n="footer.solutions">Solutions</h4>
      <ul class="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:flex-col lg:gap-0 lg:space-y-2.5 text-sm text-slate-500">
      <li><a href="/cbam.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.cbam">CBAM Advisory</a></li>
        <li><a href="/esg-reporting.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.esg_reporting">ESG Reporting</a></li>
        <li><a href="/clearances-eia.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.GPCB_compliance">GPCB Compliance</a></li>
        <li><a href="/carbon-climate.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.carbon_management">Carbon Management</a></li>
        <li><a href="/ratings-targets.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.ratings_title">Ratings & Targets</a></li>
        <li><a href="/management-systems.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.environmental_audits">Environmental Audits</a></li>
        <li><a href="/water-testing.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.water_testing">Water Testing</a></li>
        <li><a href="/air-monitoring.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.air_monitoring">Air Monitoring</a></li>
      </ul>
    </div>

    <div class="space-y-4">
      <h4 class="font-display font-bold text-brand-blue tracking-wide uppercase text-xs" data-i18n="footer.company">Company</h4>
      <ul class="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:flex-col lg:gap-0 lg:space-y-2.5 text-sm text-slate-500">
        <li><a href="/about.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.mission">About Us</a></li>
        <li><a href="/insights.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.insights">Insights</a></li>
        <li><a href="/join-us.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.careers">Careers</a></li>
        <li><a href="/partners.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.partners">Partners</a></li>
        <li><a href="/contact.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.get_in_touch">Contact</a></li>
      </ul>
    </div>

    <div class="space-y-4 lg:w-[110%]">
      <h4 class="font-display font-bold text-brand-blue tracking-wide uppercase text-xs">Stay Updated</h4>
      <p class="text-slate-500 text-sm leading-relaxed mb-4">
        Get the latest sustainability updates, insights, and news delivered to your inbox.
      </p>
      <form id="subscribe-form" class="space-y-3">
        <input type="email" name="email" required placeholder="Email Address" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green/30 text-sm transition-all" data-i18n-attr="placeholder:footer.email_placeholder">
        <button type="submit" class="w-full py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-brand-blue transition-all tracking-[0.1em] text-[11px] uppercase shadow-lg shadow-black/5" data-i18n="footer.subscribe">SUBSCRIBE</button>
      </form>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-[12px] font-medium">
    <p class="text-center md:text-left" data-i18n="footer.copyright">© 2026 SustainCore. All rights reserved.</p>
    <div class="flex gap-8 items-center">
      <a href="/imprint.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.imprint">Imprint</a>
      <a href="/privacy.html" class="hover:text-brand-blue transition-colors" data-i18n="footer.privacy">Privacy Policy</a>
    </div>
  </div>
</footer>
`;
