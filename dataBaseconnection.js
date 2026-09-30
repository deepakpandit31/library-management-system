const mongoose = require('mongoose');

function DbConnection() {
    const DB_URL = process.env.MONGO_URI;

    // Simple, clean connection with no outdated configuration blocks
    mongoose.connect(DB_URL);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Error:"));
    
    db.once("open", function(){
        console.log("DB Connected...");
    });
}

module.exports = DbConnection;
