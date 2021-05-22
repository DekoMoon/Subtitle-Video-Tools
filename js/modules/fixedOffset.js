import { addFixedOffset } from './_addFixedOffset.js';
import { addMSToTimecode } from './_addMSToTimecode.js';
import { createDownloadFile } from './_createDownloadFile.js';
import { objToSrtText, srtTextToObj } from './_convertSrtTextAndObj.js';



export const fixedOffset = async function(file, offset, start = '00:00:00,000') {
  const text = await file.text();
  const objArr = srtTextToObj(text);
  const final = objToSrtText(addFixedOffset(objArr, offset));
  createDownloadFile(final);
}






