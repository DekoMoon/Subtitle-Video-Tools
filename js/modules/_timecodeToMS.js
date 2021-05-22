export const timecodeToMS = function(timecode) {
  return timecode.split(/:|,/g).reduce((acc, el, i) => {
    if (i === 3) return (acc * 1000) + Number(el);
    else return acc + (el * 60 ** (2 - i));
  }, 0);
};