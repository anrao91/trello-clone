export default class Card {
  constructor(text) {
    this.text = text;
    this.id = ++Card.lastId;
  }
}

Card.lastId = 0;
