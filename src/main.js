const $teamCarousel = $('.section-our-team__carousel-team').flickity({
  contain: true,
  cellAlign: "center",
  draggable: true,
  pageDots: false,
  adaptiveHeight: true,
  setGallerySize: false
});

const flkty = $teamCarousel.data('flickity')
const $teamCarouselStatus = $('</p>').addClass('carousel-team__carousel-status');
let childrenSlider = $('.flickity-slider').children();

(function () {
  const btnNavTrigger = document.querySelector('.btn-nav-trigger')
  btnNavTrigger.addEventListener('mouseenter', enterHamburger)
  btnNavTrigger.addEventListener('mouseleave', leaveHamburger)
  document.addEventListener('click', handlerMenu);
  $teamCarousel.on('select.flickity', updateStatus)

  $(window).on('load resize', function () {
    setupMarginTop()
    setupInheritWidth()
    moveNextChild()
    updateStatus()
    $('.flickity-viewport').outerHeight($('.carousel-cell').outerHeight())
  })

})()

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

function moveNextChild () {
  const cellFragment = $('<div class="carousel-cell"></div>')

  if (window.matchMedia('(min-width: 641px)').matches) {
    // console.log('выполняюсь потому что от 640px')

    if (childrenSlider.length === 0) {
      console.log("!!!" + childrenSlider.length === 0)
      childrenSlider = $('.flickity-slider').children()

    } else if (childrenSlider.length > 0 && $('.carousel-cell').length !== 4) {

      for (let i = 0; i < childrenSlider.length; i++) {
        $(childrenSlider[i]).addClass('cell').removeClass('carousel-cell');
      }

      const detachedChildren = $(childrenSlider.splice(0, 3)).detach()
      let slide = cellFragment.append(detachedChildren)
      $('.flickity-slider').append(slide)

      return moveNextChild()
    } else {
      console.info('я уже сгруппирован ' + 'моя длина ' + $('.carousel-cell').length)
    }

  } else if (window.matchMedia('(max-width: 640px)').matches) {
    // console.log('выполняюсь потому что до 640px')

    if (childrenSlider.length > 0 && $('.carousel-cell').length !== 10) {
      const DetachedChildren = $('.carousel-cell').children().detach()
      $('.carousel-cell').detach()
      $('.flickity-slider').append(DetachedChildren)

      for (let i = 0; i < $($('.flickity-slider').children()).length; i++) {
        $($('.flickity-slider').children()[i]).removeClass('cell').addClass('carousel-cell')
      }

      childrenSlider = $('.flickity-slider').children()
      return childrenSlider

    } else {
      console.info('а я обычный - один в каждой колонке и нас таких ' + $('.carousel-cell').length)
    }

  }
}

function updateStatus() {
  const cellNumber = flkty.selectedIndex + 1
  const flickityBtn = $('.flickity-button.flickity-prev-next-button.previous')

  $teamCarousel.flickity('reloadCells')
  $teamCarouselStatus.text(cellNumber + '/' + flkty.slides.length)
  flickityBtn.after($teamCarouselStatus)
}



