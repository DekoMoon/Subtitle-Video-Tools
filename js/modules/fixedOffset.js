import { addMSToTimecode } from './addMSToTimecode.js';
import { createDownloadFile } from './createDownloadFile.js';
import { capArrToSrtText, srtTextToCapArr } from './convertSrtTextAndCapArr.js';
import { timecodeToMS } from './timecodeToMS.js';



export const fixedOffset = async function(file, offsetMS = 0, startMS = 0) {
  const text = await file.text();
  const capArr = srtTextToCapArr(text);
  const finalCapArr = capArr.map((capObj) => {
    if (timecodeToMS(capObj.start) < startMS) return capObj;

    const start = addMSToTimecode(capObj.start, offsetMS); 
    const end = addMSToTimecode(capObj.end, offsetMS);

    return { start, end, sentence: capObj.sentence };
  });

  const final = capArrToSrtText(finalCapArr);
  createDownloadFile(final);
}






