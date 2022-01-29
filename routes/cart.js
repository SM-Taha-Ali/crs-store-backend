const express = require('express');
const { body } = require('express-validator');
const cartController = require('../controllers/cart');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// ADD TO CART
router.post('/addtocart/:id',
    fetchuser,
    cartController.addToCart
);

// RETRIEVE ORDERS
router.get('/getitem', fetchuser, cartController.getItem);

// UPDATE ORDER
router.put('/updateitem/:id', fetchuser, cartController.updateItem);

// DELETE ORDER
router.delete('/deleteitem/:id', fetchuser, cartController.deleteItem);

module.exports = router; 