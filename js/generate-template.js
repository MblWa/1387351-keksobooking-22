import { getTranslatedHousingType } from './data.js';
import { getNoun } from './util.js';

const templateCard = document.querySelector('#card').content;

const isEmptyStringOrUndefined = (serverData) => {
  return !serverData;
}

const isEmptyArray = (serverData) => {
  return (serverData.length === 0);
}

const hideElement = (cardElement) => {
  return cardElement.classList.add('visually-hidden');
}

const generateStringForCapacity = (rooms, guests) => {
  return rooms + ' ' + getNoun(rooms, 'комната', 'комнаты', 'комнат') +
  ' для ' + guests + ' ' + getNoun(guests, 'гостя', 'гостей', 'гостей');
}

const generateStringForOccupationTime = (checkin, checkout) => {
  return `Заезд после ${checkin}, выезд до ${checkout}`;
}

const createFeaturesElements = (features) => {
  const featuresList = document.createDocumentFragment();

  features.forEach((feature) => {
    const element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add(`popup__feature--${feature}`);

    featuresList.appendChild(element);
  });

  return featuresList;
}

const createImageGallery = (photoSources, defaultImage) => {
  const photoGallery = document.createDocumentFragment();

  photoSources.forEach((photo) => {
    const image = defaultImage.cloneNode(true);
    image.src = photo;
    image.alt = 'Фотография жилья';

    photoGallery.appendChild(image);
  });

  return photoGallery;
}

const generateCard = ({ author, offer}) => {
  const newCard = templateCard.querySelector('.popup').cloneNode(true);
  const cardTitle = newCard.querySelector('.popup__title');
  const cardAddress = newCard.querySelector('.popup__text--address');
  const cardPrice = newCard.querySelector('.popup__text--price');
  const cardHousingType = newCard.querySelector('.popup__type');
  const cardCapacity = newCard.querySelector('.popup__text--capacity');
  const cardOccupation = newCard.querySelector('.popup__text--time');
  const cardFeatures = newCard.querySelector('.popup__features');
  const cardDescription = newCard.querySelector('.popup__description');
  const cardPhotosContainer = newCard.querySelector('.popup__photos');
  const cardPhoto = cardPhotosContainer.querySelector('.popup__photo');
  const cardUserAvatar = newCard.querySelector('.popup__avatar');

  if (isEmptyStringOrUndefined(offer.title)) {
    hideElement(cardTitle);
  } else {
    cardTitle.textContent = offer.title;
  }

  if (isEmptyStringOrUndefined(offer.address)) {
    hideElement(cardAddress);
  } else {
    cardAddress.textContent = offer.address;
  }

  if (isEmptyStringOrUndefined(offer.price)) {
    hideElement(cardPrice);
  } else {
    cardPrice.textContent = `${offer.price} ₽/ночь`;
  }

  if (isEmptyStringOrUndefined(getTranslatedHousingType(offer.type))) {
    hideElement(cardHousingType);
  } else {
    cardHousingType.textContent = getTranslatedHousingType(offer.type);
  }

  if (isEmptyStringOrUndefined(offer.rooms) || isEmptyStringOrUndefined(offer.guests)) {
    hideElement(cardCapacity);
  } else {
    cardCapacity.textContent = generateStringForCapacity(offer.rooms, offer.guests);
  }

  if (isEmptyStringOrUndefined(offer.checkin) || isEmptyStringOrUndefined(offer.checkout)) {
    hideElement(cardOccupation);
  } else {
    cardOccupation.textContent = generateStringForOccupationTime(offer.checkin, offer.checkout);
  }

  if (isEmptyStringOrUndefined(offer.description)) {
    hideElement(cardDescription);
  } else {
    cardDescription.textContent = offer.description;
  }

  if (isEmptyStringOrUndefined(author.avatar)) {
    hideElement(cardUserAvatar);
  } else {
    cardUserAvatar.src = author.avatar;
  }

  if (isEmptyArray(offer.features)) {
    hideElement(cardFeatures);
  } else {
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFeaturesElements(offer.features));
  }

  if (isEmptyArray(offer.photos)) {
    hideElement(cardPhotosContainer);
  } else {
    const photoGallery = createImageGallery(offer.photos, cardPhoto);
    cardPhotosContainer.innerHTML = '';
    cardPhotosContainer.appendChild(photoGallery);
  }

  return newCard;
}

export { generateCard };
