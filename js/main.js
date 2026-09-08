const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');

const updateHeaderState = () => {
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

if (navToggle && navLinks) {
    const closeMenu = () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        navLinks.classList.toggle('is-open', !isOpen);
    });

    navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
