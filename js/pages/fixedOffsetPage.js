import { componentToMS } from '../modules/componentToMS.js';
import { dropFileInput, dropFileLabel } from '../constant/universalDom.js';
import { fixedOffset } from '../modules/fixedOffset.js';

const submitBtn = document.querySelector('.fo-main__submit-btn');

const inpOneHr = document.querySelector('.fixed-box__hr-input-1');
const inpOneMin = document.querySelector('.fixed-box__min-input-1');
const inpOneSec = document.querySelector('.fixed-box__sec-input-1');
const inpOneMs = document.querySelector('.fixed-box__ms-input-1');

const inpTwoHr = document.querySelector('.fixed-box__hr-input-2');
const inpTwoMin = document.querySelector('.fixed-box__min-input-2');
const inpTwoSec = document.querySelector('.fixed-box__sec-input-2');
const inpTwoMs = document.querySelector('.fixed-box__ms-input-2');


submitBtn.addEventListener('click', function() {
  const file = dropFileInput.files[0];

  // drop-file-box__drop-label--error-animate

  if (!file) {
    dropFileLabel.classList.add('drop-file-box__drop-label--error-animate');

    setTimeout(() => {
      dropFileLabel.classList.remove('drop-file-box__drop-label--error-animate');
    }, 510);
    
    return;
  }

  const startMS = componentToMS(inpOneHr.value, inpOneMin.value, inpOneSec.value, inpOneMs.value);
  const offsetMS = componentToMS(inpTwoHr.value, inpTwoMin.value, inpTwoSec.value, inpTwoMs.value);

  fixedOffset(file, offsetMS, startMS);
});