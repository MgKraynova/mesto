import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitFunction}) {
    super(popupSelector);
    this.inputs = this._popup.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._handleSubmitFunction = handleSubmitFunction;
  }

  _getInputValues() {
    this.inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    const submitButton = this._popup.querySelector('.popup__button');

    submitButton.addEventListener('click', (evt) => {
      this._handleSubmitFunction(evt, this._getInputValues());
      this.closePopup();
    })
  }

  closePopup() {
    const formElement = this._popup.querySelector('.popup__form');
    formElement.reset();
    super.closePopup();
  }
}

export default PopupWithForm;



