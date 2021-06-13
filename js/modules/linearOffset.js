import { addFixedOffsetToCapArr } from './addFixedOffsetToCapArr.js';
import { createDownloadFile } from './createDownloadFile.js';
import { capArrToSrtText, srtTextToCapArr } from './convertSrtTextAndCapArr.js';
import { msToTimecode } from './msToTimecode.js';
import { timecodeToMS } from './timecodeToMS.js';

import { Decimal } from '../../node_modules/decimal.js/decimal.mjs';

import 'regenerator-runtime/runtime'

export const linearOffset = async function(file, intP1MS = 0, curP1MS = 0, intP2MS = 0, curP2MS = 0) {
  // TODO: Make it more accurate next time by separating the timecode by 10 minutes each

  const text = await file.text();
  const objArr = srtTextToCapArr(text);
  const objPtsMS = { intP1MS, curP1MS, intP2MS, curP2MS };

  const final = capArrToSrtText(linCalc(objPtsMS, objArr));

  createDownloadFile(final);
};




function linCalc(objPtsMS, capArr) {
  const coeffObj = linCoeffFunc(objPtsMS);

  const addedFixed = addFixedOffsetToCapArr(capArr, coeffObj.fixedOffset);
  console.log(capArr);

  // TODO: How about adding startMS and endMS to txtObj
  const addedLinear = addedFixed.map((cap) => {
    const startMS = timecodeToMS(cap.start);
    const endMS = timecodeToMS(cap.end);
    if (startMS <= objPtsMS.intP1MS) {
      return {
        start: msToTimecode(startMS),
        end: msToTimecode(endMS),
        sentence: cap.sentence
      };
    }
    
    const minusStart = coeffObj.driftCoeff
      .times(startMS - objPtsMS.intP1MS)
      .floor()
      .toPrecision();

    const minusEnd = coeffObj.driftCoeff
      .times(endMS - objPtsMS.intP1MS)
      .floor()
      .toPrecision();

      // TODO: cap.start and cap.end is not in ms plus name should be caption
    return {
      start: msToTimecode(startMS + (+minusStart ?? 0)),
      end: msToTimecode(endMS + (+minusEnd ?? 0)),
      sentence: cap.sentence
    };
  });

  console.log(addedLinear);
  return addedLinear;
}





function linCoeffFunc({ intP1MS, curP1MS, intP2MS, curP2MS }) {
  // linear is relative to 00:00:00,000.........
  const fixedOffset = intP1MS - curP1MS;
  const trueCurP2 = curP2MS + fixedOffset;
  
  const diffP2 = intP2MS - trueCurP2;

  const driftCoeff = new Decimal(diffP2).dividedBy(intP2MS - intP1MS);
  return {
    driftCoeff: driftCoeff.d ? driftCoeff : new Decimal(0),
    fixedOffset,
  };
}

