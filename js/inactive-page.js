import { selectForm } from './form.js';

const adForm = selectForm('.ad-form');
const filterForm = selectForm('.map__filters');

const disableForm = (form, className) => {
  form.classList.add(className);
  const formFields = form.children;
  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = true;
  }
}

disableForm(adForm, 'ad-form--disabled');
disableForm(filterForm, 'map__filters--disabled');

const map = document.querySelector('#map-canvas');
