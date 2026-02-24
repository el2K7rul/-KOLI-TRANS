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
  var modal = document.getElementById('modal-contact');
  if (!modal) return;
  var overlay = modal.querySelector('.modal-overlay');
  var closeBtns = modal.querySelectorAll('[data-close-modal="modal-contact"]');

  // Otwieranie modala po kliknięciu w kafelek
  document.querySelectorAll('.product-tile').forEach(function(tile) {
    tile.addEventListener('click', function() {
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    });
  });
  // Zamknięcie przez overlay lub przycisk zamykania
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
});
