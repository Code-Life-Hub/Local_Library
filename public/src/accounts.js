function findAccountById(accounts = [], id) {
    const result = accounts.find((element) => {
        return element.id === id;
    });
    return result;
}

function sortAccountsByLastName(accounts = []) {
    accounts.sort((acc1, acc2) => {
        return acc1.name.last.toLowerCase() > acc2.name.last.toLowerCase()
            ? 1
            : -1;
    });
    return accounts;
}
//------------------------------------------------------------------------------
function getTotalNumberOfBorrows(account = {}, books = {}) {
    let count = 0;
    account.borrows &&
        account.borrows.forEach((element) => {
            count++;
        });

    books.forEach((book) => {
        book.borrows.forEach((element) => {
            if (element.id === account.id) {
                count++;
            }
        });
    });
    return count;
}
//#### getBooksPossessedByAccount()
// The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:
// - An account object.
// - An array of all book objects.
// - An array of all author objects.
// It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.

// forEach check -->if- borrows.returned=false
function getBooksPossessedByAccount({ id }, books = [], authors = []) {
    const bookArr = [];
    //loop through books []
    books.forEach((book) => {
        const authorInfo = authors.find((author) => {
            return author.id === book.authorId;
        });
        //if--> account.id===borrows.id
        if (book.borrows[0].returned === false && id === book.borrows[0].id) {
            //push relavent author infmormation  to--> arr
            bookArr.push({ ...book, author: { ...authorInfo } });
        }
    });
    return bookArr;
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};
