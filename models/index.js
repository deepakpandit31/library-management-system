const userModel=require('./user-model');
const bookModel=require('./book-model');
module.exports={
    userModel,
    bookModel
}
//This file serves as an index for the models, allowing for easier imports in other parts of the application.
//It exports the UserModel and BookModel, which can be used in routes or controllers to interact with the database.