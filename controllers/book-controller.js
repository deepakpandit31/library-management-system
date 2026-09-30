const { userModel, bookModel } = require("../models");
//using exports.function name helps to reduce and we have not to erite module.exports{all exports functions here}
const issuedBooks = require("../dtos/bookdto.js")


// router.get("/", (req, res) => {
//     return res.status(200).json({
//         success: true,
//         data: books
//     });
// });


/*
Route: /books/issued/for-users
Method: GET
Description: Get all issued books with user details
Access: Public
Parameters: None
*/

exports.getallBooks = async (req, res) => {

    const books = await bookModel.find()
    if (books.length === 0) {
        return res.status.json({
            success: false,
            message: "no books presesnt in server"
        })
    }
    res.status(200).json({
        success: true,
        data: books
    })
}

// router.get("/:id", (req, res) => {

//     const { id } = req.params;

//     const book = books.find(
//         (each) => each.id === id
//     );

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for ID ${id}`
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         data: book
//     });
// });

exports.getSingleBookbyId = async (req, res) => {
    const { id } = req.params;
    const book = await bookModel.findById(id)
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

}
// router.get("/issued/for-users", (req, res) => {

//     // Find all users who have an issued book
//     const usersWithIssuedBooks = users.filter(
//         (each) => each.issuedBook
//     );

//     const issuedBooks = [];

//     usersWithIssuedBooks.forEach((each) => {

//         // Find the issued book
//         const book = books.find(
//             (book) => book.id === each.issuedBook
//         );

//         if (book) {
//             // Create a new object without changing original book data
//             issuedBooks.push({
//                 ...book,
//                 issuedBy: each.name,
//                 issuedDate: each.issuedDate,
//                 returnDate: each.returnDate
//             });
//         }
//     });

//     return res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });


exports.getallissuedBooks = async (req, res) => {
    const user = UserModel.find({
        isissuedBook: { $exists: true },
    }).populate("issuedBook")
    const issuedBooks = users.map((each) => {
        const issuedBooks = users.map((each) => {
            return new IssuedBook(each);
        })

    });
    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Books issued yet",
            
        })
    }
}

// router.post("/", (req, res) => {

//     const {
//         id,
//         name,
//         author,
//         genre,
//         price,
//         publisher
//     } = req.body;


//     // Check required fields
//     if (
//         !id ||
//         !name ||
//         !author ||
//         !genre ||
//         !price ||
//         !publisher
//     ) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the required fields"
//         });
//     }


//     // Check if book already exists
//     const existingBook = books.find(
//         (each) => each.id === id
//     );

//     if (existingBook) {
//         return res.status(409).json({
//             success: false,
//             message: `Book already exists with ID ${id}`
//         });
//     }


//     // Create new book
//     const newBook = {
//         id,
//         name,
//         author,
//         genre,
//         price,
//         publisher
//     };


//     // Add book to array
//     books.push(newBook);


//     return res.status(201).json({
//         success: true,
//         message: "Book added successfully",
//         data: newBook
//     });
// });


exports.addnewbook = async (req, res) => {
    const { data } = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'please provide data to add new books'
        })
    }
    await bookModel.create(data);
      const allBooks = await bookModel.find();

    res.status(201).json({
        success:true,
        message:"books added sucessfully",
        data:allBooks
    })
}


// router.put("/:id", (req, res) => {

//     const { id } = req.params;


//     // Find book
//     const book = books.find(
//         (each) => each.id === id
//     );


//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for ID ${id}`
//         });
//     }


//     // Update existing book
//     Object.assign(book, req.body);


//     return res.status(200).json({
//         success: true,
//         message: "Book updated successfully",
//         data: book
//     });
// });




exports.updatebookbyid=async (req,res)=>{
 const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update"
        })
    }

//     // Check if the book exists
//     const book = await BookModel.findById(id);
//    if(!book){
//        return res.status(404).json({
//            success: false,
//            message: `Book Not Found for id: ${id}`
//        })
//    }

//    // Update the book details
//    Object.assign(book, data);
//    await book.save();

//    res.status(200).json({
//        success: true,
//        message: "Book Updated Successfully",
//        data: book
//    })

const updatedBook = await bookModel.findOneAndUpdate(
        {_id: id},
       data,
       {new: true}
    );

    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: "Book Updated Successfully",
        data: updatedBook
    })
}

exports.deletebookbyid= async(req,res)=>{
    const {id} = req.params;

    // Check if the book exists
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully"
    })
}



// module.exports{
//     getallBooks,
//     getSingleBookbyId
// }