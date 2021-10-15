// let popup = document.querySelector('.popup');
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



// Функция для открытия попапа профайла

function OpenProfilePopup () {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
  popupProfile.classList.add('popup_opened');
}

editButton.addEventListener('click', OpenProfilePopup);

// Фуекция для закрытия попапа профайла
function closeProfilePopup () {
  popupProfile.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', closeProfilePopup );

// Функция для открытия попапа добавления карточки места
function openPlacePopup () {
  popupPlace.classList.add('popup_opened');
}

addButton.addEventListener('click', openPlacePopup);

// Фуекция для закрытия попапа места
function closePlacePopup () {
  popupPlace.classList.remove('popup_opened');
}

closeButtonPlace.addEventListener('click', closePlacePopup);




// Функция для перезаписи значений профайла при нажатии кнопки "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closeProfilePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);





