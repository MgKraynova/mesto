import './index.css';
import initialCards from '../components/cards.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// ПЕРЕМЕННЫЕ
// Элементы блока profile на html странице
const nameField = document.querySelector('.profile__name-field');
const descriptionField = document.querySelector('.profile__description-field');
const editButton = document.querySelector('.profile__edit-button');

// Элементы попапа профиля
const inputName = document.querySelector('.popup__input_content_name');
const inputDescription = document.querySelector(
  '.popup__input_content_description'
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
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления новой карточки места на страницу

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССА

// Создание первых 6 карточек
const cardList = new Section({
    items: initialCards,
    renderer: (cardName, imageLink) => {
      const card = new Card(cardName, imageLink, '.template', () => {
        handleCardClick(imageLink, cardName);
      } );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  },
  '.cards'
)

cardList.renderItems();

// Создание экземпляров попапов
const popupPlace = new PopupWithForm('.popup_type_place', '.popup__close-button', '.popup__input', '.popup__button', handleFormPlaceSubmit);
popupPlace.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile', '.popup__close-button', '.popup__input', '.popup__button', handleFormProfileSubmit);
popupProfile.setEventListeners();

//Создание экземпляров FormValidator и активация валидации
const formValidatorForNewPlaceForm = new FormValidator(formConfig, newPlaceForm);
formValidatorForNewPlaceForm.enableValidation();

const formValidatorForProfileForm = new FormValidator(formConfig, profileForm);
formValidatorForProfileForm.enableValidation();

// Созжание экземпляров UserInfo
const userInfo = new UserInfo({
  userNameElement: nameField,
  userDescriptionElement: descriptionField},
  '.popup__input_content_name', '.popup__input_content_description');

// ФУНКЦИИ
//Обработчик клика на карточку, открывает попап с большой картинкой
function handleCardClick(cardLink, cardName) {
  const popupWithImage = new PopupWithImage('.popup_type_image',
    '.popup__close-button', '.popup__place-image',
    '.popup__caption');
  popupWithImage.openImagePopup(cardLink, cardName);  //todo
  popupWithImage.setEventListeners();
}

//Обработчик клика на кнопку создания новой карточки
function handleFormPlaceSubmit(evt, inputValues) {
  evt.preventDefault();
  const card = new Card(inputValues['popup-input-place-name'], inputValues['popup-input-image-link'], '.template', () => {
    handleCardClick(inputValues['popup-input-image-link'], inputValues['popup-input-place-name']);
  });
  const cardElement = card.createCard();
  cardsElement.prepend (cardElement);
}

// Обработчик клика на кнопку редактирования данных профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
}

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ

addButton.addEventListener('click', () => {
  formValidatorForNewPlaceForm.setSubmitButtonState();
  popupPlace.openPopup();
})

editButton.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().userName;
  inputDescription.value = userInfo.getUserInfo().userDescription;
  popupProfile.openPopup();
  }
)

