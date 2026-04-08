const menu = document.querySelector('.menu');
const navigation = document.querySelector('.nav-links');
const headerNav = document.querySelector('.header-nav');

const closeMenu = () => {
    menu?.setAttribute('aria-expanded', 'false');
};

menu?.addEventListener('click', () => {
    const isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', `${!isExpanded}`);
});

navigation?.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest('a')) {
        closeMenu();
    }
});

document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) return;
    if (!headerNav?.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});
