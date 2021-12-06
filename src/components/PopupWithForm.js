import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, popupCloseButtonSelector, popupInputSelector, popupSubmitButtonSelector, handleSubmitFunction ) {
    super(popupSelector, popupCloseButtonSelector);
    this._inputs = this._popup.querySelectorAll(popupInputSelector);
    this._inputValues = { };
    this._submitButton = this._popup.querySelector(popupSubmitButtonSelector);
    this._handleSubmitFunction = handleSubmitFunction;
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      this._handleSubmitFunction(evt, this._getInputValues());
      this._inputValues = {};
      this.closePopup();
    })
  }

  closePopup() {
    this._inputs.forEach((input) => {
      input.value = '';
    });
    super.closePopup();
  }
}
export default PopupWithForm;



