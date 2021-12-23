import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import PopupWithSubmitButton from "../components/PopupWithSubmitButton.js";


// ПЕРЕМЕННЫЕ
// Элементы кнопок
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const changeAvatarButton = document.querySelector('.profile__wrapper');

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
const avatarForm = document.querySelector('.popup__form_type_change-avatar');

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССА

// Создание экземпляра Section
const cardList = new Section({
    renderer: createCard
  },
  '.cards'
)

//Создание экземпляра Api
const api = new Api(setUserInfoFromServer, addInitialCardsFromServerToDom, createCard, updateAvatar, renderLoading);
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

const popupForDelete = new PopupWithSubmitButton({
  popupSelector: '.popup_type_delete',
  handleSubmitFunction: handleSubmitDeleteButton
});
popupForDelete.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_change-avatar',
  handleSubmitFunction: handleChangeAvatarSubmit
})
popupAvatar.setEventListeners();

//Создание экземпляров FormValidator и активация валидации
const formValidatorForNewPlaceForm = new FormValidator(formConfig, newPlaceForm);
formValidatorForNewPlaceForm.enableValidation();

const formValidatorForProfileForm = new FormValidator(formConfig, profileForm);
formValidatorForProfileForm.enableValidation();

const formValidatorForAvatarForm = new FormValidator(formConfig, avatarForm);
formValidatorForAvatarForm.enableValidation();

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
function handleFormPlaceSubmit(inputValues) {
  api.sendCardInfoToServerAndCreateCard(inputValues['popup-input-place-name'], inputValues['popup-input-image-link']);
}

// Обработчик клика на кнопку редактирования данных профиля
function handleFormProfileSubmit(inputValues) {
  userInfo.setUserInfo({
    userName: inputValues['popup-input-name'],
    userDescription: inputValues['popup-input-description']
  });
  api.updateUserInfoAtServer(inputValues['popup-input-name'], inputValues['popup-input-description']);
}

// Обработчик клика на кнопку изменения аватара
function handleChangeAvatarSubmit(inputValues) {
  api.sendNewAvatarToServerAndChangeAvatar(inputValues['popup-input-avatar-link']);
}

function updateAvatar(userAvatarLink) {
  userInfo.updateAvatar(userAvatarLink);
}

function createCard(cardData) {
  const card = new Card(cardData.name, cardData.link, '.template', () => {
    handleCardClick({
      cardLink: cardData.link,
      cardName: cardData.name
    });
  }, cardData.likes.length, handleDeleteButtonFunction, cardData._id, handleLikeClick);
  const cardElement = card.createCard();

  showDeleteButtonOnCardIfItIsUsersCard(api.userId, cardData.owner._id, cardElement);

  checkIfCardHasBeenLikedByUser(cardData.likes, card);

  cardList.addItem(cardElement);
}

function checkIfCardHasBeenLikedByUser(dataLikes, card) {
  let likeIsActive = false;

  dataLikes.forEach((like) => {
    if ((like._id === api.userId) && (!likeIsActive)) {
      card._makeLikeActive();
      likeIsActive = true;
    }
  });
}

function showDeleteButtonOnCardIfItIsUsersCard(userId, ownerCardId, card) {
  if (!(userId === ownerCardId)) {
    card.querySelector('.card__delete-button').classList.add('card__delete-button_invisible');
  }
}

function addInitialCardsFromServerToDom(dataWithCardsFromServer) {
  cardList.setItems(dataWithCardsFromServer);

  cardList.renderItems();
}

function setUserInfoFromServer(name, about, link) {
  userInfo.setUserInfoWithDataFromServer({
    userName: name,
    userDescription: about,
    userAvatarLink: link
  })
}

function handleSubmitDeleteButton(card) {
  api.deleteCard(card.cardId);
  card.deleteCard();
  card = null;
}

function handleDeleteButtonFunction() {
  popupForDelete.openPopup();
  popupForDelete.currentCard = this;
}

function sendCardLikeToServer(cardId) {
  api.addLikeToCard(cardId);
}

function removeCardLikeFromServer(cardId) {
  api.removeLikeFromCard(cardId);
}

function handleLikeClick(cardLikeButton, cardId) {
  if (!cardLikeButton.classList.contains('card__like-button_active')) {
    removeCardLikeFromServer(cardId);
  } else {
    sendCardLikeToServer(cardId);
  }
}

function renderLoading(isLoading, popup) {
  const popupButton = popup.querySelector('.popup__button');

  if (isLoading) {
    popupButton.textContent = "Сохранение..";
  } else {
    if (popup.classList.contains('popup_type_place')) {
      popupButton.textContent = "Создать";
    } else {
      popupButton.textContent = "Сохранить";
    }
  }
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

changeAvatarButton.addEventListener('click', () => {
  popupAvatar.openPopup();
})


