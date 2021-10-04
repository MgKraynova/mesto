let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input-name');
let inputDescription = document.querySelector('.popup__input-description');
let nameField = document.querySelector('.profile__name-field');
let descriptionField = document.querySelector('.profile__description-field');
let saveButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__form');


// Функция для открытия и закрытия попапа и для автозаполнении полей при открытии попапа
function openPopup () {
  popup.classList.add('popup_opened');
  inputName.setAttribute('value', nameField.textContent);
  inputDescription.setAttribute('value', descriptionField.textContent);
}

editButton.addEventListener('click', openPopup);

function closePopup () {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Функция для перезаписи значений профайла при нажатии кнопки "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);

