import { addMSToTimecode } from './addMSToTimecode.js';
import { createDownloadFile } from './createDownloadFile.js';
import { objToSrtText, srtTextToObj } from './convertSrtTextAndObj.js';



export const fixedOffset = async function(file, offset, start = '00:00:00,000') {
  const text = await file.text();
  const objArr = srtTextToObj(text);
  const final = objToSrtText(addOffset(objArr, offset));
  createDownloadFile(final);
}


function addOffset(objArr = [], amount) {
  return objArr.map((obj) => {
    const start = addMSToTimecode(obj.start, amount); 
    const end = addMSToTimecode(obj.end, amount);
    return { start, end, sentence: obj.sentence };
  });
}






