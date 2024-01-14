/* ===== Constants ===== */
const content = document.getElementById("content");
const newBookForm = document.getElementById("add-book-form");
const formOverlay = document.getElementById("form-overlay");
const closeFormBtn = document.getElementById("close-form-btn");
const addBookBtn = document.getElementById("add-book-btn");
const addBookBtnForm = document.getElementById("add-book-btn-form");

const errorTitle = document.getElementById("error-title");
const errorAuthor = document.getElementById("error-author");
const errorPages = document.getElementById("error-pages");


/* ===== Classes ===== */
class Book {
    constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead
    }
    toggleRead = () => {return (this.isRead ? "Already read" : "Not read")}
};

class Library {
    constructor() {
        const book1 = new Book("Atomic Habbits", "James Clear", "320", false);
        const book2 = new Book("Thinking, fast and slow", "Daniel Kahneman", "512", true);
        this.books = [book1, book2];
    }

    addBook(newBook) {
        this.books.push(newBook);
        displayBooks(this.books);
    }

    removeBook(index) {
        this.books.splice(index, 1);
        displayBooks(this.books);
    }

    toggleRead(index) {
        this.books[index].isRead = !this.books[index].isRead;
        displayBooks(this.books);
    }
}

let library = new Library();


const addBook = (title, author, pages, isRead) => {
    let newBook = new Book(title, author, pages, isRead);
    library.addBook(newBook);
}

const displayBooks = () => { 
    content.innerHTML = "";  

    library.books.forEach((book) => {
        createCard(book);
    });
};


// GET CARD CREATOR
class CardCreator {
    constructor(book) {
        this.book = book;
        this.library = library;
        this.card = document.createElement("div");
        this.cardHeading = document.createElement("div");
        this.cardContent = document.createElement("div");
        this.cardBtn = document.createElement("div");

        this.setupCardLayout();
        this.setupContentElements();
        this.setupEventListeners();

        content.appendChild(this.card);
    }

    setupCardLayout() {
        this.card.classList.add("card");
        this.cardHeading.classList.add("card-heading");
        this.cardContent.classList.add("card-content");
        this.cardBtn.classList.add("card-btn");

        this.card.appendChild(this.cardHeading);
        this.card.appendChild(this.cardContent);
        this.card.appendChild(this.cardBtn);

        this.card.setAttribute("data-index", this.library.books.indexOf(this.book));
    }

    setupContentElements() {
        const title = document.createElement("h2");
        title.textContent = `"${this.book.title}"`;

        const author = document.createElement("p");
        author.textContent = `${this.book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${this.book.pages} Pages`;

        const readStatus = document.createElement("button");
        readStatus.textContent = this.book.toggleRead();
        readStatus.classList.add(this.book.isRead ? "read" : "not-read");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = `Remove`;
        removeBtn.setAttribute("id", "book-remove-btn");

        this.cardHeading.appendChild(title);
        this.cardContent.appendChild(author);
        this.cardContent.appendChild(pages);
        this.cardBtn.appendChild(readStatus);
        this.cardBtn.appendChild(removeBtn);
    }

    setupEventListeners() {
        this.cardBtn.querySelector("#book-remove-btn").addEventListener("click", () => {
            let index = this.card.getAttribute("data-index");
            removeBookConfirmation(index);
        });

        this.cardBtn.querySelector("button").addEventListener("click", () => {
            let index = this.card.getAttribute("data-index");
            this.library.toggleRead(index);
        });
    }
}

let createCard = (book) => new CardCreator(book);

const removeBookConfirmation = (index) => {
    const cardIndex = parseInt(index);
    const removeConfirm = document.getElementById("remove-confirm");
    const removeConfirmMsg = document.querySelector(".remove-confirm-msg");

    const confirm = document.getElementById("remove-confirm-yes-btn");
    const unconfirm = document.getElementById("remove-confirm-no-btn");
    let bookName = library.books[cardIndex].title;
    
    removeConfirmMsg.innerHTML = `This action will remove <br> "${bookName}" <br> from your library`;
    removeConfirm.classList.add("active");
    removeConfirm.showModal();
    
    confirm.addEventListener("click", () => {
        removeConfirm.classList.remove("active");
        removeConfirm.close();
        library.removeBook(index)
    });
        unconfirm.addEventListener("click", () => {
        removeConfirm.classList.remove("active");
        removeConfirm.close();
    });
};

const resetForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = "";

    errorTitle.textContent = "";
    errorAuthor.textContent = "";
    errorPages.textContent = "";

    formOverlay.close();
    formOverlay.classList.remove("active");
}


/* ===== Eventlisteners ===== */
document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
});

addBookBtn.addEventListener("click", () => {
    formOverlay.showModal();
    formOverlay.classList.add("active");
}); 

addBookBtnForm.addEventListener("click", (e) => {
    let titleValue = document.getElementById("title").value;
    let authorValue = document.getElementById("author").value;
    let pagesValue = document.getElementById("pages").value;
    let readValue = document.getElementById("read").checked;

    if (titleValue === ""){
        e.preventDefault();
        errorTitle.textContent = "You forgot to enter the title!";
    }
    if (authorValue === "") {
        e.preventDefault();
        errorAuthor.textContent = "You forgot to enter the author!";
    }
    if (pagesValue === "") {
        e.preventDefault();
        errorPages.textContent = "You forgot to enter pages!";
    } 
    else {
    addBook(titleValue, authorValue, pagesValue, readValue);
    resetForm();
    };
});

closeFormBtn.addEventListener("click", () => {resetForm()});