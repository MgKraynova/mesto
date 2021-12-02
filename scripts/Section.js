class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector; //todo удалить, если не требуется
    this._container = document.querySelector(containerSelector);
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.

  renderItems() {
    function addCard(cardName, imageLink) {
      const card = new Card(cardName, imageLink, '.template', openPopupImage);
      const cardElement = card.createCard();
      cardsElement.prepend (cardElement);
    }

    initialCards.forEach((item) => {
      addCard(item.name, item.link);
    });

  }

  addItem() { //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.

  }
}
