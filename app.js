let myLibrary = [];
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readYes = document.querySelector("#read-yes");
const readNo = document.querySelector("#read-no");
const addBtn = document.querySelector("#add-book");
const bookTable = document.querySelector("#book-table");
const deleteButtons = document.querySelectorAll(".delete");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function readCheck() {
  if (readYes.checked) return true;
  else if (readNo.checked) return false;
}

function validate() {
  let a = "";
  if (title.value == "" || author.value == "" || pages.value == "") a += "fill";
  if (
    title.value.length > 20 ||
    author.value.length > 20 ||
    pages.value.length > 20
  )
    a += "length";
  return a;
}

function displayBooks() {
  while (bookTable.firstChild) {
    bookTable.removeChild(bookTable.lastChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    let newRow = document.createElement("tr");
    bookTable.append(newRow);
    let titleCell = document.createElement("td");
    titleCell.innerText = myLibrary[i].title;
    newRow.append(titleCell);
    let authorCell = document.createElement("td");
    authorCell.innerText = myLibrary[i].author;
    newRow.append(authorCell);
    let pagesCell = document.createElement("td");
    pagesCell.innerText = myLibrary[i].pages;
    newRow.append(pagesCell);
    let readCell = document.createElement("td");
    if (myLibrary[i].read) readCell.innerText = "Read";
    else if (!myLibrary[i].read) readCell.innerText = "Not read";
    newRow.append(readCell);
    let delBtnCell = document.createElement("td");
    let delBtn = document.createElement("div");
    let delIcon = document.createElement("i");
    delIcon.style = "cursor: pointer;";
    delIcon.setAttribute("class", "fa-solid fa-trash-can fa-2x");
    delBtn.setAttribute("data-number", i);
    newRow.append(delBtnCell);
    delBtnCell.append(delBtn);
    delBtn.append(delIcon);
    delBtn.addEventListener("click", () => {
      let dataNumber = delBtn.getAttribute("data-number");
      myLibrary.splice(dataNumber, 1);
      displayBooks();
    });
    let readBtnCell = document.createElement("td");
    let readBtn = document.createElement("button");
    readBtn.innerText = "Change read status";
    readBtn.setAttribute("data-number", i);
    newRow.append(readBtnCell);
    readBtnCell.append(readBtn);
    readBtn.addEventListener("click", () => {
      let dataNumber = readBtn.getAttribute("data-number");
      myLibrary[dataNumber].read = !myLibrary[dataNumber].read;
      displayBooks();
    });
  }
}

addBtn.addEventListener("click", () => {
  if (validate() == "fill") alert("Please fill in all fields");
  else if (validate() == "filllength")
    alert("All fields must be filled and the character limit is 20");
  else if (validate() == "length")
    alert("The character limit for all fields is 20");
  else {
    addBookToLibrary(
      new Book(title.value, author.value, pages.value, readCheck())
    );
    displayBooks();
    title.value = "";
    author.value = "";
    pages.value = "";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") addBtn.click();
});
