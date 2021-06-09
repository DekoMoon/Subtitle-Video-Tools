export function componentArrToMS(compArr) {
  const hr = compArr[0].value;
  const min = compArr[1].value;
  const sec = compArr[2].value;
  const ms = compArr[3].value;
  return (hr * 3600 * 1000) + (min * 60 * 1000) + (sec * 1000) + (+ms);
}