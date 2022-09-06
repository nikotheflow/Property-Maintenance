document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body'),
    heroBehind = document.querySelector('.hero__image-behind'),
    headerNavbar = document.querySelector('.header__navbar'),
    burgerBtn = document.querySelector('.btn-burger'),
    burgerBtnText = document.querySelector('.btn-burger__text'),
    contactBtn = document.querySelector('.navbar__btn-contact'),
    navbarMenu = document.querySelector('.navbar__menu'),
    dropdownLinks = document.querySelectorAll('.navbar__item[data-link="dropdown"]'),
    popup = document.querySelector('.popup'),
    popupFormBtn = document.querySelector('.popup__form-btn'),
    popupCloseBtn = document.querySelector('.navbar__btn-close'),
    popupReturnBtn = document.querySelector('.popup__return-btn'),
    popupFormState = document.querySelector('.popup__wrapper-form'),
    popupSuccessState = document.querySelector('.popup__wrapper-success');

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

  burgerBtn.addEventListener('click', clickBurgerBtn);

  dropdownLinks.forEach((link) =>
    link.addEventListener('click', () => {
      if (body.clientWidth < 991.98) {
        Array.from(dropdownLinks)
          .filter((filterLink) => filterLink !== link)
          .forEach((link) => link.classList.remove('active'));

        link.classList.toggle('active');
      }
    }),
  );

  contactBtn.addEventListener('click', () => {
    popup.classList.toggle('active');

    popupFormState.classList.add('active');
    popupSuccessState.classList.remove('active');
  });

  popupFormBtn.addEventListener('click', (e) => {
    e.preventDefault();

    popupSuccessState.classList.add('active');
    popupFormState.classList.remove('active');
  });

  popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  popupReturnBtn.addEventListener('click', () => {
    popup.classList.remove('active');

    if (body.clientWidth < 991.98) {
      clickBurgerBtn();
    }
  });

  function clickBurgerBtn() {
    dropdownLinks.forEach((link) => link.classList.remove('active'));

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
  }

  function removeScrollPadding() {
    body.style.paddingRight = 0;
    burgerBtn.style.paddingRight = `${burgerBtnPaddingRight}px`;
  }
});
