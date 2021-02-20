import { GENERATED_COORDINATE_PRECISION } from './data.js';

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

const adForm = selectForm('.ad-form');
const adTitle = adForm.querySelector('#title');
const housingType = adForm.querySelector('#type');
const housingPrice = adForm.querySelector('#price');
const checkinSelect = adForm.querySelector('#timein');
const checkoutSelect = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const roomValue = adForm.querySelector('#room_number');
const capacityValue = adForm.querySelector('#capacity');

const MINIMUM_HOUSING_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

adTitle.addEventListener('input', () => {
  const titleLength = adTitle.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Заголовок объявления должен содержать не менее ${MIN_TITLE_LENGTH}. Добавьте ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Заголовок объявления должен быть короче ${MIN_TITLE_LENGTH} символов. Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

housingPrice.addEventListener('input', () => {
  const price = housingPrice.value;

  if (price < MINIMUM_HOUSING_PRICE[housingType.value]) {
    housingPrice.setCustomValidity(`Цена не может быть менее ${MINIMUM_HOUSING_PRICE[housingType.value]}`);
  } else {
    housingPrice.setCustomValidity('');
  }

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

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault;
  formInputs.forEach((input) => {
    if (!input.validity.valid) {
      input.style.borderColor = 'red';
      input.style.borderWidth = '2px';
    }
  });
});

const addCustomValiditytoCapacity = () => {
  if (!ROOM_CAPACITY[roomValue.value].includes(capacityValue.value)) {
    capacityValue.setCustomValidity('Количество комнат не подходит этому количеству гостей');
  } else {
    capacityValue.setCustomValidity('');
  }

  capacityValue.reportValidity();
}

roomValue.addEventListener('change', addCustomValiditytoCapacity);

capacityValue.addEventListener('change', addCustomValiditytoCapacity);
