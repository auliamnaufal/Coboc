const makeBookItem = (bookObject) => {
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("book__item--title");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book__item--author");
  bookAuthor.innerText = bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.classList.add("book__item--year");
  bookYear.innerText = bookObject.year;

  const bookImage = document.createElement("img");
  bookImage.classList.add("book__item--img");
  bookImage.id = `cover-${bookObject.id}`;
  bookImage.setAttribute("src", bookObject.cover);
  bookImage.alt = `${bookObject.title} cover`;

  const container = document.createElement("div");
  container.classList.add("book__item");
  container.id = bookObject.id;

  container.append(bookImage, bookTitle, bookAuthor, bookYear);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("book__item--actions");

  if (bookObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("action__button");
    undoButton.classList.add("undo");
    undoButton.id = "undo-button";

    undoButton.addEventListener("click", () => {
      undoBookFromFinished(bookObject.id);
    });

    buttonContainer.append(undoButton);
    container.append(buttonContainer);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("action__button");
    checkButton.classList.add("check");
    checkButton.id = "check-button";

    checkButton.addEventListener("click", () => {
      addBookToFinish(bookObject.id);
    });

    buttonContainer.append(checkButton);
    container.append(buttonContainer);
  }

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("action__button");
  deleteButton.classList.add("delete");
  deleteButton.id = "delete-button";

  deleteButton.addEventListener("click", () => {
    removeBookFromFinished(bookObject.id);
  });

  buttonContainer.append(deleteButton);

  return container;
};

const generateId = () => {
  return +new Date();
};

const generateBookObject = (id, title, author, year, cover, isCompleted) => {
  return {
    id,
    title,
    author,
    year,
    cover,
    isCompleted,
  };
};

const clearFormInputs = (modal) => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "2022";
  document.getElementById("cover").value = "";

  modal.style.display = "none";
};


