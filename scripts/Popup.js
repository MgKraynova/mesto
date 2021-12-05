class Popup {
  constructor(popupSelector, popupCloseButtonSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(popupCloseButtonSelector);
  }

  _closePopupByPressEsc() {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _closePopupByClickOnOverlay() { //todo исправить
      if (evt.target === this._popup) { //todo тут мб ошибка
        this.closePopup();
      }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', () => {
      this._closePopupByPressEsc();
    });
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', () => {
     this._closePopupByPressEsc();
    });
  }

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._popup.addEventListener('mousedown', () => {
      this._closePopupByClickOnOverlay();
    });
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector, popupCloseButtonSelector, imageInPopupSelector, popupImageCaptionSelector, ) {
    super(popupSelector, popupCloseButtonSelector);
    this._imageInPopup = this._popup.querySelector(imageInPopupSelector);
    this._imageCaption = this._popup.querySelector(popupImageCaptionSelector);
  }

  openImagePopup(cardLink, cardName) {
    this._imageInPopup.src = cardLink; //todo придумать, как передать кардлинк
    this._imageCaption.textContent = cardName; //todo придумать, как передать карднейм
    this._imageInPopup.alt = cardName; //todo придумать, как передать карднейм
    super.openPopup();
  }
}

export {Popup, PopupWithImage};
