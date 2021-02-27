const PRICES = {
  'low': 10000,
  'high': 50000,
  'any': 0,
}

const filterForm = document.querySelector('.map__filters');
const typeFilterInput = filterForm.querySelector('#housing-type');
const priceFilterInput = filterForm.querySelector('#housing-price');
const roomsFilterInput = filterForm.querySelector('#housing-rooms');
const guestsFilterInput = filterForm.querySelector('#housing-guests');
const featuresFilterFieldset = filterForm.querySelector('#housing-features');

const getSelectedFeatures = (inputs) => {
  return Array.from(inputs.querySelectorAll('input:checked'))
    .map(input => input.value);
}

const generateFilterCard = () => {
  return {
    price: priceFilterInput.value,
    type: typeFilterInput.value,
    rooms: roomsFilterInput.value,
    guests: guestsFilterInput.value,
    features: getSelectedFeatures(featuresFilterFieldset),
  }
}

let filter = generateFilterCard();

const isNotAny = (string) => {
  return string !== 'any';
}

const isAcceptableAd = (advert) => {
  let flags = [];

  if (filter.features.length !== 0) {
    flags.push(filter.features.every(feature => advert.offer.features.includes(feature)));
  }

  if (isNotAny(filter.price)) {
    switch (filter.price) {
      case 'low':
        flags.push(advert.offer.price < PRICES[filter.price]);
        break;
      case 'high':
        flags.push(advert.offer.price > PRICES[filter.price]);
        break;
      case 'middle':
        flags.push((advert.offer.price >= PRICES['low']) && (advert.offer.price <= PRICES['high']));
        break;
    }
  }

  if (isNotAny(filter.type)) {
    flags.push(filter.type === advert.offer.type);
  }

  if (isNotAny(filter.rooms)) {
    flags.push(filter.rooms === advert.offer.rooms.toString())
  }

  if (isNotAny(filter.guests)) {
    flags.push(filter.guests === advert.offer.guests.toString())
  }

  return !flags.includes(false);
}

const filterAdverts = (adverts) => {
  return adverts.slice().filter(isAcceptableAd);
}

export { filterAdverts };

const setFilterChange = (cb) => {
  filterForm.addEventListener('change', () => {
    filter = generateFilterCard();
    cb();
  });
}

export { setFilterChange };
