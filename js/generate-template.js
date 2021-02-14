import { getTranslatedHousingType } from './data.js';

const templateCard = document.querySelector('#card').content;

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

  cardTitle.textContent = offer.title;
  cardAddress.textContent = offer.address;
  cardPrice.textContent = `${offer.price} ₽/ночь`;
  cardHousingType.textContent = getTranslatedHousingType(offer.type);
  cardCapacity.textContent = generateStringForCapacity(offer.rooms, offer.guests);
  cardOccupation.textContent = generateStringForOccupationTime(offer.checkin, offer.checkout);
  cardDescription.textContent = offer.description;
  cardUserAvatar.src = author.avatar;

  cardFeatures.innerHTML = '';
  cardFeatures.appendChild(createFeaturesElements(offer.features));

  const photoGallery = createImageGallery(offer.photos, cardPhoto);
  cardPhotosContainer.innerHTML = '';
  cardPhotosContainer.appendChild(photoGallery);

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
