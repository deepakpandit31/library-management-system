## Library Management System

# this is an library management system backend api that can be used to handel and operate an library and manage user and books 

## routes and the Endpoints 
 GET: all the list of users in system
 POSt:Create/Rejister new Users

## /users{id}
## /users/{id}
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Delating a user by their ID (Check if the user still has an issued book) && {is there any fine/penalty to be collected

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID
> Date of subscription
> Valid till }
>> Fine if any ?

## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT:update an bok by its id
Delete:Delete an book by its id
## /books/issued

GET: Get all the issued books

## /books/issued/withFine

GET: Get all issued books with their fine amount

### Subscription Types

>> Basic (3 months)
>> Standard (6 months)
>> Premium (12 months)

> > If a user missed the renewal date, then user should be collected with $100
> > If a user misses his subscription, then user is expected to pay $100
> > If a user misses both renewal & subscription, then the collected amount should be $200


## comands
npm init 

npm i express
npm i nodemon --- save --dev 
