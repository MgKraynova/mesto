let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_content_name');
let inputDescription = document.querySelector('.popup__input_content_description');
let nameField = document.querySelector('.profile__name-field');
let descriptionField = document.querySelector('.profile__description-field');
let formElement = document.querySelector('.popup__form');


// Функция для открытия и закрытия попапа и для автозаполнении полей при открытии попапа
function openPopup () {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup () {
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

