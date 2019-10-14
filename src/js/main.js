import { commonCarouselConfig, scrollTopAnimationDurationMs } from './configs';
import { hamburgerMenu } from './hamburger';

const $ = require('jquery');
const Flickity = require('flickity');

var carouselContainers = document.querySelectorAll('.carousel-container');

const $teamCarousel = initCarouselContainer(carouselContainers[0], {
  ...commonCarouselConfig,
  pageDots: false,
  resize: true
});

hamburgerMenu.init();

initCarouselContainer(carouselContainers[1], {
  ...commonCarouselConfig,
  groupCells: true,
  contain: true
});

function initCarouselContainer (container, options) {
  const carousel = container.querySelector('.carousel');

  const flkty = new Flickity(carousel, {
    ...options
  });

  const carouselStatus = container.querySelector('.carousel__carousel-status');
  const flickityBtn = container.querySelector('.previous');
  updateCarouselPages(flkty, carouselStatus, flickityBtn);

  flkty.on('select', () => {
    updateCarouselPages(flkty, carouselStatus, flickityBtn);
  });

  return flkty;
}

function updateCarouselPages (flkty, carouselStatus, flickityBtn) {
  carouselStatus.textContent = `${flkty.selectedIndex + 1}/${flkty.slides.length}`;
  flickityBtn.after(carouselStatus);
}

let childrenSlider = $('.section-our-team__carousel-team .flickity-slider').children();

$(function () {
  $('.navigation__list').on('click', 'a', function (event) {
    const listItem = $(this).attr('href');
    const top = $(listItem).offset().top;
    event.preventDefault();

    $('body,html').animate(
      { scrollTop: top },
      scrollTopAnimationDurationMs
    );
  });
});

$(window).on('load resize', function () {
  setupMarginTop();
  setupInheritWidth();

  if (window.matchMedia('(min-width: 769px)').matches) {
    showGroupingCells();
  } else if (window.matchMedia('(max-width: 768px)').matches) {
    showRegroupingCells();
  }

  $teamCarousel.reloadCells();
  $('.section-our-team .flickity-viewport').outerHeight($('.carousel-cell').outerHeight());
  $('.section-reviews .flickity-viewport').outerHeight($('.review').outerHeight());
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
