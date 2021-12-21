import './index.css';
// import initialCards from '../utils/cards.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";

// ПЕРЕМЕННЫЕ
// Элементы кнопок
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССА

// Создание экземпляра Section
const cardList = new Section({
    renderer: createCard
  },
  '.cards'
)

//Создание экземпляра Api
const api = new Api(setUserInfoFromServer, addInitialCardsFromServerToDom);
api.getUserInfo();
api.getInitialCards();

// Создание экземпляров попапов
const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleSubmitFunction: handleFormPlaceSubmit
});
popupPlace.setEventListeners();

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleSubmitFunction: handleFormProfileSubmit
});
popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//Создание экземпляров FormValidator и активация валидации
const formValidatorForNewPlaceForm = new FormValidator(formConfig, newPlaceForm);
formValidatorForNewPlaceForm.enableValidation();

const formValidatorForProfileForm = new FormValidator(formConfig, profileForm);
formValidatorForProfileForm.enableValidation();

// Созжание экземпляра UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name-field',
  userDescriptionSelector: '.profile__description-field',
  userAvatarSelector: '.profile__avatar-image'
});

// ФУНКЦИИ
//Обработчик клика на карточку, открывает попап с большой картинкой
function handleCardClick({cardLink: cardLink, cardName: cardName}) {
  popupWithImage.openImagePopup({
    cardLink: cardLink,
    cardName: cardName
  });
}

//Обработчик клика на кнопку создания новой карточки
function handleFormPlaceSubmit(evt, inputValues) {
  createCard(inputValues['popup-input-place-name'], inputValues['popup-input-image-link']);
  api.sendCardInfoToServer(inputValues['popup-input-place-name'], inputValues['popup-input-image-link']);
}

// Обработчик клика на кнопку редактирования данных профиля
function handleFormProfileSubmit(evt, inputValues) {
  userInfo.setUserInfo({
    userName: inputValues['popup-input-name'],
    userDescription: inputValues['popup-input-description']
  });
  api.updateUserInfoAtServer(inputValues['popup-input-name'], inputValues['popup-input-description']);
}

function createCard(cardName, imageLink) {
  const card = new Card(cardName, imageLink, '.template', () => {
    handleCardClick({
      cardLink: imageLink,
      cardName: cardName
    });
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

function addInitialCardsFromServerToDom(dataWithCardsFromServer) {
  cardList.setItems(dataWithCardsFromServer);
  cardList.renderItems();
}

function setUserInfoFromServer(name, about, link) {
  userInfo.setUserInfoWithDataFromServer({
    userName: name,
    userDescription: about,
    userAvatarLink: link})
}

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ

addButton.addEventListener('click', () => {
  popupPlace.openPopup();

  formValidatorForNewPlaceForm.setSubmitButtonState();

  popupPlace.inputs.forEach((input) => {
    formValidatorForNewPlaceForm.hideErrorForInput(input);
  })
})

editButton.addEventListener('click', () => {
    popupProfile.openPopup();

    inputName.value = userInfo.getUserInfo().userName;
    inputDescription.value = userInfo.getUserInfo().userDescription;

    formValidatorForProfileForm.setSubmitButtonState();

    popupProfile.inputs.forEach((input) => {
      formValidatorForProfileForm.hideErrorForInput(input);
    });
  }
)

