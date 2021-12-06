class Popup {
  constructor(popupSelector, popupCloseButtonSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(popupCloseButtonSelector);
  }

  _closePopupByPressEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _closePopupByClickOnOverlay(evt) {
      if (evt.target === this._popup) {
        this.closePopup();
      }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._closePopupByPressEsc(evt);
    });
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
     this._closePopupByPressEsc(evt);
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._closePopupByClickOnOverlay(evt);
    });
  }
}

export default Popup;
