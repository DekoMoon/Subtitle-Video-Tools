const topNavHamBtn = document.querySelector('.top-nav__ham-button');
const topNavBtnWrapper = document.querySelector('.top-nav__button-wrapper');

topNavHamBtn.addEventListener('click', () => {
  topNavBtnWrapper.classList.toggle('top-nav__button-wrapper--hidden');
});

topNavBtnWrapper.classList.add('top-nav__button-wrapper--hidden');