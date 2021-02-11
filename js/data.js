import { getIntFromRange, getFloatFromRange } from './random.js';
import { getRandomStringFromMap, getRandomUniqueArrayFromMap, getRandomArrayFromMap } from './array-random.js';

//Согласно ТЗ добавим константу для генерации 10 схожих объявлений
const NEARBY_ADVERTS = 10;
//Ограничим координаты по Х и У согласно ТЗ c указанной точностью
const X_MIN_VALUE = 35.65;
const X_MAX_VALUE = 35.7;
const Y_MIN_VALUE = 139.7;
const Y_MAX_VALUE = 139.8;
const PRECISION = 5;
//Ограничим пределы генерации строк с адресом аватара пользователя
const USER_LOWER_BOUND = 1;
const USER_UPPER_BOUND = 8;
//Зададим ограничение на максимальное положительное число из ТЗ
const MAXIMUM_VALUE = 10000;
//Ограничим длину массива с фото
const MAXIMUM_PHOTO_AMOUNT = 10;
//создадим мапы с типом жилья, временем заезда и выезда, оснащением дома, фото,
//заголовков объявления, описания объявлений
const TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const TITLES = [
  '2-к квартира, 75 м2',
  'Квартира-студия, 31 м2',
  '3-к квартира, 75 м2',
  '1-к квартира, 30 м2',
  'Квартира-студия, 28 м2',
  '1-к квартира, 40 м2',
  '5-к квартира, 225 м2',
  '3-к квартира, 91 м2',
  '1-к квартира, 34 м2'];
const DESCRIPTIONS = [
  'До ЦЕНТРА ГОРОДА 20 минут на метро без пересадок.',
  'У нас ЕСТЬ ГОРЯЧАЯ ВОДА!!!',
  'Квартира оснащена всем необходимым для комфортного проживания',
  'Широкая двуспальная кровать',
  'Раскладная гостевая кровать.'];
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

const createNearbyAdvert = () => {
  const xCoordinate = getFloatFromRange(X_MIN_VALUE, X_MAX_VALUE, PRECISION);
  const yCoordinate = getFloatFromRange(Y_MIN_VALUE, Y_MAX_VALUE, PRECISION);

  return {
    author: {
      avatar: `img/avatars/user0${getIntFromRange(USER_LOWER_BOUND, USER_UPPER_BOUND)}.png`,
    },
    offer: {
      title: getRandomStringFromMap(TITLES),
      address: `${xCoordinate}, ${yCoordinate}`,
      price: getIntFromRange(1, MAXIMUM_VALUE),
      type: getRandomStringFromMap(TYPE_OF_HOUSING),
      rooms: getIntFromRange(1, MAXIMUM_VALUE),
      guests: getIntFromRange(1, MAXIMUM_VALUE),
      checkin: getRandomStringFromMap(CHECKIN_OR_OUT_TIME),
      checkout: getRandomStringFromMap(CHECKIN_OR_OUT_TIME),
      features: getRandomUniqueArrayFromMap(FEATURES_OF_HOUSING),
      description: getRandomStringFromMap(DESCRIPTIONS),
      photos: getRandomArrayFromMap(PHOTOS_OF_HOUSING, MAXIMUM_PHOTO_AMOUNT),
    },
    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  };
};

//Генерация объекта заданного размера
const getAdvertsNearBy = (amount) => {
  return new Array(amount).fill(null).map(() => createNearbyAdvert());
}

const adverts = getAdvertsNearBy(NEARBY_ADVERTS);

export { adverts };
