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

if (promoSlider) {
  mobileSliderInit();
  window.addEventListener('resize', () => {
    mobileSliderInit();
  })
}


