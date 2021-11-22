import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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

// Элементы попапа с увеличенным изображением места
const popupImage = document.querySelector('.popup_type_image');
const bigImageInPopup = document.querySelector('.popup__place-image');
const popupImageCaption = document.querySelector('.popup__caption');
const closeButtonPopupImage = document.querySelector(
  '.popup__close-button_type_image-popup'
);

// Прочие переменные
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  submitButtonInactiveStateClass: 'popup__button_state_inactive',
  closeButtonSelector: '.popup__close-button'
}
console.log(formConfig);
const forms = Array.from(document.querySelectorAll(formConfig.formSelector));
console.log(forms);
console.log(forms[0]);
console.log(forms[1]);
console.log(formConfig.formSelector);

const cards = document.querySelector('.cards'); // блок cards
const popupOverlays = Array.from(document.querySelectorAll('.popup'));

// ФУНКЦИИ

// Функция для автоматической подстановки данных профайла в попап редактирования профиля
function autoFillProfileInputWhenPopupOpens() {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
}

// Функция для очистки полей формы попапа места. Будет использоваться при открытии попапа места, если до этого пользователь ввел данные,
// но не нажал на создание карточки, а закрыл попап
function clearPlacePopupInputWhenPopupOpens() {
  inputImageLink.value = '';
  inputPlaceName.value = '';
}

// Функции для открытия и для закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
}

function closePopup(popup) {
//todo непонятно, как очищать ошибки при закрытии формы
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByPressEsc);
}

// Функция для закрытия попапа при клике на оверлей
function closePopupByClickOnOverlay(evt) {
  const popup = evt.target.closest('.popup_opened');
  popupOverlays.forEach((popupOverlayElement) => {
    if (evt.target === popupOverlayElement) {
      closePopup(popup);
    }
  })
}

// Функция для закрытия попапа при клике на ESC
function closePopupByPressEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// Функция для открытия попапа с формой и для установки состояния кнопки submit при открытии такого попапа
function openPopupWithForm(popup) {
  addFormValidator();
  openPopup(popup);
}

// Функция для открытия попапа профайла
function openProfilePopup(popup) {
  autoFillProfileInputWhenPopupOpens();
  openPopupWithForm(popup);
}

// Функция для открытия попапа места
function openPopupPlace(popup) {
  clearPlacePopupInputWhenPopupOpens();
  openPopupWithForm(popup);
}

// Функция для перезаписи значений профайла при нажатии кнопки 'Сохранить'
function editProfileInfo(evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closePopup(popupProfile);
}

// Функция для открытия попапа с картинкой
export function openPopupImage(cardName, cardLink) {
  bigImageInPopup.src = cardLink;
  popupImageCaption.textContent = cardName;
  bigImageInPopup.alt = cardName;

  openPopup(popupImage);
}

// Функция для возможности добавлять новые карточки места с помощью попапа
function addNewCardFromPopup(evt) {
  evt.preventDefault();
  const card = new Card(inputPlaceName.value, inputImageLink.value, '.template'); // передаём объект аргументом
  const cardElement = card.createCard();
  cards.prepend (cardElement);
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
}) // Перебор массива для добавления слушателя события элементам оверлей

//Для каждой карточки создайте экземпляр класса Card.
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template'); // передаём объект аргументом
  const cardElement = card.createCard();
  cards.prepend(cardElement);
});

function addFormValidator() {
  forms.forEach((form) => {
    const formValidator = new FormValidator(formConfig, form);
    console.log(formValidator);
    formValidator.enableValidation();
  });
}

