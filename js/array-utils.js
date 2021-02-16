import { getIntFromRange } from './util.js';

const getRandomElementFromArray = (array) => {
  return array[getIntFromRange(0, array.length - 1)];
}
export { getRandomElementFromArray };

//Перемешивание массива методом Дурштенфельда
const shuffleArray = (array) => {
  const arrayShallowCopy = array.slice();

  for (let i = arrayShallowCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayShallowCopy[i], arrayShallowCopy[j]] = [arrayShallowCopy[j], arrayShallowCopy[i]];
  }

  return arrayShallowCopy;
};

//Получение массива из уникального набора элементов случайной длины
const getRandomSubsetFromArray = (array) => {
  const lowerBound = getIntFromRange(0, array.length / 2);
  const upperBound = getIntFromRange(array.length / 2 + 1, array.length);

  return shuffleArray(array).slice(lowerBound, upperBound);
}
export { getRandomSubsetFromArray };

//Получение массива строк случайной длины из набора повторяющихся элементов
const getRandomNonUniqueSubsetFromArray = (array, maximum) => {
  if (array.length == 0) {
    return [];
  }

  const arraySize = getIntFromRange(1, maximum);
  let result = new Array(arraySize).fill(null);

  return result.map(() => array[getIntFromRange(0, array.length - 1)]);
}

export { getRandomNonUniqueSubsetFromArray };
