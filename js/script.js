document.addEventListener('DOMContentLoaded', function () {
  let heroBehind = document.querySelector('.hero__image-behind');
  let heroTextBlock = document.querySelector('.hero__text-block');

  window.addEventListener('scroll', function () {
    let scrollValue = window.scrollY;

    // heroTextBlock.style.transform = `translateY(${scrollValue}px)`;
    heroBehind.style.transform = `translateY(-${scrollValue / 5}px)`;
  });
});
