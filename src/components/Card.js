class Card {
  constructor(cardName, cardLink, cardSelector, handleCardClickFunction, numberOfLikes = 0, handleDeleteButtonFunction, cardID,
              handleLikeClick) {
    this._name = cardName;
    this._link = cardLink;
    this._likes = numberOfLikes;
    this._cardSelector = cardSelector;
    this._handleCardClickFunction = handleCardClickFunction;
    this._handleDeleteButtonFunction = handleDeleteButtonFunction;
    this.cardId = cardID;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _makeLikeActive() {
    const cardLikeButton = this._element.querySelector('.card__like-button');

    cardLikeButton.classList.toggle('card__like-button_active');

    this._handleLikeClick(cardLikeButton, this.cardId);
  }

  _setLikeCounter() {
    this._element.querySelector('.card__counter').textContent = this._likes;
  }

  _updateLikeCounter() {
    if (!this._element.querySelector('.card__like-button').classList.contains('card__like-button_active')) {
      this._likes = this._likes - 1;
    } else {
      this._likes = this._likes + 1;
    }

    this._setLikeCounter();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._makeLikeActive();
      this._updateLikeCounter();
    })

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonFunction();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClickFunction(this._cardImage.alt, this._cardImage.src)
    });
  }

  createCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setLikeCounter();

    return this._element;
  }
}

export default Card;

