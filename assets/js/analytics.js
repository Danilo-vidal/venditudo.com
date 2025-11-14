// GA4 placeholder: substitua GA_MEASUREMENT_ID pelo seu ID real (G-XXXXXXXXXX)
(function(){
  const GA_ID = window.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return; // evita erro antes de configurar
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();