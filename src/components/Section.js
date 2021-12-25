class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardsData, userData) {
    cardsData.reverse().forEach((card) => {
      this._renderer(card, userData);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;



