// Мобильное меню
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');

function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  menu.hidden = !open;
}

burger.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

// Закреплённая кнопка: появляется, когда главная кнопка первого экрана ушла из вида
const heroCta = document.querySelector('[data-hero-cta]');
const sticky = document.querySelector('.sticky-cta');

if (heroCta && sticky && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    sticky.classList.toggle('is-visible', show);
    sticky.setAttribute('aria-hidden', String(!show));
    sticky.tabIndex = show ? 0 : -1;
  }).observe(heroCta);
}
