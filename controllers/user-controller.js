const { userModel, bookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().populate("issuedBook");

    if (!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users
    });
};

//get single user by id
exports.getSingleUserbyId = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
    });
}
//create or register new user
exports.createNewUser = async (req, res) => {
    const { data } = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide user data"
        });
    }

    if (data.issuedBook) {
        const book = await bookModel.findOne({
            name: data.issuedBook
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        data.issuedBook = book._id;
    }

    const newUser = await userModel.create(data);

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
};  
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    
    if(!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update"
        });
    }
    //check if the user exists
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    //update the user
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
    });
}
exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    //delete the user
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser
    });
}
exports.getSubscriptionDetails = async (req, res) => {
    
    const { id } = req.params;

    // Find user
    const user = await userModel.findById(id);

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
        data:data
    });
}

