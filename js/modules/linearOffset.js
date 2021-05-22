import { createDownloadFile } from './createDownloadFile.js';
import { msToTimecode } from './msToTimecode.js';
import { objToSrtText, srtTextToObj } from './convertSrtTextAndObj.js';
import { timecodeToMS } from './timecodeToMS.js';

import { Decimal } from '../../node_modules/decimal.js/decimal.mjs';

export const linearOffset = async function(file, intP1, curP1, intP2, curP2) {

  intP1 = '00:07:17,570';
  curP1 = '00:07:17,570';

  intP2 = '01:37:38,900';
  curP2 = '01:37:44,795';

  // TODO: Come back later to add error animation when you do scss
  if (!intP1 || !curP1 || !intP2 || !curP2) throw new Error('Must specify points');

  const text = await file.text();
  const objArr = srtTextToObj(text);
  const objPtsInMS = {
    intP1: timecodeToMS(intP1),
    intP2: timecodeToMS(intP2), 
    curP1: timecodeToMS(curP1),
    curP2: timecodeToMS(curP2)
  };

  const final = objToSrtText(linCalc(objPtsInMS, objArr));
  createDownloadFile(final);
};





function linCalc(objPtsInMS, textObjArr) {
  const coeffObj = linCoeffFunc(objPtsInMS);

  return textObjArr.map((txtObj) => {

    // TODO: Point 1 should not change in ms if there is 0 fixed change... bug :(

    const start = timecodeToMS(txtObj.start) + coeffObj.fixedOffset;
    const end = timecodeToMS(txtObj.end) + coeffObj.fixedOffset;

    const minusStart = coeffObj.driftCoeff.times(start - objPtsInMS.intP1).floor().toPrecision();
    const minusEnd = coeffObj.driftCoeff.times(end - objPtsInMS.intP1).floor().toPrecision();

    const newStart = msToTimecode(start + (+minusStart));
    const newEnd = msToTimecode(end + (+minusEnd));

    return {
      start: newStart,
      end: newEnd,
      sentence: txtObj.sentence
    };
  });
}





function linCoeffFunc({ intP1, curP1, intP2, curP2 }) {
  const fixedOffset = intP1 - curP1;
  const trueCurP2 = curP2 + fixedOffset;
  const diffP2 = intP2 - trueCurP2;
  const driftCoeff = new Decimal(diffP2).dividedBy(intP2);
  return {
    driftCoeff,
    fixedOffset
  };
}