export function addFixedOffset(objArr = [], amount) {
  return objArr.map((obj) => {
    const start = addMSToTimecode(obj.start, amount); 
    const end = addMSToTimecode(obj.end, amount);
    return { start, end, sentence: obj.sentence };
  });
}