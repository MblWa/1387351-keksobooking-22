import { getIntFromRange } from './random.js';

//Случайное значение из массива
const getRandomStringFromMap = (array) => {
  return array[getIntFromRange(0, array.length - 1)];
}

//Перемешивание массива методом Дурштенфельда
const shuffleArray = (array) => {
  const arrayForWork = array.slice();

  for (let i = arrayForWork.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayForWork[i], arrayForWork[j]] = [arrayForWork[j], arrayForWork[i]];
  }

  return arrayForWork;
};

//Получение массива из уникального набора элементов случайной длины
const getRandomUniqueArrayFromMap = (array) => {
  const lowerBound = getIntFromRange(0, array.length / 2);
  const upperBound = getIntFromRange(array.length / 2 + 1, array.length);

  return shuffleArray(array).slice(lowerBound, upperBound);
}

//Получение массива строк случайной длины из набора повторяющихся элементов
const getRandomArrayFromMap = (array, maximum) => {
  const arraySize = getIntFromRange(1, maximum);
  let result = new Array(arraySize).fill(null);

  return result.map(() => array[getIntFromRange(0, array.length - 1)]);
}

export { getRandomStringFromMap, getRandomUniqueArrayFromMap, getRandomArrayFromMap };
