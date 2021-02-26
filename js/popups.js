const main = document.querySelector('main');
const templateErrorCard = document.querySelector('#error').content;
const newErrorCard = templateErrorCard.querySelector('.error').cloneNode(true);
const closeErrorPopupButton = newErrorCard.querySelector('.error__button');

const templateSuccessCard = document.querySelector('#success').content;
const newSuccessCard = templateSuccessCard.querySelector('.success').cloneNode(true);

const onPressed = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup();
  }
}
const openErrorPopup = () => {
  main.appendChild(newErrorCard);
  document.addEventListener('keydown', onPressed);
}

export { openErrorPopup };

const openSuccessPopup = () => {
  main.appendChild(newSuccessCard);
  document.addEventListener('keydown', onPressed);
}

export { openSuccessPopup };

const closePopup = () => {
  if (main.contains(newErrorCard)) {
    main.removeChild(newErrorCard);
  }

  if (main.contains(newSuccessCard)) {
    main.removeChild(newSuccessCard);
  }

  document.removeEventListener('keydown', onPressed);
}

closeErrorPopupButton.addEventListener('click', () => {
  closePopup();
});

newErrorCard.addEventListener('click', () => {
  closePopup();
});

newSuccessCard.addEventListener('click', () => {
  closePopup();
});
