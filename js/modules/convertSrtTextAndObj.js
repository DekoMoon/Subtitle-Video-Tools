export const srtTextToObj = function(text) {
  const regex = /(^|\n)\d+\n/g;
  const textArr = text
    .split(regex)
    .filter(line => line.length !== 1 && line.length !== 0);

  return convertToObj(textArr);
};

function convertToObj(textArr) {
  return textArr.map((line) => {
    const indexOfBackspace = line.indexOf('\n');
    const timecode = line.substring(0, indexOfBackspace);
    const sentence = line.substring(indexOfBackspace + 1);
    const startEnd = timecode.split(' --> ');

    return {
      start: startEnd[0],
      end: startEnd[1],
      sentence
    }
  });
}


/*
  33
  00:02:56,080 --> 00:02:57,340
  Ahh I can't take it anymore...

  34
  00:02:59,200 --> 00:03:02,110
  Ahhhhhh
*/



export const objToSrtText = function(arr) {
  return arr.reduce((acc, obj, i) => {
    const add = `${i + 1}\n${obj.start} --> ${obj.end}\n${obj.sentence}\n`;
    return acc + add;
  }, '');
}
