const library = [

];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /* add code to turn this.read into boolean */
    this.info = function() {
        const readStatus = this.read ? "already read" : "not read yet"
        return(`${this.title} by ${this.author} , ${this.pages} pages , ${readStatus}`);
    };
};

const book1 = new Book("BGB", "Beck", "917", true);
const book2 = new Book("Jura-Slam", "Fachschaft", "1", false)
const book3 = new Book("Amtsblatt", "Uni-Bib", "879", false)


function addBookToLibrary(book) {
    library.push(book);
    return(`added ${book.title} by ${book.author} to your library`);
};
