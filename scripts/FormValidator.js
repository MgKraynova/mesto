export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _showErrorForInput() {
    this._inputs.forEach((input) => {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this._config.errorClass);
      errorElement.textContent = input.validationMessage;
    } )
  }

  _hideErrorForInput() {
    this._inputs.forEach((input) => {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`); //todo вынести куда нибудь эту переменную
      input.classList.remove(this._config.errorClass);
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

  _cancelDefaultFormSubmit(evt) {
    evt.preventDefault();
  }

  _setSubmitButtonState() {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    submitButton.disabled = !this._formElement.checkValidity();
    submitButton.classList.toggle(this._config.submitButtonInactiveStateClass, !this._formElement.checkValidity());
  }

  _addFormListeners() {
    this._inputs.forEach((input) => input.addEventListener('input', () => {
      input._checkInputValidation();
      })); // проверка валидации каждого поля формы

    this._formElement.addEventListener('submit', () => {
      this._formElement._cancelDefaultFormSubmit(evt); //todo проверить, к чему это применяется
    }); // отмена стандартного поведения при нажатии на кнопку submit
    this._formElement.addEventListener('input', () => {
      this._formElement._setSubmitButtonState(); //todo проверить, к чему это применяется
    }); // установление состоянием кнопки в зависимости от валидности формы
  }

  enableValidation() {
    this._formElement._addFormListeners();
    return this._formElement;
  }
}


