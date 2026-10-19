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

// Закреплённая кнопка: видна, когда главная кнопка первого экрана ушла вверх
// и пока на экране нет финального блока с контактами
const heroCta = document.querySelector('[data-hero-cta]');
const contact = document.getElementById('contatti');
const sticky = document.querySelector('.sticky-cta');

if (heroCta && sticky && 'IntersectionObserver' in window) {
  let pastHero = false;
  let atContact = false;
  const update = () => {
    const show = pastHero && !atContact;
    sticky.classList.toggle('is-visible', show);
    sticky.setAttribute('aria-hidden', String(!show));
    sticky.tabIndex = show ? 0 : -1;
  };
  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  }).observe(heroCta);
  if (contact) {
    new IntersectionObserver(([entry]) => {
      atContact = entry.isIntersecting;
      update();
    }).observe(contact);
  }
}
