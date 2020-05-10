// Global app controller
import Board from "./board";
import EditIcon from "../images/editIcon.svg";
import DeleteIcon from "../images/deleteIcon.svg";

let $boardContainer = document.querySelector(".container");

let board = new Board();

function handleListCreate() {
  let listTitle = prompt("New list title") || "";

  if (listTitle.trim()) {
    board.addList(listTitle);
    renderBoard();
  }
}

function handleCardCreate(event) {
  let $listContainer = event.target.parentNode;
  let listId = Number($listContainer.getAttribute("data-id"));

  let cardText = prompt("New card text") || "";

  if (cardText.trim()) {
    board.addCard(listId, cardText);
    renderBoard();
  }
}

function handleListEdit(event) {
  let $listContainer = event.target.parentNode.parentNode;
  let listId = Number($listContainer.getAttribute("data-id"));

  let listTitle = prompt("New list title") || "";

  if (listTitle.trim()) {
    board.editList(listId, listTitle);
    renderBoard();
  }
}

function handleListDelete(event) {
  let $listContainer = event.target.parentNode.parentNode;
  let listId = Number($listContainer.getAttribute("data-id"));

  const shouldDeleteList = confirm(
    "Are you sure, you want to delete the list?"
  );
  if (shouldDeleteList) {
    board.deleteList(listId);
    renderBoard();
  }
}

function handleCardEdit(event) {
  const cardId = Number(event.target.getAttribute("card-id"));

  let cardText = prompt("New card text") || "";

  if (cardText.trim()) {
    board.editCard(cardId, cardText);
    renderBoard();
  }
}

function handleCardDelete(event) {
  const cardId = Number(event.target.getAttribute("card-id"));

  const shouldDeleteCard = confirm(
    "Are you sure, you want to delete the card?"
  );
  if (shouldDeleteCard) {
    board.deleteCard(cardId);
    renderBoard();
  }
}

function createEditorIcon(Icon, idName, id, eventListenerHandle, classNames) {
  let editorIcon = document.createElement("img");
  editorIcon.src = Icon;
  editorIcon.setAttribute(idName, id);
  editorIcon.classList.add("editor--icon", classNames);
  editorIcon.addEventListener("click", eventListenerHandle);
  return editorIcon;
}

function renderBoard() {
  $boardContainer.innerHTML = "";

  board.lists.forEach(function (list, index) {
    let $listContainer = document.createElement("div");
    $listContainer.className = "list";
    $listContainer.setAttribute("data-id", list.id);

    let $header = document.createElement("header");

    let $headerButton = document.createElement("button");
    $headerButton.textContent = list.title;

    const $listEditIcon = createEditorIcon(
      EditIcon,
      "data-id",
      list.id,
      handleListEdit,
      ["list--edit"]
    );

    const $listDeleteIcon = createEditorIcon(
      DeleteIcon,
      "data-id",
      list.id,
      handleListDelete,
      ["list--delete"]
    );

    let $cardUl = document.createElement("ul");

    list.cards.forEach(function (card) {
      let $cardLi = document.createElement("li");

      let $cardButton = document.createElement("button");
      $cardButton.draggable = true;

      const $cardEditIcon = createEditorIcon(
        EditIcon,
        "card-id",
        card.id,
        handleCardEdit,
        ["card--edit"]
      );
      const $cardDeleteIcon = createEditorIcon(
        DeleteIcon,
        "card-id",
        card.id,
        handleCardDelete,
        ["card--delete"]
      );

      $cardButton.textContent = card.text;
      $cardButton.setAttribute("card-id", card.id);
      $cardButton.classList.add("card");

      $cardLi.appendChild($cardButton);
      $cardLi.appendChild($cardEditIcon);
      $cardLi.appendChild($cardDeleteIcon);
      $cardUl.appendChild($cardLi);

      $cardButton.ondragstart = function (evt) {
        dragTracker.id = card.id;
        evt.dataTransfer.effectAllowed = "move";
      };

      $cardButton.ondragover = function (evt) {
        evt.preventDefault();
        if (dragTracker.id) {
          console.log(dragTracker);
        }
      };

      $cardButton.ondrop = function (evt) {
        let id = dragTracker.id,
          targetId = this.getAttribute("card-id"), // 'this' is target of drop
          source = list.cards[id],
          target = list.cards[targetId];

        if (id === targetId) {
          return;
        }
        console.log(source, target, "source, target from ondrop");

        // source.list.cardsNode.removeChild(source.card.node);
        // target.list.cardsNode.insertBefore(
        //   source.card.node,
        //   target.card.node
        // );

        // board.reregisterSubsequent(source.list, source.index + 1, -1);
        // source.list.cards.splice(source.index, 1);

        // board.reregisterSubsequent(target.list, target.index + 1, 1);
        // target.list.cards.splice(target.index + 1, 0, source.card);

        // source.card.list = target.list;
        // board.registerCard(source.card, target.index + 1);
        evt.preventDefault();
      };
    });

    let $addCardButton = document.createElement("button");
    $addCardButton.textContent = "Add a card...";
    $addCardButton.addEventListener("click", handleCardCreate);

    $header.appendChild($headerButton);
    $header.appendChild($listEditIcon);
    $header.appendChild($listDeleteIcon);
    $listContainer.appendChild($header);
    $listContainer.appendChild($cardUl);
    $listContainer.appendChild($addCardButton);
    $boardContainer.appendChild($listContainer);
  });

  let $addListContainer = document.createElement("div");
  $addListContainer.className = "list add";

  let $addListButton = document.createElement("button");
  $addListButton.textContent = "+ Add another list";
  $addListButton.addEventListener("click", handleListCreate);

  $addListContainer.appendChild($addListButton);
  $boardContainer.appendChild($addListContainer);
}

renderBoard();
