import { dropFileInput, dropFileLabel } from '../constant/universalDom.js';

// import { ffprobe } from '../../node_modules/ffprobe-client/index.js';

const submitBtn = document.querySelector('.va-main__submit-btn');


submitBtn.addEventListener('click', function() {
  const file = dropFileInput.files[0];

  // ffprobe();

  if (!file) {
    dropFileLabel.classList.add('drop-file-box__drop-label--error-animate');

    setTimeout(() => {
      dropFileLabel.classList.remove('drop-file-box__drop-label--error-animate');
    }, 510);
    
    return;
  }
});