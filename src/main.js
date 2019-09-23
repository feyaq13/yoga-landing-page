function setupMarginTop () {
  const dimensionHeightNavigation = document.querySelector('.header-page').offsetHeight;
  document.querySelector('.header-page__main-content').style.marginTop = (dimensionHeightNavigation / 2) + 'px';
}

function setupInheritWidth () {
  const widthParent = document.querySelector('.header-page').offsetWidth + 'px'
  const child = document.querySelector('.header-page__navigation')
  child.style.maxWidth = widthParent;
}

function enterHamburger () {
  this.children[2].style.width = "50%";
}

function leaveHamburger () {
  this.children[2].style.width = "";
}

function handlerMenu (e) {
  let target = e.target;
  const navBar = document.querySelector('.header-page__navigation')
  const navList = document.querySelector('.navigation__list')


  if (navBar.contains(target) && !target.classList.contains('phone')) {
    if (navList.classList.contains('open')) {
      navList.classList.replace('open', 'close')
    } else {
      navList.classList.replace('close', 'open')
    }
  } else {
    navList.classList.replace('open', 'close')
  }
}

function init () {
  const btnNavTrigger = document.querySelector('.btn-nav-trigger')

  setupMarginTop()
  setupInheritWidth()

  btnNavTrigger.addEventListener('mouseenter', enterHamburger)
  btnNavTrigger.addEventListener('mouseleave', leaveHamburger)
  document.addEventListener('click', handlerMenu)
}

init()
const $teamCarousel = $('.section-our-team__carousel-team').flickity({
  contain: true,
  lazyLoad: 1,
  cellAlign: "center",
  draggable: true,
  pageDots: false,
  adaptiveHeight: true
});

const flkty = $teamCarousel.data('flickity')
const $teamCarouselStatus = $('</p>').addClass('carousel-team__carousel-status')

updateStatus();
$teamCarousel.on('select.flickity', updateStatus)

function updateStatus() {

  const cellNumber = flkty.selectedIndex + 1
  const flickityBtn = $('.flickity-button.flickity-prev-next-button.previous')

  $teamCarouselStatus.text(cellNumber + '/' + flkty.slides.length)
  flickityBtn.after($teamCarouselStatus)
}

