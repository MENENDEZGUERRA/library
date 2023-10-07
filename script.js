const myLibrary = [];

function Book(title, author, pages, read, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, image){
    const newBook = new Book(title, author, pages, read, image);
    myLibrary.push(newBook);
}

function displayBooks() {
    const libraryDisplay = document.getElementById('library-display');
    libraryDisplay.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'card';

        const bookImage = document.createElement('img');
        bookImage.src = book.image;
        bookCard.appendChild(bookImage);

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read ? "Yes" : "No"}`;
        bookCard.appendChild(bookRead);

        const toggleReadStatusButton = document.createElement('button');
        toggleReadStatusButton.textContent = "Toggle Read Status";
        toggleReadStatusButton.dataset.index = index;
        toggleReadStatusButton.addEventListener('click', toggleReadStatus);
        bookCard.appendChild(toggleReadStatusButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', removeBook);
        bookCard.appendChild(removeButton);

        libraryDisplay.appendChild(bookCard);
    });
}

function removeBook(event) {
    const index = event.target.dataset.index;
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(event) {
    const index = event.target.dataset.index;
    myLibrary[index].toggleReadStatus();
    displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('new-book-dialog').showModal();
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('new-book-dialog').close();
});

document.getElementById('new-book-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const image = document.getElementById('image').value;

    addBookToLibrary(title, author, pages, read, image);
    displayBooks();

    event.target.reset();
    document.getElementById('new-book-dialog').close();
});

// Example books
addBookToLibrary("Harry Potter", "J.K. Rowling", 320, true, "https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false, "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg");

// Display books on page load
displayBooks();
