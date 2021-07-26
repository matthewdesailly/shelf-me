const INCOMPLETE_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("title");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = 'Penulis: ' + author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = 'Tahun: ' + year;

    const detailContainer = document.createElement("div");
    detailContainer.classList.add("detail");
    detailContainer.append(bookTitle, bookAuthor, bookYear);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action", "un-select");

    const boxLeftContainer = document.createElement("div");
    boxLeftContainer.classList.add("box-left");
    boxLeftContainer.append(detailContainer, actionContainer);

    const boxRightContainer = document.createElement("div");
    boxRightContainer.classList.add("action", "box-right");

    const articleContainer = document.createElement("article");
    articleContainer.classList.add("book-item", 'card', 'flex-row');
    articleContainer.append(boxLeftContainer, boxRightContainer);

    if (isComplete) {
        actionContainer.append(
            createCompleteButton()
        );

        boxRightContainer.append(
            createDeleteButton()
        );
    } else {
        actionContainer.append(
            createInCompleteButton()
        );

        boxRightContainer.append(
            createDeleteButton()
        );
    }

    return articleContainer;
}

function createInCompleteButton() {
    return createButton("inCompleteButton", function (event) {
        changeBookToCompleted(event.target.parentElement.parentElement.parentElement);
    });
}

function createCompleteButton() {
    return createButton("completeButton", function (event) {
        changeBookToInComplete(event.target.parentElement.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton("deleteButton", function (event) {
        deleteBook(event.target.parentElement.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);

    if (buttonTypeClass == "inCompleteButton") {
        button.innerHTML = "Sudah Selesai dibaca";
    } else if (buttonTypeClass == "completeButton") {
        button.innerHTML = "Belum selesai dibaca";
    } else if (buttonTypeClass == "deleteButton") {
        button.innerHTML = '<i class="fa fa-trash fa-2x" aria-hidden="true"></i>';
    }

    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook() {
    const incompleteBOOKList = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;

    let book, bookObject;

    if (checkBox.checked == true) {
        book = makeBook(bookTitle, bookAuthor, bookYear, true);
        bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBOOKList.append(book);
    } else {
        book = makeBook(bookTitle, bookAuthor, bookYear, false);
        bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        incompleteBOOKList.append(book);
    }

    updateDataToStorage();
}

function changeBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".detail > h3.title").innerText;
    const taskAuthor = taskElement.querySelector(".detail > p.author").innerText;
    const taskYear = taskElement.querySelector(".detail > p.year").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function changeBookToInComplete(taskElement) {
    const listInComplete = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".detail > h3.title").innerText;
    const taskAuthor = taskElement.querySelector(".detail > p.author").innerText;
    const taskYear = taskElement.querySelector(".detail > p.year").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = false;
    newBook[BOOK_ITEMID] = book.id;

    listInComplete.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function deleteBook(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listIncomplete = document.getElementById(INCOMPLETE_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isComplete) {
            listCompleted.append(newBook);
        } else {
            listIncomplete.append(newBook);
        }
    }
}