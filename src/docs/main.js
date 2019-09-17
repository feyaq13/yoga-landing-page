function setupPaddingTop () {
  const dimensionHeightNavigation = document.querySelector('.header__navigation').offsetHeight;
  document.querySelector('.header-page__main-headerings').style.paddingTop = dimensionHeightNavigation + 'px';
}

function setupInheritWidth () {
  const widthParent = document.querySelector('.header-page').offsetWidth + 'px'
  const child = document.querySelector('.header__navigation')
  child.style.maxWidth = widthParent;
}

function init () {
  const btnNavTrigger = document.querySelector('.btn-nav-trigger')
  setupPaddingTop()
  setupInheritWidth()
  btnNavTrigger.addEventListener('click', handlerMenu)
  btnNavTrigger.addEventListener('mouseenter', enterHamburger)
  btnNavTrigger.addEventListener('mouseleave', leaveHamburger)
}

function handlerMenu () {
  const navList = document.querySelector('.navigation__list')

  if (navList.classList.contains('open')) {
    navList.classList.replace('open', 'close')
  } else {
    navList.classList.replace('close', 'open')
  }
}

function enterHamburger () {
  this.children[2].style.width = "50%";
}

function leaveHamburger () {
  this.children[2].style.width = "";
}

init()



