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
  submitButtonInactiveStateClass: 'popup__button_state_inactive'
};
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
  if (popup.querySelector(formConfig.formSelector)) {
    const form = popup.querySelector(formConfig.formSelector);
    const inputs = Array.from(form.querySelectorAll(formConfig.inputSelector));

    //inputs.forEach((input) => hideErrorForInput(input, form, formConfig)); // скрывает ошибки для полей формы при закрытии попапа
    // todo а не нужно ли это в Формвалидашн убрать? вроде это там уже есть. Вроде можно удалить
  }
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
  const form = popup.querySelector(formConfig.formSelector);
  setSubmitButtonState(form, formConfig); // устанавливает состояние кнопки в зависимости от валидности полей
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

// Функция для постановки лайков на карточки и их удаления
// function makeLikeActive(evt) {
//   evt.target.classList.toggle('card__like-button_active');
// }

// Функция удаления карточки
// function deleteCard(evt) {
//   evt.target.parentElement.remove();
// }

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


// Перебор массива для создания первых 6 карточек
// initialCards.forEach((item) => cards.prepend(createCard(item.name, item.link))); // создание 6 первоначальных карточек


//Для каждой карточки создайте экземпляр класса Card.
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template'); // передаём объект аргументом
  const cardElement = card.createCard();
  cards.prepend(cardElement);
})

//todo убрать new из названия переменной
// const newPlaceForm = document.querySelector('.popup__form_type_place');
const newPlaceFormValidator = new FormValidator (formConfig, newPlaceForm);
newPlaceFormValidator.enableValidation();

const newProfileForm = document.querySelector('.popup__form_type_profile');
const newProfileFormValidator = new FormValidator (formConfig, newProfileForm);
newProfileFormValidator.enableValidation();

