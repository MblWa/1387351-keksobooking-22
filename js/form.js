const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const MAXIMUM_HOUSING_PRICE = 1000000;
const MINIMUM_HOUSING_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};

housingPrice.min = 0;
housingPrice.max = MAXIMUM_HOUSING_PRICE;

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
