"use strict";

const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.mobile-menu__toggle');
const catalogMenu = document.querySelector('.catalog-menu');
const catalogMenuToggle = document.querySelector('.page-header__catalog-btn');
const mainNav = document.querySelector('.main-nav');
const catalogBackBtn = document.querySelector('.catalog__btn-back');

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

mobileMenu.classList.remove('mobile-menu--nojs');

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
    e.target.classList.add('catalog-menu__link--opened');
    e.target.closest('.catalog-menu__item').classList.add('catalog-menu__item--opened');
    e.target.closest('.catalog-menu__list').classList.add('catalog-menu__list--active');
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
  },
  breakpoints: {
    1024: {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }*/
})

const promoSlider = new Swiper('.promo__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  containerModifierClass: 'new-swiper',
  /*pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },*/
});

