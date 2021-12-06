import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, popupCloseButtonSelector, imageInPopupSelector, popupImageCaptionSelector, ) {
    super(popupSelector, popupCloseButtonSelector);
    this._imageInPopup = this._popup.querySelector(imageInPopupSelector);
    this._imageCaption = this._popup.querySelector(popupImageCaptionSelector);
  }

  openImagePopup(cardLink, cardName) {
    this._imageInPopup.src = cardLink;
    this._imageCaption.textContent = cardName;
    this._imageInPopup.alt = cardName;
    super.openPopup();
  }
}

export default PopupWithImage;
