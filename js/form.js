import { GENERATED_COORDINATE_PRECISION } from './data.js';
import { resetMarkerAndAddress } from './map.js';
import { getNoun } from './util.js';
import { sendData } from './api.js';
import { openErrorPopup, openSuccessPopup } from './popups.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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
  addressInput.value = `${lat}, ${lng}`;
}

export { updateAddress };

const setInputBorder = (input) => {
  !input.validity.valid ? input.classList.add('error-border') : input.classList.remove('error-border');
}

const adForm = selectForm('.ad-form');
const filterForm = selectForm('.map__filters');
const adTitle = adForm.querySelector('#title');
const housingType = adForm.querySelector('#type');
const housingPrice = adForm.querySelector('#price');
const checkinSelect = adForm.querySelector('#timein');
const checkoutSelect = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const roomValue = adForm.querySelector('#room_number');
const capacityValue = adForm.querySelector('#capacity');

const MINIMUM_HOUSING_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const ROOM_CAPACITY = {
  '1': {'1': 'для 1 гостя'},
  '2': {'2':'для 2 гостей', '1': 'для 1 гостя'},
  '3': {'3':'для 3 гостей', '2':'для 2 гостей', '1': 'для 1 гостя'},
  '100': {'0': 'не для гостей'},
};

adTitle.addEventListener('input', () => {
  const titleLength = adTitle.value.length;
  adTitle.setCustomValidity('');

  if (titleLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Заголовок объявления должен содержать не менее ${MIN_TITLE_LENGTH}. Добавьте ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  }
  if (titleLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Заголовок объявления должен быть короче ${MIN_TITLE_LENGTH} символов. Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  }

  setInputBorder(adTitle);
  adTitle.reportValidity();
});

housingPrice.addEventListener('input', () => {
  const price = housingPrice.value;
  housingPrice.setCustomValidity('');

  if (price < MINIMUM_HOUSING_PRICE[housingType.value]) {
    housingPrice.setCustomValidity(`Цена не может быть менее ${MINIMUM_HOUSING_PRICE[housingType.value]}`);
  }

  setInputBorder(housingPrice);
  housingPrice.reportValidity();
});

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

const adFormFields = adForm.elements;
const formInputs = Array.from(adFormFields)
  .filter(tag => ['select', 'textarea', 'input']
    .includes(tag.tagName.toLowerCase()));

submitButton.addEventListener('click', () => {
  formInputs.forEach((input) => {
    setInputBorder(input);
  });
});

const addCustomValiditytoCapacity = () => {
  capacityValue.setCustomValidity('');

  if (!Object.keys(ROOM_CAPACITY[roomValue.value]).includes(capacityValue.value)) {
    capacityValue.setCustomValidity(`При выборе ${roomValue.value} ${getNoun(roomValue.value, 'комнаты', 'комнат', 'комнат')} доступны места:
    ${Object.values(ROOM_CAPACITY[roomValue.value]).join(', ')}.`);
  }

  setInputBorder(capacityValue);
  capacityValue.reportValidity();
}

roomValue.addEventListener('change', addCustomValiditytoCapacity);
capacityValue.addEventListener('change', addCustomValiditytoCapacity);

const resetForm = (successFlag) => {
  adForm.reset();
  filterForm.reset();
  resetMarkerAndAddress();

  if (successFlag) {
    openSuccessPopup();
  }

}

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(true),
      () => openErrorPopup(),
      new FormData(evt.target),
    );
  });
}

setUserFormSubmit(resetForm);
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(false)
});
