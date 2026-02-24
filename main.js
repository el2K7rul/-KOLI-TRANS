// --- SCROLL TOP BUTTON ---
document.addEventListener('DOMContentLoaded', function () {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  const hero = document.querySelector('.hero');
  if (scrollBtn && hero) {
    window.addEventListener('scroll', function() {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (window.scrollY > heroBottom) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  hamburger.addEventListener('click', function() {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });
  // Zamknij menu po kliknięciu w link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });
});


// Modal obsługa dla Product-tile i nowego modala
document.addEventListener('DOMContentLoaded', function () {
      // Utrwalenie efektu fleet-intro-text po pierwszym hoverze/kliknięciu
      var fleetIntro = document.querySelector('.fleet-intro');
      if (fleetIntro) {
        var fleetIntroHandler = function() {
          fleetIntro.classList.add('active');
          fleetIntro.removeEventListener('mouseenter', fleetIntroHandler);
        };
        fleetIntro.addEventListener('mouseenter', fleetIntroHandler);
      }
    // FADE-IN efekt dla sekcji O nas
    var aboutHeading = document.querySelector('.about-us-heading');
    var aboutText1 = document.querySelector('.about-us-text1');
    var aboutText2 = document.querySelector('.about-us-text2');
    var aboutText3 = document.querySelector('.about-us-text3');

    if (aboutHeading) {
      aboutHeading.style.opacity = 0;
      aboutHeading.style.transition = 'opacity 0.7s';
      setTimeout(function() {
        aboutHeading.style.opacity = 1;
      }, 100);
    }
    if (aboutText1) {
      aboutText1.style.opacity = 0;
      aboutText1.style.transition = 'opacity 0.7s';
      setTimeout(function() {
        aboutText1.style.opacity = 1;
      }, 400);
    }
    if (aboutText2) {
      aboutText2.style.opacity = 0;
      aboutText2.style.transition = 'opacity 0.7s';
      setTimeout(function() {
        aboutText2.style.opacity = 1;
      }, 700);
    }
    if (aboutText3) {
      aboutText3.style.opacity = 0;
      aboutText3.style.transition = 'opacity 0.7s';
      setTimeout(function() {
        aboutText3.style.opacity = 1;
      }, 1000);
    }
  // Obsługa modala (istniejący kod)
  var modal = document.getElementById('modal-contact');
  if (modal) {
    var overlay = modal.querySelector('.modal-overlay');
    var closeBtns = modal.querySelectorAll('[data-close-modal="modal-contact"]');
    document.querySelectorAll('.product-tile').forEach(function(tile) {
      tile.addEventListener('click', function() {
        modal.classList.add('open');
        document.body.classList.add('modal-open');
      });
    });
    if (closeBtns && closeBtns.length) {
      closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          modal.classList.remove('open');
          document.body.classList.remove('modal-open');
        });
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      });
    }
  }

  // COOKIE BANNER (GDPR)
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAcceptBtn = document.getElementById('cookie-banner-accept');
  var cookieRevoke = document.getElementById('cookie-banner-revoke');
  var cookieRevokeLink = document.getElementById('cookie-banner-revoke-link');
  var cookieName = 'cookie_banner_accepted';

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }

  // Pokazuj banner jeśli nie zaakceptowano i jest włączony (ale nie nadpisuj widoczności w Customizerze)
  var isCustomizePreview = document.body.classList.contains('customize-preview');
  if (cookieBanner && !isCustomizePreview) {
    if (!getCookie(cookieName)) {
      cookieBanner.style.display = 'block';
      if (cookieRevoke) cookieRevoke.style.display = 'none';
    } else {
      if (cookieBanner) cookieBanner.style.display = 'none';
      if (cookieRevoke) cookieRevoke.style.display = 'block';
    }
  }
  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', function() {
      setCookie(cookieName, '1', 365);
      if (cookieBanner) cookieBanner.style.display = 'none';
      if (cookieRevoke) cookieRevoke.style.display = 'block';
    });
  }
  // Pokazuj link do odwołania zgody jeśli zaakceptowano
  if (cookieRevoke && getCookie(cookieName)) {
    cookieRevoke.style.display = 'block';
  }
  if (cookieRevokeLink) {
    cookieRevokeLink.addEventListener('click', function(e) {
      e.preventDefault();
      eraseCookie(cookieName);
      if (cookieBanner) cookieBanner.style.display = 'block';
      if (cookieRevoke) cookieRevoke.style.display = 'none';
    });
  }

// --- SCROLLING BANNER INFINITE SCROLL SYNC ---
const banner = document.querySelector('.scrolling-banner-text');
if (banner) {
  // Duplikuj tekst, by efekt był płynny
  const text = banner.textContent;
  banner.textContent = text + ' ' + text + ' ' + text;
  const bannerWidth = banner.offsetWidth / 3;
  window.addEventListener('scroll', () => {
    const scrollX = window.scrollY;
    // Przesuwaj modulo szerokość tekstu, by efekt był nieskończony
    banner.style.transform = `translateX(-${scrollX % bannerWidth}px)`;
  });
}

// --- VERTICAL BANNER SCROLL SYNC ---
const verticalBanner = document.querySelector('.vertical-baner-text');
if (verticalBanner) {
  // Duplikuj tekst, by efekt był płynny
  const vText = verticalBanner.textContent;
  verticalBanner.textContent = vText + ' ' + vText + ' ' + vText;
  const vBannerHeight = verticalBanner.offsetHeight / 3;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    verticalBanner.style.transform = `translateY(-${scrollY % vBannerHeight}px)`;
  });
}


});
