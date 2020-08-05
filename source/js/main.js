"use strict";

const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.mobile-menu__toggle');

mobileMenu.classList.remove('mobile-menu--nojs');

if (mobileMenu.classList.contains('mobile-menu--opened')) {
  mobileMenu.classList.remove('mobile-menu--opened');
  mobileMenu.classList.add('mobile-menu--closed');
}

menuToggle.addEventListener('click', function () {
  console.log(1)
  if (mobileMenu.classList.contains('mobile-menu--opened')) {
    mobileMenu.classList.remove('mobile-menu--opened');
    mobileMenu.classList.add('mobile-menu--closed');
  } else {
    mobileMenu.classList.remove('mobile-menu--closed');
    mobileMenu.classList.add('mobile-menu--opened');
  }
})

const mySwiper = new Swiper('.banner--slider', {
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
