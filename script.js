/* ===== Constants ===== */
const content = document.getElementById("content");
const newBookForm = document.getElementById("add-book-form");
const formOverlay = document.getElementById("form-overlay");
const closeFormBtn = document.getElementById("close-form-btn");
const newBookBtn = document.getElementById("new-book-btn");
const createBookBtn = document.getElementById("add-book-btn");

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
       this.toggleRead = function() {
        return (this.isRead ? "Already read" : "Not read");
        }
    }
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

const createCard = (book) => {
    /* -- Card Layout -- */
    const card = document.createElement("div");
    const cardHeading = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardBtn = document.createElement("div");

    card.classList.add("card");
    cardHeading.classList.add("card-heading");    
    cardContent.classList.add("card-content");
    cardBtn.classList.add("card-btn");

    /* -- Content Elements -- */
    const title = document.createElement("h2");
    title.textContent = `"${book.title}"`;

    const author = document.createElement("p");
    author.textContent = `${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} Pages`;

    const readStatus = document.createElement("button");
    readStatus.textContent = book.toggleRead();
    readStatus.classList.add(book.isRead ? "read" : "not-read")

    const remove = document.createElement("button");
    remove.textContent = `Remove`;
    remove.setAttribute("id", "book-remove-btn")

    card.setAttribute("data-index", library.books.indexOf(book));

    /* -- Append Elements -- */
    cardHeading.appendChild(title);
    cardContent.appendChild(author);
    cardContent.appendChild(pages);
    cardBtn.appendChild(readStatus);
    cardBtn.appendChild(remove);

    card.appendChild(cardHeading);
    card.appendChild(cardContent);
    card.appendChild(cardBtn);
    
    /* -- Card Eventlisteners -- */
    remove.onclick = () => {
        let index = card.getAttribute("data-index");
        removeBook(index);
    };

    readStatus.onclick = () => {
        let index = card.getAttribute("data-index");
        library.toggleRead(index);
    };

    content.appendChild(card);
    }

const removeBook = (index) => {
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
        library.books.splice(cardIndex, 1);
        displayBooks();
    });
        unconfirm.addEventListener("click", () => {
        removeConfirm.classList.remove("active");
        removeConfirm.close();
    });
};

// Not yet Approved:
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

newBookBtn.addEventListener("click", () => {
    formOverlay.showModal();
    formOverlay.classList.add("active");
}); 

createBookBtn.addEventListener("click", (e) => {
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


// Maybe just call reset form inside ?
closeFormBtn.addEventListener("click", () => {
    formOverlay.close();
    errorTitle.textContent = "";
    errorAuthor.textContent = "";
    errorPages.textContent = "";
});