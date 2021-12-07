class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._closeButton = this._formElement.parentElement.querySelector(this._config.closeButtonSelector);
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showErrorForInput(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.errorClass);
    errorElement.textContent = input.validationMessage;
  }

  hideErrorForInput(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.errorClass);
    errorElement.textContent = ' ';
  }

  _checkInputValidation() {
    this._inputs.forEach((input) => {
      if (!input.validity.valid) {
        this._showErrorForInput(input);
      } else {
        this.hideErrorForInput(input);
      }
    })
  }

  _cancelDefaultFormSubmit(evt) {
    evt.preventDefault();
  }

  setSubmitButtonState() {
    this._submitButton.disabled = !this._formElement.checkValidity();
    this._submitButton.classList.toggle(this._config.submitButtonInactiveStateClass, !this._formElement.checkValidity());
  }

  _addFormListeners() {
    this._inputs.forEach((input) => input.addEventListener('input', () => {
      this._checkInputValidation();
      this.setSubmitButtonState();
    }));

    this._formElement.addEventListener('submit', this._cancelDefaultFormSubmit);
  }

  enableValidation() {
    this._addFormListeners();
  }
}

export default FormValidator;
