

// Функция для открытия и для закрытия попапа профайла
let inputName = document.querySelector('.popup__input_content_name');
let inputDescription = document.querySelector('.popup__input_content_description');
let popupProfile = document.querySelector('.popup_type_profile');
let editButton = document.querySelector('.profile__edit-button');
let closeButtonProfile = document.querySelector('.popup__close-button_type_profile');
let nameField = document.querySelector('.profile__name-field');
let descriptionField = document.querySelector('.profile__description-field');

function OpenProfilePopup () {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
  popupProfile.classList.add('popup_opened');
}

editButton.addEventListener('click', OpenProfilePopup);

function closeProfilePopup () {
  popupProfile.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', closeProfilePopup );

// Функция для перезаписи значений профайла при нажатии кнопки "Сохранить"
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closeProfilePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

// Функция для отображения 6 карточек мест при загрузке страницы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('.template').content;
const cards = document.querySelector('.cards');

function addInitialCards (item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    cards.prepend(cardElement);
};

initialCards.forEach(addInitialCards);

// Функция для открытия и закрытия попапа добавления карточки места
let popupPlace = document.querySelector('.popup_type_place');
let addButton = document.querySelector('.profile__add-button');
let closeButtonPlace = document.querySelector('.popup__close-button_type_place');

function openPlacePopup () {
  popupPlace.classList.add('popup_opened');
}

addButton.addEventListener('click', openPlacePopup);

function closePlacePopup () {
  popupPlace.classList.remove('popup_opened');
}

closeButtonPlace.addEventListener('click', closePlacePopup);

// Функция для возможности добавлять карточки места

let newPlaceForm = document.querySelector('.popup__form_type_place');
let placeNameField = document.querySelector('.popup__input_content_place-name');
let imageLinkField = document.querySelector('.popup__input_content_image-link');



function addNewPlace (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = imageLinkField.value;
  cardElement.querySelector('.card__title').textContent = placeNameField.value;
  cards.prepend(cardElement);
  closePlacePopup ();
  imageLinkField.value = '';
  placeNameField.value = '';
  cardElement.querySelector('.card__like-button').addEventListener('click', likeActive); // добавление слушателя события на кнопку лайк у новой карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); // добавление слушателя события на кнопку "удалить" у новой карточки
};

newPlaceForm.addEventListener('submit', addNewPlace);

// Функция для постановки лайков на карточки

let likeButton = cards.querySelectorAll('.card__like-button');

function likeActive (evt) {
evt.target.classList.toggle('card__like-button_active');
}

likeButton.forEach((item) => { item.addEventListener('click', likeActive) });

// Функция удаления карточки

let deleteButton = document.querySelectorAll('.card__delete-button');

function deleteCard (evt) {
  evt.target.parentElement.remove();
}

deleteButton.forEach((item) => { item.addEventListener('click', deleteCard) });





