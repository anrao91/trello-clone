import List from "./list";
export default class Board {
  constructor() {
    this.id = ++Board.lastId;
    this.lists = [];
  }

  addList(text) {
    var list = new List(text);
    this.lists.push(list);
  }

  findList(listId) {
    return this.lists.find(function (list) {
      return listId === list.id;
    });
  }

  editList(listId, newTitle) {
    var list = this.findList(listId);
    if (list) {
      list.title = newTitle;
    }
  }

  addCard(listId, cardText) {
    var list = this.findList(listId);
    if (list) {
      list.addCard(cardText);
    }
  }

  editCard(cardId, cardText) {
    this.lists.forEach(function (list) {
      var card = list.findCard(cardId);
      if (card) {
        card.text = cardText;
      }
    });
  }
  deleteCard(cardId) {
    this.lists.forEach(function (list) {
      var card = list.findCard(cardId);
      if (card) {
        list.deleteCard();
        return;
      }
    });
  }
}

Board.lastId = 0;
