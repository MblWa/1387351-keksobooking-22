import {
  getIntFromRange,
  getFloatFromRange
} from './random.js';
import {
  getRandomElementFromArray,
  getRandomSubsetFromArray,
  getRandomNonUniqueSubsetFromArray
} from './array-utils.js';

//Функция по склонению существительных во множественном числе от tomfun
//https://gist.github.com/tomfun/830fa6d8030d16007bbab50a5b21ef97
const getNoun = (number, one, two, five) => {
  let n = Math.abs(number);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;
  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
}

export {
  getIntFromRange,
  getFloatFromRange,
  getRandomElementFromArray,
  getRandomSubsetFromArray,
  getRandomNonUniqueSubsetFromArray,
  getNoun
};
