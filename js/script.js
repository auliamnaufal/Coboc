const books = []

const RENDER_EVENT = "render-book";

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button')
  const modal = document.getElementById('modal')
  const form = document.getElementById('form')

  addButton.addEventListener('click', () => {
    modal.style.display = 'block'
  })

  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modal.style.display = 'none'
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
  })
 
})

document.addEventListener(RENDER_EVENT, () => {
  const finishedBooks = document.getElementById("finished");
  finishedBooks.innerHTML = "";

  books.forEach((book) => {
    const bookElement = makeBookItem(book);
    finishedBooks.append(bookElement)

    const bookCover = document.getElementById(`cover-${book.id}`);

    bookCover.addEventListener("load", () => {
      var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

      // Make sure canvas is as big as the picture
      imgCanvas.width = bookCover.width;
      imgCanvas.height = bookCover.height;

      // Draw image into canvas element
      imgContext.drawImage(bookCover, 0, 0, bookCover.width, bookCover.height);

      // Get canvas contents as a data URL
      var imgAsDataURL = imgCanvas.toDataURL("image/png");
      books[findBookIndex(book.id)].cover = imgAsDataURL;
    });
  });
});