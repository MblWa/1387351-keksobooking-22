import {
  getIntFromRange,
  getFloatFromRange,
  getRandomElementFromArray,
  getRandomSubsetFromArray,
  getRandomNonUniqueSubsetFromArray
} from './util.js';

//Ограничим координаты по Х и У согласно ТЗ c указанной точностью
const MIN_X_COORDINATE_VALUE = 35.65;
const MAX_X_COORDINATE_VALUE = 35.7;
const MIN_Y_COORDINATE_VALUE = 139.7;
const MAX_Y_COORDINATE_VALUE = 139.8;
const GENERATED_COORDINATE_PRECISION = 5;
//Ограничим пределы генерации строк с адресом аватара пользователя
const USER_AVATAR_NUMBER_LOWER_BOUND = 1;
const USER_AVATAR_NUMBER_UPPER_BOUND = 8;
//Зададим ограничение на максимальное положительное число для цены, комнат и гостей
const MAXIMUM_VALUE = 10000;
const MAXIMUM_PHOTO_AMOUNT = 10;
//создадим массивы с типом жилья, временем заезда и выезда, оснащением дома, фото,
//заголовков объявления, описания объявлений
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const HOUSING_TYPES_RU_TRANSLATIONS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
}
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
const HOUSING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
const HOUSING_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createUserAvatarUrl = (minimum, maximum) => {
  return `img/avatars/user0${getIntFromRange(minimum, maximum)}.png`
}

const createNearbyAdvert = () => {
  const xCoordinate = getFloatFromRange(MIN_X_COORDINATE_VALUE, MAX_X_COORDINATE_VALUE, GENERATED_COORDINATE_PRECISION);
  const yCoordinate = getFloatFromRange(MIN_Y_COORDINATE_VALUE, MAX_Y_COORDINATE_VALUE, GENERATED_COORDINATE_PRECISION);

  return {
    author: {
      avatar: createUserAvatarUrl(USER_AVATAR_NUMBER_LOWER_BOUND, USER_AVATAR_NUMBER_UPPER_BOUND),
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: `${xCoordinate}, ${yCoordinate}`,
      price: getIntFromRange(1, MAXIMUM_VALUE),
      type: getRandomElementFromArray(HOUSING_TYPES),
      rooms: getIntFromRange(1, MAXIMUM_VALUE),
      guests: getIntFromRange(1, MAXIMUM_VALUE),
      checkin: getRandomElementFromArray(CHECKIN_OR_OUT_TIME),
      checkout: getRandomElementFromArray(CHECKIN_OR_OUT_TIME),
      features: getRandomSubsetFromArray(HOUSING_FEATURES),
      description: getRandomElementFromArray(DESCRIPTIONS),
      photos: getRandomNonUniqueSubsetFromArray(HOUSING_PHOTOS, MAXIMUM_PHOTO_AMOUNT),
    },
    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  };
};

const getTranslatedHousingType = (string) => {
  return HOUSING_TYPES_RU_TRANSLATIONS[string];
}
export { getTranslatedHousingType };

//Генерация объекта заданного размера
const getAdvertsNearBy = (amount) => {
  return new Array(amount).fill(null).map(() => createNearbyAdvert());
}
export { getAdvertsNearBy };
