export default (...dropDownItems) => {
  let listEditorDropDown = document.createElement("div");
  listEditorDropDown.classList.add("dropdown");

  let dropDownBtn = document.createElement("button");
  dropDownBtn.classList.add("dropbtn");
  const dropBtnTxt = document.createTextNode("...");
  dropDownBtn.appendChild(dropBtnTxt);

  listEditorDropDown.appendChild(dropDownBtn);

  const dropDownContent = document.createElement("div");
  dropDownContent.classList.add("dropdown-content");
  dropDownItems.map((dropDownItem) => {
    let dropDownContentBlock = document.createElement("div");
    dropDownContentBlock.addEventListener("click", dropDownItem.eventHandler);
    dropDownContentBlock.classList.add("dropdown-content-block");
    dropDownContentBlock.appendChild(
      document.createTextNode(dropDownItem.name)
    );
    dropDownContentBlock.appendChild(dropDownItem.image);
    dropDownContent.appendChild(dropDownContentBlock);
  });

  listEditorDropDown.appendChild(dropDownContent);

  return listEditorDropDown;
};
