import { GENERATED_COORDINATE_PRECISION } from './data.js';
import { resetMarkerAndAddress } from './map.js';
import { getNoun } from './util.js';
import { sendData } from './api.js';
import { openErrorPopup, openSuccessPopup } from './popups.js';
import { resetPreviewImages } from './file-selector.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION = {
  'palace': { price: 10000, translationRus: 'Дворец' },
  'flat': { price: 1000, translationRus: 'Квартира' },
  'house': { price: 5000, translationRus: 'Дом' },
  'bungalow': { price: 0, translationRus: 'Бунгало' },
};

export { MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION };

const ROOM_CAPACITY = {
  '1': {'1': 'для 1 гостя'},
  '2': {'2':'для 2 гостей', '1': 'для 1 гостя'},
  '3': {'3':'для 3 гостей', '2':'для 2 гостей', '1': 'для 1 гостя'},
  '100': {'0': 'не для гостей'},
};

const removeErrorBorderOnReset = () => {
  const inputs = Array.from(adForm.querySelectorAll('.error-border'));
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      input.classList.remove('error-border');
    }
  });
}

const setInputBorder = (input) => {
  !input.validity.valid ? input.classList.add('error-border') : input.classList.remove('error-border');
}

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adTitle = adForm.querySelector('#title');
const housingType = adForm.querySelector('#type');
const housingPrice = adForm.querySelector('#price');
const checkinSelect = adForm.querySelector('#timein');
const checkoutSelect = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const roomValue = adForm.querySelector('#room_number');
const capacityValue = adForm.querySelector('#capacity');
const adFormFields = adForm.elements;
const formInputs = Array.from(adFormFields)
  .filter(tag => ['select', 'textarea', 'input']
    .includes(tag.tagName.toLowerCase()));

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

const onCapacityAndRoomValueChange = () => {
  capacityValue.setCustomValidity('');

  if (!Object.keys(ROOM_CAPACITY[roomValue.value]).includes(capacityValue.value)) {
    capacityValue.setCustomValidity(`При выборе ${roomValue.value} ${getNoun(roomValue.value, 'комнаты', 'комнат', 'комнат')} доступны места:
    ${Object.values(ROOM_CAPACITY[roomValue.value]).join(', ')}.`);
  }

  setInputBorder(capacityValue);
  capacityValue.reportValidity();
}

const resetForm = (successFlag) => {
  const event = new Event('change');
  adForm.reset();
  removeErrorBorderOnReset();
  resetPreviewImages();
  filterForm.reset();
  filterForm.dispatchEvent(event);
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

  if (price < MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION[housingType.value].price) {
    housingPrice.setCustomValidity(`Цена не может быть менее ${MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION[housingType.value].price}`);
  }

  setInputBorder(housingPrice);
  housingPrice.reportValidity();
});

housingType.addEventListener('change', () => {
  housingPrice.placeholder = MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION[housingType.value].price;
  housingPrice.min = MINIMUM_HOUSING_PRICE_AND_RU_TRANSLATION[housingType.value].price;
});

checkinSelect.addEventListener('change', () => {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', () => {
  checkinSelect.value = checkoutSelect.value;
});

submitButton.addEventListener('click', () => {
  formInputs.forEach((input) => {
    setInputBorder(input);
  });
});

roomValue.addEventListener('change', onCapacityAndRoomValueChange);
capacityValue.addEventListener('change', onCapacityAndRoomValueChange);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(false)
});

setUserFormSubmit(resetForm);
