const formConfig = {
  // formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  submitButtonInactiveStateClass: 'popup__button_state_inactive'
}

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _showErrorForInput() {
    this._inputs.forEach((input) => {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(config.errorClass);
      errorElement.textContent = input.validationMessage;
    } )
  }

  _hideErrorForInput() {
    this._inputs.forEach((input) => {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(config.errorClass);
      errorElement.textContent = ' ';
    })
  }

  _checkInputValidation() {
    this._inputs.forEach((input) => {
      if (!input.validity.valid) {
        input._showErrorForInput();
      } else {
        input._hideErrorForInput();
      }
    })
  }

  _cancelDefaultFormSubmit() {

  }

  _setSubmitButtonState() {

  }

  _addFormListeners() {

    this._inputs.forEach((input) => input.addEventListener('input', () => {
      input._checkInputValidation();
      })); // проверка валидации каждого поля формы

    this._formElement.addEventListener('submit', () => {
      this._formElement._cancelDefaultFormSubmit(); //todo проверить, к чему это применяется
    }); // отмена стандартного поведения при нажатии на кнопку submit
    this._formElement.addEventListener('input', () => {
      this._formElement._setSubmitButtonState(); //todo проверить, к чему это применяется
    }); // установление состоянием кнопки в зависимости от валидности формы
  }

  enableValidation() {
    this._formElement._addFormListeners();
  }
}
//todo убрать new из названия переменной
const newPlaceForm = document.querySelector('.popup__form_type_place');
const newPlaceFormValidator = new FormValidator (formConfig, newPlaceForm);
newPlaceFormValidator.enableValidation();

const newProfileForm = document.querySelector('.popup__form_type_profile');
const newProfileFormValidator = new FormValidator (formConfig, newProfileForm);
newProfileFormValidator.enableValidation();

