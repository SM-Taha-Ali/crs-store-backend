const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Importing controller

const authController = require('../controllers/auth');
const fetchuser = require('../middlewares/fetchUser');


// Creating User
router.post(
  // Route Path
  '/create-user',
  // Express validations
  [
    body('firstname', 'Name must be atleast 3 characters long.').isLength({ min: 3 }),
    body('lastname', 'Name must be atleast 3 characters long.').isLength({ min: 3 }),
    body('email','Enter a valid email.').isEmail(),
    body('password','Password must be atleast 5 characters long.').isLength({ min: 5 }),
    body('phoneno','Phone No must contain digits only.').isNumeric(),
  ], 
  // Creating User
  authController.createUser
)


// Authenticating User
router.post(
  // Route Path
  '/login',
  // Express validations
  [
    body('email','Enter a valid email.').isEmail(),
    body('password','Password cannot be blank.').exists(),
  ], 
  // Authenticating User
  authController.loginAuth
)


// Fetching user details
router.get(
  // Route Path
  '/getuser',
  // MiddleWare
  fetchuser,
  // Authenticating User
  authController.getUser
)

// Fetching user details by id
router.post(
  // Route Path
  '/getuserbyid',
  // Authenticating User
  authController.getUserById
)


// Fetching all users
router.get(
  // Route Path
  '/getallusers',
  // Authenticating User
  authController.getAllUser
)



module.exports = router;