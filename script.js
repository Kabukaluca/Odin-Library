/* ===== Query Selectors ===== */
let content = document.querySelector(".content");


/* ===== Constants ===== */

const book1 = new Book("1984", "George Orwell", "328", true);
const book2 = new Book("test", "by tester", "123", false)
const library = [book1, book2];
const favoriteBooks = [book1];

const newBookForm = document.getElementById("add-book-form");
const formOverlay = document.getElementById("form-overlay");
const closeForm = document.getElementById("close-form");
const newBookBtn = document.getElementById("new-book-btn");
const addBookBtn = document.getElementById("add-book-btn");


/* ===== Functions ===== */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readStatus = function() {
        const readStatus = this.read ? "already read" : "not read yet";
    return `${readStatus}`;
    };
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    displayBooks(library);
}

function displayBooks(arr) { 
    content.innerHTML = "";  

    arr.forEach((book, index) => {
        createCard(book);
    });

    function createCard(book) {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = `${book.title}`;

        const author = document.createElement("p");
        author.textContent = `by ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement("button");
        readStatus.textContent = book.readStatus();
        readStatus.setAttribute("class", "read-status-btn")

        const remove = document.createElement("button");
        remove.textContent = `Remove`;
        remove.setAttribute("id", "book-remove-btn")

        card.setAttribute("data-index", library.indexOf(book));

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        card.appendChild(remove);

        remove.addEventListener("click", () => {
            let index = card.getAttribute("data-index");
            removeBook(index);
        });

        readStatus.addEventListener("click", () => {
            let index = card.getAttribute("data-index");
            changeReadStatus(index);
        })

        content.appendChild(card);
        }
};

function removeBook(index) {
    const cardIndex = parseInt(index);
    const removeConfirm = document.getElementById("remove-confirm");
    const confirm = document.getElementById("remove-confirm-yes-btn");
    const unconfirm = document.getElementById("remove-confirm-no-btn");
    
    removeConfirm.style.display = ("flex");

    confirm.addEventListener("click", () => {
        removeConfirm.style.display = ("none");
        library.splice(cardIndex, 1);
        displayBooks(library);
    });
        unconfirm.addEventListener("click", () => {
        removeConfirm.style.display = ("none");
    });
};

function changeReadStatus(index) {
    const cardIndex = parseInt(index);
    const book = library[cardIndex];
    
    book.read = !book.read;
    displayBooks(library); 
}
/*
function addBookToFavorites(index) {
    const cardIndex = parseInt(index);
    const book = library[cardIndex];

    favoriteBooks.push(book);
}

function removeFavoriteBook(index) {
    const cardIndex = parseInt(index);
    const book = favoriteBooks.splice(cardIndex, 1);
} */


/* ===== Eventlisteners ===== */
document.addEventListener("DOMContentLoaded", () => {
    displayBooks(library);
});

newBookBtn.addEventListener("click", () => {
    formOverlay.style.display = "flex";
}); 

addBookBtn.addEventListener("click", (e) => {

    let titleValue = document.getElementById("title").value;
    let authorValue = document.getElementById("author").value;
    let pagesValue = document.getElementById("pages").value;
    let readValue = document.getElementById("read").checked;

    if (titleValue === "" || authorValue === "" || pagesValue === "") {
        e.preventDefault();
    } else {
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = "";

    formOverlay.style.display = "none";
    }
});

closeForm.addEventListener("click", () => {
    formOverlay.style.display = ("none");
});