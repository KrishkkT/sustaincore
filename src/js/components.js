export const header = `
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
    <a href="/services.html" class="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-brand-green dark:text-slate-300 dark:hover:text-brand-green transition-colors duration-200">Services</a>
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
`;

export const footer = `
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
      <form class="space-y-4">
        <input type="email" placeholder="Email Address" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30 dark:focus:ring-brand-green/50 text-sm">
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
`;
