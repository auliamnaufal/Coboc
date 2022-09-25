const addBook = () => {
  const titleValue = document.getElementById("title").value;
  const authorValue = document.getElementById("author").value;
  const booksYearValue = document.getElementById("year").value;
  const booksCoverContainer = document.getElementById("cover");

  const [file] = booksCoverContainer.files;
  const bookCoverValue = file
    ? URL.createObjectURL(file)
    : "https://www.darren-young.com/wp-content/uploads/2015/04/default-placeholder.png";

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    titleValue,
    authorValue,
    parseInt(booksYearValue),
    bookCoverValue,
    false
  );

  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveBooks();
};

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

const addBookToFinish = (bookId) => {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBooks();
};

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function undoBookFromFinished(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBooks();
}

function removeBookFromFinished(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBooks();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung kemampuan untuk menyimpan data");
    return false;
  }
  return true;
};

const saveBooks = () => {
  if (isStorageExist()) {
    const serializedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, serializedData);
  }
};

const loadBookFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let parsedData = JSON.parse(serializedData);

  if (parsedData !== null) {
    parsedData.forEach((book) => {
      books.push(book);
    });
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};
