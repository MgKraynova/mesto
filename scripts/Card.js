import {openPopupImage} from './index.js';

class Card {
  constructor(cardName, cardLink, cardSelector) {
    this._name = cardName;
    this._link = cardLink;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _makeLikeActive() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.querySelector('.card__delete-button').parentElement.remove();
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
      openPopupImage(this._cardImage.alt, this._cardImage.src)
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;

