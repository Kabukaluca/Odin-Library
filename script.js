/* ===== Constants ===== */
const library = [];

const book1 = new Book("BGB", "Beck", "917", true);
const book2 = new Book("Jura-Slam", "Fachschaft", "1", false)
const book3 = new Book("Amtsblatt", "Uni-Bib", "879", false)

const newBookForm = document.getElementById("add-book-form");
const formOverlay = document.getElementById("form-overlay");
const newBookBtn = document.getElementById("new-book-btn");
const addBookBtn = document.getElementById("add-book-btn");



/* ===== Functions ===== */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const readStatus = this.read ? "already read" : "not read yet"
        return(`${this.title} by ${this.author} , ${this.pages} pages , ${readStatus}`);
    };
};

function addBookToLibrary() {


    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    displayBooks(library);
}

function displayBooks(arr) {    
    arr.forEach(book => {createCard(book);
    });

    function createCard(book) {
        content.innerHTML += `
        <div class="card">
            <h2>${book.title}</h2>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.readStatus}</p>
        </div>`
    };
};


/* ===== Query Selectors ===== */
let content = document.querySelector(".content");
// document.querySelector(".content").innerHTML = `${generateBookCard(library)}`;


/* ===== BACKUP ===== */
 /* function addBookToLibrary(book) {
    library.push(book);
    generateBookCard(library);
    document.querySelector(".content").innerHTML = `${generateBookCard(library)}`;
    return(`added ${book.title} by ${book.author} to your library`);
};
function generateBookCard(arg) {
    let items = "";
    for(let i = 0; i < arg.length; i++) {
        const book = arg[i];
        const title = book.title;
        const author = book.author;
        const pages = book.pages;
        const readStatus = book.read ? "already read" : "not read yet";

        items += `
            <div class="card">
                <h2>${title}</h2>
                <p>by ${author}</p>
                <p>${pages} pages</p>
                <p>${readStatus}</p>
            </div>
        `;
    };
    return items;
};

const removeBook = (index) => {
    library.splice(index, 1);
    console.log("book removed");

    removeBookCard();
} */