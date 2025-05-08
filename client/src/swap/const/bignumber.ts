import BigNumber from 'bignumber.js';


export const ToFixedPipe = (
  number: any,
  decimal: number = -1,
  mode: any = 1,
  format: boolean = false,
) => {
  if (number === '--') {
    return number;
  }
  const target = new BigNumber(number);
  if (target.isNaN() || decimal === null) {
    return '--';
  }
  let result;
  if (decimal === -1) {
    result = target.toFixed();
  } else {
    if (format) {
      result = target.toFormat(decimal, mode);
    } else {
      result = target.toFixed(decimal, mode);
      const bgTemp = new BigNumber(result);
      if (bgTemp.eq(0) && bgTemp.s === -1) {
        return target.multipliedBy(-1).toFixed(decimal, mode);
      } else {
        return result;
      }
    }
  }
  return result;
};
