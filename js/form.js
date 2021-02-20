import { GENERATED_COORDINATE_PRECISION } from './data.js';

const selectForm = (className) => {
  return document.querySelector(className);
}

export { selectForm };

const disableForm = (form, className) => {
  form.classList.add(className);
  const formFields = form.children;

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = true;
  }
}

export { disableForm };

const enableForm = (form, className) => {
  form.classList.remove(className);
  const formFields = form.children;

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = false;
  }
}

export { enableForm };

const updateAddress = (addressInput, coordinates) => {
  const lat = coordinates.lat.toFixed(GENERATED_COORDINATE_PRECISION);
  const lng = coordinates.lng.toFixed(GENERATED_COORDINATE_PRECISION);
  addressInput.placeholder = `${lat}, ${lng}`;
}

export { updateAddress };

const form = selectForm('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const MINIMUM_HOUSING_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};



housingType.addEventListener('change', () => {
  housingPrice.placeholder = MINIMUM_HOUSING_PRICE[housingType.value];
  housingPrice.min = MINIMUM_HOUSING_PRICE[housingType.value];
});

checkinSelect.addEventListener('change', () => {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', () => {
  checkinSelect.value = checkoutSelect.value;
});
