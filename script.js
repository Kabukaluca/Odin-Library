/* ===== Query Selectors ===== */
let content = document.querySelector(".content");


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
        console.log(index);
    });

    function createCard(book) {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `by ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const info = document.createElement('p');
        info.textContent = book.info();

        const remove = document.createElement('button');
        remove.textContent = `Remove`;
        remove.setAttribute("id", "book-remove-btn")

        card.setAttribute("data-index", library.indexOf(book));

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(info);
        card.appendChild(remove);

        remove.addEventListener("click", () => {
            let index = card.getAttribute("data-index")
            removeBook(index);
        });

        content.appendChild(card);
        }
};

function removeBook(index) {
    const cardIndex = parseInt(index);   
    library.splice(cardIndex, 1);
    displayBooks(library);
}; 


/* ===== Eventlisteners ===== */
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




