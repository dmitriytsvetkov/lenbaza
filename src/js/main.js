"use strict";


import Swiper from './vendor/swiper-bundle.min.js';
import './_vars';

/*const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.mobile-menu__toggle');
const catalogMenu = document.querySelector('.catalog-menu');
const catalogMenuToggle = document.querySelector('.page-header__catalog-btn');
const mainNav = document.querySelector('.main-nav');
const catalogMenuItems = document.querySelectorAll('.catalog-menu__list .catalog-menu__item');*/
/*const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
const windowWidth = window.innerWidth - getScrollbarWidth();*/


/*
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

  if (mobileMenu.classList.contains('mobile-menu--opened')) {
    mobileMenu.classList.remove('mobile-menu--opened');
    mobileMenu.classList.add('mobile-menu--closed');
  }
}

if (menuToggle) {
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
}

if (catalogMenuToggle) {
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
}*/

/*if (catalogMenu) {
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
}*/
document.addEventListener('DOMContentLoaded', () => {

  const promoSlider = document.querySelector('.promo__slider-container');
  const controlButtons = document.querySelectorAll('.catalog__control-btn');
  const modals = document.querySelectorAll('.modal');

  let mySwiper;

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
      tabsBtn.forEach(el => {
        el.classList.remove('methods__mobile-btn--active')
      });
      document.querySelector(`[data-tabs-path="${path}"]`).classList.add('methods__mobile-btn--active')

      tabsContent.forEach(el => {
        el.classList.remove('methods__item--active')
      });
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

  /* CATALOG MENU */


  const menuButton = document.querySelector('.page-header__catalog-btn');
  const catalogMenu = document.querySelector('.catalog-menu-new');

  menuButton.addEventListener('click', (e) => {
    const subMenuItems = catalogMenu.querySelectorAll('.catalog-menu-new-submenu__item');
    const menuItems = catalogMenu.querySelectorAll('.catalog-menu-new-main-list__item');

    menuItems.forEach((el) => {
      el.classList.remove('catalog-menu-new-main-list__item--active');
    })

    menuItems[0].classList.add('catalog-menu-new-main-list__item--active');

    subMenuItems.forEach((el) => {
      if (el.dataset.index === menuItems[0].dataset.index) {
        el.classList.add('catalog-menu-new-submenu__item--active');
      } else {
        el.classList.remove('catalog-menu-new-submenu__item--active')
      }
    })

    catalogMenu.classList.toggle('catalog-menu-new--active');

    const catalogMenuButtons = catalogMenu.querySelectorAll('.catalog-menu-new-main-list__item');

    catalogMenuButtons.forEach((el, index) => {

      el.addEventListener('click', (e) => {
        const currentButton = e.currentTarget;

        catalogMenuButtons.forEach((el) => {
          if (el !== currentButton) {
            el.classList.remove('catalog-menu-new-main-list__item--active');
          }
        })

        currentButton.classList.add('catalog-menu-new-main-list__item--active');

        subMenuItems.forEach((el) => {
          if (el.dataset.index === currentButton.dataset.index) {
            el.classList.add('catalog-menu-new-submenu__item--active');
          } else {
            el.classList.remove('catalog-menu-new-submenu__item--active')
          }
        })

      })
    })
  })

  document.addEventListener('click', (e) => {
    if (e.target !== menuButton && e.target.closest('.catalog-menu-new') === null) {
      catalogMenu.classList.remove('catalog-menu-new--active');
    }
  })

  /* END CATALOG MENU*/

  /* CATALOG DETAIL SLIDER */

  // Инициализация превью слайдера

  const slidersCount = document.querySelectorAll('.catalog-detail-slider .slider__col .swiper-slide');

  if (slidersCount.length === 1) {
    document.querySelector('.slider__prev').classList.add('btn-hidden');
    document.querySelector('.slider__next').classList.add('btn-hidden');
  }

  const catalogDetailSliderThumbs = new Swiper('.slider__thumbs .swiper-container', { // ищем слайдер превью по селектору
    // задаем параметры
    direction: 'vertical', // вертикальная прокрутка
    slidesPerView: 3, // показывать по 3 превью
    spaceBetween: 24, // расстояние между слайдами
    navigation: { // задаем кнопки навигации
      nextEl: '.slider__next', // кнопка Next
      prevEl: '.slider__prev' // кнопка Prev
    },
    freeMode: true, // при перетаскивании превью ведет себя как при скролле
    breakpoints: { // условия для разных размеров окна браузера
      0: { // при 0px и выше
        direction: 'horizontal', // горизонтальная прокрутка
      },
      768: { // при 768px и выше
        direction: 'vertical', // вертикальная прокрутка
      }
    }
  });
// Инициализация слайдера изображений
  const catalogDetailSliderImages = new Swiper('.slider__images .swiper-container', { // ищем слайдер превью по селектору
    // задаем параметры
    direction: 'vertical', // вертикальная прокрутка
    slidesPerView: 1, // показывать по 1 изображению
    spaceBetween: 32, // расстояние между слайдами
    mousewheel: true, // можно прокручивать изображения колёсиком мыши
    navigation: { // задаем кнопки навигации
      nextEl: '.slider__next', // кнопка Next
      prevEl: '.slider__prev' // кнопка Prev
    },
    grabCursor: true, // менять иконку курсора
    thumbs: { // указываем на превью слайдер
      swiper: catalogDetailSliderThumbs // указываем имя превью слайдера
    },
    breakpoints: { // условия для разных размеров окна браузера
      0: { // при 0px и выше
        direction: 'horizontal', // горизонтальная прокрутка
      },
      768: { // при 768px и выше
        direction: 'vertical', // вертикальная прокрутка
      }
    }
  });

  /* CATALOG DETAIL SLIDER END*/
})




