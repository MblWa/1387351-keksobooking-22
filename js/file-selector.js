const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarSelector = document.querySelector('.ad-form-header__input');
const photoSelector = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoPreview = document.querySelector('.ad-form__photo');
//Копии узлов для их восстановления их внешнего вида после сброса формы
// или её отправки
const defaultAvatarPreview = avatarPreview.cloneNode(true);
const defaultPhotoPreview = photoPreview.cloneNode(true);

const isMatching = (extension) => {
  return FILE_TYPES.some((it) => {
    return extension.endsWith(it);
  })
}

const resetStyleAndInnerHTML = (element, defaultElement) => {
  element.innerHTML = defaultElement.innerHTML;
  element.removeAttribute('style');
}

const resetPreviewImages = () => {
  resetStyleAndInnerHTML(avatarPreview, defaultAvatarPreview);
  resetStyleAndInnerHTML(photoPreview, defaultPhotoPreview);
}

export { resetPreviewImages };

const setFileAsImage = (selector, preview) => {
  const file = selector.files[0];
  const fileName = file.name.toLowerCase();

  if (isMatching(fileName)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.display = 'flex';
      preview.style.justifyContent = 'center';
      preview.style.alignItems = 'center';
      preview.style.minWidth = preview.offsetWidth + 'px';
      preview.style.padding = '0';
      preview.innerHTML = '';

      const element = document.createElement('img');

      element.src = reader.result;
      element.style.maxWidth = preview.offsetWidth + 'px';
      element.style.maxHeight = preview.offsetHeight + 'px';

      preview.appendChild(element);
    });

    reader.readAsDataURL(file);
  }
}

avatarSelector.addEventListener('change', () => {
  setFileAsImage(avatarSelector, avatarPreview);
});

photoSelector.addEventListener('change', () => {
  setFileAsImage(photoSelector, photoPreview);
});
