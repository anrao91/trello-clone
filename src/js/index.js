// Global app controller
import Board from "./board";
import GetListDropDown from "./ui-components/listDropDown";
import { findParentNode } from "./utils/";
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
  const listContainer = findParentNode(event.target, "data-id");
  if (listContainer) {
    let listId = Number(listContainer.getAttribute("data-id"));

    let cardText = prompt("New card text") || "";

    if (cardText.trim()) {
      board.addCard(listId, cardText);
      renderBoard();
    }
  } else {
    alert("List ID not found");
  }
}

function handleListEdit(event) {
  const listContainer = findParentNode(event.target, "data-id");
  if (listContainer) {
    let listId = Number(listContainer.getAttribute("data-id"));

    let listTitle = prompt("New list title") || "";

    if (listTitle.trim()) {
      board.editList(listId, listTitle);
      console.log(board, listId, listTitle);
      renderBoard();
    }
  } else {
    alert("List ID not found");
  }
}

function handleListDelete(event) {
  const listContainer = findParentNode(event.target, "data-id");
  if (listContainer) {
    let listId = Number(listContainer.getAttribute("data-id"));

    const shouldDeleteList = confirm(
      "Are you sure, you want to delete the list?"
    );
    if (shouldDeleteList) {
      board.deleteList(listId);
      renderBoard();
    }
  } else {
    alert("List ID not found");
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

export function createEditorIcon(
  Icon,
  idName,
  id,
  eventListenerHandle,
  classNames
) {
  let editorIcon = document.createElement("img");
  editorIcon.src = Icon;
  editorIcon.setAttribute(idName, id);
  editorIcon.alt = "Editor Icon";
  editorIcon.classList.add("editor--icon", classNames);
  if (eventListenerHandle) {
    editorIcon.addEventListener("click", eventListenerHandle);
  }
  return editorIcon;
}
function onDragStart(event, cardId) {
  event.dataTransfer.setData("text", cardId);
  event.dataTransfer.effectAllowed = "move";
}

function onDragOver(event) {
  event.preventDefault();
  event.dataTransfer.effectAllowed = "move";
}
function onDragEnter(event) {
  event.preventDefault();
}
function onDrop(event) {
  console.log(event.dataTransfer.getData("text"));
}

function renderBoard() {
  $boardContainer.innerHTML = "";

  board.lists.forEach(function (list, index) {
    let $listContainer = document.createElement("div");
    $listContainer.className = "list";
    $listContainer.setAttribute("data-id", list.id);

    $listContainer.addEventListener("dragover", onDragOver);
    $listContainer.addEventListener("dragenter", onDragEnter);
    $listContainer.addEventListener("drop", onDrop);

    let $header = document.createElement("header");

    let $headerButton = document.createElement("button");
    $headerButton.textContent = list.title;

    const $listEditIcon = createEditorIcon(EditIcon, "data-id", list.id, [
      "list--edit",
    ]);

    const $listDeleteIcon = createEditorIcon(DeleteIcon, "data-id", list.id, [
      "list--delete",
    ]);

    //GetListDropDown(...dropDownItems)

    const $listEditorDropDown = GetListDropDown(
      {
        name: "Edit",
        image: $listEditIcon,
        eventHandler: handleListEdit,
      },
      { name: "Delete", image: $listDeleteIcon, eventHandler: handleListDelete }
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

      $cardButton.addEventListener("dragstart", function (event) {
        return onDragStart(event, card.id);
      });
    });

    let $addCardButton = document.createElement("button");
    $addCardButton.textContent = "Add a card...";
    $addCardButton.addEventListener("click", handleCardCreate);

    $header.appendChild($headerButton);
    $header.appendChild($listEditorDropDown);
    // $header.appendChild($listEditIcon);
    // $header.appendChild($listDeleteIcon);
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
