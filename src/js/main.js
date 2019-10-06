const $ = require('jquery');
const Flickity = require('flickity');
const jQueryBridget = require('jquery-bridget');

jQueryBridget('flickity', Flickity, $);

var carouselContainers = document.querySelectorAll('.carousel-container');

const $teamCarousel = initCarouselContainer( carouselContainers[0], {
  cellAlign: 'center',
  draggable: true,
  pageDots: false,
  resize: true,
  adaptiveHeight: true,
  setGallerySize: false
});

initCarouselContainer( carouselContainers[1], {
  groupCells: true,
  contain: true,
  draggable: true,
  adaptiveHeight: true,
  setGallerySize: false
});

function initCarouselContainer( container, options ) {
  var carousel = container.querySelector('.carousel');

  var flkty = new Flickity( carousel, {
    options
  });

  flkty.reloadCells()

  var carouselStatus = container.querySelector('.carousel__carousel-status');
  const flickityBtn = container.querySelector('.previous');

  console.dir(carouselStatus)

  function updateStatus() {
    var slideNumber = flkty.selectedIndex + 1;
    carouselStatus.textContent = slideNumber + '/' + flkty.slides.length
    flickityBtn.after(carouselStatus);
  }

  updateStatus();
  flkty.on( 'select', updateStatus );

  return flkty
}

const teamFlkty = $teamCarousel;
let childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();

$(document).ready(function () {
  $('.navigation__list').on('click', 'a', function (event) {
    event.preventDefault();

    const listItem = $(this).attr('href');
    const top = $(listItem).offset().top;

    $('body,html').animate({ scrollTop: top }, 1000);
  });
});

const btnNavTrigger = document.querySelector('.btn-nav-trigger');
btnNavTrigger.addEventListener('mouseenter', enterHamburger);
btnNavTrigger.addEventListener('mouseleave', leaveHamburger);
document.addEventListener('click', handlerMenu);

$(window).on('load resize', function () {
  setupMarginTop();
  setupInheritWidth();

  if (window.matchMedia('(min-width: 769px)').matches) {
    showGroupingCells();
  } else if (window.matchMedia('(max-width: 768px)').matches) {
    showRegroupingCells();
  }

  $teamCarousel.reloadCells()
  $('.section-our-team .flickity-viewport').outerHeight($('.carousel-cell').outerHeight());
  $('.section-reviews .flickity-viewport').outerHeight($('.review').outerHeight() + 20);
});

function setupMarginTop () {
  const dimensionHeightNavigation = document.querySelector('.header-page').offsetHeight;
  document.querySelector('.header-page__main-content').style.marginTop = (dimensionHeightNavigation / 2) + 'px';
}

function setupInheritWidth () {
  const widthParent = document.querySelector('.header-page').offsetWidth + 'px';
  const child = document.querySelector('.header-page__navigation');
  child.style.maxWidth = widthParent;
}

function enterHamburger () {
  this.children[2].style.width = '50%';
}

function leaveHamburger () {
  this.children[2].style.width = '';
}

function handlerMenu (e) {
  const target = e.target;
  const navBar = document.querySelector('.header-page__navigation');
  const navList = document.querySelector('.navigation__list');

  if (navBar.contains(target) && !target.classList.contains('phone')) {
    if (navList.classList.contains('open')) {
      navList.classList.replace('open', 'close');
    } else {
      navList.classList.replace('close', 'open');
    }
  } else {
    navList.classList.replace('open', 'close');
  }
}

function showGroupingCells () {

  if (childrenSlider.length === 0) {
    childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();
  } else if ($('.carousel-cell').length !== 4) {

    $teamCarousel.cells.forEach(function (cell) {
      cell.element.classList.value = 'cell';
    });

    const detachedChildren = $(childrenSlider.splice(0, 3)).detach();
    const cellFragment = $('<div class="carousel-cell"></div>');
    const slide = cellFragment.append(detachedChildren);
    $('.section-our-team__carousel-team .flickity-slider').append(slide);

    return showGroupingCells();
  }
}

function showRegroupingCells () {

  if ($('.carousel-cell').length !== 10) {
    const DetachedChildren = $('.carousel-cell').children().detach();
    $('.carousel-cell').detach();
    $('.section-our-team__carousel-team .flickity-slider').append(DetachedChildren);

    $teamCarousel.cells.forEach(function (cell) {
      cell.element.classList.value = 'carousel-cell';
    });

    childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();
  }
}
