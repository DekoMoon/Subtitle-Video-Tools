const topNavHamBtn = document.querySelector('.top-nav__ham-button');
const topNavBtnWrapper = document.querySelector('.top-nav__button-wrapper');

const searchBar = document.querySelector('.search-bar');
const searchBarInp = document.querySelector('.search-bar__search-input');
const searchBarBtn = document.querySelector('.search-bar__search-button');
const searchBarItems = document.querySelector('.search-bar__items');

const toolsName = ['fixed offset', 'linear offset', 'video analysis'];

/*

<li class="search-bar__item">
  <a href="" class="search-bar__link button-6">Fixed Offset</a>
</li>

*/


topNavHamBtn.addEventListener('click', () => {
  topNavBtnWrapper.classList.toggle('top-nav__button-wrapper--hidden');
});

topNavBtnWrapper.classList.add('top-nav__button-wrapper--hidden');


searchBarInp.addEventListener('input', (e) => {
  const value = e.target.value;
});

document.body.addEventListener('click', (e) => {
  const target = e.target;

  // TODO: Too wordy, find a way to reduce the amount. Especially for li and a
  // switch (target) {
  //   case searchBarInp:
  //   case searchBarBtn:
  //   case searchBarItems:
  //   case searchBarItem:
  //     case searchBar
  // }
})

