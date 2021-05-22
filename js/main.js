import { fixedOffset } from './modules/fixedOffset.js';
import { linearOffset } from './modules/linearOffset.js';

/********
* Constants
*********/


const combinedBtns = document.querySelector('.combined-btns');
const subSyncBtn = document.querySelector('.combined-btns__left');
const vidAnalBtn = document.querySelector('.combined-btns__right');
const subSyncCont = document.querySelector('.sub-container');
const vidAnalCont = document.querySelector('.vid-anal-container');

const syncSelect = document.querySelector('.sub-container__sync-select');
const fixedMenu = document.querySelector('.fixed-menu');
const linearMenu = document.querySelector('.linear-menu');

const dropFileInput = document.querySelector('.drop-file-container__drop-file-input');

const fixedSubmitBtn = document.querySelector('.fixed-menu__submit-btn');
const linearSubmitBtn = document.querySelector('.linear-menu__submit-btn');

const fixedStartInput = document.querySelector('.fixed-menu__start-input');
const fixedOffsetInput = document.querySelector('.fixed-menu__offset-input');

const linearC1Intended = document.querySelector('.linear-menu__caption-1-intended');
const linearC1Current = document.querySelector('.linear-menu__caption-1-current');
const linearC2Intended = document.querySelector('.linear-menu__caption-2-intended');
const linearC2Current = document.querySelector('.linear-menu__caption-2-current');





/********
* Select Tool
*********/

combinedBtns.addEventListener('click', function(e) {
  const element = e.target;
  if (element.type != 'submit') return;

  if (element === subSyncBtn) {
    if (subSyncBtn.classList.contains('combined-btns__left--selected')) return;
    subSyncBtn.classList.add('combined-btns__left--selected');
    vidAnalBtn.classList.remove('combined-btns__right--selected');
    subSyncCont.classList.remove('sub-container--hidden');
    vidAnalCont.classList.add('vid-anal-container--hidden');
    return;
  }

  if (vidAnalBtn.classList.contains('combined-btns__right--selected')) return;
  subSyncBtn.classList.remove('combined-btns__left--selected');
  vidAnalBtn.classList.add('combined-btns__right--selected');
  subSyncCont.classList.add('sub-container--hidden');
  vidAnalCont.classList.remove('vid-anal-container--hidden');
});

syncSelect.addEventListener('change', function() {
  if (this.value === 'fixed') {
    fixedMenu.classList.remove('fixed-menu--hidden');
    linearMenu.classList.add('linear-menu--hidden');
    return;
  }

  fixedMenu.classList.add('fixed-menu--hidden');
  linearMenu.classList.remove('linear-menu--hidden');
});






/********
* Subtitles
*********/

fixedSubmitBtn.addEventListener('click', function() {
  if (!dropFileInput.value) return;

  const file = dropFileInput.files[0];
  const start = fixedStartInput.value;
  const offset = fixedOffsetInput.value;

  fixedOffset(file, offset, start);
});

linearSubmitBtn.addEventListener('click', function() {
  if (!dropFileInput.value) return;

  const file = dropFileInput.files[0];

  linearOffset(
    dropFileInput.files[0], 
    linearC1Intended.value, 
    linearC1Current.value, 
    linearC2Intended.value, 
    linearC2Current.value
  );
});





/********
* Video
*********/

