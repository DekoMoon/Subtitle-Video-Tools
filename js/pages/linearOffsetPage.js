// import { componentToMS } from '../modules/componentToMS.js';
import { dropFileInput, dropFileLabel } from '../constant/universalDom.js';
import { componentArrToMS } from '../modules/componentArrToMS.js';

const submitBtn = document.querySelector('.lo-main__submit-btn');

const intendedInputsOne = document.querySelectorAll('.linear-box__input-intended-wrapper-1 input');
const currentInputsOne = document.querySelectorAll('.linear-box__input-current-wrapper-1 > input');

const intendedInputsTwo = document.querySelectorAll('.linear-box__input-intended-wrapper-2 > input');
const currentInputsTwo = document.querySelectorAll('.linear-box__input-current-wrapper-2 > input');




submitBtn.addEventListener('click', function() {
  const file = dropFileInput.files[0];

  if (!file) {
    dropFileLabel.classList.add('drop-file-box__drop-label--error-animate');

    setTimeout(() => {
      dropFileLabel.classList.remove('drop-file-box__drop-label--error-animate');
    }, 510);
    
    return;
  }

  const intendedOneMS = componentArrToMS(intendedInputsOne);
  const currentOneMS = componentArrToMS(currentInputsOne);

  const intendedTwoMS = componentArrToMS(intendedInputsTwo);
  const currentTwoMS = componentArrToMS(currentInputsTwo);

  // TODO: Got the ms... time to do the formula bois

});