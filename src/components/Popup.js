class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupByPressEsc = this._closePopupByPressEsc.bind(this);
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
    document.addEventListener('keydown', this._closePopupByPressEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupByPressEsc);
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._closePopupByClickOnOverlay(evt);
    });
  }
}

export default Popup;
