import Card from "./card";
export default class List {
  constructor(title) {
    this.title = title;
    this.id = ++List.lastId;
    this.cards = [];
  }
  addCard(text) {
    var card = new Card(text);
    this.cards.push(card);
  }

  findCard(cardId) {
    return this.cards.find(function (card) {
      if (cardId === card.id) {
        return card;
      }
    });
  }
  deleteCard(cardId) {
    this.cards.splice(
      this.cards.findIndex((card) => card.id === cardId),
      1
    );
  }
}

List.lastId = 0;
