import { addMSToTimecode } from './addMSToTimecode.js';
import { timecodeToMS } from './timecodeToMS.js';

export function addFixedOffsetToCapArr(capArr, offsetMS = 0, startMS = 0) {
  return capArr.map((capObj) => {
    if (timecodeToMS(capObj.start) < startMS) return capObj;

    const start = addMSToTimecode(capObj.start, offsetMS); 
    const end = addMSToTimecode(capObj.end, offsetMS);

    return { start, end, sentence: capObj.sentence };
  });
}