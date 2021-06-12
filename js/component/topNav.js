const topNavHamBtn = document.querySelector('.top-nav__ham-button');
const topNavBtnWrapper = document.querySelector('.top-nav__button-wrapper');

const searchBar = document.querySelector('.search-bar');
const searchBarInp = document.querySelector('.search-bar__search-input');
const searchBarBtn = document.querySelector('.search-bar__search-button');
const searchBarItems = document.querySelector('.search-bar__items');

const tools = [
  [ 'fixed offset', '/html/fixed-offset.html' ], 
  [ 'linear offset', '/html/linear-offset.html' ], 
  [ 'video analysis', '/html/video-analysis.html' ]
];

/*

<li class="search-bar__item">
  <a href="" class="search-bar__link button-6">Fixed Offset</a>
</li>

*/


topNavHamBtn.addEventListener('click', () => {
  topNavBtnWrapper.classList.toggle('top-nav__button-wrapper--hidden');
});

topNavBtnWrapper.classList.add('top-nav__button-wrapper--hidden');


searchBarInp.addEventListener('focus', (e) => {
  searchBarItems.classList.remove('search-bar__items--hidden');
});

searchBarInp.addEventListener('input', (e) => {
  const txt = e.target.value.toLowerCase();
  const regex = new RegExp(txt, 'g');

  searchBarItems.innerHTML = '';

  for (let i = 0; i < tools.length; i++) {
    const toolName = tools[i][0].toLowerCase();
    const matched = toolName.match(regex);
    if (matched == null) continue;


    const capitalized = toolName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const html = `
    <li class="search-bar__item">
      <a href="${tools[i][1]}" class="search-bar__link button-6">${capitalized}</a>
    </li>
    `;

    console.log(html);

    searchBarItems.insertAdjacentHTML("beforeend", html);
  }
});

document.body.addEventListener('click', (e) => {
  const path = e.path;

  for (let i = 0; i < path.length; i++) {
    if (path[i] === searchBar) return;
  }

  searchBarItems.classList.add('search-bar__items--hidden');
});

