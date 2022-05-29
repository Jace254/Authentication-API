# Authentication-API

Authenticates users by name,email and password

# END-POINTS
1.'/register'

Register's a user to the MongoDB with name,email and password,
Prevents duplicte email users,
Encrypts passwords on the database and
Has constraints on the validity of credentials used.

2.'/login'

Prevents logging in with non existing users and email credentials are by default set to lowercase in the database.

Made with NodeJS,Express and Mongoose.

Tested using Postman and Cypress.

Still under development
