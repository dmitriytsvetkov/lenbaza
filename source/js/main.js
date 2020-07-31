var mobileMenu = document.querySelector('.mobile-menu');
var menuToggle = document.querySelector('.mobile-menu__toggle');

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
