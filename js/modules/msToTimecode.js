// Milliseconds should not contain decimals

export function msToTimecode(ms) {
	const timeArr = msToTimeArr(ms).reduce((acc, el, i) => {
    const elLength = el.toString().length;
    // const digits = (i === 0) ? 3 : 0;
    if (i === 0) acc[3] = addZeroes(el, elLength, 3);
    else acc[3 - i] = addZeroes(el, elLength, 2);
    
    return acc;
  }, new Array(4));
  
  return timeArr.join(':').replace(/.(?=...$)/, ',');
}











function addZeroes(el, curLength, desLength) {
	return (curLength === desLength) ? el : '0'.repeat(desLength - curLength) + el;
}

function msToTimeArr(ms, i = 3, arr = new Array(4)) {
	const multiplier = (60 ** (i - 1)) * (1000);
  const remainer = ms % multiplier;

  // console.log(ms, multiplier);
	
  if (i === 0) {
    arr[i] = ms;
		return arr;
  }
  else if (remainer === 0) {
    arr[i] = ms / multiplier;
    return msToTimeArr(0, i - 1, arr);
  }
	else if (ms < multiplier) {
    arr[i] = 0;
    return msToTimeArr(ms, i - 1, arr);
  }
  else if (ms > multiplier) {
    arr[i] = (ms - remainer) / multiplier;
    return msToTimeArr(remainer, i - 1, arr);
  }
  
  throw 'Wrong';
}