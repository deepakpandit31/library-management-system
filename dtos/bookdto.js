class IssuedBook{
id;
name;
author;
genre;
price;
publisher;
issuedBy;
issuedDate;
returnDate;

constructor(user){
this. id = user.issuedBook._id;
this.name = user.issuedBook.name;
this.author = user.issuedBook.author;
this.genre = user.issuedBook.genre;
this.price = user.issuedBook.price;
this.publisher = user.issuedBookpublisher;
this.issuedBy = user.name;
this.issuedDate = user.issuedDate;
this.returnDate = user.returnDate;
}}