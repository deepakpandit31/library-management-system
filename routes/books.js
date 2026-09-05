const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/user.json");

const router = express.Router();


/*
Route: /books
Method: GET
Description: Get all books
Access: Public
Parameters: None
*/

router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        data: books
    });
});


/*
Route: /books/issued/for-users
Method: GET
Description: Get all issued books with user details
Access: Public
Parameters: None
*/

router.get("/issued/for-users", (req, res) => {

    // Find all users who have an issued book
    const usersWithIssuedBooks = users.filter(
        (each) => each.issuedBook
    );

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {

        // Find the issued book
        const book = books.find(
            (book) => book.id === each.issuedBook
        );

        if (book) {
            // Create a new object without changing original book data
            issuedBooks.push({
                ...book,
                issuedBy: each.name,
                issuedDate: each.issuedDate,
                returnDate: each.returnDate
            });
        }
    });

    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
});


/*
Route: /books/:id
Method: GET
Description: Get a book by ID
Access: Public
Parameters: id
*/

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const book = books.find(
        (each) => each.id === id
    );

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book not found for ID ${id}`
        });
    }

    return res.status(200).json({
        success: true,
        data: book
    });
});


/*
Route: /books
Method: POST
Description: Add a new book
Access: Public
Parameters: None
*/

router.post("/", (req, res) => {

    const {
        id,
        name,
        author,
        genre,
        price,
        publisher
    } = req.body;


    // Check required fields
    if (
        !id ||
        !name ||
        !author ||
        !genre ||
        !price ||
        !publisher
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }


    // Check if book already exists
    const existingBook = books.find(
        (each) => each.id === id
    );

    if (existingBook) {
        return res.status(409).json({
            success: false,
            message: `Book already exists with ID ${id}`
        });
    }


    // Create new book
    const newBook = {
        id,
        name,
        author,
        genre,
        price,
        publisher
    };


    // Add book to array
    books.push(newBook);


    return res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook
    });
});


/*
Route: /books/:id
Method: PUT
Description: Update a book by ID
Access: Public
Parameters: id
*/

router.put("/:id", (req, res) => {

    const { id } = req.params;


    // Find book
    const book = books.find(
        (each) => each.id === id
    );


    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book not found for ID ${id}`
        });
    }


    // Update existing book
    Object.assign(book, req.body);


    return res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
});


/*
Route: /books/:id
Method: DELETE
Description: Delete a book by ID
Access: Public
Parameters: id
*/

router.delete("/:id", (req, res) => {

    const { id } = req.params;


    // Find book index
    const index = books.findIndex(
        (each) => each.id === id
    );


    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Book not found for ID ${id}`
        });
    }


    // Remove book from array
    const deletedBook = books.splice(index, 1);


    return res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook[0]
    });
});


module.exports = router;