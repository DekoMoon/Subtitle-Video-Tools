export function componentToMS(hr, min, sec, ms) {
  return (hr * 3600 * 1000) + (min * 60 * 1000) + (sec * 1000) + (+ms);
}