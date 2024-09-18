const dialog = document.getElementById('bookFormDialog');

const myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 310, true),
    new Book('1984', 'George Orwell', 328, false),
  ];  

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const readStatusText = book.read ? 'Unread' : 'Read';

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? 'Read' : 'Not Read'}</p>
      <button class="btn-primary" onclick="toggleRead(${index})">${readStatusText}</button>
      <button class="btn-secondary" onclick="removeBook(${index})">Remove</button>
    `;

    libraryDiv.appendChild(bookCard);
  });
}

function toggleRead(index) {
  myLibrary[index].toggleReadStatus();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById('newBookBtn').addEventListener('click', () => {
  dialog.showModal();
});

document.getElementById('closeDialogBtn').addEventListener('click', () => {
  dialog.close();
});

document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  dialog.close();
  document.getElementById('bookForm').reset();
});

displayBooks()