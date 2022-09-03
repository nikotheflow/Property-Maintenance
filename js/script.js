document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body'),
    heroBehind = document.querySelector('.hero__image-behind'),
    headerNavbar = document.querySelector('.header__navbar'),
    burgerBtn = document.querySelector('.burger-btn'),
    burgerBtnText = document.querySelector('.burger-btn__text'),
    navbarMenu = document.querySelector('.navbar__menu'),
    dropdownMenu = document.querySelector('.navbar__dropdown'),
    dropdownLinks = document.querySelectorAll('.navbar__dropdown-link');

  let scrollWidth = window.innerWidth - body.clientWidth,
    burgerBtnPaddingRight = parseInt(window.getComputedStyle(burgerBtn).paddingRight);

  window.addEventListener('scroll', function () {
    let scrollValue = window.scrollY;
    heroBehind.style.transform = `translateY(-${scrollValue / 5}px)`;
  });

  window.addEventListener('resize', () => {
    burgerBtn.classList.remove('active');
    navbarMenu.classList.remove('active');
    body.classList.remove('lock');
    burgerBtnText.innerText = 'меню';

    removeScrollPadding();
  });

  setTimeout(() => {
    headerNavbar.style.top = 0;
  }, 500);

  burgerBtn.addEventListener('click', function () {
    burgerBtn.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    body.classList.toggle('lock');

    burgerBtnText.innerText = burgerBtn.classList.contains('active') ? 'закрыть' : 'меню';

    if (body.classList.contains('lock')) {
      body.style.paddingRight = `${scrollWidth}px`;
      burgerBtn.style.paddingRight = `${scrollWidth + burgerBtnPaddingRight}px`;
    } else {
      removeScrollPadding();
    }
  });

  dropdownLinks.forEach((link) =>
    link.addEventListener('click', () => {
      dropdownMenu.classList.toggle('active');
    }),
  );

  console.log(dropdownLinks);

  function removeScrollPadding() {
    body.style.paddingRight = 0;
    burgerBtn.style.paddingRight = `${burgerBtnPaddingRight}px`;
  }
});
