export const hamburgerMenu = { init };

const burgerElement = document.querySelector('.btn-nav-trigger');
const navList = burgerElement.parentElement.querySelector('.navigation__list');

let isActive = false;
let dropdownIsOpen = false;

function openDropdown () {
  navList.classList.replace('close', 'open');
  document.addEventListener('click', closeDropdown);
  dropdownIsOpen = true;
}

function closeDropdown (e) {
  navList.classList.replace('open', 'close');
  document.removeEventListener('click', closeDropdown);
  dropdownIsOpen = false;
}

function toggleDropdown (e) {
  e.stopPropagation();

  if (dropdownIsOpen) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

function init() {
  burgerElement.addEventListener('mouseenter', toggleActive);
  burgerElement.addEventListener('mouseleave', toggleActive);
  burgerElement.addEventListener('click', toggleDropdown);
}

function toggleActive () {
  isActive = !isActive;

  if (isActive) {
    burgerElement.children[2].style.width = '50%';
  } else {
    burgerElement.children[2].style.width = '';
  }
}
