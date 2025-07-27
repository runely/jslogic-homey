export default (num: string | number): string => {
  if (typeof num === 'string' && num.length === 2) {
    return num;
  }

  return Number(num) < 10 ? `0${num}` : num.toString();
};
