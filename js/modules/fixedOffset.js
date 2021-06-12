import { addFixedOffsetToCapArr } from './addFixedOffsetToCapArr.js';
import { createDownloadFile } from './createDownloadFile.js';
import { capArrToSrtText, srtTextToCapArr } from './convertSrtTextAndCapArr.js';



export const fixedOffset = async function(file, offsetMS = 0, startMS = 0) {
  const text = await file.text();
  const capArr = srtTextToCapArr(text);
  const finalCapArr = addFixedOffsetToCapArr(capArr, offsetMS, startMS);

  const final = capArrToSrtText(finalCapArr);
  createDownloadFile(final);
}






