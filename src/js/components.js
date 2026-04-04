export const header = `
<nav class="fixed top-0 left-0 right-0 mx-auto w-[92%] max-w-6xl z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-brand-softGray dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300" id="main-nav">
  <a href="/" class="flex items-center gap-3 group notranslate">
    <img src="/favicon.svg" alt ="SustainCore Logo" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
    <img src="/main_logo_bgremoved.svg" alt="SustainCore Logo" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
  </a>
  
  <div class="hidden md:flex items-center gap-8 navbar-items">
    <a href="/" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Home</a>
    <div class="nav-item-services group/mega" id="nav-services-dropdown">
      <a href="/services.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200 flex items-center gap-1 cursor-pointer" id="nav-services-toggle">
        Services 
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover/mega:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
      </a>
      
      <div class="mega-menu">
        <a href="/services.html#esg" class="mega-item">
          <div>
            <span class="title">Environmental, Social, and Governance(ESG) Reporting & Sustainability Disclosure</span>
            <span class="desc">BRSR, CDP, GRI, SASB & TCFD</span>
          </div>
        </a>
        
        <a href="/services.html#carbon" class="mega-item">
          <div>
            <span class="title">Carbon Management & Climate Action</span>
            <span class="desc">CBAM, GHG, PCF, Carbon Credits & I-REC</span>
          </div>
        </a>

        <a href="/services.html#ratings" class="mega-item">
          <div>
            <span class="title">Ratings & Targets</span>
            <span class="desc">Materiality Assessment, EcoVadis, EPD, SBTI</span>
          </div>
        </a>

        <a href="/services.html#gpcb" class="mega-item">
          <div>
            <span class="title">SPCB Compliance & Environmental Approval</span>
            <span class="desc">SPCB, EC, EIA, CTO/R/E, Waste Authorization</span>
          </div>
        </a>

        <a href="/services.html#env" class="mega-item">
          <div>
            <span class="title">Environmental Audits</span>
            <span class="desc">ISO 14001, 45001, 50001</span>
          </div>
        </a>

        <a href="/services.html#water" class="mega-item">
          <div>
            <span class="title">Water and Wastewater Quality Testing</span>
            <span class="desc">Effluent analysis, Groundwater & Water audits, Water Risk</span>
          </div>
        </a>

        <a href="/services.html#air" class="mega-item">
          <div>
            <span class="title">Air Quality Monitoring & Emission Testing</span>
            <span class="desc">Stack, Ambient, Workplace air quality & CEMS</span>
          </div>
        </a>
      </div>
    </div>
    <a href="/cbam.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">CBAM</a>
    <a href="/about.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">About</a>
    <a href="/insights.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Insights</a>
    <a href="/join-us.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Careers</a>
    <a href="/partners.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Partners</a>
    
    <!-- Premium Language Selector -->
    <div class="relative group/lang" id="lang-selector-root">
      <button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300" id="current-lang-btn">
        <span id="current-lang-flag">🇺🇸</span>
        <span id="current-lang-label" class="uppercase">EN</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      
      <div class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 z-[60] translate-y-2 group-hover/lang:translate-y-0">
        <div class="p-2 grid grid-cols-1 gap-1">
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left" data-lang="en" data-flag="🇺🇸">
            <span class="text-base">🇺🇸</span>
            <span class="text-[13px] font-medium text-slate-700 dark:text-slate-300">English</span>
          </button>
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left" data-lang="hi" data-flag="🇮🇳">
            <span class="text-base">🇮🇳</span>
            <span class="text-[13px] font-medium text-slate-700 dark:text-slate-300">हिंदी (Hindi)</span>
          </button>
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left" data-lang="gu" data-flag="🇮🇳">
            <span class="text-base">🇮🇳</span>
            <span class="text-[13px] font-medium text-slate-700 dark:text-slate-300">ગુજરાતી (Gujarati)</span>
          </button>
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left" data-lang="de" data-flag="🇩🇪">
            <span class="text-base">🇩🇪</span>
            <span class="text-[13px] font-medium text-slate-700 dark:text-slate-300">Deutsch (German)</span>
          </button>
          <button class="lang-option flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left" data-lang="fr" data-flag="🇫🇷">
            <span class="text-base">🇫🇷</span>
            <span class="text-[13px] font-medium text-slate-700 dark:text-slate-300">Français (French)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden native Google Translate element -->
    <div id="google_translate_element" style="display:none !important;"></div>

    <a href="/contact.html" class="px-7 py-2.5 bg-brand-green text-white rounded-full text-[13px] font-bold tracking-wide uppercase hover:bg-brand-blue hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Free Consultation</a>
  </div>

  <button class="md:hidden text-slate-800 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" id="mobile-menu-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
  </button>
</nav>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-50 bg-white dark:bg-slate-900 transform translate-x-full transition-transform duration-500 md:hidden flex flex-col pt-32 px-6 gap-4">
    <button id="close-menu" class="absolute top-6 right-6 text-slate-800 dark:text-white p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <a href="/" class="text-xl font-display font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">Home</a>
    <button id="mobile-services-toggle" class="flex items-center justify-between w-full text-left text-xl font-display font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">
      Services
      <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
    </button>
    <div id="mobile-services-list" class="hidden flex flex-col gap-2 px-3">
      <a href="/esg-reporting.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">ESG Reporting</a>
      <a href="/carbon-climate.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">Carbon Management</a>
      <a href="/ratings-targets.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">Sustainability Ratings</a>
      <a href="/clearances-eia.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">SPCB Compliance</a>
      <a href="/management-systems.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">Environmental Audits</a>
      <a href="/water-testing.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">Water Testing</a>
      <a href="/air-monitoring.html" class="text-base font-medium text-slate-700 dark:text-slate-300 py-2">Air Monitoring</a>
    </div>
    <a href="/cbam.html" class="text-xl font-display font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">CBAM</a>
    <a href="/about.html" class="text-xl font-display font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">About</a>
    <a href="/insights.html" class="text-xl font-display font-bold text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">Insights</a>
    <a href="/contact.html" class="mt-4 px-8 py-4 bg-brand-green text-white rounded-full text-xl font-bold text-center shadow-xl shadow-brand-green/20">Contact Us</a>
    
    <!-- Mobile Language Selector -->
    <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
      <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Select Language</p>
      <div class="grid grid-cols-2 gap-2">
        <button class="lang-option flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-medium" data-lang="en" data-flag="🇺🇸">
          <span>🇺🇸</span> English
        </button>
        <button class="lang-option flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-medium" data-lang="hi" data-flag="🇮🇳">
          <span>🇮🇳</span> हिंदी
        </button>
        <button class="lang-option flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-medium" data-lang="gu" data-flag="🇮🇳">
          <span>🇮🇳</span> ગુજરાતી
        </button>
        <button class="lang-option flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-medium" data-lang="de" data-flag="🇩🇪">
          <span>🇩🇪</span> German
        </button>
      </div>
    </div>
</div>
`;

