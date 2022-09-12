document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body'),
    heroTextBlock = document.querySelector('.hero__text-block'),
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
    popupSuccessState = document.querySelector('.popup__wrapper-success'),
    tickerRowContainers = document.querySelectorAll('.footer__ticker-row-container'),
    tickersSection = document.querySelector('.footer__tickers'),
    tickersBtn = document.querySelector('.footer__tickers-btn');

  let scrollWidth = window.innerWidth - body.clientWidth,
    burgerBtnPaddingRight = parseInt(window.getComputedStyle(burgerBtn).paddingRight);
  let previousScrollY = 0;
  let scrollDirection = 'down';

  window.addEventListener('scroll', function () {
    let scrollValue = window.scrollY;
    heroBehind.style.transform = `translateY(-${scrollValue / 5}px)`;

    getScrollDirection();
    setTickerDirection();

    scrollValue > window.innerHeight * 2
      ? heroTextBlock.classList.remove('visible')
      : heroTextBlock.classList.add('visible');
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
  contactBtn.addEventListener('click', clickContactBtn);
  tickersBtn.addEventListener('click', clickContactBtn);

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

  popupFormBtn.addEventListener('click', (e) => {
    e.preventDefault();

    popupSuccessState.classList.add('active');
    popupFormState.classList.remove('active');
  });

  popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('active');

    if (body.clientWidth >= 992) {
      body.classList.remove('lock');
      removeScrollPadding();
    }
  });

  popupReturnBtn.addEventListener('click', () => {
    popup.classList.remove('active');

    if (body.clientWidth < 991.98) {
      clickBurgerBtn();
    }

    body.classList.remove('lock');
    removeScrollPadding();
  });

  tickersSection.addEventListener('mousemove', (e) => {
    let tickersY = tickersSection.getBoundingClientRect().y;

    tickersBtn.style.left = `${e.clientX}px`;
    tickersBtn.style.top = `${e.clientY - tickersY}px`;
  });

  function clickBurgerBtn() {
    dropdownLinks.forEach((link) => link.classList.remove('active'));

    burgerBtn.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    body.classList.toggle('lock');

    burgerBtnText.innerText = burgerBtn.classList.contains('active') ? 'закрыть' : 'меню';

    if (body.classList.contains('lock')) {
      addScrollPadding();
    } else {
      removeScrollPadding();
    }
  }

  function clickContactBtn() {
    body.classList.add('lock');
    addScrollPadding();

    popup.classList.toggle('active');

    popupFormState.classList.add('active');
    popupSuccessState.classList.remove('active');
  }

  function addScrollPadding() {
    body.style.paddingRight = `${scrollWidth}px`;
    burgerBtn.style.paddingRight = `${scrollWidth + burgerBtnPaddingRight}px`;
  }

  function removeScrollPadding() {
    body.style.paddingRight = 0;
    burgerBtn.style.paddingRight = `${burgerBtnPaddingRight}px`;
  }

  function getScrollDirection() {
    let currentScrollY = window.scrollY;

    if (currentScrollY > previousScrollY) {
      if (scrollDirection !== 'down') {
        scrollDirection = 'down';
      }
    } else {
      if (scrollDirection !== 'up') {
        scrollDirection = 'up';
      }
    }

    previousScrollY = window.scrollY;
  }

  function setTickerDirection() {
    if (scrollDirection === 'down') {
      Array.from(tickerRowContainers).forEach(
        (container) => (container.style.animationPlayState = 'paused'),
      );
    } else {
      Array.from(tickerRowContainers).forEach(
        (container) => (container.style.animationPlayState = 'running'),
      );
    }
  }
});
