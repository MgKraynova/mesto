import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openImagePopup({cardLink, cardName}) {
  const imageInPopup = this._popup.querySelector('.popup__place-image');
  const imageCaption = this._popup.querySelector('.popup__caption');

    imageInPopup.src = cardLink;
    imageCaption.textContent = cardName;
    imageInPopup.alt = cardName;

    super.openPopup();
  }
}

export default PopupWithImage;
