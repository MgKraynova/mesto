import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// ПЕРЕМЕННЫЕ
// Элементы блока profile на html странице
const nameField = document.querySelector('.profile__name-field');
const descriptionField = document.querySelector('.profile__description-field');
const editButton = document.querySelector('.profile__edit-button');

// Элементы попапа профиля
const popupProfile = document.querySelector('.popup_type_profile');
const inputName = document.querySelector('.popup__input_content_name');
const inputDescription = document.querySelector(
  '.popup__input_content_description'
);
const editProfileForm = document.querySelector('.popup__form_type_profile');

// Элементы попапа места
const addButton = document.querySelector('.profile__add-button'); // кнопка добавления новой карточки места на страницу

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

// function clearPlacePopupInputWhenPopupOpens() { //todo удалить
//   inputImageLink.value = '';
//   inputPlaceName.value = '';
// }

function openPopupWithForm(popup, formValidator) {
  formValidator.setSubmitButtonState();

  //openPopup(popup); //todo удалить
}

function openProfilePopup(popup, formValidator) {
  autoFillProfileInputWhenPopupOpens();
  openPopupWithForm(popup, formValidator);
}

// function openPopupPlace(popup, formValidator) {
//   clearPlacePopupInputWhenPopupOpens(); //todo удалить
//   openPopupWithForm(popup, formValidator);
// }

function editProfileInfo(evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  //closePopup(popupProfile); //todo
}

function handleCardClick(cardLink, cardName) {
  const popupWithImage = new PopupWithImage('.popup_type_image',
    '.popup__close-button', '.popup__place-image',
    '.popup__caption');
  popupWithImage.openImagePopup(cardLink, cardName);  //todo
  popupWithImage.setEventListeners();
}

function handleFormPlaceSubmit(evt, inputValues) {
  evt.preventDefault();
  const card = new Card(inputValues['popup-input-place-name'], inputValues['popup-input-image-link'], '.template', () => {
    handleCardClick(inputValues['popup-input-image-link'], inputValues['popup-input-place-name']);
  });
  const cardElement = card.createCard();
  cardsElement.prepend (cardElement);
}

// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ

editButton.addEventListener('click', () => openProfilePopup(popupProfile, formValidatorForProfileForm));

//closeButtonProfile.addEventListener('click', () => closePopup(popupProfile)); //todo

editProfileForm.addEventListener('submit', editProfileInfo);

// СОЗДАНИЕ ПЕРВЫХ КАРТОЧЕК
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


const popupPlace = new PopupWithForm('.popup_type_place', '.popup__close-button', '.popup__input', '.popup__button', handleFormPlaceSubmit);
popupPlace.setEventListeners();

addButton.addEventListener('click', () => {
  formValidatorForNewPlaceForm.setSubmitButtonState();
  popupPlace.openPopup();
})