export const footer = `
<footer class="bg-brand-softGray dark:bg-slate-900 text-brand-charcoal dark:text-slate-300 pt-14 pb-8 border-t border-slate-200 dark:border-slate-800">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[320px_1fr_1fr_1fr] gap-6 mb-10">
    <div class="flex flex-col items-start text-left max-w-[280px]">
      <div class="flex items-center gap-2 mb-3 group">
        <img src="/favicon.svg" alt ="SustainCore Logo" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
        <img src="/main_logo_bgremoved.svg" alt="SustainCore Logo" class="h-9 w-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
      </div>
      <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-3 text-sm">
        Defining the future of verifiable sustainability through scientific integrity and data transparency.
      </p>
      <div class="flex gap-2">

  <!-- X (Twitter) -->
  <a href="https://x.com" class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-black hover:text-white hover:border-transparent transition-all">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.35-6.993L3.5 22H1l7.02-8.02L2 2h6.828l4.85 6.35L18.244 2Zm-2.396 18h1.884L8.244 4H6.228l9.62 16Z"/>
    </svg>
  </a>

  <!-- Instagram -->
  <a href="https://instagram.com" class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-transparent transition-all">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  </a>

</div>
    </div>
    
    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-3 tracking-wide">Solutions</h4>
      <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
        <li><a href="/esg-reporting.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">ESG Reporting</a></li>
        <li><a href="/carbon-climate.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Carbon Management</a></li>
        <li><a href="/ratings-targets.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Ratings & Targets</a></li>
        <li><a href="/clearances-eia.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">SPCB Compliance</a></li>
        <li><a href="/management-systems.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Environmental Audits</a></li>
        <li><a href="/water-testing.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Water Testing</a></li>
        <li><a href="/air-monitoring.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Air Monitoring</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-3 tracking-wide">Company</h4>
      <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
        <li><a href="/about.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Our Mission</a></li>
        <li><a href="/cbam.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">CBAM Advisory</a></li>
        <li><a href="/insights.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Insights</a></li>
        <li><a href="/join-us.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Careers</a></li>
        <li><a href="/partners.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Partners</a></li>
        <li><a href="/contact.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-display font-bold text-brand-blue dark:text-brand-green mb-3 tracking-wide">Connect</h4>
      <form id="subscribe-form" class="space-y-2">
        <input type="email" name="email" required placeholder="Email Address" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30 dark:focus:ring-brand-green/50 text-sm">
        <button type="submit" class="w-full py-2.5 bg-brand-charcoal dark:bg-brand-green text-white rounded-xl font-bold hover:bg-brand-blue dark:hover:bg-[#3d694b] transition-all tracking-wider text-[13px] uppercase">SUBSCRIBE</button>
      </form>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400 text-[13px]">
    <p>© 2026 SustainCore Environmental Solutions Pvt. Ltd.</p>
    <div class="flex gap-8">
      <a href="/imprint.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Imprint</a>
      <a href="/privacy.html" class="hover:text-brand-blue dark:hover:text-white transition-colors">Privacy</a>
    </div>
  </div>
</footer>
`;
