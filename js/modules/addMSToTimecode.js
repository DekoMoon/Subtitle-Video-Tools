import { msToTimecode } from './msToTimecode.js';
import { timecodeToMS } from './timecodeToMS.js';

export const addMSToTimecode = function(timecode, millisec) {
  const ms = timecodeToMS(timecode);
  const msFinal = (+ms) + (+millisec);
  return msToTimecode(msFinal);
};

