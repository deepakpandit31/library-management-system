const express = require("express");
const { users } = require("../data/user.json");

const router = express.Router();


/*
Route: /users
Method: GET
Description: Get all users
Access: Public
*/

router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        data: users
    });
});


/*
Route: /users/subscription-details/:id
Method: GET
Description: Get subscription details of a user by ID
Access: Public
Parameters: ID
IMPORTANT: Keep this route before /:id
*/

router.get("/subscription-details/:id", (req, res) => {

    const { id } = req.params;

    // Find user
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }


    /*
    Convert date into number of days
    */

    const getDateInDays = (date = "") => {

        let currentDate;

        if (date) {
            currentDate = new Date(date);
        } else {
            currentDate = new Date();
        }

        const days = Math.floor(
            currentDate.getTime() / (1000 * 60 * 60 * 24)
        );

        return days;
    };


    /*
    Calculate subscription duration
    */

    const subscriptionType = (date) => {

        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }

        return date;
    };


    // Current date
    const currentDate = getDateInDays();

    // Subscription start date
    const subscriptionDate = getDateInDays(
        user.subscriptionDate
    );

    // Subscription expiration date
    const subscriptionExpiration = subscriptionType(
        subscriptionDate
    );


    // Book return date
    const returnDate = user.returnDate
        ? getDateInDays(user.returnDate)
        : null;


    // Check subscription status
    const subscriptionExpired =
        subscriptionExpiration < currentDate;


    // Calculate subscription days left
    const subscriptionDaysLeft =
        subscriptionExpiration - currentDate;


    // Check book overdue
    const bookOverdue =
        returnDate !== null && returnDate < currentDate;


    /*
    Calculate Fine

    Book overdue = $100
    Subscription expired + Book overdue = $200
    */

    let fine = 0;

    if (bookOverdue && subscriptionExpired) {
        fine = 200;
    } else if (bookOverdue) {
        fine = 100;
    }


    const data = {
        ...user,

        subscriptionExpired,

        subscriptionDaysLeft,

        bookOverdue,

        daysLeftForReturn: returnDate
            ? returnDate - currentDate
            : null,

        returnDate: bookOverdue
            ? "Book is overdue"
            : user.returnDate || "No book issued",

        fine
    };


    return res.status(200).json({
        success: true,
        data
    });
});


/*
Route: /users/:id
Method: GET
Description: Get user by ID
Access: Public
*/

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }

    return res.status(200).json({
        success: true,
        data: user
    });
});


/*
Route: /users
Method: POST
Description: Create a new user
Access: Public
*/

router.post("/", (req, res) => {

    const {
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    } = req.body;


    // Check required fields
    if (
        !id ||
        !name ||
        !surname ||
        !email ||
        !subscriptionType ||
        !subscriptionDate
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }


    // Check existing user
    const existingUser = users.find(
        (each) => each.id === id
    );

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: `User already exists with ID ${id}`
        });
    }


    const newUser = {
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    };


    users.push(newUser);


    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
});


/*
Route: /users/:id
Method: PUT
Description: Update an existing user
Access: Public
*/

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const user = users.find(
        (each) => each.id === id
    );


    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }


    // Update user
    Object.assign(user, req.body);


    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    });
});


/*
Route: /users/:id
Method: DELETE
Description: Delete user
Access: Public
*/

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const index = users.findIndex(
        (each) => each.id === id
    );


    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }


    const deletedUser = users.splice(index, 1);


    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser[0]
    });
});


module.exports = router;