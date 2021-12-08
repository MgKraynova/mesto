import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageInPopup = this._popup.querySelector('.popup__place-image');
    this._imageCaption = this._popup.querySelector('.popup__caption');
  }

  openImagePopup({cardLink, cardName}) {
    this._imageInPopup.src = cardLink;
    this._imageCaption.textContent = cardName;
    this._imageInPopup.alt = cardName;

    super.openPopup();
  }
}

export default PopupWithImage;
