const cards = document.querySelector('.cards'); // блок cards


class Card {
  constructor(cardName, cardLink, cardSelector) {
    this._name = cardName;
    this._link = cardLink;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Метод для постановки лайков на карточки и их удаления
  _makeLikeActive() {
   this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Метод удаления карточки
  _deleteCard() {
  this._element.querySelector('.card__delete-button').parentElement.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._makeLikeActive();
    })

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
  }

  createCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики

    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }
}



//Для каждой карточки создайте экземпляр класса Card.
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template'); // передаём объект аргументом
  const cardElement = card.createCard();
  cards.prepend(cardElement);
})
