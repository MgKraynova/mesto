class Card {
  constructor(cardData, userData, cardSelector, handleCardClickFunction, handleDeleteButtonFunction,
              handleLikeClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._numberOflikes = cardData.likes.length;
    this._likes = cardData.likes;
    this.cardId = cardData._id;
    this._ownerCardId = cardData.owner._id;

    this._userId = userData.userId;

    this._cardSelector = cardSelector;

    this._cardImage = '';
    this._likeButton = '';
    this._deleteButton = '';

    this._handleCardClickFunction = handleCardClickFunction;
    this._handleDeleteButtonFunction = handleDeleteButtonFunction;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  changeLikeStatus() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _checkIfCardWasLikedByUser() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this.changeLikeStatus();
      }
    });
  }

  _hideDeleteButton() {
    if (!(this._userId === this._ownerCardId)) {
      this._deleteButton.classList.add('card__delete-button_invisible');
    }
  }

  setLikeCounter(likesNumber) {
    this._element.querySelector('.card__counter').textContent = likesNumber;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this, this._likeButton, this.cardId);
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonFunction();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClickFunction(this._cardImage.alt, this._cardImage.src)
    });
  }

  createCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this.setLikeCounter(this._numberOflikes);
    this._checkIfCardWasLikedByUser();

    this._hideDeleteButton();

    return this._element;
  }
}

export default Card;

