class Card {
  constructor(cardName, cardLink, cardSelector, openPopupImageFunction) {
    this._name = cardName;
    this._link = cardLink;
    this._cardSelector = cardSelector;
    this._openPopupImageFunction = openPopupImageFunction;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _makeLikeActive() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._makeLikeActive();
    })

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._openPopupImageFunction(this._cardImage.alt, this._cardImage.src)
    });
  }

  createCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;

