const $ = require('jquery');
const Flickity = require('flickity');
const jQueryBridget = require('jquery-bridget');

jQueryBridget('flickity', Flickity, $);

const $teamCarousel = $('.section-our-team__carousel-team').flickity({
  cellAlign: 'center',
  draggable: true,
  pageDots: false,
  resize: true,
  adaptiveHeight: true,
  setGallerySize: false
});

const teamFlkty = $teamCarousel.data('flickity');
const $teamCarouselStatus = $('</p>').addClass('carousel-team__carousel-status');
let childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();

const $reviewsCarousel = $('.section-reviews__carousel-reviews').flickity({
  groupCells: true,
  contain: true,
  draggable: true,
  pageDots: false,
  adaptiveHeight: true,
  setGallerySize: false
});

const flkty2 = $reviewsCarousel.data('flickity');
const $reviewsCarouselStatus = $('</p>').addClass('carousel-reviews__carousel-status');

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
$teamCarousel.on('select.flickity', updateStatus);
$reviewsCarousel.on('select.flickity', updateStatus);

$(window).on('load resize', function () {
  setupMarginTop();
  setupInheritWidth();

  if (window.matchMedia('(min-width: 769px)').matches) {
    showGroupingCells();
  } else if (window.matchMedia('(max-width: 768px)').matches) {
    showRegroupingCells();
  }

  updateStatus();
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
  const cellFragment = $('<div class="carousel-cell"></div>');

  if (childrenSlider.length === 0) {
    childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();
  } else if (childrenSlider.length > 0 && $('.carousel-cell').length !== 4) {
    teamFlkty.cells.forEach(function (cell) {
      cell.element.classList.value = 'cell';
    });

    const detachedChildren = $(childrenSlider.splice(0, 3)).detach();
    const slide = cellFragment.append(detachedChildren);
    $('.section-our-team__carousel-team .flickity-slider').append(slide);

    return showGroupingCells();
  }
}

function showRegroupingCells () {
  if (childrenSlider.length > 0 && $('.carousel-cell').length !== 10) {
    const DetachedChildren = $('.carousel-cell').children().detach();
    $('.carousel-cell').detach();
    $('.section-our-team__carousel-team .flickity-slider').append(DetachedChildren);
    for (let i = 0; i < $($('.flickity-slider').children()).length; i++) {
      $($('.section-our-team__carousel-team .flickity-slider').children()[i]).removeClass('cell').addClass('carousel-cell');
    }

    childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();
    return childrenSlider;
  }
}

function updateStatus () {
  const cellNumber = teamFlkty.selectedIndex + 1;
  const cellNumber2 = flkty2.selectedIndex + 1;
  const flickityBtn = $('.section-our-team__carousel-team .flickity-button.flickity-prev-next-button.previous');
  const flickityBtn2 = $('.section-reviews .flickity-button.flickity-prev-next-button.previous');

  $teamCarousel.flickity('reloadCells');
  $reviewsCarousel.flickity('reloadCells');
  $teamCarouselStatus.text(cellNumber + '/' + teamFlkty.slides.length);
  $reviewsCarouselStatus.text(cellNumber2 + '/' + flkty2.slides.length);
  flickityBtn.after($teamCarouselStatus);
  flickityBtn2.after($reviewsCarouselStatus);
}
