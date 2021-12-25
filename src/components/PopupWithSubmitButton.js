import Popup from "./Popup.js";

class PopupWithSubmitButton extends Popup {
  constructor({popupSelector, handleSubmitFunction}) {
    super(popupSelector);
    this._handleSubmitFunction = handleSubmitFunction;
    this._submitButton = this._popup.querySelector('.popup__button');
    this.currentCard = null;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', () => {
      this._handleSubmitFunction(this.currentCard);
      super.closePopup();
    })
  }
}

export default PopupWithSubmitButton;

