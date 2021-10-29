// ПЕРЕМЕННЫЕ

// Элементы блока profile на html странице
const nameField = document.querySelector(".profile__name-field");
const descriptionField = document.querySelector(".profile__description-field");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки места на страницу

// Элементы попапа профиля
const popupProfile = document.querySelector(".popup_type_profile");
const closeButtonProfile = document.querySelector(
  ".popup__close-button_type_profile"
);
const inputName = document.querySelector(".popup__input_content_name");
const inputDescription = document.querySelector(
  ".popup__input_content_description"
);
const editProfileForm = document.querySelector(".popup__form_type_profile");

// Элементы попапа места
const popupPlace = document.querySelector(".popup_type_place");
const closeButtonPlace = document.querySelector(
  ".popup__close-button_type_place"
);
const inputPlaceName = document.querySelector(
  ".popup__input_content_place-name"
);
const inputImageLink = document.querySelector(
  ".popup__input_content_image-link"
);
const newPlaceForm = document.querySelector(".popup__form_type_place");

// Элементы попапа с увеличенным изображением места
const popupImage = document.querySelector(".popup_type_image");
const bigImageInPopup = document.querySelector(".popup__place-image");
const popupImageCaption = document.querySelector(".popup__caption");
const closeButtonPopupImage = document.querySelector(
  ".popup__close-button_type_image-popup"
);

// Массивы форм и полей ввода
const formElements = Array.from(document.querySelectorAll('.popup__form'));
const formInputs = Array.from(document.querySelectorAll('.popup__input'));



// Прочие переменные
const cardTemplate = document.querySelector(".template").content; // шаблон карточки из template
const cards = document.querySelector(".cards"); // блок cards

// ФУНКЦИИ

// Функция для автоматической подстановки данных профайла в попап редактирования профиля
function autoFillProfileInputWhenPopupOpens() {
  inputName.value = nameField.textContent;
  inputDescription.value = descriptionField.textContent;
}

// Функция для очистки полей формы попапа места. Будет использоваться при открытии попапа места, если до этого пользователь ввел данные,
// но не нажал на создание карточки, а закрыл попап
function clearPlacePopupInputWhenPopupOpens() {
  inputImageLink.value = "";
  inputPlaceName.value = "";
}

// Функции для открытия и для закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция для открытия попапа профайла
function openProfilePopup(popup) {
  autoFillProfileInputWhenPopupOpens();
  openPopup(popup);
}

// Функция для открытия попапа места
function openPopupPlace(popup) {
  clearPlacePopupInputWhenPopupOpens();
  openPopup(popup);
}

// Функция для перезаписи значений профайла при нажатии кнопки "Сохранить"
function editProfileInfo(evt) {
  evt.preventDefault();
  nameField.textContent = inputName.value;
  descriptionField.textContent = inputDescription.value;
  closePopup(popupProfile);
}

// Функция для постановки лайков на карточки и их удаления
function makeLikeActive(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}

// Функция для открытия попапа с картинкой
function openPopupImage(cardName, cardLink) {
  bigImageInPopup.src = cardLink;
  popupImageCaption.textContent = cardName;
  bigImageInPopup.alt = cardName;

  openPopup(popupImage);
}

// Функция для добавления карточкам слушателей событий
function addEventListenerToNewCard(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  likeButton.addEventListener("click", makeLikeActive); // добавление слушателя события на кнопку лайк у карточек
  deleteButton.addEventListener("click", deleteCard); // добавление слушателя события на кнопку "удалить" у карточек
  cardImage.addEventListener("click", () =>
    openPopupImage(cardImage.alt, cardImage.src)
  ); // добавление слушателя события на картинку для открытия попапа с картинкой
}

// Функция для cоздания карточки
function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  addEventListenerToNewCard(cardElement);

  return cardElement;
}

// Функция для возможности добавлять новые карточки места с помощью попапа
function addNewCardFromPopup(evt) {
  evt.preventDefault();
  cards.prepend(createCard(inputPlaceName.value, inputImageLink.value));
  closePopup(popupPlace);
}

// Функция для добавлению поля ввода класса с ошибкой
function showErrorForInput(input) {
  input.classList.add('popup__input_type_error');
}

// Функция для удаления у поля ввода класса с ошибкой
function hideErrorForInput(input) {
  input.classList.remove('popup__input_type_error');
}

// Функция для проверки валидности поля
function checkInputValidity() {



  formInputs.forEach( (input) => {
    if (input.validity.valid) {
      hideErrorForInput(input);
    } else {
      showErrorForInput(input)
    }
  });
}

// Перебор массива полей ввода для добавления каждому поля слушателя событий
formInputs.forEach( (input) => {
  input.addEventListener('input', checkInputValidity);
})






// ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ
addButton.addEventListener("click", () => openPopupPlace(popupPlace));

editButton.addEventListener("click", () => openProfilePopup(popupProfile));

closeButtonProfile.addEventListener("click", () => closePopup(popupProfile));

editProfileForm.addEventListener("submit", editProfileInfo);

addButton.addEventListener("click", () => openPopup(popupPlace));

closeButtonPlace.addEventListener("click", () => closePopup(popupPlace));

newPlaceForm.addEventListener("submit", addNewCardFromPopup);

closeButtonPopupImage.addEventListener("click", () => closePopup(popupImage));

// ПЕРЕБОР МАССИВА ДЛЯ СОЗДАНИЯ ПЕРВЫХ 6 КАРТОЧЕК
initialCards.forEach((item) => cards.prepend(createCard(item.name, item.link))); // создание 6 первоначальных карточек


