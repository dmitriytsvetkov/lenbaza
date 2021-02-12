import './vendor/focus-visible.min.js';
import Swiper from './vendor/swiper-bundle.min.js';
import './_vars';
import {resizeContent} from './functions/resize';
import {scrollTo} from './functions/smooth-scroll';
import {disableScroll, enableScroll} from './functions/stop-scroll';

//disableScroll(fix) // fix -> class of element with position: fixed
"use strict";

const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.mobile-menu__toggle');
const catalogMenu = document.querySelector('.catalog-menu');
const catalogMenuToggle = document.querySelector('.page-header__catalog-btn');
const mainNav = document.querySelector('.main-nav');
const catalogMenuItems = document.querySelectorAll('.catalog-menu__list .catalog-menu__item');
const promoSlider = document.querySelector('.promo__slider-container');
const controlButtons = document.querySelectorAll('.catalog__control-btn');
const modals = document.querySelectorAll('.modal');


/*const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
const windowWidth = window.innerWidth - getScrollbarWidth();*/

let mySwiper;

const initialMenu = () => {
  if (document.querySelector('.catalog-menu__link--opened')) {
    document.querySelector('.catalog-menu__link--opened').classList.remove('catalog-menu__link--opened');
  }
  if (document.querySelector('.catalog-menu__item--opened')) {
    document.querySelector('.catalog-menu__item--opened').classList.remove('catalog-menu__item--opened');
  }
  if (document.querySelector('.catalog-menu__list--active')) {
    document.querySelector('.catalog-menu__list--active').classList.remove('catalog-menu__list--active');
  }
}

if (mobileMenu) {
  mobileMenu.classList.remove('mobile-menu--nojs');
}

if (mobileMenu.classList.contains('mobile-menu--opened')) {
  mobileMenu.classList.remove('mobile-menu--opened');
  mobileMenu.classList.add('mobile-menu--closed');
}

menuToggle.addEventListener('click', function () {
  if (mobileMenu.classList.contains('mobile-menu--opened')) {
    mobileMenu.classList.remove('mobile-menu--opened');
    mobileMenu.classList.add('mobile-menu--closed');
    catalogMenu.classList.remove('catalog-menu--opened');
    catalogMenu.classList.add('catalog-menu--closed');
  } else {
    mobileMenu.classList.remove('mobile-menu--closed');
    mobileMenu.classList.add('mobile-menu--opened');
    mainNav.classList.remove('main-nav--closed');
  }
})

catalogMenuToggle.addEventListener('click', function () {
  if (catalogMenu.classList.contains('catalog-menu--opened')) {
    catalogMenu.classList.remove('catalog-menu--opened');
    catalogMenu.classList.add('catalog-menu--closed');
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
    initialMenu();
  } else {
    catalogMenu.classList.remove('catalog-menu--closed');
    catalogMenu.classList.add('catalog-menu--opened');
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
    initialMenu();
  }
})

catalogMenu.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('catalog-menu__link--drop')) {
    e.preventDefault();
    initialMenu();
    e.target.classList.add('catalog-menu__link--opened');
    e.target.closest('.catalog-menu__item').classList.add('catalog-menu__item--opened');
    e.target.closest('.catalog-menu__list').classList.add('catalog-menu__list--active');
    // желательно сделать чтобы при клике по открытому элементу меню он закрывался в изначальное состояние
  }

  if (e.target.classList.contains('catalog__btn-back')) {
    e.preventDefault();
    document.querySelector('.catalog-menu__link--opened') ? document.querySelector('.catalog-menu__link--opened').classList.remove('catalog-menu__link--opened') : null;
    document.querySelector('.catalog-menu__item--opened') ? document.querySelector('.catalog-menu__item--opened').classList.remove('catalog-menu__item--opened') : null;
    document.querySelector('.catalog-menu__list--active') ? document.querySelector('.catalog-menu__list--active').classList.remove('catalog-menu__list--active') : null;
  }
})

const bannerSlider = new Swiper('.banner--slider', {
  // Optional parameters
  loop: true,
  slideClass: 'banner__item',
  wrapperClass: 'banner__wrapper',
  spaceBetween: 17,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    modifierClass: 'banner__pagination',
    bulletClass: 'banner__bullet',
    bulletActiveClass: 'banner__bullet--active',
  },
  breakpoints: {
    1024: {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }
})

