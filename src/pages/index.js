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

// Элементы попапов
const popupProfileElement = document.querySelector('.popup_type_profile');
const popupAvatarElement = document.querySelector('.popup_type_change-avatar');
const popupPlaceElement = document.querySelector('.popup_type_place');

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

// Прочие переменные
let userData = '';

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССА
// Создание экземпляра Section
const cardList = new Section({
    renderer: createCard
  },
  '.cards'
)

//Создание экземпляра Api и запрос первоначальных данных
const api = new Api();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{name, about, avatar, _id}, cardsData]) => {
    userData = {
      userName: name,
      userDescription: about,
      userAvatarLink: avatar,
      userId: _id
    }
    userInfo.setUserInfo(userData);
    cardList.renderItems(cardsData, userData);
  })
  .catch((err) => {
    handleApiError(err);
  });

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
},);

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
  renderLoading(true, popupPlaceElement);

  api.sendCardInfoToServer(inputValues['popup-input-place-name'], inputValues['popup-input-image-link'])
    .then((cardData) => {
        createCard(cardData, userData);
        popupPlace.closePopup();
      }
    )
    .catch((err) => {
      handleApiError(err);
    })
    .finally(() => {
      renderLoading(false, popupPlaceElement);
    });
}

// Обработчик клика на кнопку редактирования данных профиля
function handleFormProfileSubmit(inputValues) {
  renderLoading(true, popupProfileElement);

  api.updateUserInfoAtServer(inputValues['popup-input-name'], inputValues['popup-input-description'])
    .then(({name, about, avatar, _id}) => {
      userData = {
        userName: name,
        userDescription: about,
        userAvatarLink: avatar,
        userId: _id
      }

      userInfo.setUserInfo({
        userName: userData.userName,
        userDescription: userData.userDescription,
        userAvatarLink: userData.userAvatarLink
      });

      popupProfile.closePopup();
    })
    .catch((err) => {
      handleApiError(err);
    })
    .finally(() => {
      renderLoading(false, popupProfileElement);
    });
}

// Обработчик клика на кнопку изменения аватара
function handleChangeAvatarSubmit(inputValues) {
  renderLoading(true, popupAvatarElement);

  api.sendNewAvatarToServer(inputValues['popup-input-avatar-link'])
    .then(({name, about, avatar, _id}) => {
      userData = {
        userName: name,
        userDescription: about,
        userAvatarLink: avatar,
        userId: _id
      }

      userInfo.setUserInfo({
        userName: userData.userName,
        userDescription: userData.userDescription,
        userAvatarLink: userData.userAvatarLink
      });

      popupAvatar.closePopup();
    })
    .catch((err) => {
      handleApiError(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarElement);
    });
}

//Обработчик клика на кнопку корзины
function handleDeleteButtonFunction() {
  popupForDelete.openPopup();
  popupForDelete.currentCard = this;
}

//Обработчик клика на кнопку подтверждения удаления карточки
function handleSubmitDeleteButton(card) {
  api.deleteCard(card.cardId)
    .then(() => {
      card.deleteCard();
      card = null;
    })
    .catch((err) => {
      handleApiError(err);
    });
}

//Обработчик клика на кнопку лайка
function handleLikeClick(card, cardLikeButton, cardId) {
  if (!cardLikeButton.classList.contains('card__like-button_active')) {
    api.addLikeToCard(cardId)
      .then(({likes}) => {
        updateLikeButtonAndCounter(card, likes);
      })
      .catch((err) => {
        handleApiError(err);
      });
  } else {
    api.removeLikeFromCard(cardId)
      .then(({likes}) => {
        updateLikeButtonAndCounter(card, likes);
      })
      .catch((err) => {
        handleApiError(err);
      });
  }
}

function updateLikeButtonAndCounter(card, likes) {
  card.changeLikeStatus();
  card.setLikeCounter(likes.length);
}

function createCard(cardData, userData) {
  const card = new Card(cardData, userData, '.template', () => {
    handleCardClick({
      cardLink: cardData.link,
      cardName: cardData.name
    });
  }, handleDeleteButtonFunction, handleLikeClick);

  const cardElement = card.createCard();

  cardList.addItem(cardElement);
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

function handleApiError(err) {
  console.log('Ошибка. Запрос не выполнен: ', err);
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

  formValidatorForAvatarForm.setSubmitButtonState();

  popupAvatar.inputs.forEach((input) => {
    formValidatorForAvatarForm.hideErrorForInput(input);
  })
})

