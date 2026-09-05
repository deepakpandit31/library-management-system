const express = require("express");

const app = express();

const PORT = 8081;

// Import routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Home Page :-)"
    });
});

// User routes
app.use("/users", userRouter);

// Book routes
app.use("/books", bookRouter);

// Handle routes that do not exist
app.all("/*splat", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Entered URL does not exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});