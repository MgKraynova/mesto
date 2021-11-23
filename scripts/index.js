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
const newPlaceForm = document.querySelector('.popup__form_type_place');
const profileForm = document.querySelector('.popup__form_type_profile');

// Прочие переменные
const cardsElement = document.querySelector('.cards'); // блок cards
const popupOverlays = Array.from(document.querySelectorAll('.popup'));

//Создание экземпляров FormValidator и активация валидации
const formValidatorForNewPlaceForm = new FormValidator(formConfig, newPlaceForm);
formValidatorForNewPlaceForm.enableValidation();

const formValidatorForProfileForm = new FormValidator(formConfig, profileForm);
formValidatorForProfileForm.enableValidation();


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

function openPopupWithForm(popup, formValidator) {
  formValidator.setSubmitButtonState();

  openPopup(popup);
}

function openProfilePopup(popup, formValidator) {
  autoFillProfileInputWhenPopupOpens();
  openPopupWithForm(popup, formValidator);
}

function openPopupPlace(popup, formValidator) {
  clearPlacePopupInputWhenPopupOpens();
  openPopupWithForm(popup, formValidator);
}

function editProfileInfo(evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closePopup(popupProfile);
}

function openPopupImage(cardName, cardLink) {
  bigImageInPopup.src = cardLink;
  popupImageCaption.textContent = cardName;
  bigImageInPopup.alt = cardName;

  openPopup(popupImage);
}

function addCard(cardName, imageLink) {
  const card = new Card(cardName, imageLink, '.template', openPopupImage);
  const cardElement = card.createCard();
  cardsElement.prepend (cardElement);
}

function addNewCardFromPopup(evt) {
  evt.preventDefault();
  addCard(inputPlaceName.value, inputImageLink.value);
  closePopup(popupPlace);
}

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ
addButton.addEventListener('click', () => openPopupPlace(popupPlace, formValidatorForNewPlaceForm));

editButton.addEventListener('click', () => openProfilePopup(popupProfile, formValidatorForProfileForm));

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
  addCard(item.name, item.link);
});



