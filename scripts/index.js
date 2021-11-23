import Card from './Card.js';
import FormValidator from './FormValidator.js';

// ПЕРЕМЕННЫЕ
// Элементы блока profile на html странице
const nameField = document.querySelector('.profile__name-field');
const descriptionField = document.querySelector('.profile__description-field');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления новой карточки места на страницу

// Элементы попапа профиля
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = document.querySelector(
  '.popup__close-button_type_profile'
);
const inputName = document.querySelector('.popup__input_content_name');
const inputDescription = document.querySelector(
  '.popup__input_content_description'
);
const editProfileForm = document.querySelector('.popup__form_type_profile');

// Элементы попапа места
const popupPlace = document.querySelector('.popup_type_place');
const closeButtonPlace = document.querySelector(
  '.popup__close-button_type_place'
);
const inputPlaceName = document.querySelector(
  '.popup__input_content_place-name'
);
const inputImageLink = document.querySelector(
  '.popup__input_content_image-link'
);
const newPlaceForm = document.querySelector('.popup__form_type_place');

// Элементы попапа с картинкой места
const popupImage = document.querySelector('.popup_type_image');
const bigImageInPopup = document.querySelector('.popup__place-image');
const popupImageCaption = document.querySelector('.popup__caption');
const closeButtonPopupImage = document.querySelector(
  '.popup__close-button_type_image-popup'
);

// Переменные, относящиеся к формам
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  submitButtonInactiveStateClass: 'popup__button_state_inactive',
  closeButtonSelector: '.popup__close-button'
}
const forms = Array.from(document.querySelectorAll(formConfig.formSelector));

// Прочие переменные
const cardsElement = document.querySelector('.cards'); // блок cards
const popupOverlays = Array.from(document.querySelectorAll('.popup'));

// ФУНКЦИИ
function autoFillProfileInputWhenPopupOpens() {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
}

function clearPlacePopupInputWhenPopupOpens() {
  inputImageLink.value = '';
  inputPlaceName.value = '';
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

function closePopupByClickOnOverlay(evt) {
  const popup = evt.target.closest('.popup_opened');
  popupOverlays.forEach((popupOverlayElement) => {
    if (evt.target === popupOverlayElement) {
      closePopup(popup);
    }
  })
}

function closePopupByPressEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function addFormValidator() {
  forms.forEach((form) => {
    const formValidator = new FormValidator(formConfig, form);
    console.log(formValidator);
    formValidator.enableValidation();
  });
}

function openPopupWithForm(popup) {
  addFormValidator();
  openPopup(popup);
}

function openProfilePopup(popup) {
  autoFillProfileInputWhenPopupOpens();
  openPopupWithForm(popup);
}

function openPopupPlace(popup) {
  clearPlacePopupInputWhenPopupOpens();
  openPopupWithForm(popup);
}

function editProfileInfo(evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closePopup(popupProfile);
}

export function openPopupImage(cardName, cardLink) {
  bigImageInPopup.src = cardLink;
  popupImageCaption.textContent = cardName;
  bigImageInPopup.alt = cardName;

  openPopup(popupImage);
}

function addNewCardFromPopup(evt) {
  evt.preventDefault();
  const card = new Card(inputPlaceName.value, inputImageLink.value, '.template');
  const cardElement = card.createCard();
  cardsElement.prepend (cardElement);
  closePopup(popupPlace);
}

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ
addButton.addEventListener('click', () => openPopupPlace(popupPlace));

editButton.addEventListener('click', () => openProfilePopup(popupProfile));

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

editProfileForm.addEventListener('submit', editProfileInfo);

addButton.addEventListener('click', () => openPopup(popupPlace));

closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));

newPlaceForm.addEventListener('submit', addNewCardFromPopup);

closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage));

popupOverlays.forEach((popupOverlayElement) => {
  popupOverlayElement.addEventListener('mousedown', closePopupByClickOnOverlay);
});

// ПЕРЕБОР МАССИВА ДЛЯ СОЗДАНИЯ ПЕРВЫХ КАРТОЧЕК
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template'); // передаём объект аргументом
  const cardElement = card.createCard();
  cardsElement.prepend(cardElement);
});



