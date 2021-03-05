import { MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION } from './form.js';
//Ограничим координаты по Х и У с указанной точностью
const GENERATED_COORDINATE_PRECISION = 5;
export { GENERATED_COORDINATE_PRECISION };

const createNearbyAdvert = ({author, location, offer}) => {
  const xCoordinate = location.lat.toFixed(GENERATED_COORDINATE_PRECISION);
  const yCoordinate = location.lng.toFixed(GENERATED_COORDINATE_PRECISION);

  return {
    author: {
      avatar: author.avatar,
    },
    offer: {
      title: offer.title,
      address: offer.address,
      price: offer.price,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      checkin: offer.checkin,
      checkout: offer.checkout,
      features: offer.features,
      description: offer.description,
      photos: offer.photos,
    },
    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  };
};

const getTranslatedHousingType = (string) => {
  return MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION[string].translationRus;
}
export { getTranslatedHousingType };

//Генерация объекта заданного размера на основании полученных данных
const getAdvertsNearBy = (serverData) => {
  return serverData.map(createNearbyAdvert);
}

export { getAdvertsNearBy };
