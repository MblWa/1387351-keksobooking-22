//Ограничим координаты по Х и У с указанной точностью
const GENERATED_COORDINATE_PRECISION = 5;
export { GENERATED_COORDINATE_PRECISION };

const HOUSING_TYPES_RU_TRANSLATIONS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
}

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
  return HOUSING_TYPES_RU_TRANSLATIONS[string];
}
export { getTranslatedHousingType };

//Генерация объекта заданного размера на основании полученных данных
const getAdvertsNearBy = (serverData) => {
  return serverData.map(createNearbyAdvert);
}

export { getAdvertsNearBy };
