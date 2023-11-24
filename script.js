/* ===== Query Selectors ===== */
let content = document.querySelector(".content");


/* ===== Constants ===== */

const book1 = new Book("1984", "George Orwell", "328", true);
const book2 = new Book("Test but in a very long way to test u", "by tester", "123", false)
const library = [book1, book2];
const favoriteBooks = [book1];

const newBookForm = document.getElementById("add-book-form");
const formOverlay = document.getElementById("form-overlay");
const closeForm = document.getElementById("close-form");
const newBookBtn = document.getElementById("new-book-btn");
const createBookBtn = document.getElementById("add-book-btn");

const errorTitle = document.getElementById("error-title");
const errorAuthor = document.getElementById("error-author");
const errorPages = document.getElementById("error-pages");


/* ===== Functions ===== */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readStatus = function() {
        const readStatus = this.read ? "Already read" : "Not read yet";
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
        /* -- Card Layout -- */
        const card = document.createElement("div");
        card.classList.add("card");

        const cardHeading = document.createElement("div");
        cardHeading.classList.add("card-heading");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const cardBtn = document.createElement("div");
        cardBtn.classList.add("card-btn");

        /* -- Content Elements -- */
        const title = document.createElement("h2");
        title.textContent = `"${book.title}"`;

        const author = document.createElement("p");
        author.textContent = `${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} Pages`;

        const readStatus = document.createElement("button");
        readStatus.textContent = book.readStatus();
        readStatus.classList.add(book.read ? "read" : "not-read")

        const remove = document.createElement("button");
        remove.textContent = `Remove`;
        remove.setAttribute("id", "book-remove-btn")

        /*
        const favorite = document.createElement("button");
        favorite.textContent = `Favorite`
        favorite.setAttribute("id", "favorite-btn") */

        card.setAttribute("data-index", library.indexOf(book));

        /* -- Append Elements -- */
        cardHeading.appendChild(title);
        cardContent.appendChild(author);
        cardContent.appendChild(pages);
        cardBtn.appendChild(readStatus);
        cardBtn.appendChild(remove);
        // cardBtn.appendChild(favorite);

        card.appendChild(cardHeading);
        card.appendChild(cardContent);
        card.appendChild(cardBtn);
        
        /* -- Card Eventlisteners -- */
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
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = "";

    formOverlay.style.display = "none";
    errorTitle.textContent = "";
    errorAuthor.textContent = "";
    errorPages.textContent = "";
    };
});

closeForm.addEventListener("click", () => {
    formOverlay.style.display = ("none");
    errorTitle.textContent = "";
    errorAuthor.textContent = "";
    errorPages.textContent = "";
});