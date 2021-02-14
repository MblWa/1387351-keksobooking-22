import { getTranslatedHousingType } from './data.js';

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
  let resultString = `${rooms} `;

  switch (rooms) {
    case 1:
      resultString += 'комната';
      break;
    case 2:
    case 3:
    case 4:
      resultString += 'комнаты';
      break;
    default:
      resultString += 'комнат';
      break;
  }
  resultString += ` для ${guests} `;

  switch (guests) {
    case 1:
      resultString += 'гостя';
      break;
    default:
      resultString += 'гостей';
      break;
  }

  return resultString;
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

  isEmptyStringOrUndefined(offer.title) ?
    hideElement(cardTitle) :
    cardTitle.textContent = offer.title;
  isEmptyStringOrUndefined(offer.address) ?
    hideElement(cardAddress) :
    cardAddress.textContent = offer.address;
  isEmptyStringOrUndefined(offer.price) ?
    hideElement(cardPrice) :
    cardPrice.textContent = `${offer.price} ₽/ночь`;
  isEmptyStringOrUndefined(getTranslatedHousingType(offer.type)) ?
    hideElement(cardHousingType) :
    cardHousingType.textContent = getTranslatedHousingType(offer.type);
  isEmptyStringOrUndefined(offer.rooms) || isEmptyStringOrUndefined(offer.guests) ?
    hideElement(cardCapacity) :
    cardCapacity.textContent = generateStringForCapacity(offer.rooms, offer.guests);
  isEmptyStringOrUndefined(offer.checkin) || isEmptyStringOrUndefined(offer.checkout) ?
    hideElement(cardOccupation) :
    cardOccupation.textContent = generateStringForOccupationTime(offer.checkin, offer.checkout);
  isEmptyStringOrUndefined(offer.description) ?
    hideElement(cardDescription) :
    cardDescription.textContent = offer.description;
  isEmptyStringOrUndefined(author.avatar) ?
    hideElement(cardUserAvatar) :
    cardUserAvatar.src = author.avatar;

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

const getCards = (adverts) => {
  const cardsList = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    cardsList.appendChild(generateCard(adverts[i]));
  }

  return cardsList;
}

export { getCards };
