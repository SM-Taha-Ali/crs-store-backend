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

// RETRIEVE CART ITEMS
router.get('/getitem', fetchuser, cartController.getItem);

// UPDATE CART ITEM QUANTITY
router.put('/updateitem/:id', fetchuser, cartController.updateItem);

// DELETE CART ITEM
router.delete('/deleteitem/:id', fetchuser, cartController.deleteItem);

// EMPTY CART
router.delete('/emptycart/', fetchuser, cartController.emptyCart);

module.exports = router; 