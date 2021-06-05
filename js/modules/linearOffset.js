import { addFixedOffset } from './_addFixedOffset.js';
import { createDownloadFile } from './_createDownloadFile.js';
import { msToTimecode } from './_msToTimecode.js';
import { objToSrtText, srtTextToObj } from './_convertSrtTextAndObj.js';
import { timecodeToMS } from './_timecodeToMS.js';

import { Decimal } from '../../node_modules/decimal.js/decimal.mjs';

export const linearOffset = async function(file, intP1, curP1, intP2, curP2) {

  intP1 = '00:07:17,570';
  curP1 = '00:07:17,570';

  intP2 = '01:37:39,380';
  curP2 = '01:37:44,770';

  // TODO: Come back later to add error animation when you do scss
  // TODO: Make it more accurate next time by separating the timecode by 30 minutes each
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

  const addedFixed = addFixedOffset(textObjArr, coeffObj.fixedOffset);

  const addedLinear = addedFixed.map((txtObj) => {
    if (txtObj.start <= objPtsInMS.intP1) {
      return {
        start: msToTimecode(txtObj.start),
        end: msToTimecode(txtObj.end),
        sentence: txtObj.sentence
      };
    }
    
    const minusStart = coeffObj.driftCoeff
      .times(txtObj.start - objPtsInMS.intP1)
      .floor()
      .toPrecision();

    const minusEnd = coeffObj.driftCoeff
      .times(txtObj.end - objPtsInMS.intP1)
      .floor()
      .toPrecision();

    return {
      start: msToTimecode(txtObj.start + (+minusStart)),
      end: msToTimecode(txtObj.end + (+minusEnd)),
      sentence: txtObj.sentence
    };
  });

  console.log(addedLinear);
  return addedLinear;
}





function linCoeffFunc({ intP1, curP1, intP2, curP2 }) {
  // linear is relative to 00:00:00,000.........
  const fixedOffset = intP1 - curP1;
  const trueCurP2 = curP2 + fixedOffset;
  
  const diffP2 = intP2 - trueCurP2;

  const driftCoeff = new Decimal(diffP2).dividedBy(intP2 - intP1);

  console.log(driftCoeff.toPrecision());
  return {
    driftCoeff,
    fixedOffset,
  };
}

