function findAuthorById(authors = [], id) {
    const result = authors.find((element) => {
        return element.id === id;
    });
    return result;
}

function findBookById(books = [], id = "") {
    const result = books.find((element) => {
        return element.id === id;
    });
    return result;
}
//--------------------------------------------------------------------\
// The `partitionBooksByBorrowedStatus()` function in `public/src/books.js` has a single parameter:
// - An array of book objects.
// It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
// The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.
function partitionBooksByBorrowedStatus(books = []) {
    let checkedOut = books.filter((book) => {
        return book.borrows[0].returned === false;
    });
    let returnedTrue = books.filter((book) => {
        return book.borrows[0].returned === true;
    });
    return [checkedOut, returnedTrue];
}
/*The `getBorrowersForBook()` function in `public/src/books.js` has two parameters, in the following order:
- A book object.
- An array of all account objects.
It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.*/
function getBorrowersForBook({ borrows }, accounts = []) {
    //deconstruct
    const results = [];
    borrows.forEach(({ id, returned }) => {
        accounts.forEach((account) => {
            //use if statement to link the 'returned' entry from the mathing object in the borrows []
            if (id === account.id) {
                results.push({ ...account, returned });
            }
        });
    });
    return results.slice(0, 10);

    //finalize returns
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};
