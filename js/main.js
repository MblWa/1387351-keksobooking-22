//Согласно ТЗ добавим константу для генерации 10 схожих объявлений
const NEARBY_ADVERTS = 10;
//Зададим ограничение на максимальное положительное число из ТЗ
const MAXIMUM_VALUE = 10000;
//Ограничим длину массива с фото
const MAXIMUM_PHOTO_AMOUNT = 10;
//создадим мапы с типом жилья, временем заезда и выезда, оснащением дома, фото
const TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_OR_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_OF_HOUSING = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
const PHOTOS_OF_HOUSING = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

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
const getRandomArrayFromMap = (array) => {
  let arraySize = getIntFromRange(1, MAXIMUM_PHOTO_AMOUNT);
  let result = new Array(arraySize).fill(null);

  return result.map(() => array[getIntFromRange(0, array.length - 1)]);
}

const createNearbyAdverts = () => {
  const xCoordinate = getFloatFromRange(35.65, 35.7, 5);
  const yCoordinate = getFloatFromRange(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user0${getIntFromRange(1, 8)}.png`,
    },
    offer: {
      title: 'Заголовок предложения. Придумайте самостоятельно',
      address: `${xCoordinate}, ${yCoordinate}`,
      price: getIntFromRange(1, MAXIMUM_VALUE),
      type: getRandomStringFromMap(TYPE_OF_HOUSING),
      rooms: getIntFromRange(1, MAXIMUM_VALUE),
      guests: getIntFromRange(1, MAXIMUM_VALUE),
      checkin: getRandomStringFromMap(CHECKIN_OR_OUT_TIME),
      checkout: getRandomStringFromMap(CHECKIN_OR_OUT_TIME),
      features: getRandomUniqueArrayFromMap(FEATURES_OF_HOUSING),
      description: 'Описание помещения. Придумайте самостоятельно.',
      photos: getRandomArrayFromMap(PHOTOS_OF_HOUSING),
    },
    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  };
};

//Генерация целых чисел из диапазона положительных чисел включительно.
//Т.к. в ТЗ не прописано, поступают ли на вход целочисленные значения границ диапазона,
//то будем округлять их до целого значения, даже если придут с плавающей точкой.

const getIntFromRange = (min, max) => {
  let randomNumber = undefined;
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  if (min === max) {
    randomNumber = min;
  }

  if (min >= 0 && max >= 0) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return randomNumber;
}

//Реализация функции под Кексобукинг с числами с плавающей точкой.
//Т.к. Math.random оперирует числами в диапазоне [0, 1), исключая единицу,
//придётся включать данную границу за счет округления и увеличения на
//машинный эпсилон, что позволяет включить единицу.

const getFloatFromRange = (min, max, digits) => {
  let randomNumber = undefined;

  digits = (digits > 5) ? 5 : digits;

  if (max < min) {
    let buffer = max;
    max = min;
    min = buffer;
  }

  if (min === max) {
    randomNumber = min;
  }

  if (min >= 0 && max >= 0) {
    randomNumber = Math.round((Math.random() * (max - min) + min + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  return randomNumber;
}

let adverts = new Array(NEARBY_ADVERTS).fill(null).map(() => createNearbyAdverts());

alert(adverts.length);
