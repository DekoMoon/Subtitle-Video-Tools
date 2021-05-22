import { msToTimecode } from './_msToTimecode.js';
import { timecodeToMS } from './_timecodeToMS.js';

export const addMSToTimecode = function(timecode, millisec) {
  const ms = timecodeToMS(timecode);
  const msFinal = (+ms) + (+millisec);
  return msToTimecode(msFinal);
};

