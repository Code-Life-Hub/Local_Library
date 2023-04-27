function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    return books.filter((book) => book.borrows[0].returned === false).length;
}

//---------------------------------------------------------------------------------
// The `getMostCommonGenres()` function in `public/src/home.js` has a single parameter:

// - An array of book objects.

// It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

// Each object in the returned array has two keys:

// - The `name` key which represents the name of the genre.
// - The `count` key which represents the number of times the genre occurs.

// Even if there is a tie, the array should only contain no more than five objects.
function getMostCommonGenres(books = []) {
    const newObj = {};
    books.forEach((book) => {
        if (newObj.hasOwnProperty(book.genre)) {
            newObj[book.genre]++;
        } else {
            newObj[book.genre] = 1;
        }
    });
    const updatedKeyArr = Object.keys(newObj);
    let result = updatedKeyArr.map((element) => {
        return { name: element, count: newObj[element] };
    });
    return result.sort((a, b) => b.count - a.count).slice(0, 5);
}
function getMostPopularBooks(books) {
    const popBook = [];
    //loop through books
    books.forEach((book) => {
        popBook.push({ name: book.title, count: book.borrows.length });
    });
    return popBook.sort((a, b) => b.count - a.count).slice(0, 5);
}
// - An array of book objects.
// - An array of author objects.

// It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.

// Each object in the returned array has two keys:

// - The `name` key which represents the first and last name of the author.
// - The `count` key which represents the number of times the author's books have been borrowed.

// Even if there is a tie, the array should contain no more than five objects.
function getMostPopularAuthors(books = [], authors = []) {
    let newObj = {};
    books.forEach((book) => {
        if (newObj.hasOwnProperty(book.authorId)) {
            newObj[book.authorId] += book.borrows.length;
        } else {
            newObj[book.authorId] = book.borrows.length;
        }
    });
    return authors
        .map((author) => {
            return {
                name: author.name.first + " " + author.name.last,
                count: newObj[author.id],
            };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
