// Массивы форм и полей ввода
// const formConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   errorClass: 'popup__input_type_error',
//   submitButtonSelector: '.popup__button',
//   submitButtonInactiveStateClass: 'popup__button_state_inactive'
// }

// ФУНКЦИИ

// Функция для добавлению поля ввода класса с ошибкой
function showErrorForInput(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
}

// Функция для удаления у поля ввода класса с ошибкой
function hideErrorForInput(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.errorClass);
  errorElement.textContent = ' ';
}

// Функция для проверки валидности полей формы, добавления и удаления сообщения об ошибке
function checkInputValidation(input, form, config) {
  if (!input.validity.valid) {
    showErrorForInput(input, form, config);
  } else {
    hideErrorForInput(input, form, config);
  }
}

// Функция для отмены стандартного поведения при нажатии на кнопку submit
function cancelDefaultFormSubmit(evt) {
  evt.preventDefault();
}

// Функция для установления состояния кнопки в зависимости от валидности формы
function setSubmitButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.disabled = !form.checkValidity();
  submitButton.classList.toggle(config.submitButtonInactiveStateClass, !form.checkValidity());
}

// Функция для добавления слушателей событий форме
function addFormListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => input.addEventListener('input',
    () => checkInputValidation(input, form, config))); // проверка валидации каждого поля формы

  form.addEventListener('submit', cancelDefaultFormSubmit); // отмена стандартного поведения при нажатии на кнопку submit
  form.addEventListener('input', () => setSubmitButtonState(form, config)); // установление состоянием кнопки в зависимости от валидности формы
}

// Функция для проверки валидности всей формы
function checkFormValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => addFormListeners(form, config));
}

// Вызов функции по проверке валидации формы
checkFormValidation(formConfig);
