import {
  dropFileInput,
  droppedFileName
} from '../constant/universalDom.js';

dropFileInput.addEventListener('input', function(e) {
  const fileName = dropFileInput.value.replace('C:\\fakepath\\', '');
  if (!fileName) return;

  let str = fileName;

  if (fileName.length > 20) {
    const firstHalf = fileName.slice(0, 10);
    const secondHalf = fileName.slice(fileName.length - 10);

    str = `${firstHalf}...${secondHalf}`;
  }

  droppedFileName.classList.remove('drop-file-box__file-name--hidden');
  droppedFileName.textContent = str;
});