const multipleSlider = new Swiper('.multiple-slider__container', {
  // Optional parameters
  /*loop: true,*/
  slidesPerView: 2,
  slidesPerColumn: 2,
  spaceBetween: 0,
  slideClass: 'multiple-slider__item',
  wrapperClass: 'multiple-slider__wrapper',

  /*// If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    modifierClass: 'banner__pagination',
    bulletClass: 'banner__bullet',
    bulletActiveClass: 'banner__bullet--active',
  },*/
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      slidesPerColumn: 1,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3.2,
      slidesPerColumn: 1,
      spaceBetween: 25,
    },
    1460: {
      slidesPerView: 4,
      slidesPerColumn: 1,
      spaceBetween: 25,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }
})

const mobileSliderInit = () => {
  if (window.innerWidth < 768 && promoSlider.dataset.mobile === 'false') {
    mySwiper = new Swiper(promoSlider, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      slideClass: 'promo__slider-item',
      wrapperClass: 'promo__slider-wrapper',
    });

    promoSlider.dataset.mobile = 'true';
  }

  if (window.innerWidth >= 768) {
    promoSlider.dataset.mobile = 'false';

    if (promoSlider.classList.contains('swiper-container-initialized')) {
      mySwiper.destroy();
    }
  }
}

controlButtons.forEach((el) => {
  el.addEventListener('click', (e) => {
    const path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('modal--visible')
    })

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    document.body.classList.add('modalEnabled');
  })
})

modals.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (e.target === el.querySelector('.modal__close-btn')) {
      el.classList.remove('modal--visible')
      document.body.classList.remove('modalEnabled');
    }
  })
})

// SLIDER BLOCK
const sliderBlockDOM = document.querySelector('.slider-block');

const sliderBlock = new Swiper(sliderBlockDOM, {
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    // when window width is >= 640px
    768: {
      noSwiping: true
    }
  }
})

const sliderNavItems = document.querySelectorAll('.slider-nav__item');

sliderNavItems.forEach((el, index) => {
  el.addEventListener('click', (e) => {
    const currentIndex = parseInt(e.currentTarget.dataset.index);

    sliderBlock.slideTo(currentIndex);
    e.currentTarget.classList.add('slider-nav__item--active');

    sliderNavItems.forEach((el, index) => { // удаляем класс slider-nav__item---active
      if (index !== currentIndex) {
        el.classList.remove('slider-nav__item--active')
      }
    })
  })
})

if (sliderBlockDOM) {
  const sliderBlockSlides = sliderBlockDOM.querySelectorAll('.swiper-slide');

  if (window.innerWidth < 768 && sliderBlockDOM.dataset.mobile === 'false') {
    sliderBlockDOM.dataset.mobile = 'true';
  }

  if (window.innerWidth >= 768) {
    sliderBlockSlides.forEach((e) => {
      e.classList.add('swiper-no-swiping')
    })

    sliderBlockDOM.dataset.mobile = 'false';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && sliderBlockDOM.dataset.mobile === 'false') {
      sliderBlockSlides.forEach((e) => {
        e.classList.remove('swiper-no-swiping')
      })

      sliderBlockDOM.dataset.mobile = 'true';
    }

    if (window.innerWidth >= 768) {
      sliderBlockSlides.forEach((e) => {
        e.classList.add('swiper-no-swiping')
      })

      sliderBlockDOM.dataset.mobile = 'false';
    }
  })
}

// END SLIDER BLOCK

// ABOUT US SLIDER

const aboutUsSliderDOM = document.querySelector('.about-slider');

if (aboutUsSliderDOM) {
  const aboutUsSlider = new Swiper(aboutUsSliderDOM, {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
}

// END ABOUT IS SLIDER

// DELIVERY & PAYMENT MOBILE BUTTONS

const methods = document.querySelector('.methods');
const tabsBtn = document.querySelectorAll('.methods__mobile-btn');
const tabsContent = document.querySelectorAll('.methods__item');

if (methods) {
  methods.addEventListener('click', (e) => {
    if (e.target.classList.contains('methods__mobile-btn')) {
      const tabsPath = e.target.dataset.tabsPath;
      tabsHandler(tabsPath)
    }
  })
  const tabsHandler = (path) => {
    tabsBtn.forEach(el => { el.classList.remove('methods__mobile-btn--active') });
    document.querySelector(`[data-tabs-path="${path}"]`).classList.add('methods__mobile-btn--active')

    tabsContent.forEach(el => { el.classList.remove('methods__item--active') });
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('methods__item--active')
  }
}

// END DELIVERY & PAYMENT MOBILE BUTTONS

if (promoSlider) {
  mobileSliderInit();
  window.addEventListener('resize', () => {
    mobileSliderInit();
  })
}


