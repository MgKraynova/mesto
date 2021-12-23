import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitFunction}) {
    super(popupSelector);
    this.inputs = this._popup.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._handleSubmitFunction = handleSubmitFunction;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this.inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', () => {
      this._handleSubmitFunction(this._getInputValues());
      this.closePopup();
    })
  }

  closePopup() {
    this._formElement.reset();
    super.closePopup();
  }
}

export default PopupWithForm;



