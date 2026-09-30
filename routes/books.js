const express = require("express");

const {
    getallBooks,
    getSingleBookbyId,
    getallissuedBooks,
    addnewbook,
    updatebookbyid,
    deletebookbyid
} = require("../controllers/book-controller.js");

const router = express.Router();

// Get all books
router.get("/", getallBooks);

// Get all issued books
router.get("/issued/for-users", getallissuedBooks);

// Get a single book
router.get("/:id", getSingleBookbyId);

// Add a new book
router.post("/", addnewbook);

// Update a book
router.put("/:id", updatebookbyid);

// Delete a book
router.delete("/:id", deletebookbyid);

module.exports = router;