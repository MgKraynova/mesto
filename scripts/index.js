let popupProfile = document.querySelector('.popup_type_profile');
let popupPlace = document.querySelector('.popup_type_place');

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let closeButtonProfile = document.querySelector('.popup__close-button_type_profile');
let closeButtonPlace = document.querySelector('.popup__close-button_type_place');

let inputName = document.querySelector('.popup__input_content_name');
let inputDescription = document.querySelector('.popup__input_content_description');
let nameField = document.querySelector('.profile__name-field');
let descriptionField = document.querySelector('.profile__description-field');
let formElement = document.querySelector('.popup__form');

let likeButton = document.querySelectorAll('.card__like-button');


// Функция для открытия попапа профайла

function OpenProfilePopup () {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
  popupProfile.classList.add('popup_opened');
}

editButton.addEventListener('click', OpenProfilePopup);

// Функция для закрытия попапа профайла
function closeProfilePopup () {
  popupProfile.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', closeProfilePopup );

// Функция для перезаписи значений профайла при нажатии кнопки "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closeProfilePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

// Функция для открытия попапа добавления карточки места
function openPlacePopup () {
  popupPlace.classList.add('popup_opened');
}

addButton.addEventListener('click', openPlacePopup);

// Функция для закрытия попапа места
function closePlacePopup () {
  popupPlace.classList.remove('popup_opened');
}

closeButtonPlace.addEventListener('click', closePlacePopup);

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

// Функция для постановки лайков на карточки

function likeActive (evt) {
evt.target.classList.toggle('card__like-button_active');
}

 likeButton.forEach((item) => { item.addEventListener('click', likeActive) });







